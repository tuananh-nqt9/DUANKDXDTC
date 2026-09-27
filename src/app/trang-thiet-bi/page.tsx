import Link from "next/link";
import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { prisma } from "@/lib/prisma";
import { Wrench, ArrowRight, Sparkles, Package, MapPin, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  // Group by category
  const categories = Array.from(new Set(equipment.map(e => e.category).filter(Boolean)));
  
  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-8 h-8 text-secondary-400" />
                <span className="text-secondary-400 font-semibold">Công nghệ tiên tiến</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
                Trang thiết bị hiện đại
              </h1>
              <p className="text-lg text-primary-100">
                Đầu tư các thiết bị thí nghiệm chuyên dụng, đạt tiêu chuẩn quốc tế, 
                đảm bảo độ chính xác cao trong mọi phép đo
              </p>
            </div>
          </div>
        </section>

        {/* Equipment Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {equipment.length === 0 ? (
              <div className="text-center py-20">
                <Wrench className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Đang cập nhật danh sách thiết bị
                </h3>
                <p className="text-gray-500">
                  Vui lòng quay lại sau hoặc liên hệ để biết thêm chi tiết
                </p>
              </div>
            ) : (
              <>
                {/* Featured Equipment */}
                {equipment.some(e => e.featured) && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-secondary-500" />
                      Thiết bị nổi bật
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {equipment.filter(e => e.featured).map((item) => (
                        <div
                          key={item.id}
                          className="card group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {item.image && (
                            <div className="relative h-64 bg-gray-100 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="absolute top-3 right-3 bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Nổi bật
                              </span>
                            </div>
                          )}
                          <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                              {item.name}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              {item.model && (
                                <p className="flex items-start gap-2">
                                  <Package className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                                  <span><strong>Model:</strong> {item.model}</span>
                                </p>
                              )}
                              {item.manufacturer && (
                                <p className="flex items-start gap-2">
                                  <span className="text-primary-500 font-bold">🏭</span>
                                  <span><strong>Nhà SX:</strong> {item.manufacturer}</span>
                                </p>
                              )}
                              {item.origin && (
                                <p className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                                  <span><strong>Xuất xứ:</strong> {item.origin}</span>
                                </p>
                              )}
                              {item.year && (
                                <p className="flex items-start gap-2">
                                  <Calendar className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                                  <span><strong>Năm:</strong> {item.year}</span>
                                </p>
                              )}
                            </div>
                            {item.category && (
                              <span className="inline-block mt-4 text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                                {item.category}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Equipment */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Wrench className="w-6 h-6 text-primary-600" />
                    Tất cả thiết bị
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.map((item) => (
                      <div
                        key={item.id}
                        className="card group overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        {item.image && (
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            {item.model && <p><strong>Model:</strong> {item.model}</p>}
                            {item.origin && <p><strong>Xuất xứ:</strong> {item.origin}</p>}
                          </div>
                          {item.category && (
                            <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container-custom text-center">
            <Wrench className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Trang thiết bị đạt chuẩn quốc tế
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Đầu tư liên tục các thiết bị hiện đại từ các nhà sản xuất uy tín trên thế giới, 
              đảm bảo kết quả thí nghiệm chính xác và đáng tin cậy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-primary !bg-secondary-500 hover:!bg-secondary-600">
                Liên hệ tư vấn
              </Link>
              <Link href="/chi-tieu-phep-thu" className="btn-primary !bg-white !text-primary-900 hover:!bg-gray-100">
                Xem phép thử
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
