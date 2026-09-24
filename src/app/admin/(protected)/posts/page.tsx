import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import Link from "next/link";
import { togglePostPublish, deletePost } from "./actions";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tin tức</h1>
          <p className="text-gray-500 mt-1">Quản lý bài viết / tin tức</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary"><Plus className="w-5 h-5" /> Thêm bài viết</Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Chưa có bài viết nào.</td></tr>
            ) : posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{post.category || "-"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : "-"}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <form action={togglePostPublish.bind(null, post.id)}>
                    <button type="submit" className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {post.published ? <><Eye className="w-3 h-3" /> Bật</> : <><EyeOff className="w-3 h-3" /> Tắt</>}
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/posts/${post.id}`} className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                    <form action={deletePost.bind(null, post.id)}>
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

