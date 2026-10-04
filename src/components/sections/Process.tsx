"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Compass,
  Layers,
  Sparkles,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
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
    accentColor: "#E7B72A",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the structure, scope, content direction and the right approach for the project.",
    icon: Layers,
    accentColor: "#E7B72A",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "We turn the strategy into a polished digital experience through thoughtful design, development and interactions.",
    icon: Sparkles,
    accentColor: "#E7B72A",
  },
  {
    number: "04",
    title: "Refine & Launch",
    description:
      "We review, test and improve the project before preparing everything for a smooth launch.",
    icon: Rocket,
    accentColor: "#E7B72A",
  },
  {
    number: "05",
    title: "Support & Grow",
    description:
      "After launch, we provide agreed support and can continue with maintenance and improvements as needed.",
    icon: TrendingUp,
    accentColor: "#E7B72A",
  },
];

// Number of steps
const TOTAL_STEPS = STEPS.length; // 5

/** Progress reaches each node center; final step fills the full rail. */
function getDesktopRailPercent(activeStep: number) {
  if (activeStep >= TOTAL_STEPS - 1) return 100;
  return ((activeStep + 0.5) / TOTAL_STEPS) * 100;
}

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeStepRef = useRef(0);

  const [activeStep, setActiveStep] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const STEP_TRANSITION = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const };
  const STEP_REVEAL_DELAY = 0.06;

  const commitStep = (step: number) => {
    const clamped = Math.min(Math.max(0, step), TOTAL_STEPS - 1);
    if (clamped === activeStepRef.current) return;
    activeStepRef.current = clamped;
    setActiveStep(clamped);
  };

  const progressToStep = (progress: number) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const rawStep = Math.floor(clampedProgress * TOTAL_STEPS);
    return Math.min(rawStep, TOTAL_STEPS - 1);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    if (window.innerWidth < 1024) return;
    commitStep(progressToStep(latest));
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      activeStepRef.current = TOTAL_STEPS - 1;
      setActiveStep(TOTAL_STEPS - 1);
      return;
    }

    const desktopMq = window.matchMedia("(min-width: 1024px)");

    const syncDesktopStep = () => {
      if (!desktopMq.matches) return;
      commitStep(progressToStep(scrollYProgress.get()));
    };

    const onBreakpointChange = () => {
      if (desktopMq.matches) {
        syncDesktopStep();
      }
    };

    syncDesktopStep();
    desktopMq.addEventListener("change", onBreakpointChange);

    return () => {
      desktopMq.removeEventListener("change", onBreakpointChange);
    };
  }, [shouldReduceMotion, scrollYProgress]);

  const railPercent = getDesktopRailPercent(activeStep);

  const getStepStatus = (index: number) => {
    if (shouldReduceMotion) return "active";
    if (index === activeStep) return "active";
    if (index < activeStep) return "completed";
    return "inactive";
  };

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative z-20 w-full bg-[#06070A] text-white selection:bg-[#E7B72A] selection:text-[#06070A] lg:h-[600vh]"
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
              <span className="hidden lg:inline font-epilogue text-xs tracking-[0.15em] uppercase font-semibold text-[#E7B72A] transition-colors duration-300">
                Step 0{Math.min(activeStep + 1, TOTAL_STEPS)} of 0{TOTAL_STEPS}
              </span>
              <div className="hidden lg:block w-8 sm:w-10 h-[1px] bg-[#E7B72A]/60" />
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[40px] font-excon font-bold tracking-tight text-white leading-[1.14] text-balance">
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
            <div className="relative w-full min-h-[480px]">

              {/* Full-width baseline + progress (behind nodes) */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-1/2 z-[1] h-[2px] -translate-y-1/2"
                aria-hidden
              >
                <div className="h-full w-full bg-white/[0.08]" />
                <motion.div
                  className="absolute left-0 top-0 h-full origin-left bg-[#E7B72A] shadow-[0_0_8px_rgba(231,183,42,0.5)]"
                  animate={{ width: `${railPercent}%` }}
                  transition={{ ...STEP_TRANSITION, delay: STEP_REVEAL_DELAY }}
                />
              </div>

              {/* 5 columns × 3 rows — middle row = nodes on the rail */}
              <div className="relative z-10 grid w-full grid-cols-5 gap-0">
                {STEPS.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isAbove = idx % 2 === 0; // Steps 1, 3, 5 above rail; Steps 2, 4 below
                  const status = getStepStatus(idx);
                  const isActive = status === "active";
                  const isCompleted = status === "completed";
                  const isInactive = status === "inactive";

                  const cardClass = isActive
                    ? "border-[#E7B72A]/60 bg-[#0E1217]/95 shadow-[0_16px_40px_rgba(231,183,42,0.14),0_0_24px_rgba(231,183,42,0.08)]"
                    : isCompleted
                    ? "border-white/[0.12] bg-[#0B0E12]/85 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                    : "border-white/[0.05] bg-[#080A0D]/60 shadow-none pointer-events-none";

                  const hairlineClass = isActive
                    ? "bg-gradient-to-r from-transparent via-[#E7B72A]/90 to-transparent"
                    : isCompleted
                    ? "bg-gradient-to-r from-transparent via-[#E7B72A]/35 to-transparent"
                    : "bg-transparent";

                  const stepLabelClass = isActive
                    ? "text-[#E7B72A]"
                    : isCompleted
                    ? "text-[#E7B72A]/65"
                    : "text-zinc-600";

                  const iconBgClass = isActive
                    ? "bg-[#E7B72A]/15 text-[#E7B72A] ring-1 ring-[#E7B72A]/40 shadow-[0_0_12px_rgba(231,183,42,0.3)]"
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

                  const connectorTone = isActive
                    ? "bg-[#E7B72A]"
                    : isCompleted
                    ? "bg-[#E7B72A]/55"
                    : "bg-white/20";

                  const topCard = (
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : isCompleted ? 0.88 : 0.18,
                        y: isInactive ? -10 : 0,
                        scale: isActive ? 1 : isCompleted ? 0.99 : 0.97,
                        filter: isInactive ? "blur(2px)" : "blur(0px)",
                      }}
                      transition={{
                        ...STEP_TRANSITION,
                        delay: isActive ? STEP_REVEAL_DELAY : 0,
                      }}
                      className={`relative w-full max-w-[228px] overflow-hidden rounded-xl border p-5 backdrop-blur-xl ${cardClass}`}
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
                      <p className={`mt-1.5 font-epilogue text-[11.5px] leading-relaxed font-normal transition-colors duration-300 ${descClass}`}>
                        {step.description}
                      </p>
                    </motion.div>
                  );

                  const bottomCard = (
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : isCompleted ? 0.88 : 0.18,
                        y: isInactive ? 10 : 0,
                        scale: isActive ? 1 : isCompleted ? 0.99 : 0.97,
                        filter: isInactive ? "blur(2px)" : "blur(0px)",
                      }}
                      transition={{
                        ...STEP_TRANSITION,
                        delay: isActive ? STEP_REVEAL_DELAY : 0,
                      }}
                      className={`relative w-full max-w-[228px] overflow-hidden rounded-xl border p-5 backdrop-blur-xl ${cardClass}`}
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
                      <p className={`mt-1.5 font-epilogue text-[11.5px] leading-relaxed font-normal transition-colors duration-300 ${descClass}`}>
                        {step.description}
                      </p>
                    </motion.div>
                  );

                  return (
                    <div
                      key={step.number}
                      className="grid min-h-[480px] grid-rows-[1fr_auto_1fr] px-1"
                    >
                      {/* Row 1 — top cards */}
                      <div className="flex flex-col items-center justify-end pb-0">
                        {isAbove ? (
                          <>
                            {topCard}
                            <motion.div
                              animate={{ opacity: isActive ? 1 : isCompleted ? 0.75 : 0.2 }}
                              transition={STEP_TRANSITION}
                              className={`mt-0 h-9 w-[2px] shrink-0 ${connectorTone}`}
                            />
                          </>
                        ) : (
                          <div className="min-h-[1px] flex-1" aria-hidden />
                        )}
                      </div>

                      {/* Row 2 — node centered on shared rail */}
                      <div className="relative z-20 flex items-center justify-center py-0">
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.9, 1.45, 0.9], opacity: [0, 0.55, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2.8,
                              ease: "easeInOut",
                              repeatDelay: 0.2,
                              delay: STEP_REVEAL_DELAY + 0.08,
                            }}
                            className="pointer-events-none absolute h-12 w-12 rounded-full bg-[#E7B72A]/18 blur-[6px]"
                          />
                        )}
                        <motion.div
                          animate={{
                            borderColor: isActive
                              ? "rgba(231, 183, 42, 1)"
                              : isCompleted
                              ? "rgba(231, 183, 42, 0.85)"
                              : "rgba(255, 255, 255, 0.22)",
                            scale: isActive ? 1.08 : isCompleted ? 1 : 0.96,
                            boxShadow: isActive
                              ? "0 0 16px rgba(231, 183, 42, 0.75)"
                              : isCompleted
                              ? "0 0 10px rgba(231, 183, 42, 0.35)"
                              : "0 0 0 rgba(0,0,0,0)",
                          }}
                          transition={{
                            ...STEP_TRANSITION,
                            delay: isActive ? STEP_REVEAL_DELAY : 0,
                          }}
                          className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 bg-[#06070A] origin-center"
                        >
                          <motion.div
                            animate={{
                              width: isActive ? 10 : isCompleted ? 8 : 6,
                              height: isActive ? 10 : isCompleted ? 8 : 6,
                              backgroundColor: isActive
                                ? "rgba(231, 183, 42, 1)"
                                : isCompleted
                                ? "rgba(231, 183, 42, 0.85)"
                                : "rgba(255, 255, 255, 0.28)",
                            }}
                            transition={{
                              ...STEP_TRANSITION,
                              delay: isActive ? STEP_REVEAL_DELAY : 0,
                            }}
                            className="rounded-full"
                          />
                        </motion.div>
                      </div>

                      {/* Row 3 — bottom cards */}
                      <div className="flex flex-col items-center justify-start pt-0">
                        {!isAbove ? (
                          <>
                            <motion.div
                              animate={{ opacity: isActive ? 1 : isCompleted ? 0.75 : 0.2 }}
                              transition={STEP_TRANSITION}
                              className={`mb-0 h-9 w-[2px] shrink-0 ${connectorTone}`}
                            />
                            {bottomCard}
                          </>
                        ) : (
                          <div className="min-h-[1px] flex-1" aria-hidden />
                        )}
                      </div>
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
              {STEPS.map((step) => {
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.number}
                    className="flex items-start gap-4 sm:gap-6"
                  >
                    {/* Timeline node — static on mobile */}
                    <div
                      className="relative z-10 mt-1 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#E7B72A]/75 bg-[#06070A] shadow-[0_0_8px_rgba(231,183,42,0.2)]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#E7B72A]/90" />
                    </div>

                    {/* Card — full visibility, no scroll-driven states */}
                    <div
                      className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.12] bg-[#0B0E12]/90 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-5"
                    >
                      <div className="pointer-events-none absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#E7B72A]/35 to-transparent" />
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                        <span className="font-epilogue text-xs font-semibold uppercase tracking-[0.2em] text-[#E7B72A]/80">
                          STEP {step.number}
                        </span>
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-white/[0.04] text-[#E7B72A]">
                          <IconComponent className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <h3 className="mt-2.5 font-epilogue text-sm font-bold tracking-tight text-white sm:text-base">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 font-epilogue text-xs font-normal leading-relaxed text-zinc-400 sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
