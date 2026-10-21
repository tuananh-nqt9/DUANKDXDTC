import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.testCategory.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Lỗi tải danh mục" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, description, icon, pdfUrl, order, published } = body;

    let uniqueSlug = slug;
    if (title && (!uniqueSlug || uniqueSlug.trim() === "")) {
      uniqueSlug = slugify(title);
    }
    if (uniqueSlug) {
      let baseSlug = slugify(uniqueSlug);
      let testSlug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await prisma.testCategory.findFirst({
          where: { slug: testSlug, NOT: { id: params.id } },
        });
        if (!existing) {
          uniqueSlug = testSlug;
          break;
        }
        testSlug = `${baseSlug}-${counter++}`;
      }
    }

    const category = await prisma.testCategory.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(uniqueSlug !== undefined && { slug: uniqueSlug }),
        ...(description !== undefined && { description: description || null }),
        ...(icon !== undefined && { icon }),
        ...(pdfUrl !== undefined && { pdfUrl: pdfUrl || null }),
        ...(order !== undefined && { order: typeof order === "number" ? order : parseInt(order || "0", 10) }),
        ...(published !== undefined && { published: Boolean(published) }),
      },
    });

    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật danh mục" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    await prisma.testCategory.delete({
      where: { id: params.id },
    });

    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Lỗi khi xóa danh mục" }, { status: 500 });
  }
}
