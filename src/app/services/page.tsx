import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICE_PAGES, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Services - AI-Powered Web Design, Development & Automation",
  description:
    "QDelta Technologies services: high-converting landing pages, premium websites, e-commerce stores, web apps, AI chatbots and business automation — powered by AI and built for growth.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services`,
    siteName: "QDelta Technologies",
    title: "Our Services | QDelta - AI Solutions Company",
    description:
      "High-converting landing pages, premium websites, e-commerce, web apps, AI chatbots and business automation.",
    locale: "en_US",
  },
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black flex flex-col justify-between">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              ],
            },
            {
              "@type": "ItemList",
              itemListElement: SERVICE_PAGES.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.label,
                url: `${SITE_URL}/services/${p.slug}`,
              })),
            },
          ],
        }}
      />
      <Navbar />
      <main className="relative flex-1 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[#FAB406] mb-4">QDelta Technologies</p>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            Our Services
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            We combine AI, design and technology to build high-converting landing pages, premium websites, online stores,
            web apps, AI chatbots and business automations. Pick what you need, or tell us your goal and we&apos;ll recommend the right approach.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {SERVICE_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0e0e14]/90 p-6 transition-colors hover:border-[#FAB406]/40"
                >
                  <h2 className="font-heading text-lg font-semibold text-white">{p.label}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-300">{p.lead}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FAB406]">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
