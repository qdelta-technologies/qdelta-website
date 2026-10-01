"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  PanelsTopLeft,
  ShoppingBag,
  Filter,
  Layers,
  Monitor,
  SquarePen,
  Compass,
  RotateCw,
  ArrowUpRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import Link from "next/link";

const INCLUSIONS = [
  {
    category: "Strategy & Architecture",
    items: [
      { name: "Business & Audience Discovery", digital: true, signature: true },
      { name: "Strategic Conversion Structure", digital: true, signature: true },
    ],
  },
  {
    category: "Design & Experience",
    items: [
      { name: "Custom Bespoke UI/UX Design", digital: true, signature: true },
      { name: "Conversion-Focused Copywriting Assistance", digital: true, signature: true },
      { name: "Fluid Animations & Micro-Interactions", digital: true, signature: true },
      { name: "Two Iterative Design Revision Rounds", digital: true, signature: true },
    ],
  },
  {
    category: "Engineering & Next-Gen Search",
    items: [
      { name: "Ultra-Fast Responsive Next.js Development", digital: true, signature: true },
      { name: "Technical SEO & Core Web Vitals Optimization", digital: true, signature: true },
      { name: "AEO / AI Search Readiness Foundations", digital: true, signature: true },
      { name: "Comprehensive Analytics & Event Tracking", digital: true, signature: true },
    ],
  },
  {
    category: "Deployment & Warranty",
    items: [
      { name: "Domain, DNS & Cloud Hosting Assistance", digital: true, signature: true },
      { name: "30-Day Post-Launch Technical Warranty & Support", digital: true, signature: true },
    ],
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 55%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001,
  });

  const leftGlideX = useTransform(smoothProgress, [0, 1], ["-50px", "0px"]);
  const rightGlideX = useTransform(smoothProgress, [0, 1], ["50px", "0px"]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.75], [0, 1]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black border-t border-white/10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[40rem] w-[60rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.07] via-sky-500/[0.03] to-transparent blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-10">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
              Our Packages
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Two Ways to Work With <span className="italic text-[#FAB406]">QDelta</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-zinc-300 font-normal max-w-xl">
            One shared goal — <span className="text-[#FAB406] font-semibold">making your website work harder for your business.</span>
          </p>
        </motion.div>

        {/* ================= DUAL MONOLITHS CARDS ================= */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 w-full items-stretch mb-20 sm:mb-28">
          {/* Card 1: QDelta Digital (Gold Accent) */}
          <motion.div
            style={{
              x: isDesktop ? leftGlideX : 0,
              opacity: cardOpacity,
              scale: cardScale,
            }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e0e14]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#FAB406]/40 hover:shadow-[0_0_35px_rgba(250,180,6,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Tier 01</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FAB406] mt-1 font-sans">
                    QDelta Digital
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#FAB406]/30 bg-[#FAB406]/10 text-[#FAB406]">
                  <PanelsTopLeft className="h-5 w-5" />
                </div>
              </div>

              <h4 className="mt-6 text-xl sm:text-2xl font-bold text-white tracking-tight">
                Built to convert.
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Engineered for digital products, fast-growing SaaS startups, personal brands & high-converting offers.
              </p>

              {/* Feature Grid */}
              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FAB406]/30 bg-[#FAB406]/10 text-[#FAB406] shrink-0">
                    <PanelsTopLeft className="h-3.5 w-3.5" />
                  </div>
                  <span>High-Converting Landing Pages</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FAB406]/30 bg-[#FAB406]/10 text-[#FAB406] shrink-0">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                  <span>Conversion Sales Experiences</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FAB406]/30 bg-[#FAB406]/10 text-[#FAB406] shrink-0">
                    <Filter className="h-3.5 w-3.5" />
                  </div>
                  <span>Opt-in Funnels & Lead Generation</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FAB406]/30 bg-[#FAB406]/10 text-[#FAB406] shrink-0">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  <span>Seamless CRM & Webhook Integrations</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                href="#contact"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#FAB406] py-3.5 text-xs sm:text-sm font-semibold text-black shadow-[0_0_20px_rgba(250,180,6,0.35)] transition-all duration-300 hover:bg-white hover:scale-[1.02]"
              >
                <span>Choose QDelta Digital</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: QDelta Signature (Cyan/Sky Accent) */}
          <motion.div
            style={{
              x: isDesktop ? rightGlideX : 0,
              opacity: cardOpacity,
              scale: cardScale,
            }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0e0e14]/95 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-sky-500/40 hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">Tier 02</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-sky-400 mt-1 font-sans">
                    QDelta Signature
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
                  <Monitor className="h-5 w-5" />
                </div>
              </div>

              <h4 className="mt-6 text-xl sm:text-2xl font-bold text-white tracking-tight">
                Built to stand out.
              </h4>

              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Crafted for premium enterprises & luxury brands that want an unmistakable, industry-defining presence.
              </p>

              {/* Feature Grid */}
              <div className="mt-7 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 shrink-0">
                    <Monitor className="h-3.5 w-3.5" />
                  </div>
                  <span>Bespoke Flagship Web Systems</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 shrink-0">
                    <SquarePen className="h-3.5 w-3.5" />
                  </div>
                  <span>Visual Narrative & Brand Storytelling</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 shrink-0">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <span>Kinetic Motion & Micro-Interactions</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400 shrink-0">
                    <RotateCw className="h-3.5 w-3.5" />
                  </div>
                  <span>Interactive 3D WebGL Showcases</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                href="#contact"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-xs sm:text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02]"
              >
                <span>Choose QDelta Signature</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ================= PACKAGE INCLUSIONS MATRIX ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FAB406]" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Standard Quality Commitments
              </span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              What Both Packages Include
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Our uncompromising quality guarantees built into every single engagement.
            </p>
          </div>

          <div className="w-full rounded-3xl border border-white/10 bg-[#0e0e14]/90 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 items-center border-b border-white/10 bg-white/[0.02] px-5 py-4 sm:px-8 sm:py-5">
              <div className="col-span-6 sm:col-span-8 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Benefit & Service Deliverable
              </div>
              <div className="col-span-3 sm:col-span-2 text-center">
                <span className="inline-block rounded-full border border-[#FAB406]/30 bg-[#FAB406]/10 px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#FAB406] font-semibold">
                  Digital
                </span>
              </div>
              <div className="col-span-3 sm:col-span-2 text-center">
                <span className="inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                  Signature
                </span>
              </div>
            </div>

            {/* Inclusions Rows Grouped by Category */}
            <div className="divide-y divide-white/5">
              {INCLUSIONS.map((category) => (
                <div key={category.category} className="p-4 sm:p-6">
                  <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FAB406] font-semibold mb-3">
                    {category.category}
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="grid grid-cols-12 items-center py-1.5 text-xs sm:text-[13px] text-zinc-300 hover:text-white transition-colors"
                      >
                        <div className="col-span-6 sm:col-span-8 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-zinc-500" />
                          <span>{item.name}</span>
                        </div>
                        <div className="col-span-3 sm:col-span-2 flex justify-center">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FAB406]/15 text-[#FAB406]">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                        </div>
                        <div className="col-span-3 sm:col-span-2 flex justify-center">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
