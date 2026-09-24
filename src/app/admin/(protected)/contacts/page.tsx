import { prisma } from "@/lib/prisma";
import { Mail, Phone, Eye, Trash2 } from "lucide-react";
import { markAsRead, deleteContact } from "./actions";

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Liên hệ</h1>
        <p className="text-gray-500 mt-1">Danh sách liên hệ từ khách hàng</p>
      </div>

      <div className="space-y-3">
        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Chưa có liên hệ nào.
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-xl border p-5 ${
                contact.status === "new" ? "border-blue-300 shadow-md" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{contact.name}</span>
                    {contact.status === "new" && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                        MỚI
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                      <Phone className="w-4 h-4" /> {contact.phone}
                    </a>
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-primary-600">
                        <Mail className="w-4 h-4" /> {contact.email}
                      </a>
                    )}
                    {contact.service && (
                      <span className="text-gray-500">📋 {contact.service}</span>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {contact.status === "new" && (
                    <form action={markAsRead.bind(null, contact.id)}>
                      <button type="submit" className="p-2 text-primary-600 hover:bg-blue-50 rounded-lg" title="Đánh dấu đã đọc">
                        <Eye className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                  <form action={deleteContact.bind(null, contact.id)}>
                    <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Xóa">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

