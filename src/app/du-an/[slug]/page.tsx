import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { MapPin, Calendar, ArrowLeft, Building2 } from "lucide-react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    notFound();
  }

  // Lấy các dự án khác
  const otherProjects = await prisma.project.findMany({
    where: {
      published: true,
      NOT: { id: project.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary-600">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/du-an" className="text-gray-500 hover:text-primary-600">
                Dự án
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{project.title}</span>
            </nav>
          </div>
        </section>

        {/* Hero image */}
        <section className="relative h-[400px] md:h-[500px] bg-gray-900">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-80"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
            <div className="max-w-3xl text-white">
              {project.featured && (
                <span className="inline-flex items-center gap-1 bg-secondary-500 text-white text-xs px-3 py-1.5 rounded-full font-bold mb-4">
                  ⭐ Dự án nổi bật
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary-400" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary-400" />
                  {project.year}
                </span>
                {project.category && (
                  <span className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-secondary-400" />
                    {project.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Nội dung chi tiết */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Nội dung chính */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary-600 rounded" />
                  Mô tả dự án
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {project.content || project.excerpt || "Đang cập nhật..."}
                </div>

                <div className="mt-10">
                  <Link
                    href="/du-an"
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại danh sách dự án
                  </Link>
                </div>
              </div>

              {/* Sidebar - Thông tin */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b">
                    Thông tin dự án
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase">Địa điểm</div>
                        <div className="font-semibold text-gray-900">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase">Năm thực hiện</div>
                        <div className="font-semibold text-gray-900">{project.year}</div>
                      </div>
                    </div>
                    {project.client && (
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-gray-500 uppercase">Chủ đầu tư</div>
                          <div className="font-semibold text-gray-900">{project.client}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nút liên hệ tư vấn */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                      Bạn cần tư vấn dự án tương tự?
                    </p>
                    <Link
                      href="/lien-he"
                      className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                    >
                      Liên hệ tư vấn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dự án liên quan */}
        {otherProjects.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="w-1 h-8 bg-primary-600 rounded" />
                Dự án khác
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/du-an/${p.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {p.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {p.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
