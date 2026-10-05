"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import {
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

interface StatItem {
  metric: string;
  label: string;
  detail: string;
}

const VIDEO_PLAYBACK_RATE = 1.35;

const STATS_DATA: StatItem[] = [
  {
    metric: "10+",
    label: "Clients Served",
    detail: "Across multiple business categories",
  },
  {
    metric: "2+",
    label: "Years Experience",
    detail: "In web design & development",
  },
];

interface PillarItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const PILLARS: PillarItem[] = [
  {
    title: "Better First Impressions",
    description:
      "Premium digital experiences that make your brand feel more valuable.",
    icon: Sparkles,
  },
  {
    title: "Clearer User Experience",
    description:
      "Simple journeys that make it easier for people to understand and act.",
    icon: Layers,
  },
  {
    title: "Built with Purpose",
    description:
      "Every section is designed to support trust, engagement and results.",
    icon: ShieldCheck,
  },
  {
    title: "Strategy-Led Thinking",
    description:
      "We shape the website around your business, audience and goals.",
    icon: BarChart3,
  },
];

export default function BrandTransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, margin: "100px 0px -10% 0px" });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isPlayingRef = useRef(false);
  const isInViewRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  // Video progress rail — rAF only while playing and section is visible
  useEffect(() => {
    let animId: number;
    const updateProgress = () => {
      if (!isPlayingRef.current || !isInViewRef.current) {
        return;
      }
      const video = videoRef.current;
      if (video && video.duration) {
        const p = Math.max(0, Math.min(1, video.currentTime / video.duration));
        const pct = (p * 100).toFixed(2);
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${pct}%`;
        }
        if (progressDotRef.current) {
          progressDotRef.current.style.left = `${pct}%`;
        }
      }
      animId = requestAnimationFrame(updateProgress);
    };

    if (isPlaying && isInView) {
      animId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isInView]);

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * video.duration;
    const pct = (newProgress * 100).toFixed(2);
    if (progressFillRef.current) progressFillRef.current.style.width = `${pct}%`;
    if (progressDotRef.current) progressDotRef.current.style.left = `${pct}%`;
  };

  // Play video only when meaningfully visible
  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = VIDEO_PLAYBACK_RATE;
      if (video.paused) {
        video.muted = true;
        video.play().catch(() => {});
      }
    }
  }, []);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    }
  }, []);

  // Autoplay when in view, pause when out of view
  useEffect(() => {
    if (isInView) {
      handlePlay();
      setIsPlaying(true);
    } else {
      handlePause();
      setIsPlaying(false);
    }
  }, [isInView, handlePlay, handlePause]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.playbackRate = VIDEO_PLAYBACK_RATE;
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    if (progressFillRef.current) progressFillRef.current.style.width = "0%";
    if (progressDotRef.current) progressDotRef.current.style.left = "0%";
    video.playbackRate = VIDEO_PLAYBACK_RATE;
    video.play();
    setIsPlaying(true);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#06070A] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 scroll-mt-20 overflow-hidden selection:bg-[#E5B528] selection:text-[#06070A]"
      aria-label="About QDelta — Strategic Value & Capability"
    >
      {/* ================= BACKGROUND ATMOSPHERE ================= */}
      <SectionAtmosphere variant="center" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ================= SECTION INTRO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl xl:max-w-5xl mb-8 sm:mb-10 md:mb-12"
        >
          {/* Eyebrow with flanking golden lines */}
          <div className="flex items-center gap-3.5 mb-3.5 sm:mb-4 select-none justify-center">
            <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#E5B528]/60" />
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-[#E5B528] font-semibold">
              ABOUT QDELTA
            </span>
            <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#E5B528]/60" />
          </div>

          {/* Headline (Single line on desktop/tablets, balanced on mobile) */}
          <h2 className="font-excon font-bold text-xl sm:text-2xl md:text-4xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-[1.18] md:whitespace-nowrap">
            <span className="inline-block">Websites that do more</span>{" "}
            <span className="inline-block text-[#E5B528]">than look good.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 sm:mt-4 font-epilogue text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            We combine design, strategy and development to create websites that
            build trust, improve experience and support business growth.
          </p>
        </motion.div>

        {/* ================= VIDEO + UNIFIED VALUE PANEL ================= */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* Left: motion / video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-xl sm:rounded-2xl border border-white/[0.09] hover:border-[#E5B528]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between transition-all duration-300 group lg:min-h-[420px]"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-14 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent z-20" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E5B528]/[0.04] blur-[90px]" />

            {/* Video Player Frame */}
            <div
              onClick={togglePlayPause}
              className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#06070A] shadow-2xl border border-white/[0.07] cursor-pointer"
            >
              <video
                ref={videoRef}
                src="/section-video-3d-muted.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = VIDEO_PLAYBACK_RATE;
                }}
                onPlay={(e) => {
                  e.currentTarget.playbackRate = VIDEO_PLAYBACK_RATE;
                  setIsPlaying(true);
                }}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                style={{
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              />

              {/* Minimal Top-Right Controls */}
              <div
                className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-30 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Playing Status Pill */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#E5B528]/60 text-white text-xs font-epilogue transition-all shadow-md cursor-pointer select-none"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPlaying ? "bg-[#E5B528] animate-pulse" : "bg-zinc-500"
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-medium">
                    {isPlaying ? "Playing" : "Paused"}
                  </span>
                </button>

                {/* Restart Icon Button */}
                <button
                  type="button"
                  onClick={handleRestart}
                  aria-label="Restart video"
                  className="p-1.5 sm:p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#E5B528]/60 text-white hover:text-[#E5B528] transition-all shadow-md cursor-pointer"
                  title="Restart from beginning"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subtle Progress Concept: From ordinary to standout */}
            <div className="pt-3.5 sm:pt-4 px-1 sm:px-2 flex flex-col gap-2.5 select-none">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-epilogue">
                <span className="text-zinc-400 font-medium">From ordinary</span>
                <span className="text-[#E5B528] font-semibold">
                  To standout
                </span>
              </div>

              {/* Interactive Travel Rail with Live Traveling Glow Dot */}
              <div
                onClick={handleRailClick}
                className="relative w-full flex items-center h-4 cursor-pointer group/rail"
                title="Click to scrub video"
              >
                {/* Background Track Rail */}
                <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  {/* Filled Gold Progress Line */}
                  <div
                    ref={progressFillRef}
                    className="h-full bg-gradient-to-r from-zinc-600 via-[#E5B528]/70 to-[#E5B528] will-change-[width]"
                    style={{ width: "0%" }}
                  />
                </div>

                {/* Left Origin Ring ("From ordinary") */}
                <div className="absolute left-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-zinc-600 bg-[#06070A]" />

                {/* Right Destination Ring ("To standout") */}
                <div className="absolute right-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-[#E5B528]/40 bg-[#06070A]" />

                {/* Live Traveling Golden Glow Dot */}
                <div
                  ref={progressDotRef}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none will-change-[left]"
                  style={{ left: "0%" }}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E5B528] ring-4 ring-[#E5B528]/25 shadow-[0_0_10px_#E5B528]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: T-block — stats bar + 2×2 pillars in one panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.09] bg-[#0B0E12]/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] lg:min-h-[420px]"
          >
            <div className="pointer-events-none absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#E5B528]/45 to-transparent" />

            {/* T top bar — proof points */}
            <div className="grid grid-cols-2 border-b border-white/[0.08]">
              {STATS_DATA.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`px-4 py-4 sm:px-5 sm:py-5 ${idx === 1 ? "border-l border-white/[0.08]" : ""}`}
                >
                  <p className="font-excon text-2xl sm:text-3xl font-extrabold text-[#E5B528] tracking-tight leading-none">
                    {stat.metric}
                  </p>
                  <p className="mt-1.5 font-epilogue text-xs sm:text-[13px] font-semibold text-white">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-epilogue text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* T body — four pillars */}
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isLeftCol = idx % 2 === 0;
                const isTopRow = idx < 2;
                return (
                  <article
                    key={pillar.title}
                    className={[
                      "group/pillar relative flex flex-col gap-2.5 px-4 py-4 sm:px-5 sm:py-5 transition-colors hover:bg-white/[0.02]",
                      idx < PILLARS.length - 1
                        ? "border-b border-white/[0.08] sm:border-b-0"
                        : "",
                      isTopRow ? "sm:border-b border-white/[0.08]" : "",
                      isLeftCol ? "sm:border-r border-white/[0.08]" : "",
                    ].join(" ")}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5B528]/25 bg-[#E5B528]/10 text-[#E5B528]">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-excon text-base sm:text-[17px] font-bold text-white tracking-tight leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 font-epilogue text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
