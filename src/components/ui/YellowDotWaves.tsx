"use client";

import React, { useEffect, useRef } from "react";

interface YellowDotWavesProps {
  className?: string;
}

export default function YellowDotWaves({ className = "" }: YellowDotWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    // Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    let startTime = performance.now();

    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.0018;

      ctx.clearRect(0, 0, width, height);

      // Follow the exact rounded corner radius of the footer container
      // Card has rounded-[32px] sm:rounded-[44px] md:rounded-[48px]
      const radius = width < 640 ? 32 : width < 1024 ? 44 : 48;

      const getBorderY = (x: number): number => {
        const bottomLine = height - 2.5;
        if (x < radius) {
          const dx = radius - x;
          const dy = radius - Math.sqrt(Math.max(0, radius * radius - dx * dx));
          return bottomLine - dy;
        } else if (x > width - radius) {
          const dx = x - (width - radius);
          const dy = radius - Math.sqrt(Math.max(0, radius * radius - dx * dx));
          return bottomLine - dy;
        }
        return bottomLine;
      };

      // Spacing between dot stalks along the bottom border
      const dotSpacing = 7;
      const numStalks = Math.floor(width / dotSpacing);

      // Subtle bioluminescent golden glow
      ctx.shadowColor = "rgba(229, 181, 40, 0.55)";
      ctx.shadowBlur = 4;

      for (let i = 0; i <= numStalks; i++) {
        const x = i * dotSpacing;
        const baseY = getBorderY(x);

        // Organic wave amplitude modulating the height of the stalks
        const wave1 = Math.sin(x * 0.022 + elapsed * 2.2) * 7;
        const wave2 = Math.cos(x * 0.045 - elapsed * 1.7) * 4;
        const wave3 = Math.sin(x * 0.01 + elapsed * 0.9) * 3;
        const stalkHeight = Math.max(6, 13 + wave1 + wave2 + wave3); // 6px to 24px high

        // Number of dots in this stalk
        const numDots = Math.max(2, Math.min(5, Math.floor(stalkHeight / 4.2)));

        // Sway angle for the stalk (like grass in the breeze)
        const swayPhase = elapsed * 2.6 + x * 0.035;

        for (let k = 0; k <= numDots; k++) {
          const progress = k / numDots; // 0 = at border, 1 = tip of stalk

          // Quadratic sway: tip sways more than root
          const sway = Math.sin(swayPhase) * (progress * progress * 3.5);

          const dotX = x + sway;
          const dotY = baseY - progress * stalkHeight;

          // Don't draw outside top of canvas
          if (dotY < 1) continue;

          // Dots right on the border are slightly larger and full opacity
          const dotRadius = k === 0 ? 1.75 : Math.max(1.0, 1.75 - progress * 0.45);
          const dotAlpha = k === 0 ? 0.95 : Math.max(0.65, 0.95 - progress * 0.25);

          ctx.beginPath();
          ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229, 181, 40, ${dotAlpha.toFixed(2)})`;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
