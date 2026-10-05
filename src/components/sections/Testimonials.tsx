"use client";

import React from "react";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <article
      className="testimonial-card-3d pointer-events-none relative flex min-h-[252px] w-[min(268px,calc(100vw-3rem))] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-[#E5B528]/22 p-5 shadow-none sm:min-h-[272px] sm:w-[292px] sm:rounded-[18px] sm:p-6 md:w-[308px]"
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#E5B528]/55 to-transparent" />

      <div className="relative z-10">
        <svg
          className="mb-3 h-4 w-4 fill-[#E5B528] opacity-90"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="line-clamp-6 font-epilogue text-xs font-normal leading-relaxed text-zinc-100/95 sm:text-[13px]">
          “{t.quote}”
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-3 border-t border-white/12 pt-3.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5B528]/50 bg-[#1f1c14] font-epilogue text-[10px] font-bold text-[#F0C034]"
          aria-hidden
        >
          {getInitials(t.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-epilogue text-xs font-bold text-white sm:text-[13px]">
            {t.name}
          </p>
          <p className="truncate font-epilogue text-[11px] font-medium text-zinc-400">
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

function TestimonialMarqueeTrack({
  items,
  idPrefix,
  ariaHidden,
}: {
  items: TestimonialItem[];
  idPrefix: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-stretch gap-4 sm:gap-5"
      aria-hidden={ariaHidden}
    >
      {items.map((t) => (
        <TestimonialCard key={`${idPrefix}-${t.id}`} t={t} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-20 w-full overflow-hidden bg-gradient-to-b from-[#EBBC30] via-[#E5B528] to-[#D4A520] py-16 text-[#06070A] selection:bg-[#06070A] selection:text-[#E5B528] sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 7, 10, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 7, 10, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto mb-10 max-w-4xl px-4 text-center sm:mb-12 sm:px-6">
        <div className="mb-3 select-none text-center">
          <span className="font-epilogue text-xs font-semibold uppercase tracking-[0.2em] text-[#06070A]/75">
            Testimonials
          </span>
        </div>

        <h2 className="font-excon text-2xl font-bold tracking-tight text-[#06070A] sm:text-3xl md:text-[44px] leading-[1.12]">
          Inspiring Client Experiences
        </h2>

        <p className="mx-auto mt-2.5 max-w-lg font-epilogue text-sm font-normal leading-relaxed text-[#06070A]/80 sm:text-base">
          Trusted by businesses that wanted more than just a website.
        </p>
      </div>

      {/* Full-width marquee — no edge fade masks */}
      <div
        className="relative z-10 w-full overflow-hidden py-2"
        aria-label="Client testimonials"
      >
        <div className="animate-marquee-continuous flex w-max select-none gap-4 sm:gap-5">
          <TestimonialMarqueeTrack items={TESTIMONIALS} idPrefix="a" />
          <TestimonialMarqueeTrack
            items={TESTIMONIALS}
            idPrefix="b"
            ariaHidden
          />
        </div>
      </div>
    </section>
  );
}
