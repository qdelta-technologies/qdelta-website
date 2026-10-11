"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const VIDEO_PLAYBACK_RATE = 1.35;

const STATS_DATA = [
  { num: 10, suffix: "+", label: "Clients Served", detail: "Across multiple industries" },
  { num: 2,  suffix: "+", label: "Years Experience", detail: "In design & development" },
  { num: 100, suffix: "%", label: "Tailored Solutions", detail: "Built around your business goals" },
];

function useCountUp(target: number, isInView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);
  return count;
}

function StatItem({ num, suffix, label, detail }: { num: number; suffix: string; label: string; detail: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const count = useCountUp(num, isInView);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center px-1.5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/[0.04] border border-black/[0.06] hover:bg-black/[0.08] transition-colors"
    >
      <p className="font-heading font-black text-2xl sm:text-3xl lg:text-[30px] text-[#050608] tracking-tight leading-none">
        {count}{suffix}
      </p>
      <p className="mt-1 font-excon text-[11px] sm:text-xs font-bold text-[#050608] leading-tight tracking-tight">
        {label}
      </p>
      <p className="mt-0.5 font-epilogue text-[10px] text-black/70 font-semibold leading-tight hidden sm:block">
        {detail}
      </p>
    </div>
  );
}

const DIFFERENTIATORS = [
  { label: "Strategy first", detail: "We understand the business before touching the design." },
  { label: "Premium execution", detail: "Every pixel, interaction and word is intentional." },
  { label: "Built to convert", detail: "Design that looks great and drives real results." },
];

/* ─── Brand logos — monochrome placeholders, swap with real assets later ─── */
const LOGOS = [
  {
    key: "google",
    label: "Google",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-label="Google" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
      </svg>
    ),
  },
  {
    key: "microsoft",
    label: "Microsoft",
    node: (
      <svg viewBox="0 0 21 21" className="h-5 w-5" fill="currentColor" aria-label="Microsoft" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h10v10H0z" opacity=".9"/>
        <path d="M11 0h10v10H11z" opacity=".6"/>
        <path d="M0 11h10v10H0z" opacity=".6"/>
        <path d="M11 11h10v10H11z" opacity=".9"/>
      </svg>
    ),
  },
  {
    key: "slack",
    label: "Slack",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-label="Slack" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.27 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.833 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.833 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.833 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.833zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.311zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.164 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.164 24a2.527 2.527 0 0 1-2.52-2.523v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.523 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    key: "notion",
    label: "Notion",
    node: (
      <span className="font-excon text-[15px] font-black tracking-tight leading-none select-none" aria-label="Notion">
        Notion
      </span>
    ),
  },
  {
    key: "aws",
    label: "AWS",
    node: (
      <span className="font-excon text-[15px] font-black tracking-tight leading-none select-none" aria-label="AWS">
        aws
      </span>
    ),
  },
  {
    key: "zapier",
    label: "Zapier",
    node: (
      <span className="font-excon text-[15px] font-black tracking-tight leading-none select-none" aria-label="Zapier">
        zapier
      </span>
    ),
  },
];

export default function BrandTransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2, margin: "100px 0px -10% 0px" });

  // Computed in an effect (not during render) so the server-rendered markup
  // always matches the client's first paint — reading `window` during render
  // caused a hydration mismatch, which meant React left the server's
  // preload="metadata" stuck in place on phones instead of patching it to
  // preload="none", and could leave mobile autoplay logic in the wrong state.
  // Width-based rather than pointer/hover capability, since that media query
  // is reported inconsistently across mobile browsers/webviews.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // The 7MB video gets no source at all until it is needed: on desktop once the section is near the screen,
  // on a phone only when the visitor taps play. (A server-rendered preload="metadata" made phones start
  // downloading it on page load, before this code could switch it off.)
  const [wantVideo, setWantVideo] = useState(false);
  const playWhenReady = useRef(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isPlayingRef = useRef(false);
  const isInViewRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  // Video progress rail — rAF on desktop, throttled interval on mobile
  useEffect(() => {
    const writeProgress = () => {
      const video = videoRef.current;
      if (video && video.duration) {
        const p = Math.max(0, Math.min(1, video.currentTime / video.duration));
        const pct = (p * 100).toFixed(2);
        if (progressFillRef.current) progressFillRef.current.style.width = `${pct}%`;
        if (progressDotRef.current) progressDotRef.current.style.left = `${pct}%`;
      }
    };

    if (!isPlaying || !isInView) return;

    if (isMobile) {
      // 8fps is plenty for a progress bar on mobile
      const intervalId = setInterval(writeProgress, 125);
      return () => clearInterval(intervalId);
    }

    let animId: number;
    const loop = () => {
      if (!isPlayingRef.current || !isInViewRef.current) return;
      writeProgress();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isInView, isMobile]);

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

  // As soon as the video has its source, start it if somebody asked for it
  useEffect(() => {
    if (wantVideo && playWhenReady.current) {
      playWhenReady.current = false;
      handlePlay();
    }
  }, [wantVideo, handlePlay]);

  // Autoplay when in view (desktop only); pause when out of view
  useEffect(() => {
    if (isInView && !isMobile) {
      if (wantVideo) handlePlay();
      else {
        playWhenReady.current = true;
        setWantVideo(true);
      }
      setIsPlaying(true);
    } else if (!isInView) {
      handlePause();
      setIsPlaying(false);
    }
  }, [isInView, isMobile, wantVideo, handlePlay, handlePause]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (!wantVideo) {
      // first tap on a phone: give the video its source now, and it starts as soon as it is attached
      playWhenReady.current = true;
      setWantVideo(true);
      setIsPlaying(true);
      return;
    }
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
    if (!wantVideo) {
      playWhenReady.current = true;
      setWantVideo(true);
      setIsPlaying(true);
      return;
    }
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
      className="relative z-20 w-full bg-[#06070A] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 scroll-mt-20 overflow-hidden selection:bg-[#FAB406] selection:text-[#06070A]"
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
          {/* Unified Section Eyebrow */}
          <SectionEyebrow>About QDelta</SectionEyebrow>

          {/* Headline (Single line on desktop/tablets, balanced on mobile) */}
          <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-4xl lg:text-[42px] xl:text-[46px] text-white tracking-tight leading-[1.18] md:whitespace-nowrap">
            <span className="inline-block">We Make Brands Look Better.</span>{" "}
            <span className="inline-block text-[#FAB406]">And Work Better.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-3.5 sm:mt-4 font-epilogue text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            We combine strategy, design and development to create digital
            experiences that build trust and move businesses forward.
          </p>
        </motion.div>

        {/* ================= VIDEO + UNIFIED VALUE PANEL ================= */}
        <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 lg:items-stretch">
          {/* Left: motion / video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-xl sm:rounded-2xl border border-[#FAB406] bg-[#0B0E12]/90 backdrop-blur-md p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(250,180,6,0.12)] relative overflow-hidden flex flex-col justify-between transition-all duration-300 group lg:min-h-[420px]"
          >
            {/* Crisp Golden Top Accent Hairline */}
            <div className="pointer-events-none absolute top-0 inset-x-8 sm:inset-x-14 h-[1px] bg-gradient-to-r from-transparent via-[#FAB406]/50 to-transparent z-20" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#FAB406]/[0.04] blur-[90px]" />

            {/* Video Player Frame */}
            <div
              onClick={togglePlayPause}
              className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-[#06070A] shadow-2xl border border-white/[0.07] cursor-pointer"
            >
              <video
                ref={videoRef}
                src={wantVideo ? "/section-video-3d-muted.mp4" : undefined}
                poster="/section-video-poster.jpg"
                muted
                loop
                playsInline
                preload="none"
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
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#FAB406]/60 text-white text-xs font-epilogue transition-all shadow-md cursor-pointer select-none"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPlaying ? "bg-[#FAB406] animate-pulse" : "bg-zinc-500"
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
                  className="p-1.5 sm:p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#FAB406]/60 text-white hover:text-[#FAB406] transition-all shadow-md cursor-pointer"
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
                    ref={progressFillRef}
                    className="h-full bg-gradient-to-r from-zinc-600 via-[#FAB406]/70 to-[#FAB406] will-change-[width]"
                    style={{ width: "0%" }}
                  />
                </div>

                {/* Left Origin Ring ("From ordinary") */}
                <div className="absolute left-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-zinc-600 bg-[#06070A]" />

                {/* Right Destination Ring ("To standout") */}
                <div className="absolute right-0 w-2 h-2 -translate-y-1/2 top-1/2 rounded-full border border-[#FAB406]/40 bg-[#06070A]" />

                {/* Live Traveling Golden Glow Dot */}
                <div
                  ref={progressDotRef}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none will-change-[left]"
                  style={{ left: "0%" }}
                >
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FAB406] ring-4 ring-[#FAB406]/25 shadow-[0_0_10px_#FAB406]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust bar — between video and stats on mobile; hidden on desktop (shown below grid) */}
          <div className="lg:hidden w-full py-2">
            <p className="text-center font-epilogue text-[10px] tracking-[0.22em] uppercase text-zinc-600 font-semibold mb-4 select-none">
              Trusted by innovative teams
            </p>
            <div className="relative w-full overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-[#06070A] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-[#06070A] to-transparent" />
              <div className="flex items-center justify-center flex-wrap gap-x-7 gap-y-3 py-1">
                {LOGOS.map(({ key, node }) => (
                  <div key={key} className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                    {node}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Modern Bento Grid Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="flex flex-col gap-3 sm:gap-3.5 lg:min-h-[420px] lg:justify-between"
          >
            {/* Bento Tile 1: Sculpted Top Metrics Banner */}
            <div className="relative rounded-xl sm:rounded-2xl border border-[#D49802] bg-[#FAB406] p-3.5 sm:p-4 shadow-[0_12px_30px_rgba(250,180,6,0.16)] overflow-hidden group">
              {/* Crisp top sheen */}
              <div className="pointer-events-none absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              {/* Ambient sheen reflection */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

              {/* Header micro-tag: Agency Track Record */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/10 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  <span className="font-excon text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#050608]">
                    Proven Track Record
                  </span>
                </div>
                <span className="font-epilogue text-[10px] text-black/75 font-bold tracking-wide uppercase">
                  Data-Backed Results
                </span>
              </div>

              {/* 3 Inset Metric Pods */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {STATS_DATA.map((stat) => (
                  <StatItem
                    key={stat.label}
                    num={stat.num}
                    suffix={stat.suffix}
                    label={stat.label}
                    detail={stat.detail}
                  />
                ))}
              </div>
            </div>

            {/* Bento Tile 2: 3 Elevated Differentiator Cards */}
            <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 lg:justify-between">
              {DIFFERENTIATORS.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#D49802] bg-[#FAB406] shadow-[0_6px_20px_rgba(250,180,6,0.12)] hover:bg-[#FFBF14] hover:shadow-[0_10px_28px_rgba(250,180,6,0.22)] hover:-translate-y-0.5 transition-all duration-300 group/item cursor-default overflow-hidden"
                >
                  {/* Top hairline sheen */}
                  <div className="pointer-events-none absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    {/* Index squircle badge */}
                    <div className="shrink-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-black text-[#FAB406] shadow-sm group-hover/item:scale-105 transition-transform duration-200">
                      <span className="font-excon text-[11px] sm:text-xs font-black leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <p className="font-excon text-xs sm:text-sm font-extrabold text-[#050608] tracking-tight leading-snug group-hover/item:text-black">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-epilogue text-[11px] sm:text-xs text-black/80 font-medium leading-relaxed line-clamp-1 sm:line-clamp-none">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  {/* Micro hover arrow badge */}
                  <div className="shrink-0 hidden sm:flex h-6 w-6 items-center justify-center rounded-md bg-black/10 group-hover/item:bg-black group-hover/item:text-[#FAB406] text-[#050608] transition-colors duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust bar — desktop only, below the 2-col grid */}
        <div className="hidden lg:block w-full mt-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-7" />
          <p className="text-center font-epilogue text-[10px] tracking-[0.22em] uppercase text-zinc-600 font-semibold mb-5 select-none">
            Trusted by innovative teams
          </p>
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#06070A] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#06070A] to-transparent" />
            <div className="flex items-center justify-center gap-10">
              {LOGOS.map(({ key, node }) => (
                <div key={key} className="text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                  {node}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
