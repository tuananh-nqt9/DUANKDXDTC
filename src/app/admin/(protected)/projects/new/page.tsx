import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Thêm dự án mới</h1>
      <p className="text-gray-500 mb-6">Điền thông tin dự án bên dưới</p>

      <form action={createProject} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tên dự án <span className="text-red-500">*</span></label>
          <input type="text" name="title" required className="form-input" placeholder="VD: Trung tâm thương mại ABC" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Khách hàng</label>
            <input type="text" name="client" className="form-input" placeholder="Tên chủ đầu tư" />
          </div>
          <div>
            <label className="form-label">Địa điểm</label>
            <input type="text" name="location" className="form-input" placeholder="Hà Nội, HCM..." />
          </div>
          <div>
            <label className="form-label">Năm</label>
            <input type="number" name="year" min="1990" max="2100" className="form-input" placeholder="2026" />
          </div>
        </div>

        <div>
          <label className="form-label">Loại dự án</label>
          <input type="text" name="category" className="form-input" placeholder="Dân dụng, Công nghiệp, Giao thông..." />
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={3} className="form-input" />
        </div>

        <div>
          <label className="form-label">Nội dung chi tiết (HTML)</label>
          <textarea name="content" rows={6} className="form-input font-mono text-sm" />
        </div>

        <div>
          <label className="form-label">URL hình ảnh</label>
          <input type="url" name="image" className="form-input" placeholder="https://images.unsplash.com/..." />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" className="w-4 h-4 rounded" />
            <span className="text-sm font-medium text-gray-700">⭐ Dự án nổi bật</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-sm font-medium text-gray-700">Hiển thị</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Tạo dự án</button>
          <a href="/admin/projects" className="btn-secondary !text-gray-700 !border-gray-300">Hủy</a>
        </div>
      </form>
    </div>
  );
}
