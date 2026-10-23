import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import {
  getAllTestParameterPdfs,
  getTestParametersPdf,
  createTestParameterPdf,
  updateTestParameterPdf,
  deleteTestParameterPdf,
  reorderTestParameterPdfs,
} from "@/lib/test-pdf-service";

export const dynamic = "force-dynamic";

// GET - Lấy danh sách toàn bộ tài liệu PDF (kèm tài liệu đầu tiên cho backward compatibility)
export async function GET() {
  try {
    const [list, primary] = await Promise.all([
      getAllTestParameterPdfs(),
      getTestParametersPdf(),
    ]);

    return NextResponse.json({
      success: true,
      list,
      ...primary,
    });
  } catch (error) {
    console.error("Error fetching test parameters PDF:", error);
    return NextResponse.json(
      { error: "Không thể lấy thông tin danh sách tài liệu PDF" },
      { status: 500 }
    );
  }
}

// POST - Thêm mới, cập nhật hoặc thay đổi thứ tự tài liệu PDF
export async function POST(request: NextRequest) {
  try {
    // 1. Kiểm tra xác thực Admin
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập quản trị viên" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    // 2. Nhận dữ liệu
    const body = await request.json();
    const { action, id, title, description, pdfUrl, fileName, fileSize, isPublished, published, order, items } = body;

    // Xử lý reorder
    if (action === "reorder" && Array.isArray(items)) {
      await reorderTestParameterPdfs(items);
      const updatedList = await getAllTestParameterPdfs();
      return NextResponse.json({ success: true, list: updatedList });
    }

    // Xử lý tạo mới
    if (action === "create" || (!id && action !== "update")) {
      if (!title || !title.trim()) {
        return NextResponse.json({ error: "Tiêu đề tài liệu không được để trống" }, { status: 400 });
      }
      if (!pdfUrl || !pdfUrl.trim()) {
        return NextResponse.json({ error: "Đường dẫn file PDF không được để trống" }, { status: 400 });
      }

      const created = await createTestParameterPdf({
        title,
        description,
        pdfUrl,
        fileName,
        fileSize,
        order,
        published: published !== undefined ? published : (isPublished !== false),
      });

      const updatedList = await getAllTestParameterPdfs();
      return NextResponse.json({
        success: true,
        data: created,
        list: updatedList,
      });
    }

    // Xử lý cập nhật / thay thế tài liệu đang có
    if (id) {
      const updated = await updateTestParameterPdf(id, {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(pdfUrl !== undefined && { pdfUrl }),
        ...(fileName !== undefined && { fileName }),
        ...(fileSize !== undefined && { fileSize }),
        ...(order !== undefined && { order }),
        ...(published !== undefined && { published }),
        ...(isPublished !== undefined && { published: isPublished }),
      });

      const updatedList = await getAllTestParameterPdfs();
      return NextResponse.json({
        success: true,
        data: updated,
        list: updatedList,
      });
    }

    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  } catch (error) {
    console.error("Error saving test parameters PDF:", error);
    return NextResponse.json(
      { error: "Lỗi lưu tài liệu PDF" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa tài liệu PDF được chọn
export async function DELETE(request: NextRequest) {
  try {
    const token = cookies().get("auth-token")?.value || cookies().get("admin-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const session = await verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Phiên đăng nhập hết hạn" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID tài liệu cần xóa" }, { status: 400 });
    }

    const success = await deleteTestParameterPdf(id);
    if (!success) {
      return NextResponse.json({ error: "Không tìm thấy tài liệu để xóa" }, { status: 404 });
    }

    const updatedList = await getAllTestParameterPdfs();
    return NextResponse.json({
      success: true,
      message: "Đã xóa tài liệu PDF thành công",
      list: updatedList,
    });
  } catch (error) {
    console.error("Error deleting test parameters PDF:", error);
    return NextResponse.json(
      { error: "Lỗi xóa tài liệu PDF" },
      { status: 500 }
    );
  }
}
