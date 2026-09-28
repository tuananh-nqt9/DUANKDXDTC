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
    <footer className="bg-gradient-to-br from-accent-900 via-accent-800 to-accent-900 text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="group">
              <Logo variant="full" theme="light" />
            </div>
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
            
            {/* Social Media with enhanced hover */}
            <div className="flex items-center gap-3 mb-4">
              <a 
                href={COMPANY.social.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-red group"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href={COMPANY.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                title="Youtube"
              >
                <Youtube className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href={COMPANY.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-cyan group"
                title="Chat Zalo"
              >
                <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>

            {/* Working Hours with icon */}
            <div className="text-xs text-gray-400 space-y-2 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary-400" />
                <span className="font-semibold text-white">Giờ làm việc:</span>
              </div>
              <p className="pl-6">{COMPANY.workingHours.weekdays}</p>
              <p className="pl-6">{COMPANY.workingHours.saturday}</p>
              <p className="pl-6">{COMPANY.workingHours.sunday}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
              LIÊN KẾT NHANH
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-all duration-300 inline-flex items-center gap-2 group hover:translate-x-1">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary-400" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-3 mt-3 border-t border-gray-700/50">
                <Link href="/chung-chi" className="hover:text-primary-400 transition-all duration-300 inline-flex items-center gap-2 group hover:translate-x-1">
                  <FileText className="w-3 h-3 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">
                    Chứng chỉ & Giấy phép
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
              NGÀNH NGHỀ
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-all duration-300 inline-flex items-center gap-2 group hover:translate-x-1">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary-400" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
              LIÊN HỆ
            </h3>
            <ul className="space-y-4 text-sm">
              {COMPANY.offices.map((office) => (
                <li key={office.id} className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span>
                    <strong className="text-white group-hover:text-primary-300 transition-colors duration-300">{office.city} ({office.type}):</strong>
                    <br />
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{office.address}</span>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-3 pt-4 border-t border-gray-700/50 group">
                <Phone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span>
                  <strong className="text-white">Hotline:</strong>{" "}
                  <a href={`tel:${COMPANY.contact.hotline}`} className="text-primary-400 hover:text-primary-300 transition-colors duration-300 font-semibold">
                    {COMPANY.contact.hotline}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <a href={`mailto:${COMPANY.contact.email}`} className="hover:text-primary-400 transition-colors duration-300 break-all">
                  {COMPANY.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with gradient border */}
      <div className="border-t border-gradient-to-r from-transparent via-gray-700 to-transparent relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
        
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 relative z-10">
          <p className="flex items-center gap-2">
            © 2026 {COMPANY.shortName}. 
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="text-gray-500">All rights reserved.</span>
          </p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <Link href="/chinh-sach-bao-mat" className="hover:text-primary-400 transition-all duration-300 relative group">
              <span className="relative">
                Chính sách bảo mật
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400 group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
            <span className="text-gray-700">|</span>
            <p className="flex items-center gap-1.5">
              <span className="text-gray-500">MST:</span>
              <span className="font-semibold text-gray-300">{COMPANY.taxCode}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
