import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Hỗ trợ upload file lớn đến 60s

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB chuẩn hóa theo yêu cầu hệ thống

export async function POST(request: NextRequest) {
  try {
    // 1. Kiểm tra quyền Admin
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập quản trị viên" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại." }, { status: 401 });
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

    // 4. Kiểm tra dung lượng (tối đa 50MB)
    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json({ error: "Dung lượng file vượt quá giới hạn cho phép (Tối đa 50MB)!" }, { status: 400 });
    }

    // 5. Đọc bytes và kiểm tra nội dung file thực tế (PDF signature check theo chuẩn ISO 32000-1)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length < 5) {
      return NextResponse.json({ error: "File rỗng hoặc không có nội dung!" }, { status: 400 });
    }

    // Theo chuẩn ISO 32000-1, chữ ký %PDF xuất hiện trong 1024 bytes đầu tiên
    const headChunk = buffer.subarray(0, Math.min(buffer.length, 1024)).toString("latin1");
    if (!headChunk.includes("%PDF")) {
      return NextResponse.json(
        { error: "Nội dung file không hợp lệ! Không tìm thấy chữ ký tài liệu PDF tiêu chuẩn (%PDF) trong phần đầu của file." },
        { status: 400 }
      );
    }

    // 6. Chuẩn hóa tên file an toàn (hỗ trợ tiếng Việt có dấu, khoảng trắng, đ/Đ)
    const timestamp = Date.now();
    const rawName = path.parse(file.name).name;
    const safeName = rawName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    const filename = `${timestamp}-${safeName || "document"}.pdf`;

    // 7. Đảm bảo thư mục public/documents tồn tại
    const documentsDir = path.join(process.cwd(), "public", "documents");
    if (!existsSync(documentsDir)) {
      await mkdir(documentsDir, { recursive: true });
    }

    // 8. Lưu file và kiểm tra xác minh ghi đĩa
    const filepath = path.join(documentsDir, filename);
    await writeFile(filepath, buffer);

    if (!existsSync(filepath)) {
      throw new Error("Không thể xác nhận file PDF đã được ghi thành công vào hệ thống lưu trữ");
    }

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
