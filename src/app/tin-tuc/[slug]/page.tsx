import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) notFound();

  // Tăng view
  await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1">
        <article className="container-custom max-w-4xl py-12">
          <div className="text-sm text-gray-500 mb-3">
            {post.publishedAt && formatDate(post.publishedAt)} • {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

          {post.image && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {post.excerpt && (
            <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">{post.excerpt}</p>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
