/**
 * Sitemap Generator
 * Tạo sitemap.xml cho SEO
 */

import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = COMPANY.contact.website || "https://kdxdthanhchuong.vn";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/du-an`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chung-chi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/chinh-sach-bao-mat`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  try {
    // Dynamic pages
    const [services, projects, posts] = await Promise.all([
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const servicePages = services.map((service) => ({
      url: `${baseUrl}/dich-vu/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const projectPages = projects.map((project) => ({
      url: `${baseUrl}/du-an/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const postPages = posts.map((post) => ({
      url: `${baseUrl}/tin-tuc/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...servicePages, ...projectPages, ...postPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages only if database is unavailable
    return staticPages;
  }
}
