import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FlaskConical, ArrowRight, TestTube, Wrench } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestCategoriesSection() {
  const categories = await prisma.testCategory.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { tests: true },
      },
    },
    orderBy: { order: "asc" },
    take: 6,
  });

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-primary-600" />
            <TestTube className="w-4 h-4" />
            Năng lực thí nghiệm
            <span className="w-8 h-0.5 bg-primary-600" />
          </span>
          <h2 className="section-title mt-3">DANH MỤC CHỈ TIÊU PHÉP THỬ</h2>
          <p className="section-subtitle">
            Cung cấp đầy đủ các dịch vụ thí nghiệm theo tiêu chuẩn quốc tế
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary-600 font-semibold">
                      {category._count.tests} phép thử
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/chi-tieu-phep-thu"
            className="btn-primary inline-flex items-center gap-2"
          >
            Xem tất cả phép thử <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
