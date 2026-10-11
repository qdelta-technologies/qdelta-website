"use client";

import React, { useEffect, useId, useRef, useState } from "react";
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
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
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
  type = "button",
  disabled = false,
}: ChamferButtonProps) {
  const containerRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const gradientId = useId().replace(/:/g, "");

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
    hover:scale-[1.02] active:scale-[0.99] active:translate-y-px focus-visible:outline-none
    ${
      isPrimary
        ? "drop-shadow-[0_2px_0_rgba(0,0,0,0.22)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.28)] group-active:drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]"
        : ""
    }
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
        {isPrimary && (
          <defs>
            <linearGradient
              id={`${gradientId}-fill`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#EEC832" />
              <stop offset="52%" stopColor="#E5B528" />
              <stop offset="100%" stopColor="#D4A322" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-fill-hover`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#F2D040" />
              <stop offset="52%" stopColor="#F0C034" />
              <stop offset="100%" stopColor="#E0B028" />
            </linearGradient>
          </defs>
        )}
        <path
          d={pathD}
          fill={
            isPrimary
              ? `url(#${gradientId}-fill)`
              : "rgba(6, 7, 10, 0.65)"
          }
          stroke={isPrimary ? "#C9981E" : "#E5B528"}
          strokeWidth={strokeWidth}
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          vectorEffect="non-scaling-stroke"
          className={`transition-all duration-300 ${
            isPrimary
              ? "group-hover:stroke-[#D4A322]"
              : "group-hover:fill-[#E5B528]/[0.08] group-hover:stroke-[#E5B528]"
          }`}
        />
        {isPrimary && (
          <path
            d={pathD}
            fill={`url(#${gradientId}-fill-hover)`}
            stroke="none"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </svg>

      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isPrimary
            ? "shadow-[0_0_20px_rgba(229, 181, 40,0.3)] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_32px_rgba(229, 181, 40,0.55)]"
            : "shadow-[0_0_18px_rgba(229, 181, 40,0.15)] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_24px_rgba(229, 181, 40,0.35)]"
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
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${disabled ? "!opacity-60 !cursor-not-allowed pointer-events-none" : ""}`}
      style={{ clipPath: clipPathStyle }}
      onClick={onClick}
    >
      {buttonInner}
    </button>
  );
}
