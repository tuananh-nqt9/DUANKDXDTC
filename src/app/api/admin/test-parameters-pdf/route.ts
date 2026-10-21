import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import {
  getTestParametersPdf,
  saveTestParametersPdf,
  SETTING_KEY,
} from "@/lib/test-pdf-service";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

export const dynamic = "force-dynamic";

// GET - Lấy thông tin tài liệu PDF Chỉ tiêu phép thử hiện tại
export async function GET() {
  try {
    const data = await getTestParametersPdf();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching test parameters PDF:", error);
    return NextResponse.json(
      { error: "Không thể lấy thông tin tài liệu PDF" },
      { status: 500 }
    );
  }
}

// POST - Cập nhật thông tin tài liệu PDF
export async function POST(request: NextRequest) {
  try {
    // 1. Kiểm tra xác thực Admin
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    // 2. Nhận dữ liệu cập nhật
    const body = await request.json();
    const { title, pdfUrl, fileName, fileSize, isPublished } = body;

    if (!pdfUrl || !pdfUrl.trim()) {
      return NextResponse.json(
        { error: "Đường dẫn file PDF không được để trống" },
        { status: 400 }
      );
    }

    const savedData = await saveTestParametersPdf({
      title,
      pdfUrl,
      fileName,
      fileSize,
      isPublished: isPublished !== false,
    });

    return NextResponse.json({
      success: true,
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving test parameters PDF:", error);
    return NextResponse.json(
      { error: "Lỗi lưu tài liệu PDF" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa tài liệu PDF (hoặc đưa về mặc định)
export async function DELETE() {
  try {
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    const setting = await prisma.setting.findUnique({
      where: { key: SETTING_KEY },
    });

    if (setting?.value) {
      try {
        const parsed = JSON.parse(setting.value);
        if (
          parsed.pdfUrl &&
          parsed.pdfUrl.startsWith("/documents/") &&
          !parsed.pdfUrl.includes("thanh-chuong-cbhs.pdf") // Không xóa file gốc hệ thống
        ) {
          const filePath = path.join(process.cwd(), "public", parsed.pdfUrl);
          if (existsSync(filePath)) {
            await unlink(filePath).catch(() => {});
          }
        }
      } catch {}
    }

    await prisma.setting.delete({
      where: { key: SETTING_KEY },
    }).catch(() => {});

    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");

    return NextResponse.json({ success: true, message: "Đã xóa tài liệu PDF" });
  } catch (error) {
    console.error("Error deleting test parameters PDF:", error);
    return NextResponse.json(
      { error: "Lỗi xóa tài liệu PDF" },
      { status: 500 }
    );
  }
}
