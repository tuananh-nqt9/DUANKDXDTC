import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, Users, Building2, FlaskConical, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#about-grid)" />
            </svg>
          </div>
          <div className="container-custom relative z-10">
            <span className="inline-block bg-primary-700/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-3">Về chúng tôi</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Giới thiệu</h1>
            <p className="text-primary-200 text-lg">Về Công ty CP Xây dựng Thanh Chương</p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-600 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
              {[
                { num: "10+", label: "Năm kinh nghiệm", icon: Award },
                { num: "1000+", label: "Công trình", icon: Building2 },
                { num: "50+", label: "Kỹ sư", icon: Users },
                { num: "100+", label: "Chỉ tiêu TN", icon: FlaskConical },
              ].map((s, i) => (
                <div key={i} className="group">
                  <s.icon className="w-10 h-10 mx-auto mb-3 opacity-80 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold mb-1">{s.num}</div>
                  <div className="text-primary-100 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Công ty CP Xây dựng Thanh Chương</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Công ty CP Xây dựng Thanh Chương</strong> được thành lập với Giấy phép số{" "}
                <strong>0106763717</strong> do Sở Kế hoạch &amp; Đầu tư Hà Nội cấp ngày{" "}
                <strong>29/01/2015</strong>.
              </p>
              <p>
                Phòng Thí nghiệm <strong>LAS-XD 795</strong> của chúng tôi được Bộ Xây dựng công nhận,
                đủ năng lực thực hiện các thí nghiệm, kiểm định chất lượng vật liệu xây dựng và công trình.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tầm nhìn</h3>
              <p>
                Trở thành đơn vị tư vấn xây dựng hàng đầu tại Việt Nam, mang đến các dịch vụ chuyên nghiệp,
                chất lượng cao với chi phí hợp lý.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sứ mệnh</h3>
              <p>
                Cung cấp các dịch vụ thí nghiệm, kiểm định, tư vấn giám sát xây dựng đảm bảo chất lượng,
                an toàn và tiến độ cho mọi công trình.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Giá trị cốt lõi</h3>
              <ul className="space-y-2 list-none">
                {[
                  "Chuyên nghiệp - Uy tín - Chất lượng",
                  "Đội ngũ kỹ sư có chứng chỉ hành nghề",
                  "Trang thiết bị hiện đại, đạt chuẩn",
                  "Báo cáo kết quả nhanh chóng, chính xác",
                  "Giá cả cạnh tranh, hợp lý",
                ].map((v, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
