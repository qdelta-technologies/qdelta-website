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
        className="group relative w-full rounded-xl sm:rounded-[18px] border border-black/15 bg-gradient-to-br from-[#F3C742] via-[#E7B72A] to-[#D9A51A] text-[#06070A] p-6 sm:p-8 md:p-9 shadow-[0_-12px_32px_rgba(0,0,0,0.35),0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[320px] sm:min-h-[360px] md:min-h-[380px]"
      >
        {/* Subtle Ambient Top Hairline Accent */}
        <div className="absolute top-0 inset-x-8 sm:inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />

        {/* Card Header: Service Number and Minimal Category / Inquire link */}
        <div className="flex items-center justify-between border-b border-black/15 pb-3.5 sm:pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-epilogue text-sm sm:text-base font-bold text-[#06070A] tracking-wider">
              {service.number}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#06070A]/60" />
            <span className="text-[11px] sm:text-xs font-epilogue uppercase tracking-[0.2em] text-[#06070A]/75 font-semibold">
              Capability
            </span>
          </div>

          <Link
            href="#contact"
            className="group/link inline-flex items-center gap-2 text-xs font-epilogue uppercase tracking-wider text-[#06070A] font-bold transition-colors"
          >
            <span className="hidden sm:inline">Inquire Service</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#06070A] text-[#F5B800] group-hover/link:bg-zinc-900 group-hover/link:scale-105 flex items-center justify-center transition-all shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B800] transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </div>
          </Link>
        </div>

        {/* Card Body: Dominant Headline */}
        <div className="my-auto py-4 sm:py-5 relative z-10">
          <h3 className="text-2xl min-[480px]:text-3xl sm:text-4xl md:text-[40px] font-excon font-bold tracking-tight leading-[1.12]">
            <span className="block text-[#06070A]">
              {service.titleLine1}
            </span>
            <span className="block text-[#06070A]/80 font-bold mt-0.5 sm:mt-1">
              {service.titleLine2}
            </span>
          </h3>
        </div>

        {/* Card Footer: Minimal Capability Tags + Tagline Hook & Description */}
        <div className="space-y-3.5 sm:space-y-4 pt-3.5 sm:pt-4 border-t border-black/15 relative z-10">
          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-epilogue font-medium text-[#06070A] bg-black/10 hover:bg-black/15 border border-black/15 transition-colors"
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
              <p className="text-xs sm:text-sm font-epilogue font-normal text-[#06070A]/80 leading-relaxed max-w-2xl">
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
      {/* Subtle Warm Gold Technical Grid */}
      <div className="pointer-events-none absolute inset-0 bg-qdelta-grid [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Background Lighting Elements */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[60rem] rounded-full bg-[#F5B800]/[0.03] blur-[150px]" />

      {/* ================= SECTION INTRO ================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10">
        {/* Editorial Section Identifier */}
        <div className="flex items-center gap-3 mb-4 select-none">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400">
            02 / Capabilities
          </span>
          <div className="w-10 sm:w-12 h-[1px] bg-[#F5B800]/60" />
        </div>

        {/* Headline & Supporting Text in Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-excon font-bold tracking-tight text-white leading-[1.12]">
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

