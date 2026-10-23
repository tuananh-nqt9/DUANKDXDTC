import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Eye, EyeOff, Building2, ExternalLink, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toggleProjectPublish, deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-6 h-6 text-primary-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý Dự án</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Danh sách các dự án kiểm định, thí nghiệm công trình đã thực hiện
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-5 h-5" />
          Thêm dự án mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-5 py-3.5 w-16 text-center">Thứ tự</th>
                <th className="px-5 py-3.5">Hình ảnh</th>
                <th className="px-5 py-3.5">Tên dự án</th>
                <th className="px-5 py-3.5">Khách hàng / Chủ đầu tư</th>
                <th className="px-5 py-3.5">Địa điểm &amp; Năm</th>
                <th className="px-5 py-3.5 text-center">Nổi bật</th>
                <th className="px-5 py-3.5 text-center">Hiển thị</th>
                <th className="px-5 py-3.5 text-right w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-500">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-medium text-gray-700">Chưa có dự án nào.</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">
                      Nhấn nút &quot;Thêm dự án mới&quot; để tạo dự án đầu tiên.
                    </p>
                    <Link href="/admin/projects/new" className="btn-primary text-xs">
                      <Plus className="w-4 h-4 mr-1" />
                      Tạo dự án ngay
                    </Link>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Thứ tự */}
                    <td className="px-5 py-4 text-center font-bold text-gray-600">
                      {project.order}
                    </td>

                    {/* Hình ảnh */}
                    <td className="px-5 py-4">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200 flex items-center justify-center flex-shrink-0">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>

                    {/* Tên dự án & slug */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-bold text-gray-900 line-clamp-1 hover:text-primary-600">
                        {project.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {project.excerpt || "Chưa có mô tả ngắn"}
                      </div>
                      <div className="text-xs font-mono text-gray-400 mt-0.5 truncate">
                        /{project.slug}
                      </div>
                    </td>

                    {/* Khách hàng */}
                    <td className="px-5 py-4 text-gray-700">
                      {project.client || <span className="text-gray-400">-</span>}
                    </td>

                    {/* Địa điểm & Năm */}
                    <td className="px-5 py-4 text-xs text-gray-600 whitespace-nowrap">
                      {project.location && (
                        <div className="flex items-center gap-1 mb-0.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.year && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{project.year}</span>
                        </div>
                      )}
                    </td>

                    {/* Nổi bật */}
                    <td className="px-5 py-4 text-center">
                      {project.featured ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                          ⭐ Nổi bật
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    {/* Trạng thái hiển thị */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <form action={toggleProjectPublish.bind(null, project.id)}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            project.published
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          title={project.published ? "Nhấn để ẩn dự án" : "Nhấn để công khai dự án"}
                        >
                          {project.published ? (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Bật
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Tắt
                            </>
                          )}
                        </button>
                      </form>
                    </td>

                    {/* Thao tác */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/du-an/${project.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Xem trên website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form
                          action={deleteProject.bind(null, project.id)}
                          onSubmit={(e) => {
                            if (!confirm(`Bạn có chắc chắn muốn xóa dự án "${project.title}"?`)) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <button
                            type="submit"
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
