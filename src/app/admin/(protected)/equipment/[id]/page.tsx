"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditEquipmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    model: "",
    manufacturer: "",
    origin: "",
    year: new Date().getFullYear(),
    description: "",
    specs: "",
    image: "",
    category: "",
    order: 0,
    featured: false,
    published: true,
  });

  useEffect(() => {
    fetchEquipment();
  }, [params.id]);

  const fetchEquipment = async () => {
    try {
      const res = await fetch(`/api/admin/equipment/${params.id}`);
      if (!res.ok) throw new Error("Không thể tải thông tin thiết bị");
      const data = await res.json();
      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        model: data.model || "",
        manufacturer: data.manufacturer || "",
        origin: data.origin || "",
        year: data.year || new Date().getFullYear(),
        description: data.description || "",
        specs: data.specs || "",
        image: data.image || "",
        category: data.category || "",
        order: data.order || 0,
        featured: data.featured ?? false,
        published: data.published ?? true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi tải dữ liệu");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/equipment/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Cập nhật thiết bị thất bại");
      }

      router.push("/admin/equipment");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa thiết bị này? Thao tác không thể hoàn tác.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/equipment/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Xóa thiết bị thất bại");
      }

      router.push("/admin/equipment");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Lỗi khi xóa");
    } finally {
      setDeleting(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin thiết bị...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/equipment"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách thiết bị
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa thiết bị</h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors border border-red-200"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Đang xóa..." : "Xóa thiết bị"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="form-label">
              Tên thiết bị <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="VD: Máy nén bê tông tự động 2000kN"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Model / Ký hiệu</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="form-input"
                placeholder="VD: TYE-2000"
              />
            </div>

            <div>
              <label className="form-label">Năm sản xuất</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) || 0 })
                }
                className="form-input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Nhà sản xuất</label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value })
                }
                className="form-input"
                placeholder="VD: Controls Group"
              />
            </div>

            <div>
              <label className="form-label">Xuất xứ</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="form-input"
                placeholder="VD: Italia / Trung Quốc / Việt Nam"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Danh mục thiết bị</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-input"
              placeholder="VD: Thí nghiệm bê tông / Thí nghiệm đất / ..."
            />
          </div>

          <div>
            <label className="form-label">Mô tả ngắn</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="form-input"
              placeholder="Mô tả chức năng, công dụng của thiết bị..."
            />
          </div>

          <div>
            <label className="form-label">Thông số kỹ thuật</label>
            <textarea
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              rows={4}
              className="form-input font-mono text-sm"
              placeholder="Tải trọng nén lớn nhất: 2000 kN&#10;Độ chính xác: Cấp 1&#10;Hành trình piston: 50 mm"
            />
          </div>

          <ImageUpload
            name="image"
            label="Hình ảnh thiết bị"
            defaultValue={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
          />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="form-label">Thứ tự hiển thị</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                className="form-input"
              />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">⭐ Thiết bị nổi bật</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Hiển thị</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <Link
            href="/admin/equipment"
            className="btn-secondary !text-gray-700 !border-gray-300 hover:!bg-gray-50"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
