"use client";

import React, { useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface ServiceItem {
  number: string;
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  description: string;
  tags: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    titleLine1: "Landing Pages &",
    titleLine2: "Digital Sales Experiences",
    tagline: "Turn attention into action.",
    description:
      "Conversion-focused digital experiences built to present your offer clearly and guide visitors towards enquiries, bookings or purchases.",
    tags: [
      "Landing Pages",
      "Sales Pages",
      "Lead Generation",
      "Checkout Integrations",
      "Digital Products",
    ],
  },
  {
    number: "02",
    titleLine1: "Premium Websites &",
    titleLine2: "Brand Experiences",
    tagline: "Make your digital presence feel like your brand.",
    description:
      "Custom websites combining premium UI/UX, storytelling and thoughtful interactions to communicate your business and create a stronger online presence.",
    tags: [
      "Custom UI/UX",
      "Multi-page Websites",
      "Brand Storytelling",
      "Responsive Development",
      "Premium Interactions",
    ],
  },
  {
    number: "03",
    titleLine1: "Motion, Interactive &",
    titleLine2: "3D Experiences",
    tagline: "Make the experience worth remembering.",
    description:
      "Purposeful animation, scroll interactions and selected 3D experiences that add depth and personality while keeping the website clear and usable.",
    tags: [
      "Scroll Animation",
      "Micro-interactions",
      "Motion Design",
      "Interactive Experiences",
      "3D",
    ],
  },
  {
    number: "04",
    titleLine1: "Premium",
    titleLine2: "E-commerce Websites",
    tagline: "Turn products into experiences.",
    description:
      "Premium online stores combining brand storytelling, product presentation and reliable commerce functionality to create a better journey from discovery to purchase.",
    tags: [
      "Premium Storefronts",
      "Product Experiences",
      "Shopify",
      "Collections",
      "Checkout",
    ],
  },
];

interface StackCardProps {
  service: ServiceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StackCard({ service, index, total, progress }: StackCardProps) {
  // Controlled scale down: each previous card scales down very slightly (e.g. 0.94 - 1.0)
  // as subsequent cards stack over it
  const targetScale = 1 - (total - 1 - index) * 0.02;
  const startRange = index * (1 / total);
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  return (
    <div
      className="sticky w-full"
      style={{
        top: `calc(88px + ${index * 26}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className="group relative w-full rounded-2xl sm:rounded-[22px] border border-black/15 bg-gradient-to-b from-[#F0C034] via-[#E7B72A] to-[#DCAB22] text-[#06070A] p-7 sm:p-9 md:p-10 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.55),0_24px_50px_-10px_rgba(0,0,0,0.65),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[300px] md:min-h-[320px]"
      >
        {/* Crisp Top Specular Highlight for 3D depth */}
        <div className="pointer-events-none absolute top-0 inset-x-6 sm:inset-x-10 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 inset-x-6 sm:inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent" />

        {/* Card Body: Dominant Headline */}
        <div className="relative z-10 pb-4 sm:pb-5">
          <h3 className="text-2xl min-[480px]:text-3xl sm:text-4xl md:text-[42px] font-excon font-bold tracking-tight leading-[1.12]">
            <span className="block text-[#06070A]">
              {service.titleLine1}
            </span>
            <span className="block text-[#06070A]/85 font-bold mt-0.5 sm:mt-1">
              {service.titleLine2}
            </span>
          </h3>
        </div>

        {/* Card Footer: Capability Tags + Tagline Hook & Description */}
        <div className="space-y-4 pt-4 sm:pt-5 border-t border-black/15 relative z-10">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-epilogue font-semibold text-[#06070A] bg-black/[0.08] hover:bg-black/12 border border-black/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.06)] transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tagline Hook + Description with Starburst */}
          <div className="flex items-start gap-3 sm:gap-3.5 max-w-3xl">
            <div className="mt-1 shrink-0">
              <Sparkles className="w-4 h-4 text-[#06070A] fill-[#06070A]" />
            </div>

            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-epilogue font-bold text-[#06070A] tracking-tight">
                {service.tagline}
              </p>
              <p className="text-xs sm:text-sm font-epilogue font-normal text-[#06070A]/85 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 w-full bg-[#06070A] text-white py-16 sm:py-20 md:py-24 scroll-mt-12 overflow-visible"
    >
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="left" />

      {/* ================= SECTION INTRO ================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10">
        {/* Editorial Section Identifier */}
        <div className="flex items-center gap-3 mb-4 select-none">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400">
            02 / Capabilities
          </span>
          <div className="w-10 sm:w-12 h-[1px] bg-[#E7B72A]/60" />
        </div>

        {/* Headline & Supporting Text in Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-excon font-bold tracking-tight text-white leading-[1.12]">
              Digital experiences built around your business.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed">
              From focused landing pages to flagship websites, we build digital experiences designed to communicate value, build trust and turn visitors into clients.
            </p>
          </div>
        </div>
      </div>

      {/* ================= STACKED CARDS SCROLL TRACK ================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-10 sm:space-y-14 md:space-y-16 pb-10 sm:pb-14">
        {SERVICES.map((service, index) => (
          <StackCard
            key={service.number}
            service={service}
            index={index}
            total={SERVICES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

