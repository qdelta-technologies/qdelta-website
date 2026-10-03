"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  subtitle: string;
  image: string;
  bio: string;
  focus: string[];
  linkedinUrl: string;
  accentColor: string;
  glowColor: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "qais",
    number: "01",
    name: "Qais",
    role: "Founder",
    subtitle: "Brand & Creative Direction",
    image: "/team/qais-founder-latest.png",
    bio: "Directing creative vision, brand positioning, and conversion architecture. Dedicated to building digital experiences that command attention and drive measurable business outcomes.",
    focus: ["Creative Direction", "Brand Strategy", "Conversion Architecture"],
    linkedinUrl: "https://www.linkedin.com/in/md-qais-04b772274/",
    accentColor: "#F5B800",
    glowColor: "rgba(245, 184, 0, 0.12)",
  },
  {
    id: "sai-prabath",
    number: "02",
    name: "Sai Prabath",
    role: "Co-Founder",
    subtitle: "Engineering & Performance",
    image: "/team/sai-prabhath.png",
    bio: "Leading full-stack engineering, performance systems, and modern web architectures. Focused on delivering ultra-fast, scalable, and responsive digital flagships.",
    focus: ["Full-Stack Engineering", "Performance Optimization", "Technical Architecture"],
    linkedinUrl: "https://www.linkedin.com/in/sai-prabhath-993b4a22b/",
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.12)",
  },
  {
    id: "fazeel",
    number: "03",
    name: "Fazeel",
    role: "Co-Founder",
    subtitle: "Systems & Client Delivery",
    image: "/team/md-fazeel-portrait.jpg",
    bio: "Overseeing system infrastructure, execution workflows, and client delivery standards. Ensuring every build achieves total operational reliability, security, and precision.",
    focus: ["Systems Infrastructure", "Technical Operations", "Client Delivery"],
    linkedinUrl: "https://www.linkedin.com/in/md-fazeel-167816281/",
    accentColor: "#F5B800",
    glowColor: "rgba(245, 184, 0, 0.12)",
  },
];

export default function Team() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="team"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 sm:py-20 md:py-24 text-white selection:bg-[#F5B800] selection:text-[#06070A]"
    >
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="left" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ======================================================= */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10 sm:mb-12 max-w-3xl"
        >
          {/* Editorial Section Identifier */}
          <div className="flex items-center gap-3 mb-4 select-none justify-center">
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400">
              06 / Leadership
            </span>
            <div className="w-10 sm:w-12 h-[1px] bg-[#F5B800]/60" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-excon font-bold tracking-tight text-white leading-[1.12] text-balance">
            Meet the founders behind <span className="text-[#F5B800]">QDelta</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed text-balance max-w-xl">
            Hands-on founders directing creative strategy, engineering and client delivery on every engagement.
          </p>

          <span className="mt-2.5 text-[11px] font-epilogue uppercase tracking-widest text-zinc-500 font-medium">
            Hover or tap any card to view background & focus
          </span>
        </motion.div>

        {/* ======================================================= */}
        {/* 3 PREMIUM 3D FLIP TEAM CARDS                            */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 w-full items-stretch">
          {TEAM_MEMBERS.map((member, idx) => {
            const isFlipped = Boolean(flippedCards[member.id] || hoveredCard === member.id);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative w-full h-[400px] sm:h-[420px] md:h-[430px] [perspective:1400px] select-none cursor-pointer group"
                onClick={() => handleCardClick(member.id)}
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* 3D Flipping Card Container */}
                <div
                  className="relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* =================================================== */}
                  {/* CARD FRONT FACE                                     */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col justify-end p-5 sm:p-6 transition-all duration-300">
                    {/* Crisp Golden Top Accent Hairline */}
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent z-20" />

                    {/* Top Ambient Glow behind portrait */}
                    <div
                      className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-25"
                      style={{ backgroundColor: member.accentColor }}
                    />

                    {/* Member Portrait Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={member.image}
                        alt={`${member.name} — ${member.role}`}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 380px"
                        priority={idx === 0}
                      />
                    </div>

                    {/* Deep Cinematic Gradient Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06070A] via-[#06070A]/60 via-45% to-transparent pointer-events-none" />

                    {/* Top Status & Flip Indicator Badge */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0E12]/80 backdrop-blur-md border border-white/10 text-[11px] font-epilogue uppercase tracking-widest text-zinc-300 font-semibold shadow-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: member.accentColor }}
                        />
                        <span>{member.number}</span>
                      </span>

                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#0B0E12]/80 backdrop-blur-md border border-white/10 text-[10px] font-epilogue text-zinc-400 opacity-80 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3" />
                        <span className="hidden sm:inline">Flip</span>
                      </div>
                    </div>

                    {/* Front Info at Bottom */}
                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-excon text-2xl sm:text-[1.6rem] font-bold text-white tracking-tight leading-tight">
                          {member.name}
                        </h3>
                        <span
                          className="font-epilogue text-xs uppercase tracking-[0.16em] font-semibold"
                          style={{ color: member.accentColor }}
                        >
                          {member.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-epilogue text-zinc-300 font-normal">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* =================================================== */}
                  {/* CARD BACK FACE                                      */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-white/[0.09] hover:border-[#F5B800]/30 bg-[#090C13]/92 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300">
                    {/* Crisp Golden Top Accent Hairline */}
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent z-20" />

                    {/* Subtle Dark Tech Grid Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(245,184,0,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-30" />

                    {/* Accent Corner Glow */}
                    <div
                      className="pointer-events-none absolute -bottom-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-20"
                      style={{ backgroundColor: member.accentColor }}
                    />

                    {/* Top Back Header */}
                    <div className="relative z-10 border-b border-white/[0.08] pb-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-epilogue text-[11px] uppercase tracking-[0.18em] font-semibold text-zinc-400">
                          {member.number} • PROFILE
                        </span>
                        <span
                          className="font-epilogue text-xs uppercase tracking-widest font-semibold"
                          style={{ color: member.accentColor }}
                        >
                          {member.role}
                        </span>
                      </div>

                      <h3 className="font-excon text-2xl font-bold text-white tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-epilogue text-zinc-400 mt-0.5">
                        {member.subtitle}
                      </p>
                    </div>

                    {/* Middle: Short Bio & Key Focus */}
                    <div className="relative z-10 my-auto py-1.5">
                      <p className="font-epilogue text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                        {member.bio}
                      </p>

                      <div className="mt-4">
                        <div className="text-[10px] font-epilogue uppercase tracking-[0.18em] text-zinc-400 font-semibold mb-2">
                          Key Responsibilities & Focus
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.focus.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-epilogue text-zinc-200 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: LinkedIn & Flip Back Action */}
                    <div className="relative z-10 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-epilogue uppercase tracking-wider font-semibold text-zinc-300 hover:text-white transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5 text-[#F5B800]" />
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                      </a>

                      <span className="text-[10px] font-epilogue uppercase tracking-widest text-zinc-500">
                        Tap to return
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* BOTTOM PHILOSOPHY NOTE                                  */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-12 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.08] bg-[#0B0E12]/80 backdrop-blur-md text-xs font-epilogue text-zinc-400 text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
          <span>Founders directly design, engineer, and lead every single client engagement</span>
        </motion.div>
      </div>
    </section>
  );
}
