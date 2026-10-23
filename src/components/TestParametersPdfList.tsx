"use client";

import { useState } from "react";
import {
  FileText,
  ExternalLink,
  Download,
  Calendar,
  HardDrive,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Layers,
} from "lucide-react";
import type { TestPdfItem } from "@/lib/test-pdf-service";

interface TestParametersPdfListProps {
  documents: TestPdfItem[];
  title?: string;
  subtitle?: string;
  showCategoryHeading?: boolean;
}

export default function TestParametersPdfList({
  documents,
  title = "DANH MỤC CHỈ TIÊU & PHÉP THỬ",
  subtitle = "Văn bản công bố năng lực hoạt động thí nghiệm chuyên ngành xây dựng được Bộ Xây dựng công nhận (LAS-XD 795)",
  showCategoryHeading = true,
}: TestParametersPdfListProps) {
  // Mặc định tài liệu đầu tiên được mở ra xem
  const [activeDocId, setActiveDocId] = useState<string>(
    documents[0]?.id || ""
  );

  // Mảng các tài liệu đang được mở rộng (hỗ trợ mở đồng thời nếu muốn)
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({
    [documents[0]?.id || ""]: true,
  });

  if (!documents || documents.length === 0) {
    return null;
  }

  const toggleExpand = (id: string) => {
    setExpandedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setActiveDocId(id);
  };

  return (
    <div className="w-full">
      {/* Tiêu đề & Giới thiệu */}
      {showCategoryHeading && (
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 bg-red-600 text-white rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4 shadow-sm">
            PHẠM VI HOẠT ĐỘNG
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight break-words px-2 leading-tight">
            {title}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-primary-700 bg-primary-50 py-1.5 px-3.5 sm:px-4 rounded-full max-w-fit mx-auto border border-primary-100">
            <Layers className="w-4 h-4 text-primary-600 flex-shrink-0" />
            <span>Hệ thống gồm {documents.length} tài liệu công bố chính thức</span>
          </div>
        </div>
      )}

      {/* DANH SÁCH CÁC TÀI LIỆU PDF */}
      <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto w-full min-w-0">
        {documents.map((doc, index) => {
          const isExpanded = !!expandedDocs[doc.id];
          const timestamp = doc.updatedAt
            ? new Date(doc.updatedAt).getTime()
            : Date.now();
          const cacheBustedUrl = `${doc.pdfUrl}?v=${timestamp}`;
          const embedUrl = `${cacheBustedUrl}#toolbar=1&navpanes=1`;

          const formattedDate = doc.updatedAt
            ? new Date(doc.updatedAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : null;

          return (
            <div
              key={doc.id}
              className={`bg-white border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 w-full min-w-0 ${
                isExpanded
                  ? "border-red-500 ring-2 ring-red-500/20 shadow-xl"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              {/* ACTION BAR / HEADER TÀI LIỆU */}
              <div
                className={`p-4 sm:p-5 md:p-6 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isExpanded ? "bg-slate-50/80 border-b border-gray-200" : "bg-white"
                }`}
              >
                {/* Thông tin tài liệu */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 w-full lg:w-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-base sm:text-lg shadow-xs">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-red-200">
                        Tài liệu {index + 1}
                      </span>
                      <span className="text-[10px] sm:text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-green-200">
                        <FileCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                        Chính thức
                      </span>
                    </div>

                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg md:text-xl leading-snug break-words">
                      {doc.title}
                    </h3>

                    {doc.description && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                        {doc.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-gray-500 mt-2 font-medium">
                      {doc.fileSize && (
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">
                          <HardDrive className="w-3 h-3 text-gray-500" />
                          {doc.fileSize}
                        </span>
                      )}
                      {formattedDate && (
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          Cập nhật: {formattedDate}
                        </span>
                      )}
                      <span className="font-mono text-gray-400 truncate max-w-xs hidden sm:inline">
                        {doc.fileName || doc.pdfUrl}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Các nút hành động */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100 flex-shrink-0 min-w-0">
                  {/* Nút Thu gọn / Mở rộng xem văn bản */}
                  <button
                    onClick={() => toggleExpand(doc.id)}
                    className={`col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                      isExpanded
                        ? "bg-slate-800 text-white hover:bg-slate-900 shadow-sm"
                        : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    }`}
                  >
                    {isExpanded ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Thu gọn tài liệu</span>
                        <ChevronUp className="w-4 h-4 ml-0.5" />
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-red-600" />
                        <span>Xem trực tiếp PDF</span>
                        <ChevronDown className="w-4 h-4 ml-0.5" />
                      </>
                    )}
                  </button>

                  {/* Nút Mở tab mới */}
                  <a
                    href={cacheBustedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors min-w-0"
                    title="Mở toàn màn hình trong tab mới"
                  >
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">Mở tab mới</span>
                  </a>

                  {/* Nút Tải file PDF */}
                  <a
                    href={cacheBustedUrl}
                    download={doc.fileName || `chi-tieu-phep-thu-${index + 1}.pdf`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-red-600/20 transition-all min-w-0"
                  >
                    <Download className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">Tải về PDF</span>
                  </a>
                </div>
              </div>

              {/* KHUNG HIỂN THỊ NỘI DUNG PDF (Lazy loaded khi expand) */}
              {isExpanded && (
                <div className="bg-slate-900 overflow-hidden relative animate-fade-in w-full max-w-full">
                  <div className="w-full max-w-full h-[450px] sm:h-[650px] md:h-[800px] lg:h-[900px] bg-neutral-900 overflow-hidden">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full max-w-full border-0 block"
                      style={{ minWidth: "100%", width: "1px" }}
                      title={doc.title}
                      loading="lazy"
                    >
                      <div className="p-6 text-center text-white flex flex-col items-center justify-center h-full max-w-md mx-auto">
                        <FileText className="w-10 h-10 text-red-500 mb-3" />
                        <p className="text-base font-semibold mb-2">Trình duyệt không hỗ trợ nhúng trực tiếp file PDF.</p>
                        <p className="text-xs text-gray-300 mb-5">Bạn có thể tải file hoặc mở trên tab mới để xem toàn bộ tài liệu.</p>
                        <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                          <a href={cacheBustedUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !text-white !border-white/30 text-xs py-2.5 justify-center">
                            Mở tab mới
                          </a>
                          <a href={cacheBustedUrl} download className="btn-primary !bg-red-600 hover:!bg-red-700 text-xs py-2.5 justify-center">
                            Tải về máy
                          </a>
                        </div>
                      </div>
                    </iframe>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
