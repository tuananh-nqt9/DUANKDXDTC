import { prisma } from "@/lib/prisma";
import { FlaskConical, Building2, Newspaper, Mail, Eye } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [servicesCount, projectsCount, postsCount, contactsCount, unreadContacts] =
    await Promise.all([
      prisma.service.count(),
      prisma.project.count(),
      prisma.post.count(),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "new" } }),
    ]);

  const recentContacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    {
      label: "Dịch vụ",
      value: servicesCount,
      icon: FlaskConical,
      color: "bg-primary-500",
      href: "/admin/services",
    },
    {
      label: "Dự án",
      value: projectsCount,
      icon: Building2,
      color: "bg-green-500",
      href: "/admin/projects",
    },
    {
      label: "Bài viết",
      value: postsCount,
      icon: Newspaper,
      color: "bg-secondary-500",
      href: "/admin/posts",
    },
    {
      label: "Liên hệ mới",
      value: unreadContacts,
      total: contactsCount,
      icon: Mail,
      color: "bg-orange-500",
      href: "/admin/contacts",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan</h1>
        <p className="text-gray-500 mt-1">Xin chào! Đây là bảng điều khiển của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">
              {stat.label}
              {stat.total !== undefined && ` / ${stat.total} tổng`}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Liên hệ gần đây</h2>
          <Link href="/admin/contacts" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Xem tất cả →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Chưa có liên hệ nào.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{contact.name}</span>
                      {contact.status === "new" && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                          Mới
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      📞 {contact.phone}
                      {contact.email && ` • ✉️ ${contact.email}`}
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(contact.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

