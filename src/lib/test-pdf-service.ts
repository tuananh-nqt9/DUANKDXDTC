import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import { existsSync, statSync } from "fs";
import { unlink } from "fs/promises";

export const SETTING_KEY = "test_parameters_pdf";

export interface TestPdfItem {
  id: string;
  title: string;
  description: string | null;
  pdfUrl: string;
  fileName: string | null;
  fileSize: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestPdfData {
  id?: string;
  title: string;
  description?: string;
  pdfUrl: string;
  fileName: string;
  fileSize: string;
  updatedAt: string | null;
  isPublished: boolean;
}

// Giá trị mặc định chuẩn của tài liệu PDF công ty đang hiển thị
export function getDefaultTestPdf(): TestPdfData {
  let fileSize = "3.69 MB";
  try {
    const defaultFilePath = path.join(process.cwd(), "public", "documents", "thanh-chuong-cbhs.pdf");
    if (existsSync(defaultFilePath)) {
      const stats = statSync(defaultFilePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      fileSize = `${sizeMB} MB`;
    }
  } catch (e) {
    console.error("Error reading default pdf file size:", e);
  }

  return {
    title: "Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)",
    description: "Văn bản công bố năng lực hoạt động thí nghiệm chuyên ngành xây dựng được Bộ Xây dựng công nhận (LAS-XD 795)",
    pdfUrl: "/documents/thanh-chuong-cbhs.pdf",
    fileName: "thanh-chuong-cbhs.pdf",
    fileSize,
    updatedAt: new Date().toISOString(),
    isPublished: true,
  };
}

/**
 * Tự động đồng bộ và di chuyển dữ liệu cũ từ Setting sang bảng TestParameterPdf
 * (Chạy an toàn, không tạo bản ghi trùng lặp, bảo toàn 100% tài liệu cũ).
 */
export async function ensureMigratedPdfs(): Promise<TestPdfItem[]> {
  try {
    const count = await prisma.testParameterPdf.count();
    if (count > 0) {
      return await prisma.testParameterPdf.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      });
    }

    // Đọc từ Setting nếu có
    const setting = await prisma.setting.findUnique({
      where: { key: SETTING_KEY },
    });

    let initialData = getDefaultTestPdf();
    if (setting?.value) {
      try {
        const parsed = JSON.parse(setting.value);
        if (parsed.pdfUrl) {
          initialData = {
            title: parsed.title || initialData.title,
            description: parsed.description || initialData.description,
            pdfUrl: parsed.pdfUrl,
            fileName: parsed.fileName || path.basename(parsed.pdfUrl),
            fileSize: parsed.fileSize || initialData.fileSize,
            updatedAt: parsed.updatedAt || new Date().toISOString(),
            isPublished: parsed.isPublished !== false,
          };
        }
      } catch (e) {
        console.warn("Could not parse setting.value:", e);
      }
    }

    // Kiểm tra lại lần nữa để tránh race condition
    const existing = await prisma.testParameterPdf.findFirst({
      where: { pdfUrl: initialData.pdfUrl },
    });

    if (existing) {
      return [existing];
    }

    const created = await prisma.testParameterPdf.create({
      data: {
        title: initialData.title,
        description: initialData.description || null,
        pdfUrl: initialData.pdfUrl,
        fileName: initialData.fileName,
        fileSize: initialData.fileSize,
        order: 0,
        published: initialData.isPublished,
      },
    });

    return [created];
  } catch (error) {
    console.error("Error in ensureMigratedPdfs:", error);
    return [];
  }
}

/**
 * Lấy danh sách TOÀN BỘ tài liệu PDF trong Admin (cả ẩn và hiện)
 */
export async function getAllTestParameterPdfs(): Promise<TestPdfItem[]> {
  const list = await ensureMigratedPdfs();
  return list;
}

/**
 * Lấy danh sách tài liệu PDF CÔNG KHAI ngoài trang User (Trang chủ & /chi-tieu-phep-thu)
 */
export async function getPublishedTestParameterPdfs(): Promise<TestPdfItem[]> {
  await ensureMigratedPdfs();
  return await prisma.testParameterPdf.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

/**
 * Tương thích ngược: Lấy tài liệu PDF chính thức đầu tiên
 */
export async function getTestParametersPdf(): Promise<TestPdfData> {
  const publishedList = await getPublishedTestParameterPdfs();
  if (publishedList.length > 0) {
    const first = publishedList[0];
    return {
      id: first.id,
      title: first.title,
      description: first.description || "",
      pdfUrl: first.pdfUrl,
      fileName: first.fileName || path.basename(first.pdfUrl),
      fileSize: first.fileSize || "",
      updatedAt: first.updatedAt ? first.updatedAt.toISOString() : null,
      isPublished: first.published,
    };
  }

  const all = await getAllTestParameterPdfs();
  if (all.length > 0) {
    const first = all[0];
    return {
      id: first.id,
      title: first.title,
      description: first.description || "",
      pdfUrl: first.pdfUrl,
      fileName: first.fileName || path.basename(first.pdfUrl),
      fileSize: first.fileSize || "",
      updatedAt: first.updatedAt ? first.updatedAt.toISOString() : null,
      isPublished: first.published,
    };
  }

  return getDefaultTestPdf();
}

/**
 * Tạo tài liệu PDF mới (Admin)
 */
export async function createTestParameterPdf(data: {
  title: string;
  description?: string;
  pdfUrl: string;
  fileName?: string;
  fileSize?: string;
  order?: number;
  published?: boolean;
}): Promise<TestPdfItem> {
  await ensureMigratedPdfs();

  // Tìm max order hiện tại
  const lastItem = await prisma.testParameterPdf.findFirst({
    orderBy: { order: "desc" },
  });
  const newOrder = data.order !== undefined ? data.order : (lastItem ? lastItem.order + 1 : 0);

  const created = await prisma.testParameterPdf.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      pdfUrl: data.pdfUrl.trim(),
      fileName: data.fileName || path.basename(data.pdfUrl),
      fileSize: data.fileSize || null,
      order: newOrder,
      published: data.published !== false,
    },
  });

  await syncSettingWithFirstPdf();
  revalidateAllPages();
  return created;
}

/**
 * Cập nhật tài liệu PDF đang tồn tại (Admin)
 */
export async function updateTestParameterPdf(
  id: string,
  data: {
    title?: string;
    description?: string;
    pdfUrl?: string;
    fileName?: string;
    fileSize?: string;
    order?: number;
    published?: boolean;
  }
): Promise<TestPdfItem> {
  const updated = await prisma.testParameterPdf.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title.trim() }),
      ...(data.description !== undefined && { description: data.description?.trim() || null }),
      ...(data.pdfUrl !== undefined && { pdfUrl: data.pdfUrl.trim() }),
      ...(data.fileName !== undefined && { fileName: data.fileName }),
      ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
      ...(data.order !== undefined && { order: data.order }),
      ...(data.published !== undefined && { published: data.published }),
    },
  });

  await syncSettingWithFirstPdf();
  revalidateAllPages();
  return updated;
}

/**
 * Xóa tài liệu PDF (Admin)
 */
export async function deleteTestParameterPdf(id: string): Promise<boolean> {
  const item = await prisma.testParameterPdf.findUnique({ where: { id } });
  if (!item) return false;

  await prisma.testParameterPdf.delete({ where: { id } });

  // Nếu file riêng và không phải file gốc thanh-chuong-cbhs.pdf thì xóa file lưu trữ
  if (
    item.pdfUrl &&
    item.pdfUrl.startsWith("/documents/") &&
    !item.pdfUrl.includes("thanh-chuong-cbhs.pdf")
  ) {
    try {
      const filePath = path.join(process.cwd(), "public", item.pdfUrl);
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    } catch (e) {
      console.warn("Could not delete physical pdf file:", e);
    }
  }

  await syncSettingWithFirstPdf();
  revalidateAllPages();
  return true;
}

/**
 * Thay đổi thứ tự nhiều tài liệu (Admin)
 */
export async function reorderTestParameterPdfs(
  items: { id: string; order: number }[]
): Promise<void> {
  for (const item of items) {
    await prisma.testParameterPdf.update({
      where: { id: item.id },
      data: { order: item.order },
    });
  }
  await syncSettingWithFirstPdf();
  revalidateAllPages();
}

/**
 * Đồng bộ Setting cũ với tài liệu đầu tiên để đảm bảo các thành phần cũ vẫn hoạt động trơn tru
 */
async function syncSettingWithFirstPdf(): Promise<void> {
  try {
    const first = await prisma.testParameterPdf.findFirst({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (first) {
      await prisma.setting.upsert({
        where: { key: SETTING_KEY },
        update: {
          value: JSON.stringify({
            title: first.title,
            description: first.description || "",
            pdfUrl: first.pdfUrl,
            fileName: first.fileName || path.basename(first.pdfUrl),
            fileSize: first.fileSize || "",
            updatedAt: first.updatedAt.toISOString(),
            isPublished: first.published,
          }),
        },
        create: {
          key: SETTING_KEY,
          value: JSON.stringify({
            title: first.title,
            description: first.description || "",
            pdfUrl: first.pdfUrl,
            fileName: first.fileName || path.basename(first.pdfUrl),
            fileSize: first.fileSize || "",
            updatedAt: first.updatedAt.toISOString(),
            isPublished: first.published,
          }),
        },
      });
    }
  } catch (e) {
    console.warn("Sync setting warning:", e);
  }
}

/**
 * Revalidate toàn bộ cache Next.js
 */
function revalidateAllPages() {
  try {
    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");
    revalidatePath("/", "layout");
  } catch (e) {
    console.warn("Revalidation warning:", e);
  }
}
