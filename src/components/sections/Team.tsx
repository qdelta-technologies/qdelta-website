"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

/** Official LinkedIn brand mark (#0A66C2) — stays crisp at small sizes */
function LinkedInBrandIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
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

function MobileTeamImage({ member }: { member: TeamMember }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#0B0E12]">
      <Image
        src={member.image}
        alt={`${member.name} — ${member.role}`}
        fill
        className="object-cover object-top"
        sizes="50vw"
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
        aria-hidden
      />
    </div>
  );
}

function MobileTeamInfo({ member }: { member: TeamMember }) {
  return (
    <div className="flex aspect-square w-full flex-col bg-[#0B0E12] px-3 pb-3 pt-2 sm:px-3.5 sm:pb-3.5 sm:pt-2.5 text-white overflow-hidden">
      <div className="shrink-0 border-b border-white/[0.1] pb-1.5">
        <div className="flex items-center justify-end">
          <span className="font-epilogue text-[9px] uppercase tracking-widest font-extrabold text-[#E5B528]">
            {member.role}
          </span>
        </div>
        <h3 className="mt-0.5 font-excon text-base sm:text-lg font-bold tracking-tight leading-tight text-white">
          {member.name}
        </h3>
        <p className="mt-0 font-epilogue text-[10px] font-medium leading-snug text-zinc-400">
          {member.subtitle}
        </p>
      </div>

      <p className="mt-1.5 min-h-0 flex-1 overflow-hidden font-epilogue text-[10px] sm:text-[11px] leading-snug font-medium text-zinc-300 line-clamp-[7]">
        {member.bio}
      </p>

      <div className="mt-2 shrink-0 space-y-2">
        <div className="flex flex-wrap gap-1">
          {member.focus.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-[#E5B528]/45 bg-[#E5B528]/10 px-2 py-0.5 font-epilogue text-[9px] font-semibold text-zinc-100"
            >
              {item}
            </span>
          ))}
        </div>

        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex items-center justify-center rounded-md transition-transform hover:scale-105 active:scale-95"
          >
            <LinkedInBrandIcon className="h-8 w-8 sm:h-9 sm:w-9 rounded-[3px]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

type MobileInfoRevealCustom = { imageOnLeft: boolean; index: number };

const mobileInfoReveal = {
  hidden: ({ imageOnLeft }: MobileInfoRevealCustom) => ({
    x: imageOnLeft ? "-42%" : "42%",
    scale: 0.92,
    opacity: 0.5,
  }),
  visible: ({ imageOnLeft, index }: MobileInfoRevealCustom) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.05 + index * 0.04,
    },
  }),
};

export default function Team() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
          <div className="mb-4 select-none text-center">
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]">
              Our Team
            </span>
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
        {/* MOBILE: 2-column editorial checkerboard                 */}
        {/* ======================================================= */}
        <div className="md:hidden flex w-full max-w-md mx-auto flex-col gap-2.5 sm:gap-3">
          {TEAM_MEMBERS.map((member, idx) => {
            const imageFirst = idx % 2 === 0;
            const imageCell = (
              <motion.div
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="relative z-20 min-w-0 bg-[#0B0E12]"
              >
                <MobileTeamImage member={member} />
              </motion.div>
            );
            const infoCell = (
              <motion.div
                custom={{ imageOnLeft: imageFirst, index: idx }}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.45 }}
                variants={mobileInfoReveal}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="relative z-10 min-w-0 will-change-transform"
              >
                <MobileTeamInfo member={member} />
              </motion.div>
            );

            return (
              <div
                key={member.id}
                className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.1] divide-x divide-white/[0.08] shadow-[0_10px_32px_rgba(0,0,0,0.4)]"
              >
                {imageFirst ? (
                  <>
                    {imageCell}
                    {infoCell}
                  </>
                ) : (
                  <>
                    {infoCell}
                    {imageCell}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* DESKTOP: 3 PREMIUM 3D FLIP TEAM CARDS                   */}
        {/* ======================================================= */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-7 w-full items-stretch">
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
                  {/* CARD BACK FACE (DARK PANEL + GOLD OUTLINE)              */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-white/[0.1] bg-[#0B0E12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 flex flex-col justify-between transition-all duration-300">
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20" />

                    {/* Top Back Header */}
                    <div className="relative z-10 border-b border-white/[0.1] pb-2.5">
                      <div className="flex items-center justify-end">
                        <span className="font-epilogue text-xs uppercase tracking-widest font-extrabold text-[#E5B528]">
                          {member.role}
                        </span>
                      </div>

                      <h3 className="mt-1 font-excon text-2xl font-bold text-white tracking-tight leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-epilogue text-zinc-400 font-medium mt-0">
                        {member.subtitle}
                      </p>
                    </div>

                    {/* Middle: Short Bio & Key Focus */}
                    <div className="relative z-10 my-auto py-2">
                      <p className="font-epilogue text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-medium">
                        {member.bio}
                      </p>

                      <div className="mt-4">
                        <div className="text-[10px] font-epilogue uppercase tracking-[0.18em] text-zinc-500 font-bold mb-2">
                          Key Responsibilities & Focus
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.focus.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-full border border-[#E5B528]/45 bg-[#E5B528]/10 text-zinc-100 font-epilogue text-[11px] font-semibold"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: LinkedIn & Flip Back Action */}
                    <div className="relative z-10 pt-3 border-t border-white/[0.1] flex items-center justify-between">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E5B528]/50 bg-[#E5B528]/10 text-[#E5B528] text-xs font-epilogue uppercase tracking-wider font-bold shadow-sm hover:bg-[#E5B528]/15 transition-colors"
                      >
                        <LinkedInBrandIcon className="h-4 w-4 rounded-[2px]" />
                        <span>View LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-[#E5B528]/80" />
                      </a>

                      <span className="text-[10px] font-epilogue uppercase tracking-widest text-zinc-500 font-bold">
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
