import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Chính sách bảo mật",
  description: `Chính sách bảo mật thông tin khách hàng tại ${COMPANY.shortName}`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-secondary-400" />
              <span className="inline-block bg-primary-700/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                Privacy Policy
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Chính sách bảo mật</h1>
            <p className="text-primary-200 text-lg">
              Cam kết bảo vệ thông tin cá nhân của khách hàng
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            
            {/* Introduction */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-blue-900 mb-2">Cam kết của chúng tôi</h2>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {COMPANY.shortName} cam kết bảo vệ thông tin cá nhân của khách hàng. 
                    Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              
              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">1. Thông tin chúng tôi thu thập</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Chúng tôi có thể thu thập các thông tin sau khi bạn sử dụng dịch vụ:</p>
                  <ul className="space-y-2">
                    <li><strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại, email, địa chỉ</li>
                    <li><strong>Thông tin công việc:</strong> Tên công ty, chức vụ, lĩnh vực hoạt động</li>
                    <li><strong>Thông tin dự án:</strong> Chi tiết về công trình, yêu cầu dịch vụ</li>
                    <li><strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, trình duyệt, thời gian truy cập</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">2. Cách chúng tôi sử dụng thông tin</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Thông tin của bạn được sử dụng cho các mục đích sau:</p>
                  <ul className="space-y-2">
                    <li>Cung cấp dịch vụ tư vấn, thí nghiệm, kiểm định xây dựng</li>
                    <li>Liên hệ và gửi thông tin về dự án, báo giá</li>
                    <li>Gửi thông báo, cập nhật dịch vụ mới</li>
                    <li>Cải thiện chất lượng dịch vụ và website</li>
                    <li>Tuân thủ các quy định pháp luật</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">3. Bảo vệ thông tin</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin của bạn:</p>
                  <ul className="space-y-2">
                    <li>Mã hóa dữ liệu khi truyền tải (SSL/TLS)</li>
                    <li>Hệ thống bảo mật máy chủ đạt chuẩn</li>
                    <li>Giới hạn quyền truy cập thông tin</li>
                    <li>Đào tạo nhân viên về bảo mật thông tin</li>
                    <li>Sao lưu dữ liệu định kỳ</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">4. Chia sẻ thông tin</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Chúng tôi <strong>KHÔNG</strong> bán hoặc cho thuê thông tin cá nhân của bạn.</p>
                  <p>Thông tin chỉ được chia sẻ trong các trường hợp sau:</p>
                  <ul className="space-y-2">
                    <li>Với sự đồng ý của bạn</li>
                    <li>Với đối tác cung cấp dịch vụ (vận chuyển mẫu, phân tích...)</li>
                    <li>Theo yêu cầu của cơ quan có thẩm quyền</li>
                    <li>Bảo vệ quyền lợi hợp pháp của công ty</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">5. Quyền của bạn</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Bạn có các quyền sau đối với thông tin cá nhân:</p>
                  <ul className="space-y-2">
                    <li><strong>Quyền truy cập:</strong> Yêu cầu xem thông tin chúng tôi lưu trữ</li>
                    <li><strong>Quyền sửa đổi:</strong> Cập nhật, chỉnh sửa thông tin không chính xác</li>
                    <li><strong>Quyền xóa:</strong> Yêu cầu xóa thông tin cá nhân</li>
                    <li><strong>Quyền từ chối:</strong> Không nhận email marketing</li>
                    <li><strong>Quyền khiếu nại:</strong> Khiếu nại về việc xử lý dữ liệu</li>
                  </ul>
                  <p className="mt-4">
                    Để thực hiện các quyền trên, vui lòng liên hệ: <br />
                    <strong>Email:</strong> {COMPANY.contact.email}<br />
                    <strong>Hotline:</strong> {COMPANY.contact.hotline}
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">6. Cookie và công nghệ theo dõi</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>Website sử dụng cookie để cải thiện trải nghiệm người dùng:</p>
                  <ul className="space-y-2">
                    <li><strong>Cookie cần thiết:</strong> Đảm bảo website hoạt động bình thường</li>
                    <li><strong>Cookie phân tích:</strong> Hiểu cách người dùng sử dụng website</li>
                    <li><strong>Cookie marketing:</strong> Hiển thị quảng cáo phù hợp (nếu có)</li>
                  </ul>
                  <p>Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng có thể ảnh hưởng đến trải nghiệm.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">7. Thay đổi chính sách</h2>
                </div>
                <div className="ml-13 space-y-4 text-gray-700">
                  <p>
                    Chúng tôi có thể cập nhật chính sách này theo thời gian. 
                    Mọi thay đổi sẽ được thông báo trên website và có hiệu lực ngay khi đăng tải.
                  </p>
                  <p>
                    <strong>Ngày cập nhật gần nhất:</strong> 27/09/2026
                  </p>
                </div>
              </div>

            </div>

            {/* Contact Box */}
            <div className="mt-12 bg-gradient-to-br from-primary-900 to-primary-800 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Cần hỗ trợ?</h3>
              <p className="text-primary-100 mb-6">
                Nếu bạn có câu hỏi về chính sách bảo mật hoặc cách chúng tôi xử lý thông tin, 
                vui lòng liên hệ với chúng tôi:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Email:</p>
                  <a href={`mailto:${COMPANY.contact.email}`} className="text-secondary-400 hover:text-secondary-300">
                    {COMPANY.contact.email}
                  </a>
                </div>
                <div>
                  <p className="font-semibold mb-1">Hotline:</p>
                  <a href={`tel:${COMPANY.contact.hotline}`} className="text-secondary-400 hover:text-secondary-300">
                    {COMPANY.contact.hotline}
                  </a>
                </div>
                <div>
                  <p className="font-semibold mb-1">Địa chỉ:</p>
                  <p className="text-primary-100">{COMPANY.offices[0].address}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Giờ làm việc:</p>
                  <p className="text-primary-100">{COMPANY.workingHours.weekdays}</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
