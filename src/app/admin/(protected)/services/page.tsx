import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toggleServicePublish, deleteService } from "./actions";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dịch vụ</h1>
          <p className="text-gray-500 mt-1">Quản lý danh sách dịch vụ / ngành nghề</p>
        </div>
        <Link href="/admin/services/new" className="btn-primary">
          <Plus className="w-5 h-5" />
          Thêm dịch vụ
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Chưa có dịch vụ nào. Click &quot;Thêm dịch vụ&quot; để bắt đầu.
                </td>
              </tr>
            ) : (
              services.map((service, i) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{service.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">/{service.slug}</td>
                  <td className="px-6 py-4 text-center">
                    <form action={toggleServicePublish.bind(null, service.id)}>
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          service.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {service.published ? (
                          <><Eye className="w-3 h-3" /> Hiển thị</>
                        ) : (
                          <><EyeOff className="w-3 h-3" /> Ẩn</>
                        )}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={deleteService.bind(null, service.id)}>
                        <button
                          type="submit"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
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
  );
}

