"use client";

import React, { useEffect, useRef } from "react";

// 72 longitudinal meridians around the 360° globe (spaced every 5°)
// Combined with ~40px latitude spacing, this creates balanced, square-like grid quads
const MERIDIAN_COUNT = 72;
const MERIDIAN_STEP = 360 / MERIDIAN_COUNT; // 5 degrees per meridian

export default function PlanetSurfaceRevolution() {
  const rotationAngleRef = useRef<number>(0);
  const meridiansGroupRef = useRef<SVGGElement>(null);
  const shimmerRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;
    // Slow, meditative planetary rotation: ~90 seconds per full 360° revolution
    const ROTATION_SPEED = 0.05; // degrees per frame at 60fps

    const animate = () => {
      if (!prefersReducedMotion) {
        rotationAngleRef.current = (rotationAngleRef.current + ROTATION_SPEED) % 360;
      }

      const rot = rotationAngleRef.current;
      const rotRad = (rot * Math.PI) / 180;

      // Update 3D Longitudinal Globe Meridians
      if (meridiansGroupRef.current) {
        const paths = meridiansGroupRef.current.children;
        for (let i = 0; i < MERIDIAN_COUNT; i++) {
          const pathEl = paths[i] as SVGPathElement | undefined;
          if (!pathEl) continue;

          // Meridian planetary longitude (-180° to 180°)
          let lon = (i * MERIDIAN_STEP + rot) % 360;
          if (lon > 180) lon -= 360;

          // Visible front hemisphere check (-87° to +87°)
          if (lon > -87 && lon < 87) {
            const lonRad = (lon * Math.PI) / 180;
            const sinLon = Math.sin(lonRad);
            const cosLon = Math.cos(lonRad);

            // Exact 3D spherical orthographic projection coordinates:
            // Top point (near the polar crest):
            const x0 = 500 + sinLon * 365;
            const y0 = 760 + (1 - cosLon) * 18;

            // Control point 1 (upper-mid latitude):
            const x1 = 500 + sinLon * 440;
            const y1 = 840;

            // Control point 2 (lower-mid latitude):
            const x2 = 500 + sinLon * 510;
            const y2 = 920;

            // Bottom point (equatorial expansion):
            const x3 = 500 + sinLon * 565;
            const y3 = 1005;

            // Smooth cubic bezier forming accurate 3D spherical globe meridians
            const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`;
            pathEl.setAttribute("d", d);

            // Natural limb foreshortening fade:
            // Every 6th line is a major meridian (every 30°), others are fine subdivision lines
            const isMajor = i % 6 === 0;
            const baseFactor = isMajor ? 0.17 : 0.12;
            const op = Math.max(0, cosLon) * baseFactor;

            pathEl.setAttribute(
              "stroke",
              isMajor
                ? `rgba(255, 238, 170, ${op.toFixed(3)})`
                : `rgba(250, 180, 6, ${op.toFixed(3)})`
            );
            pathEl.setAttribute("stroke-width", isMajor ? "0.95" : "0.7");
            pathEl.style.display = "block";
          } else {
            pathEl.style.display = "none";
          }
        }
      }

      // Subtle atmospheric highlight / light reflection drift
      if (shimmerRef.current) {
        const shimmerX = 500 + Math.sin(rotRad * 0.6) * 75;
        shimmerRef.current.setAttribute("cx", shimmerX.toFixed(1));
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <g
      id="planet-surface-revolution-group"
      clipPath="url(#horizon-surface-clip)"
      className="pointer-events-none select-none"
    >
      <defs>
        {/* Soft atmospheric shimmer wash across rotating surface */}
        <radialGradient
          id="planet-shimmer-glow"
          cx="50%"
          cy="30%"
          r="65%"
          fx="50%"
          fy="25%"
        >
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.08" />
          <stop offset="45%" stopColor="#FAB406" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FAB406" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ================= 1. FIXED SPHERICAL LATITUDE PARALLELS ================= */}
      {/*
        Concentric spherical latitude rings spaced ~40px apart to form square grid quads
      */}
      <g opacity="0.9">
        {/* Latitude 1: Close to Crest */}
        <path
          d="M -50 821 Q 500 795 1050 821"
          stroke="rgba(255, 235, 160, 0.12)"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude 2: Sub-polar */}
        <path
          d="M -50 867 Q 500 835 1050 867"
          stroke="rgba(255, 230, 140, 0.13)"
          strokeWidth="0.85"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude 3: Upper-Mid */}
        <path
          d="M -50 913 Q 500 875 1050 913"
          stroke="rgba(250, 180, 6, 0.13)"
          strokeWidth="0.85"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude 4: Mid-Lower */}
        <path
          d="M -50 959 Q 500 915 1050 959"
          stroke="rgba(255, 220, 120, 0.12)"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude 5: Sub-equatorial */}
        <path
          d="M -50 1005 Q 500 955 1050 1005"
          stroke="rgba(250, 180, 6, 0.11)"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Latitude 6: Base Baseline */}
        <path
          d="M -50 1051 Q 500 995 1050 1051"
          stroke="rgba(250, 180, 6, 0.09)"
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* ================= 2. ROTATING 3D LONGITUDINAL MERIDIANS ================= */}
      {/*
        72 meridians orbiting continuously across the spherical surface from west to east,
        creating authentic square globe cells
      */}
      <g ref={meridiansGroupRef}>
        {Array.from({ length: MERIDIAN_COUNT }).map((_, idx) => (
          <path
            key={`meridian-${idx}`}
            d=""
            strokeWidth="0.75"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* ================= 3. ROTATING SURFACE SHIMMER / LIGHT SWEEP ================= */}
      <ellipse
        ref={shimmerRef}
        cx="500"
        cy="845"
        rx="340"
        ry="110"
        fill="url(#planet-shimmer-glow)"
      />
    </g>
  );
}
