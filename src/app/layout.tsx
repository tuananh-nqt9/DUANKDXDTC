import type { Metadata } from "next";
import "./globals.css";
import { SEO, COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: COMPANY.shortName }],
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.description,
    type: "website",
    locale: "vi_VN",
    url: COMPANY.contact.website,
    siteName: COMPANY.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(COMPANY.contact.website || "https://kdxdthanhchuong.vn"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: COMPANY.name,
              alternateName: COMPANY.shortName,
              url: COMPANY.contact.website,
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
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
