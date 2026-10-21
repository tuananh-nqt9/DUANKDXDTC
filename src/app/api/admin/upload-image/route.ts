import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
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
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Không tìm thấy file tải lên" }, { status: 400 });
    }

    // 3. Kiểm tra định dạng ảnh hợp lệ
    const mimeType = file.type?.toLowerCase();
    const extension = path.extname(file.name).toLowerCase();
    const isExtensionValid = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(extension);

    if (!ALLOWED_IMAGE_TYPES.includes(mimeType) && !isExtensionValid) {
      return NextResponse.json(
        { error: "Định dạng không hợp lệ! Chỉ chấp nhận JPG, JPEG, PNG, WEBP, GIF." },
        { status: 400 }
      );
    }

    // 4. Kiểm tra kích thước file
    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Kích thước ảnh quá lớn! Tối đa 10MB." },
        { status: 400 }
      );
    }

    // 5. Chuẩn hóa tên file an toàn
    const timestamp = Date.now();
    const rawName = path.parse(file.name).name;
    const safeName = rawName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);
    const finalExt = extension || (mimeType === "image/png" ? ".png" : mimeType === "image/webp" ? ".webp" : ".jpg");
    const filename = `${timestamp}-${safeName || "image"}${finalExt}`;

    // 6. Đảm bảo thư mục lưu trữ tồn tại
    const uploadDir = path.join(process.cwd(), "public", "uploads", "images");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 7. Ghi file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/images/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    return NextResponse.json(
      { error: "Không thể lưu hình ảnh trên máy chủ" },
      { status: 500 }
    );
  }
}
