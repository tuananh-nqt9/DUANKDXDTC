import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toggleProjectPublish, deleteProject } from "./actions";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dự án</h1>
          <p className="text-gray-500 mt-1">Quản lý danh sách dự án đã thực hiện</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus className="w-5 h-5" />
          Thêm dự án
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dự án</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa điểm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Năm</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nổi bật</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hiển thị</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">Chưa có dự án nào.</td></tr>
            ) : projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{project.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{project.excerpt}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{project.client || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{project.location || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{project.year || "-"}</td>
                <td className="px-6 py-4 text-center">
                  {project.featured && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">★</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <form action={toggleProjectPublish.bind(null, project.id)}>
                    <button type="submit" className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${project.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {project.published ? <><Eye className="w-3 h-3" /> Bật</> : <><EyeOff className="w-3 h-3" /> Tắt</>}
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/projects/${project.id}`} className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                    <form action={deleteProject.bind(null, project.id)}>
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

