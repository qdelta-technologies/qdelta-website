"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lock,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Layers,
  MousePointer2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Strictly 4 stages max as requested
const STAGES = [
  {
    number: "01",
    label: "Wireframe",
    url: "blueprint.qdelta.digital/wireframe",
    caption: "Information architecture and conversion flow mapped out.",
  },
  {
    number: "02",
    label: "Structure",
    url: "blueprint.qdelta.digital/layout-grid",
    caption: "Structured layout containers and fluid responsive grids established.",
  },
  {
    number: "03",
    label: "Visual Design",
    url: "staging.qdelta.digital/visual-system",
    caption: "Epilogue typography, obsidian surfaces, and signature golden accents applied.",
  },
  {
    number: "04",
    label: "Final Website",
    url: "https://atelierlumiere.com",
    caption: "Interactive micro-polish, cinematic visual media, and live production fidelity.",
  },
];

export default function WebsiteAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const urlTextRef = useRef<HTMLSpanElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // 4 Progressive reveal layers
  const layer1Ref = useRef<HTMLDivElement>(null); // 01 Wireframe
  const layer2Ref = useRef<HTMLDivElement>(null); // 02 Structure
  const layer3Ref = useRef<HTMLDivElement>(null); // 03 Visual Design
  const layer4Ref = useRef<HTMLDivElement>(null); // 04 Final Website

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !browserRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const l1 = layer1Ref.current;
      const l2 = layer2Ref.current;
      const l3 = layer3Ref.current;
      const l4 = layer4Ref.current;
      const glow = glowRef.current;
      const browser = browserRef.current;
      const progress = progressFillRef.current;
      const header = headerRef.current;
      const scrollHint = scrollHintRef.current;

      if (!l1 || !l2 || !l3 || !l4 || !browser) return;

      if (prefersReducedMotion) {
        gsap.set(l1, { opacity: 0, display: "none" });
        gsap.set(l2, { opacity: 0, display: "none" });
        gsap.set(l3, { opacity: 0, display: "none" });
        gsap.set(l4, { opacity: 1, display: "block" });
        if (glow) gsap.set(glow, { opacity: 1 });
        return;
      }

      // Initial state: Layer 1 visible, others staged
      gsap.set(l1, { opacity: 1, display: "block" });
      gsap.set(l2, { opacity: 0, display: "block" });
      gsap.set(l3, { opacity: 0, display: "block" });
      gsap.set(l4, { opacity: 0, display: "block" });
      if (glow) gsap.set(glow, { opacity: 0, scale: 0.95 });
      gsap.set(browser, { scale: 0.985, y: 8 });

      // Master scrub timeline synchronized seamlessly from top to bottom
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stickyRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (progress) {
              progress.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
            }

            // Sync 4 stages cleanly (0.00 - 0.22, 0.22 - 0.46, 0.46 - 0.70, 0.70 - 1.00)
            let stageIdx = 0;
            if (p >= 0.7) stageIdx = 3;
            else if (p >= 0.45) stageIdx = 2;
            else if (p >= 0.2) stageIdx = 1;
            else stageIdx = 0;

            setActiveStage(stageIdx);

            if (urlTextRef.current) {
              urlTextRef.current.textContent = STAGES[stageIdx].url;
            }
          },
        },
      });

      // Browser subtle entrance settling
      tl.to(
        browser,
        {
          scale: 1,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        },
        0
      );

      // ================= TRANSITION 1: 01 Wireframe -> 02 Structure =================
      tl.to(
        l1,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.2
      );

      tl.fromTo(
        l2,
        { opacity: 0, scale: 0.995 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.inOut" },
        0.2
      );

      // ================= TRANSITION 2: 02 Structure -> 03 Visual Design =================
      tl.to(
        l2,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.48
      );

      tl.fromTo(
        l3,
        { opacity: 0, scale: 0.995 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.inOut" },
        0.48
      );

      // ================= TRANSITION 3: 03 Visual Design -> 04 Final Website =================
      tl.to(
        l3,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.74
      );

      tl.fromTo(
        l4,
        { opacity: 0, scale: 0.995 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.inOut" },
        0.74
      );

      // Golden horizon ambient bloom illuminates in Stage 04
      if (glow) {
        tl.to(
          glow,
          {
            opacity: 1,
            scale: 1.06,
            duration: 0.28,
            ease: "power2.out",
          },
          0.74
        );
      }

      // Browser border illuminates with signature golden accent
      tl.to(
        browser,
        {
          borderColor: "rgba(250, 180, 6, 0.4)",
          boxShadow:
            "0 30px 100px -20px rgba(0,0,0,0.95), 0 0 50px rgba(250,180,6,0.18)",
          duration: 0.28,
        },
        0.76
      );

      // ================= EXIT TRANSITION (Seamless Hand-off to Footer) =================
      if (header) {
        tl.to(
          header,
          {
            opacity: 0.25,
            y: -20,
            duration: 0.12,
            ease: "power1.out",
          },
          0.88
        );
      }

      tl.to(
        browser,
        {
          scale: 0.95,
          y: -25,
          opacity: 0.75,
          duration: 0.12,
          ease: "power1.out",
        },
        0.88
      );

      if (scrollHint) {
        tl.to(
          scrollHint,
          {
            opacity: 0,
            duration: 0.08,
            ease: "power1.out",
          },
          0.85
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Scroll-Driven Website Assembly Experience"
      className="relative w-full bg-[#040406] text-white"
      style={{ height: "3000px" }}
    >
      {/* Viewport Container with Generous Breathing Room (GSAP Pin Managed) */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden px-4 sm:px-8 py-5 sm:py-7 select-none"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full opacity-20 blur-[140px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(250,180,6,0.1) 0%, rgba(250,180,6,0.02) 45%, transparent 75%)",
            }}
          />
        </div>

        {/* ================= REFINED SECTION HEADER ================= */}
        <div
          ref={headerRef}
          className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center pt-1 sm:pt-2 shrink-0 will-change-transform"
        >
          {/* Confident, Strong Editorial Headline in Epilogue */}
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-white leading-tight">
            How a website becomes{" "}
            <span className="font-normal italic text-[#FAB406]">a flagship.</span>
          </h2>

          {/* Clean, Spacious 4-Stage Pill Dock */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-3 p-1.5 rounded-full border border-white/10 bg-[#0e0e14]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isPassed = activeStage > idx;

              return (
                <div
                  key={stage.number}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white font-medium shadow-[0_2px_10px_rgba(0,0,0,0.5)] border border-white/15"
                      : isPassed
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] sm:text-xs font-semibold ${
                      isActive ? "text-[#FAB406]" : isPassed ? "text-[#FAB406]/80" : "text-zinc-400"
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span className="tracking-wide">
                    {stage.label}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_#FAB406]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Minimal Dynamic Stage Caption */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] text-zinc-300 font-sans tracking-wide transition-all duration-300 h-5">
            {STAGES[activeStage].caption}
          </p>

          {/* Elegant Thin Progress Line */}
          <div className="mt-2.5 w-48 sm:w-64 h-[2px] rounded-full bg-white/10 overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-[#FAB406]/70 to-[#FAB406] transition-all duration-75"
              style={{ width: "25%" }}
            />
          </div>
        </div>

        {/* ================= CENTRAL WEBSITE MOCKUP (MAIN FOCUS) ================= */}
        <div className="relative z-10 w-full max-w-5xl xl:max-w-[1100px] mx-auto my-auto flex items-center justify-center px-2 sm:px-4">
          {/* Golden Horizon Bloom Behind Browser */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-3xl bg-gradient-to-t from-[#FAB406]/25 via-[#FAB406]/10 to-transparent blur-3xl opacity-0 transition-opacity will-change-transform"
          />

          {/* Browser Shell Frame with Balanced Proportions */}
          <div
            ref={browserRef}
            className="relative w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#08080d] shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 will-change-transform"
          >
            {/* Minimal Browser Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0c0d14] px-3.5 sm:px-5 py-2 sm:py-2.5">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/40" />
              </div>

              {/* Minimal Centered URL Address Pill */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 sm:px-5 py-1 text-[11px] sm:text-xs text-zinc-400">
                <Lock className="h-3 w-3 text-[#FAB406]" />
                <span ref={urlTextRef} className="font-mono text-zinc-300 tracking-tight">
                  blueprint.qdelta.digital/wireframe
                </span>
              </div>

              {/* Quality & Performance Pill */}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] animate-pulse" />
                <span className="hidden sm:inline">60 FPS</span>
              </div>
            </div>

            {/* ================= 4-STAGE BROWSER VIEWPORT ================= */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] min-h-[360px] sm:min-h-[420px] md:min-h-[460px] max-h-[58vh] overflow-hidden bg-[#050508]">
              {/* ----------------------------------------------------------------- */}
              {/* STAGE 01 • WIREFRAME (Clean architectural blueprint geometry)     */}
              {/* ----------------------------------------------------------------- */}
              <div
                ref={layer1Ref}
                className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-[#06070a]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              >
                {/* Wireframe Nav */}
                <div className="flex items-center justify-between border-b border-dashed border-zinc-700/60 pb-3">
                  <div className="h-5 w-20 border border-dashed border-zinc-600 rounded flex items-center justify-center">
                    <span className="font-mono text-[9px] text-zinc-400">[LOGO]</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-5">
                    <div className="h-2.5 w-14 bg-zinc-800/80 rounded" />
                    <div className="h-2.5 w-16 bg-zinc-800/80 rounded" />
                    <div className="h-2.5 w-14 bg-zinc-800/80 rounded" />
                  </div>
                  <div className="h-6 w-24 border border-dashed border-zinc-600 rounded-full flex items-center justify-center">
                    <span className="font-mono text-[9px] text-zinc-400">[BUTTON]</span>
                  </div>
                </div>

                {/* Wireframe Hero Composition */}
                <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-3.5">
                    <div className="h-4 w-32 border border-dashed border-zinc-700 rounded flex items-center px-2">
                      <span className="font-mono text-[9px] text-zinc-400">[BADGE]</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="h-7 sm:h-9 w-4/5 border border-dashed border-zinc-600 rounded bg-zinc-900/50" />
                      <div className="h-7 sm:h-9 w-3/5 border border-dashed border-zinc-600 rounded bg-zinc-900/50" />
                    </div>

                    <div className="space-y-1.5 pt-1 max-w-md">
                      <div className="h-2.5 w-full bg-zinc-800/60 rounded" />
                      <div className="h-2.5 w-4/5 bg-zinc-800/60 rounded" />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-8 w-28 border border-dashed border-zinc-500 rounded-full flex items-center justify-center">
                        <span className="font-mono text-[10px] text-zinc-400">[PRIMARY]</span>
                      </div>
                      <div className="h-8 w-24 border border-dashed border-zinc-700 rounded-full flex items-center justify-center">
                        <span className="font-mono text-[10px] text-zinc-400">[SECONDARY]</span>
                      </div>
                    </div>
                  </div>

                  {/* Blueprint Media Box with Cross */}
                  <div className="md:col-span-5 hidden md:flex aspect-[4/3] rounded-lg border border-dashed border-zinc-600 bg-zinc-900/30 flex-col items-center justify-center relative overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full stroke-zinc-800 stroke-[1]"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <line x1="0" y1="0" x2="100" y2="100" />
                      <line x1="100" y1="0" x2="0" y2="100" />
                    </svg>
                    <span className="relative z-10 font-mono text-[10px] text-zinc-400 bg-[#06070a] px-2 py-1 rounded border border-zinc-800">
                      [HERO MEDIA]
                    </span>
                  </div>
                </div>

                {/* Wireframe Bottom Grid */}
                <div className="grid grid-cols-3 gap-3 border-t border-dashed border-zinc-700/60 pt-3">
                  <div className="h-12 border border-dashed border-zinc-800 rounded p-2 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-400">[METRIC 01]</span>
                    <div className="h-2 w-16 bg-zinc-800/70 rounded" />
                  </div>
                  <div className="h-12 border border-dashed border-zinc-800 rounded p-2 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-400">[SPEED 02]</span>
                    <div className="h-2 w-16 bg-zinc-800/70 rounded" />
                  </div>
                  <div className="h-12 border border-dashed border-zinc-800 rounded p-2 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-400">[TECH 03]</span>
                    <div className="h-2 w-16 bg-zinc-800/70 rounded" />
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* STAGE 02 • STRUCTURE (Solid responsive containers & clean grid)   */}
              {/* ----------------------------------------------------------------- */}
              <div
                ref={layer2Ref}
                className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-[#07080d]"
              >
                {/* Structured Nav */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="h-5 w-24 bg-zinc-800 rounded flex items-center px-2">
                    <span className="font-mono text-[10px] text-zinc-300 tracking-wider">BRAND</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-zinc-400">
                    <span>Overview</span>
                    <span>Architecture</span>
                    <span>Inquire</span>
                  </div>
                  <div className="h-6 w-24 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-zinc-300">Action</span>
                  </div>
                </div>

                {/* Structured Layout Hierarchy */}
                <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-3.5">
                    <div className="h-5 w-32 rounded bg-zinc-800/90 flex items-center px-2">
                      <span className="font-mono text-[10px] text-zinc-300">LAYOUT SPEC</span>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="h-7 sm:h-9 w-4/5 rounded bg-zinc-800" />
                      <div className="h-7 sm:h-9 w-3/5 rounded bg-zinc-800" />
                    </div>

                    <div className="space-y-1.5 pt-1 max-w-md">
                      <div className="h-3 w-full bg-zinc-800/60 rounded" />
                      <div className="h-3 w-4/5 bg-zinc-800/60 rounded" />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-8 w-28 rounded-full bg-zinc-700 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-white">Button</span>
                      </div>
                      <div className="h-8 w-24 rounded-full border border-zinc-700 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-zinc-400">Secondary</span>
                      </div>
                    </div>
                  </div>

                  {/* Solid Media Container */}
                  <div className="md:col-span-5 hidden md:flex aspect-[4/3] rounded-xl border border-white/10 bg-[#0d0e16] flex-col items-center justify-center">
                    <Layers className="h-7 w-7 text-zinc-500 mb-2" />
                    <span className="font-mono text-[11px] text-zinc-400">Media Container Grid</span>
                  </div>
                </div>

                {/* Structured Cards */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
                  <div className="h-12 rounded border border-white/5 bg-[#0b0c12] p-2 flex flex-col justify-between">
                    <span className="font-mono text-[10px] text-zinc-400">Container 01</span>
                    <div className="h-2 w-20 bg-zinc-800 rounded" />
                  </div>
                  <div className="h-12 rounded border border-white/5 bg-[#0b0c12] p-2 flex flex-col justify-between">
                    <span className="font-mono text-[10px] text-zinc-400">Container 02</span>
                    <div className="h-2 w-20 bg-zinc-800 rounded" />
                  </div>
                  <div className="h-12 rounded border border-white/5 bg-[#0b0c12] p-2 flex flex-col justify-between">
                    <span className="font-mono text-[10px] text-zinc-400">Container 03</span>
                    <div className="h-2 w-20 bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* STAGE 03 • VISUAL DESIGN (Epilogue Type, Obsidian & Golden Signal)*/}
              {/* ----------------------------------------------------------------- */}
              <div
                ref={layer3Ref}
                className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c0d16] via-[#06070a] to-[#040406]"
              >
                {/* Polished Editorial Nav */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold tracking-tight text-white text-sm sm:text-base">
                      ATELIER <span className="text-[#FAB406]">LUMIÈRE</span>
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 font-sans text-xs text-zinc-300">
                    <span className="hover:text-white transition-colors">Residences</span>
                    <span className="hover:text-white transition-colors">Architecture</span>
                    <span className="hover:text-white transition-colors">Philosophy</span>
                  </div>
                  <div className="h-6 px-3 rounded-full border border-[#FAB406]/35 bg-[#FAB406]/10 text-[#FAB406] flex items-center justify-center font-sans text-[11px] font-semibold">
                    Reserve
                  </div>
                </div>

                {/* Editorial Hero Content */}
                <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-3.5">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#FAB406]/30 bg-[#FAB406]/10 px-2.5 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406]" />
                      <span className="font-mono text-[10px] text-[#FAB406] uppercase tracking-wider font-semibold">
                        Bespoke Architectural Flagship
                      </span>
                    </div>

                    <h3 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-semibold text-white tracking-tight leading-tight">
                      Spaces Defined by Light,{" "}
                      <span className="italic font-normal text-[#FAB406]">Form,</span> and Purpose.
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                      We curate architectural masterworks that transcend ordinary living,
                      bridging visionary design with sensory perfection.
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-8 px-4 rounded-full bg-[#FAB406] text-black flex items-center justify-center font-sans text-xs font-semibold shadow-[0_0_20px_rgba(250,180,6,0.35)]">
                        Explore Collection
                      </div>
                      <div className="h-8 px-3.5 rounded-full border border-white/20 bg-white/[0.04] text-zinc-200 flex items-center justify-center font-sans text-xs backdrop-blur-md">
                        View Portfolio
                      </div>
                    </div>
                  </div>

                  {/* Obsidian Glass Preview Card */}
                  <div className="md:col-span-5 hidden md:flex aspect-[4/3] rounded-xl border border-[#FAB406]/20 bg-gradient-to-tr from-[#FAB406]/10 to-transparent flex-col items-center justify-center p-4 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <Layers className="h-8 w-8 text-[#FAB406] mb-2" />
                    <span className="font-sans text-xs font-semibold text-white">
                      Obsidian & Gold Design System
                    </span>
                    <span className="font-sans text-[11px] text-zinc-400 mt-1">
                      Epilogue Typography & Contrast Applied
                    </span>
                  </div>
                </div>

                {/* Glass Metrics Cards */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
                  <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between">
                    <span className="font-sans text-[10px] text-zinc-400">Conversion Yield</span>
                    <span className="font-sans text-sm font-bold text-[#FAB406]">+240% Growth</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between">
                    <span className="font-sans text-[10px] text-zinc-400">Core Web Vitals</span>
                    <span className="font-sans text-sm font-bold text-white">0.4s Fast LCP</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between">
                    <span className="font-sans text-[10px] text-zinc-400">Tech Foundation</span>
                    <span className="font-sans text-sm font-bold text-white">Next.js 16 + GSAP</span>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* STAGE 04 • FINAL WEBSITE (High-Res Imagery, Interactive Polish)   */}
              {/* ----------------------------------------------------------------- */}
              <div
                ref={layer4Ref}
                className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0c0d16] via-[#06070a] to-[#040406]"
              >
                {/* Live Polished Navigation */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold tracking-tight text-white text-sm sm:text-base flex items-center gap-1.5">
                      ATELIER <span className="text-[#FAB406]">LUMIÈRE</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_#FAB406]" />
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 font-sans text-xs font-medium text-zinc-300">
                    <span className="hover:text-white transition-colors">Residences</span>
                    <span className="hover:text-white transition-colors">Architecture</span>
                    <span className="hover:text-white transition-colors">Philosophy</span>
                  </div>
                  <div className="h-7 px-3.5 rounded-full bg-white text-black hover:bg-[#FAB406] transition-colors flex items-center justify-center font-sans text-xs font-semibold shadow-sm">
                    <span>Reserve Residence</span>
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Finished Hero with High-Impact Imagery */}
                <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-7 space-y-3.5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#FAB406]/35 bg-[#FAB406]/10 px-3 py-1 shadow-[0_0_15px_rgba(250,180,6,0.15)]">
                      <Zap className="h-3 w-3 text-[#FAB406]" />
                      <span className="font-mono text-[10px] text-[#FAB406] uppercase tracking-wider font-semibold">
                        Bespoke Digital Flagship • Live Release
                      </span>
                    </div>

                    <h3 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-white tracking-tight leading-[1.12]">
                      Spaces Defined by Light,{" "}
                      <span className="italic font-normal text-[#FAB406]">Form,</span> and Purpose.
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md">
                      We curate architectural masterworks that transcend ordinary living,
                      bridging visionary design with sensory perfection.
                    </p>

                    <div className="flex items-center gap-3 pt-1 relative">
                      <div className="group inline-flex items-center gap-1.5 rounded-full bg-[#FAB406] px-4 py-2 text-xs font-semibold text-black shadow-[0_0_24px_rgba(250,180,6,0.45)] transition-all hover:scale-105">
                        <span>Explore Collection</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>

                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-3.5 py-2 text-xs font-medium text-white shadow-sm backdrop-blur-md">
                        <span>View Portfolio</span>
                      </div>

                      {/* Interactive Collaboration Cursor */}
                      <div className="absolute -bottom-6 left-32 hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-black px-2.5 py-0.5 text-[10px] font-semibold shadow-lg">
                        <MousePointer2 className="h-2.5 w-2.5 fill-black" />
                        <span>Conversion Lead</span>
                      </div>
                    </div>
                  </div>

                  {/* High-Resolution Luxury Architectural Imagery */}
                  <div className="md:col-span-5 hidden md:block relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.85)] group">
                    <Image
                      src="/images/showcase-stage3.jpg"
                      alt="Atelier Lumiere Architectural Flagship"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="font-medium bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        Villa Blanche • Lake Como
                      </span>
                      <span className="font-mono text-[#FAB406] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        2026 Inquire
                      </span>
                    </div>
                  </div>
                </div>

                {/* Polished Glass Metrics Footer */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="block font-sans text-[10px] text-zinc-400">Conversion Rate</span>
                      <span className="font-sans text-sm font-bold text-[#FAB406]">+240% Growth</span>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-[#FAB406] hidden sm:block" />
                  </div>
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="block font-sans text-[10px] text-zinc-400">LCP Fast Load</span>
                      <span className="font-sans text-sm font-bold text-white">0.4s Ultra-Fast</span>
                    </div>
                    <Zap className="h-4 w-4 text-emerald-400 hidden sm:block" />
                  </div>
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="block font-sans text-[10px] text-zinc-400">Tech Foundation</span>
                      <span className="font-sans text-sm font-bold text-white">Next.js 16 + GSAP</span>
                    </div>
                    <Layers className="h-4 w-4 text-[#FAB406] hidden sm:block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Horizon Breadcrumb */}
        <div
          ref={scrollHintRef}
          className="relative z-20 flex items-center justify-center gap-2 pb-1 text-zinc-400 font-mono text-[11px] sm:text-xs transition-opacity"
        >
          <span>Scroll to assemble</span>
          <span className="inline-block animate-bounce">↓</span>
        </div>
      </div>

      {/* Atmospheric Bottom Gradient Mask (Seamless Hand-off to Footer) */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent z-30" />
    </section>
  );
}
