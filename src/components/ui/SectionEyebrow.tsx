import React from "react";

export type EyebrowStyle = "geometric-minimal" | "cyber-precision" | "luxury-editorial";

/**
 * Global Eyebrow Style Selection:
 * - "geometric-minimal" : Sleek, ultra-clean Geometric Sans (Satoshi) — modern minimalist agency style
 * - "cyber-precision"   : Architectural wide-tracked Space Grotesk
 * - "luxury-editorial"  : Elegant italic Instrument Serif
 */
export const ACTIVE_EYEBROW_STYLE: EyebrowStyle = "geometric-minimal";

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
  const activeColor = textColor || "text-[#FAB406]";
  const shadow = isDark ? "" : "drop-shadow-[0_0_12px_rgba(250,180,6,0.30)]";

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

  if (style === "cyber-precision") {
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

  // Style 1: Minimalist Geometric Sans — Satoshi
  return (
    <div className={`mb-3 sm:mb-3.5 select-none ${className}`}>
      <span
        className={`font-satoshi uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[11px] sm:text-xs font-semibold ${activeColor} ${shadow} inline-block leading-tight`}
      >
        {children}
      </span>
    </div>
  );
}
