import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { OrdinaryWebsite } from "./OrdinaryWebsite";
import { TransformedWebsite } from "./TransformedWebsite";
import { LaserSweep } from "./LaserSweep";
import { CursorAction } from "./CursorAction";
import { Captions } from "./Captions";
import { BrandTransformationProps } from "./types";

export const BrandTransformationComposition: React.FC<BrandTransformationProps> = () => {
  const frame = useCurrentFrame();

  // ================= 1. GENTLE FORWARD DOLLY (no 3D tilt — perfectly straight) =================
  const scale = interpolate(frame, [0, 90, 210, 260], [0.97, 1.0, 1.0, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // ================= 2. GOLDEN LASER SWEEP (3s to 7s -> frames 90 to 210) =================
  const sweepPercent = interpolate(frame, [90, 205], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.42, 0, 0.58, 1),
  });

  // ================= 3. CURSOR INERTIA & HOVER (7s to 10s -> frames 215 to 300) =================
  const cursorOpacity = interpolate(frame, [215, 226], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorX = interpolate(frame, [218, 255], [75, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const cursorY = interpolate(frame, [218, 255], [20, 58], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const isButtonHovered = frame >= 252;

  return (
    <AbsoluteFill className="bg-[#030305] text-white flex items-center justify-center overflow-hidden">
      {/* Alata (display) + Satoshi (UI/body) — matches site typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap');
      `}</style>

      {/* Main Stage Container — Full 1920x1080, perfectly flat, no 3D rotation */}
      <div
        className="w-full h-full relative will-change-transform"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Layer 1: The Ordinary Website (Before — visible where sweep hasn't reached) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `inset(0 0 0 ${sweepPercent}%)`,
          }}
        >
          <OrdinaryWebsite />
        </div>

        {/* Layer 2: The Transformed Website (After — revealed by sweep) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `inset(0 ${100 - sweepPercent}% 0 0)`,
          }}
        >
          <TransformedWebsite isHovered={isButtonHovered} />
        </div>

        {/* Layer 3: Laser Sweep Beam */}
        <LaserSweep progressPercent={sweepPercent} frame={frame} />

        {/* Layer 4: Act 3 Cursor Action */}
        <CursorAction
          x={cursorX}
          y={cursorY}
          opacity={cursorOpacity}
          isHovered={isButtonHovered}
        />
      </div>

      {/* Synchronized Bottom Captions */}
      <Captions frame={frame} />
    </AbsoluteFill>
  );
};
