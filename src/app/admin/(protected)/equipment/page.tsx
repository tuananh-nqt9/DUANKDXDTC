import { prisma } from "@/lib/prisma";
import { Plus, Edit, Eye, EyeOff, Wrench, ExternalLink, Sparkles, MapPin, Package, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toggleEquipmentPublish, toggleEquipmentFeatured, deleteEquipment } from "./actions";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  let equipment: any[] = [];
  try {
    equipment = await prisma.equipment.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch (err) {
    console.warn("Could not query equipment with order sort, falling back to createdAt:", err);
    try {
      equipment = await prisma.equipment.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (err2) {
      console.error("Critical error querying equipment:", err2);
      equipment = [];
    }
  }

  const totalCount = equipment.length;
  const publishedCount = equipment.filter((e) => e.published).length;
  const featuredCount = equipment.filter((e) => e.featured).length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-6 h-6 text-primary-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý Trang thiết bị</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Danh sách thiết bị thí nghiệm, kiểm định và khảo sát công trình của công ty Thanh Chương
          </p>
        </div>
        <Link href="/admin/equipment/new" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-5 h-5" />
          Thêm thiết bị mới
        </Link>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-gray-500">Tổng số thiết bị</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-green-600">Đang hiển thị công khai</div>
          <div className="text-2xl font-bold text-green-700 mt-1">{publishedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-sm font-medium text-amber-600">Thiết bị nổi bật</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{featuredCount}</div>
        </div>
      </div>

      {/* Bảng danh sách thiết bị */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
              <tr>
                <th className="px-5 py-3.5 w-16 text-center">Thứ tự</th>
                <th className="px-5 py-3.5 w-28">Hình ảnh</th>
                <th className="px-5 py-3.5">Tên thiết bị &amp; Phân loại</th>
                <th className="px-5 py-3.5">Model / Nhà SX / Xuất xứ</th>
                <th className="px-5 py-3.5 text-center">Nổi bật</th>
                <th className="px-5 py-3.5 text-center">Hiển thị</th>
                <th className="px-5 py-3.5 text-right w-36">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {equipment.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                    <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-medium text-gray-700">Chưa có thiết bị nào trong hệ thống.</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">
                      Nhấn nút &quot;Thêm thiết bị mới&quot; để bổ sung trang thiết bị phục vụ thí nghiệm.
                    </p>
                    <Link href="/admin/equipment/new" className="btn-primary text-xs">
                      <Plus className="w-4 h-4 mr-1" />
                      Thêm thiết bị ngay
                    </Link>
                  </td>
                </tr>
              ) : (
                equipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Thứ tự */}
                    <td className="px-5 py-4 text-center font-semibold text-gray-500">
                      #{item.order ?? 0}
                    </td>

                    {/* Hình ảnh */}
                    <td className="px-5 py-4">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name || "Thiết bị"}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Wrench className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Tên & Phân loại */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        <Link href={`/admin/equipment/${item.id}`}>{item.name}</Link>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {item.category && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                            {item.category}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 font-mono">
                          /{item.slug}
                        </span>
                      </div>
                    </td>

                    {/* Thông số cơ bản */}
                    <td className="px-5 py-4 text-gray-600">
                      <div className="space-y-1 text-xs">
                        {item.model && (
                          <div className="flex items-center gap-1.5 font-medium text-gray-800">
                            <Package className="w-3.5 h-3.5 text-primary-500" />
                            <span>Model: {item.model}</span>
                          </div>
                        )}
                        {item.manufacturer && (
                          <div className="text-gray-600">
                            Hãng: {item.manufacturer}
                          </div>
                        )}
                        <div className="flex items-center gap-3 text-gray-500">
                          {item.origin && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              {item.origin}
                            </span>
                          )}
                          {item.year && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              Năm {item.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Nổi bật */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <form action={toggleEquipmentFeatured.bind(null, item.id)}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            item.featured
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                          title={item.featured ? "Đang nổi bật. Nhấn để hủy" : "Nhấn để đặt làm nổi bật"}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {item.featured ? "Nổi bật" : "Thường"}
                        </button>
                      </form>
                    </td>

                    {/* Trạng thái hiển thị */}
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <form action={toggleEquipmentPublish.bind(null, item.id)}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            item.published
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          title={item.published ? "Nhấn để ẩn thiết bị" : "Nhấn để công khai thiết bị"}
                        >
                          {item.published ? (
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
                          href={`/trang-thiet-bi/${item.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Xem trên website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/equipment/${item.id}`}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <AdminDeleteButton
                          itemId={item.id}
                          itemName={item.name}
                          deleteAction={deleteEquipment}
                          confirmMessage={`Bạn có chắc chắn muốn xóa thiết bị "${item.name}" không?`}
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
