"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  name: string;
  label: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
}

export default function ImageUpload({
  name,
  label,
  defaultValue = "",
  onChange,
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file hình ảnh");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Kích thước file không được vượt quá 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload thất bại");
      }

      const data = await res.json();
      setImageUrl(data.url);
      onChange?.(data.url);
    } catch (err) {
      setError("Upload thất bại. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    onChange?.("");
  };

  return (
    <div>
      <label className="form-label">{label}</label>

      <input type="hidden" name={name} value={imageUrl} />

      {imageUrl ? (
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <label className="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <div className="text-gray-500">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm">Đang upload...</p>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Click để upload</span> hoặc kéo thả
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (max 5MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <p className="text-xs text-gray-500 mt-2">
        Hoặc nhập URL trực tiếp:
      </p>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder="https://... hoặc /uploads/images/..."
        className="form-input mt-1"
      />
    </div>
  );
}
