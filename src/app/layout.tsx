import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "THANH CHƯƠNG JSC - LAS XD 795 | Kiểm định Xây dựng",
    template: "%s | THANH CHƯƠNG JSC",
  },
  description:
    "Công ty CP Xây dựng Thanh Chương - Phòng thí nghiệm LAS-XD 795. Dịch vụ kiểm định, thí nghiệm vật liệu xây dựng, giám sát thi công.",
  keywords: [
    "kiểm định xây dựng",
    "thí nghiệm vật liệu",
    "LAS XD 795",
    "Thanh Chương",
    "tư vấn giám sát",
  ],
  authors: [{ name: "Thanh Chương JSC" }],
  openGraph: {
    title: "THANH CHƯƠNG JSC - LAS XD 795",
    description: "Kiểm định Xây dựng chuyên nghiệp",
    type: "website",
    locale: "vi_VN",
  },
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
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
