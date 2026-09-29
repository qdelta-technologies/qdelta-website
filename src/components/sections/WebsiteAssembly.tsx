"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lock,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  MousePointer,
  ArrowUpRight,
  Code2,
  CheckCircle2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    id: "wireframe",
    number: "01",
    name: "Wireframe",
    sub: "Information Architecture",
    description: "Raw wireframe blueprints mapped strictly to conversion intent and flow.",
    url: "qdelta.digital/wireframe-spec",
  },
  {
    id: "structure",
    number: "02",
    name: "Structure",
    sub: "Grid & Fluid Layout",
    description: "Solid responsive grids, container geometry, and component hierarchy.",
    url: "qdelta.digital/layout-system",
  },
  {
    id: "identity",
    number: "03",
    name: "Identity",
    sub: "Typography & Color",
    description: "Epilogue typography, obsidian surfaces, and golden QDelta signals.",
    url: "qdelta.digital/brand-contrast",
  },
  {
    id: "polish",
    number: "04",
    name: "Live Polish",
    sub: "Production Fidelity",
    description: "Horizon illumination, interactive micro-states, and 60fps performance.",
    url: "qdelta.digital/flagship-release",
  },
];

export default function WebsiteAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);

  // Layer refs for cross-fading and progressive morph
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const urlTextRef = useRef<HTMLSpanElement>(null);

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Elements
      const l1 = layer1Ref.current;
      const l2 = layer2Ref.current;
      const l3 = layer3Ref.current;
      const l4 = layer4Ref.current;
      const glow = glowRef.current;
      const progress = progressFillRef.current;
      const browser = browserRef.current;

      if (!l1 || !l2 || !l3 || !l4 || !browser) return;

      if (prefersReducedMotion) {
        // Fallback for reduced motion: show final state directly
        gsap.set(l1, { opacity: 0, display: "none" });
        gsap.set(l2, { opacity: 0, display: "none" });
        gsap.set(l3, { opacity: 0, display: "none" });
        gsap.set(l4, { opacity: 1, display: "block" });
        gsap.set(glow, { opacity: 1 });
        return;
      }

      // Initial state: Layer 1 (Wireframe) visible, others transparent
      gsap.set(l1, { opacity: 1, display: "block" });
      gsap.set(l2, { opacity: 0, display: "block" });
      gsap.set(l3, { opacity: 0, display: "block" });
      gsap.set(l4, { opacity: 0, display: "block" });
      gsap.set(glow, { opacity: 0, scale: 0.95 });
      gsap.set(browser, { scale: 0.97, y: 15 });

      // Create master timeline pinned over 350vh scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2800",
          pin: stickyRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (progress) {
              progress.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
            }

            // Sync active stage state for tabs and captions
            let stageIndex = 0;
            if (p >= 0.72) stageIndex = 3;
            else if (p >= 0.45) stageIndex = 2;
            else if (p >= 0.2) stageIndex = 1;
            else stageIndex = 0;

            setActiveStage(stageIndex);

            if (urlTextRef.current) {
              urlTextRef.current.textContent = STAGES[stageIndex].url;
            }
          },
        },
      });

      // Subtle browser elevation on entrance
      tl.to(browser, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      }, 0);

      // ================= PHASE 1 -> PHASE 2 (Wireframe -> Structure) =================
      tl.to(l1, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.2);

      tl.fromTo(
        l2,
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.inOut" },
        0.2
      );

      // ================= PHASE 2 -> PHASE 3 (Structure -> Identity & Typography) =================
      tl.to(l2, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.5);

      tl.fromTo(
        l3,
        { opacity: 0, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.inOut" },
        0.5
      );

      // ================= PHASE 3 -> PHASE 4 (Identity -> Production Polish & Glow) =================
      tl.to(l3, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.78);

      tl.fromTo(
        l4,
        { opacity: 0, scale: 0.995 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.inOut" },
        0.78
      );

      tl.to(
        glow,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0.78
      );

      tl.to(
        browser,
        {
          borderColor: "rgba(250, 180, 6, 0.3)",
          boxShadow: "0 25px 80px -20px rgba(0,0,0,0.9), 0 0 50px rgba(250,180,6,0.18)",
          duration: 0.35,
        },
        0.82
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Interactive Website Assembly Experience"
      className="relative w-full bg-[#040406] text-white"
      style={{ height: "3600px" }}
    >
      {/* Sticky Viewport Stage */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden px-3 sm:px-6 py-6 sm:py-8 select-none"
      >
        {/* Subtle Ambient Background Mesh */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-35 blur-[140px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(250,180,6,0.06) 0%, rgba(250,180,6,0.01) 50%, transparent 80%)",
            }}
          />
          {/* Subtle Technical Corner Crosshairs */}
          <div className="absolute top-8 left-8 text-zinc-700 font-mono text-[10px] hidden md:block">
            + 01_ASM_STAGE
          </div>
          <div className="absolute top-8 right-8 text-zinc-700 font-mono text-[10px] hidden md:block">
            SYSTEM_SCRUB_60FPS +
          </div>
          <div className="absolute bottom-8 left-8 text-zinc-700 font-mono text-[10px] hidden md:block">
            COORD: 24.58 // 88.42
          </div>
          <div className="absolute bottom-8 right-8 text-zinc-700 font-mono text-[10px] hidden md:block">
            CORE_WEB_VITALS: 100
          </div>
        </div>

        {/* Top Header: Minimal Section Info & Stage Pills */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-2 sm:pt-4">
          {/* Kicker Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FAB406] backdrop-blur-md mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] animate-pulse" />
            <span>The Assembly Experience</span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            From Blueprint to{" "}
            <span className="text-[#FAB406]">Flagship Reality</span>
          </h2>

          {/* Minimal 4-Stage Pill Navigation */}
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.id}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#FAB406]/15 border border-[#FAB406] text-[#FAB406] shadow-[0_0_15px_rgba(250,180,6,0.25)]"
                      : "bg-white/[0.03] border border-white/8 text-zinc-400"
                  }`}
                >
                  <span className={`font-mono text-[9px] sm:text-[10px] ${isActive ? "text-[#FAB406]" : "text-zinc-400"}`}>
                    {stage.number}
                  </span>
                  <span>{stage.name}</span>
                </div>
              );
            })}
          </div>

          {/* Minimal Stage Description that transitions dynamically */}
          <p className="mt-2 text-[11px] sm:text-[13px] text-zinc-300 font-normal max-w-lg transition-opacity duration-300 h-5">
            {STAGES[activeStage].description}
          </p>
        </div>

        {/* ================= CENTRAL BROWSER MOCKUP CONTAINER ================= */}
        <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex items-center justify-center px-1 sm:px-0">
          {/* Golden Horizon Glow Behind Browser (Revealed in Stage 4) */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-t from-[#FAB406]/25 via-[#FAB406]/10 to-transparent blur-3xl opacity-0 transition-opacity will-change-transform"
          />

          {/* Browser Window Chrome */}
          <div
            ref={browserRef}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] max-h-[58vh] min-h-[340px] sm:min-h-[420px] md:min-h-[470px] rounded-xl border border-white/10 bg-[#07070a] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(250,180,6,0.04)] overflow-hidden flex flex-col transition-all duration-300"
          >
            {/* Window Top Bar */}
            <div className="h-8 sm:h-9 w-full bg-[#0a0a0f] border-b border-white/10 flex items-center justify-between px-3 sm:px-4 shrink-0">
              {/* Traffic Light Controls */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 border border-red-500/30 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70 border border-amber-500/30 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 border border-green-500/30 inline-block" />
              </div>

              {/* Browser URL Bar */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-md bg-white/[0.04] border border-white/8 text-[10px] sm:text-[11px] font-mono text-zinc-400 max-w-[220px] sm:max-w-xs w-full justify-center">
                <Lock className="h-2.5 w-2.5 text-[#FAB406] shrink-0" />
                <span ref={urlTextRef} className="truncate">
                  {STAGES[activeStage].url}
                </span>
              </div>

              {/* Status / Viewport Badge */}
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>60 FPS</span>
              </div>
            </div>

            {/* ================= BROWSER CONTENT CANVAS ================= */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-[#040406]">
              {/* ------------------------------------------------------------- */}
              {/* STAGE 1: WIREFRAME / BLUEPRINT LAYER                          */}
              {/* ------------------------------------------------------------- */}
              <div
                ref={layer1Ref}
                className="absolute inset-0 w-full h-full p-3 sm:p-5 flex flex-col justify-between bg-[#040810]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Blueprint Nav Skeleton */}
                <div className="flex items-center justify-between border-b border-dashed border-sky-400/25 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 border border-dashed border-sky-400/50 flex items-center justify-center font-mono text-[9px] text-sky-400/80">
                      [ LOGO_SLOT ]
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="h-3 w-12 border border-dashed border-sky-400/30" />
                    <div className="h-3 w-14 border border-dashed border-sky-400/30" />
                    <div className="h-3 w-12 border border-dashed border-sky-400/30" />
                  </div>
                  <div className="h-5 px-3 border border-dashed border-sky-400/60 flex items-center justify-center font-mono text-[9px] text-sky-300">
                    [ CTA_BOX ]
                  </div>
                </div>

                {/* Blueprint Hero Section */}
                <div className="flex flex-col items-center text-center my-auto py-2">
                  <div className="mb-2 h-4 w-32 border border-dashed border-sky-400/40 flex items-center justify-center font-mono text-[8px] text-sky-300/70">
                    |- W: 180px // H1_TAG -|
                  </div>
                  {/* Wireframe Headline Bars */}
                  <div className="h-5 sm:h-7 w-4/5 max-w-md border border-dashed border-sky-400/60 bg-sky-950/20 mb-1.5 flex items-center justify-center font-mono text-[10px] text-sky-400/70">
                    HEADLINE_PRIMARY // CONVERSION_TITLE
                  </div>
                  <div className="h-5 sm:h-7 w-3/5 max-w-sm border border-dashed border-sky-400/60 bg-sky-950/20 mb-2 flex items-center justify-center font-mono text-[10px] text-sky-400/70">
                    VALUE_PROP // ACCENT_LINE
                  </div>
                  {/* Wireframe Subtext */}
                  <div className="h-2.5 w-3/4 max-w-xs border border-dashed border-sky-400/30 mb-1" />
                  <div className="h-2.5 w-1/2 max-w-[200px] border border-dashed border-sky-400/30 mb-3" />
                  {/* Action Buttons Slot */}
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-24 border border-dashed border-sky-400/50 flex items-center justify-center font-mono text-[9px] text-sky-300">
                      [ BTN_PRIMARY ]
                    </div>
                    <div className="h-6 w-20 border border-dashed border-sky-400/30 flex items-center justify-center font-mono text-[9px] text-sky-400/60">
                      [ BTN_SEC ]
                    </div>
                  </div>
                </div>

                {/* Blueprint 3 Cards Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 border-t border-dashed border-sky-400/20">
                  {[1, 2, 3].map((card) => (
                    <div
                      key={`wf-card-${card}`}
                      className="border border-dashed border-sky-400/30 bg-sky-950/10 p-2 rounded flex flex-col justify-between h-14 sm:h-20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-3 border border-dashed border-sky-400/50" />
                        <span className="font-mono text-[7px] text-sky-400/50">GRID_0{card}</span>
                      </div>
                      <div className="h-2 w-4/5 border border-dashed border-sky-400/30" />
                      <div className="h-1.5 w-3/5 border border-dashed border-sky-400/20" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STAGE 2: STRUCTURED LAYOUT LAYER                              */}
              {/* ------------------------------------------------------------- */}
              <div
                ref={layer2Ref}
                className="absolute inset-0 w-full h-full p-3 sm:p-5 flex flex-col justify-between bg-[#08080c]"
              >
                {/* Structured Nav */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 rounded bg-zinc-800 border border-zinc-700" />
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="h-3 w-12 rounded bg-zinc-800/80" />
                    <div className="h-3 w-14 rounded bg-zinc-800/80" />
                    <div className="h-3 w-12 rounded bg-zinc-800/80" />
                  </div>
                  <div className="h-6 w-24 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center font-mono text-[9px] text-zinc-300">
                    Action Target
                  </div>
                </div>

                {/* Structured Hero */}
                <div className="flex flex-col items-center text-center my-auto py-2">
                  <div className="mb-2 h-4 w-28 rounded-full bg-zinc-800 border border-zinc-700" />
                  {/* Solid Content Placeholders */}
                  <div className="h-6 sm:h-8 w-4/5 max-w-md rounded-md bg-zinc-800 border border-zinc-700 mb-2 flex items-center justify-center text-zinc-400 font-mono text-[10px]">
                    Structured Component Block
                  </div>
                  <div className="h-6 sm:h-8 w-3/5 max-w-sm rounded-md bg-zinc-800 border border-zinc-700 mb-2.5 flex items-center justify-center text-zinc-400 font-mono text-[10px]">
                    Secondary Accent Container
                  </div>
                  <div className="h-3 w-3/4 max-w-xs rounded bg-zinc-800/60 mb-1.5" />
                  <div className="h-3 w-1/2 max-w-[200px] rounded bg-zinc-800/60 mb-3" />
                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-24 rounded-full bg-zinc-700 border border-zinc-600" />
                    <div className="h-6 w-20 rounded-full bg-zinc-800 border border-zinc-700" />
                  </div>
                </div>

                {/* Structured 3 Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 border-t border-zinc-800/80">
                  {[1, 2, 3].map((card) => (
                    <div
                      key={`st-card-${card}`}
                      className="bg-zinc-900/80 border border-zinc-800 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20 shadow-sm"
                    >
                      <div className="h-3.5 w-3.5 rounded bg-zinc-800 border border-zinc-700" />
                      <div className="h-2 w-4/5 rounded bg-zinc-700" />
                      <div className="h-1.5 w-3/5 rounded bg-zinc-800" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STAGE 3: TYPOGRAPHY, COLORS & IDENTITY LAYER                  */}
              {/* ------------------------------------------------------------- */}
              <div
                ref={layer3Ref}
                className="absolute inset-0 w-full h-full p-3 sm:p-5 flex flex-col justify-between bg-[#050508]"
              >
                {/* Brand Nav */}
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-sm tracking-tight">QDelta</span>
                    <span className="text-[#FAB406] text-xs">Δ</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-zinc-400">
                    <span className="text-zinc-200">Services</span>
                    <span>Packages</span>
                    <span>Process</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#FAB406]/10 border border-[#FAB406]/40 text-[#FAB406] text-[10px] font-semibold">
                    Start Project
                  </div>
                </div>

                {/* Typography Hero */}
                <div className="flex flex-col items-center text-center my-auto py-1">
                  <div className="mb-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] font-medium text-zinc-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span>Conversion Architecture</span>
                  </div>
                  <h3 className="text-sm sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-tight">
                    Built to speak. <span className="text-[#FAB406]">Designed to work.</span>
                  </h3>
                  <p className="mt-1 text-[9px] sm:text-[11px] text-zinc-400 max-w-xs sm:max-w-sm font-normal">
                    We build flagship digital experiences that turn visitors into long-term clients.
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-[#FAB406] text-black text-[10px] font-semibold flex items-center gap-1">
                      <span>Explore Work</span>
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full border border-white/20 text-white text-[10px] font-medium">
                      Contact
                    </div>
                  </div>
                </div>

                {/* Typography 3 Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 border-t border-white/8">
                  <div className="bg-[#0a0a10] border border-white/10 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <Zap className="h-3 w-3" />
                      <span className="text-[8px] font-mono text-zinc-400">99 SCORE</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Ultra Fast</div>
                    <div className="text-[8px] text-zinc-400">Sub-second load</div>
                  </div>

                  <div className="bg-[#0a0a10] border border-white/10 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[8px] font-mono text-emerald-400">+140%</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Conversion</div>
                    <div className="text-[8px] text-zinc-400">Intent-driven flow</div>
                  </div>

                  <div className="bg-[#0a0a10] border border-white/10 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <Code2 className="h-3 w-3" />
                      <span className="text-[8px] font-mono text-zinc-400">NEXT.JS</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Clean Code</div>
                    <div className="text-[8px] text-zinc-400">Scalable system</div>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* STAGE 4: POLISHED PREMIUM WEBSITE LAYER (FINAL FIDELITY)      */}
              {/* ------------------------------------------------------------- */}
              <div
                ref={layer4Ref}
                className="absolute inset-0 w-full h-full p-3 sm:p-5 flex flex-col justify-between bg-[#040406] overflow-hidden"
              >
                {/* Glowing Horizon Arc at the bottom of the mockup */}
                <div
                  className="pointer-events-none absolute -bottom-16 inset-x-0 h-36 bg-gradient-to-t from-[#FAB406]/35 via-[#FAB406]/15 to-transparent blur-md"
                  style={{
                    maskImage: "radial-gradient(ellipse 80% 50% at 50% 100%, black 50%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 100%, black 50%, transparent 100%)",
                  }}
                />

                {/* Polished Glass Navbar */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.02] backdrop-blur-md px-2 py-1.5 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-white text-sm tracking-tight">QDelta</span>
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-zinc-300">
                    <span className="text-white hover:text-[#FAB406] transition-colors">Services</span>
                    <span className="hover:text-white transition-colors">Packages</span>
                    <span className="hover:text-white transition-colors">Process</span>
                    <span className="hover:text-white transition-colors">Projects</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#FAB406] text-black text-[10px] font-semibold shadow-[0_0_15px_rgba(250,180,6,0.4)] flex items-center gap-1 hover:bg-white transition-all cursor-pointer">
                    <span>Start a Project</span>
                    <ArrowUpRight className="h-2.5 w-2.5" />
                  </div>
                </div>

                {/* Polished Hero with Micro-Collaboration Cursors */}
                <div className="relative z-10 flex flex-col items-center text-center my-auto py-1">
                  {/* Status Badge */}
                  <div className="mb-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[9px] font-medium text-[#FAB406] shadow-[0_0_10px_rgba(250,180,6,0.2)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] animate-ping" />
                    <span>Live Interactive Environment</span>
                  </div>

                  {/* Headline with Mini Collaboration Cursors */}
                  <div className="relative inline-block">
                    {/* Mini Strategy Cursor */}
                    <div className="absolute -top-3 -left-6 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-700 text-[8px] font-mono text-zinc-200 shadow-md">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      <span>Strategy</span>
                    </div>

                    <h3 className="text-base sm:text-xl md:text-2xl font-extrabold italic tracking-tight text-white leading-tight">
                      Built to speak. <span className="text-[#FAB406]">Designed</span> to work.
                    </h3>

                    {/* Mini Conversion Cursor */}
                    <div className="absolute -bottom-2 -right-6 hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-700 text-[8px] font-mono text-zinc-200 shadow-md">
                      <span className="h-1 w-1 rounded-full bg-[#FAB406]" />
                      <span>Conversion</span>
                    </div>
                  </div>

                  <p className="mt-1.5 text-[10px] sm:text-xs text-zinc-300 max-w-xs sm:max-w-md font-normal leading-relaxed">
                    We build websites that speak for your brand and work for your business—combining
                    strategy, story, and high-performance code.
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="px-3.5 py-1.5 rounded-full bg-[#FAB406] text-black text-[10px] sm:text-[11px] font-semibold shadow-[0_0_20px_rgba(250,180,6,0.45)] hover:bg-white transition-all flex items-center gap-1">
                      <span>Start a project</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                    <div className="px-3 py-1.5 rounded-full border border-white/30 bg-white/[0.04] text-white text-[10px] sm:text-[11px] font-medium backdrop-blur-md hover:border-white/60 transition-all">
                      Explore our work
                    </div>
                  </div>
                </div>

                {/* Polished 3 Glass Feature Cards */}
                <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 pt-1 border-t border-white/10">
                  <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FAB406]/40 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20 transition-all backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <Zap className="h-3 w-3 group-hover:scale-110 transition-transform" />
                      <span className="text-[8px] font-mono text-emerald-400 font-semibold">100 LCP</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Instant Performance</div>
                    <div className="text-[8px] text-zinc-400">Core Web Vitals optimized</div>
                  </div>

                  <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FAB406]/40 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20 transition-all backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <TrendingUp className="h-3 w-3 group-hover:scale-110 transition-transform" />
                      <span className="text-[8px] font-mono text-[#FAB406] font-semibold">+140%</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Conversion Funnels</div>
                    <div className="text-[8px] text-zinc-400">Turn traffic into revenue</div>
                  </div>

                  <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FAB406]/40 p-2 sm:p-2.5 rounded-lg flex flex-col justify-between h-14 sm:h-20 transition-all backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[#FAB406]">
                      <ShieldCheck className="h-3 w-3 group-hover:scale-110 transition-transform" />
                      <span className="text-[8px] font-mono text-zinc-400">READY</span>
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-white leading-none">Production Tested</div>
                    <div className="text-[8px] text-zinc-400">Enterprise Next.js stack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar & Status */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between pt-2 pb-1 text-zinc-400 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#FAB406]">SCROLL_PROGRESS</span>
            <div className="h-1.5 w-28 sm:w-44 rounded-full bg-white/10 overflow-hidden">
              <div
                ref={progressFillRef}
                className="h-full bg-gradient-to-r from-[#FAB406] to-[#FFE072] transition-all duration-75 rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 hidden sm:inline">PROGRESSIVE_TRANSFORMATION</span>
            <span className="text-[#FAB406] font-bold">
              STAGE {STAGES[activeStage].number} / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
