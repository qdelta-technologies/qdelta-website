"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion, useInView } from "motion/react";

export default function BrandTransformationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.15 });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Helper to reliably trigger autoplay without main-thread blocking
  const triggerPlay = useCallback(() => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.muted = true;
      video.play().catch(() => {
        // Handled silently for strict browser policies
      });
    }
  }, []);

  // 1. Play when scrolled into view
  useEffect(() => {
    if (isInView) {
      triggerPlay();
    }
  }, [isInView, triggerPlay]);

  // 2. Play on initial mount and any user interaction
  useEffect(() => {
    const timer = setTimeout(triggerPlay, 100);

    const onUserGesture = () => {
      triggerPlay();
    };

    window.addEventListener("scroll", onUserGesture, { passive: true, once: true });
    window.addEventListener("touchstart", onUserGesture, { passive: true, once: true });
    window.addEventListener("pointerdown", onUserGesture, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("pointerdown", onUserGesture);
    };
  }, [triggerPlay]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
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
    video.play();
    setIsPlaying(true);
  };

  return (
    <section
      id="transformation"
      className="relative z-20 w-full bg-[#040406] text-white py-20 sm:py-28 md:py-32 scroll-mt-20 overflow-hidden selection:bg-[#FAB406] selection:text-black"
    >
      {/* ================= BACKGROUND ARCHITECTURAL GRID ================= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Ambient Warm Golden Halos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[44rem] w-[75rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.10] via-[#FAB406]/[0.025] to-transparent blur-[140px]" />

        {/* Subtle Yellow-Themed Linear Architectural Grid */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(250, 180, 6, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(250, 180, 6, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 42%, black 20%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 42%, black 20%, transparent 85%)",
          }}
        />

        {/* Soft Edges Top & Bottom */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#040406] via-[#040406]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mb-10 sm:mb-12">
          {/* Editorial Section Identifier */}
          <div className="flex items-center gap-3.5 mb-4 select-none justify-center">
            <span className="font-mono text-xs tracking-[0.24em] uppercase text-zinc-400 font-medium">
              THE TRANSFORMATION
            </span>
            <div className="w-10 sm:w-12 h-[1px] bg-[#FAB406]/60" />
            <svg
              className="w-2.5 h-2.5 text-[#FAB406] fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <h2 className="font-epilogue font-bold text-3xl sm:text-4xl md:text-[46px] text-white tracking-tight leading-[1.14]">
            Watch Ordinary Turn Into Authority.
          </h2>

          <p className="mt-4 font-excon text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            See how QDelta transforms fragmented, outdated digital touchpoints into
            high-performing brand flagships that command trust.
          </p>
        </div>

        {/* ================= CINEMATIC VIDEO PLAYER CHASSIS ================= */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full rounded-2xl md:rounded-3xl border border-[#FAB406]/30 bg-[#07080d]/90 p-2 sm:p-3 md:p-4 shadow-[0_0_70px_rgba(250,180,6,0.14)] backdrop-blur-xl group"
        >
          {/* Subtle Outer Glow Accent */}
          <div className="absolute -inset-0.5 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#FAB406]/20 via-transparent to-[#FAB406]/20 blur-xl opacity-40 pointer-events-none" />

          {/* Video Container (16:9 Aspect Ratio) */}
          <div
            onClick={togglePlayPause}
            className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-[#030305] shadow-2xl border border-white/10 cursor-pointer"
          >
            {/* Native Hardware-Accelerated Autoplaying Video */}
            <video
              ref={videoRef}
              src="/section-video-3d-muted.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            />

            {/* Top Right: Player Controls (Play/Pause, Replay) */}
            <div
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 hover:border-[#FAB406]/60 text-white hover:text-[#FAB406] text-xs font-mono transition-all shadow-lg cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406] animate-pulse" />
                    <Pause className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Playing</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    <Play className="w-3.5 h-3.5 text-[#FAB406]" />
                    <span className="hidden sm:inline">Paused</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart video"
                className="p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 hover:border-[#FAB406]/60 text-white hover:text-[#FAB406] transition-all shadow-lg cursor-pointer"
                title="Restart from beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
