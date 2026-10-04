import Link from "next/link";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[75vh] flex flex-col items-center justify-center bg-white relative overflow-hidden text-center px-4">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-glass transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <SearchX className="w-14 h-14" />
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 mb-6 tracking-tighter drop-shadow-sm">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
            Oops! Trang bạn tìm không tồn tại
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            Liên kết có thể đã bị hỏng, trang đã bị xóa, hoặc bạn đã nhập sai địa chỉ URL. Đừng lo, hãy quay lại trang chủ để tiếp tục khám phá!
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg shadow-primary-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Quay về Trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
