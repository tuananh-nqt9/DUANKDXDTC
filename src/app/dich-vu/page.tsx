import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import {
  FlaskConical, ClipboardCheck, Mountain, HardHat, Activity, MountainSnow,
  ArrowRight, CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-12 sm:py-16">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 break-words">Ngành nghề - Dịch vụ</h1>
            <p className="text-primary-200 text-base sm:text-lg">Các dịch vụ tư vấn xây dựng chuyên nghiệp</p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
              {services.map((service) => {
                const IconComp = iconMap[service.icon] || FlaskConical;
                return (
                  <div key={service.id} className="card overflow-hidden group w-full min-w-0 max-w-full flex flex-col h-full">
                    {service.image ? (
                      <div className="relative aspect-[16/10] sm:h-48 w-full overflow-hidden bg-gray-900">
                        <Image 
                          src={service.image} 
                          alt={service.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-44 sm:h-48 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                        <IconComp className="w-14 h-14 sm:w-16 sm:h-16 text-primary-600" />
                      </div>
                    )}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{service.title}</h3>
                        <p className="text-gray-600 mb-4 text-xs sm:text-sm line-clamp-3 leading-relaxed">{service.excerpt}</p>
                        <ul className="space-y-1.5 mb-4 text-xs sm:text-sm text-gray-600">
                          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Đạt chuẩn quốc gia</li>
                          <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Đội ngũ chuyên gia</li>
                        </ul>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-auto">
                        <Link href={`/dich-vu/${service.slug}`} className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                          Chi tiết <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactWidget />
    </>
  );
}

