import React from "react";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
}

/**
 * SectionEyebrow
 * Unified, consistent kicker header for all website sections:
 * - Font: Modern expressive cursive font (Caveat)
 * - Color: Pure bright radiant yellow (#FFC820)
 * - Size: text-xl sm:text-2xl md:text-[26px] (clearly legible, energetic scale)
 * - Clean: Pure typography without side dots, lines, or icons
 * - Spacing: Consistent mb-3 sm:mb-3.5 gap to the supporting H2
 */
export default function SectionEyebrow({
  children,
  className = "",
  textColor = "text-[#FFC820]",
}: SectionEyebrowProps) {
  return (
    <div className={`mb-3 sm:mb-3.5 select-none ${className}`}>
      <span
        className={`font-cursive text-xl sm:text-2xl md:text-[26px] font-bold ${textColor} tracking-wide inline-block drop-shadow-[0_0_12px_rgba(255,200,32,0.35)] leading-tight`}
      >
        {children}
      </span>
    </div>
  );
}
