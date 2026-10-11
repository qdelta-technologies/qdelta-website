import React from "react";

export type EyebrowStyle = "cyber-precision" | "luxury-editorial";

/**
 * Global Eyebrow Style Selection:
 * - "cyber-precision" : Architectural, wide-tracked uppercase Space Grotesk (High-tech / Modern / Clean)
 * - "luxury-editorial": Elegant, sophisticated italic Instrument Serif (Haute Couture / Award-Winning / Elegant)
 */
export const ACTIVE_EYEBROW_STYLE: EyebrowStyle = "cyber-precision";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  style?: EyebrowStyle;
}

export default function SectionEyebrow({
  children,
  className = "",
  textColor,
  style = ACTIVE_EYEBROW_STYLE,
}: SectionEyebrowProps) {
  const isDark = textColor?.includes("#06070A");
  const activeColor = textColor || "text-[#FFC820]";
  const shadow = isDark ? "" : "drop-shadow-[0_0_12px_rgba(255,200,32,0.3)]";

  if (style === "luxury-editorial") {
    return (
      <div className={`mb-3 sm:mb-3.5 select-none ${className}`}>
        <span
          className={`font-editorial italic text-2xl sm:text-[28px] md:text-[32px] font-normal ${activeColor} ${shadow} inline-block leading-none`}
        >
          {children}
        </span>
      </div>
    );
  }

  // Style 1: Cyber-Architectural Precision
  return (
    <div className={`mb-3 sm:mb-3.5 select-none ${className}`}>
      <span
        className={`font-space uppercase tracking-[0.22em] sm:tracking-[0.25em] text-xs sm:text-[13px] font-bold ${activeColor} ${shadow} inline-block leading-tight`}
      >
        {children}
      </span>
    </div>
  );
}
