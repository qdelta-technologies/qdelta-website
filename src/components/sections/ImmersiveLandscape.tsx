"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function ImmersiveLandscape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardBorderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef<number>(0);

  const [dimensions, setDimensions] = useState({
    width: 940,
    height: 529,
    targetScale: 2.05,
    isMobile: false,
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Prevent mobile address-bar resize churn: only recalculate if width changes or first run
      if (lastWidthRef.current === vw) return;
      lastWidthRef.current = vw;

      const isMobile = vw < 768;

      let w: number;
      let h: number;
      let scale: number;

      if (isMobile) {
        // Mobile: 9:16 Portrait Aspect Ratio (exact match for section-img-mobile.png)
        const maxW = Math.min(vw * 0.78, 310);
        const maxH = Math.min(vh * 0.58, 510);

        w = maxW;
        h = w * (16 / 9);
        if (h > maxH) {
          h = maxH;
          w = h * (9 / 16);
        }

        w = Math.round(w);
        h = Math.round(h);

        const scaleX = vw / w;
        const scaleY = vh / h;
        // 2% safety bleed ensures zero subpixel hairline edge leaks on high-DPI screens
        scale = Math.max(scaleX, scaleY) * 1.02;
      } else {
        // Desktop: 16:9 Widescreen Aspect Ratio (exact match for section-image2.png)
        const maxW = Math.min(vw * 0.86, 940);
        const maxH = Math.min(vh * 0.58, 530);

        let tempW = maxW;
        let tempH = tempW * (9 / 16);
        if (tempH > maxH) {
          tempH = maxH;
          tempW = tempH * (16 / 9);
        }

        w = Math.round(tempW);
        h = Math.round(tempH);

        const scaleX = vw / w;
        const scaleY = vh / h;
        // 2% safety bleed ensures zero subpixel hairline edge leaks on high-DPI screens
        scale = Math.max(scaleX, scaleY) * 1.02;
      }

      setDimensions({
        width: w,
        height: h,
        targetScale: parseFloat(scale.toFixed(3)),
        isMobile,
      });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinnedRef.current || !cardRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const cardBorder = cardBorderRef.current;
      const header = headerRef.current;
      const footer = footerRef.current;
      const glow = glowRef.current;

      if (!card) return;

      const { width: w, height: h, targetScale } = dimensions;

      if (prefersReducedMotion) {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          borderRadius: "0px",
        });
        if (cardBorder) gsap.set(cardBorder, { opacity: 0 });
        if (header) gsap.set(header, { opacity: 0 });
        if (footer) gsap.set(footer, { opacity: 0 });
        return;
      }

      // Initial state: centered showcase card with unified GSAP transform matrix
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        width: `${w}px`,
        height: `${h}px`,
        scale: 1,
        borderRadius: "20px",
        transformOrigin: "center center",
        force3D: true,
      });

      if (cardBorder) gsap.set(cardBorder, { opacity: 1 });
      if (header) gsap.set(header, { opacity: 1, y: 0 });
      if (footer) gsap.set(footer, { opacity: 1, y: 0 });
      if (glow) gsap.set(glow, { opacity: 1 });

      // Highly responsive, 1:1 scrub timeline optimized for fast scrolling without jarring jumps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinnedRef.current,
          scrub: 0.2, // Snappy 1:1 response without rubberband lag
          anticipatePin: 0, // Eliminates pre-pin jitter
          invalidateOnRefresh: true,
        },
      });

      // 1. Context labels disperse smoothly at the start
      if (header) {
        tl.to(header, { y: -20, opacity: 0, duration: 0.2, ease: "none" }, 0);
      }
      if (footer) {
        tl.to(footer, { y: 20, opacity: 0, duration: 0.2, ease: "none" }, 0);
      }
      if (glow) {
        tl.to(glow, { opacity: 0, duration: 0.25, ease: "none" }, 0);
      }

      // 2. Fade border & shadow on GPU opacity in the first 25% of scroll (ZERO repaint during full zoom)
      if (cardBorder) {
        tl.to(cardBorder, { opacity: 0, duration: 0.25, ease: "none" }, 0);
      }

      // 3. Border radius transitions to 0 in early scroll so no clip repainting happens at high scale
      tl.to(card, { borderRadius: "0px", duration: 0.3, ease: "none" }, 0);

      // 4. Hardware-accelerated GPU zoom across the entire scroll with 1:1 linear mapping
      tl.to(
        card,
        {
          scale: targetScale,
          duration: 1.0,
          ease: "none", // Eliminates non-linear acceleration during fast scrolling
          force3D: true,
        },
        0
      );

      // Sort and refresh triggers to maintain clean hierarchy with WebsiteAssembly
      ScrollTrigger.sort();
    }, containerRef);

    return () => ctx.revert();
  }, [dimensions]);

  return (
    <section
      ref={containerRef}
      aria-label="Commercial Transformation Showcase"
      className="relative w-full bg-[#040406] text-white"
      style={{ height: dimensions.isMobile ? "1800px" : "2200px" }}
    >
      {/* Pinned Viewport Container using 100dvh for mobile stability */}
      <div
        ref={pinnedRef}
        className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#040406] select-none"
      >
        {/* Deep Obsidian Canvas Background */}
        <div className="absolute inset-0 bg-[#040406] z-0 pointer-events-none" />

        {/* Ambient Warm Golden Aura behind the card (lightweight GPU blur) */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center will-change-transform"
        >
          <div className="w-[680px] h-[420px] rounded-full bg-[#E7B72A]/10 blur-3xl pointer-events-none" />
        </div>

        {/* ================= TOP HEADER ================= */}
        <div
          ref={headerRef}
          className="absolute top-5 sm:top-10 md:top-12 inset-x-0 z-30 flex flex-col items-center text-center px-4 will-change-transform pointer-events-none"
        >
          <h2 className="font-sans text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-snug sm:leading-tight">
            The Same Business.{" "}
            <span className="text-[#E7B72A] font-normal italic">A Flagship Result.</span>
          </h2>
        </div>

        {/* ================= CENTER: RESPONSIVE SHOWCASE FRAME ================= */}
        {/* Note: centering transform handled natively by GSAP (xPercent: -50, yPercent: -50) to prevent class conflicts */}
        <div
          ref={cardRef}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            borderRadius: "20px",
          }}
          className="absolute top-1/2 left-1/2 z-20 overflow-hidden flex items-center justify-center [backface-visibility:hidden] [transform:translateZ(0)]"
        >
          {/* Desktop 16:9 Widescreen Image */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src="/images/section-image2.png"
              alt="The Same Business. A Better Website Brings More Customers."
              fill
              sizes="100vw"
              priority
              unoptimized={true}
              className="object-cover object-center [backface-visibility:hidden] [transform:translateZ(0)]"
            />
          </div>

          {/* Mobile 9:16 Portrait Image */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src="/images/section-img-mobile.png"
              alt="The Same Business. A Better Website Brings More Customers."
              fill
              sizes="100vw"
              priority
              unoptimized={true}
              className="object-cover object-center [backface-visibility:hidden] [transform:translateZ(0)]"
            />
          </div>

          {/* Subtle cinematic edge & corner dark gradient (luxury vignette framing) */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 62%, rgba(4, 4, 6, 0.46) 100%), linear-gradient(to right, rgba(4, 4, 6, 0.42) 0%, transparent 12%, transparent 88%, rgba(4, 4, 6, 0.42) 100%), linear-gradient(to bottom, rgba(4, 4, 6, 0.25) 0%, transparent 10%, transparent 90%, rgba(4, 4, 6, 0.3) 100%)",
            }}
          />

          {/* Ultra-subtle glass reflection highlight */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-white/[0.08] via-transparent to-transparent" />

          {/* Golden Frame Border & Ambient Halo — Fades on GPU opacity during scroll (ZERO blur repaint) */}
          <div
            ref={cardBorderRef}
            className="pointer-events-none absolute inset-0 z-20 rounded-[20px] border border-[#E7B72A]/45 shadow-[0_0_60px_rgba(231,183,42,0.22),0_25px_80px_rgba(0,0,0,0.95)] will-change-[opacity]"
          />
        </div>

        {/* ================= BOTTOM FOOTER: MINIMAL SCROLL HINT ================= */}
        <div
          ref={footerRef}
          className="absolute bottom-5 sm:bottom-8 inset-x-0 z-30 flex items-center justify-center px-4 will-change-transform pointer-events-none"
        >
          <p className="text-[11px] sm:text-[13px] font-sans text-zinc-400 tracking-wide">
            Scroll to expand visual comparison
          </p>
        </div>

        {/* ================= REFINED GOLDEN HORIZON DIVIDER AT BOTTOM ================= */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-40">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#E7B72A]/50 to-transparent shadow-[0_0_15px_rgba(231,183,42,0.3)]" />
        </div>
      </div>
    </section>
  );
}
