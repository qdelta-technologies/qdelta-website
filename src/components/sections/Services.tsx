"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Capability {
  number: string;
  tag: string;
  title: string;
  headline: string;
  desc: string;
  bestFor: string;
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    tag: "BRAND & BUSINESS",
    title: "Brand & Business Websites",
    headline: "Establish market presence.",
    desc: "High-performance websites built to articulate value and convert visitors into clients.",
    bestFor: "Businesses, modern brands & founders",
  },
  {
    number: "02",
    tag: "HIGH CONVERSION",
    title: "High-Converting Landing Pages",
    headline: "Turn attention into action.",
    desc: "Laser-focused, fast pages designed to maximize signups and sales.",
    bestFor: "Campaigns, SaaS & product launches",
  },
  {
    number: "03",
    tag: "3D & MOTION",
    title: "3D & Animated Experiences",
    headline: "Standout visual immersion.",
    desc: "Interactive WebGL physics, fluid motion, and dynamic storytelling.",
    bestFor: "Luxury labels & creative studios",
  },
  {
    number: "04",
    tag: "E-COMMERCE",
    title: "E-commerce Platform",
    headline: "Seamless online selling.",
    desc: "Intuitive shopping flows optimized for rapid discovery and frictionless checkout.",
    bestFor: "D2C brands & retail stores",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative z-20 w-full bg-[#040407] text-white py-24 sm:py-32 md:py-36 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Subtle Warm Ambient Background Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[38rem] w-[58rem] rounded-full bg-[#FAB406]/[0.04] blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(250,180,6,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e5d5b8] shadow-[0_0_8px_#e5d5b8]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e5d5b8]">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              What We Do
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Four specialized engineering disciplines built for high performance and visual impact.
          </p>
        </div>

        {/* Pure Architectural Typographic List with Responsive 12-Column Grid */}
        <div className="divide-y divide-white/[0.08]">
          {CAPABILITIES.map((cap, idx) => {
            return (
              <Link
                key={cap.number}
                href="#contact"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative block py-8 sm:py-10 md:py-12 transition-all duration-300 hover:bg-[#fab406]/[0.06] hover:shadow-[0_0_35px_rgba(250,180,6,0.12)] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center">
                  {/* Left Column: Number, Title, Sub-headline (Span 5) */}
                  <div className="lg:col-span-5 flex items-start sm:items-center gap-5 sm:gap-6">
                    <span className="font-mono text-xs sm:text-sm text-[#fab406] pt-1 sm:pt-0 shrink-0 font-medium">
                      /{cap.number}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white group-hover:translate-x-1.5 transition-transform duration-300">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#fab406] font-medium">
                        {cap.headline}
                      </p>
                    </div>
                  </div>

                  {/* Center Column: Description with dedicated space (Span 4) */}
                  <div className="lg:col-span-4 pl-8 sm:pl-10 lg:pl-0">
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  {/* Right Column: Best For (Span 3) */}
                  <div className="lg:col-span-3 pl-8 sm:pl-10 lg:pl-0 text-left lg:text-right">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      Best for
                    </span>
                    <span className="block text-xs sm:text-[13px] text-zinc-200 font-light mt-0.5">
                      {cap.bestFor}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
