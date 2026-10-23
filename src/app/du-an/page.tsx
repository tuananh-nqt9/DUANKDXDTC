import Image from "next/image";
import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { prisma } from "@/lib/prisma";
import { MapPin, Calendar, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `Dự án tiêu biểu | ${COMPANY.shortName}`,
  description: "Các dự án kiểm định, thí nghiệm công trình xây dựng tiêu biểu mà Thanh Chương JSC đã thực hiện trên toàn quốc.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-secondary-400" />
                <span className="text-secondary-400 font-semibold tracking-wider uppercase text-sm">
                  Hồ sơ năng lực thực tế
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading mb-4 tracking-tight">
                Dự Án Tiêu Biểu
              </h1>
              <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
                Những công trình trọng điểm và dự án xây dựng dân dụng, công nghiệp, hạ tầng giao thông mà Thanh Chương JSC tự hào tham gia kiểm định và thí nghiệm chất lượng.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-16 md:py-24 bg-gray-50/70">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-semibold text-sm">
                Hiển thị <strong className="text-gray-900">{projects.length}</strong> dự án đã thực hiện
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Cam kết chất lượng &amp; chuẩn xác
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Đang cập nhật danh sách dự án</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Chúng tôi đang cập nhật các thông tin dự án mới nhất. Quý khách vui lòng quay lại sau.
                </p>
                <Link href="/" className="btn-primary">
                  Về Trang chủ
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0">
                {projects.map((project) => (
                  <article
                    key={project.id}
                    className="card group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 w-full min-w-0 max-w-full"
                  >
                    {/* Image Container with click link */}
                    <Link
                      href={`/du-an/${project.slug}`}
                      className="relative aspect-[16/10] sm:h-60 w-full overflow-hidden bg-gray-900 block"
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-100">
                          <Building2 className="w-12 h-12 text-gray-300 mb-2" />
                          <span className="text-xs font-medium">THANH CHƯƠNG JSC</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Badges on image */}
                      <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex flex-wrap gap-1.5 z-10">
                        {project.category && (
                          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/95 backdrop-blur-xs text-primary-900 text-[11px] sm:text-xs font-bold rounded-lg shadow-sm">
                            {project.category}
                          </span>
                        )}
                        {project.featured && (
                          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-yellow-500 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm">
                            ⭐ Nổi bật
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Card Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta info: Location & Year */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-3 font-medium gap-1.5 sm:gap-4 min-w-0">
                          {project.location && (
                            <span className="flex items-center gap-1.5 min-w-0 flex-1">
                              <MapPin className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                              <span className="truncate" title={project.location}>{project.location}</span>
                            </span>
                          )}
                          {project.year && (
                            <span className="flex items-center gap-1.5 flex-shrink-0">
                              <Calendar className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                              <span>Năm {project.year}</span>
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2 leading-snug break-words">
                          <Link href={`/du-an/${project.slug}`}>
                            {project.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {project.excerpt || "Dự án kiểm định, thí nghiệm vật liệu và đánh giá an toàn kết cấu công trình xây dựng."}
                        </p>
                      </div>

                      {/* Footer: Client & Button "Xem chi tiết" */}
                      <div className="pt-3 sm:pt-4 mt-auto border-t border-gray-100 flex items-center justify-between gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                        {project.client ? (
                          <div className="text-xs text-gray-500 truncate max-w-[140px] sm:max-w-[150px]">
                            <span className="text-gray-400 block text-[10px]">Chủ đầu tư:</span>
                            <span className="font-semibold text-gray-700 truncate block">{project.client}</span>
                          </div>
                        ) : (
                          <div />
                        )}

                        {/* NÚT XEM CHI TIẾT */}
                        <Link
                          href={`/du-an/${project.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-primary-50 hover:bg-primary-600 text-primary-700 hover:text-white rounded-xl text-xs font-bold transition-all group/btn shadow-2xs ml-auto sm:ml-0"
                        >
                          <span>Xem chi tiết</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactWidget />
    </>
  );
}
