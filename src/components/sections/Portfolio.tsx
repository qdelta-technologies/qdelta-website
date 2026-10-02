"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X, ExternalLink, Plus } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from "motion/react";

interface ProjectItem {
  id: string;
  indexNumber: string;
  tabLabel: string;
  name: string;
  category: string;
  date: string;
  oneLiner: string;
  description: string;
  image: string;
  highlights: string[];
  outcomes: {
    label: string;
    value: string;
  }[];
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

const ARCHIVE_PROJECTS: ProjectItem[] = [
  {
    id: "auralroast",
    indexNumber: "01",
    tabLabel: "+ PROJECT 01",
    name: "Aural Roast",
    category: "Premium Brand Storefront",
    date: "MAR 24, 2026",
    oneLiner: "An immersive brand experience built around storytelling, motion and conversion.",
    description:
      "A premium product-focused storefront blending sensory brand storytelling, curated catalog discovery and streamlined e-commerce architecture.",
    image: "/images/projects/auralroast.jpg",
    highlights: ["Brand Storytelling", "Catalog Architecture", "Micro-Interactions", "Shopify Engine"],
    outcomes: [
      { label: "Positioning", value: "Artisanal high-end brand feel" },
      { label: "Catalog", value: "Immersive discovery flow" },
      { label: "Checkout", value: "Frictionless purchase UX" },
    ],
    theme: {
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
      ctaUnderline: "bg-[#F5B800]",
      dotColor: "#F5B800",
    },
  },
  {
    id: "authorrise",
    indexNumber: "02",
    tabLabel: "+ PROJECT 02",
    name: "AuthorRise",
    category: "Digital Sales Experience",
    date: "FEB 16, 2026",
    oneLiner: "A focused landing experience designed to turn attention into action.",
    description:
      "A high-converting sales funnel and product landing experience engineered to communicate value instantly, eliminate buyer hesitation and drive purchases.",
    image: "/images/projects/authorrise.jpg",
    highlights: ["Sales Copy Structure", "1-Step Checkout", "Lead Capture", "Conversion Architecture"],
    outcomes: [
      { label: "Clarity", value: "Clear digital offer structure" },
      { label: "Conversion", value: "High-intent checkout flow" },
      { label: "Launch", value: "Turnkey digital sales platform" },
    ],
    theme: {
      folderBg: "#E7B72A",
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
    },
  },
  {
    id: "fitcore",
    indexNumber: "03",
    tabLabel: "+ PROJECT 03",
    name: "FitCore Studio",
    category: "Interactive Brand Website",
    date: "JAN 28, 2026",
    oneLiner: "A premium digital experience combining motion, interaction and strong visual identity.",
    description:
      "A bespoke multi-section web presence designed to showcase high-ticket training programmes, elevate personal brand authority and convert visitors into clients.",
    image: "/images/projects/fitcore.jpg",
    highlights: ["Personal Brand Identity", "Programme Packaging", "Client Onboarding", "Responsive UI"],
    outcomes: [
      { label: "Authority", value: "Elevated personal brand credibility" },
      { label: "Clarity", value: "Clear coaching tiers" },
      { label: "Enquiries", value: "Optimised booking funnel" },
    ],
    theme: {
      folderBg: "#F5F1E8",
      borderColor: "rgba(0, 0, 0, 0.14)",
      textPrimary: "text-zinc-950",
      textSecondary: "text-zinc-700",
      textMuted: "text-zinc-500",
      tabTextColor: "text-zinc-900",
      frameBg: "bg-zinc-900",
      frameBorder: "border-black/15",
      tagBg: "bg-black/[0.05]",
      tagBorder: "border-black/12",
      tagText: "text-zinc-900 font-semibold",
      ctaUnderline: "bg-[#D9A51A]",
      dotColor: "#18181b",
    },
  },
  {
    id: "sln",
    indexNumber: "04",
    tabLabel: "+ PROJECT 04",
    name: "SLN Fleet",
    category: "Modern Web Platform",
    date: "JAN 06, 2026",
    oneLiner: "A reliable, high-clarity digital presence engineered for trust, speed and conversions.",
    description:
      "An authoritative service business platform engineered to communicate safety credentials, route logistics and operational reliability for student transportation.",
    image: "/images/projects/sln.jpg",
    highlights: ["Service Platform", "Trust Architecture", "Route Information", "Instant Enquiry Flow"],
    outcomes: [
      { label: "Trust", value: "Institutional credibility" },
      { label: "Clarity", value: "Clear route pricing model" },
      { label: "Enquiry", value: "Fast quote request experience" },
    ],
    theme: {
      folderBg: "#080A0F",
      borderColor: "rgba(245, 184, 0, 0.3)",
      textPrimary: "text-white",
      textSecondary: "text-zinc-300",
      textMuted: "text-zinc-400",
      tabTextColor: "text-[#F5B800]",
      frameBg: "bg-[#06070A]",
      frameBorder: "border-[#F5B800]/25",
      tagBg: "bg-white/[0.05]",
      tagBorder: "border-white/10",
      tagText: "text-zinc-300",
      ctaUnderline: "bg-[#F5B800]",
      dotColor: "#F5B800",
    },
  },
];

interface ArchiveFolderProps {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpenModal: (project: ProjectItem) => void;
}

function ArchiveFolder({
  project,
  index,
  total,
  progress,
  onOpenModal,
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
        }}
        className="w-full flex flex-col group/folder transition-shadow duration-300 filter drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
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
        {/* MAIN FOLDER BODY (SEAMLESSLY FUSED UNDER TAB)                     */}
        {/* ================================================================= */}
        <div
          className="relative w-full rounded-b-xl sm:rounded-b-2xl border-l border-r border-b p-6 sm:p-8 md:p-9 lg:p-10 overflow-hidden transition-colors"
          style={{
            backgroundColor: project.theme.folderBg,
            borderColor: project.theme.borderColor,
          }}
        >
          {/* Subtle Ambient Sheen */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            {/* ==================================================== */}
            {/* LEFT COLUMN: PURE EDITORIAL CONTENT & TYPOGRAPHY     */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-5">
              {/* Category & Date Marker */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: project.theme.dotColor }}
                />
                <span
                  className={`font-epilogue text-xs font-semibold tracking-[0.18em] uppercase ${project.theme.textMuted}`}
                >
                  {project.date} // {project.category}
                </span>
              </div>

              {/* Dominant Project Title */}
              <h3
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-excon font-bold tracking-tight leading-[1.08] ${project.theme.textPrimary}`}
              >
                {project.name}
              </h3>

              {/* One-Line Punchy Description */}
              <p
                className={`text-sm sm:text-base font-epilogue font-normal leading-relaxed max-w-xl ${project.theme.textSecondary}`}
              >
                {project.oneLiner}
              </p>

              {/* Minimal Capability Highlights */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.highlights.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] sm:text-xs font-epilogue font-medium border transition-colors ${project.theme.tagBg} ${project.theme.tagBorder} ${project.theme.tagText}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button: VIEW PROJECT ↗ with animated underline & arrow */}
              <div className="pt-2 sm:pt-3">
                <button
                  onClick={() => onOpenModal(project)}
                  className={`group/btn inline-flex items-center gap-2 font-epilogue text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer ${project.theme.textPrimary}`}
                >
                  <span className="relative">
                    <span>VIEW PROJECT</span>
                    {/* Animated hover underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-transform duration-300 origin-left scale-x-100 group-hover/btn:scale-x-110 ${project.theme.ctaUnderline}`}
                    />
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: MODERN FRAMED THUMBNAIL (SMOOTH EDGES) */}
            {/* ==================================================== */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div
                onClick={() => onOpenModal(project)}
                className="group/mockup relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden p-1 sm:p-1.5 transition-transform duration-500 ease-out hover:scale-[1.01]"
              >
                {/* Smooth Outer Frame with Soft Shadow */}
                <div
                  className={`relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden border shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${project.theme.frameBg} ${project.theme.frameBorder}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} preview showcase`}
                    fill
                    sizes="(max-width: 768px) 100vw, 620px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-105"
                  />

                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 pointer-events-none" />

                  {/* Corner View Hover Action Badge */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 shadow-md">
                    <ExternalLink className="w-3 h-3 text-[#F5B800]" />
                    <span className="font-epilogue text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Layered Scroll Stacking Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full bg-[#06070A] text-white py-16 sm:py-20 md:py-24 scroll-mt-12 overflow-visible"
    >
      {/* Subtle Warm Gold Technical Grid */}
      <div className="pointer-events-none absolute inset-0 bg-qdelta-grid [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Ambient Horizon Atmosphere */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[60rem] rounded-full bg-[#F5B800]/[0.03] blur-[150px]" />

      {/* ======================================================= */}
      {/* SECTION INTRO HEADER                                    */}
      {/* ======================================================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 relative z-10">
        {/* Editorial Section Identifier */}
        <div className="flex items-center gap-3 mb-4 select-none">
          <span className="font-epilogue text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400">
            04 / Selected Work
          </span>
          <div className="w-10 sm:w-12 h-[1px] bg-[#F5B800]/60" />
        </div>

        {/* Headline & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-excon font-bold tracking-tight text-white leading-[1.12]">
              Curated builds. Engineered to convert.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <p className="text-sm sm:text-base md:text-lg font-epilogue text-zinc-400 font-normal leading-relaxed">
              Explore our project archive. Each build is custom-engineered to solve specific business problems, present clear offers, and elevate digital authority.
            </p>
            <p className="text-[11px] sm:text-xs font-epilogue text-zinc-500 font-normal tracking-wide">
              Concept builds demonstrated to showcase QDelta’s design, engineering and motion capabilities.
            </p>
          </div>
        </div>
      </div>

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
            onOpenModal={(p) => setActiveModalProject(p)}
          />
        ))}
      </div>

      {/* ======================================================= */}
      {/* SECTION CTA                                             */}
      {/* ======================================================= */}
      <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 sm:pt-10 border-t border-white/[0.08] relative z-10">
        <div>
          <h4 className="font-epilogue text-lg sm:text-xl font-bold text-white">
            Have a project in mind?
          </h4>
          <p className="font-epilogue text-xs sm:text-sm text-zinc-400 mt-1">
            Let’s discuss your goals, architecture and conversion strategy.
          </p>
        </div>

        <Link
          href="#contact"
          className="group/cta inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#F5B800] text-[#06070A] font-epilogue font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,184,0,0.25)] hover:bg-[#D9A51A] hover:shadow-[0_0_24px_rgba(245,184,0,0.35)] transition-all duration-300 hover:scale-[1.02]"
        >
          <span>Initiate a Project</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </div>

      {/* ======================================================= */}
      {/* CASE STUDY DETAIL MODAL                                 */}
      {/* ======================================================= */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-2xl border border-white/12 bg-[#0B0E12] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Body */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-epilogue text-xs uppercase tracking-widest text-[#F5B800] font-semibold">
                    PROJECT {activeModalProject.indexNumber} // {activeModalProject.category}
                  </span>
                </div>

                <h3 className="font-excon text-2xl sm:text-3xl font-bold text-white">
                  {activeModalProject.name}
                </h3>
                <p className="mt-1 font-epilogue text-sm sm:text-base text-zinc-300">
                  {activeModalProject.oneLiner}
                </p>

                {/* High-res showcase visual */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mt-6 border border-white/10 shadow-lg">
                  <Image
                    src={activeModalProject.image}
                    alt={activeModalProject.name}
                    fill
                    className="object-cover"
                    sizes="800px"
                  />
                </div>

                {/* Overview narrative */}
                <div className="mt-6">
                  <h4 className="text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-semibold mb-2">
                    Project Architecture & Strategy
                  </h4>
                  <p className="font-epilogue text-sm text-zinc-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Capabilities included */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <h4 className="text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-semibold mb-3">
                    Capabilities Implemented
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-epilogue text-zinc-200"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {activeModalProject.outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="p-3.5 rounded-xl bg-white/[0.025] border border-white/10"
                    >
                      <span className="text-[10px] font-epilogue uppercase tracking-wider text-[#F5B800] font-semibold">
                        {o.label}
                      </span>
                      <p className="mt-1 font-epilogue text-xs font-bold text-white">
                        {o.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Modal Footer CTA */}
                <div className="mt-8 flex justify-end">
                  <Link
                    href="#contact"
                    onClick={() => setActiveModalProject(null)}
                    className="px-7 py-3 rounded-full bg-[#F5B800] text-[#06070A] font-epilogue font-bold text-xs sm:text-sm hover:bg-[#D9A51A] transition-colors shadow-md"
                  >
                    Discuss a Similar Build
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
