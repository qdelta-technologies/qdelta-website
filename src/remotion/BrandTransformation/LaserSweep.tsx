import React from "react";

interface LaserSweepProps {
  progressPercent: number; // 0 to 100
  frame: number;
}

export const LaserSweep: React.FC<LaserSweepProps> = ({ progressPercent, frame }) => {
  // Strictly hide outside Act 2 sweep frames (90 to 206)
  if (frame < 90 || frame > 206) return null;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-40 flex items-center justify-center -translate-x-1/2"
      style={{
        left: `${progressPercent}%`,
      }}
    >
      {/* Ambient Light Leak Area Behind Laser */}
      <div
        className="absolute inset-y-0 -left-28 w-56 bg-gradient-to-r from-transparent via-[#E7B72A]/20 to-transparent blur-2xl pointer-events-none"
      />

      {/* Outer Wide Golden Glow Beam */}
      <div
        className="w-10 h-full bg-gradient-to-b from-[#E7B72A]/0 via-[#E7B72A]/40 to-[#E7B72A]/0 blur-md pointer-events-none"
      />

      {/* Focused Golden Glow Core */}
      <div
        className="absolute w-2.5 h-full bg-gradient-to-b from-[#E7B72A]/20 via-[#E7B72A] to-[#E7B72A]/20 blur-[2px] shadow-[0_0_30px_#E7B72A]"
      />

      {/* Razor White Laser Filament */}
      <div
        className="absolute w-[2px] h-full bg-gradient-to-b from-white/30 via-white to-white/30 shadow-[0_0_15px_#FFFFFF]"
      />

      {/* Top Diamond Lens Flare */}
      <div
        className="absolute top-2 w-4 h-4 rotate-45 bg-[#E7B72A] shadow-[0_0_20px_#E7B72A] blur-[0.5px]"
      />

      {/* Center Diamond Spark Flare */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rotate-45 bg-white shadow-[0_0_30px_#E7B72A,0_0_60px_#E7B72A]"
      />

      {/* Bottom Diamond Lens Flare */}
      <div
        className="absolute bottom-2 w-4 h-4 rotate-45 bg-[#E7B72A] shadow-[0_0_20px_#E7B72A] blur-[0.5px]"
      />
    </div>
  );
};
