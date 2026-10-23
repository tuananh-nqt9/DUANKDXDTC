import Image from "next/image";
import { TopBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

// Force dynamic rendering
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  
  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  const imageUrl = post.image || "/images/logo-thanhchuong.png";
  // Make sure URL is absolute for OG tags
  const ogImageUrl = imageUrl.startsWith("http") ? imageUrl : `${COMPANY.contact.website}${imageUrl}`;

  return {
    title: `${post.title} | ${COMPANY.shortName}`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `${COMPANY.contact.website}/tin-tuc/${post.slug}`,
      siteName: COMPANY.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author || COMPANY.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [ogImageUrl],
    },
  };
}

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
        <article className="container-custom max-w-4xl py-8 sm:py-12">
          <div className="text-xs sm:text-sm text-gray-500 mb-3">
            {post.publishedAt && formatDate(post.publishedAt)} • {post.category}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 break-words leading-tight">{post.title}</h1>

          {post.image && (
            <div className="relative aspect-[16/10] sm:h-96 rounded-2xl overflow-hidden mb-6 sm:mb-8 w-full max-w-full">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {post.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-medium break-words">{post.excerpt}</p>
          )}

          <div
            className="prose prose-base sm:prose-lg max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
      <FloatingContactWidget />
    </>
  );
}

