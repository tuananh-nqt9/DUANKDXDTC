"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";

export default function EditTestCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "flask-conical",
    pdfUrl: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    fetchCategory();
  }, [params.id]);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/admin/test-categories/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        icon: data.icon || "flask-conical",
        pdfUrl: data.pdfUrl || "",
        order: data.order || 0,
        published: data.published ?? true,
      });
    } catch (error) {
      alert("Không thể tải dữ liệu");
    } finally {
      setFetching(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Chỉ chấp nhận file PDF!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File không được vượt quá 10MB!");
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: uploadFormData,
      });

      if (!res.ok) throw new Error("Upload thất bại");

      const data = await res.json();
      setFormData({ ...formData, pdfUrl: data.url });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/test-categories/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Cập nhật danh mục thất bại");

      router.push("/admin/test-categories");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  if (fetching) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/test-categories"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Chỉnh sửa danh mục phép thử</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Thí nghiệm đất"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon (Lucide)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="flask-conical"
            />
            <p className="text-xs text-gray-500 mt-1">
              Xem danh sách icon tại:{" "}
              <a
                href="https://lucide.dev/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                lucide.dev
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File PDF
            </label>
            
            {formData.pdfUrl ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex-1">
                  <a
                    href={formData.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-700 hover:underline"
                  >
                    {formData.pdfUrl}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, pdfUrl: "" })}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                  title="Xóa file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <label
                  htmlFor="pdf-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  {uploading ? "Đang upload..." : "Chọn file PDF"}
                </label>
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Hoặc kéo thả file vào đây (Tối đa 10MB)
                </p>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              File sẽ được lưu vào <code className="bg-gray-100 px-1 rounded">public/documents/</code>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Hiển thị
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </button>
          <Link
            href="/admin/test-categories"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
