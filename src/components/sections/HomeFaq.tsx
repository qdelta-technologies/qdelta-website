import FaqList from "@/components/seo/FaqList";
import JsonLd from "@/components/seo/JsonLd";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import { HOME_FAQS } from "@/lib/seo";

export default function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-14 sm:py-20 md:py-24 text-white selection:bg-[#FAB406] selection:text-[#06070A]"
    >
      <SectionAtmosphere variant="center" gridOpacity={0.15} />

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

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 max-w-2xl">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-white leading-[1.12]"
          >
            FAQs
          </h2>
          <p className="mt-3.5 text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed text-balance">
            What we build, how we work and what to expect.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="w-full">
          <FaqList faqs={HOME_FAQS} />
        </div>
      </div>
    </section>
  );
}
