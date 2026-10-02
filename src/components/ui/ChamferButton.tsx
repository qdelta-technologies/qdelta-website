"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface ChamferButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  cutLarge?: number;
  cutSmall?: number;
  strokeWidth?: number;
  ariaLabel?: string;
}

/**
 * ChamferButton
 * Architectural / Cyber chamfered button matching QDelta's high-tech aesthetic:
 * - Top-left: Large 45° chamfer cut
 * - Bottom-right: Large 45° chamfer cut
 * - Top-right: Small 45° chamfer cut
 * - Bottom-left: Small 45° chamfer cut
 *
 * Uses precision vector SVG with stroke insetting for 100% razor-sharp,
 * unclipped borders on all 8 sides, backed by CSS clip-path for pixel-accurate hit testing.
 */
export default function ChamferButton({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  cutLarge = 14,
  cutSmall = 6,
  strokeWidth = 1.6,
  ariaLabel,
}: ChamferButtonProps) {
  const containerRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        if (w > 0 && h > 0) {
          setSize({ w, h });
        }
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const w = size.w || 180;
  const h = size.h || 48;
  const inset = strokeWidth / 2;

  // Exact 8-point chamfered path with stroke-insetting
  const pathD = `
    M ${cutLarge} ${inset}
    L ${w - cutSmall} ${inset}
    L ${w - inset} ${cutSmall}
    L ${w - inset} ${h - cutLarge}
    L ${w - cutLarge} ${h - inset}
    L ${cutSmall} ${h - inset}
    L ${inset} ${h - cutSmall}
    L ${inset} ${cutLarge}
    Z
  `;

  // Hardware-accelerated CSS clip-path for exact click hit testing
  const clipPathStyle = `polygon(
    ${cutLarge}px 0px,
    calc(100% - ${cutSmall}px) 0px,
    100% ${cutSmall}px,
    100% calc(100% - ${cutLarge}px),
    calc(100% - ${cutLarge}px) 100%,
    ${cutSmall}px 100%,
    0px calc(100% - ${cutSmall}px),
    0px ${cutLarge}px
  )`;

  const isPrimary = variant === "primary";

  const baseClasses = `
    group relative inline-flex items-center justify-center select-none cursor-pointer
    font-epilogue text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap
    px-6 py-2.5 sm:px-7 sm:py-3 transition-all duration-300 ease-out
    hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none
    ${isPrimary ? "text-[#06070A]" : "text-[#F5F5F7] hover:text-white"}
    ${className}
  `.trim();

  const buttonInner = (
    <>
      {/* Background & Crisp Outline Vector SVG */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
      >
        <path
          d={pathD}
          fill={isPrimary ? "#FAB406" : "rgba(6, 7, 10, 0.65)"}
          stroke="#FAB406"
          strokeWidth={strokeWidth}
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          vectorEffect="non-scaling-stroke"
          className={`transition-all duration-300 ${
            isPrimary
              ? "group-hover:fill-[#ffbe1a] group-hover:stroke-[#ffd043]"
              : "group-hover:fill-[#FAB406]/[0.08] group-hover:stroke-[#FAB406]"
          }`}
        />
      </svg>

      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isPrimary
            ? "shadow-[0_0_20px_rgba(250,180,6,0.3)] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_32px_rgba(250,180,6,0.55)]"
            : "shadow-[0_0_18px_rgba(250,180,6,0.15)] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_24px_rgba(250,180,6,0.35)]"
        }`}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        ref={containerRef}
        href={href}
        aria-label={ariaLabel}
        className={baseClasses}
        style={{ clipPath: clipPathStyle }}
        onClick={onClick}
      >
        {buttonInner}
      </Link>
    );
  }

  return (
    <button
      ref={containerRef}
      type="button"
      aria-label={ariaLabel}
      className={baseClasses}
      style={{ clipPath: clipPathStyle }}
      onClick={onClick}
    >
      {buttonInner}
    </button>
  );
}
