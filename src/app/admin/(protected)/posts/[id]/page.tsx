import { prisma } from "@/lib/prisma";
import { updatePost } from "../actions";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Sửa bài viết</h1>
      <p className="text-gray-500 mb-6">/{post.slug}</p>

      <form action={action} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tiêu đề <span className="text-red-500">*</span></label>
          <input type="text" name="title" required defaultValue={post.title} className="form-input" />
        </div>

        <div>
          <label className="form-label">Danh mục</label>
          <input type="text" name="category" defaultValue={post.category || ""} className="form-input" />
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={2} defaultValue={post.excerpt || ""} className="form-input" />
        </div>

        <div>
          <label className="form-label">Nội dung (HTML)</label>
          <textarea name="content" required rows={12} defaultValue={post.content} className="form-input font-mono text-sm" />
        </div>

        <div>
          <label className="form-label">URL hình ảnh đại diện</label>
          <input type="url" name="image" defaultValue={post.image || ""} className="form-input" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={post.published} className="w-4 h-4 rounded" />
          <span className="text-sm font-medium text-gray-700">Đăng</span>
        </label>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Cập nhật</button>
          <a href="/admin/posts" className="btn-secondary !text-gray-700 !border-gray-300">Hủy</a>
        </div>
      </form>
    </div>
  );
}
