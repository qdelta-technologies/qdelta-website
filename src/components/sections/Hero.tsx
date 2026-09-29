"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import {
  StrategyCursor,
  DevelopmentCursor,
  DesignCursor,
  ConversionCursor,
} from "@/components/ui/InteractiveHeroCursors";
import InteractiveDotGrid from "@/components/ui/InteractiveDotGrid";

const AstronautCanvas = dynamic(
  () => import("@/components/ui/AstronautCanvas"),
  { ssr: false }
);

export default function Hero() {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleCursorHover = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean; name: string }>;
      if (customEvent.detail?.active) {
        setHoveredTag(customEvent.detail.name);
      } else {
        setHoveredTag(null);
      }
    };

    window.addEventListener("qdelta-cursor-hover", handleCursorHover);
    return () => window.removeEventListener("qdelta-cursor-hover", handleCursorHover);
  }, []);

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

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: 0, y: 0 });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full h-[calc(100dvh-44px)] sm:h-[calc(100dvh-48px)] min-h-[520px] overflow-hidden bg-[#040406] text-white flex flex-col justify-between pt-16 sm:pt-20">
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Interactive Dot Matrix Grid: Spreads out on mouse hover strictly above the sun line */}
        <InteractiveDotGrid />

        {/* Ambient Top Edge Light Gradient (soft & subtle parallax) */}
        <div
          className="absolute -top-20 inset-x-0 h-64 pointer-events-none transition-transform duration-700 ease-out will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 75% 100% at 50% 0%, rgba(250,180,6,0.09) 0%, rgba(250,180,6,0.02) 50%, transparent 80%)",
            transform: `translate3d(${-mousePos.x * 8}px, 0, 0)`,
          }}
        />

        {/* Ambient Top Center Warm Halo (gentle depth parallax) */}
        <div
          className="absolute -top-28 left-1/2 h-[20rem] w-[46rem] rounded-full bg-gradient-to-b from-[#FAB406]/10 via-[#FAB406]/[0.02] to-transparent blur-[110px] pointer-events-none transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate3d(calc(-50% + ${-mousePos.x * 14}px), ${-mousePos.y * 10}px, 0)`,
          }}
        />

        {/* Ambient glow under the arc, gently softened at the outer corners only */}
        <div
          className={`absolute inset-x-0 bottom-0 h-48 sm:h-56 bg-gradient-to-t from-[#FAB406]/35 via-[#FAB406]/12 to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
            hoveredTag ? "opacity-100" : "opacity-80"
          }`}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 16%, black 84%, rgba(0,0,0,0.6) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 8%, black 16%, black 84%, rgba(0,0,0,0.6) 92%, transparent 100%)",
          }}
        />
      </div>

      {/* ================= CELESTIAL HORIZON ARC ================= */}
      {/*
        The horizon arc curves across the bottom corners of the Hero section,
        landing cleanly at the baseline before the separate TrustBar divider below.
      */}
      <div className="pointer-events-none absolute inset-0 z-10 w-full h-full overflow-hidden">
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Deep wide halo glow */}
            <filter id="horizon-glow-wide" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="22" result="blur" />
            </filter>

            {/* Tight bright laser halo */}
            <filter id="horizon-glow-tight" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="5.5" result="blur" />
            </filter>

            {/* Radiant gradient along the laser beam */}
            <linearGradient id="horizon-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.25" />
              <stop offset="10%" stopColor="#FAB406" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFFDEB" stopOpacity="1" />
              <stop offset="90%" stopColor="#FAB406" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.25" />
            </linearGradient>

            {/* Wide aura gradient with softened corners */}
            <linearGradient id="horizon-aura-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.1" />
              <stop offset="10%" stopColor="#FAB406" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.45" />
              <stop offset="90%" stopColor="#FAB406" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.1" />
            </linearGradient>

            {/* Tight halo gradient with slightly softened corners */}
            <linearGradient id="horizon-halo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.35" />
              <stop offset="8%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="92%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.35" />
            </linearGradient>

            {/* Bright, luminous vertical underglow inside the line */}
            <linearGradient id="horizon-underglow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.88" />
              <stop offset="8%" stopColor="#FAB406" stopOpacity="0.75" />
              <stop offset="32%" stopColor="#F59E0B" stopOpacity="0.55" />
              <stop offset="68%" stopColor="#E07A00" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0.22" />
            </linearGradient>
          </defs>

          {/* Filled Layer: Radiant, bright atmospheric underglow inside the arc */}
          <path
            d="M -15 1000 Q 500 520 1015 1000 L 1015 1005 L -15 1005 Z"
            fill="url(#horizon-underglow)"
            className="transition-opacity duration-500 ease-out"
            style={{ opacity: hoveredTag ? 1 : 0.92 }}
          />

          {/* Reactive Surge Aura when any tag is hovered */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-halo-gradient)"
            strokeWidth="30"
            filter="url(#horizon-glow-wide)"
            vectorEffect="non-scaling-stroke"
            className="transition-opacity duration-500 ease-out"
            style={{ opacity: hoveredTag ? 0.95 : 0 }}
          />

          {/* Layer 1: Wide Golden Aura (softened at corners) */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-aura-gradient)"
            strokeWidth="22"
            filter="url(#horizon-glow-wide)"
            vectorEffect="non-scaling-stroke"
          />

          {/* Layer 2: Tight Radiant Halo (softened at corners) */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-halo-gradient)"
            strokeWidth={hoveredTag ? "9" : "7"}
            filter="url(#horizon-glow-tight)"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-300 ease-out"
          />

          {/* Layer 3: Ultra-Crisp Core Laser Line */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-beam-gradient)"
            strokeWidth={hoveredTag ? "3.2" : "2.5"}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-300 ease-out"
          />
        </svg>
      </div>

      {/* ================= 3D ASTRONAUT STANDING ON GOLDEN HORIZON ================= */}
      <AstronautCanvas />

      {/* ================= HERO MAIN CONTENT (ELEVATED & PROPERLY ALIGNED) ================= */}
      <div className="relative z-20 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-3 sm:px-6 text-center -translate-y-6 sm:-translate-y-14 md:-translate-y-20 lg:-translate-y-26">
        {/* Main Headline with Interactive Figma Collaboration Cursors and subtle micro-tilt/drift */}
        <h1
          className="relative z-10 text-balance font-extrabold italic tracking-[-0.03em] text-white text-[1.75rem] min-[380px]:text-[1.95rem] sm:text-[2.85rem] md:text-[3.75rem] lg:text-[4.5rem] leading-[1.12] sm:leading-[1.06] transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 5.5}px, ${mousePos.y * 3.8}px, 0) perspective(1000px) rotateX(${-mousePos.y * 1.2}deg) rotateY(${mousePos.x * 1.5}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Line 1: Built to speak. (Development is anchored directly next to the letter 'k') */}
          <span className="relative inline-block">
            <StrategyCursor />
            Built to speak.
            <DevelopmentCursor />
          </span>
          <br />
          {/* Line 2: Designed to work. */}
          <span className="relative inline-block">
            <DesignCursor />
            <span className="text-[#FAB406]">Designed</span> to work.
            <ConversionCursor />
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <p
          className="mt-3 sm:mt-5 max-w-xs sm:max-w-md md:max-w-xl mx-auto text-pretty text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-relaxed text-zinc-300 font-normal px-2 sm:px-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 3.2}px, ${mousePos.y * 2.2}px, 0)`,
          }}
        >
          We build websites that speak for your brand and work for your business—combining
          strategy, story, design and technology in one clear experience.
        </p>

        {/* Action Buttons */}
        <div
          className="mt-4.5 sm:mt-7 flex flex-row items-center justify-center gap-2 sm:gap-3.5 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 1.8}px, ${mousePos.y * 1.2}px, 0)`,
          }}
        >
          {/* Secondary Button (White outline & white text) */}
          <Link
            href="#work"
            className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/[0.04] px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/[0.08] hover:scale-[1.02]"
          >
            <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>Explore our work</span>
          </Link>

          {/* Primary Button (Yellow fill with white hover state) */}
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FAB406] px-3.5 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-semibold text-black shadow-[0_0_20px_rgba(250,180,6,0.4)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.45)] hover:scale-[1.02]"
          >
            <span>Start a project</span>
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
