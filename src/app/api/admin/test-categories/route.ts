import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

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
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const category = await prisma.testCategory.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        icon: data.icon || "flask-conical",
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi tạo danh mục" }, { status: 500 });
  }
}
