import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <SearchX className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Oops! Trang bạn tìm không tồn tại
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Liên kết có thể đã bị hỏng, trang đã bị xóa, hoặc bạn đã nhập sai địa chỉ URL.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all duration-300 hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay về Trang chủ
        </Link>
      </main>
      <Footer />
    </>
  );
}
