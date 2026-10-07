"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import InteractiveDotGrid from "@/components/ui/InteractiveDotGrid";
import PlanetSurfaceRevolution from "@/components/ui/PlanetSurfaceRevolution";
import ChamferButton from "@/components/ui/ChamferButton";
import HeroTypewriterHeadline from "@/components/sections/HeroTypewriterHeadline";

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const handleTypingDone = useCallback(() => setIsTypingDone(true), []);

  // Subtle parallax for background (paused when hero is off-screen)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroEl = heroSectionRef.current;
    if (!heroEl) return;

    let rafId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(heroEl);

    const applyParallax = (mx: number, my: number) => {
      if (!heroBgRef.current) return;
      heroBgRef.current.style.setProperty("--hero-mx", `${-mx * 8}px`);
      heroBgRef.current.style.setProperty("--hero-mx-halo", `${-mx * 14}px`);
      heroBgRef.current.style.setProperty("--hero-my-halo", `${-my * 10}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!isVisible || !heroBgRef.current) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mx = Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX));
        const my = Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY));
        applyParallax(mx, my);
      });
    };

    const handleMouseLeave = () => {
      if (!isVisible) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyParallax(0, 0);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative w-full h-[clamp(620px,86svh,760px)] md:h-[calc(100dvh-48px)] min-h-[620px] overflow-hidden bg-[#06070A] text-white flex flex-col justify-between pt-12 md:pt-16 lg:pt-20"
    >
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div ref={heroBgRef} className="pointer-events-none absolute inset-0 z-0">
        {/* Interactive Dot Matrix Grid: Spreads out on mouse hover strictly above the horizon line */}
        <InteractiveDotGrid />

        {/* Ambient Top Edge Light Gradient (soft & subtle parallax) */}
        <div
          className="absolute -top-20 inset-x-0 h-64 pointer-events-none transition-transform duration-700 ease-out will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse 75% 100% at 50% 0%, rgba(229, 181, 40,0.09) 0%, rgba(229, 181, 40,0.02) 50%, transparent 80%)",
            transform: "translate3d(var(--hero-mx, 0px), 0, 0)",
          }}
        />

        {/* Ambient Top Center Warm Halo (gentle depth parallax) */}
        <div
          className="absolute -top-28 left-1/2 h-[20rem] w-[46rem] rounded-full bg-gradient-to-b from-[#E5B528]/10 via-[#E5B528]/[0.02] to-transparent blur-[72px] pointer-events-none transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: "translate3d(calc(-50% + var(--hero-mx-halo, 0px)), var(--hero-my-halo, 0px), 0)",
          }}
        />
      </div>

      {/* ================= CELESTIAL HORIZON ARC ================= */}
      <div className="hero-horizon-wrapper pointer-events-none absolute left-0 right-0 bottom-0 top-0 z-10 overflow-hidden">
        <svg
          suppressHydrationWarning
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hero-horizon absolute left-1/2 -translate-x-1/2 origin-bottom w-[260vw] h-[115vw] bottom-0 sm:w-[200vw] sm:h-[95vw] sm:bottom-0 md:w-[160vw] md:h-[65vh] md:bottom-0 lg:w-full lg:h-full lg:bottom-0"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Atmospheric rim glow filter (radiant golden corona) */}
            <filter id="horizon-glow-atmospheric" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="6.0" result="blur" />
            </filter>

            {/* Tight halo glow filter */}
            <filter id="horizon-glow-tight" x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
            </filter>

            {/* Core radiant laser beam gradient with crisp pinpoint center */}
            <linearGradient id="horizon-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="46%" stopColor="#FFF0C8" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFF6E0" stopOpacity="0.92" />
              <stop offset="54%" stopColor="#FFF0C8" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.4" />
            </linearGradient>

            {/* Atmospheric corona gradient: luminous gold hugging the top outline */}
            <linearGradient id="horizon-corona-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0" />
              <stop offset="20%" stopColor="#FAB406" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#FAB406" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0" />
            </linearGradient>

            {/* Tight, refined outer halo gradient in pure gold (no pale bleaching) */}
            <linearGradient id="horizon-halo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#FAB406" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.82" />
              <stop offset="75%" stopColor="#FAB406" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.15" />
            </linearGradient>

            {/* Rich Gold Surface: Slightly deeper tone for richer body and contrast */}
            <linearGradient id="horizon-underglow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EFA902" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#E9A300" stopOpacity="0.92" />
              <stop offset="60%" stopColor="#DF9800" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#D28C00" stopOpacity="0.84" />
            </linearGradient>

            {/* Strict clipping mask ensuring the rotating surface lines never leak outside the arc */}
            <clipPath id="horizon-surface-clip">
              <path d="M -15 1000 Q 500 520 1015 1000 L 1015 1005 L -15 1005 Z" />
            </clipPath>
          </defs>

          {/* ================= 1. INNER GLOW & SURFACE (CLEAN & SEAMLESS) ================= */}
          {/* Base Layer: Rich gold surface */}
          <path
            d="M -15 1000 Q 500 520 1015 1000 L 1015 1005 L -15 1005 Z"
            fill="url(#horizon-underglow)"
            className="transition-opacity duration-500 ease-out opacity-100"
          />

          {/* 3D Top Inset Bevel Shadow: Gives the top edge physical thickness and depth */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="rgba(140, 85, 0, 0.40)"
            strokeWidth="3.0"
            fill="none"
            clipPath="url(#horizon-surface-clip)"
            vectorEffect="non-scaling-stroke"
          />

          {/* Planet Surface Revolution: Clean, elegant golden wireframe grid */}
          <PlanetSurfaceRevolution />

          {/* ================= 2. LASER RIM & CORONA GLOW ================= */}
          {/* Atmospheric ambient golden corona glow radiating above the top outline */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-corona-gradient)"
            strokeWidth="8.0"
            filter="url(#horizon-glow-atmospheric)"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-300 ease-out"
          />

          {/* Tight vibrant halo glow */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-halo-gradient)"
            strokeWidth="3.5"
            filter="url(#horizon-glow-tight)"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-300 ease-out"
          />

          {/* Core crisp laser rim line */}
          <path
            d="M -15 1000 Q 500 520 1015 1000"
            stroke="url(#horizon-beam-gradient)"
            strokeWidth="2.0"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-300 ease-out"
          />
        </svg>
      </div>

      {/* ================= HERO MAIN CONTENT (CENTERED & BALANCED) ================= */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center -translate-y-8 sm:-translate-y-10 md:-translate-y-16 lg:-translate-y-20">
        <HeroTypewriterHeadline
          shouldReduceMotion={shouldReduceMotion}
          onTypingDone={handleTypingDone}
        />

        {/* Subheadline (Appears smoothly only after typewriter finishes) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isTypingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5 max-w-xl sm:max-w-2xl mx-auto text-pretty text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-300 font-epilogue font-normal px-4 sm:px-0"
        >
          We build websites that make your brand stand out, connect with your audience, and help your business grow.
        </motion.p>

        {/* Action Buttons (Revealed after subheadline with a soft stagger) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isTypingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 font-epilogue"
        >
          {/* Secondary CTA: Explore Our Work */}
          <ChamferButton href="#projects" variant="outline">
            <span>Explore Our Work</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ChamferButton>

          {/* Primary CTA: Let's Talk */}
          <ChamferButton href="#contact" variant="primary">
            <span>Let’s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ChamferButton>
        </motion.div>
      </div>
    </section>
  );
}
