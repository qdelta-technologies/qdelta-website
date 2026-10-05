"use client";

import React, { useEffect, useRef } from "react";

interface SectionAtmosphereProps {
  /** Variant for ambient golden halos positioning */
  variant?: "center" | "left" | "right" | "dual" | "top";
  /** Optional density of floating particles (default: 36) */
  particleCount?: number;
  /** Opacity of the yellow linear grid (default: 0.8) */
  gridOpacity?: number;
  /** Whether to show top/bottom edge fade gradients (default: true) */
  edgeVignette?: boolean;
  className?: string;
}

/**
 * Universal QDelta Section Atmosphere Component
 * - Subtle Yellow Linear Architectural Grid (40px, soft horizontal edge fade)
 * - Feather-light golden particle simulation with pulsing glow (no heavy CPU shadowBlur)
 * - Warm Golden Ambient Halos with micro-parallax depth (0 React re-renders via CSS vars)
 * - Automatically pauses canvas loop when off-screen for 60fps performance
 */
export default function SectionAtmosphere({
  variant = "center",
  particleCount = 36,
  gridOpacity = 0.8,
  edgeVignette = true,
  className = "",
}: SectionAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Particle Simulation Canvas (strictly paused when off-screen)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener("resize", handleResize);

    // Pause loop when section is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Initialize slowly moving golden particles
    const stars = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.15,
      speedY: -(Math.random() * 0.15 + 0.05), // Gentle upward drift
      speedX: (Math.random() - 0.5) * 0.08,  // Subtle horizontal sway
      pulseSpeed: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y += star.speedY;
        star.x += star.speedX;
        star.alpha += Math.sin(now * 0.002 * star.pulseSpeed) * 0.008;

        // Wrap around seamlessly
        if (star.y < 0) {
          star.y = height + 4;
          star.x = Math.random() * width;
        }
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        const currentAlpha = Math.max(0.1, Math.min(0.85, star.alpha));

        // Feather-light GPU vector glow without expensive CPU shadowBlur rasterization
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 181, 40, ${currentAlpha * 0.22})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 181, 40, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [particleCount]);

  // 2. Micro-Parallax Mouse Movement for Ambient Halos (Direct CSS Variables, 0 React Re-renders)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mx = Math.max(-1, Math.min(1, (e.clientX - centerX) / centerX));
        const my = Math.max(-1, Math.min(1, (e.clientY - centerY) / centerY));
        containerRef.current.style.setProperty("--atmos-x", `${-mx * 12}px`);
        containerRef.current.style.setProperty("--atmos-y", `${-my * 8}px`);
        containerRef.current.style.setProperty("--atmos-x-sm", `${-mx * 8}px`);
        containerRef.current.style.setProperty("--atmos-y-sm", `${-my * 6}px`);
        containerRef.current.style.setProperty("--atmos-x-lg", `${-mx * 14}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* ================= UNIVERSAL TOP AMBIENT GOLDEN GRADIENT (SUBTLE HORIZON GLOW) ================= */}
      {/* 1. Direct Horizon Edge Radial Ambient Gradient (smooth top beam) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 select-none transition-transform duration-700 ease-out will-change-transform"
        style={{
          background:
            "radial-gradient(ellipse 75% 100% at 50% 0%, rgba(229, 181, 40, 0.08) 0%, rgba(229, 181, 40, 0.02) 55%, transparent 85%)",
          transform: "translate3d(var(--atmos-x-sm, 0px), 0, 0)",
        }}
      />

      {/* 2. Top-Center Volumetric Golden Halo (matching WhyQDelta reference) */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[30rem] w-[52rem] rounded-full bg-radial from-[#E5B528]/[0.065] via-[#E5B528]/[0.015] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: "translate3d(calc(-50% + var(--atmos-x, 0px)), var(--atmos-y, 0px), 0)",
        }}
      />

      {/* ================= 1. AMBIENT WARM GOLDEN HALOS WITH MICRO-PARALLAX ================= */}
      {variant === "center" && (
        <div
          className="absolute top-1/2 right-[-10%] h-[26rem] w-[38rem] rounded-full bg-radial from-[#E5B528]/[0.035] via-transparent to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: "translate3d(var(--atmos-x-sm, 0px), var(--atmos-y-sm, 0px), 0)",
          }}
        />
      )}

      {variant === "left" && (
        <>
          <div
            className="absolute top-1/4 left-[-15%] h-[34rem] w-[48rem] rounded-full bg-radial from-[#E5B528]/[0.06] via-[#E5B528]/[0.012] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x, 0px), var(--atmos-y, 0px), 0)",
            }}
          />
          <div
            className="absolute bottom-10 right-[-10%] h-[28rem] w-[38rem] rounded-full bg-radial from-[#E5B528]/[0.035] via-transparent to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x-sm, 0px), var(--atmos-y-sm, 0px), 0)",
            }}
          />
        </>
      )}

      {variant === "right" && (
        <>
          <div
            className="absolute top-1/3 right-[-15%] h-[34rem] w-[50rem] rounded-full bg-radial from-[#E5B528]/[0.06] via-[#E5B528]/[0.012] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x, 0px), var(--atmos-y, 0px), 0)",
            }}
          />
          <div
            className="absolute -top-24 left-[-10%] h-[28rem] w-[38rem] rounded-full bg-radial from-[#E5B528]/[0.035] via-transparent to-transparent blur-[120px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x-sm, 0px), var(--atmos-y-sm, 0px), 0)",
            }}
          />
        </>
      )}

      {variant === "dual" && (
        <>
          <div
            className="absolute -top-24 left-1/4 h-[30rem] w-[46rem] rounded-full bg-radial from-[#E5B528]/[0.055] via-[#E5B528]/[0.012] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x, 0px), var(--atmos-y-sm, 0px), 0)",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-1/4 h-[30rem] w-[46rem] rounded-full bg-radial from-[#E5B528]/[0.045] via-[#E5B528]/[0.01] to-transparent blur-[130px] transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: "translate3d(var(--atmos-x, 0px), var(--atmos-y-sm, 0px), 0)",
            }}
          />
        </>
      )}

      {variant === "top" && (
        <div
          className="absolute -top-28 left-1/2 h-[34rem] w-[60rem] rounded-full bg-radial from-[#E5B528]/[0.065] via-[#E5B528]/[0.015] to-transparent blur-[140px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: "translate3d(calc(-50% + var(--atmos-x-lg, 0px)), var(--atmos-y, 0px), 0)",
          }}
        />
      )}

      {/* ================= 2. SUBTLE YELLOW ARCHITECTURAL LINEAR GRID ================= */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(to right, rgba(229, 181, 40, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 181, 40, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      />

      {/* ================= 3. GLOWING STARFIELD / PARTICLE SIMULATION CANVAS ================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65"
      />

      {/* ================= 4. SOFT BOTTOM EDGE VIGNETTE (SEAMLESS SECTION BLEND) ================= */}
      {edgeVignette && (
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#06070A]/75 via-[#06070A]/25 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
