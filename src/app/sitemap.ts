import type { MetadataRoute } from "next";
import { SERVICE_PAGES, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICE_PAGES.map((p) => ({
      url: `${SITE_URL}/services/${p.slug}`,
      lastModified, changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
