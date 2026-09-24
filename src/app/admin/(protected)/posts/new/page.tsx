import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Thêm bài viết mới</h1>
      <p className="text-gray-500 mb-6">Viết bài tin tức / kiến thức mới</p>

      <form action={createPost} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tiêu đề <span className="text-red-500">*</span></label>
          <input type="text" name="title" required className="form-input" placeholder="Tiêu đề bài viết..." />
        </div>

        <div>
          <label className="form-label">Danh mục</label>
          <input type="text" name="category" className="form-input" placeholder="Kiến thức, Tiêu chuẩn, Tin tức..." />
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={2} className="form-input" placeholder="Tóm tắt nội dung..." />
        </div>

        <div>
          <label className="form-label">Nội dung (HTML) <span className="text-red-500">*</span></label>
          <textarea name="content" required rows={12} className="form-input font-mono text-sm" placeholder="<h2>Giới thiệu</h2><p>Nội dung bài viết...</p>" />
          <p className="text-xs text-gray-500 mt-1">Hỗ trợ HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;img&gt;...</p>
        </div>

        <div>
          <label className="form-label">URL hình ảnh đại diện</label>
          <input type="url" name="image" className="form-input" placeholder="https://..." />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked className="w-4 h-4 rounded" />
          <span className="text-sm font-medium text-gray-700">Đăng ngay</span>
        </label>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Tạo bài viết</button>
          <a href="/admin/posts" className="btn-secondary !text-gray-700 !border-gray-300">Hủy</a>
        </div>
      </form>
    </div>
  );
}
