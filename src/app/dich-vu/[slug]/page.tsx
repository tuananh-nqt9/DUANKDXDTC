import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  FlaskConical, ClipboardCheck, Mountain, HardHat, Activity, MountainSnow,
  CheckCircle,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, ClipboardCheck, Mountain, HardHat, Activity, MountainSnow,
};

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });
  if (!service) notFound();

  const IconComp = iconMap[service.icon] || FlaskConical;

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <IconComp className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom max-w-4xl">
            {service.excerpt && (
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">{service.excerpt}</p>
            )}

            {service.content && (
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            )}

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Cam kết của chúng tôi:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Phòng thí nghiệm đạt chuẩn LAS-XD 795</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Kỹ sư có chứng chỉ hành nghề</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Báo cáo nhanh chóng, chính xác</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> Giá cả cạnh tranh</li>
              </ul>
            </div>

            <div className="mt-12 text-center">
              <a href="/lien-he" className="btn-primary">Yêu cầu tư vấn miễn phí</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
