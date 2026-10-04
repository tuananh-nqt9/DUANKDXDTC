import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12">
              <Image 
                src="/images/logo-thanhchuong.png" 
                alt="Loading" 
                fill 
                className="object-contain opacity-70"
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Đang tải dữ liệu...</h2>
        <p className="text-gray-500 text-sm">Vui lòng đợi trong giây lát</p>
      </main>
      <Footer />
    </>
  );
}
