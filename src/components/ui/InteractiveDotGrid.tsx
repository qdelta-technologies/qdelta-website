"use client";

import React, { useEffect, useRef } from "react";

interface GridDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
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
    let gridDots: GridDot[] = [];
    let farParticles: FarParticle[] = [];
    let nearMotes: NearMote[] = [];

    const mouse = { x: -9999, y: -9999, active: false };
    const parallax = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };

    const SPACING = 30; // Clean even grid spacing
    const REPEL_RADIUS = 130; // Radius of mouse interaction for grid
    const REPEL_STRENGTH = 32; // Distance dots spread outward

    // Helper: Exact parabolic curve formula for horizon line
    const getSunLineY = (xPos: number, W: number, H: number): number => {
      const normX = Math.max(0, Math.min(1, xPos / W));
      const xSvg = normX * 1000;
      const t = (xSvg + 15) / 1030;
      const ySvg = 1000 - 960 * t * (1 - t);
      return (ySvg / 1000) * H;
    };

    const initSystem = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const W = rect.width;
      const H = rect.height;

      // 1. LAYER 2 (MID): Structured Grid Matrix
      gridDots = [];
      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);
      const startX = (W - cols * SPACING) / 2 + SPACING / 2;
      const startY = SPACING / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * SPACING;
          const y = startY + r * SPACING;
          const sunLineY = getSunLineY(x, W, H);

          if (y < sunLineY - 7) {
            gridDots.push({
              baseX: x,
              baseY: y,
              x: x,
              y: y,
              glow: 0,
            });
          }
        }
      }

      // 2. LAYER 1 (FAR): Sparse, tiny celestial background dust (subtle, slow drift)
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
          radius: 0.65 + Math.random() * 0.35, // 0.65 - 1.0px
          vx: (Math.random() - 0.5) * 0.08,
          vy: -0.04 - Math.random() * 0.08, // Slow upward drift
          opacity: 0.08 + Math.random() * 0.12, // Very low noise
          phase: Math.random() * Math.PI * 2,
        });
      }

      // 3. LAYER 3 (NEAR): Atmospheric floating golden motes emerging from the horizon line
      nearMotes = [];
      // Substantially increased count: 80 to 150 motes for a rich, celestial field
      const nearCount = Math.floor(Math.max(80, Math.min(150, W / 11)));
      for (let i = 0; i < nearCount; i++) {
        const x = Math.random() * W;
        const sunLineY = getSunLineY(x, W, H);
        // Distribute initial positions smoothly across the height on load,
        // with ongoing particles continuously emerging from the horizon line
        const y = 25 + Math.random() * (sunLineY - 35);

        // Multi-depth tiers: small background sparks, medium motes, prominent foreground embers
        const tier = Math.random();
        let radius = 1.2;
        let baseOpacity = 0.35;
        let vy = -0.14;

        if (tier < 0.45) {
          // Delicate ambient embers (far layer)
          radius = 0.75 + Math.random() * 0.4;
          baseOpacity = 0.22 + Math.random() * 0.25;
          vy = -0.09 - Math.random() * 0.12;
        } else if (tier < 0.82) {
          // Mid-ground warm golden motes
          radius = 1.25 + Math.random() * 0.45;
          baseOpacity = 0.35 + Math.random() * 0.3;
          vy = -0.14 - Math.random() * 0.18;
        } else {
          // Prominent luminous foreground embers
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

    // Mouse & Touch listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Parallax target (-1 to 1)
      const halfW = rect.width / 2;
      const halfH = rect.height / 2;
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

    // Animation Loop (60fps Spring Physics & Multi-layer Parallax)
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      const W = canvas.getBoundingClientRect().width || canvas.width;
      const H = canvas.getBoundingClientRect().height || canvas.height;

      // Smooth parallax damping
      parallax.currentX += (parallax.targetX - parallax.currentX) * 0.04;
      parallax.currentY += (parallax.targetY - parallax.currentY) * 0.04;

      const isMobile = W < 640;
      const repelRadius = isMobile ? 85 : REPEL_RADIUS;
      const repelStrength = isMobile ? 20 : REPEL_STRENGTH;

      // ==========================================
      // LAYER 1: FAR BACKGROUND (Lowest parallax, very subtle drift)
      // ==========================================
      const farShiftX = parallax.currentX * 5;
      const farShiftY = parallax.currentY * 3;

      for (let i = 0; i < farParticles.length; i++) {
        const p = farParticles[i];
        p.baseX += p.vx;
        p.baseY += p.vy;

        const sunLineY = getSunLineY(p.baseX, W, H);

        // Gentle wrap within boundaries
        if (p.baseY < 10) p.baseY = sunLineY - 14;
        if (p.baseY > sunLineY - 10) p.baseY = 12;
        if (p.baseX < 0) p.baseX = W;
        if (p.baseX > W) p.baseX = 0;

        const renderX = p.baseX + farShiftX;
        const renderY = p.baseY + farShiftY;

        // Subtle twinkling breathing
        const twinkle = Math.sin(time * 0.02 + p.phase) * 0.04;
        const currentOpacity = Math.max(0.04, p.opacity + twinkle);

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      }

      // ==========================================
      // LAYER 2: MID GRID (Geometric matrix with spring repel & medium parallax)
      // ==========================================
      const midShiftX = parallax.currentX * 12;
      const midShiftY = parallax.currentY * 7;

      for (let i = 0; i < gridDots.length; i++) {
        const dot = gridDots[i];

        let targetX = dot.baseX + midShiftX;
        let targetY = dot.baseY + midShiftY;

        if (mouse.active) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If within hover/touch radius, spread out radially
          if (dist < repelRadius && dist > 0) {
            const factor = 1 - dist / repelRadius;
            const push = factor * repelStrength;
            const angle = Math.atan2(dy, dx);

            targetX = dot.baseX + midShiftX + Math.cos(angle) * push;
            targetY = dot.baseY + midShiftY + Math.sin(angle) * push;

            // Keep repelled dots from crossing into or below the sun line outline
            const limitY = getSunLineY(targetX, W, H) - 7;
            if (targetY > limitY) {
              targetY = limitY;
            }

            dot.glow = Math.max(dot.glow, factor);
          } else {
            dot.glow *= 0.94;
          }
        } else {
          dot.glow *= 0.94;
        }

        // Smooth spring physics return to base position
        dot.x += (targetX - dot.x) * 0.16;
        dot.y += (targetY - dot.y) * 0.16;

        // Hard boundary protection against sun line
        const hardLimitY = getSunLineY(dot.x, W, H) - 6;
        if (dot.y > hardLimitY) {
          dot.y = hardLimitY;
        }

        // Render grid dot
        ctx.beginPath();
        const radius = dot.glow > 0.1 ? 1.35 : 1.05;
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

        if (dot.glow > 0.05) {
          // Subtle golden warmth when spreading out under mouse
          ctx.fillStyle = `rgba(245, 184, 0, ${0.16 + dot.glow * 0.45})`;
        } else {
          // Clean subtle white/silver dot at rest
          ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
        }
        ctx.fill();
      }

      // ==========================================
      // LAYER 3: NEAR FOREGROUND MOTES (Emerging from horizon line with organic drift)
      // ==========================================
      const nearShiftX = parallax.currentX * 24;
      const nearShiftY = parallax.currentY * 14;

      for (let i = 0; i < nearMotes.length; i++) {
        const m = nearMotes[i];

        // Horizontal sinusoidal sway
        const sway = Math.sin(time * m.swaySpeed + m.phase) * 0.38;
        m.baseX += m.vx + sway;
        m.baseY += m.vy; // Constant gentle upward float

        const sunLineY = getSunLineY(m.baseX, W, H);

        // Respawn logic: When particle floats off top or drifts below horizon
        if (m.baseY < 15 || m.baseY > sunLineY + 2) {
          // Emerge directly from the golden horizon arc!
          m.baseX = Math.random() * W;
          const newSunY = getSunLineY(m.baseX, W, H);
          m.baseY = newSunY - (1 + Math.random() * 5); // Right at the glowing horizon edge
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

        // Horizontal canvas wrapping
        if (m.baseX < 0) m.baseX = W;
        if (m.baseX > W) m.baseX = 0;

        let renderX = m.baseX + nearShiftX;
        let renderY = m.baseY + nearShiftY;

        // Emerge & Dissolve Opacity Fade:
        // 1. Fade in smoothly as particle emerges from the horizon curve (over 45px of upward travel)
        const distFromHorizon = Math.max(0, sunLineY - m.baseY);
        const fadeIn = Math.min(1, distFromHorizon / 45);

        // 2. Fade out gently as it reaches the top of the hero
        const fadeOut = Math.max(0, Math.min(1, (m.baseY - 15) / 55));

        const lifeFade = fadeIn * fadeOut;

        // Subtle soft repulsion if cursor passes near floating motes
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

        // Breathing golden pulse
        const pulse = Math.sin(time * 0.025 + m.phase) * 0.08;
        const moteOpacity = Math.max(0, (m.baseOpacity + pulse) * lifeFade);

        if (moteOpacity > 0.01) {
          // Soft golden halo glow around foreground mote
          ctx.beginPath();
          ctx.arc(renderX, renderY, m.radius + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 184, 0, ${moteOpacity * 0.32})`;
          ctx.fill();

          // Core radiant warm mote
          ctx.beginPath();
          ctx.arc(renderX, renderY, m.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 225, 130, ${moteOpacity * 0.95})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
