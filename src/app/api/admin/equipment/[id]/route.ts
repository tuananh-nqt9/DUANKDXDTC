import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    const equipment = await prisma.equipment.update({
      where: { id },
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
    return NextResponse.json({ error: "Lỗi khi cập nhật thiết bị" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.equipment.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa thiết bị" }, { status: 500 });
  }
}
