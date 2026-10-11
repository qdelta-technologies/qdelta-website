"use client";

import React, { useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionProgress } from "@/utils/useSectionProgress";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

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
    titleLine1: "High-Converting",
    titleLine2: "Landing Pages",
    tagline: "Turn attention into action.",
    description:
      "Focused landing pages designed to communicate your offer clearly and drive enquiries, bookings or sales.",
    tags: ["Landing Pages", "Sales Pages", "Conversion UX", "Checkout Integration"],
  },
  {
    number: "02",
    titleLine1: "Premium Interactive",
    titleLine2: "Websites",
    tagline: "Make your brand impossible to ignore.",
    description:
      "Premium websites combining strong visual design, storytelling, motion and interaction to create a memorable digital presence.",
    tags: ["Custom UI/UX", "Brand Storytelling", "Motion Design", "Interactive Experiences"],
  },
  {
    number: "03",
    titleLine1: "E-commerce &",
    titleLine2: "Online Stores",
    tagline: "Turn products into experiences.",
    description:
      "Premium online stores built to present products beautifully and create a smooth journey from discovery to purchase.",
    tags: ["Premium Storefronts", "Product Pages", "Shopify", "Checkout"],
  },
  {
    number: "04",
    titleLine1: "Lead Capture",
    titleLine2: "Systems",
    tagline: "Turn visitors into opportunities.",
    description:
      "Structured lead capture experiences designed to collect enquiries and connect prospects with your business.",
    tags: ["Lead Forms", "Lead Magnets", "CRM Integration", "Booking Flows"],
  },
  {
    number: "05",
    titleLine1: "Full Stack Web &",
    titleLine2: "App Development",
    tagline: "From idea to working product.",
    description:
      "Custom web applications and digital products built around your business requirements and user needs.",
    tags: ["Web Applications", "MVP Development", "Dashboards", "Custom Systems"],
  },
  {
    number: "06",
    titleLine1: "AI Automation &",
    titleLine2: "Chatbots",
    tagline: "Make everyday work smarter.",
    description:
      "Practical AI-powered tools and automations designed to reduce repetitive work and improve customer interactions.",
    tags: ["AI Chatbots", "Workflow Automation", "AI Integrations", "Smart Assistants"],
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
        className="group relative w-full rounded-md overflow-hidden flex flex-col justify-between min-h-[220px] sm:min-h-[300px] md:min-h-[320px] p-5 sm:p-9 md:p-10
          bg-[#0D0F13]
          border border-[#E5B528]/40
          shadow-[0_8px_28px_-4px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.35)]"
      >
        {/* Card headline */}
        <div className="relative z-10 pb-3 sm:pb-5">
          <h3 className="text-xl min-[480px]:text-2xl sm:text-4xl md:text-[42px] font-excon font-bold tracking-tight leading-[1.1] text-white">
            <span className="block">{service.titleLine1}</span>
            <span className="block text-white/85 mt-0.5 sm:mt-1">{service.titleLine2}</span>
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
  const scrollYProgress = useSectionProgress(containerRef, 1024);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 w-full bg-[#06070A] text-white py-16 sm:py-20 md:py-24 scroll-mt-12 overflow-visible"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent z-10" aria-hidden />
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
        {/* Unified Section Eyebrow */}
        <SectionEyebrow>Our Services</SectionEyebrow>

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

