import { createProject } from "../actions";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
        <Link href="/admin/projects" className="hover:text-primary-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Danh sách dự án
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Thêm dự án mới</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Thêm dự án mới</h1>
          <p className="text-sm text-gray-500">Dự án sau khi lưu sẽ đồng bộ ra trang User /du-an và Trang chủ</p>
        </div>
      </div>

      <form action={createProject} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
        <div>
          <label className="form-label font-bold text-gray-900">
            Tên dự án <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="form-input text-base"
            placeholder="VD: Kiểm định chất lượng Trung tâm thương mại Grand Plaza"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="form-label font-semibold text-gray-800">Chủ đầu tư / Khách hàng</label>
            <input
              type="text"
              name="client"
              className="form-input"
              placeholder="VD: Tập đoàn Vingroup, Sun Group..."
            />
          </div>
          <div>
            <label className="form-label font-semibold text-gray-800">Địa điểm</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="VD: Hà Nội, Bắc Ninh, Nghệ An..."
            />
          </div>
          <div>
            <label className="form-label font-semibold text-gray-800">Năm thực hiện</label>
            <input
              type="number"
              name="year"
              min="1990"
              max="2100"
              defaultValue={new Date().getFullYear()}
              className="form-input"
              placeholder="2026"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label font-semibold text-gray-800">Loại dự án</label>
            <input
              type="text"
              name="category"
              className="form-input"
              placeholder="VD: Công trình Dân dụng, Giao thông, Công nghiệp..."
            />
          </div>
          <div>
            <label className="form-label font-semibold text-gray-800">Thứ tự hiển thị (Số nhỏ xếp trước)</label>
            <input
              type="number"
              name="order"
              defaultValue={0}
              className="form-input"
              placeholder="0, 1, 2..."
            />
          </div>
        </div>

        <div>
          <label className="form-label font-semibold text-gray-800">Mô tả ngắn</label>
          <textarea
            name="excerpt"
            rows={3}
            className="form-input"
            placeholder="Tóm tắt ngắn gọn quy mô, công việc kiểm định thực hiện tại dự án..."
          />
        </div>

        <div>
          <label className="form-label font-semibold text-gray-800">Nội dung chi tiết (HTML hoặc văn bản)</label>
          <textarea
            name="content"
            rows={6}
            className="form-input font-mono text-sm leading-relaxed"
            placeholder="Chi tiết các hạng mục kiểm định, thí nghiệm cọc, thí nghiệm bê tông, quan trắc địa kỹ thuật..."
          />
        </div>

        {/* Upload hình ảnh đại diện */}
        <div>
          <ImageUpload
            name="image"
            label="Hình ảnh đại diện dự án"
            helperText="Ảnh đại diện hiển thị tại trang danh sách dự án, trang chủ và đầu trang chi tiết. Hỗ trợ JPG, PNG, WebP."
          />
        </div>

        {/* Trạng thái nổi bật & hiển thị */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-wrap items-center gap-8">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked
              className="w-5 h-5 text-primary-600 rounded"
            />
            <div>
              <span className="text-sm font-bold text-gray-900 block">⭐ Dự án nổi bật</span>
              <span className="text-xs text-gray-500">Hiển thị ưu tiên tại khu vực Dự án trên Trang chủ</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked
              className="w-5 h-5 text-green-600 rounded"
            />
            <div>
              <span className="text-sm font-bold text-gray-900 block">Hiển thị công khai</span>
              <span className="text-xs text-gray-500">Công khai dự án lên website cho khách xem</span>
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary !px-6 !py-2.5 text-base shadow-md">
            Lưu &amp; Công khai dự án
          </button>
          <Link href="/admin/projects" className="btn-secondary !text-gray-700 !border-gray-300">
            Hủy bỏ
          </Link>
        </div>
      </form>
    </div>
  );
}
