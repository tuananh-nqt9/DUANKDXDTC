"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  return (
    <div className="bg-accent-900 text-white text-sm py-2 hidden md:block">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-400" />
            Xóm Lai, thôn Phù Dực 1, Xã Phù Đổng, TP. Hà Nội
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:0939688669" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Phone className="w-4 h-4" />
            Hotline: <strong className="text-primary-300">0939.688.669</strong>
          </a>
          <a href="mailto:Thanhchuong.jsc@gmail.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Mail className="w-4 h-4" />
            Thanhchuong.jsc@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/dich-vu", label: "Ngành nghề" },
    { href: "/du-an", label: "Dự án" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40 border-b-2 border-primary-600">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Logo variant="full" theme="dark" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/lien-he" className="btn-primary !py-2 !px-5 text-sm">
              <Phone className="w-4 h-4" />
              Tư vấn ngay
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link href="/lien-he" className="btn-primary w-full !py-2 text-sm">
                <Phone className="w-4 h-4" />
                Tư vấn ngay
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
