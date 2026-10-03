import Link from "next/link";
import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQ";
import { BackToTop } from "@/components/BackToTop";
import TestCategoriesSection from "@/components/TestCategoriesSection";
import EquipmentSection from "@/components/EquipmentSection";
import DocumentsSection from "@/components/DocumentsSection";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { prisma } from "@/lib/prisma";
import { STATS, COMPANY } from "@/lib/constants";

// Force dynamic rendering - tránh lỗi prerender trên Vercel
export const dynamic = "force-dynamic";
import {
  Phone,
  Mail,
  Award,
  Users,
  Building2,
  CheckCircle,
  FlaskConical,
  ClipboardCheck,
  Mountain,
  HardHat,
  Activity,
  MountainSnow,
  ArrowRight,
  MapPin,
  Calendar,
  ChevronRight,
  Shield,
  Clock,
  TrendingUp,
  Navigation,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  ClipboardCheck,
  Mountain,
  HardHat,
  Activity,
  MountainSnow,
};

export default async function HomePage() {
  const [services, projects, posts] = await Promise.all([
    prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.project.findMany({ where: { published: true, featured: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);

  // Parse numbers for CountUp
  const experienceNum = parseInt(STATS.experience.replace(/\D/g, "")) || 10;
  const projectsNum = parseInt(STATS.projects.replace(/\D/g, "")) || 500;
  const engineersNum = parseInt(STATS.engineers.replace(/\D/g, "")) || 50;
  const testParamsNum = parseInt(STATS.testParameters.replace(/\D/g, "")) || 100;

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* ==================== HERO SECTION - PREMIUM REDESIGN ==================== */}
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-primary-900 text-white overflow-hidden">
          {/* Background Image with parallax-like effect */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
              alt="Construction site"
              fill
              className="object-cover"
              priority
              quality={85}
            />
            {/* Multi-layer gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-primary-800/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-transparent to-primary-900/40" />
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.04] bg-grid-pattern" />

          {/* Floating orbs - subtle and premium */}
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-primary-600 rounded-full blur-[120px] opacity-20 animate-float-slow" />
          <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-secondary-600 rounded-full blur-[100px] opacity-10 animate-float" style={{ animationDelay: "2s" }} />

          <div className="container-custom relative z-10 py-20 md:py-0">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="max-w-2xl">
                {/* Badge with shimmer */}
                <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-glass group hover:bg-white/15 transition-all duration-300">
                  <Shield className="w-4 h-4 text-secondary-300 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Phòng thí nghiệm LAS-XD 795</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 leading-[1.1] tracking-tight hero-text-shadow">
                  THANH CHƯƠNG{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300 bg-clip-text text-transparent">JSC</span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full opacity-60" />
                  </span>
                </h1>

                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-100/90 mb-6 tracking-wide">
                  KIỂM ĐỊNH XÂY DỰNG{" "}
                  <span className="text-secondary-300">CHUYÊN NGHIỆP</span>
                </h2>

                <p className="text-base md:text-lg text-primary-100/80 mb-10 leading-relaxed max-w-xl">
                  Đơn vị tư vấn xây dựng hàng đầu với{" "}
                  <strong className="text-secondary-200 font-bold">
                    hơn {STATS.experience.replace('+', '')} năm kinh nghiệm
                  </strong>{" "}
                  trong lĩnh vực Thí nghiệm, Kiểm định, Giám sát và Tư vấn xây dựng trong và ngoài nước.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link href="/lien-he" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Yêu cầu tư vấn
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/gioi-thieu"
                    className="group inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/10 border border-white/25 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
                  >
                    Tìm hiểu thêm
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Bộ XD công nhận</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>ISO 9001:2015</span>
                  </div>
                </div>
              </div>

              {/* Right side - Stats cards */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { num: experienceNum, suffix: "+", label: "Năm kinh nghiệm", icon: Award, gradient: "from-primary-600/40 to-primary-700/40" },
                  { num: projectsNum, suffix: "+", label: "Công trình", icon: Building2, gradient: "from-secondary-600/30 to-secondary-700/30" },
                  { num: engineersNum, suffix: "+", label: "Kỹ sư chuyên gia", icon: Users, gradient: "from-primary-500/30 to-primary-600/30" },
                  { num: testParamsNum, suffix: "+", label: "Chỉ tiêu TN", icon: FlaskConical, gradient: "from-secondary-500/30 to-secondary-600/30" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`backdrop-blur-lg bg-gradient-to-br ${stat.gradient} border border-white/15 rounded-2xl p-6 text-center hover:border-white/30 transition-all duration-500 hover:-translate-y-1 group`}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-secondary-300 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl md:text-4xl font-extrabold mb-1 tabular-nums">
                      <CountUp end={stat.num} suffix={stat.suffix} />
                    </div>
                    <div className="text-primary-200/80 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave separator */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-16 md:h-20">
              <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1350,50 1440,40 V80 H0 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ==================== STATS BAR (Mobile only - desktop is in hero) ==================== */}
        <section className="lg:hidden bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 py-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary-400 to-transparent" />

          <div className="container-custom">
            <div className="grid grid-cols-2 gap-6 text-white">
              {[
                { num: experienceNum, suffix: "+", label: "Năm kinh nghiệm", icon: Award },
                { num: projectsNum, suffix: "+", label: "Công trình", icon: Building2 },
                { num: engineersNum, suffix: "+", label: "Kỹ sư chuyên gia", icon: Users },
                { num: testParamsNum, suffix: "+", label: "Chỉ tiêu TN", icon: FlaskConical },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-3 backdrop-blur-md bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <stat.icon className="w-6 h-6 opacity-90" />
                  </div>
                  <div className="text-3xl font-extrabold mb-1 tabular-nums">
                    <CountUp end={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="text-primary-200 text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== GIỚI THIỆU NGẮN ==================== */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal variant="fade-right">
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src="/images/25-CMQGLqDK.jpg"
                    alt="Thanh Chương JSC"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />

                  {/* Floating info card */}
                  <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/95 p-6 rounded-xl shadow-xl border border-white/50">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-extrabold text-primary-600">
                          <CountUp end={experienceNum} suffix="+" />
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Năm kinh nghiệm uy tín</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={200}>
                <div>
                  <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center gap-2 mb-3">
                    <span className="w-10 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full" />
                    Về chúng tôi
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6 leading-tight">
                    Đơn vị uy tín trong lĩnh vực{" "}
                    <span className="text-gradient">Kiểm định Xây dựng</span>
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-[15px]">
                    <strong className="text-gray-900">Công ty CP Xây dựng Thanh Chương</strong> với văn phòng đại diện đặt tại
                    Hà Nội, Bắc Ninh, Lạng Sơn. Chúng tôi tự hào là đơn vị tư vấn xây dựng chuyên nghiệp,
                    đã tham gia <strong className="text-primary-600">hơn {STATS.projects.replace('+', '')} công trình</strong> lớn nhỏ trên cả nước.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Phòng Thí nghiệm LAS XD 795 được Bộ Xây dựng công nhận",
                      "Đội ngũ kỹ sư giàu kinh nghiệm, có chứng chỉ hành nghề",
                      "Trang thiết bị hiện đại, đạt chuẩn chất lượng",
                      "Dịch vụ chuyên nghiệp, báo cáo kết quả nhanh chóng",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-500 transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-green-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-700 text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/gioi-thieu" className="btn-primary">
                    Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ==================== DỊCH VỤ - Enhanced Premium Cards ==================== */}
        <section className="py-20 md:py-28 relative overflow-hidden bg-gray-50">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-[120px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-100 rounded-full blur-[100px] opacity-20" />

          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-4">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-600 rounded-full" />
                  <Sparkles className="w-4 h-4" />
                  Ngành nghề
                  <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary-600 rounded-full" />
                </span>
                <h2 className="section-title title-underline mt-3">
                  DỊCH VỤ CỦA CHÚNG TÔI
                </h2>
                <p className="section-subtitle mt-6">
                  Cung cấp đa dạng các dịch vụ tư vấn xây dựng với chất lượng hàng đầu
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const IconComp = iconMap[service.icon] || FlaskConical;
                return (
                  <ScrollReveal key={service.id} variant="fade-up" delay={idx * 100}>
                    <div className="card-premium group relative overflow-hidden h-full flex flex-col">
                      {service.image ? (
                        <div className="relative w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={600}
                            height={400}
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4">
                            <div className="relative w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                              <IconComp className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 pb-0 relative">
                          {/* Gradient corner decoration */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-bl-[100px] rounded-tr-[20px] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Icon container */}
                          <div className="relative mb-6 inline-block">
                            <div className="absolute inset-0 bg-primary-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg">
                              <IconComp className="w-8 h-8 text-primary-700 group-hover:text-white transition-colors duration-500" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={`p-8 ${service.image ? 'pt-6' : 'pt-0'} relative flex-1 flex flex-col`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3 flex-1">
                          {service.excerpt}
                        </p>

                        <div className="mt-auto">
                          <Link
                            href={`/dich-vu/${service.slug}`}
                            className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group/link hover:gap-3 transition-all duration-300"
                          >
                            <span className="relative">
                              Tìm hiểu thêm
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover/link:w-full transition-all duration-300 rounded-full" />
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== DỰ ÁN NỔI BẬT ==================== */}
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-4">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-600 rounded-full" />
                  <Target className="w-4 h-4" />
                  Portfolio
                  <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary-600 rounded-full" />
                </span>
                <h2 className="section-title title-underline mt-3">DỰ ÁN NỔI BẬT</h2>
                <p className="section-subtitle mt-6">
                  Một số dự án tiêu biểu mà Thanh Chương đã tham gia tư vấn, kiểm định
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ScrollReveal key={project.id} variant="fade-up" delay={idx * 100}>
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="card group block hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      {project.image && (
                        <>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                          {/* Shine sweep effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </>
                      )}

                      {project.featured && (
                        <span className="absolute top-4 left-4 backdrop-blur-md bg-secondary-500/90 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg border border-secondary-400/30">
                          <Sparkles className="w-3 h-3" />
                          Nổi bật
                        </span>
                      )}

                      {/* Hover arrow */}
                      <div className="absolute top-4 right-4 w-10 h-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="p-6 relative">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-500 gap-4">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          <span className="truncate">{project.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span>{project.year}</span>
                        </span>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:w-full transition-all duration-500 rounded-full" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <div className="text-center mt-12">
                <Link href="/du-an" className="btn-primary group">
                  Xem tất cả dự án
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* DANH MỤC CHỈ TIÊU PHÉP THỬ */}
        <TestCategoriesSection />

        {/* TRANG THIẾT BỊ HIỆN ĐẠI */}
        <EquipmentSection />

        {/* ==================== TẠI SAO CHỌN CHÚNG TÔI - Premium ==================== */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
          <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[150px] opacity-15 animate-float-slow" />
          <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-secondary-700 rounded-full blur-[120px] opacity-10 animate-float" />

          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 title-underline">
                  TẠI SAO CHỌN THANH CHƯƠNG?
                </h2>
                <p className="text-primary-200/80 max-w-2xl mx-auto text-lg mt-8">
                  Những lý do khách hàng tin tưởng và lựa chọn dịch vụ của chúng tôi
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Shield, title: "Uy tín hàng đầu", desc: "Phòng TN LAS-XD 795 được Bộ Xây dựng công nhận, hoạt động theo chuẩn quốc tế" },
                { icon: Award, title: "Chuyên gia giàu kinh nghiệm", desc: "Đội ngũ kỹ sư có chứng chỉ hành nghề, nhiều năm kinh nghiệm thực tế" },
                { icon: Zap, title: "Báo cáo nhanh chóng", desc: "Cam kết thời gian, chính xác từng chi tiết, hỗ trợ 24/7" },
                { icon: TrendingUp, title: "Giá cả cạnh tranh", desc: "Chi phí hợp lý, chất lượng vượt trội, tối ưu cho mọi quy mô" },
              ].map((item, i) => (
                <ScrollReveal key={i} variant="fade-up" delay={i * 120}>
                  <div className="text-center group">
                    {/* Icon with glow */}
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-secondary-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative w-20 h-20 mx-auto backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center group-hover:bg-white/20 group-hover:border-secondary-400/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <item.icon className="w-10 h-10 text-secondary-300 group-hover:text-secondary-200 group-hover:scale-110 transition-all duration-300" />
                      </div>
                    </div>

                    <h3 className="font-bold text-xl mb-3 group-hover:text-secondary-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary-200/70 leading-relaxed">{item.desc}</p>

                    {/* Decorative line */}
                    <div className="mt-5 mx-auto w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-primary-400 group-hover:w-16 transition-all duration-500 rounded-full" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA LIÊN HỆ ==================== */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
          {/* Animated orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500 rounded-full blur-[200px] opacity-10 animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500 rounded-full blur-[180px] opacity-10 animate-float" style={{ animationDelay: "1s" }} />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

          <div className="container-custom text-center relative z-10">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2.5 rounded-full text-sm font-medium mb-8">
                  <Phone className="w-4 h-4 text-secondary-300" />
                  Liên hệ tư vấn miễn phí
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight hero-text-shadow">
                  CẦN TƯ VẤN VỀ DỰ ÁN?
                </h2>

                <p className="text-primary-100/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết trong vòng{" "}
                  <span className="font-bold text-secondary-300">24 giờ</span>
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={`tel:${COMPANY.contact.hotline}`}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Gọi {COMPANY.contact.hotline}
                  </a>
                  <Link
                    href="/lien-he"
                    className="group inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/10 border border-white/25 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/40 active:scale-95"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Gửi yêu cầu
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ==================== TIN TỨC (chỉ hiển thị nếu có bài viết) ==================== */}
        {posts.length > 0 && (
          <section className="py-20 md:py-28 bg-white">
            <div className="container-custom">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-4">
                    <span className="w-8 h-0.5 bg-primary-600 rounded-full" />
                    Blog
                    <span className="w-8 h-0.5 bg-primary-600 rounded-full" />
                  </span>
                  <h2 className="section-title title-underline mt-3">TIN TỨC MỚI NHẤT</h2>
                  <p className="section-subtitle mt-6">
                    Cập nhật tin tức và kiến thức mới nhất về ngành xây dựng
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                  <ScrollReveal key={post.id} variant="fade-up" delay={idx * 100}>
                    <article className="card-premium group h-full flex flex-col overflow-hidden">
                      <div className="relative h-52 overflow-hidden">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-700 text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm">
                          {post.category}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors text-lg">
                          <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                        <Link href={`/tin-tuc/${post.slug}`} className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                          Đọc tiếp <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <FAQSection />

        {/* HỒ SƠ TÀI LIỆU */}
        <DocumentsSection />

        {/* ==================== GOOGLE MAPS ==================== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-custom">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  Địa chỉ liên hệ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 title-underline">
                  Hệ thống văn phòng & phòng thí nghiệm
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-6">
                  Chúng tôi có mặt tại nhiều tỉnh thành, sẵn sàng phục vụ bạn
                </p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              {COMPANY.offices.map((office, idx) => (
                <ScrollReveal key={office.id} variant="fade-up" delay={idx * 150}>
                  <div className="card-premium overflow-hidden group">
                    {/* Map */}
                    <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
                      <iframe
                        src={office.embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Bản đồ ${office.city}`}
                        className="group-hover:scale-105 transition-transform duration-500"
                      ></iframe>
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-2xl text-gray-900">{office.city}</h3>
                            <span className="text-xs bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 px-3 py-1 rounded-full font-semibold border border-primary-200">
                              {office.type}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{office.address}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary-600" />
                          </div>
                          <a href={`tel:${office.phone}`} className="text-primary-600 hover:text-primary-700 font-semibold text-lg hover:underline">
                            {office.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                          <span className="text-gray-600 text-sm">
                            Thứ 2 - Thứ 6: 8:00 - 17:30
                          </span>
                        </div>
                      </div>

                      <a
                        href={office.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 group/btn active:scale-95 hover:-translate-y-0.5"
                      >
                        <Navigation className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        Xem chỉ đường trên Google Maps
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ==================== Floating Contact Buttons ==================== */}
      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 flex flex-col gap-3">
        <BackToTop />

        {/* Phone Button */}
        <a
          href={`tel:${COMPANY.contact.hotline}`}
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-neon-red hover:shadow-neon-red transition-all duration-300 hover:scale-110 active:scale-95"
          title="Gọi ngay"
        >
          <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-20" />
          <Phone className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Gọi ngay
          </span>
        </a>

        <a
          href={`mailto:${COMPANY.contact.email}`}
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Gửi email"
        >
          <span className="absolute inset-0 rounded-full bg-red-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <Mail className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Gửi email
          </span>
        </a>

        <a
          href={COMPANY.social.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-[#0068FF] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Chat Zalo"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" style={{ animationDelay: "0.5s" }} />
          <ZaloIcon className="w-7 h-7 md:w-8 md:h-8 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Chat Zalo
          </span>
        </a>
      </div>
    </>
  );
}
