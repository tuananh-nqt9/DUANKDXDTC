import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, FileText, CheckCircle, XCircle } from "lucide-react";
import DeleteCategoryButton from "./DeleteCategoryButton";
import TestPdfManager from "@/components/admin/TestPdfManager";

export const dynamic = "force-dynamic";

export default async function TestCategoriesPage() {
  const categories = await prisma.testCategory.findMany({
    include: {
      _count: {
        select: { tests: true },
      },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6">
      {/* KHU VỰC QUẢN LÝ FILE PDF DANH MỤC CHỈ TIÊU PHÉP THỬ HIỂN THỊ TRÊN WEBSITE */}
      <TestPdfManager />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chi tiết các nhóm chỉ tiêu phép thử</h2>
          <p className="text-xs text-gray-500 mt-0.5">Quản lý các chuyên mục và phép thử thành phần (tùy chọn mở rộng)</p>
        </div>
        <Link
          href="/admin/test-categories/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm danh mục
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Thứ tự
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Tên danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Số phép thử
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{category.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{category.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category._count.tests} phép thử
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {category.pdfUrl ? (
                    <a
                      href={category.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Có PDF</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400">
                      <XCircle className="w-4 h-4" />
                      <span>Chưa có</span>
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      category.published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {category.published ? "Hiển thị" : "Ẩn"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/test-categories/${category.id}`}
                      className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteCategoryButton id={category.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
