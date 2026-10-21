import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  Printer,
  Calendar,
  HardDrive,
  AlertCircle,
  FileCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PdfData {
  title: string;
  pdfUrl: string;
  fileName: string;
  fileSize: string;
  updatedAt: string | null;
}

export default async function TestCategoriesSection() {
  // Lấy cấu hình tài liệu PDF từ database (quản lý qua Admin)
  let pdfData: PdfData | null = null;

  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "test_parameters_pdf" },
    });

    if (setting?.value) {
      try {
        pdfData = JSON.parse(setting.value);
      } catch {
        pdfData = {
          title: "Danh mục chỉ tiêu và phép thử phòng thí nghiệm LAS-XD 795",
          pdfUrl: setting.value,
          fileName: "danh-muc-chi-tieu-phep-thu.pdf",
          fileSize: "",
          updatedAt: setting.updatedAt?.toISOString() || null,
        };
      }
    }
  } catch (error) {
    console.error("Error loading test parameters PDF in section:", error);
  }

  // Fallback nếu chưa cấu hình trong Setting
  if (!pdfData || !pdfData.pdfUrl) {
    pdfData = {
      title: "Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)",
      pdfUrl: "/documents/thanh-chuong-cbhs.pdf",
      fileName: "thanh-chuong-cbhs.pdf",
      fileSize: "3.87 MB",
      updatedAt: null,
    };
  }

  const { title, pdfUrl, fileName, fileSize, updatedAt } = pdfData;

  // Gắn timestamp query để chống cache trình duyệt khi admin thay đổi file mới
  const timestamp = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  const cacheBustedUrl = pdfUrl ? `${pdfUrl}?v=${timestamp}` : "";
  const embedUrl = cacheBustedUrl ? `${cacheBustedUrl}#toolbar=1&navpanes=1` : "";

  // Format ngày tháng hiển thị
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  return (
    <section id="chi-tieu-phep-thu" className="py-20 bg-gray-50/70 border-t border-b border-gray-200">
      <div className="container-custom">
        {/* Tiêu đề & Badge theo phong cách website tham khảo */}
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-1.5 bg-red-600 text-white rounded-full font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            PHẠM VI HOẠT ĐỘNG
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            DANH MỤC CHỈ TIÊU &amp; PHÉP THỬ
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Văn bản công bố năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng
            của Phòng Thí Nghiệm LAS-XD 795
          </p>
        </div>

        {/* Khung hiển thị PDF trực tiếp */}
        {pdfUrl ? (
          <div className="max-w-6xl mx-auto">
            {/* Action Bar phía trên khung xem PDF */}
            <div className="bg-white border border-gray-200 rounded-t-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-base md:text-lg truncate">
                    {title || "Danh mục chỉ tiêu và phép thử LAS-XD 795"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-0.5">
                    {fileSize && (
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3.5 h-3.5" />
                        {fileSize}
                      </span>
                    )}
                    {formattedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Cập nhật: {formattedDate}
                      </span>
                    )}
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      Văn bản chính thức
                    </span>
                  </div>
                </div>
              </div>

              {/* Nhóm nút hành động */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={cacheBustedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                  title="Mở toàn màn hình trong tab mới"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Mở tab mới</span>
                </a>

                <a
                  href={cacheBustedUrl}
                  download={fileName || "danh-muc-chi-tieu-phep-thu.pdf"}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file PDF</span>
                </a>
              </div>
            </div>

            {/* Khung nhúng PDF Viewer */}
            <div className="bg-slate-800 rounded-b-2xl overflow-hidden shadow-2xl border-x border-b border-gray-200 relative">
              <div className="w-full h-[650px] md:h-[850px] lg:h-[950px] bg-neutral-900">
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  title={title || "Danh mục chỉ tiêu và phép thử"}
                >
                  <div className="p-8 text-center text-white flex flex-col items-center justify-center h-full">
                    <p className="text-lg mb-4">Trình duyệt không hỗ trợ xem trực tiếp tài liệu PDF.</p>
                    <a
                      href={cacheBustedUrl}
                      download
                      className="btn-primary !bg-red-600 hover:!bg-red-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Tải về máy để xem
                    </a>
                  </div>
                </iframe>
              </div>
            </div>

            {/* Ghi chú chân khung */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 px-2">
              <p>
                💡 Mẹo: Sử dụng thanh công cụ bên trong để phóng to, thu nhỏ, cuộn nhiều trang và chuyển nhanh giữa các trang.
              </p>
              <Link
                href="/chi-tieu-phep-thu"
                className="text-primary-600 hover:underline font-medium flex items-center gap-1"
              >
                Xem chi tiết tại trang Danh mục chỉ tiêu &rarr;
              </Link>
            </div>
          </div>
        ) : (
          /* Trạng thái chưa có tài liệu */
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tài liệu đang được cập nhật
            </h3>
            <p className="text-gray-600 mb-6">
              Danh mục chỉ tiêu &amp; phép thử của phòng thí nghiệm LAS-XD 795 đang được đồng bộ.
              Quý khách vui lòng quay lại sau hoặc liên hệ với chúng tôi để nhận tài liệu trực tiếp.
            </p>
            <Link href="/lien-he" className="btn-primary">
              Liên hệ tư vấn
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
