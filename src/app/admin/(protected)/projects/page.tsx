import { prisma } from "@/lib/prisma";
import { Plus, Edit, Eye, EyeOff, Building2, ExternalLink, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toggleProjectPublish, deleteProject } from "./actions";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.warn("Could not query projects with order sort, falling back to createdAt:", err);
    try {
      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (err2) {
      console.error("Critical error querying projects:", err2);
      projects = [];
    }
  }

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
                  <tr key={project.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Thứ tự */}
                    <td className="px-5 py-4 text-center font-semibold text-gray-500">
                      #{project.order ?? 0}
                    </td>

                    {/* Hình ảnh */}
                    <td className="px-5 py-4">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title || "Dự án"}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Building2 className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Tên dự án */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        <Link href={`/admin/projects/${project.id}`}>{project.title}</Link>
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        /{project.slug}
                      </div>
                      {project.category && (
                        <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {project.category}
                        </span>
                      )}
                    </td>

                    {/* Khách hàng / Chủ đầu tư */}
                    <td className="px-5 py-4 text-gray-600 font-medium">
                      {project.client || <span className="text-gray-300 font-normal">-</span>}
                    </td>

                    {/* Địa điểm & Năm */}
                    <td className="px-5 py-4 text-gray-500 text-xs">
                      {project.location && (
                        <div className="flex items-center gap-1 mb-1 text-gray-700">
                          <MapPin className="w-3.5 h-3.5 text-primary-500" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.year && (
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span>{project.year}</span>
                        </div>
                      )}
                      {!project.location && !project.year && (
                        <span className="text-gray-300">-</span>
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
                        <AdminDeleteButton
                          itemId={project.id}
                          itemName={project.title}
                          deleteAction={deleteProject}
                          confirmMessage={`Bạn có chắc chắn muốn xóa dự án "${project.title}"?`}
                        />
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
