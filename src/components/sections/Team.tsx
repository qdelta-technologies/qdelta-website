"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCw } from "lucide-react";
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
    name: "Qais",
    role: "Founder",
    subtitle: "AI Generalist",
    image: "/team/qais-founder-latest.png",
    bio: "I work across AI, strategy, creative direction and business thinking — helping shape how QDelta approaches ideas, solves problems and builds digital experiences that create real value.",
    focus: ["AI Strategy", "Creative Direction", "Business & Product Thinking"],
    linkedinUrl: "https://www.linkedin.com/in/md-qais-04b772274/",
    accentColor: "#E5B528",
    glowColor: "rgba(229, 181, 40, 0.14)",
  },
  {
    id: "sai-prabath",
    name: "Sai Prabath",
    role: "Co-Founder",
    subtitle: "Full-Stack Developer",
    image: "/team/sai-prabhath.png",
    bio: "I build and manage the technical side of our projects, turning ideas and designs into fast, reliable and scalable websites and web applications.",
    focus: ["Full-Stack Development", "Web Applications", "Performance & Architecture"],
    linkedinUrl: "https://www.linkedin.com/in/sai-prabhath-993b4a22b/",
    accentColor: "#E5B528",
    glowColor: "rgba(229, 181, 40, 0.14)",
  },
  {
    id: "fazeel",
    name: "Fazeel",
    role: "Co-Founder",
    subtitle: "GenAI Developer & UX Designer",
    image: "/team/md-fazeel-portrait.jpg",
    bio: "I work across generative AI and user experience, building smarter workflows and designing digital experiences that are clear, useful and easy to use.",
    focus: ["GenAI Development", "UX Design", "AI Workflows"],
    linkedinUrl: "https://www.linkedin.com/in/md-fazeel-167816281/",
    accentColor: "#E5B528",
    glowColor: "rgba(229, 181, 40, 0.14)",
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
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 sm:py-20 md:py-24 text-white selection:bg-[#E5B528] selection:text-[#06070A]"
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
              06 / TEAM
            </span>
            <div className="w-10 sm:w-12 h-[1px] bg-[#E5B528]/60" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-excon font-bold tracking-tight text-white leading-[1.12] text-balance">
            Meet the people behind <span className="text-[#E5B528]">QDelta</span>.
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed text-balance max-w-2xl">
            A small founding team bringing together AI, development and user experience to build better digital products and websites.
          </p>
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
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-white/[0.08] hover:border-[#E5B528]/35 bg-[#0B0E12]/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col justify-end p-5 sm:p-6 transition-all duration-300">
                    {/* Crisp Golden Top Accent Hairline */}
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/55 to-transparent z-20" />

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

                    {/* Bottom text scrim only — keeps portraits bright */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] sm:h-[34%]"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(6, 7, 10, 0.94) 0%, rgba(6, 7, 10, 0.5) 38%, rgba(6, 7, 10, 0.12) 68%, transparent 100%)",
                      }}
                      aria-hidden
                    />

                    {/* Top Flip Indicator Badge (Clean, No Numbering) */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0E12]/80 backdrop-blur-md border border-white/10 text-[10px] font-epilogue text-zinc-300 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3 text-[#E5B528]" />
                        <span className="font-medium">Flip</span>
                      </div>
                    </div>

                    {/* Front Info at Bottom */}
                    <div className="relative z-10 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-excon text-2xl sm:text-[1.6rem] font-bold text-white tracking-tight leading-tight">
                          {member.name}
                        </h3>
                        <span className="shrink-0 font-epilogue text-xs uppercase tracking-[0.16em] font-semibold text-[#E5B528]">
                          {member.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs font-epilogue text-zinc-200 font-normal">
                        {member.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* =================================================== */}
                  {/* CARD BACK FACE (GOLDEN YELLOW & BLACK/WHITE TYPE)   */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-[#E5B528] bg-[#E5B528] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300">
                    {/* Top Back Header */}
                    <div className="relative z-10 border-b border-[#06070A]/15 pb-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-epilogue text-[10px] uppercase tracking-[0.2em] font-bold text-[#06070A]/65">
                          PROFILE
                        </span>
                        <span className="font-epilogue text-xs uppercase tracking-widest font-extrabold text-[#06070A]">
                          {member.role}
                        </span>
                      </div>

                      <h3 className="font-excon text-2xl font-bold text-[#06070A] tracking-tight leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-epilogue text-[#06070A]/80 font-medium mt-0.5">
                        {member.subtitle}
                      </p>
                    </div>

                    {/* Middle: Short Bio & Key Focus */}
                    <div className="relative z-10 my-auto py-2">
                      <p className="font-epilogue text-xs sm:text-[13px] text-[#06070A] leading-relaxed font-medium">
                        {member.bio}
                      </p>

                      <div className="mt-4">
                        <div className="text-[10px] font-epilogue uppercase tracking-[0.18em] text-[#06070A]/70 font-bold mb-2">
                          Key Responsibilities & Focus
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.focus.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-md bg-white text-[#06070A] font-epilogue text-[11px] font-semibold shadow-sm border border-black/5"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: LinkedIn & Flip Back Action */}
                    <div className="relative z-10 pt-3 border-t border-[#06070A]/15 flex items-center justify-between">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06070A] text-white text-xs font-epilogue uppercase tracking-wider font-bold shadow-sm hover:bg-black/85 transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5 text-[#E5B528]" />
                        <span>View LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-white/70" />
                      </a>

                      <span className="text-[10px] font-epilogue uppercase tracking-widest text-[#06070A]/60 font-bold">
                        Tap to return
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
