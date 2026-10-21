import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy thiết bị" }, { status: 500 });
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
    if (!data.name) {
      return NextResponse.json({ error: "Tên thiết bị không được để trống" }, { status: 400 });
    }

    // Đảm bảo slug không bị trùng
    let baseSlug = (data.slug && data.slug.trim()) ? slugify(data.slug) : slugify(data.name);
    let uniqueSlug = baseSlug || `thiet-bi-${Date.now()}`;
    let counter = 1;
    while (await prisma.equipment.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        slug: uniqueSlug,
        model: data.model || null,
        manufacturer: data.manufacturer || null,
        origin: data.origin || null,
        year: data.year ? parseInt(data.year, 10) : null,
        description: data.description || null,
        specs: data.specs || null,
        image: data.image || null,
        category: data.category || null,
        order: typeof data.order === "number" ? data.order : parseInt(data.order || "0", 10),
        featured: data.featured ?? false,
        published: data.published ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/trang-thiet-bi");
    revalidatePath("/admin/equipment");

    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    console.error("Error creating equipment:", error);
    return NextResponse.json({ error: "Lỗi khi tạo thiết bị" }, { status: 500 });
  }
}
