import React from "react";
import { interpolate, Easing } from "remotion";

interface CaptionsProps {
  frame: number;
}

export const Captions: React.FC<CaptionsProps> = ({ frame }) => {
  // Caption 1: frames 8 to 82 (0.26s to 2.73s)
  const cap1Opacity = interpolate(
    frame,
    [8, 22, 68, 82],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );
  const cap1Y = interpolate(frame, [8, 22], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption 2: frames 88 to 205 (2.93s to 6.83s)
  const cap2Opacity = interpolate(
    frame,
    [88, 102, 190, 205],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );
  const cap2Y = interpolate(frame, [88, 102], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Caption 3: frames 210 to 296 (7.0s to 9.86s)
  const cap3Opacity = interpolate(
    frame,
    [210, 225, 285, 296],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );
  const cap3Y = interpolate(frame, [210, 225], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="pointer-events-none absolute bottom-16 inset-x-0 z-50 flex items-center justify-center">
      {/* Caption 1 */}
      {cap1Opacity > 0 && (
        <div
          className="px-10 py-4 rounded-full bg-black/90 border border-white/25 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center gap-5 text-center"
          style={{
            opacity: cap1Opacity,
            transform: `translateY(${cap1Y}px)`,
          }}
        >
          <span className="text-xs font-mono text-[#FAB406] font-bold tracking-widest uppercase bg-[#FAB406]/15 px-3 py-1 rounded-full border border-[#FAB406]/30">
            01 / 03
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <p className="text-2xl font-medium text-white tracking-wide">
            Your business <span className="text-zinc-400 font-normal">deserves more.</span>
          </p>
        </div>
      )}

      {/* Caption 2 */}
      {cap2Opacity > 0 && (
        <div
          className="px-10 py-4 rounded-full bg-black/95 border border-[#FAB406]/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(250,180,6,0.4)] flex items-center gap-5 text-center"
          style={{
            opacity: cap2Opacity,
            transform: `translateY(${cap2Y}px)`,
          }}
        >
          <span className="text-xs font-mono text-[#FAB406] font-bold tracking-widest uppercase bg-[#FAB406]/20 px-3 py-1 rounded-full border border-[#FAB406]/40">
            02 / 03
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406]" />
          <p className="text-2xl font-medium text-white tracking-wide">
            Let your <span className="text-[#FAB406] font-serif italic drop-shadow-[0_0_20px_rgba(250,180,6,0.6)]">brand come through.</span>
          </p>
        </div>
      )}

      {/* Caption 3 */}
      {cap3Opacity > 0 && (
        <div
          className="px-10 py-4 rounded-full bg-black/95 border border-[#FAB406]/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(250,180,6,0.45)] flex items-center gap-5 text-center"
          style={{
            opacity: cap3Opacity,
            transform: `translateY(${cap3Y}px)`,
          }}
        >
          <span className="text-xs font-mono text-[#FAB406] font-bold tracking-widest uppercase bg-[#FAB406]/20 px-3 py-1 rounded-full border border-[#FAB406]/40">
            03 / 03
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406]" />
          <p className="text-2xl font-semibold text-white tracking-wide">
            Make the <span className="text-[#FAB406] drop-shadow-[0_0_20px_rgba(250,180,6,0.6)]">next step clear.</span>
          </p>
        </div>
      )}
    </div>
  );
};
