"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Sparkles, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  accentColor: string;
}

const ALL_PROJECTS: Project[] = [
  {
    id: "aetheria",
    title: "Aetheria Neural Canvas",
    client: "Aetheria Labs",
    category: "AI & Fintech",
    year: "2026",
    tags: ["Next.js 16", "Autonomous AI", "Three.js", "WebGL"],
    description:
      "Architected a distributed operating system for real-time neural data streaming, autonomous agent collaboration, and ultra-low latency compute pipelines.",
    metric: "+340%",
    metricLabel: "Processing Velocity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    accentColor: "#FAB406",
  },
  {
    id: "vespera",
    title: "Vespera Haute Horlogerie",
    client: "Vespera Genève",
    category: "Luxury 3D",
    year: "2025",
    tags: ["WebGL Shaders", "Headless Commerce", "Kinetic UI"],
    description:
      "Engineered an immersive 3D timepiece configurator and bespoke editorial eCommerce flagship for Swiss luxury artisans with 60FPS fluid physics.",
    metric: "4.2x",
    metricLabel: "Checkout Conversion Lift",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    accentColor: "#FAB406",
  },
  {
    id: "solstice",
    title: "Solstice Liquidity Terminal",
    client: "Solstice Capital",
    category: "Fintech Terminal",
    year: "2025",
    tags: ["Rust Edge", "WebSockets", "Next.js 16", "Real-time UI"],
    description:
      "Institutional asset terminal handling over $2.8B in volume with sub-5ms real-time risk simulation and high-frequency trading visualizers.",
    metric: "$2.8B+",
    metricLabel: "Volume Settled",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80",
    accentColor: "#38bdf8",
  },
  {
    id: "kroma",
    title: "Kroma Studio Generative",
    client: "Kroma Dynamics",
    category: "Creative Tooling",
    year: "2026",
    tags: ["WASM", "GPU Shaders", "React 19", "Canvas"],
    description:
      "Generative design platform enabling creative teams to synthesize dynamic brand assets, photorealistic animations, and visual systems at scale.",
    metric: "140K+",
    metricLabel: "Active Creators",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    accentColor: "#FAB406",
  },
  {
    id: "lumiere",
    title: "Maison Lumière Architecture",
    client: "Lumière Architecture",
    category: "Luxury Flagship",
    year: "2026",
    tags: ["Spatial 3D", "Editorial", "Motion", "Bespoke UI"],
    description:
      "Ultra-luxury architectural portfolio featuring interactive photorealistic walkthroughs, tactile haptic feedback, and spatial sound design.",
    metric: "+180%",
    metricLabel: "Client Inquiries",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    accentColor: "#FAB406",
  },
  {
    id: "quantico",
    title: "Quantico Clinical Engine",
    client: "Quantico Bio",
    category: "Conversion Platform",
    year: "2025",
    tags: ["Molecular Viz", "Edge CDN", "Next.js 16", "Analytics"],
    description:
      "High-conversion research portal simplifying complex clinical datasets and accelerating clinical trial registration for global research partners.",
    metric: "99.98%",
    metricLabel: "Core Web Vitals",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=80",
    accentColor: "#38bdf8",
  },
  {
    id: "velocita",
    title: "Velocita Hypercar Flagship",
    client: "Velocita Motors",
    category: "3D Configurator",
    year: "2026",
    tags: ["Raytracing", "Tailwind", "Motion", "eCommerce"],
    description:
      "Real-time WebGL hypercar configurator with custom livery paint simulations, carbon fiber physics, and instant reservation checkout.",
    metric: "100%",
    metricLabel: "Pre-Orders Sold",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
    accentColor: "#FAB406",
  },
  {
    id: "onyx",
    title: "Onyx Wealth Management",
    client: "Onyx Syndicate",
    category: "Private Wealth",
    year: "2025",
    tags: ["ZK Auth", "Fintech UI", "Security", "WebSockets"],
    description:
      "Private multi-family office portal featuring cryptographic asset verification, sovereign vault interfaces, and live risk metrics.",
    metric: "$450M+",
    metricLabel: "Assets Monitored",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
    accentColor: "#38bdf8",
  },
];

export default function Portfolio() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 4);

  return (
    <section
      id="projects"
      className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black border-t border-white/10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Anchor Target for #work as well */}
      <div id="work" className="absolute top-0 pointer-events-none -translate-y-24" />

      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[45rem] w-[65rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.06] via-[#FAB406]/[0.02] to-transparent blur-[160px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
              Selected Works
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Proof of <span className="italic text-[#FAB406]">Excellence</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed">
            Flagship web systems, interactive 3D configurators, and conversion platforms engineered for ambitious leaders.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e14]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[#FAB406]/40 hover:shadow-[0_0_35px_rgba(250,180,6,0.15)]"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-[#0e0e14]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-mono text-zinc-400 backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>

                  {/* Metric Floating Pill */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-xs font-bold text-[#FAB406]">{project.metric}</span>
                      <span className="text-[10px] uppercase font-mono text-zinc-400">{project.metricLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      {project.client}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mt-1 group-hover:text-[#FAB406] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Link */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#FAB406] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Collapse Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md shadow-md transition-all duration-300 hover:border-[#FAB406] hover:bg-[#FAB406] hover:text-black hover:scale-[1.02] cursor-pointer"
          >
            <span>{showAll ? "Show Less Case Studies" : "View All 8 Case Studies"}</span>
            {showAll ? (
              <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
