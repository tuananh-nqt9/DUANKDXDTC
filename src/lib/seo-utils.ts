/**
 * SEO & Metadata Utilities
 * Tạo metadata cho SEO tốt hơn
 */

import { Metadata } from "next";
import { COMPANY, SEO } from "./constants";

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate page metadata
 */
export function generatePageMetadata(options: GenerateMetadataOptions): Metadata {
  const {
    title,
    description = SEO.description,
    keywords = SEO.keywords,
    image = SEO.ogImage,
    url = COMPANY.contact.website,
    type = "website",
    author,
    publishedTime,
    modifiedTime,
  } = options;

  const fullTitle = title === COMPANY.shortName ? title : `${title} | ${COMPANY.shortName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : [{ name: COMPANY.shortName }],
    
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: COMPANY.shortName,
      images: [
        {
          url: image.startsWith("http") ? image : `${COMPANY.contact.website}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "vi_VN",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author || COMPANY.shortName],
      }),
    },
    
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${COMPANY.contact.website}${image}`],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    alternateName: COMPANY.shortName,
    url: COMPANY.contact.website,
    logo: `${COMPANY.contact.website}/logo.png`,
    description: SEO.description,
    email: COMPANY.contact.email,
    telephone: COMPANY.contact.hotline,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.offices[0].address,
      addressLocality: COMPANY.offices[0].city,
      addressCountry: "VN",
    },
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.youtube,
      COMPANY.social.zalo,
    ].filter(Boolean),
  };
}

/**
 * Generate Breadcrumb JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${COMPANY.contact.website}${item.url}`,
    })),
  };
}

/**
 * Generate Article JSON-LD
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.shortName,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY.contact.website}/logo.png`,
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

/**
 * Generate Service JSON-LD
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY.shortName,
    },
    url: service.url,
  };
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
