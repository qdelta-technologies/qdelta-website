"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

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
    image: "/team/md-qais-portrait.jpg",
    bio: "Directing creative vision, brand positioning, and conversion architecture. Dedicated to building digital experiences that command attention and drive measurable business outcomes.",
    focus: ["Creative Direction", "Brand Strategy", "Conversion Architecture"],
    linkedinUrl: "https://www.linkedin.com/in/md-qais-04b772274/",
    accentColor: "#FAB406",
    glowColor: "rgba(250, 180, 6, 0.15)",
  },
  {
    id: "sai-prabath",
    number: "02",
    name: "Sai Prabath",
    role: "Co-Founder",
    subtitle: "Engineering & Performance",
    image: "/team/sai-prabhath-custom.jpg",
    bio: "Leading full-stack engineering, performance systems, and modern web architectures. Focused on delivering ultra-fast, scalable, and responsive digital flagships.",
    focus: ["Full-Stack Engineering", "Performance Optimization", "Technical Architecture"],
    linkedinUrl: "https://www.linkedin.com/in/sai-prabhath-993b4a22b/",
    accentColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.15)",
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
    accentColor: "#FAB406",
    glowColor: "rgba(250, 180, 6, 0.15)",
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
      className="relative z-20 w-full overflow-hidden bg-[#08090f] py-20 sm:py-28 text-white border-t border-white/[0.08] selection:bg-[#FAB406] selection:text-black"
    >
      {/* Ambient Lighting & Horizon Lines */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[70rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.035] via-sky-500/[0.02] to-transparent blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ======================================================= */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl"
        >
          {/* Editorial Section Identifier (No container/capsule) */}
          <div className="flex items-center gap-3.5 mb-5 sm:mb-6 select-none justify-center">
            <span className="font-excon text-xs sm:text-[13px] tracking-[0.24em] uppercase text-zinc-400 font-medium">
              06 / LEADERSHIP
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

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-epilogue font-bold tracking-tight text-white leading-[1.12] text-balance">
            Meet the founders behind <span className="text-[#FAB406]">QDelta</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-4 text-sm sm:text-base md:text-lg font-excon text-zinc-400 font-normal leading-relaxed text-balance max-w-xl">
            Hands-on founders directing creative strategy, engineering and client delivery on every engagement.
          </p>

          <span className="mt-3 text-[11px] font-excon uppercase tracking-widest text-zinc-500 font-medium">
            Hover or tap any card to view background & focus
          </span>
        </motion.div>

        {/* ======================================================= */}
        {/* 3 PREMIUM 3D FLIP TEAM CARDS                            */}
        {/* One row on desktop, stacked on mobile                   */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full items-stretch">
          {TEAM_MEMBERS.map((member, idx) => {
            const isFlipped = Boolean(flippedCards[member.id] || hoveredCard === member.id);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative w-full h-[440px] sm:h-[480px] [perspective:1400px] select-none cursor-pointer group"
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
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-3xl sm:rounded-[32px] overflow-hidden border border-white/[0.1] bg-[#07090e] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-end p-6 sm:p-7">
                    {/* Top Ambient Glow behind portrait */}
                    <div
                      className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30"
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

                    {/* Deep Cinematic Gradient Vignette (Ensures flawless text contrast) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/60 via-45% to-transparent pointer-events-none" />

                    {/* Top Status & Flip Indicator Badge */}
                    <div className="absolute top-4 inset-x-5 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-excon uppercase tracking-widest text-zinc-300 font-semibold shadow-sm">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: member.accentColor }}
                        />
                        <span>{member.number}</span>
                      </span>

                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-excon text-zinc-400 opacity-80 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3" />
                        <span className="hidden sm:inline">Flip</span>
                      </div>
                    </div>

                    {/* Front Info at Bottom */}
                    <div className="relative z-10">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-epilogue text-2xl sm:text-[1.7rem] font-extrabold text-white tracking-tight leading-tight">
                          {member.name}
                        </h3>
                        <span
                          className="font-excon text-xs uppercase tracking-[0.18em] font-bold"
                          style={{ color: member.accentColor }}
                        >
                          {member.role}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-excon text-zinc-300 font-normal">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* =================================================== */}
                  {/* CARD BACK FACE                                      */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl sm:rounded-[32px] overflow-hidden border border-white/[0.12] bg-[#090c13] shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-6 sm:p-7 flex flex-col justify-between">
                    {/* Subtle Dark Tech Grid Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

                    {/* Accent Corner Glow */}
                    <div
                      className="pointer-events-none absolute -bottom-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-20"
                      style={{ backgroundColor: member.accentColor }}
                    />

                    {/* Top Back Header */}
                    <div className="relative z-10 border-b border-white/[0.08] pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-excon text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400">
                          {member.number} • PROFILE
                        </span>
                        <span
                          className="font-excon text-xs uppercase tracking-widest font-bold"
                          style={{ color: member.accentColor }}
                        >
                          {member.role}
                        </span>
                      </div>

                      <h3 className="font-epilogue text-2xl font-black text-white tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-excon text-zinc-400 mt-0.5">
                        {member.subtitle}
                      </p>
                    </div>

                    {/* Middle: Short Bio & Key Focus */}
                    <div className="relative z-10 my-auto py-2">
                      <p className="font-excon text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                        {member.bio}
                      </p>

                      <div className="mt-5">
                        <div className="text-[10px] font-excon uppercase tracking-[0.2em] text-zinc-400 font-bold mb-2.5">
                          Key Responsibilities & Focus
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.focus.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-excon text-zinc-200 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: LinkedIn & Flip Back Action */}
                    <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-excon uppercase tracking-wider font-semibold text-zinc-300 hover:text-white transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5 text-[#FAB406]" />
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                      </a>

                      <span className="text-[10px] font-excon uppercase tracking-widest text-zinc-500">
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
          className="mt-12 sm:mt-16 inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/[0.08] bg-[#090b10] text-xs font-excon text-zinc-400 text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FAB406] shrink-0" />
          <span>Founders directly design, engineer, and lead every single client engagement</span>
        </motion.div>
      </div>
    </section>
  );
}
