"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="currentColor" d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  const gradientId = React.useId().replace(/:/g, "");
  return (
    <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="15%" stopColor="#FA7E1E" />
          <stop offset="45%" stopColor="#D62976" />
          <stop offset="70%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>
      <path fill={`url(#${gradientId})`} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
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
  githubUrl?: string;
  instagramUrl?: string;
  portfolioUrl?: string;
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
    instagramUrl: "#",
    portfolioUrl: "#",
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
    instagramUrl: "#",
    portfolioUrl: "#",
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
    instagramUrl: "#",
    portfolioUrl: "#",
    accentColor: "#E5B528",
    glowColor: "rgba(229, 181, 40, 0.14)",
  },
];

function MobileTeamCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="relative flex overflow-hidden rounded-2xl border border-white/[0.1] backdrop-blur-sm"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
    >

      {/* Gold top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B528]/40 to-transparent z-10" aria-hidden />

      {/* Full-height photo — left ~38% */}
      <div className="relative w-[38%] shrink-0 min-h-[148px]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="140px"
        />
      </div>

      {/* Info panel — right side */}
      <div className="flex flex-1 flex-col justify-between px-4 py-4">
        {/* Top: role pill + name + subtitle */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-flex w-fit items-center rounded-full border border-[#E5B528]/35 bg-[#E5B528]/10 px-2.5 py-0.5 font-epilogue text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#E5B528]">
            {member.role}
          </span>
          <h3 className="font-excon text-[24px] font-bold leading-none tracking-tight text-white">
            {member.name}
          </h3>
          <p className="font-epilogue text-[11px] font-medium leading-snug text-zinc-400">
            {member.subtitle}
          </p>
        </div>

        {/* Bottom: divider + social icons */}
        <div className="mt-3 border-t border-white/[0.07] pt-3 flex items-center gap-2">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.05] transition-all hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 active:scale-90"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {member.githubUrl && (
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.05] text-zinc-300 transition-all hover:border-white/25 hover:bg-white/[0.08] active:scale-90"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {member.instagramUrl && (
            <a
              href={member.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.05] text-zinc-300 transition-all hover:border-pink-500/30 hover:bg-pink-500/10 active:scale-90"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {member.portfolioUrl && (
            <a
              href={member.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 font-epilogue text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:text-[#E5B528]"
            >
              Portfolio
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


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
      <SectionAtmosphere variant="left" gridOpacity={0.15} />

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
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]/75">
              Our Team
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-white leading-[1.12] text-balance">
            Meet the people behind <span className="text-[#E5B528]">QDelta</span>.
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed text-balance max-w-2xl">
            A small founding team bringing together AI, development and user experience to build better digital products and websites.
          </p>
        </motion.div>

        {/* ======================================================= */}
        {/* MOBILE: Clean vertical card stack                       */}
        {/* ======================================================= */}
        <div className="md:hidden flex w-full flex-col gap-3">
          {TEAM_MEMBERS.map((member) => (
            <MobileTeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* ======================================================= */}
        {/* DESKTOP: 3 PREMIUM 3D FLIP TEAM CARDS                   */}
        {/* ======================================================= */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-7 w-full items-stretch">
          {TEAM_MEMBERS.map((member, idx) => {
            const isFlipped = Boolean(flippedCards[member.id] || hoveredCard === member.id);

            return (
              <div
                key={member.id}
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
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-xl sm:rounded-[18px] overflow-hidden border border-white/[0.08] hover:border-[#E5B528]/35 bg-[#0B0E12]/90 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col justify-end p-5 sm:p-6 transition-all duration-300">

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
                        priority={false}
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
                        <LinkedInIcon className="h-4 w-4 rounded-[2px]" />
                        <span>View LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3 text-[#E5B528]/80" />
                      </a>

                      <span className="text-[10px] font-epilogue uppercase tracking-widest text-zinc-500 font-bold">
                        Tap to return
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
