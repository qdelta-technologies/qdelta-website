import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind v4 / lightningcss uses native `.node` bindings; Turbopack must not bundle them.
  serverExternalPackages: [
    "lightningcss",
    "lightningcss-win32-x64-msvc",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

