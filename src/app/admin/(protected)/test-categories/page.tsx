import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2, FileText, CheckCircle, XCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function deleteCategory(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  
  try {
    await prisma.testCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/test-categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Danh mục chỉ tiêu phép thử</h1>
        <Link
          href="/admin/test-categories/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Thêm danh mục
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thứ tự
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tên danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Số phép thử
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                PDF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
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
                    <form action={deleteCategory} onSubmit={(e) => {
                      if (!confirm('Bạn có chắc muốn xóa danh mục này? Tất cả các phép thử trong danh mục cũng sẽ bị xóa.')) {
                        e.preventDefault();
                      }
                    }}>
                      <input type="hidden" name="id" value={category.id} />
                      <button
                        type="submit"
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
