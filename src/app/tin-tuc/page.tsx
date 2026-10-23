import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import { formatDate } from "@/lib/utils";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-12 sm:py-16">
          <div className="container-custom">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 break-words">Tin tức</h1>
            <p className="text-primary-200 text-base sm:text-lg">Cập nhật tin tức và kiến thức mới nhất</p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
              {posts.map((post) => (
                <article key={post.id} className="card group w-full min-w-0 max-w-full">
                  <div className="relative aspect-[16/10] sm:h-48 w-full overflow-hidden">
                    {post.image && (
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="text-xs text-gray-500 mb-2">
                      {post.publishedAt && formatDate(post.publishedAt)}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors break-words text-base sm:text-lg">
                      <a href={`/tin-tuc/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContactWidget />
    </>
  );
}

