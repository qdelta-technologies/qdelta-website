"use client";

import React from "react";
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

const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 text-white selection:bg-[#F5B800] selection:text-[#06070A] sm:py-20 md:py-24"
    >
      <SectionAtmosphere variant="center" />

      {/* Header — same structure as before */}
      <div className="relative z-10 mx-auto mb-10 max-w-4xl px-4 text-center sm:mb-12 sm:px-6">
        <div className="mb-3 flex items-center justify-center gap-3 select-none">
          <span className="font-epilogue text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            05 / Testimonials
          </span>
          <div className="h-px w-10 bg-[#F5B800]/60 sm:w-12" />
        </div>

        <h2 className="font-excon text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-[44px] leading-[1.12]">
          Inspiring Client Experiences
        </h2>

        <p className="mx-auto mt-2.5 max-w-lg font-epilogue text-sm font-normal leading-relaxed text-zinc-400 sm:text-base">
          Trusted by businesses that wanted more than just a website.
        </p>
      </div>

      {/* Single continuous marquee */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <div className="relative py-2">
          <div
            className="relative z-10 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 48px, black calc(100% - 48px), transparent 100%)",
            }}
          >
            <div className="animate-marquee-continuous flex w-max items-stretch gap-4 sm:gap-5 select-none">
              {MARQUEE_ITEMS.map((t, idx) => (
                <article
                  key={`${t.id}-${idx}`}
                  className="pointer-events-none relative flex min-h-[252px] w-[min(268px,calc(100vw-3rem))] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/[0.09] bg-[#0A0D11]/92 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:min-h-[272px] sm:w-[292px] sm:rounded-[18px] sm:p-6 md:w-[308px]"
                >
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#FAB406]/55 to-transparent" />

                  <div className="relative z-10">
                    <svg
                      className="mb-3 h-4 w-4 fill-[#FAB406] opacity-90"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="line-clamp-6 font-epilogue text-xs font-normal leading-relaxed text-zinc-200 sm:text-[13px]">
                      “{t.quote}”
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 border-t border-white/[0.08] pt-3.5">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FAB406]/30 bg-gradient-to-br from-[#FAB406]/18 to-[#0B0E12] font-epilogue text-[10px] font-bold text-[#FAB406]"
                      aria-hidden
                    >
                      {getInitials(t.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-epilogue text-xs font-bold text-white sm:text-[13px]">
                        {t.name}
                      </p>
                      <p className="truncate font-epilogue text-[11px] font-medium text-zinc-500">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#06070A] to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#06070A] to-transparent sm:w-16" />
        </div>
      </div>
    </section>
  );
}
