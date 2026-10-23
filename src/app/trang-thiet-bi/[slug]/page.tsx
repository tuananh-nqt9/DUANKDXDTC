import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/constants";
import {
  Wrench,
  ChevronRight,
  Package,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  FileText,
  Clock,
  Layers,
} from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await prisma.equipment.findFirst({
    where: { slug: params.slug, published: true },
  });

  if (!item) {
    return {
      title: "Không tìm thấy thiết bị - Thanh Chương JSC",
    };
  }

  return {
    title: `${item.name} - Trang thiết bị Thanh Chương`,
    description:
      item.description ||
      `Chi tiết thiết bị ${item.name} - Model: ${item.model || "N/A"}, Xuất xứ: ${item.origin || "N/A"} phục vụ phòng thí nghiệm LAS-XD 795.`,
    openGraph: {
      title: `${item.name} - Phòng thí nghiệm LAS-XD 795`,
      description: item.description || undefined,
      images: item.image ? [{ url: item.image }] : undefined,
    },
  };
}

export default async function EquipmentDetailPage({ params }: PageProps) {
  const item = await prisma.equipment.findFirst({
    where: { slug: params.slug, published: true },
  });

  if (!item) {
    notFound();
  }

  // Lấy các thiết bị liên quan cùng nhóm hoặc nổi bật
  const relatedItems = await prisma.equipment.findMany({
    where: {
      published: true,
      NOT: { id: item.id },
      ...(item.category ? { category: item.category } : {}),
    },
    take: 3,
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });

  // Tách dòng thông số kỹ thuật nếu có
  const specLines = item.specs
    ? item.specs
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-gray-50/60 pb-20">
        {/* ==================== BREADCRUMB & HEADER ==================== */}
        <section className="bg-white border-b border-gray-200 py-4">
          <div className="container-custom">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/trang-thiet-bi" className="hover:text-primary-600 transition-colors">
                Trang thiết bị
              </Link>
              {item.category && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{item.category}</span>
                </>
              )}
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-primary-600 font-medium truncate max-w-xs sm:max-w-md">
                {item.name}
              </span>
            </nav>
          </div>
        </section>

        {/* ==================== MAIN CONTENT: 2 CỘT ==================== */}
        <section className="py-10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* CỘT TRÁI: HÌNH ẢNH THIẾT BỊ (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-gray-950 flex items-center justify-center">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt="Background blur"
                        fill
                        className="object-cover opacity-25 blur-xl scale-110"
                      />
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority
                        className="object-contain relative z-10 p-4 drop-shadow-2xl"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                      <Wrench className="w-16 h-16 text-primary-400 mb-2" />
                      <span className="text-sm font-semibold text-gray-500">Phòng TN LAS-XD 795</span>
                    </div>
                  )}

                  {/* Badges */}
                  {item.featured && (
                    <span className="absolute top-4 left-4 z-20 backdrop-blur-md bg-secondary-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Thiết bị nổi bật
                    </span>
                  )}

                  <div className="absolute bottom-4 right-4 z-20 backdrop-blur-md bg-black/60 text-white text-xs px-3 py-1 rounded-lg border border-white/20">
                    LAS-XD 795
                  </div>
                </div>

                {/* Cam kết kiểm chuẩn */}
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Đã kiểm định hiệu chuẩn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span>Đạt chuẩn Bộ Xây dựng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span>Độ chính xác cấp cao</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <span>Vận hành 24/7 theo dự án</span>
                  </div>
                </div>
              </div>

              {/* CỘT PHẢI: THÔNG TIN & TƯ VẤN (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                  {/* Category tag */}
                  {item.category && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-3 border border-primary-200">
                      {item.category}
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 mb-4 leading-tight">
                    {item.name}
                  </h1>

                  {item.description && (
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>
                  )}

                  {/* BẢNG THÔNG TIN TÓM TẮT */}
                  <div className="bg-gray-50 rounded-xl border border-gray-200/90 overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-gray-200">
                        {item.model && (
                          <tr>
                            <td className="px-4 py-3 font-semibold text-gray-500 w-1/3 bg-gray-100/60">
                              Model / Ký hiệu
                            </td>
                            <td className="px-4 py-3 font-bold text-gray-900">
                              {item.model}
                            </td>
                          </tr>
                        )}
                        {item.manufacturer && (
                          <tr>
                            <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-100/60">
                              Nhà sản xuất / Hãng
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {item.manufacturer}
                            </td>
                          </tr>
                        )}
                        {item.origin && (
                          <tr>
                            <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-100/60">
                              Xuất xứ
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {item.origin}
                            </td>
                          </tr>
                        )}
                        {item.year && (
                          <tr>
                            <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-100/60">
                              Năm sản xuất
                            </td>
                            <td className="px-4 py-3 text-gray-800">
                              {item.year}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="px-4 py-3 font-semibold text-gray-500 bg-gray-100/60">
                            Tình trạng thiết bị
                          </td>
                          <td className="px-4 py-3 text-green-700 font-semibold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Đang hoạt động &amp; sẵn sàng phục vụ thí nghiệm
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* KHỐI CTA LIÊN HỆ TƯ VẤN */}
                  <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-secondary-300 font-bold mb-1">
                        Tư vấn &amp; Báo giá thí nghiệm
                      </div>
                      <div className="text-lg font-bold">
                        Hotline: {COMPANY.contact.hotline}
                      </div>
                      <div className="text-xs text-primary-200 mt-0.5">
                        Hỗ trợ kỹ thuật và giải pháp kiểm định 24/7
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`tel:${COMPANY.contact.hotline}`}
                        className="btn-primary !bg-secondary-500 hover:!bg-secondary-600 text-xs sm:text-sm font-bold px-4 py-2.5 whitespace-nowrap"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Gọi ngay
                      </a>
                      <a
                        href={COMPANY.social.zalo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#0068FF] hover:bg-[#0055d4] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <ZaloIcon className="w-4 h-4" />
                        Zalo
                      </a>
                    </div>
                  </div>
                </div>

                {/* THÔNG SỐ KỸ THUẬT CHI TIẾT */}
                {specLines.length > 0 && (
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary-600" />
                      Thông số kỹ thuật chi tiết
                    </h2>

                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 font-mono text-sm space-y-2.5 text-gray-800">
                      {specLines.map((line, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ==================== THIẾT BỊ LIÊN QUAN ==================== */}
            {relatedItems.length > 0 && (
              <div className="mt-16 pt-10 border-t border-gray-200">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-primary-600 font-semibold uppercase text-xs tracking-wider">
                      Cùng danh mục thí nghiệm
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      Trang thiết bị liên quan
                    </h2>
                  </div>
                  <Link
                    href="/trang-thiet-bi"
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
                  >
                    Xem tất cả
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedItems.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/trang-thiet-bi/${rel.slug}`}
                      className="bg-white rounded-xl border border-gray-200 hover:border-primary-400 p-4 transition-all hover:shadow-lg group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 rounded-lg overflow-hidden bg-gray-950 mb-4 flex items-center justify-center">
                          {rel.image ? (
                            <Image
                              src={rel.image}
                              alt={rel.name}
                              fill
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <Wrench className="w-10 h-10 text-primary-400" />
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-base mb-2">
                          {rel.name}
                        </h3>
                        {rel.model && (
                          <p className="text-xs text-gray-500 mb-1">
                            Model: <strong className="text-gray-700">{rel.model}</strong>
                          </p>
                        )}
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary-600 mt-3">
                        <span>Chi tiết thiết bị</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to list button */}
            <div className="mt-12 text-center">
              <Link
                href="/trang-thiet-bi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-primary-300 transition-all text-sm shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại danh mục Trang thiết bị
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactWidget />
    </>
  );
}
