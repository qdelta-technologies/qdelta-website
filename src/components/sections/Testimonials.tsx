"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, Sparkles } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  accent: "gold" | "sky";
}

const ROW_1: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Creative geniuses who listen, understand, and craft captivating visuals — an agency that truly understands modern luxury and high-velocity conversion.",
    name: "Gabrielle Williams",
    role: "CEO & Co-founder",
    company: "Lumina Global",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    accent: "gold",
  },
  {
    id: "t2",
    quote:
      "Exceeded our expectations with innovative Next.js architecture that brought our vision to life — a truly remarkable creative engineering team.",
    name: "Samantha Johnson",
    role: "Head of Product",
    company: "Apex Labs",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    accent: "sky",
  },
  {
    id: "t3",
    quote:
      "Their ability to capture our brand essence in every interaction is unparalleled. Our conversion rate increased by 44% in the first month post-launch.",
    name: "Isabella Rodriguez",
    role: "Managing Director",
    company: "Maison Atelier",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    accent: "gold",
  },
  {
    id: "t4",
    quote:
      "The rarest combination of elite visual design and uncompromising engineering speed. QDelta is hands-down our unfair competitive advantage.",
    name: "David Chen",
    role: "Founder",
    company: "Nova Protocol",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    accent: "sky",
  },
  {
    id: "t5",
    quote:
      "From concept to execution, their craft knows no bounds. The 3D WebGL interactions and buttery smooth 60fps performance set us leagues apart.",
    name: "Arthur Vance",
    role: "Co-founder & CEO",
    company: "Vance Capital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    accent: "gold",
  },
];

const ROW_2: Testimonial[] = [
  {
    id: "t6",
    quote:
      "A refreshing and imaginative team that consistently delivers exceptional results — highly recommended for any ambitious digital brand.",
    name: "Victoria Thompson",
    role: "Chief Creative Officer",
    company: "Studio Velvet",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    accent: "gold",
  },
  {
    id: "t7",
    quote:
      "Their team’s artistic flair and strategic approach resulted in a remarkable digital flagship. An indispensable long-term creative partner.",
    name: "John Peter",
    role: "Head of Growth",
    company: "Synthetix AI",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    accent: "sky",
  },
  {
    id: "t8",
    quote:
      "Flawless execution from architectural wireframe to edge deployment. The SEO architecture and conversion clarity delivered an instant ROI.",
    name: "Natalie Martinez",
    role: "Brand Director",
    company: "Ethereal Living",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    accent: "gold",
  },
  {
    id: "t9",
    quote:
      "They translated complex technical offerings into a crystal clear, high-converting digital storefront that our enterprise clients love.",
    name: "Marcus Sterling",
    role: "VP Engineering",
    company: "Aether Dynamics",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    accent: "sky",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  const isGold = t.accent === "gold";

  return (
    <div className="relative flex w-[340px] sm:w-[380px] shrink-0 flex-col justify-between rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-white/25 hover:bg-[#12121a]">
      <div>
        {/* Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 fill-current ${
                  isGold ? "text-[#FAB406]" : "text-sky-400"
                }`}
              />
            ))}
          </div>
          <Quote className="h-4 w-4 text-zinc-600" />
        </div>

        {/* Quote text */}
        <p className="mt-4 text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-normal">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Author Details */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15">
          <Image
            src={t.avatar}
            alt={t.name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white font-sans">{t.name}</h4>
          <p className="text-[11px] text-zinc-400">
            {t.role} • <span className={isGold ? "text-[#FAB406]" : "text-sky-400"}>{t.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black border-t border-white/10 py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[55rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.05] via-transparent to-transparent blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
            Client Voices
          </span>
        </div>

        <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-center">
          Trusted by <span className="italic text-[#FAB406]">Industry Leaders</span>
        </h2>

        <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed text-center">
          Real feedback from founders, executives, and creative directors who built their digital flagships with QDelta.
        </p>
      </div>

      {/* Marquee Row 1 (Left Scrolling) */}
      <div className="relative w-full overflow-hidden mb-6 select-none">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#040406] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#040406] to-transparent" />

        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {[...ROW_1, ...ROW_1].map((t, idx) => (
            <TestimonialCard key={`r1-${t.id}-${idx}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Right Scrolling) */}
      <div className="relative w-full overflow-hidden select-none">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#040406] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#040406] to-transparent" />

        <div
          className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]"
          style={{ animationDirection: "reverse" }}
        >
          {[...ROW_2, ...ROW_2].map((t, idx) => (
            <TestimonialCard key={`r2-${t.id}-${idx}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
