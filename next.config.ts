import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/demoussage-toiture/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/annuaire/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
