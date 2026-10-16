import Link from "next/link";
import FaqList from "@/components/seo/FaqList";
import JsonLd from "@/components/seo/JsonLd";
import { HOME_FAQS, SERVICE_PAGES } from "@/lib/seo";

export default function HomeFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-widest text-[#FAB406] mb-3">Questions</p>
        <h2
          id="faq-heading"
          className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.15]"
        >
          Web design agency questions, answered
        </h2>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          What we build, how we work and what to expect.
        </p>

        <div className="mt-8">
          <FaqList faqs={HOME_FAQS} />
        </div>

        <nav aria-label="QDelta services" className="mt-12">
          <h3 className="font-heading text-lg font-semibold text-white">Explore our services</h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {SERVICE_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-[#FAB406]/50 hover:text-[#FAB406]"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
