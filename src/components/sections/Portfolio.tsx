"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionProgress } from "@/utils/useSectionProgress";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface ProjectItem {
  id: string;
  indexNumber: string;
  name: string;
  oneLiner: string;
  image: string;
  link: string;
  /** Exactly 4 tags per project */
  highlights: string[];
  theme: {
    folderBg: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    tabTextColor: string;
    frameBg: string;
    frameBorder: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
    ctaUnderline: string;
    dotColor: string;
  };
}

const DARK_THEME: ProjectItem["theme"] = {
  folderBg: "#0B0E12",
  borderColor: "rgba(255, 255, 255, 0.12)",
  textPrimary: "text-white",
  textSecondary: "text-zinc-300",
  textMuted: "text-zinc-400",
  tabTextColor: "text-zinc-200",
  frameBg: "bg-[#07090E]",
  frameBorder: "border-white/[0.12]",
  tagBg: "bg-white/[0.05]",
  tagBorder: "border-white/10",
  tagText: "text-zinc-300",
  ctaUnderline: "bg-[#E5B528]",
  dotColor: "#E5B528",
};

const GOLD_THEME: ProjectItem["theme"] = {
  folderBg: "#E5B528",
  borderColor: "rgba(0, 0, 0, 0.18)",
  textPrimary: "text-[#06070A]",
  textSecondary: "text-[#06070A]/85",
  textMuted: "text-[#06070A]/70",
  tabTextColor: "text-[#06070A]",
  frameBg: "bg-black/90",
  frameBorder: "border-black/20",
  tagBg: "bg-black/10",
  tagBorder: "border-black/15",
  tagText: "text-[#06070A] font-semibold",
  ctaUnderline: "bg-[#06070A]",
  dotColor: "#06070A",
};

const ARCHIVE_PROJECTS: ProjectItem[] = [
  {
    id: "globalsafetyacademy",
    indexNumber: "01",
    name: "Global Safety Academy",
    oneLiner:
      "An animated, storytelling-driven website showcasing professional safety training programs and guiding students toward enrolment.",
    image: "/images/projects/globalsafetyacademy.webp",
    link: "https://www.globalsafetyacademy.com/",
    highlights: ["Animated Website", "Brand Storytelling", "Course Showcase", "Enquiry Experience"],
    theme: DARK_THEME,
  },
  {
    id: "sln",
    indexNumber: "02",
    name: "SLN Transportation",
    oneLiner:
      "A professional, trust-focused website highlighting safe student transportation, specialized care, and reliable services.",
    image: "/images/projects/sln.jpg",
    link: "https://slntransportation.com/",
    highlights: ["Service Website", "Responsive Design", "Trust-Focused UI", "Enquiry Experience"],
    theme: GOLD_THEME,
  },
  {
    id: "britishconnects",
    indexNumber: "03",
    name: "British Connects",
    oneLiner:
      "An education consultancy website presenting study abroad opportunities, scholarship guidance, and student support services.",
    image: "/images/projects/britishconnects.jpg",
    link: "https://infanyt.wixsite.com/british-connects",
    highlights: ["Education Website", "Service Showcase", "Responsive UI", "Lead Generation"],
    theme: DARK_THEME,
  },
  {
    id: "prettygoodpdf",
    indexNumber: "04",
    name: "Pretty Good PDF",
    oneLiner:
      "A clean, user-friendly web application offering free PDF tools for students and professionals, with a focus on simplicity and privacy.",
    image: "/images/projects/prettygoodpdf.jpg",
    link: "https://www.prettygoodpdf.site/",
    highlights: ["Web Application", "PDF Tools", "User-Friendly UI", "Browser-Based Processing"],
    theme: GOLD_THEME,
  },
];

interface ArchiveFolderProps {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ArchiveFolder({
  project,
  index,
  total,
  progress,
}: ArchiveFolderProps) {
  // Stagger scale down as subsequent folders stack on top
  const targetScale = 1 - (total - 1 - index) * 0.02;
  const startRange = index * (1 / total);
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  // Tab offset: Folder 0 is at 0px, subsequent folders stagger horizontally on desktop
  const desktopOffset = index * 185;

  return (
    <div
      className="sticky w-full"
      style={{
        // Stacking offset: each folder is positioned slightly lower so top tabs stack cleanly
        top: `calc(76px + ${index * 44}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
          willChange: "transform",
        }}
        className="w-full flex flex-col group/folder"
      >
        {/* ================================================================= */}
        {/* TOP TAB HEADER: MONOLITHIC SVG TAB SILHOUETTE (ZERO SEAMS)       */}
        {/* ================================================================= */}
        <div className="relative flex items-end w-full h-[40px] sm:h-[44px] select-none pointer-events-auto">
          {/* Desktop Left Shoulder (clean horizontal border line) */}
          {desktopOffset > 0 && (
            <div
              className="hidden sm:block h-full border-b"
              style={{
                width: `${desktopOffset}px`,
                borderColor: project.theme.borderColor,
              }}
            />
          )}

          {/* ACTIVE TAB SHAPE (MONOLITHIC SVG WITH CHAMFERED SHOULDERS) */}
          {index === 0 ? (
            /* Tab 0: Left-Aligned Tab (Starts at x=0, 45° slope down on right) */
            <div className="relative h-full w-[170px] sm:w-[210px] shrink-0 -mb-[1px]">
              <svg
                viewBox="0 0 210 44"
                className="w-full h-full block"
                preserveAspectRatio="none"
              >
                {/* Solid Folder Fill */}
                <polygon
                  points="0,44 0,0 174,0 210,44"
                  fill={project.theme.folderBg}
                />
                {/* Crisp Top Stroke */}
                <polyline
                  points="0,44 0,0 174,0 210,44"
                  fill="none"
                  stroke={project.theme.borderColor}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tab Typography */}
              <div className="absolute inset-0 flex items-center pl-4 sm:pl-6 pr-8 pointer-events-none">
                <span
                  className={`font-epilogue text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5 ${project.theme.tabTextColor}`}
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>PROJECT {project.indexNumber}</span>
                </span>
              </div>
            </div>
          ) : (
            /* Tabs 1, 2, 3: Raised Tab with 45° slope UP on left and 45° slope DOWN on right */
            <div className="relative h-full w-[170px] sm:w-[220px] shrink-0 -mb-[1px]">
              <svg
                viewBox="0 0 220 44"
                className="w-full h-full block"
                preserveAspectRatio="none"
              >
                {/* Solid Folder Fill */}
                <polygon
                  points="0,44 36,0 184,0 220,44"
                  fill={project.theme.folderBg}
                />
                {/* Crisp Top Stroke */}
                <polyline
                  points="0,44 36,0 184,0 220,44"
                  fill="none"
                  stroke={project.theme.borderColor}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tab Typography */}
              <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
                <span
                  className={`font-epilogue text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5 ${project.theme.tabTextColor}`}
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>PROJECT {project.indexNumber}</span>
                </span>
              </div>
            </div>
          )}

          {/* Right Shoulder (Spans cleanly to the right edge with top border of card) */}
          <div
            className="flex-1 h-full border-b"
            style={{ borderColor: project.theme.borderColor }}
          />
        </div>

        {/* ================================================================= */}
        {/* MAIN FOLDER BODY                                                  */}
        {/* ================================================================= */}
        <div
          className="relative w-full rounded-b-xl sm:rounded-b-2xl border-l border-r border-b overflow-hidden transition-colors"
          style={{
            backgroundColor: project.theme.folderBg,
            borderColor: project.theme.borderColor,
          }}
        >
          {/* Gold ambient glow — top right */}
          <div
            className="pointer-events-none absolute top-0 right-0 w-56 h-56 rounded-full blur-[60px] opacity-[0.10]"
            style={{ background: `radial-gradient(circle, ${project.theme.dotColor} 0%, transparent 70%)` }}
            aria-hidden
          />

          {/* CAD fine grid */}
          <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.09]" aria-hidden>
            <defs>
              <pattern id={`cad-grid-${project.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke={project.theme.dotColor} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#cad-grid-${project.id})`}/>
          </svg>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch relative z-10">
            {/* ==================================================== */}
            {/* LEFT COLUMN: EDITORIAL CONTENT                       */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-8 md:p-9 lg:p-10 space-y-3 sm:space-y-6">

              {/* Project Title */}
              <h3
                className={`text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-excon font-bold tracking-tight leading-[1.08] ${project.theme.textPrimary}`}
              >
                {project.name}
              </h3>

              {/* One-liner */}
              <p className={`text-sm sm:text-[15px] font-epilogue font-normal leading-relaxed ${project.theme.textSecondary}`}>
                {project.oneLiner}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-epilogue font-semibold border transition-colors ${project.theme.tagBg} ${project.theme.tagBorder} ${project.theme.tagText}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/btn inline-flex items-center gap-2 font-epilogue text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer ${project.theme.textPrimary}`}
                >
                  <span className="relative">
                    <span>VIEW PROJECT</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 origin-left scale-x-100 group-hover/btn:scale-x-110 ${project.theme.ctaUnderline}`} />
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </a>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: FRAMED THUMBNAIL                       */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-3 sm:p-6 lg:p-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/mockup relative w-full block cursor-pointer"
                aria-label={`Open ${project.name} in a new tab`}
              >
                {/* Browser chrome bar */}
                <div
                  className="flex items-center gap-1.5 px-3 py-2 rounded-t-lg border-l border-r border-t"
                  style={{
                    backgroundColor: '#1C1E24',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/70" />
                  <div className="flex-1 mx-3 h-4 rounded-sm bg-white/[0.06] border border-white/[0.06]" />
                </div>

                {/* Image frame — object-contain keeps the thumbnail neat with no cropping or stretching */}
                <div
                  className={`relative w-full aspect-[16/9] overflow-hidden border-l border-r border-b rounded-b-lg shadow-[0_20px_60px_rgba(0,0,0,0.55)] ${project.theme.frameBg} ${project.theme.frameBorder}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 580px"
                    className="object-contain transition-transform duration-700 ease-out group-hover/mockup:scale-[1.03]"
                  />

                  {/* Hover badge */}
                  <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3 h-3 text-[#E5B528]" />
                    <span className="font-epilogue text-[10px] font-semibold uppercase tracking-wider">View</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Layered Scroll Stacking Progress
  const scrollYProgress = useSectionProgress(containerRef, 1024);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full bg-[#040406] text-white py-16 sm:py-20 md:py-24 scroll-mt-12 overflow-visible"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent z-10" aria-hidden />
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="right" gridOpacity={0.15} />

      {/* ======================================================= */}
      {/* SECTION INTRO HEADER                                    */}
      {/* ======================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10"
      >
        {/* Editorial Section Identifier */}
        <div className="mb-4 select-none">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-[#E5B528]/75">
            Our Portfolio
          </span>
        </div>

        {/* Headline & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[46px] font-heading font-bold tracking-tight text-white leading-[1.12]">
              Curated builds. Engineered to convert.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed">
              Explore our project archive. Each build is custom-engineered to solve specific business problems, present clear offers, and elevate digital authority.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ======================================================= */}
      {/* STACKED FOLDER ARCHIVE TRACK                            */}
      {/* ======================================================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-12 sm:space-y-16 md:space-y-20 pb-12 sm:pb-16">
        {ARCHIVE_PROJECTS.map((project, index) => (
          <ArchiveFolder
            key={project.id}
            project={project}
            index={index}
            total={ARCHIVE_PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
