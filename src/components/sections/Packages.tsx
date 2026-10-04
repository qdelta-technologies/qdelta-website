"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Zap,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InclusionGroup {
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
}

const INCLUSION_GROUPS: InclusionGroup[] = [
  {
    number: "01",
    title: "Strategy & Structure",
    tagline: "Architecture & Intent",
    description:
      "Deep discovery and purposeful information architecture built around user decision journeys before a single line of design or code is written.",
    items: [
      "Business & Audience Discovery",
      "Strategic Page / Website Structure",
    ],
  },
  {
    number: "02",
    title: "Design & Experience",
    tagline: "Bespoke Aesthetics",
    description:
      "Original UI/UX crafted to communicate brand authority, paired with conversion copywriting assistance and fluid micro-interactions.",
    items: [
      "Custom UI/UX Design",
      "Conversion-Focused Copywriting Assistance",
      "Fluid Animations & Micro-interactions",
      "Two Revision Rounds",
    ],
  },
  {
    number: "03",
    title: "Engineering & Search",
    tagline: "Speed & Visibility",
    description:
      "Production-grade Next.js development engineered for sub-second load times, deep technical SEO, and modern AI answer engines.",
    items: [
      "Responsive Development",
      "Technical SEO Foundations",
      "AEO / AI Search Readiness Foundations",
      "Analytics & Event Tracking",
    ],
  },
  {
    number: "04",
    title: "Launch & Support",
    tagline: "Assurance & Longevity",
    description:
      "Frictionless edge deployment and ongoing technical guardianship to ensure total operational stability post-launch.",
    items: [
      "Domain / Deployment Assistance",
      "30-Day Post-Launch Technical Support",
    ],
  },
];

export default function Packages() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState<"digital" | "signature">("digital");

  const activeGroup = INCLUSION_GROUPS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : INCLUSION_GROUPS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < INCLUSION_GROUPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="packages"
      className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#E5B528] selection:text-black py-20 sm:py-28 md:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient Lighting Accents */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[65rem] rounded-full bg-gradient-to-b from-[#E5B528]/[0.045] via-sky-500/[0.02] to-transparent blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ======================================================= */}
        {/* SECTION 1 — PACKAGES INTRO HEADER                       */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B528]/10 border border-[#E5B528]/25 text-xs font-excon uppercase tracking-[0.2em] text-[#E5B528] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528] shadow-[0_0_8px_#E5B528]" />
            <span>OUR PACKAGES</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.2rem] font-epilogue font-extrabold tracking-tight text-white leading-[1.08] text-balance max-w-3xl">
            Two Ways to Work With <span className="text-[#E5B528]">QDelta</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3 text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal max-w-xl text-balance">
            Different approaches. One shared goal — making your website work harder for your business.
          </p>

          {/* Mobile Quick Selector Switch */}
          <div className="flex md:hidden items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 mt-6">
            <button
              onClick={() => setMobileTab("digital")}
              className={`px-4 py-1.5 rounded-full text-xs font-excon uppercase tracking-wider font-semibold transition-all ${
                mobileTab === "digital"
                  ? "bg-[#E5B528] text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              01 Digital
            </button>
            <button
              onClick={() => setMobileTab("signature")}
              className={`px-4 py-1.5 rounded-full text-xs font-excon uppercase tracking-wider font-semibold transition-all ${
                mobileTab === "signature"
                  ? "bg-sky-400 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              02 Signature
            </button>
          </div>
        </motion.div>

        {/* ======================================================= */}
        {/* COMPACT & COOL DUAL PACKAGE CARDS                       */}
        {/* Sleek, easy, low vertical footprint                     */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch mb-10 sm:mb-12">
          {/* ================= CARD 1: QDELTA DIGITAL ================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`group relative flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-[#090b11] p-6 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#E5B528]/40 hover:shadow-[0_20px_60px_rgba(229, 181, 40,0.1)] overflow-hidden ${
              mobileTab === "signature" ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Top Golden Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/45 to-transparent pointer-events-none" />

            <div>
              {/* Header Row: Label & Tagline */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528] shadow-[0_0_8px_#E5B528]" />
                  <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-[#E5B528]">
                    PACKAGE 01
                  </span>
                </div>
                <span className="font-epilogue text-xs sm:text-[13px] font-bold italic text-[#E5B528]">
                  Built to convert.
                </span>
              </div>

              {/* Title & Short Description */}
              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-epilogue font-black text-white tracking-tight">
                  QDelta Digital
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] font-epilogue text-zinc-300 leading-relaxed">
                  Conversion-focused landing pages and digital sales experiences designed to help products, services and offers turn attention into action.
                </p>
              </div>

              {/* Compact 2-Column Deliverables */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-excon uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-3">
                  Deliverables & Capabilities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "High-Converting Landing Pages",
                    "Sales Experiences",
                    "Lead Generation Funnels",
                    "Checkout Integrations",
                    "CRM & Webhooks",
                  ].map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2 text-xs text-zinc-200 py-0.5"
                    >
                      <Check className="h-3.5 w-3.5 text-[#E5B528] shrink-0" />
                      <span className="font-epilogue text-[12px] font-medium leading-tight">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Bottom Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <span className="text-[11px] font-excon text-zinc-400 uppercase tracking-wider font-medium">
                Landing Systems
              </span>

              <Link
                href="#contact"
                className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#E5B528] py-2.5 px-4 sm:px-5 text-xs font-epilogue font-bold text-black shadow-[0_0_16px_rgba(229, 181, 40,0.25)] transition-all duration-200 hover:bg-white hover:scale-[1.02]"
              >
                <span>Explore QDelta Digital</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ================= CARD 2: QDELTA SIGNATURE ================= */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`group relative flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-[#090b11] p-6 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-sky-400/40 hover:shadow-[0_20px_60px_rgba(56,189,248,0.1)] overflow-hidden ${
              mobileTab === "digital" ? "hidden md:flex" : "flex"
            }`}
          >
            {/* Top Cyan Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-sky-400/45 to-transparent pointer-events-none" />

            <div>
              {/* Header Row: Label & Tagline */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-sky-400">
                    PACKAGE 02
                  </span>
                </div>
                <span className="font-epilogue text-xs sm:text-[13px] font-bold italic text-sky-400">
                  Built to stand out.
                </span>
              </div>

              {/* Title & Short Description */}
              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-epilogue font-black text-white tracking-tight">
                  QDelta Signature
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] font-epilogue text-zinc-300 leading-relaxed">
                  Premium websites and brand experiences crafted for businesses that want a stronger presence, better storytelling and a more distinctive digital identity.
                </p>
              </div>

              {/* Compact 2-Column Deliverables */}
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-excon uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-3">
                  Deliverables & Capabilities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Premium Multi-page Websites",
                    "Brand Storytelling",
                    "Motion & Micro-interactions",
                    "Interactive & 3D Experiences",
                    "Premium E-commerce",
                  ].map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2 text-xs text-zinc-200 py-0.5"
                    >
                      <Check className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      <span className="font-epilogue text-[12px] font-medium leading-tight">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Bottom Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <span className="text-[11px] font-excon text-zinc-400 uppercase tracking-wider font-medium">
                Flagship Websites
              </span>

              <Link
                href="#contact"
                className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white py-2.5 px-4 sm:px-5 text-xs font-epilogue font-bold text-black shadow-[0_0_16px_rgba(255,255,255,0.25)] transition-all duration-200 hover:bg-sky-400 hover:scale-[1.02]"
              >
                <span>Explore QDelta Signature</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ======================================================= */}
        {/* SECTION 2 — WHAT BOTH PACKAGES INCLUDE (INTEGRATED)     */}
        {/* Rotary Arc Dial & Deliverables Panel                    */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-3xl sm:rounded-[32px] border border-white/[0.09] bg-[#090b10] shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
        >
          {/* Top Subtle Dual Accent Hairline */}
          <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/35 via-sky-400/25 to-transparent pointer-events-none" />

          {/* Integrated Header Row */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-excon uppercase tracking-[0.2em] text-zinc-300 mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5B528]" />
                <span>STANDARD QUALITY COMMITMENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-epilogue font-extrabold text-white tracking-tight">
                What Both Packages Include
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-epilogue text-zinc-400">
                Core quality, strategy and support built into every project.
              </p>
            </div>

            {/* Quick-Select Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {INCLUSION_GROUPS.map((g, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={g.number}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-excon font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#E5B528] text-black shadow-[0_0_16px_rgba(229, 181, 40,0.35)] font-bold scale-[1.03]"
                        : "bg-white/[0.04] text-zinc-400 border border-white/[0.08] hover:text-white hover:border-white/20"
                    }`}
                  >
                    <span>{g.number}</span>
                    <span className="hidden sm:inline ml-1.5 text-[11px] opacity-80">
                      {g.title.split("&")[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= ROTARY ARC DIAL & CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] sm:min-h-[420px]">
            {/* ----------------- LEFT: CIRCULAR ARC ROTARY DIAL ----------------- */}
            <div className="relative lg:col-span-4 hidden lg:flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] overflow-hidden bg-gradient-to-br from-white/[0.015] to-transparent select-none">
              {/* Radial Arc Track Background SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 340 420"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Outer Dashed Orbit Arc */}
                <path
                  d="M 60 10 A 260 260 0 0 1 60 410"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />

                {/* Inner Solid Rail Arc */}
                <path
                  d="M 85 45 A 230 230 0 0 1 85 375"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />

                {/* Focal Apex Indicator Tick */}
                <line
                  x1="195"
                  y1="210"
                  x2="225"
                  y2="210"
                  stroke="#E5B528"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Apex Connection Glow Line to Right Panel */}
                <line
                  x1="225"
                  y1="210"
                  x2="340"
                  y2="210"
                  stroke="rgba(229, 181, 40,0.25)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
              </svg>

              {/* Dial Numbers positioned along the Arc */}
              <div className="relative w-[340px] h-[420px]">
                {INCLUSION_GROUPS.map((group, idx) => {
                  const offset = idx - activeIndex;
                  // Angular displacement: 34 degrees per step
                  const thetaDeg = offset * 34;
                  const thetaRad = (thetaDeg * Math.PI) / 180;
                  const radius = 250;
                  const cx = -35;
                  const cy = 210;

                  // Coordinates along the arc
                  const x = cx + radius * Math.cos(thetaRad);
                  const y = cy + radius * Math.sin(thetaRad);

                  const isActive = idx === activeIndex;

                  return (
                    <motion.button
                      key={group.number}
                      onClick={() => setActiveIndex(idx)}
                      animate={{
                        x: x - 28,
                        y: y - 24,
                        scale: isActive ? 1.25 : 0.88,
                        opacity: isActive ? 1 : Math.abs(offset) > 2 ? 0.15 : 0.4,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 24,
                      }}
                      className="absolute top-0 left-0 flex items-center gap-2 cursor-pointer group"
                      aria-label={`Select ${group.title}`}
                    >
                      {/* Active Indicator Dot */}
                      {isActive && (
                        <motion.span
                          layoutId="activeArcDot"
                          className="w-2 h-2 rounded-full bg-[#E5B528] shadow-[0_0_12px_#E5B528]"
                        />
                      )}

                      <span
                        className={`font-excon font-extrabold tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_0_16px_rgba(229, 181, 40,0.3)]"
                            : "text-xl text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {group.number}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Rotary Step Controls (Up / Down) */}
              <div className="absolute right-4 flex flex-col gap-1.5 z-20">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous inclusion group"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next inclusion group"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ----------------- RIGHT: ACTIVE GROUP DELIVERABLES ----------------- */}
            <div className="lg:col-span-8 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup.number}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header with Number & Category Tag */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-[#E5B528] px-2.5 py-1 rounded bg-[#E5B528]/10 border border-[#E5B528]/20">
                        {activeGroup.number} • {activeGroup.tagline}
                      </span>
                      <span className="text-xs font-excon text-zinc-500 font-mono">
                        Included in Digital & Signature
                      </span>
                    </div>

                    {/* Group Title */}
                    <h4 className="text-xl sm:text-2xl md:text-4xl font-epilogue font-extrabold text-white tracking-tight">
                      {activeGroup.title}
                    </h4>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm md:text-base font-epilogue text-zinc-300 max-w-2xl leading-relaxed">
                      {activeGroup.description}
                    </p>

                    {/* Deliverables Checklist Grid */}
                    <div className="mt-8 pt-6 border-t border-white/[0.08]">
                      <div className="text-[11px] font-excon uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-4">
                        Standard Deliverables in Every Project
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {activeGroup.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-[#E5B528]/30 transition-colors"
                          >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5B528]/15 text-[#E5B528] shrink-0 mt-0.5">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </div>
                            <span className="font-epilogue text-xs sm:text-sm text-zinc-200 font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step Progress Dots on Mobile / Indicator */}
                  <div className="mt-8 pt-4 flex items-center justify-between text-xs text-zinc-500 font-excon">
                    <span>
                      Commitment {activeGroup.number} of 04
                    </span>
                    <div className="flex items-center gap-1.5">
                      {INCLUSION_GROUPS.map((_, i) => (
                        <span
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className={`cursor-pointer transition-all duration-200 ${
                            i === activeIndex
                              ? "w-6 h-1.5 rounded-full bg-[#E5B528]"
                              : "w-1.5 h-1.5 rounded-full bg-zinc-700 hover:bg-zinc-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ================= BOTTOM COMMITMENT BAR ================= */}
          <div className="p-5 sm:p-6 bg-white/[0.02] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-excon">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B528]" />
              <span>Zero hidden fees • Strict milestone sign-offs • Production code ownership</span>
            </div>

            <Link
              href="#contact"
              className="text-xs font-excon uppercase tracking-wider text-[#E5B528] hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <span>Have specific requirements? Speak with us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
