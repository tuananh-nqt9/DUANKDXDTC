import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import path from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

const SETTING_KEY = "test_parameters_pdf";

export const dynamic = "force-dynamic";

// GET - Lấy thông tin tài liệu PDF Chỉ tiêu phép thử
export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: SETTING_KEY },
    });

    if (!setting || !setting.value) {
      return NextResponse.json({
        title: "Danh mục chỉ tiêu và phép thử",
        pdfUrl: "",
        fileName: "",
        fileSize: "",
        updatedAt: null,
      });
    }

    try {
      const data = JSON.parse(setting.value);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({
        title: "Danh mục chỉ tiêu và phép thử",
        pdfUrl: setting.value,
        fileName: "",
        fileSize: "",
        updatedAt: setting.updatedAt,
      });
    }
  } catch (error) {
    console.error("Error fetching test parameters PDF:", error);
    return NextResponse.json(
      { error: "Không thể lấy thông tin tài liệu PDF" },
      { status: 500 }
    );
  }
}

// POST / PUT - Cập nhật thông tin tài liệu PDF
export async function POST(request: NextRequest) {
  try {
    // Xác thực admin qua cookie "auth-token"
    const token = cookies().get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    const body = await request.json();
    const { title, pdfUrl, fileName, fileSize } = body;

    if (!pdfUrl) {
      return NextResponse.json(
        { error: "Đường dẫn file PDF không được để trống" },
        { status: 400 }
      );
    }

    const payload = {
      title: title || "Danh mục chỉ tiêu và phép thử",
      pdfUrl,
      fileName: fileName || path.basename(pdfUrl),
      fileSize: fileSize || "",
      updatedAt: new Date().toISOString(),
    };

    const setting = await prisma.setting.upsert({
      where: { key: SETTING_KEY },
      update: {
        value: JSON.stringify(payload),
      },
      create: {
        key: SETTING_KEY,
        value: JSON.stringify(payload),
      },
    });

    // Revalidate trang chủ và trang chỉ tiêu phép thử để cập nhật ngay lập tức
    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");

    return NextResponse.json({
      success: true,
      data: payload,
    });
  } catch (error) {
    console.error("Error saving test parameters PDF:", error);
    return NextResponse.json(
      { error: "Lỗi lưu tài liệu PDF" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa tài liệu PDF
export async function DELETE() {
  try {
    const token = cookies().get("auth-token")?.value;
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
        if (parsed.pdfUrl && parsed.pdfUrl.startsWith("/documents/")) {
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
