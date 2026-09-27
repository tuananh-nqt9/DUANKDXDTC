import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trang thiết bị</h1>
        <Link
          href="/admin/equipment/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Thêm thiết bị
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            {item.image && (
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              {item.model && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Model:</span> {item.model}
                </p>
              )}
              {item.manufacturer && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Nhà sản xuất:</span> {item.manufacturer}
                </p>
              )}
              {item.origin && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Xuất xứ:</span> {item.origin}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.published ? "Hiển thị" : "Ẩn"}
                </span>
                <Link
                  href={`/admin/equipment/${item.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {equipment.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Chưa có thiết bị nào. Nhấn "Thêm thiết bị" để bắt đầu.
        </div>
      )}
    </div>
  );
}
