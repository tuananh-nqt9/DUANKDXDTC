/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "kdxdthanhchuong.asia" },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000"] },
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
