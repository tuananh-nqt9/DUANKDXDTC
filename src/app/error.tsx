"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Website Error:", error);
  }, [error]);

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-12">
        <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm animate-pulse">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Đã có lỗi xảy ra!
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
          Hệ thống đang gặp một chút sự cố hoặc mất kết nối mạng. Vui lòng thử lại sau.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-5 h-5" />
            Thử lại
          </button>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            Về Trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
