"use client";

import React from "react";
import Link from "next/link";

export interface SaffronButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  showMark?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * UIVerse Signature Saffron Pill Button
 * Features:
 * - Fluid capsule geometry with smooth hover feedback
 * - Signature 4-point star SVG badge mark with -14deg -> +18deg micro-rotation easing
 * - QDelta golden-yellow branding (#E5B528) and Epilogue typography
 */
export default function SaffronButton({
  children = "Start a project",
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  showMark = true,
  disabled = false,
  ariaLabel,
}: SaffronButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "h-9 px-4 text-xs gap-2",
    md: "h-11 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm gap-2.5 sm:gap-3",
    lg: "h-13 sm:h-14 px-7 sm:px-9 text-sm sm:text-base gap-3 sm:gap-3.5",
  }[size];

  // Mark sizing
  const markSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4 sm:w-[18px] sm:h-[18px]",
    lg: "w-5 h-5",
  }[size];

  // Variant classes
  const variantClasses = {
    primary:
      "bg-[#E5B528] text-[#06070A] border-[1.5px] border-[#E5B528] hover:bg-[#F0C034] hover:border-[#F0C034] shadow-[0_0_18px_rgba(229, 181, 40,0.25)] hover:shadow-[0_0_26px_rgba(229, 181, 40,0.38)]",
    outline:
      "bg-white/[0.04] text-white border-[1.5px] border-white/15 hover:border-[#E5B528] hover:text-[#E5B528] hover:bg-[#E5B528]/[0.06] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]",
    white:
      "bg-white text-black border-[1.5px] border-white hover:bg-[#E5B528] hover:border-[#E5B528] shadow-sm hover:shadow-[0_0_22px_rgba(229, 181, 40,0.35)]",
  }[variant];

  // Star mark color
  const markColorClass = {
    primary: "text-[#06070A]",
    outline: "text-[#E5B528]",
    white: "text-black group-hover:text-black",
  }[variant];

  const baseClasses = `
    group inline-flex items-center justify-center font-epilogue font-bold tracking-[-0.01em] rounded-full leading-none whitespace-nowrap cursor-pointer select-none
    transition-all duration-200 ease-out active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B528]
    ${sizeClasses}
    ${variantClasses}
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      <span>{children}</span>
      {showMark && (
        <span
          className={`relative inline-grid place-items-center shrink-0 ${markSize} ${markColorClass} -rotate-[14deg] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:rotate-[18deg]`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 392.94 418.13" className="w-full h-full fill-current block">
            <path d="M243.7,418.13C198.37,312.3,118.14,268.5,0,294.73,135.19,238.54,203.38,148.99,149.24,0c49.45,103.91,130.68,145.05,243.7,123.4-127.69,63.18-168.91,165.26-149.24,294.73Z" />
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
