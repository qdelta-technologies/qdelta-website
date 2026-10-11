"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionProgress } from "@/utils/useSectionProgress";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

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

const LIGHT_THEME: ProjectItem["theme"] = {
  folderBg: "#F4F4F6",
  borderColor: "rgba(0, 0, 0, 0.14)",
  textPrimary: "text-[#06070A]",
  textSecondary: "text-[#06070A]/85",
  textMuted: "text-[#06070A]/70",
  tabTextColor: "text-[#06070A]",
  frameBg: "bg-black/90",
  frameBorder: "border-black/20",
  tagBg: "bg-black/[0.06]",
  tagBorder: "border-black/10",
  tagText: "text-[#06070A] font-semibold",
  ctaUnderline: "bg-[#06070A]",
  dotColor: "#06070A",
};

const GOLD_THEME: ProjectItem["theme"] = {
  folderBg: "#FAB406",
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
    theme: LIGHT_THEME,
  },
  {
    id: "sln",
    indexNumber: "02",
    name: "SLN Transportation",
    oneLiner:
      "A professional, trust-focused website highlighting safe student transportation, specialized care, and reliable services.",
    image: "/images/projects/sln-transportation.webp",
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
    image: "/images/projects/britishconnects.webp",
    link: "https://infanyt.wixsite.com/british-connects",
    highlights: ["Education Website", "Service Showcase", "Responsive UI", "Lead Generation"],
    theme: LIGHT_THEME,
  },
  {
    id: "prettygoodpdf",
    indexNumber: "04",
    name: "Pretty Good PDF",
    oneLiner:
      "A clean, user-friendly web application offering free PDF tools for students and professionals, with a focus on simplicity and privacy.",
    image: "/images/projects/prettygoodpdf.webp",
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
  const desktopOffset = index * 170;

  return (
    <div
      className="sticky w-full"
      style={{
        // Stacking offset: each folder is positioned slightly lower so top tabs stack cleanly
        top: `calc(76px + ${index * 38}px)`,
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
        <div className="relative flex items-end w-full h-[36px] sm:h-[38px] select-none pointer-events-auto">
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
            <div className="relative h-full w-[160px] sm:w-[195px] shrink-0 -mb-[1px]">
              <svg
                viewBox="0 0 210 38"
                className="w-full h-full block"
                preserveAspectRatio="none"
              >
                {/* Solid Folder Fill */}
                <polygon
                  points="0,38 0,0 174,0 210,38"
                  fill={project.theme.folderBg}
                />
                {/* Crisp Top Stroke */}
                <polyline
                  points="0,38 0,0 174,0 210,38"
                  fill="none"
                  stroke={project.theme.borderColor}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tab Typography */}
              <div className="absolute inset-0 flex items-center pl-4 sm:pl-5 pr-7 pointer-events-none">
                <span
                  className={`font-epilogue text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-1.5 ${project.theme.tabTextColor}`}
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>PROJECT {project.indexNumber}</span>
                </span>
              </div>
            </div>
          ) : (
            /* Tabs 1, 2, 3: Raised Tab with 45° slope UP on left and 45° slope DOWN on right */
            <div className="relative h-full w-[160px] sm:w-[205px] shrink-0 -mb-[1px]">
              <svg
                viewBox="0 0 220 38"
                className="w-full h-full block"
                preserveAspectRatio="none"
              >
                {/* Solid Folder Fill */}
                <polygon
                  points="0,38 36,0 184,0 220,38"
                  fill={project.theme.folderBg}
                />
                {/* Crisp Top Stroke */}
                <polyline
                  points="0,38 36,0 184,0 220,38"
                  fill="none"
                  stroke={project.theme.borderColor}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Tab Typography */}
              <div className="absolute inset-0 flex items-center justify-center px-5 pointer-events-none">
                <span
                  className={`font-epilogue text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-1.5 ${project.theme.tabTextColor}`}
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
          className="relative w-full rounded-b-md border-l border-r border-b overflow-hidden transition-colors"
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
            <div className="lg:col-span-6 flex flex-col justify-center p-4 sm:p-6 md:p-7 lg:p-8 xl:p-9">

              {/* Project Title */}
              <h3
                className={`text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-excon font-bold tracking-tight leading-[1.12] ${project.theme.textPrimary}`}
              >
                {project.name}
              </h3>

              {/* One-liner */}
              <p className={`mt-2 sm:mt-2.5 text-xs sm:text-sm lg:text-[14px] font-epilogue font-normal leading-relaxed max-w-lg ${project.theme.textSecondary}`}>
                {project.oneLiner}
              </p>

              {/* Tags */}
              <div className="mt-3.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {project.highlights.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-epilogue font-semibold border transition-colors ${project.theme.tagBg} ${project.theme.tagBorder} ${project.theme.tagText}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-4 sm:mt-5 pt-0.5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/btn inline-flex items-center gap-2 font-epilogue text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer ${project.theme.textPrimary}`}
                >
                  <span className="relative">
                    <span>VIEW PROJECT</span>
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 origin-left scale-x-100 group-hover/btn:scale-x-110 ${project.theme.ctaUnderline}`} />
                  </span>
                  <div className="w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </a>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: FRAMED THUMBNAIL                       */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/mockup relative w-full max-w-[480px] lg:max-w-[490px] block cursor-pointer"
                aria-label={`Open ${project.name} in a new tab`}
              >
                {/* Browser chrome bar */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg border-l border-r border-t"
                  style={{
                    backgroundColor: '#1C1E24',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF5F57]/70" />
                  <span className="w-2 h-2 rounded-full bg-[#FEBC2E]/70" />
                  <span className="w-2 h-2 rounded-full bg-[#28C840]/70" />
                  <div className="flex-1 mx-2.5 h-3.5 rounded-sm bg-white/[0.06] border border-white/[0.06]" />
                </div>

                {/* Image frame — object-contain keeps the thumbnail neat with no cropping or stretching */}
                <div
                  className={`relative w-full aspect-[16/9] overflow-hidden border-l border-r border-b rounded-b-lg shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${project.theme.frameBg} ${project.theme.frameBorder}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 490px"
                    className="object-contain transition-transform duration-700 ease-out group-hover/mockup:scale-[1.03]"
                  />

                  {/* Hover badge */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3 h-3 text-[#FAB406]" />
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FAB406]/50 to-transparent z-10" aria-hidden />
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
        {/* Unified Section Eyebrow */}
        <SectionEyebrow>Our Portfolio</SectionEyebrow>

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
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 relative space-y-8 sm:space-y-10 md:space-y-12 pb-8 sm:pb-12">
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
