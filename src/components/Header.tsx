"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-accent-900 via-accent-800 to-accent-900 text-white text-sm py-2.5 hidden md:block border-b border-white/10">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 group">
            <MapPin className="w-4 h-4 text-primary-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:text-primary-300 transition-colors duration-300">
              Xóm Lai, thôn Phù Dực 1, xã Phù Đổng, thành phố Hà Nội
            </span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:09396886699" className="flex items-center gap-2 hover:text-primary-400 transition-all duration-300 group">
            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Hotline: <strong className="text-primary-300 group-hover:text-secondary-300">0939.688.669</strong>
          </a>
          <a href="mailto:Thanhchuong.jsc@gmail.com" className="flex items-center gap-2 hover:text-primary-400 transition-all duration-300 group">
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:text-primary-300">Thanhchuong.jsc@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/dich-vu", label: "Ngành nghề" },
    { href: "/du-an", label: "Dự án" },
    { href: "/tin-tuc", label: "Tin tức" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200" 
          : "bg-white shadow-md border-b-2 border-primary-600"
      }`}
    >
      <div className="container-custom">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex-shrink-0 group">
            <div className="group-hover:scale-105 transition-transform duration-300">
              <Logo variant="full" theme="dark" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/lien-he" className="btn-primary !py-2 !px-5 text-sm group">
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              Tư vấn ngay
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-all duration-300 hover:bg-primary-50 rounded-lg active:scale-95"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-gray-200 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 rounded-lg font-medium transition-all duration-300 animate-slide-in-left stagger-${idx + 1}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link href="/lien-he" className="btn-primary w-full !py-3 text-sm" onClick={() => setMobileOpen(false)}>
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
