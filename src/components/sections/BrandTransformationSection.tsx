"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Play,
  Pause,
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
  {
    metric: "End-to-End",
    label: "Project Flow",
    detail: "Strategy → Design → Development → Support",
  },
];

export default function BrandTransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  // Smooth 60fps video progress tracking for the traveling dot
  useEffect(() => {
    let animId: number;
    const updateProgress = () => {
      const video = videoRef.current;
      if (video && video.duration) {
        setProgress(video.currentTime / video.duration);
      }
      if (isPlaying) {
        animId = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * video.duration;
    setProgress(newProgress);
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
    setProgress(0);
    video.playbackRate = VIDEO_PLAYBACK_RATE;
    video.play();
    setIsPlaying(true);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#06070A] text-white py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden selection:bg-[#F5B800] selection:text-[#06070A]"
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
          className="text-center max-w-4xl xl:max-w-5xl mb-10 sm:mb-12 md:mb-14"
        >
          {/* Eyebrow with flanking golden lines */}
          <div className="flex items-center gap-3.5 mb-3.5 sm:mb-4 select-none justify-center">
            <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#F5B800]/60" />
            <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">
              ABOUT QDELTA
            </span>
            <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#F5B800]/60" />
          </div>

          {/* Headline (Single line on desktop/tablets, balanced on mobile) */}
          <h2 className="font-excon font-bold text-xl sm:text-2xl md:text-4xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-[1.18] md:whitespace-nowrap">
            <span className="inline-block">Websites that do more</span>{" "}
            <span className="inline-block text-[#FAB406]">than look good.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 sm:mt-4 font-epilogue text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            We combine design, strategy and development to create websites that
            build trust, improve experience and support business growth.
          </p>
        </motion.div>

        {/* ================= MAIN BENTO GRID ================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* ========================================================= */}
          {/* CENTRAL VIDEO CARD (DOMINANT VISUAL ELEMENT)              */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="order-1 col-span-1 md:col-span-2 lg:col-span-6 lg:row-span-2 rounded-xl sm:rounded-2xl border border-white/[0.09] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between transition-all duration-300 group"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-14 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent z-20" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#F5B800]/[0.04] blur-[90px]" />

            {/* Video Player Frame */}
            <div
              onClick={togglePlayPause}
              className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#06070A] shadow-2xl border border-white/[0.07] cursor-pointer"
            >
              <video
                ref={videoRef}
                src="/section-video-3d-muted.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
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
                  willChange: "transform",
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
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#F5B800]/60 text-white text-xs font-epilogue transition-all shadow-md cursor-pointer select-none"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPlaying ? "bg-[#F5B800] animate-pulse" : "bg-zinc-500"
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
                  className="p-1.5 sm:p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#F5B800]/60 text-white hover:text-[#F5B800] transition-all shadow-md cursor-pointer"
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
                <span className="text-[#FAB406] font-semibold">
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
                    className="h-full bg-gradient-to-r from-zinc-600 via-[#F5B800]/70 to-[#FAB406]"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                {/* Left Origin Ring ("From ordinary") */}
                <div className="absolute left-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-zinc-600 bg-[#06070A]" />

                {/* Right Destination Ring ("To standout") */}
                <div className="absolute right-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-[#FAB406]/40 bg-[#06070A]" />

                {/* Live Traveling Golden Glow Dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none will-change-[left]"
                  style={{ left: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FAB406] ring-4 ring-[#FAB406]/25 shadow-[0_0_10px_#FAB406]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 01: BETTER FIRST IMPRESSIONS                         */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-2 col-span-1 lg:col-span-3 lg:row-start-1 lg:col-start-1 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,184,0,0.08)] group"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/40 to-transparent" />

            {/* Top Row: Icon Badge & Number */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#F5B800]/10 border border-[#F5B800]/25 flex items-center justify-center text-[#F5B800] transition-colors group-hover:bg-[#F5B800]/15">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-epilogue text-xs text-zinc-500 font-semibold tracking-widest">
                01
              </span>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="font-excon font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                Better First Impressions
              </h3>
              <p className="mt-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 font-normal leading-relaxed">
                Premium digital experiences that make your brand feel more valuable.
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 02: CLEARER USER EXPERIENCE                          */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-3 col-span-1 lg:col-span-3 lg:row-start-1 lg:col-start-10 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,184,0,0.08)] group"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/40 to-transparent" />

            {/* Top Row: Icon Badge & Number */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#F5B800]/10 border border-[#F5B800]/25 flex items-center justify-center text-[#F5B800] transition-colors group-hover:bg-[#F5B800]/15">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-epilogue text-xs text-zinc-500 font-semibold tracking-widest">
                02
              </span>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="font-excon font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                Clearer User Experience
              </h3>
              <p className="mt-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 font-normal leading-relaxed">
                Simple journeys that make it easier for people to understand and act.
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 03: BUILT WITH PURPOSE                               */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="order-4 col-span-1 lg:col-span-3 lg:row-start-2 lg:col-start-1 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,184,0,0.08)] group"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/40 to-transparent" />

            {/* Top Row: Icon Badge & Number */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#F5B800]/10 border border-[#F5B800]/25 flex items-center justify-center text-[#F5B800] transition-colors group-hover:bg-[#F5B800]/15">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-epilogue text-xs text-zinc-500 font-semibold tracking-widest">
                03
              </span>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="font-excon font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                Built with Purpose
              </h3>
              <p className="mt-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 font-normal leading-relaxed">
                Every section is designed to support trust, engagement and results.
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* CARD 04: STRATEGY-LED THINKING                            */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-5 col-span-1 lg:col-span-3 lg:row-start-2 lg:col-start-10 relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,184,0,0.08)] group"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/40 to-transparent" />

            {/* Top Row: Icon Badge & Number */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#F5B800]/10 border border-[#F5B800]/25 flex items-center justify-center text-[#F5B800] transition-colors group-hover:bg-[#F5B800]/15">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-epilogue text-xs text-zinc-500 font-semibold tracking-widest">
                04
              </span>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h3 className="font-excon font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                Strategy-Led Thinking
              </h3>
              <p className="mt-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 font-normal leading-relaxed">
                We shape the website around your business, audience and goals.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ================= STATS / TRUST PROOF ROW ================= */}
        <div className="w-full mt-4 sm:mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] hover:border-[#F5B800]/30 bg-[#0B0E12]/85 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(245,184,0,0.08)] group select-none"
            >
              {/* Crisp Golden Top Accent Hairline */}
              <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/40 to-transparent" />

              {/* Top Row: Metric & Label */}
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-excon font-extrabold text-xl sm:text-2xl md:text-3xl text-[#FAB406] tracking-tight">
                  {stat.metric}
                </span>
                <span className="font-epilogue font-bold text-xs sm:text-[13px] text-white tracking-tight">
                  {stat.label}
                </span>
              </div>

              {/* Bottom Row: Detail */}
              <p className="mt-3 font-epilogue text-xs sm:text-[13px] text-zinc-400 font-normal leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
