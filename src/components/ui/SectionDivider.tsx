import React from "react";

export interface SectionDividerProps {
  className?: string;
}

/**
 * Ultra-thin and subtle 1px golden hairline section divider
 * Exactly matches the reference: 1px height, elegant horizontal gradient, zero fuzzy box-shadow
 */
export default function SectionDivider({
  className = "",
}: SectionDividerProps) {
  return (
    <div
      className={`relative w-full flex items-center justify-center my-0 z-30 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FAB406]/45 to-transparent" />
    </div>
  );
}
