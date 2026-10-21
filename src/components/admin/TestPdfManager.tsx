"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  HardDrive,
  Calendar,
  Sparkles,
} from "lucide-react";

interface PdfSetting {
  title: string;
  pdfUrl: string;
  fileName: string;
  fileSize: string;
  updatedAt: string | null;
}

export default function TestPdfManager() {
  const [data, setData] = useState<PdfSetting>({
    title: "Danh mục chỉ tiêu và phép thử phòng thí nghiệm LAS-XD 795",
    pdfUrl: "",
    fileName: "",
    fileSize: "",
    updatedAt: null,
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tải dữ liệu PDF hiện tại
  useEffect(() => {
    fetchPdfData();
  }, []);

  const fetchPdfData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/test-parameters-pdf", { cache: "no-store" });
      if (!res.ok) throw new Error("Không thể tải thông tin PDF");
      const result = await res.json();
      setData({
        title: result.title || "Danh mục chỉ tiêu và phép thử phòng thí nghiệm LAS-XD 795",
        pdfUrl: result.pdfUrl || "",
        fileName: result.fileName || "",
        fileSize: result.fileSize || "",
        updatedAt: result.updatedAt || null,
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Không thể tải dữ liệu PDF hiện tại.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Upload file PDF từ máy tính
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setMessage({
        type: "error",
        text: "Chỉ chấp nhận file định dạng PDF (.pdf)!",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Dung lượng file vượt quá giới hạn 50MB!",
      });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      if (!res.ok || !resData.url) {
        throw new Error(resData.error || "Tải lên file PDF thất bại");
      }

      // Cập nhật state với file vừa upload
      setData((prev) => ({
        ...prev,
        pdfUrl: resData.url,
        fileName: resData.originalName || resData.filename,
        fileSize: resData.fileSize || "",
      }));

      setMessage({
        type: "success",
        text: "✓ Đã tải file PDF lên thành công! Nhấn 'Lưu & Công khai' bên dưới để áp dụng lên website.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload PDF thất bại. Vui lòng thử lại.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Lưu và công khai lên website
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!data.pdfUrl || !data.pdfUrl.trim()) {
      setMessage({
        type: "error",
        text: "Vui lòng chọn hoặc tải lên file PDF trước khi lưu!",
      });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Lưu tài liệu thất bại");
      }

      setData((prev) => ({
        ...prev,
        updatedAt: result.data?.updatedAt || new Date().toISOString(),
      }));

      setMessage({
        type: "success",
        text: "✓ Lưu và công khai thành công! Website kdxdthanhchuong.vn đã được cập nhật file PDF mới.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Có lỗi xảy ra khi lưu tài liệu.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Xóa tài liệu PDF
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa tài liệu PDF này khỏi website?")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Xóa tài liệu thất bại");

      setData({
        title: "Danh mục chỉ tiêu và phép thử",
        pdfUrl: "",
        fileName: "",
        fileSize: "",
        updatedAt: null,
      });

      setMessage({
        type: "success",
        text: "✓ Đã xóa tài liệu PDF thành công khỏi website.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Lỗi khi xóa tài liệu.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = data.updatedAt
    ? new Date(data.updatedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
      {/* Tiêu đề Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                Tài liệu PDF: Danh mục chỉ tiêu &amp; phép thử
              </h2>
              <span className="px-2.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                Hiển thị trang chủ
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              File PDF này sẽ được nhúng trực tiếp vào mục &quot;DANH MỤC CHỈ TIÊU &amp; PHÉP THỬ&quot; tại trang chủ và trang năng lực.
            </p>
          </div>
        </div>

        {data.pdfUrl && (
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors self-start md:self-auto"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Ẩn khung xem trước" : "Hiện khung xem trước"}
          </button>
        )}
      </div>

      {/* Thông báo trạng thái */}
      {message.text && (
        <div
          className={`my-4 p-4 rounded-xl text-sm flex items-start gap-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Form chỉnh sửa & Upload */}
      <div className="py-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Tiêu đề văn bản công bố <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="VD: Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)"
            className="form-input"
          />
        </div>

        {/* Khung thông tin file hiện tại */}
        {data.pdfUrl ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                PDF
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">
                  {data.fileName || "Tài liệu chỉ tiêu phép thử"}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-0.5">
                  <span className="font-mono text-gray-600">{data.pdfUrl}</span>
                  {data.fileSize && (
                    <span className="flex items-center gap-1 font-medium">
                      <HardDrive className="w-3.5 h-3.5" />
                      {data.fileSize}
                    </span>
                  )}
                  {formattedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formattedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-colors"
                title="Mở tài liệu trong tab mới"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Thay thế file khác
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa file
              </button>
            </div>
          </div>
        ) : (
          /* Khung Upload khi chưa có file */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-red-500 bg-gray-50 hover:bg-red-50/20 rounded-2xl p-8 text-center cursor-pointer transition-all group"
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent mb-3"></div>
                <p className="text-sm font-bold text-gray-800">Đang tải file PDF lên máy chủ...</p>
                <p className="text-xs text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <p className="text-base font-bold text-gray-800 mb-1">
                  Nhấp để chọn file PDF từ máy tính
                </p>
                <p className="text-xs text-gray-500">
                  Chỉ chấp nhận file định dạng .pdf (Dung lượng tối đa 50MB)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Input file ẩn */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Hoặc nhập URL trực tiếp nếu cần */}
        <div className="pt-2">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Hoặc nhập đường dẫn file PDF thủ công (nếu file đã có sẵn trên máy chủ):
          </label>
          <input
            type="text"
            value={data.pdfUrl}
            onChange={(e) => setData({ ...data, pdfUrl: e.target.value })}
            placeholder="/documents/thanh-chuong-cbhs.pdf"
            className="form-input font-mono text-xs"
          />
        </div>
      </div>

      {/* Nút hành động Lưu */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          ⚠️ Sau khi nhấn &quot;Lưu &amp; Công khai&quot;, trang chủ sẽ tự động cập nhật ngay file PDF mới.
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving || uploading || !data.pdfUrl}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {saving ? "Đang lưu..." : "Lưu & Công khai lên Website"}
        </button>
      </div>

      {/* Khung Xem trước PDF trực tiếp */}
      {showPreview && data.pdfUrl && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary-600" />
              Bản xem trước tài liệu PDF trên website:
            </h3>
            <span className="text-xs text-gray-500">
              Trình xem PDF này tương tự giao diện người dùng nhìn thấy
            </span>
          </div>
          <div className="w-full h-[650px] bg-slate-800 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
            <iframe
              src={`${data.pdfUrl}#toolbar=1&navpanes=1`}
              className="w-full h-full border-0"
              title="Bản xem trước tài liệu PDF"
            />
          </div>
        </div>
      )}
    </div>
  );
}
