import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-8">
            {/* Spinning Rings */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-100 shadow-inner" />
            <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" style={{ animationDuration: '1.5s' }} />
            <div className="absolute inset-2 rounded-full border-4 border-secondary-400 border-b-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            
            {/* Logo Center */}
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full m-4 shadow-glass">
              <div className="relative w-14 h-14 animate-pulse-soft">
                <Image 
                  src="/images/logo-thanhchuong.png" 
                  alt="Loading" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading tracking-tight">Đang tải dữ liệu...</h2>
          <p className="text-gray-500 font-medium animate-pulse">Vui lòng đợi trong giây lát</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
