import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync, statSync, createReadStream } from "fs";
import { readFile } from "fs/promises";

export const dynamic = "force-dynamic";

export async function HEAD(
  request: NextRequest,
  context: { params: { filename: string } }
) {
  const getRes = await GET(request, context);
  return new NextResponse(null, {
    status: getRes.status,
    headers: getRes.headers,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

    // Ngăn chặn Path Traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "public", "documents", safeFilename);

    if (!existsSync(filePath)) {
      return new NextResponse("Tài liệu không tồn tại trên hệ thống (404)", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const stat = statSync(filePath);
    const fileSize = stat.size;

    // Kiểm tra Range header để hỗ trợ xem PDF phân đoạn (streaming/chuyển trang nhanh)
    const range = request.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const fileBuffer = await readFile(filePath);
      const chunk = fileBuffer.subarray(start, end + 1);

      return new NextResponse(chunk, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${encodeURIComponent(safeFilename)}"`,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // Đọc toàn bộ file nếu không có range
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": fileSize.toString(),
        "Content-Disposition": `inline; filename="${encodeURIComponent(safeFilename)}"`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving document PDF:", error);
    return new NextResponse("Lỗi máy chủ khi đọc file (500)", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
