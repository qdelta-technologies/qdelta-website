"use client";

import React from "react";
import { motion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "gsa",
    quote:
      "QDelta handled our website with true professionalism. It captures our brand identity as a dedicated safety engineering academy and feels like a massive upgrade from our old site. Our students and corporate partners find it so much easier to navigate.",
    name: "Global Safety Academy",
    role: "Safety Engineering & Training, Nalgonda",
  },
  {
    id: "wts-nova",
    quote:
      "As a social media agency, our standards for digital presentation are high. QDelta built us a clean, interactive website that doesn’t just look incredible — it actually helped us set up structured systems for our client inquiries and onboarding.",
    name: "WTS Nova",
    role: "Social Media & Growth Agency",
  },
  {
    id: "british-connects",
    quote:
      "QDelta developed our website with incredible neatness and attention to detail. The whole browsing experience is smooth, student inquiries have become effortless, and their consultative approach made the entire process easy from day one.",
    name: "British Connects",
    role: "Study Abroad & Education Consultancy",
  },
  {
    id: "sln-transportation",
    quote:
      "QDelta built a beautiful, dependable website for our school transportation service in Chicago. They understood our exact requirements, delivered seamless and fast turnarounds, and the team’s communication was always prompt and helpful.",
    name: "SLN Transportation LLC",
    role: "Student Transportation Services, Chicago, USA",
  },
  {
    id: "pretty-good-pdf",
    quote:
      "The QDelta team engineered our PDF web app to run neat, fast, and completely smooth in the browser. Their post-launch support has been top-tier, and they even guided us in building custom internal tools to manage our daily workflows.",
    name: "Pretty Good PDF",
    role: "Web Application & Productivity Tools",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3 fill-[#15803D]" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article
      className="relative flex w-[220px] sm:w-[360px] lg:w-[410px] xl:w-[430px] shrink-0 flex-col overflow-hidden rounded-xl border border-[#D49802]/60 sm:border-[#D49802]/80
        bg-gradient-to-b from-[#FAB406]/95 via-[#FAB406]/90 to-[#FAB406]/82
        backdrop-blur-md sm:backdrop-blur-lg
        p-3.5 sm:p-5 lg:p-6
        shadow-[0_10px_30px_-6px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_1px_rgba(0,0,0,0.1)]"
    >
      {/* Top glass reflection bevel / sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent z-10" aria-hidden />

      {/* Diagonal ambient glass light streak */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-44 h-44 rounded-full bg-white/[0.12] blur-xl" aria-hidden />

      {/* Stars */}
      <div className="mb-1.5 sm:mb-2.5 lg:mb-3 scale-90 sm:scale-100 lg:scale-105 origin-left relative z-10">
        <Stars />
      </div>

      {/* Quote */}
      <p className="font-epilogue text-[10.5px] sm:text-[12.5px] lg:text-[13.5px] leading-relaxed text-[#06070A]/95 font-medium mb-2.5 sm:mb-3 lg:mb-4 min-h-[58px] sm:min-h-[64px] lg:min-h-[76px] relative z-10">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author / Company — clean typography without circular logo button */}
      <div className="pt-2.5 sm:pt-3 lg:pt-3.5 border-t border-[#06070A]/20 relative z-10">
        <p className="font-excon text-[12px] sm:text-[13px] lg:text-[14px] font-bold text-[#06070A] leading-snug tracking-tight truncate">
          {t.name}
        </p>
        <p className="mt-0.5 font-epilogue text-[9.5px] sm:text-[10.5px] lg:text-[11.5px] text-[#06070A]/80 font-semibold tracking-wide truncate">
          {t.role}
        </p>
      </div>
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
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 text-white selection:bg-[#FAB406] selection:text-[#06070A] sm:py-20 md:py-24"
    >
      {/* Top edge accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#FAB406]/55 to-transparent"
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
          {/* Unified Section Eyebrow */}
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[40px] lg:text-[44px] font-bold tracking-tight text-white leading-[1.1]">
            Inspiring Client Experiences
          </h2>
          <p className="mt-3 font-epilogue text-sm sm:text-base text-zinc-400 max-w-lg">
            Trusted by businesses that wanted more than just a website.
          </p>
        </div>
      </motion.div>

      {/* ─── Single-line Marquee ─── */}
      <div className="relative z-10" aria-label="Client testimonials">
        <MarqueeRow items={TESTIMONIALS} />
      </div>
    </section>
  );
}
