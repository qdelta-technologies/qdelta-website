import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaqList from "@/components/seo/FaqList";
import JsonLd from "@/components/seo/JsonLd";
import { SERVICE_PAGES, SITE_NAME, SITE_URL, type ServicePage } from "@/lib/seo";

export default function ServicePageView({ page }: { page: ServicePage }) {
  const url = `${SITE_URL}/services/${page.slug}`;
  const related = page.related
    .map((s) => SERVICE_PAGES.find((p) => p.slug === s))
    .filter((p): p is ServicePage => Boolean(p));

  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black flex flex-col justify-between">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: page.h1,
              serviceType: page.serviceType,
              description: page.metaDescription,
              url,
              provider: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
                { "@type": "ListItem", position: 3, name: page.label, item: url },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <Navbar />

      <main className="relative flex-1 pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[35rem] w-[50rem] rounded-full bg-gradient-to-b from-[#FAB406]/10 via-transparent to-transparent blur-[140px]" />

        <article className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-zinc-300">{page.label}</span>
          </nav>

          <header className="border-b border-white/10 pb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#FAB406] mb-4">{SITE_NAME}</p>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">{page.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#FAB406] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                All services
              </Link>
            </div>
          </header>

          <section className="mt-12" aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              What you get
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.benefits.map((b) => (
                <li key={b.title} className="rounded-2xl border border-white/10 bg-[#0e0e14]/90 p-5">
                  <h3 className="font-heading text-base sm:text-lg font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{b.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="who-heading">
            <h2 id="who-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Who this is for
            </h2>
            <ul className="mt-6 space-y-3">
              {page.forWho.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FAB406]" aria-hidden="true" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="approach-heading">
            <h2 id="approach-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              How we work
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {page.approach.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-white/10 bg-[#0e0e14]/90 p-5">
                  <span className="font-mono text-xs font-bold text-[#FAB406]">0{i + 1}</span>
                  <h3 className="mt-1 font-heading text-base sm:text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <FaqList faqs={page.faqs} />
            </div>
          </section>

          <section className="mt-12 rounded-3xl border border-[#FAB406]/30 bg-[#FAB406]/10 p-6 sm:p-8">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Ready to talk about your project?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300">
              Tell us about your business and goals. We will reply with the right approach for you.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FAB406] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>

          <nav aria-label="Related services" className="mt-12">
            <h2 className="font-heading text-lg font-semibold text-white">Related services</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/services/${r.slug}`}
                    className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-[#FAB406]/50 hover:text-[#FAB406]"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  );
}
