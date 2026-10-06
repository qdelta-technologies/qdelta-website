"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

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

const STEP_COUNT = MOBILE_STEPS.length;
const ROW_HEIGHT = 58;
const VB_W = 100;
const VB_H = STEP_COUNT * ROW_HEIGHT;
const PATH_CENTER_X = 50;
const PATH_SWING = 16;

const MOBILE_EASE = [0.22, 1, 0.36, 1] as const;

function nodeCenterY(index: number) {
  return ROW_HEIGHT / 2 + index * ROW_HEIGHT;
}

function nodeCenterX(index: number) {
  return PATH_CENTER_X + (index % 2 === 0 ? -PATH_SWING : PATH_SWING);
}

function buildWindingPath() {
  const points = MOBILE_STEPS.map((_, i) => ({
    x: nodeCenterX(i),
    y: nodeCenterY(i),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const ROAD_PATH = buildWindingPath();

export default function ProcessMobileJourney() {
  const shouldReduceMotion = useReducedMotion();

  const stagger = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06, delayChildren: 0.06 },
        },
      };

  const nodeVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { scale: 0.4, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: "spring" as const, stiffness: 380, damping: 22 },
        },
      };

  const pillVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: (onRight: boolean) => ({
          opacity: 0,
          x: onRight ? 12 : -12,
        }),
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.42, ease: MOBILE_EASE, delay: 0.04 },
        },
      };

  const connectorVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
          scaleX: 1,
          opacity: 1,
          transition: { duration: 0.38, ease: MOBILE_EASE, delay: 0.02 },
        },
      };

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md mx-auto mb-8 select-none px-0 sm:px-1"
      style={{ minHeight: VB_H }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMin meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="process-road-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5B528" stopOpacity="0.55" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="#E5B528" stopOpacity="0.45" />
          </linearGradient>
          <filter id="process-road-glow" x="-40%" y="-5%" width="180%" height="110%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft road bed */}
        <path
          d={ROAD_PATH}
          fill="none"
          stroke="rgba(229, 181, 40, 0.08)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dashed center line */}
        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="url(#process-road-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 7"
          filter="url(#process-road-glow)"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
          whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1.4, ease: MOBILE_EASE }}
          style={{ pathLength: shouldReduceMotion ? 1 : undefined }}
        />

        {/* Milestone ticks on path */}
        {MOBILE_STEPS.map((_, idx) => (
          <circle
            key={idx}
            cx={nodeCenterX(idx)}
            cy={nodeCenterY(idx)}
            r="1.2"
            fill="rgba(255,255,255,0.25)"
          />
        ))}
      </svg>

      <motion.ol
        className="relative z-10 flex flex-col"
        style={{ gap: 0 }}
        initial="hidden"
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.08 }}
        variants={stagger}
      >
        {MOBILE_STEPS.map((label, idx) => {
          const labelOnLeft = idx % 2 === 0;
          const stepNum = String(idx + 1).padStart(2, "0");
          const nodeShift = idx % 2 === 0 ? "-16%" : "16%";

          return (
            <motion.li
              key={label}
              variants={shouldReduceMotion ? undefined : { hidden: {}, visible: {} }}
              className="relative list-none"
              style={{ height: ROW_HEIGHT }}
            >
              <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
                {/* Left label pill */}
                <div className="col-start-1 flex h-full items-center justify-end pr-1 sm:pr-2">
                  {labelOnLeft && (
                    <motion.div
                      custom={false}
                      variants={pillVariants}
                      className="group flex max-w-[9.5rem] sm:max-w-[10.5rem] items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
                    >
                      <span className="font-epilogue text-[9px] font-semibold tabular-nums tracking-wider text-white/35">
                        {stepNum}
                      </span>
                      <span className="font-excon text-xs sm:text-[13px] font-semibold tracking-tight text-[#E5B528] whitespace-nowrap">
                        {label}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Node + connectors (shift together to follow the road) */}
                <div className="col-start-2 flex items-center justify-center">
                  <motion.div
                    variants={nodeVariants}
                    style={{ x: nodeShift }}
                    className="relative flex items-center justify-center"
                  >
                    {labelOnLeft && (
                      <motion.div
                        variants={connectorVariants}
                        style={{ transformOrigin: "right center" }}
                        className="mr-1.5 h-px w-8 sm:w-10 shrink-0 bg-gradient-to-l from-[#E5B528]/90 via-[#E5B528]/45 to-transparent"
                        aria-hidden
                      />
                    )}

                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <span
                        className="pointer-events-none absolute -inset-1 rounded-full bg-[#E5B528]/20 blur-md"
                        aria-hidden
                      />
                      <span
                        className="relative flex h-6 w-6 items-center justify-center rounded-full border border-[#E5B528]/80 bg-[#06070A]/95 shadow-[0_0_14px_rgba(229,181,40,0.45),inset_0_0_8px_rgba(229,181,40,0.12)] backdrop-blur-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-[#E5B528] shadow-[0_0_6px_rgba(229,181,40,0.9)]" />
                      </span>
                      <span className="sr-only">Step {stepNum}: {label}</span>
                    </span>

                    {!labelOnLeft && (
                      <motion.div
                        variants={connectorVariants}
                        style={{ transformOrigin: "left center" }}
                        className="ml-1.5 h-px w-8 sm:w-10 shrink-0 bg-gradient-to-r from-[#E5B528]/90 via-[#E5B528]/45 to-transparent"
                        aria-hidden
                      />
                    )}
                  </motion.div>
                </div>

                {/* Right label pill */}
                <div className="col-start-3 flex h-full items-center justify-start pl-1 sm:pl-2">
                  {!labelOnLeft && (
                    <motion.div
                      custom={true}
                      variants={pillVariants}
                      className="group flex max-w-[9.5rem] sm:max-w-[10.5rem] items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
                    >
                      <span className="font-epilogue text-[9px] font-semibold tabular-nums tracking-wider text-white/35">
                        {stepNum}
                      </span>
                      <span className="font-excon text-xs sm:text-[13px] font-semibold tracking-tight text-[#E5B528] whitespace-nowrap">
                        {label}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
