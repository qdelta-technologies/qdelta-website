import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QDelta Technologies",
    short_name: "QDelta",
    description: "QDelta - Digital Solutions | Web Development",
    start_url: "/",
    display: "standalone",
    background_color: "#06070A",
    theme_color: "#06070A",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
