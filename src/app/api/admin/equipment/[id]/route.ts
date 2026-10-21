import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      return NextResponse.json({ error: "Không tìm thấy thiết bị" }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy thiết bị" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
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

    const { id } = params;
    const data = await req.json();

    let uniqueSlug = data.slug;
    if (data.name && (!uniqueSlug || uniqueSlug.trim() === "")) {
      uniqueSlug = slugify(data.name);
    }
    if (uniqueSlug) {
      let baseSlug = slugify(uniqueSlug);
      let testSlug = baseSlug;
      let counter = 1;
      while (true) {
        const existing = await prisma.equipment.findFirst({
          where: { slug: testSlug, NOT: { id } },
        });
        if (!existing) {
          uniqueSlug = testSlug;
          break;
        }
        testSlug = `${baseSlug}-${counter++}`;
      }
    }

    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(uniqueSlug !== undefined && { slug: uniqueSlug }),
        ...(data.model !== undefined && { model: data.model || null }),
        ...(data.manufacturer !== undefined && { manufacturer: data.manufacturer || null }),
        ...(data.origin !== undefined && { origin: data.origin || null }),
        ...(data.year !== undefined && { year: data.year ? parseInt(data.year, 10) : null }),
        ...(data.description !== undefined && { description: data.description || null }),
        ...(data.specs !== undefined && { specs: data.specs || null }),
        ...(data.image !== undefined && { image: data.image || null }),
        ...(data.category !== undefined && { category: data.category || null }),
        ...(data.order !== undefined && { order: typeof data.order === "number" ? data.order : parseInt(data.order || "0", 10) }),
        ...(data.featured !== undefined && { featured: Boolean(data.featured) }),
        ...(data.published !== undefined && { published: Boolean(data.published) }),
      },
    });

    revalidatePath("/");
    revalidatePath("/trang-thiet-bi");
    revalidatePath("/admin/equipment");

    return NextResponse.json(equipment);
  } catch (error) {
    console.error("Error updating equipment:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật thiết bị" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
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

    const { id } = params;
    await prisma.equipment.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/trang-thiet-bi");
    revalidatePath("/admin/equipment");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting equipment:", error);
    return NextResponse.json({ error: "Lỗi khi xóa thiết bị" }, { status: 500 });
  }
}
