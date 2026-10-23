import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { Download, FileText, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DocumentPreviewPage({ params }: { params: { id: string } }) {
  const document = await prisma.document.findUnique({ where: { id: params.id } });
  
  if (!document) {
    notFound();
  }

  return (
    <>
      <TopBar />
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8 sm:py-12">
        <div className="container-custom max-w-5xl">
          {/* Top navigation & info */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 w-full min-w-0">
            <div className="min-w-0">
              <Link href="/#tai-lieu" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-3 sm:mb-4 text-xs sm:text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Quay lại trang chủ
              </Link>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-start gap-2.5 sm:gap-3 break-words">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="break-words min-w-0">{document.title}</span>
              </h1>
              {document.description && (
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 break-words leading-relaxed">{document.description}</p>
              )}
            </div>
            
            <a 
              href={document.pdfUrl} 
              download
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all duration-300 hover:-translate-y-1 flex-shrink-0 text-sm sm:text-base w-full sm:w-auto"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Tải về máy {document.fileSize && `(${document.fileSize})`}
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[70vh] sm:h-[80vh] md:h-[85vh] min-h-[450px] sm:min-h-[600px] w-full max-w-full relative">
            <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 font-medium text-xs sm:text-sm">
                <Eye className="w-4 h-4 text-gray-500" />
                Chế độ xem trước tài liệu
              </div>
            </div>
            <iframe
              src={document.pdfUrl}
              className="w-full h-[calc(100%-45px)] border-0"
              style={{ minWidth: "100%", width: "1px" }}
              title={document.title}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingContactWidget />
    </>
  );
}

