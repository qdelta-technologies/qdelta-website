"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  discipline: string;
  image: string;
  bio: string;
  portfolioUrl: string;
}

const TEAM_ROSTER: TeamMember[] = [
  {
    id: "md-qais",
    number: "01",
    name: "MD Qais",
    role: "Creative Direction & Motion",
    discipline: "Bespoke Art Direction • Luxury Identity • Physics Choreography",
    image: "/team/md-qais-portrait.jpg",
    bio: "Crafting unforgettable visual languages, bespoke typography hierarchies, and tactile motion choreography that elevate digital experiences into timeless luxury.",
    portfolioUrl: "https://www.linkedin.com",
  },
  {
    id: "sai-prabhath",
    number: "02",
    name: "Nagireddy Sai Prabhath",
    role: "Full-Stack Engineering & AI",
    discipline: "Next.js 16 • Autonomous LLM Systems • Edge Architecture",
    image: "/team/sai-prabhath-custom.jpg",
    bio: "Architecting ultra-high performance edge systems, GPU-accelerated micro-interactions, and autonomous AI agent pipelines for next-generation digital flagships.",
    portfolioUrl: "https://www.linkedin.com",
  },
  {
    id: "md-fazeel",
    number: "03",
    name: "MD Fazeel",
    role: "Chief Architecture & Systems",
    discipline: "Cloud Infrastructure • Edge CDN • Enterprise Security",
    image: "/team/md-fazeel-portrait.jpg",
    bio: "Overseeing global low-latency cloud infrastructure, distributed Next.js server components, and rigorous enterprise security verification protocols.",
    portfolioUrl: "https://www.linkedin.com",
  },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeMember = TEAM_ROSTER[activeIndex];

  return (
    <section
      id="team"
      className="relative z-20 w-full overflow-hidden bg-[#040406] py-24 sm:py-28 md:py-36 text-white border-t border-white/10 selection:bg-[#FAB406] selection:text-black"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#FAB406]/10 via-[#FAB406]/[0.02] to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[35rem] w-[35rem] rounded-full bg-gradient-to-tl from-[#FAB406]/10 via-transparent to-transparent blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl mb-3.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
              The Collective
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Meet the <span className="italic text-[#FAB406]">Team</span>
          </h2>

          <p className="mt-3 max-w-xl text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed">
            A multidisciplinary agency of engineers, art directors, and architects building the future of digital flagships.
          </p>
        </div>

        {/* Cinematic Roster Grid */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Interactive Member List */}
          <div className="space-y-4 lg:col-span-7">
            {TEAM_ROSTER.map((member, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className="group relative cursor-pointer border-b border-white/10 pb-7 pt-4 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <h3
                      className={`font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight transition-all duration-300 select-none ${
                        isActive ? "text-white translate-x-2" : "text-zinc-600 group-hover:text-zinc-300"
                      }`}
                    >
                      {member.name}
                    </h3>

                    {/* Role & Bio Accordion */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 6, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="mt-3 overflow-hidden pl-2"
                        >
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#FAB406]/30 bg-[#FAB406]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#FAB406]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] animate-pulse" />
                            <span>{member.role}</span>
                          </div>

                          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                            {member.discipline}
                          </p>

                          <div className="mt-3">
                            <a
                              href={member.portfolioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-white transition-colors hover:text-[#FAB406]"
                            >
                              <span className="text-[#FAB406] font-bold">↳</span>
                              <span>Connect on LinkedIn</span>
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Portrait Reveal Canvas */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e14]/95 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#040406] via-[#040406]/20 to-transparent" />
              <div className="pointer-events-none absolute -top-16 -right-16 z-20 h-40 w-40 rounded-full bg-[#FAB406]/15 blur-2xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={activeMember.image}
                    alt={activeMember.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    className="object-cover object-top filter grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Canvas Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMember.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2.5"
                  >
                    <div className="font-mono text-xs uppercase tracking-widest text-[#FAB406]">
                      {activeMember.role}
                    </div>

                    <h4 className="font-sans text-xl sm:text-2xl font-bold text-white">
                      {activeMember.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {activeMember.bio}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
