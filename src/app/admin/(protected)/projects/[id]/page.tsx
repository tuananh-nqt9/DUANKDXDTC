import { prisma } from "@/lib/prisma";
import { updateProject } from "../actions";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Sửa dự án</h1>
      <p className="text-gray-500 mb-6">/{project.slug}</p>

      <form action={action} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <label className="form-label">Tên dự án <span className="text-red-500">*</span></label>
          <input type="text" name="title" required defaultValue={project.title} className="form-input" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Khách hàng</label>
            <input type="text" name="client" defaultValue={project.client || ""} className="form-input" />
          </div>
          <div>
            <label className="form-label">Địa điểm</label>
            <input type="text" name="location" defaultValue={project.location || ""} className="form-input" />
          </div>
          <div>
            <label className="form-label">Năm</label>
            <input type="number" name="year" defaultValue={project.year || ""} className="form-input" />
          </div>
        </div>

        <div>
          <label className="form-label">Loại dự án</label>
          <input type="text" name="category" defaultValue={project.category || ""} className="form-input" />
        </div>

        <div>
          <label className="form-label">Mô tả ngắn</label>
          <textarea name="excerpt" rows={3} defaultValue={project.excerpt || ""} className="form-input" />
        </div>

        <div>
          <label className="form-label">Nội dung chi tiết (HTML)</label>
          <textarea name="content" rows={6} defaultValue={project.content || ""} className="form-input font-mono text-sm" />
        </div>

        <div>
          <label className="form-label">URL hình ảnh</label>
          <input type="url" name="image" defaultValue={project.image || ""} className="form-input" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={project.featured} className="w-4 h-4 rounded" />
            <span className="text-sm font-medium text-gray-700">⭐ Nổi bật</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked={project.published} className="w-4 h-4 rounded" />
            <span className="text-sm font-medium text-gray-700">Hiển thị</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button type="submit" className="btn-primary">Cập nhật</button>
          <a href="/admin/projects" className="btn-secondary !text-gray-700 !border-gray-300">Hủy</a>
        </div>
      </form>
    </div>
  );
}
