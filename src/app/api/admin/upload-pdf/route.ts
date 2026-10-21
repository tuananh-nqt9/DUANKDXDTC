import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  try {
    // 1. Kiểm tra quyền Admin
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    // 2. Nhận FormData
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Không tìm thấy file tải lên" }, { status: 400 });
    }

    // 3. Kiểm tra định dạng PDF
    const extension = path.extname(file.name).toLowerCase();
    if (file.type !== "application/pdf" && extension !== ".pdf") {
      return NextResponse.json({ error: "Chỉ chấp nhận file định dạng PDF (.pdf)!" }, { status: 400 });
    }

    // 4. Kiểm tra dung lượng
    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json({ error: "Dung lượng file vượt quá giới hạn cho phép (Tối đa 50MB)!" }, { status: 400 });
    }

    // 5. Chuẩn hóa tên file
    const timestamp = Date.now();
    const rawName = path.parse(file.name).name;
    const safeName = rawName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);
    const filename = `${timestamp}-${safeName || "document"}.pdf`;

    // 6. Đảm bảo thư mục public/documents tồn tại
    const documentsDir = path.join(process.cwd(), "public", "documents");
    if (!existsSync(documentsDir)) {
      await mkdir(documentsDir, { recursive: true });
    }

    // 7. Lưu file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(documentsDir, filename);
    await writeFile(filepath, buffer);

    const url = `/documents/${filename}`;
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeFormatted = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.round(file.size / 1024)} KB`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      originalName: file.name,
      fileSize: sizeFormatted,
      bytes: file.size,
    });
  } catch (error) {
    console.error("Upload PDF error:", error);
    return NextResponse.json(
      { error: "Không thể lưu file PDF trên máy chủ" },
      { status: 500 }
    );
  }
}
