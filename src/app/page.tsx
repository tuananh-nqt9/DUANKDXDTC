import Link from "next/link";
import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";

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
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 md:py-28 overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920')] bg-cover bg-center" />
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-10 animate-float" style={{ animationDelay: "1s" }} />

          <div className="container-custom relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Shield className="w-4 h-4 text-secondary-400" />
                Phòng thí nghiệm LAS-XD 795
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-4 animate-fade-up leading-tight">
                THANH CHƯƠNG <span className="text-secondary-400">JSC</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary-200 mb-6 animate-fade-up">
                KIỂM ĐỊNH XÂY DỰNG CHUYÊN NGHIỆP
              </h2>
              <p className="text-lg text-primary-100 mb-8 leading-relaxed animate-fade-up">
                Đơn vị tư vấn xây dựng hàng đầu với{" "}
                <strong className="text-secondary-300">hơn 10 năm kinh nghiệm</strong> trong lĩnh vực
                Thí nghiệm, Kiểm định, Giám sát và Tư vấn xây dựng tại Hà Nội và các tỉnh phía Bắc.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up">
                <Link href="/lien-he" className="btn-primary !bg-secondary-500 hover:!bg-secondary-600 !text-white">
                  <MessageCircle className="w-5 h-5" />
                  Yêu cầu tư vấn
                </Link>
                <Link href="/gioi-thieu" className="btn-secondary !text-white !border-white hover:!bg-white/10">
                  Tìm hiểu thêm
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 py-10 relative -mt-1">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {[
                { num: "10+", label: "Năm kinh nghiệm", icon: Award },
                { num: "1000+", label: "Công trình", icon: Building2 },
                { num: "50+", label: "Kỹ sư chuyên gia", icon: Users },
                { num: "100+", label: "Chỉ tiêu TN", icon: FlaskConical },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.num}</div>
                  <div className="text-primary-100 text-sm">{stat.label}</div>
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
                      <div className="text-3xl font-extrabold text-primary-600">10+</div>
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
                  đã tham gia <strong className="text-primary-600">hơn 1.000 công trình</strong> lớn nhỏ trên cả nước.
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

        {/* DỊCH VỤ */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-primary-600" />
                Ngành nghề
                <span className="w-8 h-0.5 bg-primary-600" />
              </span>
              <h2 className="section-title mt-3">DỊCH VỤ CỦA CHÚNG TÔI</h2>
              <p className="section-subtitle">
                Cung cấp đa dạng các dịch vụ tư vấn xây dựng với chất lượng hàng đầu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComp = iconMap[service.icon] || FlaskConical;
                return (
                  <div key={service.id} className="card p-6 group relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary-50 rounded-bl-[100px] rounded-tr-xl opacity-50 group-hover:bg-primary-100 transition-colors" />
                    <div className="relative">
                      <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-all duration-300 group-hover:rotate-6">
                        <IconComp className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {service.excerpt}
                      </p>
                      <Link
                        href={`/dich-vu/${service.slug}`}
                        className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DỰ ÁN */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-primary-600" />
                Portfolio
                <span className="w-8 h-0.5 bg-primary-600" />
              </span>
              <h2 className="section-title mt-3">DỰ ÁN NỔI BẬT</h2>
              <p className="section-subtitle">
                Một số dự án tiêu biểu mà Thanh Chương đã tham gia tư vấn, kiểm định
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card group">
                  <div className="relative h-56 overflow-hidden">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                    {project.featured && (
                      <span className="absolute top-3 left-3 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                        ⭐ Nổi bật
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/du-an" className="btn-primary">
                Xem tất cả dự án <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* TẠI SAO CHỌN CHÚNG TÔI */}
        <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">TẠI SAO CHỌN THANH CHƯƠNG?</h2>
              <p className="text-primary-200 max-w-2xl mx-auto">
                Những lý do khách hàng tin tưởng và lựa chọn dịch vụ của chúng tôi
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Uy tín hàng đầu", desc: "Phòng TN LAS-XD 795 được Bộ Xây dựng công nhận" },
                { icon: Award, title: "Chuyên gia giàu kinh nghiệm", desc: "Đội ngũ kỹ sư có chứng chỉ hành nghề" },
                { icon: Clock, title: "Báo cáo nhanh chóng", desc: "Cam kết thời gian, chính xác từng chi tiết" },
                { icon: TrendingUp, title: "Giá cả cạnh tranh", desc: "Chi phí hợp lý, chất lượng vượt trội" },
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-secondary-500 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA LIÊN HỆ */}
        <section className="py-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl opacity-20" />
          <div className="container-custom text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CẦN TƯ VẤN VỀ DỰ ÁN?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết trong vòng 24h
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:0939688669" className="btn-primary !bg-white !text-primary-900 hover:!bg-primary-50">
                <Phone className="w-5 h-5" />
                Gọi 0939.688.669
              </a>
              <Link href="/lien-he" className="btn-secondary !text-white !border-white hover:!bg-white/10">
                <Mail className="w-5 h-5" />
                Gửi yêu cầu
              </Link>
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
      </main>

      <Footer />

      {/* Floating Contact Buttons */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
        <a href="tel:0939688669" className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-primary-700 transition-all hover:scale-110" title="Gọi ngay">
          <Phone className="w-6 h-6" />
        </a>
        <a href="mailto:Thanhchuong.jsc@gmail.com" className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-red-700 transition-all hover:scale-110" title="Gửi email">
          <Mail className="w-6 h-6" />
        </a>
        <a href="#" className="w-14 h-14 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-cyan-700 transition-all hover:scale-110" title="Chat Zalo">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}
