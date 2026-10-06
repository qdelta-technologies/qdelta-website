"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function QDeltaSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation target refs
  const beamCoreRef = useRef<HTMLDivElement>(null);
  const beamGlowRef = useRef<HTMLDivElement>(null);
  const beamHaloRef = useRef<HTMLDivElement>(null);
  const topOrbRef = useRef<HTMLDivElement>(null);
  const bottomFlareRef = useRef<HTMLDivElement>(null);

  const introHeaderRef = useRef<HTMLDivElement>(null);
  const block01Ref = useRef<HTMLDivElement>(null);
  const block02Ref = useRef<HTMLDivElement>(null);
  const block03Ref = useRef<HTMLDivElement>(null);
  const block04Ref = useRef<HTMLDivElement>(null);

  const line01Ref = useRef<HTMLDivElement>(null);
  const line02Ref = useRef<HTMLDivElement>(null);
  const line03Ref = useRef<HTMLDivElement>(null);
  const line04Ref = useRef<HTMLDivElement>(null);

  const node01Ref = useRef<HTMLDivElement>(null);
  const node02Ref = useRef<HTMLDivElement>(null);
  const node03Ref = useRef<HTMLDivElement>(null);
  const node04Ref = useRef<HTMLDivElement>(null);

  const orbitUpperRef = useRef<HTMLDivElement>(null);
  const orbitLowerRef = useRef<HTMLDivElement>(null);

  const climaxRef = useRef<HTMLDivElement>(null);
  const cosmosBgRef = useRef<HTMLDivElement>(null);

  // 1. Subtle Golden Stardust Canvas (Lightweight, 60fps, ambient floating particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.15,
      alphaSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.75) {
          p.alphaSpeed *= -1;
        }

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 181, 40, ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#E5B528";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Main Master Timeline pinned across 240vh
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub physics
          anticipatePin: 1,
        },
      });

      // Initial States setup
      gsap.set(
        [
          block01Ref.current,
          block02Ref.current,
          block03Ref.current,
          block04Ref.current,
        ],
        { opacity: 0, y: 18 }
      );
      gsap.set([line01Ref.current, line03Ref.current], {
        scaleX: 0,
        transformOrigin: "right center",
      });
      gsap.set([line02Ref.current, line04Ref.current], {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(
        [
          node01Ref.current,
          node02Ref.current,
          node03Ref.current,
          node04Ref.current,
        ],
        { scale: 0, opacity: 0 }
      );
      gsap.set([orbitUpperRef.current, orbitLowerRef.current], {
        opacity: 0.15,
        scale: 0.85,
      });
      gsap.set(climaxRef.current, { opacity: 0, y: 24, scale: 0.96 });

      // -------------------------------------------------------------
      // SEQUENCE TIMING (0.00 -> 1.00 scroll progress)
      // -------------------------------------------------------------

      // 1. BEAM STRENGTHENS & HEADER RECEDES (0.00 -> 0.20)
      tl.to(
        [beamCoreRef.current, beamGlowRef.current],
        {
          opacity: 1,
          scaleY: 1.05,
          duration: 0.25,
          ease: "none",
        },
        0
      )
        .to(
          beamHaloRef.current,
          {
            opacity: 0.9,
            scaleX: 1.3,
            duration: 0.25,
            ease: "none",
          },
          0
        )
        .to(
          cosmosBgRef.current,
          {
            y: -30,
            opacity: 0.9,
            duration: 0.5,
            ease: "none",
          },
          0
        )
        .to(
          introHeaderRef.current,
          {
            y: -24,
            opacity: 0.35,
            scale: 0.94,
            duration: 0.25,
            ease: "power2.out",
          },
          0.1
        );

      // 2. REVEAL UPPER LEVEL: 01 STRATEGY & 02 DEVELOPMENT (0.20 -> 0.45)
      tl.to(
        orbitUpperRef.current,
        {
          opacity: 0.8,
          scale: 1,
          duration: 0.2,
          ease: "power1.out",
        },
        0.18
      )
        .to(
          [node01Ref.current, node02Ref.current],
          {
            scale: 1,
            opacity: 1,
            duration: 0.15,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          0.22
        )
        .to(
          [line01Ref.current, line02Ref.current],
          {
            scaleX: 1,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
          },
          0.25
        )
        .to(
          [block01Ref.current, block02Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.28
        );

      // 3. REVEAL LOWER LEVEL: 03 DESIGN & 04 CONVERSION (0.45 -> 0.70)
      tl.to(
        orbitLowerRef.current,
        {
          opacity: 0.8,
          scale: 1,
          duration: 0.2,
          ease: "power1.out",
        },
        0.42
      )
        .to(
          [node03Ref.current, node04Ref.current],
          {
            scale: 1,
            opacity: 1,
            duration: 0.15,
            stagger: 0.05,
            ease: "back.out(2)",
          },
          0.46
        )
        .to(
          [line03Ref.current, line04Ref.current],
          {
            scaleX: 1,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
          },
          0.49
        )
        .to(
          [block03Ref.current, block04Ref.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.52
        );

      // 4. HOLD STATE & ENERGY SURGE (0.65 -> 0.76)
      tl.to(
        [topOrbRef.current, bottomFlareRef.current],
        {
          opacity: 1,
          scale: 1.25,
          duration: 0.15,
          ease: "power1.inOut",
        },
        0.65
      );

      // 5. ANNOTATION BLOCKS FADE OUT & CLIMAX ENTERS (0.76 -> 0.94)
      tl.to(
        [
          block01Ref.current,
          block02Ref.current,
          block03Ref.current,
          block04Ref.current,
          line01Ref.current,
          line02Ref.current,
          line03Ref.current,
          line04Ref.current,
          orbitUpperRef.current,
          orbitLowerRef.current,
          introHeaderRef.current,
        ],
        {
          opacity: 0,
          y: -10,
          filter: "blur(4px)",
          duration: 0.15,
          stagger: 0.02,
          ease: "power2.in",
        },
        0.75
      )
        .to(
          beamHaloRef.current,
          {
            opacity: 1,
            scaleX: 1.8,
            duration: 0.18,
            ease: "power1.out",
          },
          0.78
        )
        .to(
          climaxRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.18,
            ease: "power3.out",
          },
          0.8
        );

      // 6. GENTLE EXIT BEFORE NEXT SECTION (0.94 -> 1.00)
      tl.to(
        [climaxRef.current, stickyRef.current],
        {
          opacity: 0.85,
          duration: 0.06,
          ease: "none",
        },
        0.94
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="system"
      aria-label="The QDelta System"
      className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#E5B528] selection:text-black"
      style={{ height: "240vh" }}
    >
      {/* ================= STICKY 100VH VIEWPORT ================= */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center pointer-events-auto"
      >
        {/* ================= 1. COSMIC BACKGROUND VOID (ZERO GLOBE) ================= */}
        <div
          ref={cosmosBgRef}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Ambient Deep Golden Radial Glow along the central vertical axis */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[55rem] rounded-full bg-radial from-[#E5B528]/[0.08] via-[#E5B528]/[0.02] to-transparent blur-[120px]" />

          {/* Bottom Ground Plane Floor Horizon Glow & Reflective Field */}
          <div className="absolute -bottom-10 inset-x-0 h-72 bg-gradient-to-t from-[#E5B528]/[0.15] via-[#E5B528]/[0.04] to-transparent blur-2xl" />

          {/* Subtle Concentric Ground Horizon Rings at the floor */}
          <div
            className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-32 rounded-[100%] border border-[#E5B528]/20 opacity-40 pointer-events-none"
            style={{ transform: "translate(-50%, 0) rotateX(78deg)" }}
          />
          <div
            className="absolute bottom-[-2%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-20 rounded-[100%] border border-[#E5B528]/25 opacity-50 pointer-events-none"
            style={{ transform: "translate(-50%, 0) rotateX(78deg)" }}
          />

          {/* Deep Void Edge Vignettes for Seamless Top & Bottom Blending */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#040406] via-[#040406]/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#040406] via-[#040406]/90 to-transparent" />
        </div>

        {/* Dynamic Canvas Particles */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-75"
        />

        {/* ================= 2. THE CENTRAL GLOWING GOLDEN BEAM ================= */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 w-44 flex items-center justify-center">
          {/* Ambient Diffuse Halo */}
          <div
            ref={beamHaloRef}
            className="absolute inset-y-0 w-36 bg-gradient-to-b from-[#E5B528]/[0.15] via-[#E5B528]/[0.08] to-[#E5B528]/[0.18] blur-[42px] opacity-40 transition-opacity"
          />

          {/* Golden Corona Glow */}
          <div
            ref={beamGlowRef}
            className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#E5B528]/90 via-[#E5B528]/65 to-[#E5B528]/90 blur-[10px] opacity-60"
          />

          {/* Razor-Sharp Photon Core Filament */}
          <div
            ref={beamCoreRef}
            className="absolute inset-y-0 w-[1.5px] bg-[#FFFBEA] shadow-[0_0_12px_#E5B528,0_0_24px_rgba(229, 181, 40,0.8)] opacity-70"
          />

          {/* Top Beam Clean Origin Flare at Viewport Top Edge */}
          <div
            ref={topOrbRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-10 bg-gradient-to-b from-[#E5B528]/40 to-transparent blur-lg opacity-70 pointer-events-none"
          />

          {/* Bottom Horizon Impact Flare & Floor Pool */}
          <div
            ref={bottomFlareRef}
            className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFFBEA] shadow-[0_0_35px_12px_#E5B528,0_0_70px_24px_rgba(229, 181, 40,0.5)] opacity-85"
          />

          {/* Upper Orbital Ring Intersect (Strategy / Development height) */}
          <div
            ref={orbitUpperRef}
            className="absolute top-[37%] left-1/2 -translate-x-1/2 w-56 sm:w-72 h-8 rounded-[100%] border border-[#E5B528]/40 shadow-[0_0_15px_rgba(229, 181, 40,0.35)] pointer-events-none"
            style={{ transform: "translate(-50%, -50%) rotateX(72deg)" }}
          />

          {/* Lower Orbital Ring Intersect (Design / Conversion height) */}
          <div
            ref={orbitLowerRef}
            className="absolute top-[61%] left-1/2 -translate-x-1/2 w-64 sm:w-80 h-9 rounded-[100%] border border-[#E5B528]/40 shadow-[0_0_15px_rgba(229, 181, 40,0.35)] pointer-events-none"
            style={{ transform: "translate(-50%, -50%) rotateX(72deg)" }}
          />

          {/* Center Beam Nodes where connectors anchor */}
          <div
            ref={node01Ref}
            className="absolute top-[37%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_3px_#E5B528] z-30"
          />
          <div
            ref={node03Ref}
            className="absolute top-[61%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_3px_#E5B528] z-30"
          />
        </div>

        {/* ================= 3. TOP CENTER HEADLINE ================= */}
        <div
          ref={introHeaderRef}
          className="relative z-30 w-full max-w-4xl mx-auto pt-20 sm:pt-24 md:pt-28 px-4 text-center select-none"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5B528]/30 bg-[#E5B528]/[0.08] backdrop-blur-md mb-3.5 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528] animate-pulse" />
            <span className="font-epilogue text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#E5B528]">
              THE QDELTA SYSTEM
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-excon font-bold text-2xl sm:text-3xl md:text-5xl lg:text-[56px] text-white tracking-tight leading-[1.08]">
            Built to speak.{" "}
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5B528] to-[#E5B528]">
              Designed to work.
            </span>
          </h2>

          {/* Supporting line */}
          <p className="mt-3 sm:mt-4 font-epilogue text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal">
            We combine strategy, design, development and conversion into one
            clear digital experience.
          </p>
        </div>

        {/* ================= 4. FOUR EDITORIAL ANNOTATION BLOCKS (SURROUNDING AXIS) ================= */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-center">
          {/* SYMMETRICAL EDITORIAL CANVAS WITH CONNECTOR LINES */}
          <div className="relative w-full h-[360px] sm:h-[400px] md:h-[420px]">
            {/* ---------------- UPPER TIER: 01 STRATEGY (LEFT) & 02 DEVELOPMENT (RIGHT) ---------------- */}
            {/* 01 — Strategy (Upper Left) */}
            <div className="absolute top-[8%] sm:top-[12%] left-0 w-[44%] md:w-[40%] lg:w-[36%] flex items-center justify-end">
              <div
                ref={block01Ref}
                className="text-right pr-3 sm:pr-6 md:pr-8"
              >
                <div className="font-excon font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight flex items-center justify-end gap-1.5 sm:gap-2">
                  <span className="text-[#E5B528] font-mono text-[11px] sm:text-xs md:text-sm font-semibold">
                    01 —
                  </span>
                  <span>Strategy</span>
                </div>
                <p className="mt-1 font-epilogue text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed font-normal max-w-xs ml-auto">
                  Understand the business, audience and goal.
                </p>
              </div>

              {/* Connector line extending toward central beam */}
              <div
                ref={line01Ref}
                className="h-[1px] flex-1 max-w-[60px] sm:max-w-[120px] lg:max-w-[180px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-[#E5B528]"
              />
            </div>

            {/* 02 — Development (Upper Right) */}
            <div className="absolute top-[8%] sm:top-[12%] right-0 w-[44%] md:w-[40%] lg:w-[36%] flex items-center justify-start">
              {/* Connector line extending from central beam */}
              <div
                ref={line02Ref}
                className="h-[1px] flex-1 max-w-[60px] sm:max-w-[120px] lg:max-w-[180px] bg-gradient-to-l from-transparent via-[#E5B528]/50 to-[#E5B528]"
              />

              <div
                ref={block02Ref}
                className="text-left pl-3 sm:pl-6 md:pl-8"
              >
                <div className="font-excon font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[#E5B528] font-mono text-[11px] sm:text-xs md:text-sm font-semibold">
                    02 —
                  </span>
                  <span>Development</span>
                </div>
                <p className="mt-1 font-epilogue text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed font-normal max-w-xs">
                  Fast, responsive and purposefully built.
                </p>
              </div>
            </div>

            {/* ---------------- LOWER TIER: 03 DESIGN (LEFT) & 04 CONVERSION (RIGHT) ---------------- */}
            {/* 03 — Design (Lower Left) */}
            <div className="absolute top-[68%] sm:top-[68%] left-0 w-[44%] md:w-[40%] lg:w-[36%] flex items-center justify-end">
              <div
                ref={block03Ref}
                className="text-right pr-3 sm:pr-6 md:pr-8"
              >
                <div className="font-excon font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight flex items-center justify-end gap-1.5 sm:gap-2">
                  <span className="text-[#E5B528] font-mono text-[11px] sm:text-xs md:text-sm font-semibold">
                    03 —
                  </span>
                  <span>Design</span>
                </div>
                <p className="mt-1 font-epilogue text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed font-normal max-w-xs ml-auto">
                  Premium interfaces that communicate trust and value.
                </p>
              </div>

              {/* Connector line extending toward central beam */}
              <div
                ref={line03Ref}
                className="h-[1px] flex-1 max-w-[60px] sm:max-w-[120px] lg:max-w-[180px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-[#E5B528]"
              />
            </div>

            {/* 04 — Conversion (Lower Right) */}
            <div className="absolute top-[68%] sm:top-[68%] right-0 w-[44%] md:w-[40%] lg:w-[36%] flex items-center justify-start">
              {/* Connector line extending from central beam */}
              <div
                ref={line04Ref}
                className="h-[1px] flex-1 max-w-[60px] sm:max-w-[120px] lg:max-w-[180px] bg-gradient-to-l from-transparent via-[#E5B528]/50 to-[#E5B528]"
              />

              <div
                ref={block04Ref}
                className="text-left pl-3 sm:pl-6 md:pl-8"
              >
                <div className="font-excon font-bold text-sm sm:text-lg md:text-xl lg:text-2xl text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[#E5B528] font-mono text-[11px] sm:text-xs md:text-sm font-semibold">
                    04 —
                  </span>
                  <span>Conversion</span>
                </div>
                <p className="mt-1 font-epilogue text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed font-normal max-w-xs">
                  Guiding attention, building belief and supporting action.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5. CLIMAX STATEMENT (CULMINATION — PURE EDITORIAL, NO CARDS) ================= */}
        <div
          ref={climaxRef}
          className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-4 text-center select-none"
        >
          <div className="max-w-4xl mx-auto">
            <p className="font-epilogue text-[11px] sm:text-xs uppercase tracking-[0.32em] text-[#E5B528] mb-3 sm:mb-4">
              THE INTEGRATED ADVANTAGE
            </p>
            <h3 className="font-excon font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-white tracking-tight leading-[1.12]">
              “One clear system.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5B528] to-[#E5B528]">
                One stronger presence.”
              </span>
            </h3>
            <div className="mt-6 mx-auto w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5B528] to-transparent shadow-[0_0_12px_#E5B528]" />
          </div>
        </div>

        {/* ================= 6. BOTTOM SUBTLE STATUS BAR / SCROLL CUE ================= */}
        <div className="relative z-30 w-full pb-6 sm:pb-8 flex justify-center items-center select-none pointer-events-none">
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528]/70 shadow-[0_0_6px_#E5B528]" />
            <span className="uppercase text-zinc-400">Scroll to explore the architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528]/70 shadow-[0_0_6px_#E5B528]" />
          </div>
        </div>
      </div>
    </section>
  );
}
