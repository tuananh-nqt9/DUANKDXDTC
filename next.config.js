/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "kdxdthanhchuong.asia" },
      { protocol: "https", hostname: "kdxdthanhchuong.vn" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "kdxdthanhchuong.vn"],
      bodySizeLimit: "100mb",
    },
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
