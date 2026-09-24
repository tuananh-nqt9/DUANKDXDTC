import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { MapPin, Calendar } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Dự án</h1>
            <p className="text-primary-200 text-lg">Các dự án tiêu biểu đã thực hiện</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card group">
                  <div className="relative h-56 overflow-hidden">
                    {project.image && (
                      <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                    {project.excerpt && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.excerpt}</p>}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{project.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

