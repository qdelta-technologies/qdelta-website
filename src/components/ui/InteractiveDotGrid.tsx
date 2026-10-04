"use client";

import React, { useEffect, useRef } from "react";

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

    let animationFrameId: number;
    let isVisible = true;
    let gridDots: GridDot[] = [];
    let farParticles: FarParticle[] = [];
    let nearMotes: NearMote[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const mouse = { x: -9999, y: -9999, active: false };
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

    const initSystem = () => {
      updateHorizonGeo();
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const W = rect.width;
      const H = rect.height;

      // ── LAYER 2 (MID): Dense Grid — full edge-to-edge coverage down to the golden rim ──
      gridDots = [];
      const extraCols = 2;
      const colsNeeded = Math.ceil(W / SPACING) + extraCols * 2;
      const halfCols = (colsNeeded - 1) / 2;

      for (let c = 0; c < colsNeeded; c++) {
        const x = W / 2 + (c - halfCols) * SPACING;
        const rowsNeeded = Math.ceil(H / SPACING) + 2;

        for (let r = 0; r < rowsNeeded; r++) {
          const y = SPACING / 2 + r * SPACING;
          const sunLineY = getSunLineY(x, W, H);

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
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
      parallax.targetX = (mouse.x - halfW) / halfW;
      parallax.targetY = (mouse.y - halfH) / halfH;
    };

    const handleMouseLeave = () => {
      // Don't snap — let velocity spring slowly pull dots home
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;

        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        parallax.targetX = (mouse.x - halfW) / halfW;
        parallax.targetY = (mouse.y - halfH) / halfH;
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
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const W = canvas.getBoundingClientRect().width || canvas.width;
      const H = canvas.getBoundingClientRect().height || canvas.height;

      parallax.currentX += (parallax.targetX - parallax.currentX) * 0.04;
      parallax.currentY += (parallax.targetY - parallax.currentY) * 0.04;

      const isMobile = W < 640;
      const repelRadius = isMobile ? 35 : REPEL_RADIUS;
      const repelStrength = isMobile ? 6 : REPEL_STRENGTH;

      // ── LAYER 1: FAR BACKGROUND ──
      const farShiftX = parallax.currentX * 5;
      const farShiftY = parallax.currentY * 3;

      for (let i = 0; i < farParticles.length; i++) {
        const p = farParticles[i];
        p.baseX += p.vx;
        p.baseY += p.vy;

        const sunLineY = getSunLineY(p.baseX, W, H);

        if (p.baseY < 10) p.baseY = sunLineY - 14;
        if (p.baseY > sunLineY - 10) p.baseY = 12;
        if (p.baseX < 0) p.baseX = W;
        if (p.baseX > W) p.baseX = 0;

        const renderX = p.baseX + farShiftX;
        const renderY = p.baseY + farShiftY;

        const twinkle = Math.sin(time * 0.02 + p.phase) * 0.04;
        const currentOpacity = Math.max(0.04, p.opacity + twinkle);

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
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

        if (mouse.active) {
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

        // Hard boundary: never cross horizon line
        const hardLimitY = getSunLineY(dot.x, W, H) - 6;
        if (dot.y > hardLimitY) {
          dot.y = hardLimitY;
          dot.vy *= -0.25;
        }

        // Render dot — crisp, sharp, subtle and transparent at rest
        ctx.beginPath();
        const radius = dot.glow > 0.08 ? 1.5 : 1.1;
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

        if (dot.glow > 0.04) {
          ctx.fillStyle = `rgba(250, 180, 6, ${0.55 + dot.glow * 0.45})`;
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

        const sway = Math.sin(time * m.swaySpeed + m.phase) * 0.38;
        m.baseX += m.vx + sway;
        m.baseY += m.vy;

        const sunLineY = getSunLineY(m.baseX, W, H);

        if (m.baseY < 15 || m.baseY > sunLineY + 2) {
          m.baseX = Math.random() * W;
          const newSunY = getSunLineY(m.baseX, W, H);
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

        if (mouse.active) {
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
          ctx.arc(renderX, renderY, m.radius, 0, Math.PI * 2);
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
