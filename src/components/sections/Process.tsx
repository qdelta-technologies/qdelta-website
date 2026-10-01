"use client";

import React, { useState } from "react";
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
import { motion } from "motion/react";

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
    accentColor: "#38BDF8",
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

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="relative z-20 w-full bg-[#07080e] text-white selection:bg-[#FAB406] selection:text-black py-20 sm:py-28 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient Lighting Background Halos */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[65rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.035] via-sky-500/[0.02] to-transparent blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ======================================================= */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14 sm:mb-18 max-w-3xl"
        >
          {/* Editorial Section Identifier (No container/capsule) */}
          <div className="flex items-center gap-3.5 mb-5 sm:mb-6 select-none justify-center">
            <span className="font-excon text-xs sm:text-[13px] tracking-[0.24em] uppercase text-zinc-400 font-medium">
              03 / HOW WE WORK
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-[#FAB406]/60" />
            <svg
              className="w-2.5 h-2.5 text-[#FAB406] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-epilogue font-bold tracking-tight text-white leading-[1.12] text-balance">
            A structured path from concept to launch.
          </h2>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base md:text-lg font-excon text-zinc-400 font-normal leading-relaxed text-balance max-w-2xl">
            A transparent, milestone-driven workflow that eliminates friction and turns complex requirements into high-performing websites.
          </p>
        </motion.div>

        {/* ======================================================= */}
        {/* DESKTOP VIEW: HORIZONTAL ALTERNATING PROCESS RAIL       */}
        {/* ======================================================= */}
        <div className="hidden lg:block relative w-full mb-16 select-none">
          {/* Main Container with generous vertical height for alternating cards */}
          <div className="relative w-full min-h-[520px] flex flex-col justify-between">
            {/* The Central Glowing Horizon Process Rail */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] z-0 pointer-events-none">
              {/* Subtle background rail line */}
              <div className="w-full h-full bg-white/[0.08]" />

              {/* Glowing progressive horizon highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAB406]/40 via-sky-400/30 to-transparent" />
            </div>

            {/* 5-Column Grid spanning the container */}
            <div className="relative z-10 grid grid-cols-5 gap-4 w-full h-full items-center">
              {STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isOdd = idx % 2 === 0; // Steps 1, 3, 5 sit ABOVE; Steps 2, 4 sit BELOW
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={step.number}
                    className="relative flex flex-col items-center justify-center h-full group"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* ----------------- TOP POSITION (Steps 01, 03, 05) ----------------- */}
                    {isOdd ? (
                      <div className="flex flex-col items-center mb-auto pt-2">
                        {/* Floating Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className={`w-full max-w-[245px] rounded-2xl sm:rounded-[24px] border p-5 sm:p-6 transition-all duration-300 ${
                            isHovered
                              ? "border-[#FAB406]/50 bg-[#0d1018] shadow-[0_16px_40px_rgba(250,180,6,0.12)] -translate-y-1.5"
                              : "border-white/[0.09] bg-[#090b11]/90 shadow-[0_12px_32px_rgba(0,0,0,0.65)] hover:border-white/20"
                          }`}
                        >
                          {/* Card Top: Step number & Icon */}
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                            <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-[#FAB406]">
                              STEP {step.number}
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-300 transition-colors group-hover:text-[#FAB406] group-hover:bg-[#FAB406]/10">
                              <IconComponent className="h-4 w-4" />
                            </div>
                          </div>

                          {/* Step Title */}
                          <h3 className="mt-3.5 font-epilogue text-lg font-bold text-white tracking-tight leading-snug">
                            {step.title}
                          </h3>

                          {/* Short Description */}
                          <p className="mt-2 font-excon text-xs text-zinc-300 leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </motion.div>

                        {/* Vertical Connector Line to Rail */}
                        <div
                          className={`w-[1.5px] h-8 transition-colors duration-300 ${
                            isHovered
                              ? "bg-gradient-to-b from-[#FAB406] to-[#FAB406]/40"
                              : "bg-white/15"
                          }`}
                        />
                      </div>
                    ) : (
                      // Spacer for the top half when card is below
                      <div className="h-[210px] w-full pointer-events-none" />
                    )}

                    {/* ----------------- TIMELINE NODE (ON THE RAIL) ----------------- */}
                    <div className="relative my-auto flex items-center justify-center z-20">
                      {/* Node Outer Pulsing Aura */}
                      <div
                        className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${
                          isHovered
                            ? "bg-[#FAB406]/20 scale-125 blur-sm"
                            : "bg-transparent scale-100"
                        }`}
                      />

                      {/* Node Core Circle */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-[#080a10] transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "border-[#FAB406] shadow-[0_0_14px_#FAB406] scale-110"
                            : "border-white/30 group-hover:border-[#FAB406]"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            isHovered
                              ? "bg-[#FAB406]"
                              : "bg-white/60 group-hover:bg-[#FAB406]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* ----------------- BOTTOM POSITION (Steps 02, 04) ----------------- */}
                    {!isOdd ? (
                      <div className="flex flex-col items-center mt-auto pb-2">
                        {/* Vertical Connector Line from Rail */}
                        <div
                          className={`w-[1.5px] h-8 transition-colors duration-300 ${
                            isHovered
                              ? "bg-gradient-to-b from-[#FAB406]/40 to-[#FAB406]"
                              : "bg-white/15"
                          }`}
                        />

                        {/* Floating Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className={`w-full max-w-[245px] rounded-2xl sm:rounded-[24px] border p-5 sm:p-6 transition-all duration-300 ${
                            isHovered
                              ? "border-[#FAB406]/50 bg-[#0d1018] shadow-[0_16px_40px_rgba(250,180,6,0.12)] translate-y-1.5"
                              : "border-white/[0.09] bg-[#090b11]/90 shadow-[0_12px_32px_rgba(0,0,0,0.65)] hover:border-white/20"
                          }`}
                        >
                          {/* Card Top: Step number & Icon */}
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                            <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-[#FAB406]">
                              STEP {step.number}
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-zinc-300 transition-colors group-hover:text-[#FAB406] group-hover:bg-[#FAB406]/10">
                              <IconComponent className="h-4 w-4" />
                            </div>
                          </div>

                          {/* Step Title */}
                          <h3 className="mt-3.5 font-epilogue text-lg font-bold text-white tracking-tight leading-snug">
                            {step.title}
                          </h3>

                          {/* Short Description */}
                          <p className="mt-2 font-excon text-xs text-zinc-300 leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </motion.div>
                      </div>
                    ) : (
                      // Spacer for the bottom half when card is above
                      <div className="h-[210px] w-full pointer-events-none" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MOBILE / TABLET VIEW: REFINED VERTICAL TIMELINE         */}
        {/* ======================================================= */}
        <div className="lg:hidden relative w-full max-w-xl mx-auto pl-4 sm:pl-6 mb-12">
          {/* Vertical Timeline Guide Rail */}
          <div className="absolute left-[27px] sm:left-[35px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FAB406] via-white/20 to-sky-400/30" />

          <div className="space-y-6 sm:space-y-8 relative">
            {STEPS.map((step, idx) => {
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Glowing Timeline Node */}
                  <div className="relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#FAB406] bg-[#080a10] shadow-[0_0_12px_rgba(250,180,6,0.5)] mt-1">
                    <span className="h-2 w-2 rounded-full bg-[#FAB406]" />
                  </div>

                  {/* Step Card Content */}
                  <div className="flex-1 rounded-2xl border border-white/[0.09] bg-[#090b11] p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-[#FAB406]/35">
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <span className="font-excon text-xs uppercase tracking-[0.2em] font-bold text-[#FAB406]">
                        STEP {step.number}
                      </span>
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-white/[0.04] text-zinc-300">
                        <IconComponent className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <h3 className="mt-3 font-epilogue text-base sm:text-lg font-bold text-white tracking-tight">
                      {step.title}
                    </h3>

                    <p className="mt-2 font-excon text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================================= */}
        {/* REASSURANCE FOOTNOTE & DIRECT ENGAGEMENT BAR            */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl rounded-2xl sm:rounded-full border border-white/[0.08] bg-[#090b10] px-6 py-4 sm:px-8 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg"
        >
          <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-excon">
            <ShieldCheck className="w-4 h-4 text-[#FAB406] shrink-0" />
            <span>Structured milestones • Transparent communication • Zero unexpected hurdles</span>
          </div>

          <Link
            href="#contact"
            className="group/cta inline-flex items-center gap-1.5 text-xs font-excon uppercase tracking-wider font-bold text-[#FAB406] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <span>Ready to start? Let&apos;s discuss your project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
