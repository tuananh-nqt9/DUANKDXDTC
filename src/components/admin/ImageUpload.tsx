"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface ImageUploadProps {
  name: string;
  label: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
  helperText?: string;
}

export default function ImageUpload({
  name,
  label,
  defaultValue = "",
  onChange,
  helperText,
}: ImageUploadProps) {
  // imageUrl: URL thực tế trên máy chủ hoặc URL bên ngoài sẽ được lưu vào DB
  const [imageUrl, setImageUrl] = useState(defaultValue);
  // previewUrl: URL hiển thị tức thì cho người dùng (có thể là Blob URL hoặc server URL)
  const [previewUrl, setPreviewUrl] = useState(defaultValue);
  const [inputUrl, setInputUrl] = useState(defaultValue);
  const [mode, setMode] = useState<"file" | "url">("file");
  const [uploading, setUploading] = useState(false);
  const [validatingUrl, setValidatingUrl] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Dọn dẹp Blob URL khi unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  // Đồng bộ defaultValue nếu thay đổi từ component cha (ví dụ khi load dữ liệu chỉnh sửa)
  useEffect(() => {
    if (defaultValue !== imageUrl) {
      // Nếu có blob cũ thì dọn dẹp
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setImageUrl(defaultValue);
      setPreviewUrl(defaultValue);
      setInputUrl(defaultValue);
      setImageError(false);
    }
  }, [defaultValue]);

  // Cập nhật giá trị ra ngoài cho component cha
  const updateUrl = (url: string) => {
    setImageUrl(url);
    setImageError(false);
    onChange?.(url);
  };

  // Xử lý upload file từ máy tính
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input để có thể chọn lại file cùng tên nếu muốn
    e.target.value = "";

    // 1. Kiểm tra định dạng
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    const isExtensionValid = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);

    if (!validMimes.includes(file.type) && !isExtensionValid) {
      setStatusMessage({
        type: "error",
        text: "Định dạng không được hỗ trợ! Vui lòng chọn ảnh JPG, JPEG, PNG hoặc WebP.",
      });
      return;
    }

    // 2. Kiểm tra kích thước (tối đa 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "Dung lượng ảnh vượt quá 10MB! Vui lòng chọn ảnh nhẹ hơn.",
      });
      return;
    }

    // 3. TẠO BLOB URL ĐỂ XEM TRƯỚC TỨC THÌ (0ms latency, không sợ lỗi tải)
    if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    const localBlob = URL.createObjectURL(file);
    blobUrlRef.current = localBlob;
    setPreviewUrl(localBlob);
    setImageError(false);
    setUploading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Tải ảnh lên máy chủ thất bại");
      }

      // Upload thành công: lưu URL thật của server
      updateUrl(data.url);
      setInputUrl(data.url);
      setImageError(false);
      setStatusMessage({
        type: "success",
        text: "✓ Đã tải ảnh lên máy chủ thành công và sẵn sàng để lưu!",
      });
    } catch (err) {
      console.error("Image upload error:", err);
      // Nếu upload thất bại, hoàn tác lại preview
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setPreviewUrl(imageUrl || "");
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Upload thất bại. Vui lòng thử lại.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Kiểm tra và áp dụng URL thủ công
  const handleApplyUrl = () => {
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      setPreviewUrl("");
      updateUrl("");
      setStatusMessage({ type: "", text: "" });
      return;
    }

    // Kiểm tra định dạng URL cơ bản
    const isLocal = trimmed.startsWith("/") || trimmed.startsWith("./");
    const isHttp = trimmed.startsWith("http://") || trimmed.startsWith("https://");

    if (!isLocal && !isHttp) {
      setStatusMessage({
        type: "error",
        text: "Đường dẫn không hợp lệ. Phải bắt đầu bằng https://, http:// hoặc /uploads/...",
      });
      return;
    }

    setValidatingUrl(true);
    setStatusMessage({ type: "", text: "Đang kiểm tra hình ảnh..." });

    // Kiểm tra ảnh có tải được trong trình duyệt không
    const testImg = new Image();
    testImg.onload = () => {
      setValidatingUrl(false);
      setImageError(false);
      setPreviewUrl(trimmed);
      updateUrl(trimmed);
      setStatusMessage({
        type: "success",
        text: "✓ URL hình ảnh hợp lệ và tải thành công!",
      });
    };
    testImg.onerror = () => {
      setValidatingUrl(false);
      setStatusMessage({
        type: "error",
        text: "⚠️ Không thể tải ảnh từ URL này (URL không tồn tại hoặc máy chủ từ chối). Vui lòng kiểm tra lại link.",
      });
    };
    testImg.src = trimmed;
  };

  // Xóa ảnh đã chọn
  const handleRemove = () => {
    if (blobUrlRef.current && blobUrlRef.current.startsWith("blob:")) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setPreviewUrl("");
    updateUrl("");
    setInputUrl("");
    setImageError(false);
    setStatusMessage({ type: "", text: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasImage = Boolean(previewUrl || imageUrl);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="form-label mb-0">{label}</label>
        {/* Toggle Mode: Upload file hoặc Nhập URL */}
        <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              mode === "file"
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Tải từ máy tính
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
              mode === "url"
                ? "bg-white text-gray-900 shadow-sm font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Nhập URL ảnh
          </button>
        </div>
      </div>

      {/* Hidden input gửi vào FormData của Server Action */}
      <input type="hidden" name={name} value={imageUrl} />

      {/* KHUNG PREVIEW HÌNH ẢNH */}
      {hasImage && !imageError ? (
        <div className="relative group border border-gray-200 rounded-xl overflow-hidden bg-slate-900/5 backdrop-blur-sm">
          {/* Background checkerboard cho ảnh transparent */}
          <div
            className="w-full h-64 flex items-center justify-center p-3 relative"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          >
            <img
              src={previewUrl || imageUrl}
              alt="Xem trước hình ảnh"
              className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
              onError={() => {
                // Chỉ báo lỗi nếu không đang upload
                if (!uploading) {
                  setImageError(true);
                }
              }}
            />

            {/* Overlay loading khi đang upload */}
            {uploading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center text-white rounded-xl">
                <Loader2 className="w-8 h-8 animate-spin text-white mb-2" />
                <span className="text-xs font-semibold bg-black/60 px-3 py-1 rounded-full">
                  Đang lưu lên máy chủ...
                </span>
              </div>
            )}
          </div>

          {/* Thanh công cụ overlay trên ảnh */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 truncate text-gray-600">
              <span className="font-semibold text-gray-700">Đường dẫn:</span>
              <span className="truncate max-w-xs md:max-w-md font-mono text-gray-900">
                {imageUrl || previewUrl}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors"
                  title="Mở ảnh gốc trong tab mới"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  if (mode === "file") fileInputRef.current?.click();
                  else handleApplyUrl();
                }}
                disabled={uploading}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors font-medium disabled:opacity-50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Đổi ảnh
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors font-medium disabled:opacity-50"
              >
                <X className="w-3.5 h-3.5" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* KHUNG PLACEHOLDER KHI CHƯA CÓ ẢNH HOẶC ẢNH HỎNG */
        <div>
          {mode === "file" ? (
            <label
              htmlFor={`file-input-${name}`}
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl cursor-pointer bg-gray-50/70 hover:bg-primary-50/30 transition-all group"
            >
              <div className="flex flex-col items-center justify-center p-6 text-center">
                {uploading ? (
                  <div className="text-primary-600 flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent mb-3"></div>
                    <p className="text-sm font-semibold">Đang tải ảnh lên máy chủ...</p>
                    <p className="text-xs text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-primary-600">Nhấp để chọn ảnh</span> từ máy tính
                    </p>
                    <p className="text-xs text-gray-500">
                      Hỗ trợ JPG, JPEG, PNG, WebP (Tối đa 10MB)
                    </p>
                  </>
                )}
              </div>
              <input
                id={`file-input-${name}`}
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp,.gif"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          ) : (
            /* Input URL mode */
            <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/70 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyUrl();
                    }
                  }}
                  placeholder="https://example.com/hinh-anh.jpg hoặc /uploads/images/..."
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={validatingUrl || !inputUrl.trim()}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {validatingUrl ? "Kiểm tra..." : "Áp dụng"}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Nhập đường dẫn trực tiếp đến hình ảnh và nhấn &quot;Áp dụng&quot; để xem trước trước khi lưu.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Thông báo trạng thái Upload / URL Validation */}
      {statusMessage.text && (
        <div
          className={`flex items-start gap-2 p-3 rounded-lg text-xs leading-relaxed ${
            statusMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : statusMessage.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Trường hợp ảnh tải bị lỗi hiển thị */}
      {imageError && !uploading && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            Hình ảnh không thể hiển thị (đường dẫn lỗi hoặc file không tồn tại).
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-700 hover:text-red-900 underline font-medium"
          >
            Xóa đường dẫn
          </button>
        </div>
      )}

      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
}
