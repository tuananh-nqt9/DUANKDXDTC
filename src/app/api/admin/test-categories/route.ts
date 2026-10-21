import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.testCategory.findMany({
      include: {
        _count: {
          select: { tests: true },
        },
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy danh mục" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    const data = await req.json();
    if (!data.title) {
      return NextResponse.json({ error: "Tên danh mục không được để trống" }, { status: 400 });
    }

    let baseSlug = (data.slug && data.slug.trim()) ? slugify(data.slug) : slugify(data.title);
    let uniqueSlug = baseSlug || `danh-muc-${Date.now()}`;
    let counter = 1;
    while (await prisma.testCategory.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const category = await prisma.testCategory.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        description: data.description || null,
        icon: data.icon || "flask-conical",
        pdfUrl: data.pdfUrl || null,
        order: typeof data.order === "number" ? data.order : parseInt(data.order || "0", 10),
        published: data.published ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating test category:", error);
    return NextResponse.json({ error: "Lỗi khi tạo danh mục" }, { status: 500 });
  }
}
