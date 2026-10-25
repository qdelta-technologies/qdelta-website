"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts (for staggering siblings) */
  delay?: number;
  /** How far below the element must be visible before triggering (0–1) */
  amount?: number;
  /** Y offset to animate from (default: 24) */
  yOffset?: number;
}

/**
 * Smooth section entrance — GPU-composited opacity + translateY only.
 * Fires once when the section scrolls into view; respects prefers-reduced-motion.
 */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  amount = 0.12,
  yOffset = 24,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom expo-out: fast start, silky end
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
