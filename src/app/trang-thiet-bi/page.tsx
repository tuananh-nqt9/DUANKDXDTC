import { Metadata } from "next";
import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { prisma } from "@/lib/prisma";
import EquipmentListWithFilter from "@/components/EquipmentListWithFilter";
import {
  Wrench,
  Shield,
  Award,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Trang thiết bị Thí nghiệm & Kiểm định - Công ty CP XD Thanh Chương",
  description:
    "Danh mục thiết bị thí nghiệm, kiểm định và khảo sát phục vụ hoạt động chuyên ngành xây dựng của Công ty Cổ phần Xây dựng Thanh Chương (Phòng TN LAS-XD 795).",
  openGraph: {
    title: "Trang thiết bị Thí nghiệm & Kiểm định - Thanh Chương JSC",
    description:
      "Danh mục máy móc đo lường, nén mẫu, kéo thép, kiểm định công trình đạt chuẩn quốc tế LAS-XD 795.",
  },
};

export default async function EquipmentPage() {
  const equipment = await prisma.equipment.findMany({
    where: { published: true },
    orderBy: [
      { featured: "desc" },
      { order: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-gray-50/50">
        {/* ==================== HERO SECTION - ĐỎ THƯƠNG HIỆU ==================== */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-16 md:py-24 overflow-hidden">
          {/* Background pattern & lighting */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              {/* Badge thương hiệu */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm font-semibold mb-6 text-white shadow-xs">
                <Shield className="w-4 h-4 text-secondary-400" />
                <span>Phòng Thí Nghiệm LAS-XD 795</span>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-tight">
                TRANG THIẾT BỊ{" "}
                <span className="bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
                  HIỆN ĐẠI
                </span>
              </h1>

              <p className="text-base sm:text-lg text-primary-100/90 leading-relaxed mb-8">
                Hệ thống trang thiết bị thí nghiệm, máy đo lường kiểm định và khảo sát địa chất
                đồng bộ, đạt chuẩn quốc tế, phục vụ chính xác mọi chỉ tiêu chuyên ngành xây dựng.
              </p>

              {/* Cam kết kỹ thuật */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15 text-sm">
                <div className="flex items-center gap-2.5 text-primary-100">
                  <CheckCircle2 className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                  <span>100% Đạt kiểm định hiệu chuẩn</span>
                </div>
                <div className="flex items-center gap-2.5 text-primary-100">
                  <Cpu className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                  <span>Hiển thị điện tử &amp; tự động</span>
                </div>
                <div className="flex items-center gap-2.5 text-primary-100">
                  <Award className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                  <span>Bộ Xây dựng công nhận</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== DANH SÁCH THIẾT BỊ (INTERACTIVE FILTER) ==================== */}
        <section className="py-12 md:py-20">
          <div className="container-custom">
            <EquipmentListWithFilter initialItems={equipment} />
          </div>
        </section>

        {/* ==================== TIÊU CHUẨN THIẾT BỊ ==================== */}
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                Độ chính xác &amp; Uy tín
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                TIÊU CHUẨN TRANG THIẾT BỊ LAS-XD 795
              </h2>
              <div className="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 hover:border-primary-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Bảo dưỡng &amp; Hiệu chuẩn định kỳ</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mọi máy móc, đồng hồ áp lực, cảm biến lực nén/kéo đều được kiểm định và dán tem hiệu chuẩn
                  bởi Viện Đo lường Quốc gia và các đơn vị kiểm định có thẩm quyền.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 hover:border-primary-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Đa dạng phép thử chuyên ngành</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Đầy đủ thiết bị cho thí nghiệm đất, bê tông nặng, vữa xây dựng, cốt liệu, kim loại, mối hàn,
                  thí nghiệm hiện trường và quan trắc lún nghiêng công trình.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 hover:border-primary-300 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Kỹ sư vận hành chuẩn chỉ</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Đội ngũ thí nghiệm viên và kỹ sư lành nghề, tuân thủ nghiêm ngặt quy trình quy chuẩn Việt Nam
                  (TCVN) và quốc tế (ASTM, AASHTO, BS, ISO).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CTA LIÊN HỆ TƯ VẤN ==================== */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

          <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Cần Báo Giá Dịch Vụ Thí Nghiệm &amp; Kiểm Định?
            </h2>
            <p className="text-primary-100 mb-8 text-sm sm:text-base leading-relaxed">
              Hãy liên hệ với Công ty Thanh Chương để được tư vấn phương án thí nghiệm tối ưu và
              nhận báo giá chi tiết cho công trình của quý đối tác.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${COMPANY.contact.hotline}`}
                className="btn-primary !bg-secondary-500 hover:!bg-secondary-600 inline-flex items-center gap-2 shadow-lg hover:shadow-xl font-bold text-white px-6 py-3.5 rounded-xl"
              >
                <Phone className="w-5 h-5" />
                Hotline: {COMPANY.contact.hotline}
              </a>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold transition-all backdrop-blur-md"
              >
                <Mail className="w-5 h-5" />
                Gửi yêu cầu báo giá
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
