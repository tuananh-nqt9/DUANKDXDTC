"use client";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { useState } from "react";
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle, Clock, Navigation } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Có lỗi xảy ra");
        setLoading(false);
        return;
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError("Không thể gửi. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Liên hệ</h1>
            <p className="text-primary-200 text-lg">Gửi yêu cầu tư vấn - Chúng tôi sẽ phản hồi trong 24h</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <Phone className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Hotline</h3>
                  <a href={`tel:${COMPANY.contact.hotline}`} className="text-primary-600 hover:underline text-lg font-semibold">
                    {COMPANY.contact.hotline.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                  </a>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <Mail className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href={`mailto:${COMPANY.contact.email}`} className="text-primary-600 hover:underline break-all">
                    {COMPANY.contact.email}
                  </a>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <Clock className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Giờ làm việc</h3>
                  <p className="text-sm text-gray-700 mb-1">{COMPANY.workingHours.weekdays}</p>
                  <p className="text-sm text-gray-700 mb-1">{COMPANY.workingHours.saturday}</p>
                  <p className="text-sm text-gray-500">{COMPANY.workingHours.sunday}</p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5">
                  <h2 className="text-2xl font-bold text-gray-900">Gửi yêu cầu tư vấn</h2>

                  {success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Gửi thành công!</strong> Chúng tôi sẽ liên hệ với bạn trong vòng 24h.
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Họ tên <span className="text-red-500">*</span></label>
                      <input name="name" required className="form-input" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="form-label">Số điện thoại <span className="text-red-500">*</span></label>
                      <input name="phone" required className="form-input" placeholder="0912..." />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email</label>
                      <input name="email" type="email" className="form-input" placeholder="email@..." />
                    </div>
                    <div>
                      <label className="form-label">Dịch vụ quan tâm</label>
                      <select name="service" className="form-input">
                        <option value="">-- Chọn --</option>
                        <option>Thí nghiệm Vật liệu XD</option>
                        <option>Kiểm định Chất lượng</option>
                        <option>Thí nghiệm Nền móng</option>
                        <option>Tư vấn Giám sát</option>
                        <option>Quan trắc Công trình</option>
                        <option>Khảo sát Địa chất</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Nội dung <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={5} className="form-input" placeholder="Mô tả yêu cầu..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Đang gửi...</>
                    ) : (
                      <>Gửi yêu cầu</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* GOOGLE MAPS - VĂN PHÒNG */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Địa chỉ văn phòng</h2>
              <p className="text-gray-600">Hệ thống văn phòng và phòng thí nghiệm của chúng tôi</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {COMPANY.offices.map((office) => (
                <div key={office.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  {/* Map */}
                  <div className="relative w-full h-80 bg-gray-100">
                    <iframe
                      src={office.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Bản đồ ${office.city}`}
                    ></iframe>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl text-gray-900">{office.city}</h3>
                          <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full font-medium">
                            {office.type}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{office.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <Phone className="w-4 h-4 text-primary-600" />
                      <a href={`tel:${office.phone}`} className="text-primary-600 hover:underline font-semibold">
                        {office.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                      </a>
                    </div>

                    <a
                      href={office.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group"
                    >
                      <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Xem chỉ đường trên Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

