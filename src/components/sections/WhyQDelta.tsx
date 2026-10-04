"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface CounterItem {
  metric: string;
  label: string;
  detail: string;
}

const COUNTERS: CounterItem[] = [
  {
    metric: "10+",
    label: "Clients Served",
    detail: "Across multiple business categories",
  },
  {
    metric: "2+",
    label: "Years Experience",
    detail: "In web design & development",
  },
  {
    metric: "End-to-End",
    label: "Project Flow",
    detail: "Strategy → Design → Development → Support",
  },
];

export default function WhyQDelta() {
  return (
    <section
      id="why-qdelta"
      aria-label="Built for Business Growth — Strategic Value"
      className="relative z-20 w-full bg-[#06070A] text-white py-16 sm:py-20 md:py-24 overflow-hidden selection:bg-[#E7B72A] selection:text-[#06070A]"
    >
      {/* ================= BACKGROUND ATMOSPHERE (HERO CONTINUATION) ================= */}
      <SectionAtmosphere variant="center" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= 1. HEADER SECTION (EDITORIAL DIRECTION) ================= */}
        <div className="max-w-2xl">
          {/* Editorial Section Identifier */}
          <div className="flex items-center gap-3.5 mb-4 sm:mb-5 select-none">
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">
              01 / WHY IT MATTERS
            </span>
            <div className="w-10 sm:w-12 h-[1px] bg-[#E7B72A]/60" />
          </div>

          {/* Main Headline */}
          <h2 className="font-excon font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12]">
            Your website shapes perception.
          </h2>

          {/* Supporting Copy */}
          <p className="mt-3.5 sm:mt-4 font-epilogue text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
            We build digital experiences that make your business easier to understand, trust and choose.
          </p>
        </div>

        {/* ================= 2. COUNTER ROW (3 WIDE BOXES MATCHING EXACT HOVER AESTHETIC) ================= */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {COUNTERS.map((counter, idx) => (
            <div
              key={idx}
              className="relative rounded-xl bg-[#0B0E12]/80 border border-white/[0.07] hover:border-[#E7B72A]/25 px-5 py-4 sm:py-4.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden transition-all duration-300"
            >
              {/* Crisp Golden Top Accent Hairline */}
              <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#E7B72A]/50 to-transparent" />

              <div className="flex items-baseline justify-between gap-3">
                <span className="font-epilogue font-extrabold text-xl sm:text-2xl md:text-3xl text-[#E7B72A] tracking-tight">
                  {counter.metric}
                </span>
                <span className="font-epilogue font-bold text-xs sm:text-[13px] text-zinc-200 tracking-tight text-right">
                  {counter.label}
                </span>
              </div>

              <p className="mt-2 font-epilogue text-xs text-zinc-400 leading-snug font-normal">
                {counter.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ================= 3. BENTO SPLIT SECTION (TWO PROMINENT CARDS ONLY) ================= */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* BENTO CARD 1 — Large Dark Story Card (7 Columns) */}
          <div
            className="lg:col-span-7 rounded-xl sm:rounded-2xl bg-[#0B0E12]/85 border border-white/[0.08] hover:border-[#E7B72A]/25 p-6 sm:p-8 md:p-9 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#E7B72A]/50 to-transparent" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E7B72A]/[0.04] blur-[100px]" />

            <div>
              <div className="inline-flex items-center gap-2 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7B72A]" />
                <span className="font-epilogue text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#E7B72A]">
                  CONVERSION & VALUE
                </span>
              </div>

              <h3 className="font-epilogue font-bold text-xl sm:text-2xl lg:text-[28px] text-white tracking-tight leading-[1.2]">
                “Why premium websites matter.”
              </h3>

              <p className="mt-4 font-epilogue text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-xl">
                A website is not just an online presence. It shapes first
                impressions, builds trust, communicates value and helps turn
                attention into enquiries, leads and customers.
              </p>
            </div>

            {/* Strategic Value Pillars */}
            <div className="mt-6 pt-5 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-epilogue font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E7B72A]" />
                <span>First Impressions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E7B72A]" />
                <span>Authority & Trust</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E7B72A]" />
                <span>Lead Generation</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 2 — Warm Refined Gold Contrast Card (5 Columns, Both Offerings Stacked) */}
          <div
            className="lg:col-span-5 rounded-xl sm:rounded-2xl bg-[#E7B72A] text-[#06070A] p-6 sm:p-8 md:p-9 flex flex-col justify-between relative overflow-hidden shadow-[0_16px_45px_rgba(231,183,42,0.22)] border border-black/10 group transition-transform duration-300 hover:scale-[1.006]"
          >
            {/* Subtle Texture Grain Over Golden Background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                backgroundSize: "8px 8px",
              }}
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-epilogue text-xs font-bold uppercase tracking-widest text-black/75">
                  CORE OFFERINGS
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black group-hover:bg-[#06070A] group-hover:text-[#E7B72A] transition-colors duration-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* 1. DIGITAL Offering */}
              <div className="space-y-1.5">
                <h4 className="font-epilogue font-black text-xl sm:text-2xl md:text-3xl text-black tracking-tight uppercase">
                  DIGITAL
                </h4>
                <p className="font-epilogue text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                  Conversion-focused landing pages and digital experiences.
                </p>
              </div>

              {/* Clean Architectural Divider */}
              <div className="my-5 sm:my-6 h-[1px] w-full bg-black/15" />

              {/* 2. SIGNATURE Offering */}
              <div className="space-y-1.5">
                <h4 className="font-epilogue font-black text-xl sm:text-2xl md:text-3xl text-black tracking-tight uppercase">
                  SIGNATURE
                </h4>
                <p className="font-epilogue text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                  Premium websites with stronger design, storytelling and
                  presence.
                </p>
              </div>
            </div>

            {/* Bottom Footer Assurance */}
            <div className="mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-epilogue font-bold text-black/90">
              <span>Purposefully Crafted</span>
              <span>·</span>
              <span>Outcome Focused</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
