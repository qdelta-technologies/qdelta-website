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
        style={{ scale, transformOrigin: "top center", willChange: "transform" }}
        className="group relative w-full rounded-2xl sm:rounded-[22px] overflow-hidden flex flex-col justify-between min-h-[220px] sm:min-h-[300px] md:min-h-[320px] p-5 sm:p-9 md:p-10
          bg-[#0B0E13]
          border border-white/[0.07]
          shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(229,181,40,0.07),inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        {/* Ambient gold glow — top-right corner */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-full blur-[50px] opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #E5B528 0%, transparent 70%)" }}
          aria-hidden
        />

        {/* Top gold hairline */}
        <div className="pointer-events-none absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#E5B528]/40 to-transparent" aria-hidden />

        {/* Card headline */}
        <div className="relative z-10 pb-3 sm:pb-5">
          <h3 className="text-xl min-[480px]:text-2xl sm:text-4xl md:text-[42px] font-excon font-bold tracking-tight leading-[1.1] text-white">
            <span className="block">{service.titleLine1}</span>
            <span className="block text-white/70 mt-0.5 sm:mt-1">{service.titleLine2}</span>
          </h3>
        </div>

        {/* Footer: separator + tags + tagline */}
        <div className="relative z-10 space-y-3 pt-3 sm:pt-5 border-t border-white/[0.07]">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-epilogue font-semibold text-zinc-300 bg-white/[0.05] border border-white/[0.1] hover:border-[#E5B528]/40 hover:text-[#E5B528] transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tagline + description */}
          <div className="flex items-start gap-3 max-w-3xl">
            <div className="mt-1 shrink-0">
              <Sparkles className="w-4 h-4 text-[#E5B528]" fill="currentColor" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-epilogue font-bold text-[#E5B528] tracking-tight">
                {service.tagline}
              </p>
              <p className="text-[13px] sm:text-[15px] font-epilogue text-zinc-400 leading-relaxed max-w-2xl">
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
      <SectionAtmosphere variant="left" gridOpacity={0.2} />

      {/* ================= SECTION INTRO ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10"
      >
        {/* Editorial Section Identifier */}
        <div className="mb-4 select-none">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]/75">
            Our Services
          </span>
        </div>

        {/* Headline & Supporting Text in Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-white leading-[1.12]">
              Digital experiences built around your business.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed">
              From focused landing pages to flagship websites, we build digital experiences designed to communicate value, build trust and turn visitors into clients.
            </p>
          </div>
        </div>
      </motion.div>

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

