"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface ProcessStep {
  number: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    index: 1,
    title: "Plan",
    tagline: "Strategy, Architecture & Scope",
    description:
      "We dissect your business goals, target audience, and competitive landscape to build a complete architectural blueprint and delivery roadmap before writing a single line of code.",
    deliverables: ["Strategy Blueprint", "Information Architecture", "Technical Roadmap"],
  },
  {
    number: "02",
    index: 2,
    title: "Design",
    tagline: "Visual Identity & Bespoke UI/UX",
    description:
      "We craft tailored design systems, bespoke typography hierarchies, and luxury art direction that establish immediate authority and brand prestige.",
    deliverables: ["Figma Design System", "Art Direction", "Responsive UI Suite"],
  },
  {
    number: "03",
    index: 3,
    title: "Prototype",
    tagline: "Interactive Motion & Tactile Physics",
    description:
      "High-fidelity clickable prototypes allow you to experience the exact feel, transitions, and micro-interactions of your future product on desktop and mobile.",
    deliverables: ["Clickable Prototypes", "Motion Choreography", "Interaction Previews"],
  },
  {
    number: "04",
    index: 4,
    title: "Approval",
    tagline: "Collaborative Review & Milestone Sign-Off",
    description:
      "Transparent milestone walkthroughs ensure every interface detail, animation curve, and user flow aligns seamlessly with your vision before engineering begins.",
    deliverables: ["Design Walkthrough", "Feedback Revisions", "Milestone Sign-Off"],
  },
  {
    number: "05",
    index: 5,
    title: "Development",
    tagline: "Next.js 16 & High-Performance Engineering",
    description:
      "Designs are translated into clean, modular TypeScript with Next.js 16 Server Components, custom GPU shaders, and fluid GSAP/Motion micro-interactions.",
    deliverables: ["Next.js 16 & React 19", "Edge API Pipelines", "Custom Integrations"],
  },
  {
    number: "06",
    index: 6,
    title: "Testing",
    tagline: "QA, Cross-Device & Core Web Vitals",
    description:
      "Rigorous cross-browser verification, accessibility audits, and performance tuning guarantee a locked 60fps framerate and 100/100 Lighthouse score.",
    deliverables: ["Core Web Vitals 100/100", "Cross-Device QA", "Security Verification"],
  },
  {
    number: "07",
    index: 7,
    title: "Deployment",
    tagline: "Global Edge CDN & Instant DNS Launch",
    description:
      "We orchestrate a seamless worldwide edge rollout with automated SSL certificates, instant DNS propagation, and structured SEO schema indexing.",
    deliverables: ["Edge CDN Deployment", "DNS & SSL Provisioning", "Search Indexing"],
  },
  {
    number: "08",
    index: 8,
    title: "Support",
    tagline: "Continuous Telemetry & Scaling",
    description:
      "Our partnership continues post-launch with proactive performance monitoring, uptime telemetry, iterative feature scaling, and dedicated SLA support.",
    deliverables: ["Real-Time Telemetry", "Feature Iteration", "Dedicated Agency SLA"],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = STEPS[activeStep];

  return (
    <section
      id="process"
      className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black border-t border-white/10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[35rem] w-[35rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.06] to-transparent blur-[140px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
              Our Process
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            From Blueprint to <span className="italic text-[#FAB406]">Launch</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed">
            An 8-stage precision engineering workflow ensuring clarity, speed, and zero surprises.
          </p>
        </div>

        {/* Process Interactive Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          {/* Left Column: Step Navigation List */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex items-center justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border border-[#FAB406]/50 bg-[#0e0e14] shadow-[0_0_30px_rgba(250,180,6,0.12)]"
                      : "border border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-mono font-bold transition-colors ${
                        isActive ? "text-[#FAB406]" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <h4
                        className={`font-sans text-sm sm:text-base font-bold transition-colors ${
                          isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 line-clamp-1">
                        {step.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "text-[#FAB406] translate-x-1"
                        : "text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Step Detail Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-3xl border border-white/10 bg-[#0e0e14]/95 p-7 sm:p-10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
              >
                {/* Active Step Number & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAB406]/10 border border-[#FAB406]/30 text-sm font-mono font-bold text-[#FAB406]">
                      {currentStep.number}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#FAB406]">
                        STAGE {currentStep.index} OF 8
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-0.5">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Tagline */}
                <h4 className="mt-6 text-base sm:text-lg font-semibold text-zinc-200">
                  {currentStep.tagline}
                </h4>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-normal">
                  {currentStep.description}
                </p>

                {/* Deliverables Checklist Box */}
                <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FAB406] font-semibold block mb-3">
                    Key Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentStep.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-[#FAB406] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
