import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, Users, Building2, FlaskConical, CheckCircle, Shield, Target, Lightbulb, TrendingUp, Download, FileText } from "lucide-react";
import { COMPANY, STATS, TEAM_MEMBERS } from "@/lib/constants";
import Image from "next/image";

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
            <p className="text-primary-200 text-lg">Về {COMPANY.shortName}</p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-600 py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
              {[
                { num: STATS.experience, label: "Năm kinh nghiệm", icon: Award },
                { num: STATS.projects, label: "Công trình", icon: Building2 },
                { num: STATS.engineers, label: "Kỹ sư", icon: Users },
                { num: STATS.testParameters, label: "Chỉ tiêu TN", icon: FlaskConical },
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

        {/* Company Info */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{COMPANY.name}</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
                <p className="mb-2">
                  <strong className="text-primary-700">Giấy phép kinh doanh số:</strong> {COMPANY.businessLicense}
                </p>
                <p className="mb-2">
                  <strong className="text-primary-700">Ngày cấp:</strong> {COMPANY.licenseIssueDate}
                </p>
                <p className="mb-2">
                  <strong className="text-primary-700">Nơi cấp:</strong> {COMPANY.licenseIssuedBy}
                </p>
                <p>
                  <strong className="text-primary-700">Mã số thuế:</strong> {COMPANY.taxCode}
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                <strong>{COMPANY.shortName}</strong> là đơn vị tư vấn xây dựng chuyên nghiệp với{" "}
                <strong className="text-primary-600">hơn {STATS.experience.replace('+', '')} năm kinh nghiệm</strong> trong lĩnh vực 
                Thí nghiệm, Kiểm định, Giám sát và Tư vấn xây dựng trong và ngoài nước.
              </p>

              <div className="bg-secondary-50 border border-secondary-200 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{COMPANY.lab.name}</h3>
                    <p className="text-gray-700">
                      Được <strong>{COMPANY.lab.accreditedBy}</strong> công nhận, đủ năng lực thực hiện các thí nghiệm, 
                      kiểm định chất lượng vật liệu xây dựng và công trình theo tiêu chuẩn Việt Nam và quốc tế.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Với văn phòng đại diện đặt tại <strong>Hà Nội, Bắc Ninh và Lạng Sơn</strong>, chúng tôi đã tham gia 
                tư vấn, kiểm định cho <strong className="text-primary-600">hơn {STATS.projects.replace('+', '')} công trình</strong> lớn nhỏ 
                trên cả nước, bao gồm các dự án dân dụng, công nghiệp, giao thông và hạ tầng.
              </p>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
                <p className="text-gray-600 leading-relaxed">
                  Trở thành đơn vị tư vấn xây dựng <strong>hàng đầu tại Việt Nam</strong>, 
                  mang đến các dịch vụ chuyên nghiệp, chất lượng cao với chi phí hợp lý.
                </p>
              </div>

              {/* Mission */}
              <div className="card text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cung cấp các dịch vụ thí nghiệm, kiểm định, tư vấn giám sát xây dựng 
                  <strong> đảm bảo chất lượng, an toàn và tiến độ</strong> cho mọi công trình.
                </p>
              </div>

              {/* Values */}
              <div className="card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  {[
                    "Chuyên nghiệp - Uy tín",
                    "Chất lượng - Hiệu quả",
                    "Tận tâm - Trách nhiệm",
                    "Sáng tạo - Phát triển",
                  ].map((v, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tại sao chọn chúng tôi?</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Phòng Thí nghiệm được công nhận",
                  desc: "LAS-XD 795 được Bộ Xây dựng công nhận đủ năng lực",
                },
                {
                  title: "Đội ngũ kỹ sư giàu kinh nghiệm",
                  desc: "Hơn 50 kỹ sư có chứng chỉ hành nghề, kinh nghiệm thực tế",
                },
                {
                  title: "Trang thiết bị hiện đại",
                  desc: "Đầu tư trang thiết bị tiên tiến, đạt chuẩn chất lượng quốc tế",
                },
                {
                  title: "Báo cáo nhanh chóng, chính xác",
                  desc: "Cam kết thời gian, kết quả chính xác đến từng chi tiết",
                },
                {
                  title: "Giá cả cạnh tranh",
                  desc: "Chi phí hợp lý, minh bạch, chất lượng vượt trội",
                },
                {
                  title: "Hỗ trợ tận tình",
                  desc: "Tư vấn miễn phí, hỗ trợ 24/7, chăm sóc khách hàng tận tâm",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Documents */}
        <section className="py-16 bg-white">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tải tài liệu</h2>
              <p className="text-gray-600">Hồ sơ năng lực và tài liệu giới thiệu công ty</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Hồ sơ năng lực công ty",
                  description: "Profile tổng quan về THANH CHƯƠNG JSC",
                  file: "/documents/ho-so-nang-luc.pdf",
                  size: "2.5 MB",
                  icon: FileText,
                },
                {
                  title: "Giới thiệu phòng thí nghiệm",
                  description: "Thông tin chi tiết về PTN LAS-XD 795",
                  file: "/documents/phong-thi-nghiem.pdf",
                  size: "1.8 MB",
                  icon: FlaskConical,
                },
                {
                  title: "Chứng chỉ & Giấy phép",
                  description: "Các chứng chỉ hành nghề và công nhận",
                  file: "/documents/chung-chi.pdf",
                  size: "3.2 MB",
                  icon: Award,
                },
                {
                  title: "Danh mục dịch vụ",
                  description: "Bảng giá và dịch vụ chi tiết",
                  file: "/documents/danh-muc-dich-vu.pdf",
                  size: "1.5 MB",
                  icon: CheckCircle,
                },
              ].map((doc, i) => (
                <a
                  key={i}
                  href={doc.file}
                  download
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                      <doc.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          PDF • {doc.size}
                        </span>
                        <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          <Download className="w-4 h-4" />
                          <span>Tải về</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Lưu ý khi tải tài liệu</h4>
                  <p className="text-sm text-gray-700">
                    Tài liệu được cung cấp miễn phí cho mục đích tham khảo. 
                    Nghiêm cấm sao chép, phân phối hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản của THANH CHƯƠNG JSC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Locations */}
        <section className="py-16 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Hệ thống văn phòng</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {COMPANY.offices.map((office) => (
                <div key={office.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{office.city}</h3>
                      <span className="text-sm text-primary-200">{office.type}</span>
                    </div>
                  </div>
                  <p className="text-primary-100 mb-4 text-sm leading-relaxed">{office.address}</p>
                  <a 
                    href={office.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-300 text-sm font-semibold"
                  >
                    Xem bản đồ →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
