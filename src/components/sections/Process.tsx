"use client";

import React from "react";
import {
  Compass,
  Layers,
  Sparkles,
  Rocket,
  TrendingUp,
} from "lucide-react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import ProcessMobileJourney from "@/components/sections/ProcessMobileJourney";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We understand your business, audience, goals and project requirements before anything begins.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We define the structure, scope, content direction and the right approach for the project.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "We turn the strategy into a polished digital experience through thoughtful design, development and interactions.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Refine & Launch",
    description:
      "We review, test and improve the project before preparing everything for a smooth launch.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Support & Grow",
    description:
      "After launch, we provide agreed support and can continue with maintenance and improvements as needed.",
    icon: TrendingUp,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative z-20 w-full bg-[#080B10] text-white selection:bg-[#E5B528] selection:text-[#06070A] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Top yellow hairline separator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent z-10"
        aria-hidden
      />

      {/* Ambient Atmosphere */}
      <SectionAtmosphere variant="dual" gridOpacity={0.25} />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ======================================================= */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================= */}
        <div className="flex flex-col items-center text-center mb-8 lg:mb-12 max-w-3xl">
          {/* Unified Section Eyebrow */}
          <SectionEyebrow>How We Work</SectionEyebrow>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-bold tracking-tight text-white leading-[1.14] text-balance">
            Every project starts with a clear process.
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base font-epilogue text-zinc-300 font-normal leading-relaxed text-balance max-w-2xl">
            A structured workflow with clear milestones that keeps everything on track and turns ideas into high-performing digital experiences.
          </p>
        </div>

        {/* ======================================================= */}
        {/* DESKTOP VIEW: CLEAN STATIC PROCESS TIMELINE RAIL        */}
        {/* ======================================================= */}
        <div className="hidden lg:block relative w-full mb-4 select-none">
          <div className="relative w-full min-h-[480px]">
            {/* Full-width golden connecting rail (behind nodes) */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-1/2 z-[1] h-[2px] -translate-y-1/2"
              aria-hidden
            >
              <div className="h-full w-full bg-gradient-to-r from-[#E5B528]/25 via-[#E5B528]/75 to-[#E5B528]/25 shadow-[0_0_10px_rgba(229,181,40,0.45)]" />
            </div>

            {/* 5 columns × 3 rows — middle row = nodes on the rail */}
            <div className="relative z-10 grid w-full grid-cols-5 gap-2 xl:gap-3">
              {STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isAbove = idx % 2 === 0; // Steps 1, 3, 5 above rail; Steps 2, 4 below

                const cardMarkup = (
                  <div className="group/card relative w-full max-w-[236px] overflow-hidden rounded-xl border border-white/[0.12] hover:border-[#E5B528]/60 bg-[#0B0E12]/92 hover:bg-[#0E1217] p-5 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_40px_rgba(229,181,40,0.16)] transition-all duration-300 hover:-translate-y-1">
                    {/* Top gold hairline */}
                    <div className="pointer-events-none absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 group-hover/card:via-[#E5B528]/90 to-transparent transition-all duration-300" />

                    <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
                      <span className="font-epilogue text-xs uppercase tracking-[0.2em] font-bold text-[#E5B528]">
                        STEP {step.number}
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E5B528]/15 text-[#E5B528] ring-1 ring-[#E5B528]/40 shadow-[0_0_12px_rgba(229,181,40,0.25)] group-hover/card:scale-110 transition-transform duration-300">
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="mt-3 font-excon text-base font-bold tracking-tight text-white leading-snug group-hover/card:text-[#E5B528] transition-colors duration-200">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 font-epilogue text-[13px] leading-relaxed text-zinc-300 font-normal">
                      {step.description}
                    </p>
                  </div>
                );

                return (
                  <div
                    key={step.number}
                    className="grid min-h-[480px] grid-rows-[1fr_auto_1fr] px-1"
                  >
                    {/* Row 1 — top cards (Steps 01, 03, 05) */}
                    <div className="flex flex-col items-center justify-end pb-0">
                      {isAbove ? (
                        <>
                          {cardMarkup}
                          <div className="mt-0 h-9 w-[2px] shrink-0 bg-gradient-to-b from-[#E5B528]/70 to-[#E5B528]/35" />
                        </>
                      ) : (
                        <div className="min-h-[1px] flex-1" aria-hidden />
                      )}
                    </div>

                    {/* Row 2 — node centered on shared rail */}
                    <div className="relative z-20 flex items-center justify-center py-0">
                      <div className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#E5B528] bg-[#06070A] shadow-[0_0_12px_rgba(229,181,40,0.55)]">
                        <div className="h-2 w-2 rounded-full bg-[#E5B528] shadow-[0_0_6px_#E5B528]" />
                      </div>
                    </div>

                    {/* Row 3 — bottom cards (Steps 02, 04) */}
                    <div className="flex flex-col items-center justify-start pt-0">
                      {!isAbove ? (
                        <>
                          <div className="mb-0 h-9 w-[2px] shrink-0 bg-gradient-to-t from-[#E5B528]/70 to-[#E5B528]/35" />
                          {cardMarkup}
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
        {/* MOBILE / TABLET: 10-step road journey                   */}
        {/* ======================================================= */}
        <div className="lg:hidden w-full">
          <ProcessMobileJourney />
        </div>
      </div>
    </section>
  );
}
