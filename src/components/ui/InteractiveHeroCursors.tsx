"use client";

import React, { useEffect, useState } from "react";

// Lightweight shared hook for smooth mouse parallax
function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setOffset({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return offset;
}

interface CursorProps {
  name: string;
  role: string;
  arrowRotation: number;
  isRightSide?: boolean;
  className?: string;
  parallax: { x: number; y: number };
  floatDelay?: string;
}

function CursorItem({
  name,
  role,
  arrowRotation,
  isRightSide = false,
  className = "",
  parallax,
  floatDelay = "0s",
}: CursorProps) {
  const mouseOffset = useMouseParallax();
  const [isHovered, setIsHovered] = useState(false);

  const translateX = mouseOffset.x * parallax.x;
  const translateY = mouseOffset.y * parallax.y;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("qdelta-cursor-hover", { detail: { active: true, name } })
      );
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("qdelta-cursor-hover", { detail: { active: false, name } })
      );
    }
  };

  return (
    <div
      className={`pointer-events-auto absolute flex items-center transition-transform duration-300 ease-out group cursor-pointer z-30 ${
        isRightSide ? "origin-left" : "origin-right"
      } scale-[0.62] sm:scale-[0.8] md:scale-100 ${className}`}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div
        className={`relative flex items-center gap-2 animate-float-gentle transition-transform duration-200 group-hover:scale-105 select-none ${
          isRightSide ? "flex-row-reverse" : "flex-row"
        }`}
        style={{ animationDelay: floatDelay }}
      >
        {/* Subtle Ethereal Signal Line connecting to the Horizon */}
        <div
          className={`pointer-events-none absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-32 sm:h-52 md:h-64 transition-all duration-500 ease-out overflow-hidden ${
            isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 origin-top"
          }`}
          aria-hidden="true"
        >
          {/* Ambient soft glow halo around the filament */}
          <div className="absolute inset-y-0 -left-1.5 w-4 bg-gradient-to-b from-[#433bff]/25 via-[#2f27ce]/10 to-transparent blur-[2px]" />
          {/* Subtle gradient filament */}
          <div className="w-full h-full bg-gradient-to-b from-[#dedcff]/90 via-[#433bff]/40 to-transparent blur-[0.4px]" />
          {/* Animated pulse traveling downward toward the horizon */}
          <div className="absolute inset-x-0 h-12 w-full bg-gradient-to-b from-transparent via-[#fbfbfe] to-transparent animate-signal-down" />
        </div>

        {/* Refined Name Tag with Electric Glow on Hover */}
        <div
          className={`relative flex items-center gap-2 rounded-[6px] border px-3 py-1 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 ${
            isHovered
              ? "border-[#433bff]/80 bg-[#0e0c24]/95 text-[#dedcff] shadow-[0_0_24px_rgba(67,59,255,0.45),inset_0_0_12px_rgba(67,59,255,0.2)] scale-[1.03]"
              : "border-white/15 bg-[#0a081a]/85 text-white group-hover:border-white/30"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              isHovered
                ? "bg-[#433bff] shadow-[0_0_12px_rgba(67,59,255,1)] scale-125"
                : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] animate-pulse"
            }`}
          />
          <span className="whitespace-nowrap font-medium">{name}</span>
          {isHovered && (
            <span className="whitespace-nowrap text-[11px] font-normal text-zinc-300 border-l border-[#433bff]/40 pl-2 animate-in fade-in duration-200">
              {role}
            </span>
          )}
        </div>

        {/* Crisp Cursor Arrow with Electric Glint on Hover */}
        <svg
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 transition-all duration-300 ${
            isHovered
              ? "text-[#dedcff] drop-shadow-[0_0_12px_rgba(67,59,255,0.9)] scale-105"
              : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          }`}
          style={{
            transform: `rotate(${arrowRotation}deg)`,
          }}
        >
          <path
            d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
            fill="currentColor"
            stroke="#050315"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// 1. Strategy Cursor — Anchored on Left of Line 1 ("Built")
export function StrategyCursor() {
  return (
    <CursorItem
      name="Strategy"
      role="Brand Positioning"
      arrowRotation={170} // Points down-right (↘) directly into 'Built'
      isRightSide={false}
      className="right-full mr-1 sm:mr-2 lg:mr-3.5 top-0 sm:top-1"
      parallax={{ x: 14, y: 12 }}
      floatDelay="0s"
    />
  );
}

// 2. Development Cursor — Anchored directly next to the letter 'k' in "speak."
export function DevelopmentCursor() {
  return (
    <CursorItem
      name="Development"
      role="Next.js & Turbopack"
      arrowRotation={-95} // Points down-left (↙) directly into 'k.' in 'speak.'
      isRightSide={true}
      className="left-full ml-1 sm:ml-2 lg:ml-2.5 top-0 sm:top-1"
      parallax={{ x: -14, y: 12 }}
      floatDelay="1.2s"
    />
  );
}

// 3. Design Cursor — Anchored on Left of Line 2 ("Designed")
export function DesignCursor() {
  return (
    <CursorItem
      name="Design"
      role="UI/UX & Systems"
      arrowRotation={80} // Points up-right (↗) directly into 'Designed'
      isRightSide={false}
      className="right-full mr-1 sm:mr-2 lg:mr-3.5 bottom-0 sm:bottom-1"
      parallax={{ x: 12, y: -12 }}
      floatDelay="0.7s"
    />
  );
}

// 4. Conversion Cursor — Anchored directly next to "work."
export function ConversionCursor() {
  return (
    <CursorItem
      name="Conversion"
      role="CRO & High Impact"
      arrowRotation={-10} // Points up-left (↖) directly into 'work.'
      isRightSide={true}
      className="left-full ml-1 sm:ml-2 lg:ml-2.5 bottom-0 sm:bottom-1"
      parallax={{ x: -12, y: -12 }}
      floatDelay="1.9s"
    />
  );
}
