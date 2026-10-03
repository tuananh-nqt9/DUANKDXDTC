import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container-custom max-w-5xl">
          {/* Top navigation & info */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <Link href="/#tai-lieu" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-4 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Quay lại trang chủ
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary-600 flex-shrink-0" />
                {document.title}
              </h1>
              {document.description && (
                <p className="text-gray-600 mt-3">{document.description}</p>
              )}
            </div>
            
            <a 
              href={document.pdfUrl} 
              download
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/20 transition-all duration-300 hover:-translate-y-1 flex-shrink-0"
            >
              <Download className="w-5 h-5" />
              Tải về máy {document.fileSize && `(${document.fileSize})`}
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[85vh] min-h-[600px] w-full relative">
            <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                <Eye className="w-4 h-4 text-gray-500" />
                Chế độ xem trước tài liệu
              </div>
            </div>
            <iframe
              src={document.pdfUrl}
              className="w-full h-[calc(100%-45px)] border-0"
              title={document.title}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
