/**
 * Robots.txt Generator
 * Hướng dẫn các bot tìm kiếm
 */

import { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = COMPANY.contact.website || "https://kdxdthanhchuong.vn";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
