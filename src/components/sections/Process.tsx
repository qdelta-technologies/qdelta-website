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
    accentColor: "#E5B528",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the structure, scope, content direction and the right approach for the project.",
    icon: Layers,
    accentColor: "#E5B528",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "We turn the strategy into a polished digital experience through thoughtful design, development and interactions.",
    icon: Sparkles,
    accentColor: "#E5B528",
  },
  {
    number: "04",
    title: "Refine & Launch",
    description:
      "We review, test and improve the project before preparing everything for a smooth launch.",
    icon: Rocket,
    accentColor: "#E5B528",
  },
  {
    number: "05",
    title: "Support & Grow",
    description:
      "After launch, we provide agreed support and can continue with maintenance and improvements as needed.",
    icon: TrendingUp,
    accentColor: "#E5B528",
  },
];

// Number of steps
const TOTAL_STEPS = STEPS.length; // 5

/** Mobile-only compact timeline (desktop keeps 5-step STEPS above). */
const MOBILE_STEPS = [
  "Discover",
  "Define",
  "Plan",
  "Structure",
  "Design",
  "Prototype",
  "Develop",
  "Refine",
  "Launch",
  "Support",
] as const;

/** Progress reaches each node center; final step fills the full rail. */
function getDesktopRailPercent(activeStep: number) {
  if (activeStep >= TOTAL_STEPS - 1) return 100;
  return ((activeStep + 0.5) / TOTAL_STEPS) * 100;
}

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeStepRef = useRef(0);
  const desktopScrollMqRef = useRef<MediaQueryList | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

const STEP_TRANSITION = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const };
const STEP_REVEAL_DELAY = 0.06;

const MOBILE_EASE = [0.22, 1, 0.36, 1] as const;

const mobileTimelineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const mobileNodeVariants = {
  hidden: { scale: 0.35, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 24 },
  },
};

const mobileConnectorVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: MOBILE_EASE, delay: 0.06 },
  },
};

const mobileBoxVariants = {
  hidden: (cardOnRight: boolean) => ({
    opacity: 0,
    x: cardOnRight ? 16 : -16,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: MOBILE_EASE, delay: 0.06 },
  },
};

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

  useEffect(() => {
    desktopScrollMqRef.current = window.matchMedia("(min-width: 1024px)");
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    if (!desktopScrollMqRef.current?.matches) return;
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
      className="relative z-20 w-full bg-[#06070A] text-white selection:bg-[#E5B528] selection:text-[#06070A] lg:h-[600vh]"
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
            <div className="mb-3 flex flex-col items-center gap-1 select-none">
              <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]">
                How We Work
              </span>
              <span className="hidden lg:inline font-epilogue text-xs tracking-[0.15em] uppercase font-semibold text-[#E5B528] transition-colors duration-300">
                Step 0{Math.min(activeStep + 1, TOTAL_STEPS)} of 0{TOTAL_STEPS}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[40px] font-excon font-bold tracking-tight text-white leading-[1.14] text-balance">
              Every project starts with a clear process.
            </h2>

            <p className="mt-2 text-xs sm:text-sm md:text-base font-epilogue text-zinc-400 font-normal leading-relaxed text-balance max-w-2xl">
              A structured workflow with clear milestones that keeps everything on track and turns ideas into high-performing digital experiences.
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
                  className="absolute left-0 top-0 h-full origin-left bg-[#E5B528] shadow-[0_0_8px_rgba(229, 181, 40,0.5)]"
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
                    ? "border-[#E5B528]/60 bg-[#0E1217]/95 shadow-[0_16px_40px_rgba(229, 181, 40,0.14),0_0_24px_rgba(229, 181, 40,0.08)]"
                    : isCompleted
                    ? "border-white/[0.12] bg-[#0B0E12]/85 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                    : "border-white/[0.05] bg-[#080A0D]/60 shadow-none pointer-events-none";

                  const hairlineClass = isActive
                    ? "bg-gradient-to-r from-transparent via-[#E5B528]/90 to-transparent"
                    : isCompleted
                    ? "bg-gradient-to-r from-transparent via-[#E5B528]/35 to-transparent"
                    : "bg-transparent";

                  const stepLabelClass = isActive
                    ? "text-[#E5B528]"
                    : isCompleted
                    ? "text-[#E5B528]/65"
                    : "text-zinc-600";

                  const iconBgClass = isActive
                    ? "bg-[#E5B528]/15 text-[#E5B528] ring-1 ring-[#E5B528]/40 shadow-[0_0_12px_rgba(229, 181, 40,0.3)]"
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
                    ? "bg-[#E5B528]"
                    : isCompleted
                    ? "bg-[#E5B528]/55"
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
                      <h3 className={`mt-3 font-excon text-base font-bold tracking-tight leading-snug transition-colors duration-300 ${titleClass}`}>
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
                      <h3 className={`mt-3 font-excon text-base font-bold tracking-tight leading-snug transition-colors duration-300 ${titleClass}`}>
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
                            className="pointer-events-none absolute h-12 w-12 rounded-full bg-[#E5B528]/18 blur-[6px]"
                          />
                        )}
                        <motion.div
                          animate={{
                            borderColor: isActive
                              ? "rgba(229, 181, 40, 1)"
                              : isCompleted
                              ? "rgba(229, 181, 40, 0.85)"
                              : "rgba(255, 255, 255, 0.22)",
                            scale: isActive ? 1.08 : isCompleted ? 1 : 0.96,
                            boxShadow: isActive
                              ? "0 0 16px rgba(229, 181, 40, 0.75)"
                              : isCompleted
                              ? "0 0 10px rgba(229, 181, 40, 0.35)"
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
                                ? "rgba(229, 181, 40, 1)"
                                : isCompleted
                                ? "rgba(229, 181, 40, 0.85)"
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
          {/* MOBILE / TABLET: compact 10-step zig-zag (desktop unchanged) */}
          {/* ======================================================= */}
          <div className="lg:hidden relative w-full max-w-sm sm:max-w-md mx-auto mb-8 select-none px-1 sm:px-2">
            <motion.div
              initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0.4 }}
              whileInView={shouldReduceMotion ? undefined : { scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: MOBILE_EASE }}
              className="pointer-events-none absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#E5B528]/50 via-white/10 to-[#E5B528]/40"
              aria-hidden
            />

            <motion.ol
              className="relative flex flex-col gap-y-6 sm:gap-y-6"
              initial="hidden"
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.08 }}
              variants={
                shouldReduceMotion
                  ? undefined
                  : {
                      ...mobileTimelineVariants,
                      visible: {
                        transition: { staggerChildren: 0.07, delayChildren: 0.05 },
                      },
                    }
              }
            >
              {MOBILE_STEPS.map((label, idx) => {
                const cardOnRight = idx % 2 === 0;
                const stepNum = String(idx + 1).padStart(2, "0");

                return (
                  <motion.li
                    key={label}
                    variants={shouldReduceMotion ? undefined : { hidden: {}, visible: {} }}
                    className="relative list-none min-h-[2.75rem] sm:min-h-[3rem]"
                  >
                    <div className="grid h-full min-h-[inherit] grid-cols-[1fr_auto_1fr] items-center gap-x-0">
                      <div className="col-start-1 flex h-full items-center justify-end pr-3 sm:pr-4">
                        {!cardOnRight && (
                          <motion.span
                            custom={false}
                            variants={shouldReduceMotion ? undefined : mobileBoxVariants}
                            className="font-excon text-xs sm:text-[13px] font-semibold tracking-tight text-[#E5B528] whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </div>

                      <div className="col-start-2 z-10 flex items-center justify-center">
                        {!cardOnRight && (
                          <motion.div
                            variants={shouldReduceMotion ? undefined : mobileConnectorVariants}
                            style={{ transformOrigin: "right center" }}
                            className="h-px w-8 sm:w-10 shrink-0 bg-gradient-to-l from-[#E5B528] via-[#E5B528]/45 to-transparent"
                            aria-hidden
                          />
                        )}
                        <motion.div
                          variants={shouldReduceMotion ? undefined : mobileNodeVariants}
                          className="relative flex h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem] shrink-0 items-center justify-center rounded-full border border-[#E5B528]/90 bg-[#06070A] shadow-[0_0_10px_rgba(229,181,40,0.4)]"
                        >
                          <span
                            className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#E5B528]"
                            aria-hidden
                          />
                          <span className="sr-only">Step {stepNum}: {label}</span>
                        </motion.div>
                        {cardOnRight && (
                          <motion.div
                            variants={shouldReduceMotion ? undefined : mobileConnectorVariants}
                            style={{ transformOrigin: "left center" }}
                            className="h-px w-8 sm:w-10 shrink-0 bg-gradient-to-r from-[#E5B528] via-[#E5B528]/45 to-transparent"
                            aria-hidden
                          />
                        )}
                      </div>

                      <div className="col-start-3 flex h-full items-center justify-start pl-3 sm:pl-4">
                        {cardOnRight && (
                          <motion.span
                            custom={true}
                            variants={shouldReduceMotion ? undefined : mobileBoxVariants}
                            className="font-excon text-xs sm:text-[13px] font-semibold tracking-tight text-[#E5B528] whitespace-nowrap"
                          >
                            {label}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>


        </div>
      </div>
    </section>
  );
}
