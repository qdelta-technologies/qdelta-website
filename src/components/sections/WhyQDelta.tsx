"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Subtle Starfield / Particle Simulation (Echoing Hero Atmosphere)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // 38 tiny star-like glowing particles
    const starCount = 38;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.15,
      speedY: -(Math.random() * 0.15 + 0.05),
      speedX: (Math.random() - 0.5) * 0.08,
      pulseSpeed: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;
        star.alpha += Math.sin(Date.now() * 0.002 * star.pulseSpeed) * 0.008;

        if (star.y < 0) {
          star.y = height + 4;
          star.x = Math.random() * width;
        }
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        const currentAlpha = Math.max(0.1, Math.min(0.85, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 180, 6, ${currentAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#FAB406";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Micro-Parallax Mouse Movement
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePos({
          x: Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX)),
          y: Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY)),
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="why-qdelta"
      aria-label="Built for Business Growth — Strategic Value"
      className="relative z-20 w-full bg-[#040406] text-white py-20 sm:py-28 md:py-32 overflow-hidden selection:bg-[#FAB406] selection:text-black"
    >
      {/* ================= BACKGROUND ATMOSPHERE (HERO CONTINUATION) ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Top & Center Warm Golden Halos with Micro-Parallax */}
        <div
          className="absolute -top-32 left-1/2 h-[34rem] w-[58rem] rounded-full bg-radial from-[#FAB406]/[0.08] via-[#FAB406]/[0.02] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate3d(calc(-50% + ${-mousePos.x * 12}px), ${-mousePos.y * 8}px, 0)`,
          }}
        />
        <div
          className="absolute top-1/2 right-[-10%] h-[30rem] w-[45rem] rounded-full bg-radial from-[#FAB406]/[0.05] via-transparent to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate3d(${-mousePos.x * 8}px, ${-mousePos.y * 6}px, 0)`,
          }}
        />

        {/* Subtle Yellow Linear Architectural Grid across the COMPLETE section (Edge-to-Edge) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(250, 180, 6, 0.075) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(250, 180, 6, 0.075) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Tiny Glowing Starfield / Particle Simulation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-70"
        />


      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= 1. HEADER SECTION (EDITORIAL DIRECTION) ================= */}
        <div className="max-w-2xl">
          {/* Editorial Section Identifier (No container/capsule) */}
          <div className="flex items-center gap-3.5 mb-5 sm:mb-6 select-none">
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.24em] uppercase text-zinc-400 font-medium">
              01 / WHY IT MATTERS
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-[#FAB406]/60" />
            <svg
              className="w-2.5 h-2.5 text-[#FAB406] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* Main Headline — Clean, solid off-white, no gradients */}
          <h2 className="font-epilogue font-bold text-3xl sm:text-4xl md:text-[46px] text-white tracking-tight leading-[1.14]">
            Your website shapes perception.
          </h2>

          {/* Supporting Copy */}
          <p className="mt-4 sm:mt-5 font-excon text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
            We build digital experiences that make your business easier to understand, trust and choose.
          </p>
        </div>

        {/* ================= 2. COUNTER ROW (3 WIDE BOXES MATCHING EXACT HOVER AESTHETIC) ================= */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {COUNTERS.map((counter, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0c0d14] border border-[#FAB406]/40 px-6 py-4.5 sm:py-5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
              style={{
                transform: `translate3d(${mousePos.x * (idx + 1) * 0.8}px, ${
                  mousePos.y * (idx + 1) * 0.6
                }px, 0)`,
              }}
            >
              {/* Crisp Golden Top Accent Hairline (Directly from hover state) */}
              <div className="pointer-events-none absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#FAB406] to-transparent" />

              <div className="flex items-baseline justify-between gap-3">
                <span className="font-epilogue font-extrabold text-2xl sm:text-3xl text-[#FAB406] tracking-tight">
                  {counter.metric}
                </span>
                <span className="font-excon font-bold text-xs sm:text-[13px] text-zinc-200 tracking-tight text-right">
                  {counter.label}
                </span>
              </div>

              <p className="mt-2.5 font-excon text-xs text-zinc-400 leading-snug font-normal">
                {counter.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ================= 3. BENTO SPLIT SECTION (TWO PROMINENT CARDS ONLY) ================= */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* BENTO CARD 1 — Large Dark Story Card (7 Columns) */}
          <div
            className="lg:col-span-7 rounded-3xl bg-[#0c0d14] border border-[#FAB406]/40 p-7 sm:p-10 md:p-11 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
            style={{
              transform: `translate3d(${mousePos.x * 2.2}px, ${
                mousePos.y * 1.6
              }px, 0)`,
            }}
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#FAB406] to-transparent" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-88 h-88 rounded-full bg-[#FAB406]/[0.06] blur-[100px]" />

            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406]" />
                <span className="font-excon text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#FAB406]">
                  CONVERSION & VALUE
                </span>
              </div>

              <h3 className="font-epilogue font-bold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight leading-[1.18]">
                “Why premium websites matter.”
              </h3>

              <p className="mt-5 font-excon text-sm sm:text-base md:text-[16px] text-zinc-300 leading-relaxed font-normal max-w-xl">
                A website is not just an online presence. It shapes first
                impressions, builds trust, communicates value and helps turn
                attention into enquiries, leads and customers.
              </p>
            </div>

            {/* Strategic Value Pillars */}
            <div className="mt-8 pt-6 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-excon font-medium text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406]" />
                <span>First Impressions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406]" />
                <span>Authority & Trust</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406]" />
                <span>Lead Generation</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 2 — Yellow Contrast Card (5 Columns, Both Offerings Stacked) */}
          <div
            className="lg:col-span-5 rounded-3xl bg-[#FAB406] text-[#040406] p-7 sm:p-9 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_60px_rgba(250,180,6,0.22)] group transition-transform duration-300 hover:scale-[1.008]"
            style={{
              transform: `translate3d(${-mousePos.x * 2.2}px, ${
                mousePos.y * 1.6
              }px, 0)`,
            }}
          >
            {/* Subtle Texture Grain Over Golden Background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                backgroundSize: "8px 8px",
              }}
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-excon text-xs font-bold uppercase tracking-widest text-black/75">
                  CORE OFFERINGS
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-black group-hover:bg-black group-hover:text-[#FAB406] transition-colors duration-200">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              {/* 1. DIGITAL Offering */}
              <div className="space-y-1.5">
                <h4 className="font-epilogue font-black text-2xl sm:text-3xl text-black tracking-tight uppercase">
                  DIGITAL
                </h4>
                <p className="font-excon text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                  Conversion-focused landing pages and digital experiences.
                </p>
              </div>

              {/* Clean Architectural Divider */}
              <div className="my-5 sm:my-6 h-[1px] w-full bg-black/15" />

              {/* 2. SIGNATURE Offering */}
              <div className="space-y-1.5">
                <h4 className="font-epilogue font-black text-2xl sm:text-3xl text-black tracking-tight uppercase">
                  SIGNATURE
                </h4>
                <p className="font-excon text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                  Premium websites with stronger design, storytelling and
                  presence.
                </p>
              </div>
            </div>

            {/* Bottom Footer Assurance */}
            <div className="mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-excon font-bold text-black/90">
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
