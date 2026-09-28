import Link from "next/link";
import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { prisma } from "@/lib/prisma";
import { FlaskConical, TestTube, ArrowRight, FileText, Shield, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestCategoriesPage() {
  const categories = await prisma.testCategory.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { tests: true },
      },
    },
    orderBy: { order: "asc" },
  });

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
                <TestTube className="w-8 h-8 text-secondary-400" />
                <span className="text-secondary-400 font-semibold">Năng lực thí nghiệm</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
                Danh mục chỉ tiêu phép thử
              </h1>
              <p className="text-lg text-primary-100">
                Cung cấp đầy đủ các dịch vụ thí nghiệm, kiểm định chất lượng vật liệu xây dựng theo tiêu chuẩn quốc tế
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {categories.length === 0 ? (
              <div className="text-center py-20">
                <FlaskConical className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Đang cập nhật danh mục phép thử
                </h3>
                <p className="text-gray-500">
                  Vui lòng quay lại sau hoặc liên hệ để biết thêm chi tiết
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/chi-tieu-phep-thu/${category.slug}`}
                    className="card p-6 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FlaskConical className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    
                    {category.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {category.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-primary-600">
                        <FileText className="w-4 h-4" />
                        <span className="font-semibold text-sm">
                          {category._count.tests} phép thử
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PDF Documents Section - Giống website cũ */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Danh mục chỉ tiêu & phép thử
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tải về hoặc xem trực tiếp danh sách đầy đủ các chỉ tiêu phép thử của phòng thí nghiệm
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* PDF 1 */}
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Danh mục chỉ tiêu phép thử (Tập 1)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Các phép thử cơ bản về đất, bê tông, xi măng
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
                  <iframe
                    src="/documents/danh-muc-phep-thu-1.pdf"
                    className="w-full h-full"
                    title="Danh mục chỉ tiêu phép thử 1"
                  />
                </div>

                <a
                  href="/documents/danh-muc-phep-thu-1.pdf"
                  download
                  className="btn-primary w-full justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                  Tải về PDF (Tập 1)
                </a>
              </div>

              {/* PDF 2 */}
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Danh mục chỉ tiêu phép thử (Tập 2)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Các phép thử nâng cao về nền móng, kiểm định công trình
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
                  <iframe
                    src="/documents/danh-muc-phep-thu-2.pdf"
                    className="w-full h-full"
                    title="Danh mục chỉ tiêu phép thử 2"
                  />
                </div>

                <a
                  href="/documents/danh-muc-phep-thu-2.pdf"
                  download
                  className="btn-primary w-full justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                  Tải về PDF (Tập 2)
                </a>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Nếu không xem được PDF trực tiếp, vui lòng tải về để xem
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container-custom text-center">
            <Shield className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Phòng thí nghiệm LAS-XD 795
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Được Bộ Xây dựng công nhận, đội ngũ kỹ sư chuyên nghiệp, thiết bị hiện đại. 
              Cam kết cung cấp kết quả chính xác, báo cáo nhanh chóng.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-primary !bg-secondary-500 hover:!bg-secondary-600">
                Yêu cầu báo giá
              </Link>
              <Link href="/gioi-thieu" className="btn-primary !bg-white !text-primary-900 hover:!bg-gray-100">
                Về chúng tôi
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
