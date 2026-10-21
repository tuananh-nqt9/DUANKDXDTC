"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  Upload,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  HardDrive,
  Calendar,
  Globe,
  FileCheck,
  FileUp,
  X,
  ArrowRight,
} from "lucide-react";
import { parseApiResponse } from "@/lib/api-client";

interface PdfSetting {
  title: string;
  pdfUrl: string;
  fileName: string;
  fileSize: string;
  updatedAt: string | null;
  isPublished: boolean;
}

export default function TestPdfManager() {
  // Dữ liệu tài liệu PDF hiện tại đang hoạt động trên website
  const [currentPdf, setCurrentPdf] = useState<PdfSetting | null>(null);

  // Form dữ liệu chỉnh sửa / thay thế
  const [formData, setFormData] = useState({
    title: "",
    pdfUrl: "",
    fileName: "",
    fileSize: "",
  });

  // Trạng thái file mới đang chọn / upload
  const [newFileUploaded, setNewFileUploaded] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);

  // Loading & UI state
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCurrentPreview, setShowCurrentPreview] = useState(true);
  const [showReplaceForm, setShowReplaceForm] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceSectionRef = useRef<HTMLDivElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Dọn dẹp Blob URL khi unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  // Tải dữ liệu PDF hiện tại từ API
  useEffect(() => {
    fetchCurrentPdf();
  }, []);

  const fetchCurrentPdf = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/test-parameters-pdf", {
        cache: "no-store",
      });
      const parsed = await parseApiResponse<PdfSetting>(res, "Không thể tải thông tin PDF hiện tại");
      if (!parsed.ok || !parsed.data) throw new Error(parsed.error || "Không thể tải thông tin PDF hiện tại");
      const data = parsed.data;

      setCurrentPdf(data);
      setFormData({
        title: data.title || "Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)",
        pdfUrl: data.pdfUrl || "",
        fileName: data.fileName || "",
        fileSize: data.fileSize || "",
      });
      setNewFileUploaded(false);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Không thể kết nối đến máy chủ để lấy thông tin PDF.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Kích hoạt thay thế PDF
  const handleTriggerReplace = () => {
    setShowReplaceForm(true);
    setTimeout(() => {
      fileInputRef.current?.click();
      replaceSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Upload file PDF từ máy tính
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input để có thể chọn lại file cùng tên
    e.target.value = "";

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
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

    // TẠO BLOB URL ĐỂ XEM TRƯỚC TỨC THÌ (0ms latency, không phụ thuộc server)
    if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    const localBlob = URL.createObjectURL(file);
    blobUrlRef.current = localBlob;
    setPreviewBlobUrl(localBlob);
    setNewFileUploaded(true);
    setShowReplaceForm(true);

    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

    // Cập nhật thông tin file tạm thời
    setFormData((prev) => ({
      ...prev,
      fileName: file.name,
      fileSize: sizeFormatted,
    }));

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: uploadFormData,
      });

      const parsed = await parseApiResponse(res, "Tải lên file PDF thất bại");

      if (!parsed.ok || !parsed.data?.url) {
        throw new Error(parsed.error || "Tải lên file PDF thất bại");
      }

      const resData = parsed.data;

      // Cập nhật form với URL file thật trên server
      setFormData((prev) => ({
        ...prev,
        pdfUrl: resData.url,
        fileName: resData.originalName || resData.filename,
        fileSize: resData.fileSize || sizeFormatted,
      }));
      setNewFileUploaded(true);
      setShowReplaceForm(true);

      setMessage({
        type: "success",
        text: `✓ Đã tải lên máy chủ thành công: "${resData.originalName || resData.filename}" (${resData.fileSize || sizeFormatted}). Nhấn "Lưu & Công khai lên Website" để đưa vào hoạt động chính thức.`,
      });
    } catch (err) {
      // Nếu upload thất bại, hủy blob và hoàn tác
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setPreviewBlobUrl(null);
      setNewFileUploaded(false);

      if (currentPdf) {
        setFormData({
          title: currentPdf.title,
          pdfUrl: currentPdf.pdfUrl,
          fileName: currentPdf.fileName,
          fileSize: currentPdf.fileSize,
        });
      }

      setMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Upload PDF thất bại. File cũ trên website vẫn được bảo toàn nguyên vẹn.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Hủy thay thế, quay về file cũ
  const handleCancelReplace = () => {
    if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setPreviewBlobUrl(null);

    if (currentPdf) {
      setFormData({
        title: currentPdf.title,
        pdfUrl: currentPdf.pdfUrl,
        fileName: currentPdf.fileName,
        fileSize: currentPdf.fileSize,
      });
    }
    setNewFileUploaded(false);
    setShowReplaceForm(false);
    setMessage({ type: "", text: "" });
  };

  // Lưu & công khai lên website
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const targetUrl = formData.pdfUrl?.trim() || currentPdf?.pdfUrl?.trim();
    if (!targetUrl) {
      setMessage({
        type: "error",
        text: "Vui lòng chọn file PDF hoặc nhập đường dẫn trước khi lưu!",
      });
      return;
    }

    if (!formData.title?.trim()) {
      setMessage({
        type: "error",
        text: "Tiêu đề văn bản công bố không được để trống!",
      });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        title: formData.title.trim(),
        pdfUrl: targetUrl,
        fileName: formData.fileName || (currentPdf ? currentPdf.fileName : "danh-muc-chi-tieu.pdf"),
        fileSize: formData.fileSize || (currentPdf ? currentPdf.fileSize : ""),
        isPublished: true,
      };

      const res = await fetch("/api/admin/test-parameters-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const parsed = await parseApiResponse(res, "Lưu tài liệu thất bại");

      if (!parsed.ok || !parsed.data) {
        throw new Error(parsed.error || "Lưu tài liệu thất bại");
      }

      const result = parsed.data;

      // Dọn dẹp blob URL tạm nếu có
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setPreviewBlobUrl(null);

      // Cập nhật lại state hiện tại
      setCurrentPdf(result.data);
      setNewFileUploaded(false);
      setShowReplaceForm(false);

      setMessage({
        type: "success",
        text: "✓ Đã lưu và công khai thành công! Website kdxdthanhchuong.vn đã cập nhật tài liệu PDF mới nhất.",
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

  // Định dạng ngày hiển thị
  const formattedDate = currentPdf?.updatedAt
    ? new Date(currentPdf.updatedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Đã thiết lập mặc định";

  // Kiểm tra nút Lưu có nên enable không:
  // Nút luôn enable khi đã có ít nhất 1 file pdf (hoặc từ hiện tại hoặc vừa upload/nhập) và không đang upload/saving
  const canSave =
    !saving &&
    !uploading &&
    Boolean((formData.pdfUrl && formData.pdfUrl.trim()) || (currentPdf && currentPdf.pdfUrl));

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-red-600 border-t-transparent mx-auto mb-3"></div>
        <p className="text-sm font-semibold text-gray-700">Đang đồng bộ dữ liệu PDF với website...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* ============================================================== */}
      {/* KHỐI 1: TÀI LIỆU PDF HIỆN TẠI (ĐANG CÔNG KHAI TRÊN WEBSITE)     */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border-2 border-green-500/30 shadow-md p-6 relative overflow-hidden">
        {/* Dải màu trang trí phía trên */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-primary-500 to-red-500" />

        {/* Header khối hiện tại */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-extrabold rounded-full flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Đang hiển thị công khai trên Website
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-primary-600" />
                  kdxdthanhchuong.vn
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1.5">
                {currentPdf?.title || "Tài liệu danh mục chỉ tiêu & phép thử"}
              </h2>
            </div>
          </div>

          {/* Nhóm nút Xem tài liệu & Thay thế PDF */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            {currentPdf?.pdfUrl && (
              <a
                href={currentPdf.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold rounded-xl transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-gray-600" />
                Xem tài liệu
              </a>
            )}

            <button
              type="button"
              onClick={handleTriggerReplace}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4" />
              Thay thế PDF
            </button>
          </div>
        </div>

        {/* Bảng thông số chi tiết của file PDF hiện tại */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-gray-100 bg-gray-50/60 rounded-xl px-4 mt-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tên file:</span>
            <p className="text-sm font-bold text-gray-900 truncate" title={currentPdf?.fileName}>
              {currentPdf?.fileName || "thanh-chuong-cbhs.pdf"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5" /> Dung lượng file:
            </span>
            <p className="text-sm font-bold text-gray-900">
              {currentPdf?.fileSize || "3.69 MB"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Ngày cập nhật:
            </span>
            <p className="text-sm font-bold text-gray-900">{formattedDate}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Đường dẫn server:</span>
            <p className="text-xs font-mono font-medium text-gray-700 truncate" title={currentPdf?.pdfUrl}>
              {currentPdf?.pdfUrl || "/documents/thanh-chuong-cbhs.pdf"}
            </p>
          </div>
        </div>

        {/* Khung xem trước trực tiếp tài liệu hiện tại */}
        {currentPdf?.pdfUrl && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-600" />
                Khung xem trước tài liệu PDF đang hiển thị ngoài website:
              </h3>
              <button
                type="button"
                onClick={() => setShowCurrentPreview(!showCurrentPreview)}
                className="text-xs text-primary-600 hover:text-primary-800 font-semibold inline-flex items-center gap-1"
              >
                {showCurrentPreview ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Thu gọn
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Mở rộng xem trước
                  </>
                )}
              </button>
            </div>

            {showCurrentPreview && (
              <div className="w-full h-[550px] bg-slate-900 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
                <iframe
                  src={`${currentPdf.pdfUrl}#toolbar=1&navpanes=1`}
                  className="w-full h-full border-0"
                  title="Xem trước PDF hiện tại"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* KHỐI 2: THAY THẾ & CẬP NHẬT TÀI LIỆU PDF MỚI                   */}
      {/* ============================================================== */}
      <div
        ref={replaceSectionRef}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
      >
        <div className="flex items-center justify-between pb-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Thay thế &amp; Cập nhật tài liệu PDF
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Chọn file PDF mới từ máy tính hoặc chỉnh sửa tiêu đề văn bản, sau đó nhấn Lưu để công khai.
              </p>
            </div>
          </div>

          {newFileUploaded && (
            <button
              type="button"
              onClick={handleCancelReplace}
              className="text-xs text-gray-500 hover:text-red-600 font-semibold inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4" /> Hủy thay thế
            </button>
          )}
        </div>

        {/* Thông báo Alert */}
        {message.text && (
          <div
            className={`my-5 p-4 rounded-xl text-sm flex items-start gap-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-900"
                : "bg-red-50 border border-red-200 text-red-900"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <span className="font-medium leading-relaxed">{message.text}</span>
          </div>
        )}

        {/* Form nhập liệu */}
        <form onSubmit={handleSave} className="py-5 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Tiêu đề văn bản công bố <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="VD: Công bố thông tin về năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng (LAS-XD 795)"
              className="form-input font-medium"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tiêu đề này sẽ hiển thị làm tiêu đề của tài liệu trên trang chủ.
            </p>
          </div>

          {/* Khu vực chọn file PDF mới */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Tải lên file PDF thay thế từ máy tính
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
                newFileUploaded
                  ? "border-green-500 bg-green-50/30"
                  : "border-gray-300 hover:border-primary-500 bg-gray-50 hover:bg-primary-50/20"
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent mb-3"></div>
                  <p className="text-sm font-bold text-gray-800">Đang tải file PDF mới lên máy chủ...</p>
                  <p className="text-xs text-gray-500 mt-1">Vui lòng đợi giây lát</p>
                </div>
              ) : newFileUploaded ? (
                <div className="flex flex-col items-center justify-center py-2 text-green-800">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold">
                    Đã chọn file mới: {formData.fileName} ({formData.fileSize})
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Nhấp vào đây nếu bạn muốn chọn file khác
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    Nhấp để chọn file PDF mới từ thiết bị
                  </p>
                  <p className="text-xs text-gray-500">
                    Định dạng .pdf (Dung lượng tối đa 50MB). File cũ sẽ vẫn được giữ nguyên cho đến khi bạn nhấn Lưu.
                  </p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Ô nhập đường dẫn thủ công */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Đường dẫn file PDF đang chọn:
            </label>
            <input
              type="text"
              value={formData.pdfUrl}
              onChange={(e) => {
                setFormData({ ...formData, pdfUrl: e.target.value });
                setNewFileUploaded(true);
              }}
              placeholder="/documents/thanh-chuong-cbhs.pdf"
              className="form-input font-mono text-xs"
            />
          </div>

          {/* Khung xem trước của file mới vừa chọn trước khi lưu */}
          {newFileUploaded && (previewBlobUrl || formData.pdfUrl) && (
            <div className="p-4 bg-amber-50/70 border-2 border-amber-300 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-600" />
                  Xem trước file PDF MỚI vừa chọn ({formData.fileName || "Tài liệu mới"}):
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-md border border-amber-200">
                    Chưa công khai lên Website
                  </span>
                  {(previewBlobUrl || formData.pdfUrl) && (
                    <a
                      href={previewBlobUrl || formData.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-700 hover:text-primary-900 font-bold inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md shadow-xs border border-amber-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Mở tab mới
                    </a>
                  )}
                </div>
              </div>
              <div className="w-full h-[480px] bg-slate-900 rounded-lg overflow-hidden border border-amber-300 shadow-sm relative">
                <iframe
                  src={`${previewBlobUrl || formData.pdfUrl}#toolbar=1&navpanes=1`}
                  className="w-full h-full border-0"
                  title="Xem trước file mới"
                />
              </div>
            </div>
          )}

          {/* Nút hành động Lưu & Công khai */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              💡 Sau khi nhấn &quot;Lưu &amp; Công khai&quot;, trang User tại <span className="font-semibold text-gray-700">kdxdthanhchuong.vn</span> sẽ tự động chuyển sang file này ngay lập tức.
            </p>

            <div className="flex items-center gap-3">
              {newFileUploaded && (
                <button
                  type="button"
                  onClick={handleCancelReplace}
                  className="px-4 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
                >
                  Hủy
                </button>
              )}

              <button
                type="submit"
                disabled={!canSave}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Đang lưu &amp; Công khai...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Lưu &amp; Công khai lên Website
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
