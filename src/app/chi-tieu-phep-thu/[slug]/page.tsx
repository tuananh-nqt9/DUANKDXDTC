import { notFound } from "next/navigation";
import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { prisma } from "@/lib/prisma";
import { FlaskConical, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function TestCategoryDetailPage({ params }: PageProps) {
  const category = await prisma.testCategory.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      tests: {
        where: { published: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
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
            <Link
              href="/chi-tieu-phep-thu"
              className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh mục</span>
            </Link>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-3">
                  {category.title}
                </h1>
                {category.description && (
                  <p className="text-lg text-primary-100 max-w-3xl">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4 text-secondary-400">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">{category.tests.length} phép thử</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tests List */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {/* PDF Viewer */}
            {category.pdfUrl && (
              <div className="max-w-6xl mx-auto mb-12">
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Tài liệu chi tiết
                    </h2>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '800px' }}>
                    <iframe
                      src={category.pdfUrl}
                      className="w-full h-full"
                      title={`${category.title} - Tài liệu PDF`}
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <a
                      href={category.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Tải xuống PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {category.tests.length === 0 ? (
              <div className="text-center py-20 card">
                <FlaskConical className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có phép thử nào
                </h3>
                <p className="text-gray-500">
                  Danh mục này đang được cập nhật
                </p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="card divide-y divide-gray-100">
                  {category.tests.map((test, index) => (
                    <div
                      key={test.id}
                      className="p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {test.name}
                          </h3>
                          {test.standard && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                              <span className="font-mono font-medium">{test.standard}</span>
                            </div>
                          )}
                          {test.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {test.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">
              Cần tư vấn chi tiết?
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Liên hệ với chúng tôi để được tư vấn chi tiết về dịch vụ thí nghiệm và báo giá.
            </p>
            <Link href="/lien-he" className="btn-primary !bg-secondary-500 hover:!bg-secondary-600">
              Liên hệ ngay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
