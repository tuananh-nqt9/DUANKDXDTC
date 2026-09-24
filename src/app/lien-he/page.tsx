"use client";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";

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

        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <Phone className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Hotline</h3>
                  <a href="tel:0939688669" className="text-primary-600 hover:underline">0939.688.669</a>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <Mail className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:Thanhchuong.jsc@gmail.com" className="text-primary-600 hover:underline">Thanhchuong.jsc@gmail.com</a>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <MapPin className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">Văn phòng</h3>
                  <p className="text-sm text-gray-700">Hà Nội, Bắc Ninh, Lạng Sơn</p>
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
      </main>
      <Footer />
    </>
  );
}

