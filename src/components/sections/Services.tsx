"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

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
        className="group relative w-full rounded-2xl sm:rounded-3xl border border-black/15 bg-[#FAB406] text-black p-6 sm:p-8 md:p-10 lg:p-11 shadow-[0_-16px_36px_rgba(0,0,0,0.45),0_24px_50px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px] md:min-h-[440px] md:max-h-[520px]"
      >
        {/* Subtle Ambient Top Hairline Accent */}
        <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-black/25 to-transparent pointer-events-none" />

        {/* Card Header: Service Number and Minimal Category / Inquire link */}
        <div className="flex items-center justify-between border-b border-black/15 pb-4 sm:pb-5 relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-excon text-sm sm:text-base font-extrabold text-black tracking-wider">
              {service.number}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-black/60" />
            <span className="text-[11px] sm:text-xs font-excon uppercase tracking-[0.2em] text-black/75 font-bold">
              Capability
            </span>
          </div>

          <Link
            href="#contact"
            className="group/link inline-flex items-center gap-2 text-xs font-excon uppercase tracking-wider text-black font-bold transition-colors"
          >
            <span className="hidden sm:inline">Inquire Service</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-[#FAB406] group-hover/link:bg-zinc-900 group-hover/link:scale-105 flex items-center justify-center transition-all shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FAB406] transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </div>
          </Link>
        </div>

        {/* Card Body: Dominant Editorial Headline (in Epilogue) */}
        <div className="my-auto py-5 sm:py-7 relative z-10">
          <h3 className="text-2xl min-[480px]:text-3xl sm:text-4xl md:text-[44px] font-epilogue font-extrabold tracking-tight leading-[1.1]">
            <span className="block text-black">
              {service.titleLine1}
            </span>
            <span className="block text-black/70 font-extrabold mt-1 sm:mt-1.5">
              {service.titleLine2}
            </span>
          </h3>
        </div>

        {/* Card Footer: Minimal Capability Tags + Tagline Hook & Description */}
        <div className="space-y-4 sm:space-y-5 pt-4 sm:pt-5 border-t border-black/15 relative z-10">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-excon font-semibold text-black bg-black/10 hover:bg-black/15 border border-black/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tagline Hook + Description with Starburst */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-3xl">
            <div className="mt-1 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-black" />
            </div>

            <div className="space-y-1">
              <p className="text-sm sm:text-base md:text-lg font-epilogue font-extrabold text-black tracking-tight">
                {service.tagline}
              </p>
              <p className="text-xs sm:text-sm font-excon font-medium text-black/80 leading-relaxed max-w-2xl">
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
      className="relative z-20 w-full bg-[#08090f] text-white py-20 sm:py-28 scroll-mt-12 overflow-visible"
    >
      {/* Background Lighting Elements */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[70rem] rounded-full bg-[#FAB406]/[0.035] blur-[160px]" />

      {/* ================= SECTION INTRO ================= */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        {/* Editorial Section Identifier (No container/capsule) */}
        <div className="flex items-center gap-3.5 mb-5 sm:mb-6 select-none">
          <span className="font-excon text-xs sm:text-[13px] tracking-[0.24em] uppercase text-zinc-400 font-medium">
            02 / CAPABILITIES
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

        {/* Headline & Supporting Text in Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-epilogue font-bold tracking-tight text-white leading-[1.12]">
              Digital experiences built around your business.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base md:text-lg font-excon text-zinc-400 font-normal leading-relaxed">
              From focused landing pages to flagship websites, we build digital experiences designed to communicate value, build trust and turn visitors into clients.
            </p>
          </div>
        </div>
      </div>

      {/* ================= STACKED CARDS SCROLL TRACK ================= */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative space-y-12 sm:space-y-18 md:space-y-20 pb-12 sm:pb-18">
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
