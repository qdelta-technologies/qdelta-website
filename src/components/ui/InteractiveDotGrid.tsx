"use client";

import React, { useEffect, useRef } from "react";
import { setupCrispCanvas, snapCanvasCoord } from "@/utils/canvasCrisp";

interface GridDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  glow: number;
}

interface FarParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number;
}

interface NearMote {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  phase: number;
  swaySpeed: number;
}

export default function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // On touch devices: draw a simple static dot grid once — no physics loop needed
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isMobile) {
      const cssW = canvas.parentElement?.clientWidth || window.innerWidth;
      const cssH = canvas.parentElement?.clientHeight || 700;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.scale(dpr, dpr);
      const SPACING = 30;
      for (let y = 0; y < cssH + SPACING; y += SPACING) {
        for (let x = 0; x < cssW + SPACING; x += SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(229,181,40,0.22)";
          ctx.fill();
        }
      }
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let isVisible = true;
    let gridDots: GridDot[] = [];
    let farParticles: FarParticle[] = [];
    let nearMotes: NearMote[] = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
          mouse.active = false;
          mouse.x = -9999;
          mouse.y = -9999;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    const parallax = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };

    // Denser 22px spacing — ~85% more dots, fully covers edges
    const SPACING = 22;
    // Tight repel radius — cursor void stays small and close
    const REPEL_RADIUS = 50;
    // Gentle push so dots barely part
    const REPEL_STRENGTH = 9;
    // Slow spring return — shape lingers ~3-4s after cursor moves away
    const SPRING_K = 0.038;
    // High damping keeps velocity oscillation smooth, not bouncy
    const DAMPING = 0.82;
    // Slow glow decay — golden linger effect
    const GLOW_DECAY = 0.972;

    // Dynamic Horizon Geometry Tracker (calculates exact pixel position of the golden globe on mobile, tablet & desktop)
    const horizonGeo = {
      left: 0,
      width: 1,
      top: 0,
      height: 1,
      canvasTop: 0,
      canvasLeft: 0,
      hasSvg: false,
    };

    const updateHorizonGeo = () => {
      const horizonSvg = (canvas.closest("#hero")?.querySelector(".hero-horizon") ||
        document.querySelector(".hero-horizon")) as SVGElement | null;
      if (horizonSvg) {
        const hRect = horizonSvg.getBoundingClientRect();
        const cRect = canvas.getBoundingClientRect();
        if (hRect.width > 0 && hRect.height > 0) {
          horizonGeo.left = hRect.left;
          horizonGeo.width = hRect.width;
          horizonGeo.top = hRect.top;
          horizonGeo.height = hRect.height;
          horizonGeo.canvasTop = cRect.top;
          horizonGeo.canvasLeft = cRect.left;
          horizonGeo.hasSvg = true;
          return;
        }
      }
      horizonGeo.hasSvg = false;
    };

    // Helper: Exact parabolic curve formula for horizon line matching the true physical globe
    const getSunLineY = (xPos: number, W: number, H: number): number => {
      if (horizonGeo.hasSvg) {
        const screenX = horizonGeo.canvasLeft + xPos;
        const svgX = ((screenX - horizonGeo.left) / horizonGeo.width) * 1000;
        const t = (svgX + 15) / 1030;
        const clampedT = Math.max(0, Math.min(1, t));
        const ySvg =
          (1 - clampedT) * (1 - clampedT) * 1000 +
          2 * (1 - clampedT) * clampedT * 520 +
          clampedT * clampedT * 1000;
        const screenY = horizonGeo.top + (ySvg / 1000) * horizonGeo.height;
        return screenY - horizonGeo.canvasTop;
      }

      // Responsive geometric fallback matching Hero.tsx CSS breakpoints
      let svgW = W;
      let svgH = H;
      if (W < 640) {
        // Mobile: w-[260vw] h-[115vw] bottom-0
        svgW = 2.6 * W;
        svgH = 1.15 * W;
      } else if (W < 768) {
        // sm: w-[200vw] h-[95vw] bottom-0
        svgW = 2.0 * W;
        svgH = 0.95 * W;
      } else if (W < 1024) {
        // md: w-[160vw] h-[65vh] bottom-0
        svgW = 1.6 * W;
        svgH = 0.65 * H;
      }

      const svgLeft = (W - svgW) / 2;
      const svgTop = H - svgH;
      const svgX = ((xPos - svgLeft) / svgW) * 1000;
      const t = (svgX + 15) / 1030;
      const clampedT = Math.max(0, Math.min(1, t));
      const ySvg =
        (1 - clampedT) * (1 - clampedT) * 1000 +
        2 * (1 - clampedT) * clampedT * 520 +
        clampedT * clampedT * 1000;

      return svgTop + (ySvg / 1000) * svgH;
    };

    // Cached canvas logical dimensions (updated on resize via initSystem)
    let cachedW = 0;
    let cachedH = 0;

    // Pre-computed sunLineY lookup: maps column index → y threshold, rebuilt on resize
    let sunLineLookup: number[] = [];
    let lookupSpacing = SPACING;
    let lookupW = 0;
    let lookupH = 0;

    const buildSunLineLookup = (W: number, H: number) => {
      lookupW = W;
      lookupH = H;
      lookupSpacing = SPACING;
      const extraCols = 2;
      const colsNeeded = Math.ceil(W / SPACING) + extraCols * 2;
      const halfCols = (colsNeeded - 1) / 2;
      sunLineLookup = [];
      for (let c = 0; c < colsNeeded; c++) {
        const x = W / 2 + (c - halfCols) * SPACING;
        sunLineLookup[c] = getSunLineY(x, W, H);
      }
    };

    // Cached rect for touch/mouse coordinate offset (updated on resize, not every event)
    let cachedRect = { left: 0, top: 0, width: 0, height: 0 };
    const updateCachedRect = () => {
      const r = canvas.getBoundingClientRect();
      cachedRect = { left: r.left, top: r.top, width: r.width, height: r.height };
    };

    const initSystem = () => {
      updateHorizonGeo();
      updateCachedRect();
      const rect = cachedRect;

      if (rect.width === 0 || rect.height === 0) return;

      setupCrispCanvas(canvas, ctx, rect.width, rect.height);

      const W = rect.width;
      const H = rect.height;

      // Update cached logical dimensions
      cachedW = W;
      cachedH = H;

      // Increase spacing on mobile to reduce dot count (~30% fewer dots)
      const isMobileInit = W < 640;
      const effectiveSpacing = isMobileInit ? 28 : SPACING;

      buildSunLineLookup(W, H);

      // ── LAYER 2 (MID): Dense Grid — full edge-to-edge coverage down to the golden rim ──
      gridDots = [];
      const extraCols = 2;
      const colsNeeded = Math.ceil(W / effectiveSpacing) + extraCols * 2;
      const halfCols = (colsNeeded - 1) / 2;

      for (let c = 0; c < colsNeeded; c++) {
        const x = W / 2 + (c - halfCols) * effectiveSpacing;
        const rowsNeeded = Math.ceil(H / effectiveSpacing) + 2;

        for (let r = 0; r < rowsNeeded; r++) {
          const y = effectiveSpacing / 2 + r * effectiveSpacing;
          const sunLineY = sunLineLookup[c] ?? getSunLineY(x, W, H);

          if (y < sunLineY - 4) {
            gridDots.push({
              baseX: x,
              baseY: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              glow: 0,
            });
          }
        }
      }

      // ── LAYER 1 (FAR): Sparse celestial dust ──
      farParticles = [];
      const farCount = Math.floor(Math.max(20, Math.min(45, (W * H) / 28000)));
      for (let i = 0; i < farCount; i++) {
        const x = Math.random() * W;
        const sunLineY = getSunLineY(x, W, H);
        const y = Math.random() * (sunLineY - 12);

        farParticles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 0.65 + Math.random() * 0.35,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -0.04 - Math.random() * 0.08,
          opacity: 0.08 + Math.random() * 0.12,
          phase: Math.random() * Math.PI * 2,
        });
      }

      // ── LAYER 3 (NEAR): Golden atmospheric motes ──
      nearMotes = [];
      const nearCount = Math.floor(Math.max(80, Math.min(150, W / 11)));
      for (let i = 0; i < nearCount; i++) {
        const x = Math.random() * W;
        const sunLineY = getSunLineY(x, W, H);
        const y = 25 + Math.random() * (sunLineY - 35);

        const tier = Math.random();
        let radius = 1.2;
        let baseOpacity = 0.35;
        let vy = -0.14;

        if (tier < 0.45) {
          radius = 0.75 + Math.random() * 0.4;
          baseOpacity = 0.22 + Math.random() * 0.25;
          vy = -0.09 - Math.random() * 0.12;
        } else if (tier < 0.82) {
          radius = 1.25 + Math.random() * 0.45;
          baseOpacity = 0.35 + Math.random() * 0.3;
          vy = -0.14 - Math.random() * 0.18;
        } else {
          radius = 1.75 + Math.random() * 0.65;
          baseOpacity = 0.5 + Math.random() * 0.35;
          vy = -0.18 - Math.random() * 0.22;
        }

        nearMotes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius,
          vx: (Math.random() - 0.5) * 0.18,
          vy,
          baseOpacity,
          phase: Math.random() * Math.PI * 2,
          swaySpeed: 0.007 + Math.random() * 0.015,
        });
      }
    };

    initSystem();
    const rafId = requestAnimationFrame(() => {
      initSystem();
    });
    const timerId = setTimeout(() => {
      initSystem();
    }, 120);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        initSystem();
      });
      resizeObserver.observe(canvas);
      const horizonSvg = (canvas.closest("#hero")?.querySelector(".hero-horizon") ||
        document.querySelector(".hero-horizon")) as SVGElement | null;
      if (horizonSvg) {
        resizeObserver.observe(horizonSvg);
      }
    }

    // ── Event listeners ──
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      // Only react when cursor is actually over this canvas
      if (
        e.clientX < cachedRect.left ||
        e.clientX > cachedRect.left + cachedRect.width ||
        e.clientY < cachedRect.top ||
        e.clientY > cachedRect.top + cachedRect.height
      ) {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
        parallax.targetX = 0;
        parallax.targetY = 0;
        return;
      }
      mouse.x = e.clientX - cachedRect.left;
      mouse.y = e.clientY - cachedRect.top;
      mouse.active = true;

      const halfW = cachedRect.width / 2;
      const halfH = cachedRect.height / 2;
      parallax.targetX = (mouse.x - halfW) / halfW;
      parallax.targetY = (mouse.y - halfH) / halfH;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Disable dot-repel on touch — it fights native scroll momentum
      // Only update parallax offset, not the repel cursor
      if (e.touches && e.touches.length > 0) {
        const halfW = cachedRect.width / 2;
        const halfH = cachedRect.height / 2;
        const tx = e.touches[0].clientX - cachedRect.left;
        const ty = e.touches[0].clientY - cachedRect.top;
        parallax.targetX = (tx - halfW) / halfW;
        parallax.targetY = (ty - halfH) / halfH;
        // Don't set mouse.active — keeps repel disabled on touch
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const handleResize = () => {
      initSystem();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);
    // Keep cachedRect accurate on scroll so bounds check stays correct
    window.addEventListener("scroll", updateCachedRect, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!prefersReducedMotion) {
        time += 1;
      }

      // Use cached values — avoid getBoundingClientRect() inside rAF loop
      const W = cachedW || canvas.width;
      const H = cachedH || canvas.height;

      if (!prefersReducedMotion) {
        parallax.currentX += (parallax.targetX - parallax.currentX) * 0.04;
        parallax.currentY += (parallax.targetY - parallax.currentY) * 0.04;
      }

      const isMobile = W < 640;
      const repelRadius = isMobile ? 35 : REPEL_RADIUS;
      const repelStrength = isMobile ? 6 : REPEL_STRENGTH;

      // ── LAYER 1: FAR BACKGROUND ──
      const farShiftX = parallax.currentX * 5;
      const farShiftY = parallax.currentY * 3;

      const getSunLineYFast = (x: number): number => {
        if (sunLineLookup.length === 0) return getSunLineY(x, W, H);
        const colIdx = Math.round((x - W / 2) / lookupSpacing + (sunLineLookup.length - 1) / 2);
        return sunLineLookup[Math.max(0, Math.min(sunLineLookup.length - 1, colIdx))] ?? getSunLineY(x, W, H);
      };

      for (let i = 0; i < farParticles.length; i++) {
        const p = farParticles[i];
        if (!prefersReducedMotion) {
          p.baseX += p.vx;
          p.baseY += p.vy;
        }

        const sunLineY = getSunLineYFast(p.baseX);

        if (p.baseY < 10) p.baseY = sunLineY - 14;
        if (p.baseY > sunLineY - 10) p.baseY = 12;
        if (p.baseX < 0) p.baseX = W;
        if (p.baseX > W) p.baseX = 0;

        const renderX = p.baseX + farShiftX;
        const renderY = p.baseY + farShiftY;

        const twinkle = Math.sin(time * 0.02 + p.phase) * 0.04;
        const currentOpacity = Math.max(0.04, p.opacity + twinkle);

        ctx.beginPath();
        ctx.arc(
          snapCanvasCoord(renderX),
          snapCanvasCoord(renderY),
          p.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      }

      // ── LAYER 2: MID GRID — velocity spring physics for slow return ──
      // Drastically reduced parallax multipliers so the grid feels stable
      const midShiftX = parallax.currentX * 6;
      const midShiftY = parallax.currentY * 3;

      for (let i = 0; i < gridDots.length; i++) {
        const dot = gridDots[i];

        const baseTargetX = dot.baseX + midShiftX;
        const baseTargetY = dot.baseY + midShiftY;

        if (mouse.active && !prefersReducedMotion) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0) {
            // Power curve: sharper void center, softer edges
            const factor = 1 - dist / repelRadius;
            const strength = Math.pow(factor, 1.5) * repelStrength;
            const angle = Math.atan2(dy, dx);

            // Apply velocity impulse outward
            dot.vx += Math.cos(angle) * strength * 0.55;
            dot.vy += Math.sin(angle) * strength * 0.55;

            dot.glow = Math.max(dot.glow, factor);
          }
        }

        // Slow spring — pull toward base with low coefficient
        dot.vx += (baseTargetX - dot.x) * SPRING_K;
        dot.vy += (baseTargetY - dot.y) * SPRING_K;

        // Dampen velocity each frame
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Slow glow decay — golden shape stays visible for seconds
        dot.glow *= GLOW_DECAY;

        // Hard boundary: never cross horizon line (use cached lookup, not live calc)
        const colIdx = Math.round((dot.x - W / 2) / lookupSpacing + (sunLineLookup.length - 1) / 2);
        const hardLimitY = (sunLineLookup[Math.max(0, Math.min(sunLineLookup.length - 1, colIdx))] ?? getSunLineY(dot.x, W, H)) - 6;
        if (dot.y > hardLimitY) {
          dot.y = hardLimitY;
          dot.vy *= -0.25;
        }

        // Render dot — crisp, sharp, subtle and transparent at rest
        ctx.beginPath();
        const radius = dot.glow > 0.08 ? 1.5 : 1.1;
        ctx.arc(
          snapCanvasCoord(dot.x),
          snapCanvasCoord(dot.y),
          radius,
          0,
          Math.PI * 2
        );

        if (dot.glow > 0.04) {
          ctx.fillStyle = `rgba(229, 181, 40, ${0.55 + dot.glow * 0.45})`;
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        }
        ctx.fill();
      }

      // ── LAYER 3: NEAR FOREGROUND MOTES ──
      const nearShiftX = parallax.currentX * 24;
      const nearShiftY = parallax.currentY * 14;

      for (let i = 0; i < nearMotes.length; i++) {
        const m = nearMotes[i];

        if (!prefersReducedMotion) {
          const sway = Math.sin(time * m.swaySpeed + m.phase) * 0.38;
          m.baseX += m.vx + sway;
          m.baseY += m.vy;
        }

        const sunLineY = getSunLineYFast(m.baseX);

        if (m.baseY < 15 || m.baseY > sunLineY + 2) {
          m.baseX = Math.random() * W;
          const newSunY = getSunLineYFast(m.baseX);
          m.baseY = newSunY - (1 + Math.random() * 5);
          m.vx = (Math.random() - 0.5) * 0.18;

          const tier = Math.random();
          if (tier < 0.45) {
            m.radius = 0.75 + Math.random() * 0.4;
            m.baseOpacity = 0.22 + Math.random() * 0.25;
            m.vy = -0.09 - Math.random() * 0.12;
          } else if (tier < 0.82) {
            m.radius = 1.25 + Math.random() * 0.45;
            m.baseOpacity = 0.35 + Math.random() * 0.3;
            m.vy = -0.14 - Math.random() * 0.18;
          } else {
            m.radius = 1.75 + Math.random() * 0.65;
            m.baseOpacity = 0.5 + Math.random() * 0.35;
            m.vy = -0.18 - Math.random() * 0.22;
          }
        }

        if (m.baseX < 0) m.baseX = W;
        if (m.baseX > W) m.baseX = 0;

        let renderX = m.baseX + nearShiftX;
        let renderY = m.baseY + nearShiftY;

        const distFromHorizon = Math.max(0, sunLineY - m.baseY);
        const fadeIn = Math.min(1, distFromHorizon / 45);
        const fadeOut = Math.max(0, Math.min(1, (m.baseY - 15) / 55));
        const lifeFade = fadeIn * fadeOut;

        if (mouse.active && !prefersReducedMotion) {
          const dx = renderX - mouse.x;
          const dy = renderY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 0) {
            const push = (1 - dist / 90) * 16;
            const angle = Math.atan2(dy, dx);
            renderX += Math.cos(angle) * push;
            renderY += Math.sin(angle) * push;
          }
        }

        const pulse = Math.sin(time * 0.025 + m.phase) * 0.08;
        const moteOpacity = Math.max(0, (m.baseOpacity + pulse) * lifeFade);

        if (moteOpacity > 0.01) {
          // Sharp crisp core — no blurry halo ring
          ctx.beginPath();
          ctx.arc(
            snapCanvasCoord(renderX),
            snapCanvasCoord(renderY),
            m.radius,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 210, 80, ${moteOpacity})`;
          ctx.fill();
        }
      }

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateCachedRect);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
