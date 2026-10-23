"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, ArrowUp, X, MessageCircle } from "lucide-react";
import { ZaloIcon } from "@/components/icons/ZaloIcon";
import { COMPANY } from "@/lib/constants";

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Backdrop overlay on mobile when expanded */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ================= NÚT CUỘN LÊN ĐẦU TRANG (BACK TO TOP) ================= */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="fixed left-3.5 md:left-auto md:right-5 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-40 w-10 h-10 md:w-11 md:h-11 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group border border-white/20"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden md:block absolute right-full mr-2.5 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
            Lên đầu trang
          </span>
        </button>
      )}

      {/* ================= CỤM NÚT LIÊN HỆ NỔI ================= */}
      <div className="fixed right-3.5 md:right-5 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 flex flex-col items-end">
        {/* Expanded Options (Slide & Fade up) */}
        <div
          className={`flex flex-col items-end gap-2.5 mb-2.5 transition-all duration-300 origin-bottom ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
              : "opacity-0 scale-90 pointer-events-none translate-y-4 md:opacity-100 md:scale-100 md:pointer-events-auto md:translate-y-0"
          }`}
        >
          {/* Option: Email */}
          <a
            href={`mailto:${COMPANY.contact.email}`}
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 bg-white text-gray-800 hover:text-red-600 px-3.5 py-2 md:p-0 md:w-11 md:h-11 rounded-full shadow-lg border border-gray-200/90 hover:border-red-400 hover:shadow-xl transition-all duration-200 active:scale-95"
            title="Gửi email"
          >
            <span className="text-xs font-semibold md:hidden whitespace-nowrap text-gray-700">
              Gửi Email
            </span>
            <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-red-600 transition-colors">
              <Mail className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="hidden md:block absolute right-full mr-2.5 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
              Gửi email: {COMPANY.contact.email}
            </span>
          </a>

          {/* Option: Zalo */}
          <a
            href={COMPANY.social.zalo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 bg-white text-gray-800 hover:text-[#0068FF] px-3.5 py-2 md:p-0 md:w-11 md:h-11 rounded-full shadow-lg border border-gray-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-200 active:scale-95"
            title="Chat Zalo"
          >
            <span className="text-xs font-semibold md:hidden whitespace-nowrap text-gray-700">
              Nhắn tin Zalo
            </span>
            <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-[#0068FF] text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0055d4] transition-colors">
              <ZaloIcon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="hidden md:block absolute right-full mr-2.5 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
              Chat Zalo
            </span>
          </a>

          {/* Option: Hotline */}
          <a
            href={`tel:${COMPANY.contact.hotline}`}
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 bg-white text-gray-800 hover:text-primary-600 px-3.5 py-2 md:p-0 md:w-11 md:h-11 rounded-full shadow-lg border border-gray-200/90 hover:border-primary-400 hover:shadow-xl transition-all duration-200 active:scale-95"
            title="Gọi ngay hotline"
          >
            <span className="text-xs font-semibold md:hidden whitespace-nowrap text-gray-700">
              Gọi {COMPANY.contact.hotline.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}
            </span>
            <div className="w-8 h-8 md:w-11 md:h-11 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-primary-700 transition-colors">
              <Phone className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="hidden md:block absolute right-full mr-2.5 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-md">
              Hotline: {COMPANY.contact.hotline}
            </span>
          </a>
        </div>

        {/* ================= NÚT TRIGGER CHÍNH (Mobile FAB / Desktop Indicator) ================= */}
        {/* On Mobile: Click to toggle open/close */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
          className="md:hidden relative w-12 h-12 rounded-full bg-gradient-to-tr from-primary-700 via-primary-600 to-red-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90 border border-white/20"
        >
          {/* Pulsing ring when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-25" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </>
          )}

          {isOpen ? (
            <X className="w-6 h-6 rotate-0 transition-transform duration-300" />
          ) : (
            <Phone className="w-5 h-5 animate-bounce-subtle" />
          )}
        </button>
      </div>
    </>
  );
}
