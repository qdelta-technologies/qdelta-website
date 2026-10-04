"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import InteractiveDotGrid from "@/components/ui/InteractiveDotGrid";
import PlanetSurfaceRevolution from "@/components/ui/PlanetSurfaceRevolution";
import ChamferButton from "@/components/ui/ChamferButton";

const LINE_1 = "Designed to be remembered.";
const LINE_2 = "Built to perform.";
const TOTAL_TYPING_LENGTH = LINE_1.length + LINE_2.length; // 26 + 17 = 43
// LINE 1: "Designed to be " (0..15 white), "remembered." (15..26 gold)
// LINE 2: "Built" (0..5 gold), " to perform." (5..17 white)

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Subtle Parallax depth for background and ambient lighting
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

  // Cinematic Typewriter Effect with natural cadence across two lines
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedCount(TOTAL_TYPING_LENGTH);
      setIsTypingDone(true);
      setCursorVisible(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let currentIdx = 0;

    const typeNextChar = () => {
      if (currentIdx < TOTAL_TYPING_LENGTH) {
        currentIdx++;
        setDisplayedCount(currentIdx);

        // Controlled, natural pacing with an intentional pause after Line 1
        let delay = 38;
        if (currentIdx === LINE_1.length) {
          // Pause after Line 1 ("Designed to be remembered.")
          delay = 260;
        } else if (currentIdx === LINE_1.length + 5) {
          // Brief breath after "Built"
          delay = 100;
        }

        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingDone(true);
        // Softly fade out cursor after typewriter completes
        timeoutId = setTimeout(() => {
          setCursorVisible(false);
        }, 700);
      }
    };

    // Soft entrance delay before typing starts
    timeoutId = setTimeout(typeNextChar, 320);

    return () => clearTimeout(timeoutId);
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      className="relative w-full h-[clamp(620px,86svh,760px)] md:h-[calc(100dvh-48px)] min-h-[620px] overflow-hidden bg-[#06070A] text-white flex flex-col justify-between pt-12 md:pt-16 lg:pt-20"
    >
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Interactive Dot Matrix Grid: Spreads out on mouse hover strictly above the horizon line */}
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
              <stop offset="46%" stopColor="#FFF8D6" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="54%" stopColor="#FFF8D6" stopOpacity="1" />
              <stop offset="75%" stopColor="#FAB406" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0.4" />
            </linearGradient>

            {/* Atmospheric corona gradient: luminous gold hugging the top outline */}
            <linearGradient id="horizon-corona-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0" />
              <stop offset="20%" stopColor="#FAB406" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#FAB406" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FAB406" stopOpacity="0" />
            </linearGradient>

            {/* Tight, refined outer halo gradient in pure gold (no pale bleaching) */}
            <linearGradient id="horizon-halo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAB406" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#FAB406" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#FAB406" stopOpacity="0.85" />
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
        {/* Main Headline (Two Distinct Lines with Floating Diagonal Annotation Capsules) */}
        <h1
          className="relative z-10 flex flex-col items-center text-center font-excon font-bold tracking-tight text-white text-2xl min-[400px]:text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] xl:text-[52px] 2xl:text-[56px] leading-[1.18] sm:leading-[1.14] transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 2.5}px, ${mousePos.y * 1.5}px, 0)`,
          }}
        >
          {/* Screen reader accessibility */}
          <span className="sr-only">Designed to be remembered. Built to perform.</span>

          {/* Visual Two-Line Presentation */}
          <div aria-hidden="true" className="flex flex-col items-center gap-1 sm:gap-2">
            
            {/* LINE 01: Designed to be remembered. */}
            <div className="relative inline-block mx-auto px-1 sm:px-2">
              {/* CURSOR 01: Strategy & Design (Upwards of 'Designed', top-left - Appears after subtagline) */}
              <motion.div
                initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                animate={
                  isTypingDone
                    ? shouldReduceMotion
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 1, y: [0, -3, 0], filter: "blur(0px)" }
                    : { opacity: 0, y: -6, filter: "blur(4px)" }
                }
                transition={{
                  opacity: { duration: 0.6, delay: 0.55 },
                  filter: { duration: 0.6, delay: 0.55 },
                  y: isTypingDone && !shouldReduceMotion
                    ? {
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.15,
                      }
                    : { duration: 0.5, delay: 0.55 },
                }}
                className="pointer-events-none select-none z-20 absolute -top-8 sm:-top-9 md:-top-10 -left-2 min-[440px]:-left-5 sm:-left-10 md:-left-14 flex items-center gap-2 scale-[0.75] min-[420px]:scale-[0.85] sm:scale-[0.9] lg:scale-100 origin-bottom-left"
              >
                {/* Round Pill Capsule with White Borders & Transparent Black Background */}
                <div className="relative flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-black/60 px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] shrink-0 animate-pulse" />
                  <span className="whitespace-nowrap font-medium text-white">Strategy & Design</span>
                </div>

                {/* Crisp 27px Cursor Arrow (White) */}
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                  style={{
                    transform: "rotate(170deg)",
                  }}
                >
                  <path
                    d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
                    fill="currentColor"
                    stroke="#050315"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Line 1 Content */}
              <span>
                {Math.min(displayedCount, LINE_1.length) <= 12 ? (
                  <span className="text-[#F5F5F7]">{LINE_1.slice(0, Math.min(displayedCount, LINE_1.length))}</span>
                ) : (
                  <>
                    <span className="text-[#F5F5F7]">{LINE_1.slice(0, 12)}</span>
                    <span className="text-[#FAB406]">{LINE_1.slice(12, Math.min(displayedCount, LINE_1.length))}</span>
                  </>
                )}
                {displayedCount <= LINE_1.length && !isTypingDone && (
                  <span
                    className={`inline-block w-[2.5px] h-[0.78em] align-middle bg-[#FAB406] ml-1.5 rounded-full shadow-[0_0_10px_rgba(250,180,6,0.6)] transition-opacity duration-300 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </span>
            </div>

            {/* LINE 02: Built to perform. */}
            <div className="relative inline-block mx-auto px-1 sm:px-2 mt-0.5 sm:mt-1">
              {/* Line 2 Content */}
              <span>
                {Math.max(0, displayedCount - LINE_1.length) > 0 ? (
                  Math.max(0, displayedCount - LINE_1.length) <= 9 ? (
                    <span className="text-[#FAB406]">{LINE_2.slice(0, Math.max(0, displayedCount - LINE_1.length))}</span>
                  ) : (
                    <>
                      <span className="text-[#FAB406]">{LINE_2.slice(0, 9)}</span>
                      <span className="text-[#F5F5F7]">{LINE_2.slice(9, Math.max(0, displayedCount - LINE_1.length))}</span>
                    </>
                  )
                ) : (
                  <span className="invisible opacity-0 select-none" aria-hidden="true">
                    {LINE_2}
                  </span>
                )}
                {displayedCount > LINE_1.length && !isTypingDone && (
                  <span
                    className={`inline-block w-[2.5px] h-[0.78em] align-middle bg-[#FAB406] ml-1.5 rounded-full shadow-[0_0_10px_rgba(250,180,6,0.6)] transition-opacity duration-300 ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </span>

              {/* CURSOR 02: Development & Conversion (Placed cleanly on the right side of 'perform.' - Appears after subtagline) */}
              <motion.div
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={
                  isTypingDone
                    ? shouldReduceMotion
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 1, y: [0, 3, 0], filter: "blur(0px)" }
                    : { opacity: 0, y: 6, filter: "blur(4px)" }
                }
                transition={{
                  opacity: { duration: 0.6, delay: 0.72 },
                  filter: { duration: 0.6, delay: 0.72 },
                  y: isTypingDone && !shouldReduceMotion
                    ? {
                        duration: 4.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.35,
                      }
                    : { duration: 0.5, delay: 0.72 },
                }}
                className="pointer-events-none select-none z-20 absolute left-full ml-1.5 sm:ml-2.5 md:ml-3.5 bottom-0.5 sm:bottom-1 md:bottom-1.5 flex items-center gap-1.5 sm:gap-2 flex-row-reverse scale-[0.72] min-[440px]:scale-[0.82] sm:scale-[0.9] lg:scale-100 origin-left"
              >
                {/* Round Pill Capsule with White Borders & Transparent Black Background */}
                <div className="relative flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-black/60 px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] shrink-0 animate-pulse" />
                  <span className="whitespace-nowrap font-medium text-white">Development & Conversion</span>
                </div>

                {/* Crisp 27px Cursor Arrow (White) */}
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                  style={{
                    transform: "rotate(-10deg)",
                  }}
                >
                  <path
                    d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
                    fill="currentColor"
                    stroke="#050315"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

          </div>
        </h1>

        {/* Subheadline (Appears smoothly only after typewriter finishes) */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={
            isTypingDone
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 12, filter: "blur(6px)" }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 max-w-xl sm:max-w-2xl mx-auto text-pretty text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-300 font-epilogue font-normal px-4 sm:px-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1}px, 0)`,
          }}
        >
          We build websites that make your brand stand out, connect with your audience, and help your business grow.
        </motion.p>

        {/* Action Buttons (Revealed after subheadline with a soft stagger) */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={
            isTypingDone
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 12, filter: "blur(6px)" }
          }
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4 font-epilogue transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate3d(${mousePos.x * 1}px, ${mousePos.y * 0.7}px, 0)`,
          }}
        >
          {/* Primary CTA: Let's Talk */}
          <ChamferButton href="#contact" variant="primary">
            <span>Let’s Talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ChamferButton>

          {/* Secondary CTA: Explore Our Work */}
          <ChamferButton href="#projects" variant="outline">
            <span>Explore Our Work</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ChamferButton>
        </motion.div>
      </div>
    </section>
  );
}
