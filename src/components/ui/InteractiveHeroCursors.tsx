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
  role?: string;
  arrowRotation: number;
  isRightSide?: boolean;
  className?: string;
  parallax: { x: number; y: number };
  floatDelay?: string;
}

function CursorItem({
  name,
  arrowRotation,
  isRightSide = false,
  className = "",
  parallax,
  floatDelay = "0s",
}: CursorProps) {
  const mouseOffset = useMouseParallax();

  const translateX = mouseOffset.x * parallax.x;
  const translateY = mouseOffset.y * parallax.y;

  return (
    <div
      className={`pointer-events-none select-none absolute flex items-center transition-transform duration-300 ease-out z-30 ${
        isRightSide ? "origin-left" : "origin-right"
      } scale-[0.62] sm:scale-[0.8] md:scale-100 ${className}`}
      style={{
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`relative flex items-center gap-2 animate-float-gentle select-none ${
          isRightSide ? "flex-row-reverse" : "flex-row"
        }`}
        style={{ animationDelay: floatDelay }}
      >
        {/* Clean, Non-glowing Figma Name Tag */}
        <div className="relative flex items-center gap-2 rounded-[6px] border border-white/15 bg-[#0a081a]/85 px-3 py-1 text-xs sm:text-[13px] font-medium tracking-wide text-white shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] animate-pulse" />
          <span className="whitespace-nowrap font-medium">{name}</span>
        </div>

        {/* Crisp Cursor Arrow */}
        <svg
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
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
