"use client";

import React from "react";
import { motion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "QDelta helped us present our business in a much more professional way. The website feels clearer, stronger and more aligned with the kind of clients we want to attract.",
    name: "Jessica Jacobsen",
    role: "Business Consultant",
  },
  {
    id: "t2",
    quote:
      "We needed more than a good-looking website — we needed something that actually built trust. QDelta delivered an experience that felt thoughtful, modern and business-focused.",
    name: "Jamie Monica",
    role: "Brand Founder",
  },
  {
    id: "t3",
    quote:
      "The final website gave our brand a stronger digital presence and made our offer easier to understand. The overall quality felt premium from start to finish.",
    name: "Daniel Thomas",
    role: "Creative Business Owner",
  },
  {
    id: "t4",
    quote:
      "Working with QDelta was a breath of fresh air. They took the time to understand our goals and delivered a website that our customers genuinely compliment.",
    name: "Marcus Sterling",
    role: "Tech Co-Founder",
  },
  {
    id: "t5",
    quote:
      "From strategic positioning to visual execution, QDelta delivered beyond our expectations. Our conversion rate and client inquiries noticeably increased after launch.",
    name: "Elena Rostova",
    role: "Product Director",
  },
  {
    id: "t6",
    quote:
      "The attention to detail and typographic discipline set QDelta apart. The new platform communicates our enterprise value proposition with complete clarity.",
    name: "David Vance",
    role: "Managing Partner",
  },
];

// Row 2 uses a staggered order so both rows feel different
const ROW2 = [
  TESTIMONIALS[3],
  TESTIMONIALS[0],
  TESTIMONIALS[5],
  TESTIMONIALS[1],
  TESTIMONIALS[4],
  TESTIMONIALS[2],
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-[#06070A]" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article
      className="group relative flex w-[300px] sm:w-[360px] shrink-0 flex-col overflow-hidden rounded-xl border border-[#C9981E]/60
        bg-gradient-to-b from-[#EEC832] via-[#E5B528] to-[#D4A322]
        p-4 sm:p-5
        shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]
        transition-all duration-300
        hover:border-[#C9981E]
        hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),0_0_24px_-6px_rgba(229,181,40,0.45)]"
    >
      {/* Top highlight hairline */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#06070A]/20 to-transparent" aria-hidden />

      {/* Stars */}
      <div className="mb-2.5">
        <Stars />
      </div>

      {/* Quote */}
      <p className="font-epilogue text-[12px] sm:text-[12.5px] leading-relaxed text-[#06070A]/75 font-normal mb-3">
        {t.quote}
      </p>

      {/* Author — inline row */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-[#06070A]/15">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#06070A]/25 bg-[#06070A]/10 font-epilogue text-[9px] font-bold text-[#06070A]"
          aria-hidden
        >
          {getInitials(t.name)}
        </div>
        <div className="min-w-0">
          <p className="font-excon text-[12px] font-bold text-[#06070A] leading-tight truncate">{t.name}</p>
          <p className="font-epilogue text-[10px] text-[#06070A]/60 truncate">{t.role}</p>
        </div>
      </div>

      {/* Hover sheen */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-full blur-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.2]"
        style={{ background: "#FFFFFF" }}
        aria-hidden
      />
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: TestimonialItem[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee-continuous"}`}>
        {/* Set A */}
        <div className="flex gap-4 shrink-0">
          {items.map((t) => (
            <TestimonialCard key={`a-${t.id}`} t={t} />
          ))}
        </div>
        {/* Set B — duplicate for seamless loop */}
        <div className="flex gap-4 shrink-0" aria-hidden>
          {items.map((t) => (
            <TestimonialCard key={`b-${t.id}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 text-white selection:bg-[#E5B528] selection:text-[#06070A] sm:py-20 md:py-24"
    >
      {/* Top edge accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#E5B528]/55 to-transparent"
        aria-hidden
      />

      <SectionAtmosphere variant="dual" particleCount={28} gridOpacity={0.15} />

      {/* ─── Section Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 select-none">
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]/75">
              Testimonials
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[40px] lg:text-[44px] font-bold tracking-tight text-white leading-[1.1]">
            Inspiring Client Experiences
          </h2>
          <p className="mt-3 font-epilogue text-sm sm:text-base text-zinc-400 max-w-lg">
            Trusted by businesses that wanted more than just a website.
          </p>
        </div>
      </motion.div>

      {/* ─── Dual Marquee ─── */}
      <div className="relative z-10 flex flex-col gap-4" aria-label="Client testimonials">

        {/* Row 1 — scrolls left */}
        <MarqueeRow items={TESTIMONIALS} />

        {/* Row 2 — scrolls right (staggered card order) */}
        <MarqueeRow items={ROW2} reverse />
      </div>
    </section>
  );
}
