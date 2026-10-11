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
        className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-center items-center
          min-h-[190px] sm:min-h-[210px] md:min-h-[230px] lg:min-h-[240px]
          py-7 sm:py-8 md:py-9 lg:py-10 px-5 sm:px-7 md:px-9 lg:px-12
          bg-gradient-to-b from-[#FFC220] via-[#FAB406] to-[#EAA400] text-[#050608]
          border-t border-l border-r border-[#EAA808]
          border-b-[4px] sm:border-b-[5px] border-b-[#B87700]
          shadow-[0_22px_55px_-10px_rgba(0,0,0,0.85),0_10px_20px_-5px_rgba(0,0,0,0.5),inset_0_1.5px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.15)]"
      >
        {/* Crisp Top Specular 3D Reflection Hairline */}
        <div
          className="pointer-events-none absolute inset-x-4 sm:inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20"
          aria-hidden="true"
        />

        {/* 3D Directional Ambient Highlight Sheen */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.12] blur-2xl z-10"
          aria-hidden="true"
        />

        {/* Subtle Texture Grain Over Radiant Golden Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
          }}
          aria-hidden="true"
        />

        {/* Vertically & Horizontally Centered Responsive Grid */}
        <div className="relative z-10 w-full max-w-5xl mx-auto my-auto grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 lg:gap-10 items-center justify-center">
          {/* Left Column: Bold Headline in Pure High-Contrast Jet Black */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-excon font-extrabold tracking-tight leading-[1.08] text-[#050608] drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
              <span className="block text-[#050608]">{service.titleLine1}</span>
              <span className="block text-[#050608] mt-0.5 sm:mt-1">{service.titleLine2}</span>
            </h3>
          </div>

          {/* Right Column: Tagline + Description + Feature Pills */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-3 pt-3.5 md:pt-0 border-t border-black/15 md:border-t-0 md:border-l md:border-black/20 md:shadow-[-1px_0_0_rgba(255,255,255,0.25)] md:pl-7 lg:pl-10">
            {/* Tagline + Description with Solid Dark Contrast */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#050608] shrink-0" fill="currentColor" />
                <p className="text-sm sm:text-base font-epilogue font-extrabold text-[#050608] tracking-tight">
                  {service.tagline}
                </p>
              </div>
              <p className="text-xs sm:text-sm md:text-[14px] font-epilogue font-medium text-[#050608]/90 leading-relaxed max-w-xl">
                {service.description}
              </p>
            </div>

            {/* Feature Badges / Pills with 3D tactile bevel */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-epilogue font-bold text-white bg-[#050608] border-b border-black/80 shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] tracking-tight transition-transform duration-200 hover:scale-105 cursor-default select-none"
                >
                  {tag}
                </span>
              ))}
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FAB406]/50 to-transparent z-10" aria-hidden />
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

