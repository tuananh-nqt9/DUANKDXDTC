import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Facebook, Youtube, MessageCircle, ArrowRight } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/dich-vu", label: "Ngành nghề" },
    { href: "/du-an", label: "Dự án" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  const services = [
    { href: "/dich-vu/thi-nghiem-vat-lieu", label: "Thí nghiệm vật liệu XD" },
    { href: "/dich-vu/kiem-dinh-chat-luong", label: "Kiểm định chất lượng" },
    { href: "/dich-vu/thi-nghiem-nen-mong", label: "Thí nghiệm nền móng" },
    { href: "/dich-vu/tu-van-giam-sat", label: "Tư vấn giám sát" },
    { href: "/dich-vu/quan-trac-cong-trinh", label: "Quan trắc công trình" },
    { href: "/dich-vu/khao-sat-dia-chat", label: "Khảo sát địa chất" },
  ];

  const offices = [
    { city: "Hà Nội", address: "Xóm Lai, thôn Phù Dực 1, Xã Phù Đổng" },
    { city: "Bắc Ninh", address: "Số 508 Nguyễn Văn Cừ, P. Võ Cường" },
    { city: "Lạng Sơn", address: "Khối Mai Thành, P. Đông Kinh" },
  ];

  return (
    <footer className="bg-accent-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo variant="full" theme="light" />
            <p className="text-sm mt-4 mb-2">
              Phòng Thí Nghiệm LAS XD 795
            </p>
            <p className="text-xs text-gray-400 mb-4">
              GP số 0106763717 do Sở KH&ĐT Hà Nội cấp ngày 29/01/2015
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all hover:-translate-y-0.5">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:-translate-y-0.5">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-all hover:-translate-y-0.5">
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-500 rounded" />
              LIÊN KẾT NHANH
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-500 rounded" />
              NGÀNH NGHỀ
            </h3>
            <ul className="space-y-2 text-sm">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-500 rounded" />
              LIÊN HỆ
            </h3>
            <ul className="space-y-3 text-sm">
              {offices.map((office) => (
                <li key={office.city} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">{office.city}:</strong> {office.address}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-2 border-t border-gray-700">
                <Phone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Hotline:</strong>{" "}
                  <a href="tel:0939688669" className="text-primary-400 hover:text-primary-300">
                    0939.688.669
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <a href="mailto:Thanhchuong.jsc@gmail.com" className="hover:text-primary-400 break-all">
                  Thanhchuong.jsc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 THANH CHƯƠNG JSC. All rights reserved.</p>
          <p>Designed & Developed by Thanh Chương Team</p>
        </div>
      </div>
    </footer>
  );
}
