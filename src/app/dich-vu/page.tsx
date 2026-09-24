import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import {
  FlaskConical, ClipboardCheck, Mountain, HardHat, Activity, MountainSnow,
  ArrowRight, CheckCircle,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical, ClipboardCheck, Mountain, HardHat, Activity, MountainSnow,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Ngành nghề - Dịch vụ</h1>
            <p className="text-primary-200 text-lg">Các dịch vụ tư vấn xây dựng chuyên nghiệp</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComp = iconMap[service.icon] || FlaskConical;
                return (
                  <div key={service.id} className="card p-6 group">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                      <IconComp className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{service.excerpt}</p>
                    <ul className="space-y-1 mb-4 text-sm text-gray-600">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Đạt chuẩn quốc gia</li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5" /> Đội ngũ chuyên gia</li>
                    </ul>
                    <Link href={`/dich-vu/${service.slug}`} className="text-primary-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      Chi tiết <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

