import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

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
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        slug: data.slug,
        model: data.model || null,
        manufacturer: data.manufacturer || null,
        origin: data.origin || null,
        year: data.year || null,
        description: data.description || null,
        specs: data.specs || null,
        image: data.image || null,
        category: data.category || null,
        order: data.order || 0,
        featured: data.featured ?? false,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi tạo thiết bị" }, { status: 500 });
  }
}
