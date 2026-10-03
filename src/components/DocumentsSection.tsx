import { prisma } from "@/lib/prisma";
import { Download, FileText, FlaskConical, Award, CheckCircle, ClipboardList, AlertTriangle, FolderOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  FlaskConical,
  Award,
  CheckCircle,
  ClipboardList,
};

export default async function DocumentsSection() {
  const documents = await prisma.document.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (documents.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm mb-4">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary-600 rounded-full" />
              <FolderOpen className="w-4 h-4" />
              Hồ sơ năng lực
              <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary-600 rounded-full" />
            </span>
            <h2 className="section-title title-underline mt-3">Tải tài liệu</h2>
            <p className="section-subtitle mt-6">
              Hồ sơ năng lực và tài liệu giới thiệu công ty
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {documents.map((doc, idx) => {
            const IconComp = iconMap[doc.icon] || FileText;
            return (
              <ScrollReveal key={doc.id} variant="fade-up" delay={idx * 100}>
                <a
                  href={doc.pdfUrl}
                  download
                  className="group card-premium p-6 flex items-start gap-4 hover:border-primary-200 transition-all duration-300 cursor-pointer block"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-500 shadow-sm">
                    <IconComp className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md font-medium">
                        PDF • {doc.fileSize || "N/A"}
                      </span>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <Download className="w-4 h-4" />
                        <span>Tải về</span>
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Note */}
        <ScrollReveal delay={300}>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-0.5">Lưu ý khi tải tài liệu</p>
                <p className="text-amber-700">
                  Tài liệu được cung cấp miễn phí cho mục đích tham khảo. Nghiêm cấm sao chép, phân phối hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản của THANH CHƯƠNG JSC.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
