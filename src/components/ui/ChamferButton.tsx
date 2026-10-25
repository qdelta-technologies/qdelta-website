"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

export interface ChamferButtonProps {
  href?: string;
  target?: string;
  rel?: string;
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
  target,
  rel,
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
        ? "drop-shadow-[0_3px_0_#B87700] drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] active:translate-y-[2px] active:drop-shadow-[0_1px_0_#B87700] active:drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] font-bold"
        : "drop-shadow-[0_2px_0_rgba(255,255,255,0.12)] active:translate-y-[1px]"
    }
    ${isPrimary ? "text-[#050608]" : "text-[#F5F5F7] hover:text-white"}
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
              <stop offset="0%" stopColor="#FFC220" />
              <stop offset="48%" stopColor="#FAB406" />
              <stop offset="100%" stopColor="#EAA400" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-fill-hover`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FFCD38" />
              <stop offset="48%" stopColor="#FFBA14" />
              <stop offset="100%" stopColor="#EEA900" />
            </linearGradient>
          </defs>
        )}
        <path
          d={pathD}
          fill={
            isPrimary
              ? `url(#${gradientId}-fill)`
              : "rgba(6, 7, 10, 0.75)"
          }
          stroke={isPrimary ? "#EAA808" : "#FAB406"}
          strokeWidth={strokeWidth}
          strokeLinejoin="miter"
          strokeMiterlimit={4}
          vectorEffect="non-scaling-stroke"
          className={`transition-all duration-300 ${
            isPrimary
              ? "group-hover:stroke-[#B87700]"
              : "group-hover:fill-[#FAB406]/[0.08] group-hover:stroke-[#FAB406]"
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

      {/* Crisp Top Specular 3D Reflection Hairline */}
      {isPrimary && (
        <div
          className="pointer-events-none absolute inset-x-3.5 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20"
          aria-hidden="true"
        />
      )}

      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isPrimary
            ? "shadow-[0_0_20px_rgba(250,180,6,0.35)] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_32px_rgba(250,180,6,0.6)]"
            : "shadow-[0_0_18px_rgba(250,180,6,0.18)] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_24px_rgba(250,180,6,0.4)]"
        }`}
      />

      {/* Button Content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 ${isPrimary ? "drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]" : ""}`}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        ref={containerRef}
        href={href}
        target={target}
        rel={rel}
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
