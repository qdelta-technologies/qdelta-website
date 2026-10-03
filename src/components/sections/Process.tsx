"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  Sparkles,
  Rocket,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, audience, goals and project requirements before anything begins.",
    icon: Compass,
    accentColor: "#FAB406",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the structure, scope, content direction and the right approach for the project.",
    icon: Layers,
    accentColor: "#FAB406",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "We turn the strategy into a polished digital experience through thoughtful design, development and interactions.",
    icon: Sparkles,
    accentColor: "#FAB406",
  },
  {
    number: "04",
    title: "Refine & Launch",
    description:
      "We review, test and improve the project before preparing everything for a smooth launch.",
    icon: Rocket,
    accentColor: "#FAB406",
  },
  {
    number: "05",
    title: "Support & Grow",
    description:
      "After launch, we provide agreed support and can continue with maintenance and improvements as needed.",
    icon: TrendingUp,
    accentColor: "#FAB406",
  },
];

// Number of steps
const TOTAL_STEPS = STEPS.length; // 5

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // activeStep is 0-based. -1 = section not yet visible.
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveStep(TOTAL_STEPS - 1);
      return;
    }

    const section = containerRef.current;
    if (!section) return;

    let rafId: number | null = null;

    const computeStep = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const stickyRange = sectionHeight - viewportHeight;

      const scrolledInto = Math.max(0, -rect.top);
      const progress = Math.min(scrolledInto / stickyRange, 1);

      const rawStep = Math.floor(progress * TOTAL_STEPS);
      const step = Math.min(rawStep, TOTAL_STEPS - 1);

      setActiveStep(step);
    };

    // Throttle to one update per animation frame — prevents mid-frame jitter
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        computeStep();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    computeStep();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  // Hovering temporarily spotlights a card but doesn't change the scroll-driven step
  const effectiveActive = hoveredIndex !== null ? hoveredIndex : activeStep;

  // Horizontal rail progress: map activeStep to percentage across the 5 column positions
  const railPercent = ((activeStep / (TOTAL_STEPS - 1)) * 80) + 10; // 10% → 90%

  const getStepStatus = (index: number) => {
    if (shouldReduceMotion) return "active";
    if (index === effectiveActive) return "active";
    if (index < effectiveActive) return "completed";
    return "inactive";
  };

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative z-20 w-full bg-[#06070A] text-white selection:bg-[#F5B800] selection:text-[#06070A] lg:h-[600vh]"
    >
      {/* ========================================================================= */}
      {/* PINNED STICKY STAGE — locks in viewport while all 5 steps are walked through */}
      {/* ========================================================================= */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden py-16 sm:py-20 lg:py-0">
        {/* Ambient Atmosphere */}
        <SectionAtmosphere variant="dual" />

        <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          {/* ======================================================= */}
          {/* SECTION HEADER                                          */}
          {/* ======================================================= */}
          <div className="flex flex-col items-center text-center mb-6 lg:mb-8 max-w-3xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 select-none justify-center">
              <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400">
                03 / How We Work
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-epilogue text-xs tracking-[0.15em] uppercase font-semibold text-[#FAB406] transition-colors duration-300">
                Step 0{Math.min(activeStep + 1, TOTAL_STEPS)} of 0{TOTAL_STEPS}
              </span>
              <div className="w-8 sm:w-10 h-[1px] bg-[#FAB406]/60" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-excon font-bold tracking-tight text-white leading-[1.14] text-balance">
              A structured path from concept to launch.
            </h2>

            <p className="mt-2 text-xs sm:text-sm md:text-base font-epilogue text-zinc-400 font-normal leading-relaxed text-balance max-w-2xl">
              A transparent, milestone-driven workflow that eliminates friction and turns complex requirements into high-performing websites.
            </p>
          </div>

          {/* ======================================================= */}
          {/* DESKTOP VIEW: HORIZONTAL ALTERNATING PROCESS RAIL       */}
          {/* ======================================================= */}
          <div className="hidden lg:block relative w-full mb-6 lg:mb-8 select-none">
            <div className="relative w-full min-h-[460px] lg:min-h-[480px] flex flex-col justify-between">

              {/* Central Glowing Horizon Rail */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] z-0 pointer-events-none">
                {/* Neutral background rail */}
                <div className="w-full h-full bg-white/[0.08]" />

                {/* Yellow illuminated progress trace */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FAB406]/50 via-[#FAB406] to-[#FAB406] shadow-[0_0_10px_rgba(250,180,6,0.5)]"
                  animate={{ width: `${railPercent}%` }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Leading glow bead */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FAB406] shadow-[0_0_8px_#FAB406]" />
                </motion.div>
              </div>

              {/* 5-Column Grid */}
              <div className="relative z-10 grid grid-cols-5 gap-4 w-full h-full items-center">
                {STEPS.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isAbove = idx % 2 === 0; // Steps 1, 3, 5 above rail; Steps 2, 4 below
                  const status = getStepStatus(idx);
                  const isActive = status === "active";
                  const isCompleted = status === "completed";
                  const isInactive = status === "inactive";

                  const cardClass = isActive
                    ? "border-[#FAB406]/60 bg-[#0E1217]/95 shadow-[0_16px_40px_rgba(250,180,6,0.14),0_0_24px_rgba(250,180,6,0.08)]"
                    : isCompleted
                    ? "border-white/[0.12] bg-[#0B0E12]/85 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                    : "border-white/[0.05] bg-[#080A0D]/60 shadow-none pointer-events-none";

                  const hairlineClass = isActive
                    ? "bg-gradient-to-r from-transparent via-[#FAB406]/90 to-transparent"
                    : isCompleted
                    ? "bg-gradient-to-r from-transparent via-[#FAB406]/35 to-transparent"
                    : "bg-transparent";

                  const stepLabelClass = isActive
                    ? "text-[#FAB406]"
                    : isCompleted
                    ? "text-[#FAB406]/65"
                    : "text-zinc-600";

                  const iconBgClass = isActive
                    ? "bg-[#FAB406]/15 text-[#FAB406] ring-1 ring-[#FAB406]/40 shadow-[0_0_12px_rgba(250,180,6,0.3)]"
                    : isCompleted
                    ? "bg-white/[0.05] text-zinc-400"
                    : "bg-white/[0.02] text-zinc-700";

                  const titleClass = isActive
                    ? "text-white"
                    : isCompleted
                    ? "text-zinc-200"
                    : "text-zinc-600";

                  const descClass = isActive
                    ? "text-zinc-200"
                    : isCompleted
                    ? "text-zinc-500"
                    : "text-zinc-700";

                  const connectorClass = isActive
                    ? "opacity-100"
                    : isCompleted
                    ? "opacity-70"
                    : "opacity-20";

                  return (
                    <div
                      key={step.number}
                      className="relative flex flex-col items-center justify-center h-full"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* TOP CARD (Steps 01, 03, 05) */}
                      {isAbove ? (
                        <div className="flex flex-col items-center mb-auto pt-1">
                          <motion.div
                            animate={{
                              opacity: isActive ? 1 : isCompleted ? 0.88 : 0.18,
                              y: isInactive ? -10 : 0,
                              scale: isActive ? 1 : isCompleted ? 0.99 : 0.97,
                              filter: isInactive ? "blur(2px)" : "blur(0px)",
                            }}
                            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: isActive ? 0.05 : 0 }}
                            className={`relative overflow-hidden w-full max-w-[240px] rounded-xl border backdrop-blur-xl p-5 ${cardClass}`}
                          >
                            <div className={`pointer-events-none absolute top-0 inset-x-4 h-[1px] ${hairlineClass}`} />
                            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                              <span className={`font-epilogue text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${stepLabelClass}`}>
                                STEP {step.number}
                              </span>
                              <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${iconBgClass}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                            </div>
                            <h3 className={`mt-3 font-epilogue text-base font-bold tracking-tight leading-snug transition-colors duration-300 ${titleClass}`}>
                              {step.title}
                            </h3>
                            <p className={`mt-1.5 font-epilogue text-[11.5px] sm:text-xs leading-relaxed font-normal transition-colors duration-300 ${descClass}`}>
                              {step.description}
                            </p>
                          </motion.div>

                          {/* Vertical Connector */}
                          <motion.div
                            animate={{ opacity: isActive ? 1 : isCompleted ? 0.7 : 0.18 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className={`w-[1.5px] h-8 ${
                              isActive
                                ? "bg-gradient-to-b from-[#FAB406]/50 to-[#FAB406]"
                                : isCompleted
                                ? "bg-[#FAB406]/50"
                                : "bg-white/20"
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="h-[195px] w-full pointer-events-none" />
                      )}

                      {/* TIMELINE NODE */}
                      <div className="relative my-auto flex items-center justify-center z-20">
                        {/* Pulsing aura — active only */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.9, 1.45, 0.9], opacity: [0, 0.55, 0] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", repeatDelay: 0.2 }}
                            className="absolute w-12 h-12 rounded-full bg-[#FAB406]/18 blur-[6px] pointer-events-none"
                          />
                        )}
                        {/* Node circle */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#06070A] transition-all duration-500 ${
                          isActive
                            ? "border-[#FAB406] shadow-[0_0_16px_rgba(250,180,6,0.7)] scale-110"
                            : isCompleted
                            ? "border-[#FAB406]/80 shadow-[0_0_8px_rgba(250,180,6,0.3)]"
                            : "border-white/20 scale-95"
                        }`}>
                          <div className={`rounded-full transition-all duration-500 ${
                            isActive
                              ? "w-2.5 h-2.5 bg-[#FAB406] shadow-[0_0_6px_#FAB406]"
                              : isCompleted
                              ? "w-2 h-2 bg-[#FAB406]/80"
                              : "w-1.5 h-1.5 bg-white/25"
                          }`} />
                        </div>
                      </div>

                      {/* BOTTOM CARD (Steps 02, 04) */}
                      {!isAbove ? (
                        <div className="flex flex-col items-center mt-auto pb-1">
                          {/* Vertical Connector */}
                          <motion.div
                            animate={{ opacity: isActive ? 1 : isCompleted ? 0.7 : 0.18 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className={`w-[1.5px] h-8 ${
                              isActive
                                ? "bg-gradient-to-b from-[#FAB406] to-[#FAB406]/50"
                                : isCompleted
                                ? "bg-[#FAB406]/50"
                                : "bg-white/20"
                            }`}
                          />

                          <motion.div
                            animate={{
                              opacity: isActive ? 1 : isCompleted ? 0.88 : 0.18,
                              y: isInactive ? 10 : 0,
                              scale: isActive ? 1 : isCompleted ? 0.99 : 0.97,
                              filter: isInactive ? "blur(2px)" : "blur(0px)",
                            }}
                            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: isActive ? 0.05 : 0 }}
                            className={`relative overflow-hidden w-full max-w-[240px] rounded-xl border backdrop-blur-xl p-5 ${cardClass}`}
                          >
                            <div className={`pointer-events-none absolute top-0 inset-x-4 h-[1px] ${hairlineClass}`} />
                            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                              <span className={`font-epilogue text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${stepLabelClass}`}>
                                STEP {step.number}
                              </span>
                              <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${iconBgClass}`}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                            </div>
                            <h3 className={`mt-3 font-epilogue text-base font-bold tracking-tight leading-snug transition-colors duration-300 ${titleClass}`}>
                              {step.title}
                            </h3>
                            <p className={`mt-1.5 font-epilogue text-[11.5px] sm:text-xs leading-relaxed font-normal transition-colors duration-300 ${descClass}`}>
                              {step.description}
                            </p>
                          </motion.div>
                        </div>
                      ) : (
                        <div className="h-[195px] w-full pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* MOBILE / TABLET VIEW: VERTICAL TIMELINE                 */}
          {/* ======================================================= */}
          <div className="lg:hidden relative w-full max-w-xl mx-auto pl-4 sm:pl-6 mb-8 select-none">
            {/* Vertical rail */}
            <div className="absolute left-[27px] sm:left-[35px] top-6 bottom-6 w-[2px]">
              <div className="w-full h-full bg-white/[0.08]" />
            </div>

            <div className="space-y-5 sm:space-y-6 relative">
              {STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const status = getStepStatus(idx);
                const isActive = status === "active";
                const isCompleted = status === "completed";

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 sm:gap-6"
                  >
                    {/* Glowing Timeline Node */}
                    <div className={`relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-2 bg-[#06070A] transition-all duration-300 mt-1 ${
                      isActive
                        ? "border-[#FAB406] shadow-[0_0_14px_rgba(250,180,6,0.65)]"
                        : isCompleted
                        ? "border-[#FAB406]/75 shadow-[0_0_8px_rgba(250,180,6,0.25)]"
                        : "border-white/20"
                    }`}>
                      <span className={`rounded-full transition-all duration-300 ${
                        isActive ? "h-2.5 w-2.5 bg-[#FAB406]" : isCompleted ? "h-2 w-2 bg-[#FAB406]/80" : "h-1.5 w-1.5 bg-white/30"
                      }`} />
                    </div>

                    {/* Card */}
                    <div className={`relative overflow-hidden flex-1 rounded-xl border backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 ${
                      isActive
                        ? "border-[#FAB406]/60 bg-[#0E1217]/95 shadow-[0_16px_40px_rgba(250,180,6,0.14)]"
                        : isCompleted
                        ? "border-white/[0.12] bg-[#0B0E12]/85"
                        : "border-white/[0.05] bg-[#080A0D]/60"
                    }`}>
                      <div className={`pointer-events-none absolute top-0 inset-x-4 h-[1px] ${
                        isActive ? "bg-gradient-to-r from-transparent via-[#FAB406]/90 to-transparent"
                          : isCompleted ? "bg-gradient-to-r from-transparent via-[#FAB406]/35 to-transparent"
                          : "bg-transparent"
                      }`} />
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                        <span className={`font-epilogue text-xs uppercase tracking-[0.2em] font-semibold ${
                          isActive ? "text-[#FAB406]" : isCompleted ? "text-[#FAB406]/65" : "text-zinc-600"
                        }`}>STEP {step.number}</span>
                        <div className={`flex h-6 w-6 items-center justify-center rounded transition-all duration-300 ${
                          isActive ? "bg-[#FAB406]/15 text-[#FAB406]" : isCompleted ? "bg-white/[0.04] text-zinc-400" : "bg-white/[0.02] text-zinc-700"
                        }`}>
                          <IconComponent className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <h3 className={`mt-2.5 font-epilogue text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-white" : isCompleted ? "text-zinc-200" : "text-zinc-600"
                      }`}>{step.title}</h3>
                      <p className={`mt-1.5 font-epilogue text-xs sm:text-sm leading-relaxed font-normal transition-colors duration-300 ${
                        isActive ? "text-zinc-200" : isCompleted ? "text-zinc-500" : "text-zinc-700"
                      }`}>{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ======================================================= */}
          {/* REASSURANCE FOOTNOTE & CTA BAR                         */}
          {/* ======================================================= */}
          <div className="w-full max-w-4xl rounded-xl border border-white/[0.07] bg-[#0B0E12]/80 backdrop-blur-md px-5 py-3 sm:px-7 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg">
            <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-epilogue">
              <ShieldCheck className="w-4 h-4 text-[#FAB406] shrink-0" />
              <span>Structured milestones • Transparent communication • Zero unexpected hurdles</span>
            </div>
            <Link
              href="#contact"
              className="group/cta inline-flex items-center gap-1.5 text-xs font-epilogue uppercase tracking-wider font-semibold text-[#FAB406] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <span>Ready to start? Let&apos;s discuss your project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
