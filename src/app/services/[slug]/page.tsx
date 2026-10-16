import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/seo/ServicePageView";
import { SERVICE_PAGES, SITE_URL, getServicePage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const url = `${SITE_URL}/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "QDelta Technologies",
      title: page.metaTitle,
      description: page.metaDescription,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServicePageView page={page} />;
}
