import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { existsSync, statSync } from "fs";
import { readFile } from "fs/promises";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export async function HEAD(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const getRes = await GET(request, context);
  return new NextResponse(null, {
    status: getRes.status,
    headers: getRes.headers,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const rawSegments = params.path || [];
    if (!rawSegments || rawSegments.length === 0) {
      return new NextResponse("File not specified (400)", { status: 400 });
    }

    // Ghép đường dẫn và chuẩn hóa chống Path Traversal
    const relativePath = path.normalize(rawSegments.join("/")).replace(/^(\.\.(\/|\\|$))+/, "");
    const uploadsBase = path.join(process.cwd(), "public", "uploads");
    const fullPath = path.join(uploadsBase, relativePath);

    // Đảm bảo không thoát ra ngoài thư mục public/uploads
    if (!fullPath.startsWith(uploadsBase)) {
      return new NextResponse("Forbidden (403)", { status: 403 });
    }

    if (!existsSync(fullPath)) {
      return new NextResponse("File không tồn tại trên hệ thống (404)", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      return new NextResponse("Not a file (400)", { status: 400 });
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    const fileBuffer = await readFile(fullPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Lỗi máy chủ khi đọc file (500)", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
