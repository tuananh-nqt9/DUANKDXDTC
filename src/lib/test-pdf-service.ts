import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import path from "path";
import { existsSync, statSync } from "fs";

export const SETTING_KEY = "test_parameters_pdf";

export interface TestPdfData {
  title: string;
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
    pdfUrl: "/documents/thanh-chuong-cbhs.pdf",
    fileName: "thanh-chuong-cbhs.pdf",
    fileSize,
    updatedAt: new Date().toISOString(),
    isPublished: true,
  };
}

/**
 * Lấy thông tin tài liệu PDF Chỉ tiêu & phép thử.
 * Đảm bảo: Nếu chưa có trong database, tự động khởi tạo bằng file mặc định của công ty
 * để Admin và User luôn luôn nhìn thấy CÙNG MỘT NGUỒN DỮ LIỆU.
 */
export async function getTestParametersPdf(): Promise<TestPdfData> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: SETTING_KEY },
    });

    if (setting && setting.value) {
      try {
        const parsed = JSON.parse(setting.value);
        if (parsed.pdfUrl && parsed.pdfUrl.trim() !== "") {
          return {
            title: parsed.title || "Danh mục chỉ tiêu và phép thử LAS-XD 795",
            pdfUrl: parsed.pdfUrl,
            fileName: parsed.fileName || path.basename(parsed.pdfUrl),
            fileSize: parsed.fileSize || "",
            updatedAt: parsed.updatedAt || setting.updatedAt?.toISOString() || null,
            isPublished: parsed.isPublished !== false,
          };
        }
      } catch (parseError) {
        // Nếu value là string URL đơn thuần
        return {
          title: "Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)",
          pdfUrl: setting.value,
          fileName: path.basename(setting.value),
          fileSize: "",
          updatedAt: setting.updatedAt?.toISOString() || null,
          isPublished: true,
        };
      }
    }

    // Nếu chưa có trong database -> Tự động khởi tạo bằng file mặc định đang có
    const defaultData = getDefaultTestPdf();

    try {
      await prisma.setting.upsert({
        where: { key: SETTING_KEY },
        update: {
          value: JSON.stringify(defaultData),
        },
        create: {
          key: SETTING_KEY,
          value: JSON.stringify(defaultData),
        },
      });
    } catch (dbError) {
      console.warn("Could not auto-seed test_parameters_pdf in DB:", dbError);
    }

    return defaultData;
  } catch (error) {
    console.error("Error in getTestParametersPdf:", error);
    return getDefaultTestPdf();
  }
}

/**
 * Cập nhật thông tin tài liệu PDF vào database và xóa cache các trang liên quan.
 */
export async function saveTestParametersPdf(
  data: Partial<TestPdfData>
): Promise<TestPdfData> {
  const current = await getTestParametersPdf();

  const updated: TestPdfData = {
    title: (data.title && data.title.trim()) || current.title,
    pdfUrl: (data.pdfUrl && data.pdfUrl.trim()) || current.pdfUrl,
    fileName: (data.fileName && data.fileName.trim()) || (data.pdfUrl ? path.basename(data.pdfUrl) : current.fileName),
    fileSize: data.fileSize !== undefined ? data.fileSize : current.fileSize,
    updatedAt: new Date().toISOString(),
    isPublished: data.isPublished !== undefined ? data.isPublished : true,
  };

  await prisma.setting.upsert({
    where: { key: SETTING_KEY },
    update: {
      value: JSON.stringify(updated),
    },
    create: {
      key: SETTING_KEY,
      value: JSON.stringify(updated),
    },
  });

  // Revalidate toàn bộ các trang người dùng và admin
  try {
    revalidatePath("/");
    revalidatePath("/chi-tieu-phep-thu");
    revalidatePath("/admin/test-categories");
    revalidatePath("/", "layout");
  } catch (e) {
    console.warn("Revalidation warning:", e);
  }

  return updated;
}
