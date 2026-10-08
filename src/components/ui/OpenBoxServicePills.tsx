"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface ServicePillConfig {
  id: string;
  label: string;
  className: string;
  initialRotate: number;
  startX: number;
  startY: number;
  delay: number;
  floatDuration: number;
  scale?: number;
  /** When true, no settled tilt or idle wobble (level pill). */
  level?: boolean;
  /** Small accent dot color before the label — adds a touch of variety to the otherwise all-white pills. */
  accentColor: string;
}

// 8 Core capability pills unpacked from the QDelta Service Kit
const PILLS: ServicePillConfig[] = [
  // 1. AI Automation - Rises upward from the center cavity mouth first
  {
    id: "ai-automation",
    label: "AI Automation",
    className: "top-[14%] left-1/2 -translate-x-1/2 z-30",
    initialRotate: 0,
    level: true,
    startX: 0,
    startY: 75,
    delay: 0.85,
    floatDuration: 4.4,
    scale: 0.98,
    accentColor: "#E5B528",
  },
  // 2. Web Design - Unpacks outward toward upper-left
  {
    id: "web-design",
    label: "Web Design",
    className: "top-[6%] left-[2%] sm:left-[4%] z-30",
    initialRotate: -8,
    startX: 145,
    startY: 85,
    delay: 0.97,
    floatDuration: 4.8,
    scale: 1.0,
    accentColor: "#38BDF8",
  },
  // 3. UI/UX - Unpacks toward upper-right
  {
    id: "ui-ux",
    label: "UI/UX",
    className: "top-[6%] right-[2%] sm:right-[4%] z-30",
    initialRotate: 10,
    startX: -145,
    startY: 85,
    delay: 1.09,
    floatDuration: 4.2,
    scale: 1.05,
    accentColor: "#F472B6",
  },
  // 4. Strategy - Emerges from inside the cavity, settles near the aperture
  {
    id: "strategy",
    label: "Strategy",
    className: "top-[34%] left-1/2 -translate-x-1/2 z-30",
    initialRotate: -3,
    startX: 0,
    startY: 30,
    delay: 1.21,
    floatDuration: 5.1,
    scale: 0.96,
    accentColor: "#A78BFA",
  },
  // 5. Landing Pages - Unpacks laterally toward mid-left
  {
    id: "landing-pages",
    label: "Landing Pages",
    className: "top-[28%] left-[0%] sm:left-[1%] z-30",
    initialRotate: -14,
    startX: 160,
    startY: 35,
    delay: 1.33,
    floatDuration: 4.6,
    scale: 0.98,
    accentColor: "#FB923C",
  },
  // 6. Branding - Unpacks laterally toward mid-right
  {
    id: "branding",
    label: "Branding",
    className: "top-[28%] right-[0%] sm:right-[1%] z-30",
    initialRotate: 14,
    startX: -160,
    startY: 35,
    delay: 1.45,
    floatDuration: 4.7,
    scale: 0.98,
    accentColor: "#34D399",
  },
  // 7. Development - Unpacks downward-left alongside the lower flank
  {
    id: "development",
    label: "Development",
    className: "top-[53%] left-[3%] sm:left-[5%] z-30",
    initialRotate: -17,
    startX: 140,
    startY: -30,
    delay: 1.57,
    floatDuration: 5.3,
    scale: 0.95,
    accentColor: "#6366F1",
  },
  // 8. E-commerce - Unpacks downward-right alongside the lower flank
  {
    id: "e-commerce",
    label: "E-commerce",
    className: "top-[53%] right-[3%] sm:right-[5%] z-30",
    initialRotate: 18,
    startX: -140,
    startY: -30,
    delay: 1.69,
    floatDuration: 4.9,
    scale: 0.92,
    accentColor: "#F87171",
  },
];

// SVG Morphing Paths for the Box Flaps (Isometric packaging geometry)
const PATHS = {
  // Left flap: hinged along (104,136) to (142,102)
  leftFlapClosed: "M 104 136 L 210 136 L 210 102 L 142 102 Z",
  leftFlapOpen: "M 104 136 L 32 112 L 70 76 L 142 102 Z",
  leftRidgeClosed: "M 210 102 L 210 136",
  leftRidgeOpen: "M 70 76 L 32 112",

  // Right flap: hinged along (316,136) to (278,102)
  rightFlapClosed: "M 316 136 L 210 136 L 210 102 L 278 102 Z",
  rightFlapOpen: "M 316 136 L 388 112 L 350 76 L 278 102 Z",
  rightRidgeClosed: "M 210 102 L 210 136",
  rightRidgeOpen: "M 350 76 L 388 112",

  // Back flap: hinged along (142,102) to (278,102)
  backFlapClosed: "M 142 102 L 154 102 L 266 102 L 278 102 Z",
  backFlapOpen: "M 142 102 L 154 62 L 266 62 L 278 102 Z",
  backRidgeClosed: "M 154 102 L 266 102",
  backRidgeOpen: "M 154 62 L 266 62",
};

/** Shared reveal timing (mobile + desktop) — keep pills snappy after box opens */
const BOX_OPEN_DURATION = 0.48;
const BOX_OPEN_DELAY = 0.1;
const CAVITY_DURATION = 0.36;
const CAVITY_DELAY = 0.14;
const PILL_OPACITY_DURATION = 0.3;
const PILL_MOVE_DURATION = 0.5;
const PILL_DELAY_SCALE = 0.48;
const FLOAT_IDLE_SCALE = 0.82;

export default function OpenBoxServicePills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Trigger when meaningfully visible in viewport (plays once cleanly, does not restart on tiny scrolls)
  const isInView = useInView(containerRef, {
    amount: 0.3,
    once: false,
    margin: "-60px 0px -60px 0px",
  });

  const [isManuallyReplaying, setIsManuallyReplaying] = useState(false);

  // When replaying manually, momentarily close then reopen
  const isOpen = (isInView || shouldReduceMotion) && !isManuallyReplaying;

  const handleReplay = () => {
    if (isManuallyReplaying) return;
    setIsManuallyReplaying(true);
    setTimeout(() => {
      setIsManuallyReplaying(false);
    }, 150);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[390px] sm:max-w-[430px] aspect-[16/11] mx-auto select-none mt-3 mb-1 pointer-events-auto"
      aria-label="QDelta Service Kit with emerging creative service credentials"
    >
      {/* ======================================================== */}
      {/* 3D SCULPTURAL BOX ILLUSTRATION                           */}
      {/* ======================================================== */}
      <svg
        viewBox="0 0 420 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          {/* Deep Base Contact Shadow */}
          <radialGradient
            id="studio-contact-shadow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Warm Diffuse Studio Shadow */}
          <radialGradient
            id="studio-diffuse-shadow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#301A00" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#2A1400" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2A1400" stopOpacity="0" />
          </radialGradient>

          {/* Back Wall Facet Matte Tone */}
          <linearGradient
            id="back-panel-matte"
            x1="210"
            y1="56"
            x2="210"
            y2="104"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ECEEF3" />
            <stop offset="100%" stopColor="#D5D9E2" />
          </linearGradient>

          {/* Interior Tray Ambient Occlusion */}
          <linearGradient
            id="cavity-depth-matte"
            x1="210"
            y1="102"
            x2="210"
            y2="152"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7E8492" />
            <stop offset="60%" stopColor="#5B6170" />
            <stop offset="100%" stopColor="#454A56" />
          </linearGradient>

          {/* Tray Bottom Floor */}
          <linearGradient
            id="tray-floor-matte"
            x1="210"
            y1="148"
            x2="210"
            y2="178"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3E434E" />
            <stop offset="100%" stopColor="#2F333C" />
          </linearGradient>

          {/* Left Wing Sculptural Facet */}
          <linearGradient
            id="left-wing-matte"
            x1="104"
            y1="80"
            x2="32"
            y2="124"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F1F3F7" />
            <stop offset="100%" stopColor="#DFE2E8" />
          </linearGradient>

          {/* Right Wing Sculptural Facet */}
          <linearGradient
            id="right-wing-matte"
            x1="316"
            y1="80"
            x2="388"
            y2="124"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F4F6FA" />
            <stop offset="100%" stopColor="#E2E5EB" />
          </linearGradient>

          {/* Front Body Presentation Facet */}
          <linearGradient
            id="front-body-matte"
            x1="210"
            y1="136"
            x2="210"
            y2="214"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F8F9FB" />
            <stop offset="70%" stopColor="#ECEEF3" />
            <stop offset="100%" stopColor="#D9DCE3" />
          </linearGradient>
        </defs>

        {/* 1. Studio Shadows on Ground (Always grounded and solid) */}
        <ellipse
          cx="212"
          cy="224"
          rx="140"
          ry="20"
          fill="url(#studio-diffuse-shadow)"
        />
        <ellipse
          cx="210"
          cy="216"
          rx="102"
          ry="10"
          fill="url(#studio-contact-shadow)"
        />

        {/* 2. Sculptural Back Fold Facet (Rises smoothly when opening) */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.backFlapOpen, opacity: 1 }
              : {
                  d: isOpen ? PATHS.backFlapOpen : PATHS.backFlapClosed,
                  opacity: isOpen ? 1 : 0,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY + 0.02 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          fill="url(#back-panel-matte)"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.8"
        />
        {/* Back panel top rim catchlight */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.backRidgeOpen, opacity: 1 }
              : {
                  d: isOpen ? PATHS.backRidgeOpen : PATHS.backRidgeClosed,
                  opacity: isOpen ? 1 : 0,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY + 0.02 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* 3. Deep Interior Cavity (Concealed when closed, revealed when flaps open) */}
        <motion.g
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{
            duration: CAVITY_DURATION,
            delay: isOpen ? CAVITY_DELAY : 0,
            ease: "easeOut",
          }}
        >
          {/* Back Wall */}
          <polygon
            points="142,102 278,102 262,150 158,150"
            fill="url(#cavity-depth-matte)"
          />
          {/* Tray Floor */}
          <polygon
            points="158,150 262,150 288,178 132,178"
            fill="url(#tray-floor-matte)"
          />
          {/* Left Inner Chamfer */}
          <polygon
            points="104,136 142,102 158,150 132,178"
            fill="#444955"
          />
          {/* Right Inner Chamfer */}
          <polygon
            points="316,136 278,102 262,150 288,178"
            fill="#666C7A"
          />
        </motion.g>

        {/* 4. Left Flap (Folds from closed center seam outward to open left wing) */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.leftFlapOpen }
              : {
                  d: isOpen ? PATHS.leftFlapOpen : PATHS.leftFlapClosed,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          fill="url(#left-wing-matte)"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="0.8"
        />
        {/* Left Flap Top Ridge Highlight Line */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.leftRidgeOpen }
              : {
                  d: isOpen ? PATHS.leftRidgeOpen : PATHS.leftRidgeClosed,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 5. Right Flap (Folds from closed center seam outward to open right wing) */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.rightFlapOpen }
              : {
                  d: isOpen ? PATHS.rightFlapOpen : PATHS.rightFlapClosed,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          fill="url(#right-wing-matte)"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="0.8"
        />
        {/* Right Flap Top Ridge Highlight Line */}
        <motion.path
          animate={
            shouldReduceMotion
              ? { d: PATHS.rightRidgeOpen }
              : {
                  d: isOpen ? PATHS.rightRidgeOpen : PATHS.rightRidgeClosed,
                }
          }
          transition={{
            duration: BOX_OPEN_DURATION,
            delay: isOpen ? BOX_OPEN_DELAY : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 6. Closed Center Seam Hairline (Visible only when closed) */}
        <motion.line
          x1="210"
          y1="102"
          x2="210"
          y2="136"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: isOpen ? 0 : 0.85 }}
          transition={{ duration: 0.22, delay: isOpen ? 0.06 : 0 }}
        />

        {/* 7. Front Sculptural Body Facet (The anchored base of the box) */}
        <polygon
          points="104,136 316,136 294,214 126,214"
          fill="url(#front-body-matte)"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.9"
        />

        {/* Top Rim Razor Bevel Catchlight */}
        <line
          x1="104"
          y1="136"
          x2="316"
          y2="136"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Bottom Ground Rim Catchlight Line */}
        <line
          x1="126"
          y1="214"
          x2="294"
          y2="214"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1"
        />

        {/* Minimal debossed kit label */}
        <g opacity="0.48" className="select-none">
          <text
            x="210"
            y="178"
            textAnchor="middle"
            fill="#18181B"
            fontSize="9"
            fontFamily="var(--font-satoshi), Satoshi, system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.02em"
          >
            QDELTA SERVICE KIT
          </text>
        </g>
      </svg>

      {/* Invisible Click Target on the Box Body for manual replay */}
      <button
        type="button"
        onClick={handleReplay}
        className="absolute left-[24%] top-[48%] w-[52%] h-[38%] z-25 cursor-pointer opacity-0"
        title="Click to replay capabilities reveal"
        aria-label="Replay QDelta Capabilities Reveal Animation"
      />

      {/* ======================================================== */}
      {/* 8 EMERGING SERVICE CAPABILITY PILLS                      */}
      {/* ======================================================== */}
      {PILLS.map((pill) => {
        const pillDelay = pill.delay * PILL_DELAY_SCALE;
        return (
          <motion.div
            key={pill.id}
            initial={false}
            animate={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    scale: pill.scale || 1,
                    x: 0,
                    y: 0,
                    rotate: pill.initialRotate,
                  }
                : isOpen
                ? {
                    opacity: 1,
                    scale: pill.scale || 1,
                    x: 0,
                    y: 0,
                    rotate: pill.initialRotate,
                  }
                : {
                    opacity: 0,
                    scale: 0.22,
                    x: pill.startX,
                    y: pill.startY,
                    rotate: 0,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : {
                    opacity: {
                      duration: PILL_OPACITY_DURATION,
                      delay: isOpen ? pillDelay : 0,
                      ease: "easeOut",
                    },
                    scale: {
                      duration: PILL_MOVE_DURATION,
                      delay: isOpen ? pillDelay : 0,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    x: {
                      duration: PILL_MOVE_DURATION,
                      delay: isOpen ? pillDelay : 0,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    y: {
                      duration: PILL_MOVE_DURATION,
                      delay: isOpen ? pillDelay : 0,
                      ease: [0.16, 1, 0.3, 1],
                    },
                    rotate: {
                      duration: PILL_MOVE_DURATION,
                      delay: isOpen ? pillDelay : 0,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }
            }
            className={`absolute ${pill.className} ${
              !isOpen && !shouldReduceMotion ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {/* INNER MOTION WRAPPER: Restrained idle floating (2-3px max) once settled */}
            <motion.div
              animate={
                isOpen && !shouldReduceMotion
                  ? {
                      y: [-2, 2.5, -2],
                      rotate: pill.level ? 0 : [-0.6, 0.6, -0.6],
                    }
                  : { y: 0, rotate: 0 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      y: {
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: pill.floatDuration * FLOAT_IDLE_SCALE,
                        ease: "easeInOut",
                        delay: pillDelay + PILL_MOVE_DURATION,
                      },
                      ...(pill.level
                        ? {}
                        : {
                            rotate: {
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration:
                                pill.floatDuration * FLOAT_IDLE_SCALE * 1.15,
                              ease: "easeInOut",
                              delay: pillDelay + PILL_MOVE_DURATION,
                            },
                          }),
                    }
              }
            >
              <motion.div
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className={`group relative inline-flex items-center gap-1.5 justify-center rounded-full bg-[#FAFAFC] py-1 sm:py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.05)] border border-black/[0.09] cursor-default transition-all duration-200 hover:bg-white hover:border-black/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] ${
                  pill.level ? "px-3.5 sm:px-4" : "px-3 sm:px-3.5"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: pill.accentColor }}
                  aria-hidden
                />
                <span className="font-epilogue font-bold text-[11px] sm:text-xs text-zinc-900 tracking-tight whitespace-nowrap">
                  {pill.label}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
