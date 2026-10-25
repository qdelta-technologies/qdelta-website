import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4 / lightningcss uses native `.node` bindings; Turbopack must not bundle them.
  serverExternalPackages: [
    "lightningcss",
    "lightningcss-win32-x64-msvc",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],

  // Enable HTTP gzip/brotli compression for all responses
  compress: true,

  // Tree-shake lucide-react icons and motion internals — smaller JS bundles = faster parse
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },

  images: {
    // Serve modern AVIF first, WebP as fallback — 30–50% smaller than JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 7 days on Vercel edge
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

