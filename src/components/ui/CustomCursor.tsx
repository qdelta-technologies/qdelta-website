"use client";

import { useEffect, useRef, useState } from "react";

function canUseCustomCursor(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * High-Performance 3D Faceted Ninja Star (Shuriken) Cursor
 * - Zero React re-renders during interaction (100% direct GPU DOM transforms).
 * - Instant desktop display on initial page load / reload.
 * - Hardware-accelerated hover & click states via CSS classes.
 * - Native OS cursor suppressed immediately via CSS.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canUseCustomCursor());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const star = starRef.current;
    if (!cursor || !star) return;

    let isVisible = document.documentElement.classList.contains("custom-cursor-active");
    if (isVisible) {
      cursor.style.opacity = "1";
    }

    let hoverInteractive = false;
    let hoverRafId = 0;
    let pendingHoverX = 0;
    let pendingHoverY = 0;
    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-interactive], label';

    const doHoverCheck = () => {
      hoverRafId = 0;
      const target = document.elementFromPoint(pendingHoverX, pendingHoverY);
      const interactive = target?.closest(interactiveSelector);
      const nextHover = !!interactive;
      if (nextHover === hoverInteractive) return;
      hoverInteractive = nextHover;
      if (nextHover) {
        star.classList.add("cursor-hovering");
      } else {
        star.classList.remove("cursor-hovering");
      }
    };

    // rAF-throttled: elementFromPoint runs once per frame, not per event
    const syncHoverState = (clientX: number, clientY: number) => {
      pendingHoverX = clientX;
      pendingHoverY = clientY;
      if (!hoverRafId) {
        hoverRafId = requestAnimationFrame(doHoverCheck);
      }
    };

    const updatePosition = (clientX: number, clientY: number) => {
      if (!isVisible) {
        isVisible = true;
        document.documentElement.classList.add("custom-cursor-active");
        cursor.style.opacity = "1";
      }
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      updatePosition(e.clientX, e.clientY);
      syncHoverState(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Ignore synthetic mouse events from touch (common on mobile browsers)
      if (typeof window !== "undefined" && "PointerEvent" in window) return;
      updatePosition(e.clientX, e.clientY);
      syncHoverState(e.clientX, e.clientY);
    };

    const onMouseDown = () => {
      star.classList.add("cursor-clicking");
    };

    const onMouseUp = () => {
      star.classList.remove("cursor-clicking");
    };

    const onMouseLeave = () => {
      isVisible = false;
      hoverInteractive = false;
      star.classList.remove("cursor-hovering");
      cursor.style.opacity = "0";
      document.documentElement.classList.remove("custom-cursor-active");
    };

    const onMouseEnter = (e: MouseEvent) => {
      isVisible = true;
      document.documentElement.classList.add("custom-cursor-active");
      cursor.style.opacity = "1";
      updatePosition(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      if (hoverRafId) cancelAnimationFrame(hoverRafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      id="qdelta-custom-cursor"
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999999] select-none will-change-transform transition-opacity duration-150 opacity-0"
      aria-hidden="true"
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div
          ref={starRef}
          className="cursor-star-inner relative flex items-center justify-center transition-all duration-200 ease-out scale-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] drop-shadow-[0_0_4px_rgba(229, 181, 40,0.35)]"
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
              stroke="#E5B528"
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
              fill="#E5B528"
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
              stroke="#E5B528"
              strokeWidth="0.8"
            />
            <circle
              cx="12"
              cy="12"
              r="1"
              fill="#E5B528"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
