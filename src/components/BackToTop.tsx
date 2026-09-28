/**
 * Back to Top Button Component
 * Nút cuộn lên đầu trang
 */

'use client';

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 md:w-16 md:h-16 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group animate-fade-in"
          style={{ animationDelay: "0.3s" }}
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-y-1 transition-transform duration-300" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Lên đầu trang
          </span>
        </button>
      )}
    </>
  );
}
