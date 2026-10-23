import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { FileText, Shield, Award, CheckCircle, Download, ExternalLink, Building2 } from "lucide-react";
import { CERTIFICATES, COMPANY } from "@/lib/constants";
import Image from "next/image";

export const metadata = {
  title: "Chứng chỉ & Giấy phép",
  description: `Chứng chỉ, giấy phép hoạt động của ${COMPANY.shortName}. Phòng TN ${COMPANY.lab.code} được Bộ Xây dựng công nhận.`,
};

export default function CertificatesPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="cert-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#cert-grid)" />
            </svg>
          </div>
          <div className="container-custom relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-secondary-400" />
              <span className="inline-block bg-primary-700/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                Uy tín - Chất lượng
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 break-words">Chứng chỉ & Giấy phép</h1>
            <p className="text-primary-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              Chứng nhận năng lực, giấy phép hoạt động và các chứng chỉ chuyên môn của {COMPANY.shortName}
            </p>
          </div>
        </section>

        {/* Main Certificates */}
        <section className="py-12 sm:py-16">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">Giấy phép & Chứng nhận chính</h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Các giấy tờ pháp lý và chứng nhận năng lực quan trọng của công ty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full min-w-0">
              {CERTIFICATES.map((cert) => (
                <div key={cert.id} className="card group hover:shadow-2xl transition-all duration-300 w-full min-w-0 max-w-full">
                  {/* Certificate Image Placeholder */}
                  <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden mb-4">
                    {cert.image && cert.image.startsWith('http') ? (
                      <Image 
                        src={cert.image} 
                        alt={cert.type}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <FileText className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 font-medium px-4 text-center break-words">
                          {cert.type}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          (Ảnh đang được cập nhật)
                        </p>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle className="w-3 h-3" />
                      Hợp lệ
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 break-words">{cert.type}</h3>
                        {cert.number && (
                          <p className="text-xs sm:text-sm text-primary-600 font-medium break-words">Số: {cert.number}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
                      {cert.issuedBy && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500 flex-shrink-0">Cấp bởi:</span>
                          <span className="font-medium text-right break-words">{cert.issuedBy}</span>
                        </div>
                      )}
                      {cert.issuedDate && (
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500 flex-shrink-0">Ngày cấp:</span>
                          <span className="font-medium">{cert.issuedDate}</span>
                        </div>
                      )}
                    </div>

                    {cert.image && cert.image.startsWith('http') && (
                      <button className="w-full btn-primary !py-2 text-sm justify-center">
                        <Download className="w-4 h-4" />
                        Tải xuống
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-1.5 sm:mb-2 text-base sm:text-lg">Lưu ý quan trọng</h3>
                  <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                    Tất cả các giấy phép và chứng nhận trên đây đều hợp lệ và được cấp bởi các cơ quan có thẩm quyền. 
                    Quý khách có thể liên hệ trực tiếp với chúng tôi để xem bản gốc hoặc xác minh tính hợp lệ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Accreditation Details */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-secondary-500 rounded-2xl mb-4">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 break-words">{COMPANY.lab.name}</h2>
                <p className="text-primary-200 text-sm sm:text-base">
                  Được {COMPANY.lab.accreditedBy} công nhận
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/20">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Phạm vi công nhận</h3>
                <p className="text-primary-100 mb-6 leading-relaxed text-sm sm:text-base">
                  {COMPANY.lab.scope}
                </p>

                <h4 className="font-bold mb-3 text-sm sm:text-base">Các chỉ tiêu thí nghiệm chính:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    "Thí nghiệm đất nền",
                    "Thí nghiệm cát, sỏi, đá dăm",
                    "Thí nghiệm xi măng",
                    "Thí nghiệm bê tông",
                    "Thí nghiệm thép",
                    "Thí nghiệm gạch, ngói",
                    "Thí nghiệm vữa xây",
                    "Kiểm tra cường độ bê tông hiện trường",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-primary-100">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-xs sm:text-sm text-primary-200 leading-relaxed">
                    <strong>Ghi chú:</strong> Phòng TN được trang bị đầy đủ thiết bị hiện đại, 
                    đội ngũ kỹ thuật viên giàu kinh nghiệm, đảm bảo kết quả chính xác và nhanh chóng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Legal Info */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container-custom max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center break-words">Thông tin pháp lý</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  Giấy phép kinh doanh
                </h3>
                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Số giấy phép:</dt>
                    <dd className="font-semibold text-gray-900">{COMPANY.businessLicense}</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Ngày cấp:</dt>
                    <dd className="font-semibold text-gray-900">{COMPANY.licenseIssueDate}</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Nơi cấp:</dt>
                    <dd className="font-semibold text-gray-900 text-right">{COMPANY.licenseIssuedBy}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
                  <Building2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  Thông tin công ty
                </h3>
                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Tên công ty:</dt>
                    <dd className="font-semibold text-gray-900 text-right">{COMPANY.shortName}</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Mã số thuế:</dt>
                    <dd className="font-semibold text-gray-900">{COMPANY.taxCode}</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100 gap-2">
                    <dt className="text-gray-600 flex-shrink-0">Hotline:</dt>
                    <dd className="font-semibold text-primary-600">{COMPANY.contact.hotline}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                Cần xác minh thông tin hoặc xem bản gốc các giấy tờ?
              </p>
              <a href="/lien-he" className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base py-3 px-6">
                <ExternalLink className="w-4 h-4" />
                Liên hệ với chúng tôi
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactWidget />
    </>
  );
}
