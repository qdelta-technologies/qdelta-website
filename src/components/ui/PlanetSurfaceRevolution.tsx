"use client";

import React, { useEffect, useRef } from "react";

// 72 meridians (5° step) — matches horizontal latitude spacing for square grid cells
const MERIDIAN_COUNT = 72;
const MERIDIAN_STEP = 360 / MERIDIAN_COUNT;

export default function PlanetSurfaceRevolution() {
  const containerRef = useRef<SVGGElement>(null);
  const rotationAngleRef = useRef<number>(0);
  const shadowGroupRef = useRef<SVGGElement>(null);
  const highlightGroupRef = useRef<SVGGElement>(null);
  const coreGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animId: number;
    let isVisible = true;
    const isPhone = window.innerWidth < 768;
    const FRAME_MS = isPhone ? 1000 / 24 : 0; // phones: ~24fps is plenty for a 90-second slow rotation
    let lastFrame = 0;
    // Fluid, majestic planetary rotation: ~54 seconds per full 360° revolution
    const ROTATION_SPEED = 0.07; // degrees per frame at 60fps (~86s per revolution)

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastFrame = 0;
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0 }
    );

    // A plain <g> has no box of its own, so browsers do not report its visibility reliably, and the planet kept animating
    // (about 200 SVG paths rewritten per frame) while the visitor was far down the page. Watch the <svg> that holds it.
    if (containerRef.current) {
      observer.observe(containerRef.current.ownerSVGElement ?? containerRef.current);
    }

    const animate = (now?: number) => {
      const t = now ?? performance.now();
      if (FRAME_MS && t - lastFrame < FRAME_MS - 1) {
        if (isVisible) animId = requestAnimationFrame(animate);
        return;
      }
      const dt = lastFrame ? Math.min(100, t - lastFrame) : 16.67;
      lastFrame = t;
      if (!prefersReducedMotion) {
        rotationAngleRef.current = (rotationAngleRef.current + ROTATION_SPEED * (dt / 16.67)) % 360;
      }

      const rot = rotationAngleRef.current;

      // Update Longitudinal Globe Meridians with 3D engraved seam effect matching horizontal lines
      if (coreGroupRef.current && shadowGroupRef.current && highlightGroupRef.current) {
        const corePaths = coreGroupRef.current.children;
        const shadowPaths = shadowGroupRef.current.children;
        const highlightPaths = highlightGroupRef.current.children;

        for (let i = 0; i < MERIDIAN_COUNT; i++) {
          const coreEl = corePaths[i] as SVGPathElement | undefined;
          const shadowEl = shadowPaths[i] as SVGPathElement | undefined;
          const highlightEl = highlightPaths[i] as SVGPathElement | undefined;
          if (!coreEl || !shadowEl || !highlightEl) continue;

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

            // Round to 1 decimal using integer math — avoids .toFixed() string allocations
            const r1 = (v: number) => Math.round(v * 10) / 10;

            const d = `M ${r1(x0)} ${r1(y0)} C ${r1(x1)} ${r1(y1)}, ${r1(x2)} ${r1(y2)}, ${r1(x3)} ${r1(y3)}`;
            const dShadow = `M ${r1(x0 + 0.28)} ${r1(y0)} C ${r1(x1 + 0.28)} ${r1(y1)}, ${r1(x2 + 0.28)} ${r1(y2)}, ${r1(x3 + 0.28)} ${r1(y3)}`;
            const dHighlight = `M ${r1(x0 - 0.25)} ${r1(y0)} C ${r1(x1 - 0.25)} ${r1(y1)}, ${r1(x2 - 0.25)} ${r1(y2)}, ${r1(x3 - 0.25)} ${r1(y3)}`;

            const specular = Math.pow(Math.max(0, cosLon), 1.3);
            const opCore = Math.max(0.16, specular * 0.48);
            const opShadow = opCore * 0.58;
            const opHighlight = opCore * 0.52;

            // Use Math.round for opacity strings — avoids .toFixed() allocations
            const opCoreS = Math.round(opCore * 1000) / 1000;
            const opShadowS = Math.round(opShadow * 1000) / 1000;
            const opHighlightS = Math.round(opHighlight * 1000) / 1000;

            shadowEl.setAttribute("d", dShadow);
            shadowEl.setAttribute("stroke", `rgba(110, 65, 0, ${opShadowS})`);
            shadowEl.style.display = "block";

            highlightEl.setAttribute("d", dHighlight);
            highlightEl.setAttribute("stroke", `rgba(255, 250, 230, ${opHighlightS})`);
            highlightEl.style.display = "block";

            coreEl.setAttribute("d", d);
            coreEl.setAttribute("stroke", `rgba(250, 180, 6, ${opCoreS})`);
            coreEl.style.display = "block";
          } else {
            coreEl.style.display = "none";
            shadowEl.style.display = "none";
            highlightEl.style.display = "none";
          }
        }
      }

      if (isVisible) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const LATITUDES = [
    { y: 821, crestY: 795, op: 0.52 },
    { y: 867, crestY: 835, op: 0.46 },
    { y: 913, crestY: 875, op: 0.42 },
    { y: 959, crestY: 915, op: 0.38 },
    { y: 1005, crestY: 955, op: 0.34 },
    { y: 1051, crestY: 995, op: 0.30 },
  ];

  return (
    <g
      ref={containerRef}
      id="planet-surface-revolution-group"
      clipPath="url(#horizon-surface-clip)"
      className="pointer-events-none select-none"
    >
      {/* ================= 1. FIXED SPHERICAL LATITUDE PARALLELS ================= */}
      <g opacity="1">
        {LATITUDES.map((lat, idx) => (
          <g key={`lat-${idx}`}>
            {/* Subtle micro depth shadow */}
            <path
              d={`M -50 ${lat.y + 0.45} Q 500 ${lat.crestY + 0.45} 1050 ${lat.y + 0.45}`}
              stroke="rgba(110, 65, 0, 0.28)"
              strokeWidth="0.9"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Subtle micro top highlight */}
            <path
              d={`M -50 ${lat.y - 0.38} Q 500 ${lat.crestY - 0.38} 1050 ${lat.y - 0.38}`}
              stroke="rgba(255, 250, 230, 0.26)"
              strokeWidth="0.72"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Core golden line */}
            <path
              d={`M -50 ${lat.y} Q 500 ${lat.crestY} 1050 ${lat.y}`}
              stroke="#FAB406"
              strokeOpacity={lat.op}
              strokeWidth="1.2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </g>

      {/* ================= 2. ROTATING 3D LONGITUDINAL MERIDIANS ================= */}
      {/* Layer 1: Subtle micro depth shadow (underneath) */}
      <g ref={shadowGroupRef}>
        {Array.from({ length: MERIDIAN_COUNT }).map((_, idx) => (
          <path
            key={`m-s-${idx}`}
            d=""
            strokeWidth="0.9"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Layer 2: Subtle micro highlight (underneath) */}
      <g ref={highlightGroupRef}>
        {Array.from({ length: MERIDIAN_COUNT }).map((_, idx) => (
          <path
            key={`m-h-${idx}`}
            d=""
            strokeWidth="0.72"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Layer 3: Core golden line (on top) */}
      <g ref={coreGroupRef}>
        {Array.from({ length: MERIDIAN_COUNT }).map((_, idx) => (
          <path
            key={`m-c-${idx}`}
            d=""
            strokeWidth="1.2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </g>
  );
}
