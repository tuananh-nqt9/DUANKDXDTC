import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Wrench, ArrowRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EquipmentSection() {
  const equipment = await prisma.equipment.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  if (equipment.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-primary-600" />
            <Wrench className="w-4 h-4" />
            Công nghệ tiên tiến
            <span className="w-8 h-0.5 bg-primary-600" />
          </span>
          <h2 className="section-title mt-3">TRANG THIẾT BỊ HIỆN ĐẠI</h2>
          <p className="section-subtitle">
            Đầu tư các thiết bị thí nghiệm chuyên dụng, đạt tiêu chuẩn quốc tế
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="card group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {item.image && (
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.featured && (
                    <span className="absolute top-3 right-3 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Nổi bật
                    </span>
                  )}
                </div>
              )}
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                {item.model && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Model:</span> {item.model}
                  </p>
                )}
                {item.origin && (
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Xuất xứ:</span> {item.origin}
                  </p>
                )}
                {item.category && (
                  <span className="inline-block mt-3 text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/trang-thiet-bi"
            className="btn-primary inline-flex items-center gap-2"
          >
            Xem tất cả thiết bị <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
