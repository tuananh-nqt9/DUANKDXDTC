import Link from "next/link";
import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQ";
import { BackToTop } from "@/components/BackToTop";
import TestCategoriesSection from "@/components/TestCategoriesSection";
import EquipmentSection from "@/components/EquipmentSection";
import { prisma } from "@/lib/prisma";
import { STATS, COMPANY } from "@/lib/constants";

// Force dynamic rendering - tránh lỗi prerender trên Vercel
export const dynamic = "force-dynamic";
import {
  Phone,
  Mail,
  MessageCircle,
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

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* HERO SECTION - Enhanced with modern effects */}
        <section className="relative bg-gradient-animated text-white py-20 md:py-32 overflow-hidden noise-overlay">
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.15] bg-grid-pattern" />

          {/* Gradient Mesh Overlay */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

          {/* Background image overlay with parallax effect */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920')] bg-cover bg-center bg-fixed" />
          </div>

          {/* Floating orbs with enhanced animations */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 animate-float-slow" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-400 rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-electric-400 rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: "0.5s" }} />

          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div className="h-full w-full" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)'
            }} />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl">
              {/* Badge with shimmer effect */}
              <span className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/30 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 animate-fade-in shadow-glass hover:bg-white/15 transition-all duration-300 group">
                <Shield className="w-4 h-4 text-secondary-300 group-hover:rotate-12 transition-transform duration-300" />
                Phòng thí nghiệm LAS-XD 795
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 rounded-full" />
              </span>

              <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 animate-fade-up leading-tight tracking-tight">
                THANH CHƯƠNG <span className="text-secondary-300 inline-block hover:scale-110 transition-transform duration-300">JSC</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-primary-100 mb-6 animate-fade-up backdrop-blur-sm bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10" style={{ animationDelay: "0.1s" }}>
                KIỂM ĐỊNH XÂY DỰNG CHUYÊN NGHIỆP
              </h2>
              
              <p className="text-lg md:text-xl text-primary-50 mb-10 leading-relaxed animate-fade-up max-w-3xl backdrop-blur-sm" style={{ animationDelay: "0.2s" }}>
                Đơn vị tư vấn xây dựng hàng đầu với{" "}
                <strong className="text-secondary-200 font-bold relative inline-block">
                  hơn {STATS.experience.replace('+', '')} năm kinh nghiệm
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary-400 opacity-30 blur-sm" />
                </strong> trong lĩnh vực
                Thí nghiệm, Kiểm định, Giám sát và Tư vấn xây dựng trong và ngoài nước.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Link href="/lien-he" className="btn-primary !bg-secondary-500 hover:!bg-secondary-600 !text-white !shadow-neon-cyan group">
                  <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Yêu cầu tư vấn
                </Link>
                <Link
                  href="/gioi-thieu"
                  className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/10 border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-glass group active:scale-95"
                >
                  Tìm hiểu thêm
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              {/* Scroll indicator */}
              <div className="mt-16 animate-bounce-soft opacity-70">
                <div className="flex flex-col items-center gap-2 text-white/60 text-sm">
                  <span className="uppercase tracking-wider">Cuộn xuống</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR - Enhanced with glass effect */}
        <section className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 py-12 relative -mt-1 overflow-hidden">
          {/* Glass overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />
          
          {/* Animated line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary-400 to-transparent animate-shimmer" />
          
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {[
                { num: STATS.experience, label: "Năm kinh nghiệm", icon: Award, delay: "0s" },
                { num: STATS.projects, label: "Công trình", icon: Building2, delay: "0.1s" },
                { num: STATS.engineers, label: "Kỹ sư chuyên gia", icon: Users, delay: "0.2s" },
                { num: STATS.testParameters, label: "Chỉ tiêu TN", icon: FlaskConical, delay: "0.3s" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center group cursor-default animate-fade-up"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="relative inline-block mb-4">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-secondary-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative w-16 h-16 mx-auto backdrop-blur-md bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-secondary-400/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <stat.icon className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 group-hover:scale-110 transition-transform duration-300 tabular-nums">
                    {stat.num}
                  </div>
                  <div className="text-primary-100 text-sm font-medium tracking-wide">{stat.label}</div>
                  
                  {/* Progress bar animation */}
                  <div className="mt-3 h-1 w-20 mx-auto bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary-400 to-electric-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GIỚI THIỆU NGẮN */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                  alt="Thanh Chương JSC"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-primary-600">{STATS.experience}</div>
                      <div className="text-sm text-gray-600">Năm kinh nghiệm uy tín</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary-600" />
                  Về chúng tôi
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                  Đơn vị uy tín trong lĩnh vực{" "}
                  <span className="text-gradient">Kiểm định Xây dựng</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
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
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/gioi-thieu" className="btn-primary">
                  Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DỊCH VỤ - Enhanced cards */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-white" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30" />
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4 animate-fade-in">
                <span className="w-8 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent" />
                Ngành nghề
                <span className="w-8 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent" />
              </span>
              <h2 className="section-title mt-3 animate-fade-up">
                DỊCH VỤ CỦA CHÚNG TÔI
              </h2>
              <p className="section-subtitle animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Cung cấp đa dạng các dịch vụ tư vấn xây dựng với chất lượng hàng đầu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const IconComp = iconMap[service.icon] || FlaskConical;
                return (
                  <div 
                    key={service.id} 
                    className="card p-8 group relative overflow-visible animate-fade-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Gradient corner decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-bl-[100px] rounded-tr-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:via-transparent group-hover:to-secondary-500/5 rounded-xl transition-all duration-500" />
                    
                    <div className="relative">
                      {/* Icon container with enhanced animation */}
                      <div className="relative mb-6 inline-block">
                        {/* Pulsing background */}
                        <div className="absolute inset-0 bg-primary-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-soft" />
                        
                        <div className="relative w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-neon-red">
                          <IconComp className="w-8 h-8 text-primary-700 group-hover:text-white transition-colors duration-500" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                        {service.excerpt}
                      </p>
                      
                      <Link
                        href={`/dich-vu/${service.slug}`}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group/link hover:gap-3 transition-all duration-300"
                      >
                        <span className="relative">
                          Tìm hiểu thêm
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover/link:w-full transition-all duration-300" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute bottom-0 left-0 w-2 h-16 bg-gradient-to-t from-primary-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-lg" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DỰ ÁN - Enhanced with reveal animations */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 mb-4 animate-fade-in">
                <span className="w-8 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent" />
                Portfolio
                <span className="w-8 h-0.5 bg-gradient-to-r from-transparent via-primary-600 to-transparent" />
              </span>
              <h2 className="section-title mt-3 animate-fade-up">DỰ ÁN NỔI BẬT</h2>
              <p className="section-subtitle animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Một số dự án tiêu biểu mà Thanh Chương đã tham gia tư vấn, kiểm định
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/du-an/${project.slug}`}
                  className="card group block hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
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
                        {/* Gradient overlay with animation */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                        
                        {/* Scan line effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
                      </>
                    )}
                    
                    {project.featured && (
                      <span className="absolute top-4 left-4 backdrop-blur-md bg-secondary-500/90 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg animate-pulse-soft border border-secondary-400/30">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                        Nổi bật
                      </span>
                    )}
                    
                    {/* Hover icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 backdrop-blur-md bg-white/10 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-90">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="p-6 relative">
                    {/* Title with gradient on hover */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Meta info with icons */}
                    <div className="flex items-center justify-between text-sm text-gray-500 gap-4">
                      <span className="flex items-center gap-1.5 group-hover:text-primary-600 transition-colors duration-300">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        <span className="truncate">{project.location}</span>
                      </span>
                      <span className="flex items-center gap-1.5 group-hover:text-primary-600 transition-colors duration-300">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        <span>{project.year}</span>
                      </span>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/du-an" className="btn-primary group">
                Xem tất cả dự án 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* DANH MỤC CHỈ TIÊU PHÉP THỬ */}
        <TestCategoriesSection />

        {/* TRANG THIẾT BỊ HIỆN ĐẠI */}
        <EquipmentSection />

        {/* TẠI SAO CHỌN CHÚNG TÔI - Enhanced */}
        <section className="py-20 bg-gradient-animated text-white relative overflow-hidden noise-overlay">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl opacity-20 animate-float-slow" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-electric-400 rounded-full blur-3xl opacity-15 animate-float" />

          <div className="container-custom relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                TẠI SAO CHỌN THANH CHƯƠNG?
              </h2>
              <p className="text-primary-100 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Những lý do khách hàng tin tưởng và lựa chọn dịch vụ của chúng tôi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Uy tín hàng đầu", desc: "Phòng TN LAS-XD 795 được Bộ Xây dựng công nhận", delay: "0s" },
                { icon: Award, title: "Chuyên gia giàu kinh nghiệm", desc: "Đội ngũ kỹ sư có chứng chỉ hành nghề", delay: "0.1s" },
                { icon: Clock, title: "Báo cáo nhanh chóng", desc: "Cam kết thời gian, chính xác từng chi tiết", delay: "0.2s" },
                { icon: TrendingUp, title: "Giá cả cạnh tranh", desc: "Chi phí hợp lý, chất lượng vượt trội", delay: "0.3s" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="text-center group animate-fade-up"
                  style={{ animationDelay: item.delay }}
                >
                  {/* Icon with glow */}
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-secondary-400 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                    
                    <div className="relative w-20 h-20 mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-secondary-500 group-hover:border-secondary-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                      <item.icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 group-hover:text-secondary-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary-100 leading-relaxed">{item.desc}</p>
                  
                  {/* Decorative line */}
                  <div className="mt-4 mx-auto w-0 h-0.5 bg-gradient-to-r from-secondary-400 to-electric-400 group-hover:w-16 transition-all duration-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA LIÊN HỆ - Enhanced with parallax */}
        <section className="py-24 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-400 rounded-full blur-3xl opacity-20 animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-400 rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: "1s" }} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container-custom text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <MessageCircle className="w-4 h-4 text-secondary-300" />
                Liên hệ tư vấn miễn phí
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up leading-tight">
                CẦN TƯ VẤN VỀ DỰ ÁN?
              </h2>
              
              <p className="text-primary-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết trong vòng 
                <span className="font-bold text-secondary-300"> 24 giờ</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <a 
                  href={`tel:${COMPANY.contact.hotline}`} 
                  className="btn-primary !bg-white !text-primary-900 hover:!bg-primary-50 !shadow-glass group"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Gọi {COMPANY.contact.hotline}
                </a>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/10 border-2 border-white/30 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-glass group active:scale-95"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Gửi yêu cầu
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TIN TỨC */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-primary-600" />
                Blog
                <span className="w-8 h-0.5 bg-primary-600" />
              </span>
              <h2 className="section-title mt-3">TIN TỨC MỚI NHẤT</h2>
              <p className="section-subtitle">
                Cập nhật tin tức và kiến thức mới nhất về ngành xây dựng
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="card group">
                  <div className="relative h-48 overflow-hidden">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-700 text-xs px-3 py-1 rounded-full font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                    <Link href={`/tin-tuc/${post.slug}`} className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Đọc tiếp <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FAQSection />
      </main>

      <Footer />
      <BackToTop />

      {/* Enhanced Floating Contact Buttons */}
      <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 flex flex-col gap-3">
        <a 
          href={`tel:${COMPANY.contact.hotline}`} 
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-neon-red hover:shadow-neon-red transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in"
          title="Gọi ngay"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-20" />
          
          {/* Icon */}
          <Phone className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Gọi ngay
          </span>
        </a>

        <a 
          href={`mailto:${COMPANY.contact.email}`} 
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
          title="Gửi email"
        >
          {/* Glow effect */}
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
          className="group relative w-14 h-14 md:w-16 md:h-16 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-neon-cyan hover:shadow-neon-cyan transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
          title="Chat Zalo"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" style={{ animationDelay: "0.5s" }} />
          
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Chat Zalo
          </span>
        </a>
      </div>
    </>
  );
}
