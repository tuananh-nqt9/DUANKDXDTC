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

    // 5. Đọc bytes và kiểm tra nội dung file thực tế (Magic bytes)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length === 0) {
      return NextResponse.json({ error: "File rỗng không có nội dung!" }, { status: 400 });
    }

    // Kiểm tra magic bytes nhận diện ảnh
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    const isGif = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46;
    const isWebp =
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP";

    if (!isJpeg && !isPng && !isGif && !isWebp) {
      return NextResponse.json(
        { error: "Nội dung file không phải là định dạng hình ảnh hợp lệ (JPG, PNG, GIF, WebP)!" },
        { status: 400 }
      );
    }

    // 6. Chuẩn hóa tên file an toàn
    const timestamp = Date.now();
    const rawName = path.parse(file.name).name;
    const safeName = rawName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);

    const detectedExt = isPng ? ".png" : isWebp ? ".webp" : isGif ? ".gif" : ".jpg";
    const finalExt = extension || detectedExt;
    const filename = `${timestamp}-${safeName || "image"}${finalExt}`;

    // 7. Đảm bảo thư mục lưu trữ tồn tại
    const uploadDir = path.join(process.cwd(), "public", "uploads", "images");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 8. Ghi file và xác minh file đã tồn tại trên đĩa
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    if (!existsSync(filepath)) {
      throw new Error("Không thể xác nhận file đã được lưu trữ thành công trên ổ đĩa");
    }

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
