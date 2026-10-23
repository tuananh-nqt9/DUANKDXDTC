"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewEquipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Tạo thiết bị thất bại");

      router.push("/admin/equipment");
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/equipment"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <h1 className="text-2xl font-bold">Thêm thiết bị</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tên thiết bị <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
              placeholder="VD: Máy nén bê tông tự động hiển thị số 2000kN"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Đường dẫn Slug (URL)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-mono transition-all"
              placeholder="may-nen-be-tong-tu-dong"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Model / Ký hiệu</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                placeholder="VD: TYE-2000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Năm sản xuất
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nhà sản xuất / Hãng
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value })
                }
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                placeholder="VD: Controls Group"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Xuất xứ
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
                placeholder="VD: Italia / Trung Quốc / Nhật Bản"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Danh mục thiết bị (Nhóm thí nghiệm)
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
              placeholder="VD: Thí nghiệm bê tông / Thí nghiệm đất / Thí nghiệm thép"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
              placeholder="Mô tả chức năng, công dụng thí nghiệm của thiết bị..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Thông số kỹ thuật
            </label>
            <textarea
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              rows={4}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-mono transition-all"
              placeholder="Tải trọng nén lớn nhất: 2000 kN&#10;Độ chính xác: Cấp 1&#10;Hành trình piston: 50 mm&#10;Nguồn điện: 380V / 50Hz"
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Thứ tự hiển thị</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
              />
            </div>

            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-sm font-semibold text-gray-700">⭐ Thiết bị nổi bật</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-sm font-semibold text-gray-700">Công khai hiển thị</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Đang lưu..." : "Lưu & Công khai thiết bị"}
          </button>
          <Link
            href="/admin/equipment"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
}
