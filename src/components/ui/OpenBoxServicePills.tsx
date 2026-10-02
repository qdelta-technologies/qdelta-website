"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ServicePillConfig {
  id: string;
  label: string;
  className: string;
  initialRotate: number;
  yDrift: number[];
  rotDrift: number[];
  duration: number;
  delay: number;
  scale?: number;
  isDark?: boolean;
  isOccluded?: boolean;
}

const PILLS: ServicePillConfig[] = [
  // 1. Foreground Accent Pill (Closer to camera, matte black with white text)
  {
    id: "ui-ux",
    label: "UI/UX",
    className: "top-[6%] right-[4%] sm:right-[6%] z-30",
    initialRotate: 11,
    yDrift: [-4, 5, -4],
    rotDrift: [11, 13, 11],
    duration: 4.1,
    delay: 0,
    scale: 1.05,
    isDark: true,
  },
  // 2. High Left (Floating outward)
  {
    id: "web-design",
    label: "Web Design",
    className: "top-[10%] left-[2%] sm:left-[4%] z-30",
    initialRotate: -10,
    yDrift: [-5, 4, -5],
    rotDrift: [-10, -12, -10],
    duration: 4.6,
    delay: 0.3,
    scale: 1.0,
  },
  // 3. Mid Left (Floating outward)
  {
    id: "landing-pages",
    label: "Landing Pages",
    className: "top-[32%] left-[0%] sm:-left-[1%] z-30",
    initialRotate: -15,
    yDrift: [4, -5, 4],
    rotDrift: [-15, -13, -15],
    duration: 4.3,
    delay: 0.7,
    scale: 0.98,
  },
  // 4. Sitting on the container's left folded edge
  {
    id: "development",
    label: "Development",
    className: "top-[54%] left-[6%] sm:left-[8%] z-30",
    initialRotate: -18,
    yDrift: [-2, 3, -2],
    rotDrift: [-18, -17, -18],
    duration: 5.2,
    delay: 0.5,
    scale: 0.94,
  },
  // 5. Emerging from cavity / hover above mouth
  {
    id: "motion",
    label: "Motion",
    className: "top-[23%] left-[47%] -translate-x-1/2 z-30",
    initialRotate: 5,
    yDrift: [-4, 4, -4],
    rotDrift: [5, 3, 5],
    duration: 3.8,
    delay: 0.2,
    scale: 0.97,
  },
  // 6. Mid Right (Floating outward)
  {
    id: "branding",
    label: "Branding",
    className: "top-[33%] right-[1%] sm:right-[0%] z-30",
    initialRotate: 15,
    yDrift: [5, -4, 5],
    rotDrift: [15, 17, 15],
    duration: 4.5,
    delay: 0.8,
    scale: 1.0,
  },
  // 7. Further back / smaller (Lower right)
  {
    id: "e-commerce",
    label: "E-commerce",
    className: "top-[56%] right-[5%] sm:right-[7%] z-30",
    initialRotate: 21,
    yDrift: [-3, 4, -3],
    rotDrift: [21, 19, 21],
    duration: 4.9,
    delay: 1.1,
    scale: 0.89,
  },
];

// 8. Tucked deeply inside the box cavity (partially occluded by the front panel)
const CAVITY_PILL: ServicePillConfig = {
  id: "strategy",
  label: "Strategy",
  className: "top-[43%] left-[37%] -translate-x-1/2 z-10",
  initialRotate: -5,
  yDrift: [-2, 3, -2],
  rotDrift: [-5, -3, -5],
  duration: 4.8,
  delay: 0.4,
  scale: 0.9,
  isOccluded: true,
};

export default function OpenBoxServicePills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full max-w-[390px] sm:max-w-[430px] aspect-[16/11] mx-auto select-none mt-3 mb-1 pointer-events-auto"
      aria-label="QDelta Service Kit with emerging creative service credentials"
    >
      {/* ======================================================== */}
      {/* LAYER 1: STUDIO BASE SHADOWS & INTERIOR CAVITY (BEHIND)  */}
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
        </defs>

        {/* 1. Studio Shadows on Yellow Ground */}
        {/* Soft Penumbra Ambient Spread */}
        <ellipse
          cx="212"
          cy="224"
          rx="140"
          ry="20"
          fill="url(#studio-diffuse-shadow)"
        />
        {/* Tight Umbra Contact Shadow */}
        <ellipse
          cx="210"
          cy="216"
          rx="102"
          ry="10"
          fill="url(#studio-contact-shadow)"
        />

        {/* 2. Sculptural Back Fold Facet */}
        <polygon
          points="142,102 154,62 266,62 278,102"
          fill="url(#back-panel-matte)"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.8"
        />
        {/* Back panel top rim catchlight */}
        <line
          x1="154"
          y1="62"
          x2="266"
          y2="62"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* 3. Deep Interior Cavity */}
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
      </svg>

      {/* ======================================================== */}
      {/* LAYER 2: TUCKED INTERIOR PILL (OCCLUDED BY FRONT PANEL)  */}
      {/* ======================================================== */}
      <motion.div
        key={CAVITY_PILL.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, scale: CAVITY_PILL.scale, rotate: CAVITY_PILL.initialRotate }
            : {
                opacity: 1,
                scale: CAVITY_PILL.scale,
                y: CAVITY_PILL.yDrift,
                rotate: CAVITY_PILL.rotDrift,
              }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0.4 }
            : {
                opacity: { duration: 0.6, delay: CAVITY_PILL.delay },
                y: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: CAVITY_PILL.duration,
                  ease: "easeInOut",
                  delay: CAVITY_PILL.delay,
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: CAVITY_PILL.duration * 1.15,
                  ease: "easeInOut",
                  delay: CAVITY_PILL.delay,
                },
              }
        }
        className={`absolute ${CAVITY_PILL.className}`}
      >
        <div className="relative inline-flex items-center justify-center rounded-full bg-[#EAECEF] px-3 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.18)] border border-black/10 select-none">
          <span className="font-epilogue font-bold text-[10.5px] sm:text-[11px] text-zinc-700 tracking-tight whitespace-nowrap">
            {CAVITY_PILL.label}
          </span>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* LAYER 3: SCULPTURAL PRODUCT BODY & SIDE WINGS (FRONT)    */}
      {/* ======================================================== */}
      <svg
        viewBox="0 0 420 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <defs>
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

        {/* Left Folded Sculptural Wing */}
        <polygon
          points="104,136 32,112 70,76 142,102"
          fill="url(#left-wing-matte)"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="0.8"
        />
        {/* Left Wing Top Ridge Highlight */}
        <line
          x1="70"
          y1="76"
          x2="32"
          y2="112"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Right Folded Sculptural Wing */}
        <polygon
          points="316,136 278,102 350,76 388,112"
          fill="url(#right-wing-matte)"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth="0.8"
        />
        {/* Right Wing Top Ridge Highlight */}
        <line
          x1="350"
          y1="76"
          x2="388"
          y2="112"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Front Sculptural Body Facet */}
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

        {/* Minimal Debossed Editorial Kit Branding */}
        <g opacity="0.48" className="select-none">
          <text
            x="210"
            y="172"
            textAnchor="middle"
            fill="#18181B"
            fontSize="8.5"
            fontFamily="var(--font-epilogue), system-ui, sans-serif"
            fontWeight="800"
            letterSpacing="0.26em"
          >
            QDELTA // SERVICE KIT
          </text>
          <text
            x="210"
            y="184"
            textAnchor="middle"
            fill="#27272A"
            fontSize="6.5"
            fontFamily="var(--font-excon), system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="0.32em"
          >
            CORE CAPABILITIES — 2026
          </text>
        </g>
      </svg>

      {/* ======================================================== */}
      {/* LAYER 4: FLOATING & EDGE SERVICE PILLS (ART-DIRECTED)    */}
      {/* ======================================================== */}
      {PILLS.map((pill) => {
        return (
          <motion.div
            key={pill.id}
            initial={{ opacity: 0, scale: (pill.scale || 1) * 0.88, y: 12 }}
            animate={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    scale: pill.scale || 1,
                    y: 0,
                    rotate: pill.initialRotate,
                  }
                : {
                    opacity: 1,
                    scale: pill.scale || 1,
                    y: pill.yDrift,
                    rotate: pill.rotDrift,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.4, delay: pill.delay * 0.4 }
                : {
                    opacity: { duration: 0.5, delay: pill.delay * 0.25 },
                    scale: { duration: 0.5, delay: pill.delay * 0.25 },
                    y: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: pill.duration,
                      ease: "easeInOut",
                      delay: pill.delay,
                    },
                    rotate: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: pill.duration * 1.15,
                      ease: "easeInOut",
                      delay: pill.delay,
                    },
                  }
            }
            whileHover={{
              scale: (pill.scale || 1) * 1.07,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            className={`absolute ${pill.className}`}
          >
            {pill.isDark ? (
              // Matte Black Contrast Pill (UI/UX Hero Credential)
              <div className="group relative inline-flex items-center justify-center rounded-full bg-[#0D0E12] px-3.5 sm:px-4 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.28),0_2px_6px_rgba(0,0,0,0.14)] border border-white/20 cursor-default transition-all duration-200 hover:border-white/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.38)]">
                <span className="font-epilogue font-bold text-xs sm:text-[13px] text-white tracking-tight whitespace-nowrap">
                  {pill.label}
                </span>
              </div>
            ) : (
              // Editorial Solid Matte Off-White Pill
              <div className="group relative inline-flex items-center justify-center rounded-full bg-[#FAFAFC] px-3 sm:px-3.5 py-1 sm:py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.05)] border border-black/[0.09] cursor-default transition-all duration-200 hover:bg-white hover:border-black/25 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                <span className="font-epilogue font-bold text-[11px] sm:text-xs text-zinc-900 tracking-tight whitespace-nowrap">
                  {pill.label}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
