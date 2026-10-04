import React from "react";

interface CursorActionProps {
  x: number; // percentage of container width (0 to 100)
  y: number; // percentage of container height (0 to 100)
  opacity: number;
  isHovered: boolean;
}

export const CursorAction: React.FC<CursorActionProps> = ({ x, y, opacity, isHovered }) => {
  if (opacity <= 0) return null;

  return (
    <div
      className="pointer-events-none absolute z-40 transition-transform will-change-transform"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translate(-2px, -2px) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
      }}
    >
      {/* Figma/Apple-style Vector Pointer Cursor */}
      <svg
        className="w-6 h-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 3L10.5 21L14 13.5L21.5 10L3 3Z"
          fill="#E7B72A"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Floating Cursor Name Badge */}
      <div
        className="ml-5 -mt-2 px-2 py-0.5 rounded-full bg-[#E7B72A] text-black text-[10px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 whitespace-nowrap"
      >
        <span>High-Ticket Lead</span>
      </div>

      {/* Subtle pulse ripple when hovered */}
      {isHovered && (
        <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border border-[#E7B72A]/60 animate-ping pointer-events-none" />
      )}
    </div>
  );
};
