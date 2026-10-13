"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

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
    accentColor: "#FAB406",
    glowColor: "rgba(250, 180, 6, 0.14)",
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
    accentColor: "#FAB406",
    glowColor: "rgba(250, 180, 6, 0.14)",
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
    accentColor: "#FAB406",
    glowColor: "rgba(250, 180, 6, 0.14)",
  },
];

function MobileTeamCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="relative flex overflow-hidden rounded-xl border-t border-l border-r border-white/[0.12] border-b-[3.5px] border-b-[#B87700]/60 backdrop-blur-sm shadow-[0_16px_36px_-6px_rgba(0,0,0,0.7),inset_0_1.2px_0_rgba(255,255,255,0.1)]"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
    >

      {/* Gold top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FAB406]/60 to-transparent z-10" aria-hidden />

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
          <span className="inline-flex w-fit items-center rounded-full border border-[#FAB406]/35 bg-[#FAB406]/10 px-2.5 py-0.5 font-epilogue text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#FAB406]">
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
              className="ml-auto flex items-center gap-1 font-epilogue text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500 transition-colors hover:text-[#FAB406]"
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
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-12 sm:py-16 md:py-18 text-white selection:bg-[#FAB406] selection:text-[#06070A]"
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
          {/* Unified Section Eyebrow */}
          <SectionEyebrow>Our Team</SectionEyebrow>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-white leading-[1.12] text-balance">
            Meet the people behind{" "}
            <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-[#FAB406]/15 border border-[#FAB406]/35 text-[#FAB406] shadow-[0_0_15px_rgba(250,180,6,0.12)]">
              QDelta
            </span>
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
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] rounded-xl overflow-hidden border-t border-l border-r border-white/[0.12] border-b-[4px] border-b-[#B87700]/70 hover:border-b-[#B87700] hover:border-[#FAB406]/45 bg-[#0B0E12]/90 backdrop-blur-md shadow-[0_22px_50px_-10px_rgba(0,0,0,0.85),0_10px_20px_-5px_rgba(0,0,0,0.5),inset_0_1.5px_0_rgba(255,255,255,0.12)] flex flex-col justify-end transition-all duration-300">

                    {/* Crisp Golden Top Accent Hairline */}
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#FAB406]/75 to-transparent z-20" />

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

                    {/* Top Flip Indicator Badge (Clean, No Numbering) */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B0E12]/80 backdrop-blur-md border border-white/10 text-[10px] font-epilogue text-zinc-300 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3 text-[#FAB406]" />
                        <span className="font-medium">Flip</span>
                      </div>
                    </div>

                    {/* Dedicated Clean Bottom Info Bar */}
                    <div className="relative z-10 w-full bg-[#0B0E12]/95 backdrop-blur-md border-t border-[#FAB406] px-4.5 sm:px-5 py-3.5 sm:py-4">
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        {/* Left: Name */}
                        <h3 className="font-excon text-xl sm:text-[1.4rem] font-bold text-white tracking-tight leading-none shrink-0">
                          {member.name}
                        </h3>

                        {/* Right: Role with Golden Dot */}
                        <div className="flex items-center gap-1.5 font-epilogue text-xs sm:text-[12.5px] font-medium text-zinc-300 text-right min-w-0">
                          <span
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FAB406] shrink-0 shadow-[0_0_6px_rgba(250,180,6,0.7)]"
                            aria-hidden
                          />
                          <span className="truncate">{member.subtitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================== */}
                  {/* CARD BACK FACE (HIGH-CONTRAST OFF-WHITE + YELLOW)   */}
                  {/* =================================================== */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden border-t border-l border-r border-[#CBD5E1] border-b-[4px] border-b-[#FAB406] bg-[#F8F9FA] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65),0_10px_20px_-5px_rgba(0,0,0,0.35),inset_0_1.5px_0_rgba(255,255,255,0.95)] px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 flex flex-col justify-between transition-all duration-300 text-[#06070A]">

                    {/* Golden top hairline accent */}
                    <div className="pointer-events-none absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#FAB406] to-transparent z-20" />

                    {/* Top Back Header */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        {/* High-contrast solid yellow role badge */}
                        <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#FAB406] border border-[#FAB406] font-epilogue text-[10.5px] uppercase tracking-[0.18em] font-black text-[#06070A] shadow-[0_2px_8px_rgba(250,180,6,0.35)]">
                          {member.role}
                        </span>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06070A] border border-black/20 text-[10.5px] font-epilogue text-white font-bold shadow-sm">
                          <RefreshCw className="w-3 h-3 text-[#FAB406]" />
                          <span>Flip</span>
                        </div>
                      </div>

                      <h3 className="mt-2.5 font-excon text-2xl sm:text-[1.7rem] font-black text-[#06070A] tracking-tight leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-epilogue text-[#06070A]/75 font-bold mt-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406]" />
                        {member.subtitle}
                      </p>

                      {/* Yellow Accent Divider Line */}
                      <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-[#FAB406] via-[#FAB406]/50 to-transparent rounded-full" />
                    </div>

                    {/* Middle: Short Bio with Left Yellow Accent Line & Key Focus */}
                    <div className="relative z-10 my-auto py-2">
                      <div className="relative pl-3 border-l-2 border-[#FAB406] py-0.5">
                        <p className="font-epilogue text-xs sm:text-[13px] text-[#090A0F] leading-relaxed font-semibold">
                          {member.bio}
                        </p>
                      </div>

                      <div className="mt-3.5">
                        <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-epilogue uppercase tracking-[0.18em] text-[#06070A] font-black">
                          <span className="inline-block w-1.5 h-3 rounded-sm bg-[#FAB406]" />
                          <span>Key Responsibilities & Focus</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.focus.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-[#FAB406] bg-[#FFFBEB] text-[#06070A] font-epilogue text-[11px] font-extrabold shadow-[0_2px_6px_rgba(250,180,6,0.15)]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406] shrink-0" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: LinkedIn & Flip Back Action */}
                    <div className="relative z-10 pt-3 border-t-2 border-zinc-200/80 flex items-center justify-between">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAB406] hover:bg-[#FAB406]/90 border-t border-l border-r border-[#FAB406] border-b-[3px] border-b-[#B87700] text-[#06070A] text-xs font-epilogue uppercase tracking-wider font-black shadow-[0_4px_12px_rgba(250,180,6,0.35)] transition-all active:translate-y-0.5"
                      >
                        <LinkedInIcon className="h-4 w-4 rounded-[2px]" />
                        <span>View LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#06070A] stroke-[2.5]" />
                      </a>

                      <span className="text-[10.5px] font-epilogue uppercase tracking-widest text-[#06070A]/70 font-extrabold flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5 text-[#B87700]" />
                        <span>Tap to return</span>
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
