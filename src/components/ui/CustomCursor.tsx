"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 3D Faceted Ninja Star (Shuriken) Cursor
 * - Sharp, aerodynamic 4-pointed golden shuriken with 8 beveled 3D facets.
 * - Directional metallic lighting (top-left lit, bottom-right shadowed).
 * - Central ninja hub rivet with 1:1 instantaneous zero-lag hardware tracking.
 * - Complete cursor: none suppression so no default OS arrow leaks through on desktop.
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only skip custom cursor on pure touch-only devices with no mouse capability
    const isTouchOnly = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    if (isTouchOnly) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "1";
        }
      }

      // Direct 1:1 hardware transform for instantaneous tracking with zero lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-interactive], label'
      );

      setIsHovering(!!interactive);
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      isVisibleRef.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Complete suppression of native OS cursor across all elements and pseudo-elements */}
      <style dynamic-cursor="true">{`
        html, body, *, *::before, *::after {
          cursor: none !important;
        }
      `}</style>

      {/* 3D Faceted Ninja Star Cursor (Centered at clientX, clientY) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999999] select-none will-change-transform transition-opacity duration-150"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`relative flex items-center justify-center transition-all duration-200 ease-out ${
              isClicking
                ? "scale-85"
                : isHovering
                ? "scale-125 rotate-45 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_8px_rgba(250,180,6,0.75)]"
                : "scale-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] drop-shadow-[0_0_4px_rgba(250,180,6,0.35)]"
            }`}
          >
            {/* Crisp 3D Faceted 4-Pointed Golden Ninja Star */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              {/* Outer Perimeter Razor Hairline */}
              <polygon
                points="12,1 14.5,9.5 23,12 14.5,14.5 12,23 9.5,14.5 1,12 9.5,9.5"
                stroke="#F5B800"
                strokeWidth="0.8"
                strokeLinejoin="round"
                fill="none"
              />

              {/* ===== 8 Faceted 3D Metallic Planes ===== */}

              {/* 1. North Blade — Lit Left Facet */}
              <polygon
                points="12,12 9.5,9.5 12,1"
                fill="#FFE066"
              />

              {/* 2. North Blade — Shadow Right Facet */}
              <polygon
                points="12,12 12,1 14.5,9.5"
                fill="#D97706"
              />

              {/* 3. East Blade — Lit Top Facet */}
              <polygon
                points="12,12 14.5,9.5 23,12"
                fill="#F5B800"
              />

              {/* 4. East Blade — Deep Shadow Bottom Facet */}
              <polygon
                points="12,12 23,12 14.5,14.5"
                fill="#B45309"
              />

              {/* 5. South Blade — Deep Shadow Right Facet */}
              <polygon
                points="12,12 14.5,14.5 12,23"
                fill="#92400E"
              />

              {/* 6. South Blade — Ambient Lit Left Facet */}
              <polygon
                points="12,12 12,23 9.5,14.5"
                fill="#D97706"
              />

              {/* 7. West Blade — Ambient Lit Bottom Facet */}
              <polygon
                points="12,12 9.5,14.5 1,12"
                fill="#F59E0B"
              />

              {/* 8. West Blade — Direct Lit Top Facet */}
              <polygon
                points="12,12 1,12 9.5,9.5"
                fill="#FBBF24"
              />

              {/* ===== 3D Center Spine Ridges (Crisp Chiseled Creases) ===== */}
              <line x1="12" y1="1" x2="12" y2="23" stroke="#FFF085" strokeWidth="0.6" strokeOpacity="0.75" />
              <line x1="1" y1="12" x2="23" y2="12" stroke="#FFF085" strokeWidth="0.6" strokeOpacity="0.75" />

              {/* ===== Central Ninja Hub Rivet ===== */}
              <circle
                cx="12"
                cy="12"
                r="2.2"
                fill="#0b0b10"
                stroke="#F5B800"
                strokeWidth="0.8"
              />
              <circle
                cx="12"
                cy="12"
                r="1"
                fill="#FFD700"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
