import type { MetadataRoute } from "next";
import { SERVICE_PAGES, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...SERVICE_PAGES.map((p) => ({
      url: `${SITE_URL}/services/${p.slug}`,
      lastModified, changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
