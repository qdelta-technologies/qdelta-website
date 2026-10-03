"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "“QDelta helped us present our business in a much more professional way. The website feels clearer, stronger and more aligned with the kind of clients we want to attract.”",
    name: "Jessica Jacobsen",
    role: "Business Consultant",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "t2",
    quote:
      "“We needed more than a good-looking website — we needed something that actually built trust. QDelta delivered an experience that felt thoughtful, modern and business-focused.”",
    name: "Jamie Monica",
    role: "Brand Founder",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "t3",
    quote:
      "“The final website gave our brand a stronger digital presence and made our offer easier to understand. The overall quality felt premium from start to finish.”",
    name: "Daniel Thomas",
    role: "Creative Business Owner",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "t4",
    quote:
      "“Working with QDelta was a breath of fresh air. They took the time to understand our goals and delivered a website that our customers genuinely compliment.”",
    name: "Marcus Sterling",
    role: "Tech Co-Founder",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "t5",
    quote:
      "“From strategic positioning to visual execution, QDelta delivered beyond our expectations. Our conversion rate and client inquiries noticeably increased after launch.”",
    name: "Elena Rostova",
    role: "Product Director",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
  },
  {
    id: "t6",
    quote:
      "“The attention to detail and typographic discipline set QDelta apart. The new platform communicates our enterprise value proposition with complete clarity.”",
    name: "David Vance",
    role: "Managing Partner",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
  },
];

const MINI_AVATARS = [
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
];

// Reorder so that index 0 is underneath the anchor box, and index 1 (Jessica Jacobsen)
// is immediately visible to the right of the anchor box on initial load
const BASE_CARDS = [
  TESTIMONIALS[5], // David Vance (underneath the anchor box at t = 0)
  TESTIMONIALS[0], // Jessica Jacobsen (starts right beside the anchor box at t = 0)
  TESTIMONIALS[1], // Jamie Monica
  TESTIMONIALS[2], // Daniel Thomas
  TESTIMONIALS[3], // Marcus Sterling
  TESTIMONIALS[4], // Elena Rostova
];

// Duplicate for 100% seamless, mathematically zero-jump infinite marquee loop
const MARQUEE_ITEMS = [...BASE_CARDS, ...BASE_CARDS];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-20 w-full bg-[#06070A] text-white selection:bg-[#F5B800] selection:text-[#06070A] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="center" />

      {/* ================= SECTION HEADER ================= */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center mb-10 sm:mb-12">
        {/* Editorial Section Identifier */}
        <div className="flex items-center gap-3 mb-3 select-none justify-center">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">
            05 / Testimonials
          </span>
          <div className="w-10 sm:w-12 h-[1px] bg-[#F5B800]/60" />
        </div>

        {/* Main Heading */}
        <h2 className="font-excon font-bold text-3xl sm:text-4xl md:text-[44px] text-white tracking-tight leading-[1.12]">
          Inspiring Client Experiences
        </h2>

        {/* Supporting Line */}
        <p className="mt-2.5 text-sm sm:text-base font-epilogue text-zinc-400 font-normal leading-relaxed max-w-lg mx-auto">
          Trusted by businesses that wanted more than just a website.
        </p>
      </div>

      {/* ================= TESTIMONIAL CONTINUOUS INFINITE CAROUSEL ================= */}
      <div className="relative z-10 mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative py-2">
          {/* ---------------- 1. CONTINUOUS MOVING TRACK (UNDER & INTO ANCHORED BOX) ---------------- */}
          <div
            className="relative z-10 flex items-center overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black calc(100% - 48px), transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black calc(100% - 48px), transparent 100%)",
            }}
          >
            <div className="flex items-center gap-4 sm:gap-5 animate-marquee-continuous will-change-transform [animation-play-state:running!important]">
              {MARQUEE_ITEMS.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="relative overflow-hidden w-[260px] sm:w-[290px] md:w-[310px] h-[270px] sm:h-[280px] md:h-[290px] shrink-0 rounded-xl sm:rounded-[18px] bg-[#0B0E12]/85 border border-white/[0.08] hover:border-[#F5B800]/30 p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-xl select-none transition-all duration-300"
                >
                  {/* Crisp Golden Top Accent Hairline */}
                  <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent" />

                  {/* Top: Warm Gold Quote Mark + Testimonial Copy */}
                  <div>
                    <div className="mb-2.5 select-none flex items-center">
                      <svg
                        className="w-4 h-4 fill-current text-[#F5B800]"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote Text */}
                    <p className="font-epilogue text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                      {t.quote}
                    </p>
                  </div>

                  {/* Bottom: Avatar + Name + Role */}
                  <div className="pt-3.5 mt-3 border-t border-white/[0.08] flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-epilogue font-bold text-xs sm:text-[13px] text-white truncate">
                        {t.name}
                      </span>
                      <span className="font-epilogue text-[11px] text-zinc-400 font-medium truncate">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- 2. HIGHLIGHT RATING CARD (ANCHORED ON LEFT - OBSIDIAN GLASS) ---------------- */}
          <div className="relative overflow-hidden absolute left-0 top-2 bottom-2 z-20 w-[230px] sm:w-[290px] md:w-[310px] rounded-xl sm:rounded-[18px] bg-[#0B0E12]/95 border border-[#F5B800]/30 p-5 sm:p-6 flex flex-col justify-between shadow-[14px_0_36px_-6px_rgba(0,0,0,0.8),0_8px_24px_-4px_rgba(245,184,0,0.06)] backdrop-blur-xl select-none">
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/60 to-transparent" />

            {/* Top Stars & Rating */}
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#F5B800] text-[#F5B800] stroke-none"
                  />
                ))}
              </div>

              <h3 className="mt-3 font-excon font-bold text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight leading-none">
                4.9 Rating
              </h3>

              <p className="mt-1.5 font-epilogue text-[11px] sm:text-xs text-zinc-400 font-medium">
                From client feedback
              </p>
            </div>

            {/* Bottom Social Proof: Overlapping Avatars + 15k+ */}
            <div className="pt-3.5 border-t border-white/[0.1] flex items-center gap-2.5 sm:gap-3 mt-3">
              <div className="flex items-center">
                {MINI_AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-[#0B0E12] ${
                      i !== 0 ? "-ml-2 sm:-ml-2.5" : ""
                    } shadow-sm`}
                  >
                    <Image
                      src={src}
                      alt="Verified client"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-excon font-bold text-sm sm:text-base md:text-lg text-[#F5B800] leading-none">
                  15k+
                </span>
                <span className="font-epilogue text-[10px] sm:text-[11px] text-zinc-400 font-medium leading-tight mt-0.5 truncate">
                  Visitors influenced
                </span>
              </div>
            </div>
          </div>

          {/* ---------------- 3. SUBTLE RIGHT EDGE FEATHER FADE ---------------- */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 z-20 bg-gradient-to-l from-[#06070A] to-transparent" />
        </div>
      </div>
    </section>
  );
}
