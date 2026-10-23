import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Wrench, ArrowRight, Sparkles, Package, MapPin, ExternalLink, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EquipmentSection() {
  const equipment = await prisma.equipment.findMany({
    where: { published: true },
    orderBy: [
      { featured: "desc" },
      { order: "asc" },
      { createdAt: "desc" },
    ],
    take: 6,
  });

  if (equipment.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-4">
            <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-600 rounded-full" />
            <Wrench className="w-4 h-4" />
            Năng lực kiểm định &amp; thí nghiệm
            <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary-600 rounded-full" />
          </span>
          <h2 className="section-title title-underline mt-3">TRANG THIẾT BỊ HIỆN ĐẠI</h2>
          <p className="section-subtitle mt-6">
            Hệ thống máy móc, thiết bị đo lường chuyên dụng đạt chuẩn LAS-XD 795 và tiêu chuẩn quốc tế
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item) => (
            <Link
              key={item.id}
              href={`/trang-thiet-bi/${item.slug}`}
              className="card group block bg-white rounded-2xl border border-gray-200/80 hover:border-primary-300 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative h-60 bg-gray-900 overflow-hidden flex items-center justify-center">
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt="Background blur"
                      fill
                      className="object-cover opacity-30 blur-lg scale-110"
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain relative z-10 p-3 group-hover:scale-105 transition-transform duration-700 drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                    <Wrench className="w-12 h-12 text-primary-400 mb-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs font-medium text-gray-500">Thanh Chương Lab</span>
                  </div>
                )}

                {/* Badge Nổi bật */}
                {item.featured && (
                  <span className="absolute top-4 left-4 z-20 backdrop-blur-md bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-md border border-secondary-400/40">
                    <Sparkles className="w-3.5 h-3.5" />
                    Nổi bật
                  </span>
                )}

                {/* Category Badge */}
                {item.category && (
                  <span className="absolute bottom-4 left-4 z-20 backdrop-blur-md bg-primary-900/80 text-white text-xs px-3 py-1 rounded-lg font-medium border border-white/20">
                    {item.category}
                  </span>
                )}

                {/* Hover icon */}
                <div className="absolute top-4 right-4 z-20 w-9 h-9 backdrop-blur-md bg-white/20 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                    {item.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    {item.model && (
                      <p className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span><strong>Model:</strong> {item.model}</span>
                      </p>
                    )}
                    {item.origin && (
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span><strong>Xuất xứ:</strong> {item.origin}</span>
                      </p>
                    )}
                    {item.year && (
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span><strong>Năm sản xuất:</strong> {item.year}</span>
                      </p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                  <span className="flex items-center gap-1.5">
                    Xem thông số kỹ thuật
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/trang-thiet-bi"
            className="btn-primary inline-flex items-center gap-2 group shadow-lg hover:shadow-xl"
          >
            Xem tất cả trang thiết bị
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
