import { getPublishedTestParameterPdfs } from "@/lib/test-pdf-service";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import TestParametersPdfList from "./TestParametersPdfList";

export const dynamic = "force-dynamic";

export default async function TestCategoriesSection() {
  // Lấy toàn bộ tài liệu PDF công khai (hỗ trợ nhiều tài liệu)
  const documents = await getPublishedTestParameterPdfs();

  // Nếu chưa có tài liệu nào công khai
  if (!documents || documents.length === 0) {
    return (
      <section id="chi-tieu-phep-thu" className="py-20 bg-gray-50/70 border-t border-b border-gray-200">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block px-5 py-1.5 bg-red-600 text-white rounded-full font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
              PHẠM VI HOẠT ĐỘNG
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              DANH MỤC CHỈ TIÊU &amp; PHÉP THỬ
            </h2>
          </div>
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-2xl border border-gray-200 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tài liệu đang được cập nhật
            </h3>
            <p className="text-gray-600 mb-6">
              Danh mục chỉ tiêu &amp; phép thử của phòng thí nghiệm LAS-XD 795 đang được đồng bộ.
              Quý khách vui lòng quay lại sau hoặc liên hệ với chúng tôi để nhận tài liệu trực tiếp.
            </p>
            <Link href="/lien-he" className="btn-primary">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="chi-tieu-phep-thu" className="py-20 bg-gray-50/70 border-t border-b border-gray-200">
      <div className="container-custom">
        <TestParametersPdfList
          documents={documents}
          title="DANH MỤC CHỈ TIÊU & PHÉP THỬ"
          subtitle="Văn bản công bố năng lực đủ điều kiện hoạt động thí nghiệm chuyên ngành xây dựng của Phòng Thí Nghiệm LAS-XD 795"
          showCategoryHeading={true}
        />
      </div>
    </section>
  );
}
