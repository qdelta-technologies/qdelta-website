"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

const MOBILE_STEPS = [
  { id: "01", label: "Understand Needs" },
  { id: "02", label: "Define Goals" },
  { id: "03", label: "Project Planning" },
  { id: "04", label: "Website Structure" },
  { id: "05", label: "UX Focused Design" },
  { id: "06", label: "Prototype" },
  { id: "07", label: "Build & Deploy" },
  { id: "08", label: "Testing & Refinement" },
  { id: "09", label: "Launch & Support" },
  { id: "10", label: "Maintenance" },
] as const;

const STEP_COUNT = MOBILE_STEPS.length;
const ROW_HEIGHT = 68;
const VB_W = 100;
const VB_H = STEP_COUNT * ROW_HEIGHT;
// Base bend width plus a gentle per-bend variance so the road reads as an
// organic winding mountain road rather than a uniform mechanical zigzag.
const PATH_SWING_BASE = 17;
const PATH_SWING_VARIANCE = 7;

const MOBILE_EASE = [0.22, 1, 0.36, 1] as const;

function nodeCenterY(index: number) {
  return ROW_HEIGHT / 2 + index * ROW_HEIGHT;
}

function nodeCenterX(index: number) {
  const amplitude = PATH_SWING_BASE + PATH_SWING_VARIANCE * Math.abs(Math.sin(index * 0.9));
  const x = 50 + (index % 2 === 0 ? -amplitude : amplitude);
  // Rounded to 2dp: Math.sin can differ in its last bit between the server's
  // and browser's JS engine, which was producing a long float tail that
  // sometimes differed by a hair between SSR and client — a hydration
  // mismatch. Rounding absorbs that noise well before it's visible.
  return Math.round(x * 100) / 100;
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
          transition: { staggerChildren: 0.07, delayChildren: 0.05 },
        },
      };

  const nodeVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { scale: 0.3, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: "spring" as const, stiffness: 340, damping: 20 },
        },
      };

  const pillVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: (onRight: boolean) => ({ opacity: 0, x: onRight ? 14 : -14 }),
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.4, ease: MOBILE_EASE, delay: 0.05 },
        },
      };

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md mx-auto mb-8 select-none px-0 sm:px-1"
      style={{ minHeight: VB_H }}
    >
      {/* Clean local backdrop — dims the section's grid behind the road so the
          asphalt reads clearly instead of competing with background texture */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(8,9,12,0.55) 0%, rgba(8,9,12,0.3) 55%, transparent 100%)",
        }}
        aria-hidden
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMin meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="process-road-edge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5B528" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#E5B528" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#E5B528" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#E5B528" stopOpacity="0.5" />
          </linearGradient>
          <filter id="process-road-shadow" x="-30%" y="-5%" width="160%" height="110%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Faint golden rim — ties the road to the brand accent without being neon */}
        <path
          d={ROAD_PATH}
          fill="none"
          stroke="url(#process-road-edge)"
          strokeWidth="9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Soft shadow under the road: a plain offset stroke (an SVG blur/drop-shadow filter on an animated path is very slow on phones) */}
        <path
          d={ROAD_PATH}
          fill="none"
          stroke="rgba(0, 0, 0, 0.32)"
          strokeWidth="8.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0 1.2)"
        />

        {/* Asphalt road bed */}
        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="#15171C"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease: MOBILE_EASE }}
          style={{ pathLength: shouldReduceMotion ? 1 : undefined }}
        />

        {/* Painted centre line — the road-trip detail */}
        <motion.path
          d={ROAD_PATH}
          fill="none"
          stroke="rgba(245, 238, 220, 0.8)"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="2.4 3.2"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease: MOBILE_EASE, delay: 0.1 }}
          style={{ pathLength: shouldReduceMotion ? 1 : undefined }}
        />
      </svg>

      <motion.ol
        className="relative z-10 flex flex-col"
        style={{ gap: 0 }}
        initial="hidden"
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.06 }}
        variants={stagger}
      >
        {MOBILE_STEPS.map((step, idx) => {
          const labelOnLeft = idx % 2 === 0;
          const nodeShift = idx % 2 === 0 ? "-18%" : "18%";
          const isFirst = idx === 0;
          const isLast = idx === MOBILE_STEPS.length - 1;

          return (
            <motion.li
              key={step.id}
              variants={shouldReduceMotion ? undefined : { hidden: {}, visible: {} }}
              className="relative list-none"
              style={{ height: ROW_HEIGHT }}
            >
              <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
                {/* Left pill */}
                <div className="col-start-1 flex h-full items-center justify-end pr-3 sm:pr-4">
                  {labelOnLeft && (
                    <motion.div
                      custom={false}
                      variants={pillVariants}
                      className="flex flex-col items-end gap-0.5 max-w-[9rem] sm:max-w-[10rem]"
                    >
                      <span className="font-epilogue text-[9px] font-bold tabular-nums text-[#E5B528]/70 tracking-[0.15em]">
                        {step.id}
                      </span>
                      <span
                        className="text-right font-epilogue text-[11px] sm:text-xs font-semibold text-white/90 leading-snug"
                      >
                        {step.label}
                      </span>
                      {/* Underline accent */}
                      <span
                        className="block h-px w-full mt-0.5 rounded-full"
                        style={{ background: isFirst || isLast ? 'rgba(229,181,40,0.5)' : 'rgba(255,255,255,0.08)' }}
                      />
                    </motion.div>
                  )}
                </div>

                {/* Node */}
                <div className="col-start-2 flex items-center justify-center">
                  <motion.div
                    variants={nodeVariants}
                    style={{ x: nodeShift }}
                    className="relative flex items-center justify-center"
                  >
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                      {/* Outer glow ring */}
                      <span
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          boxShadow: '0 0 12px 3px rgba(229,181,40,0.25)',
                          border: '1px solid rgba(229,181,40,0.2)',
                          borderRadius: '50%',
                        }}
                        aria-hidden
                      />
                      {/* Inner ring */}
                      <span
                        className="relative flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          background: 'rgba(6,7,10,0.95)',
                          border: '1.5px solid rgba(229,181,40,0.65)',
                          boxShadow: '0 0 10px rgba(229,181,40,0.3), inset 0 0 6px rgba(229,181,40,0.08)',
                        }}
                      >
                        {/* Center dot */}
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            background: '#E5B528',
                            boxShadow: '0 0 8px 2px rgba(229,181,40,0.8)',
                          }}
                        />
                      </span>
                      <span className="sr-only">Step {step.id}: {step.label}</span>
                    </span>
                  </motion.div>
                </div>

                {/* Right pill */}
                <div className="col-start-3 flex h-full items-center justify-start pl-3 sm:pl-4">
                  {!labelOnLeft && (
                    <motion.div
                      custom={true}
                      variants={pillVariants}
                      className="flex flex-col items-start gap-0.5 max-w-[9rem] sm:max-w-[10rem]"
                    >
                      <span className="font-epilogue text-[9px] font-bold tabular-nums text-[#E5B528]/70 tracking-[0.15em]">
                        {step.id}
                      </span>
                      <span
                        className="text-left font-epilogue text-[11px] sm:text-xs font-semibold text-white/90 leading-snug"
                      >
                        {step.label}
                      </span>
                      <span
                        className="block h-px w-full mt-0.5 rounded-full"
                        style={{ background: isFirst || isLast ? 'rgba(229,181,40,0.5)' : 'rgba(255,255,255,0.08)' }}
                      />
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
