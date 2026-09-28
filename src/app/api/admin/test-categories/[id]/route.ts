import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.testCategory.findUnique({
      where: { id: params.id },
    });

    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, description, icon, pdfUrl, order, published } = body;

    const category = await prisma.testCategory.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        description,
        icon,
        pdfUrl,
        order,
        published,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
