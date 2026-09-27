import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Facebook, Youtube, MessageCircle, ArrowRight, Clock, FileText } from "lucide-react";
import { COMPANY } from "@/lib/constants";

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

  return (
    <footer className="bg-accent-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Logo variant="full" theme="light" />
            <p className="text-sm mt-4 mb-2 text-white font-semibold">
              {COMPANY.lab.name}
            </p>
            <p className="text-xs text-gray-400 mb-1">
              GP số {COMPANY.businessLicense}
            </p>
            <p className="text-xs text-gray-400 mb-1">
              Cấp ngày {COMPANY.licenseIssueDate}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Bởi {COMPANY.licenseIssuedBy}
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3 mb-4">
              <a 
                href={COMPANY.social.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all hover:-translate-y-0.5"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all hover:-translate-y-0.5"
                title="Youtube"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-all hover:-translate-y-0.5"
                title="Chat Zalo"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* Working Hours */}
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span className="font-semibold text-white">Giờ làm việc:</span>
              </div>
              <p>{COMPANY.workingHours.weekdays}</p>
              <p>{COMPANY.workingHours.saturday}</p>
              <p>{COMPANY.workingHours.sunday}</p>
            </div>
          </div>

          {/* Quick Links */}
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
              <li className="pt-2 border-t border-gray-700">
                <Link href="/chung-chi" className="hover:text-primary-400 transition-colors inline-flex items-center gap-1 group">
                  <FileText className="w-3 h-3" />
                  Chứng chỉ & Giấy phép
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
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

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary-500 rounded" />
              LIÊN HỆ
            </h3>
            <ul className="space-y-3 text-sm">
              {COMPANY.offices.map((office) => (
                <li key={office.id} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">{office.city} ({office.type}):</strong>
                    <br />
                    <span className="text-gray-400">{office.address}</span>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-2 border-t border-gray-700">
                <Phone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">Hotline:</strong>{" "}
                  <a href={`tel:${COMPANY.contact.hotline}`} className="text-primary-400 hover:text-primary-300">
                    {COMPANY.contact.hotline}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY.contact.email}`} className="hover:text-primary-400 break-all">
                  {COMPANY.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 {COMPANY.shortName}. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link href="/chinh-sach-bao-mat" className="hover:text-primary-400 transition-colors">
              Chính sách bảo mật
            </Link>
            <span>|</span>
            <p>MST: {COMPANY.taxCode}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
