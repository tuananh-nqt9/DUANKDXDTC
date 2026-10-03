import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// GET - Lấy danh sách tài liệu (admin)
export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

// POST - Tạo tài liệu mới
export async function POST(request: NextRequest) {
  try {
    const token = cookies().get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { title, description, icon, pdfUrl, fileSize, order, published } = body;

    if (!title || !pdfUrl) {
      return NextResponse.json({ error: "Title and PDF URL are required" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        title,
        description: description || "",
        icon: icon || "FileText",
        pdfUrl,
        fileSize: fileSize || "",
        order: order || 0,
        published: published !== false,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
