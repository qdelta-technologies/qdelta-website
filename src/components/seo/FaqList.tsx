"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { FaqItem } from "@/lib/seo";

export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full space-y-3.5">
      {faqs.map((f, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={f.q}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-md ${
              isOpen
                ? "border-[#FAB406]/50 bg-[#0B0E14]/95 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.85),0_0_24px_rgba(250,180,6,0.07),inset_0_1.5px_0_rgba(255,255,255,0.12)]"
                : "border-white/[0.09] bg-[#0B0E14]/80 hover:border-white/[0.18] hover:bg-[#0E121A]/90 shadow-[0_6px_22px_-6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
            }`}
          >
            {/* Authentic Tactile Sandstone / Sandpaper Grain Texture (No Dots) */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='sandstone-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sandstone-noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='sandstone-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sandstone-noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "200px 200px",
              }}
              aria-hidden
            />

            {/* Gradient lighting fill for rich surface depth */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: isOpen
                  ? "linear-gradient(135deg, rgba(250, 180, 6, 0.05) 0%, rgba(255, 255, 255, 0.02) 45%, rgba(0, 0, 0, 0.25) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
              }}
              aria-hidden
            />

            {/* Top hairline accent */}
            <div
              className={`pointer-events-none absolute inset-x-6 top-0 h-[1.5px] transition-all duration-300 z-10 ${
                isOpen
                  ? "bg-gradient-to-r from-transparent via-[#FAB406]/75 to-transparent opacity-100"
                  : "bg-gradient-to-r from-transparent via-white/[0.12] to-transparent opacity-60 group-hover:opacity-100"
              }`}
              aria-hidden
            />

            {/* Interactive Question Header */}
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="relative z-10 flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAB406]/50 rounded-2xl"
            >
              <h3
                className={`font-heading text-base sm:text-lg font-semibold tracking-tight transition-colors duration-200 ${
                  isOpen ? "text-[#FAB406]" : "text-white group-hover:text-zinc-100"
                }`}
              >
                {f.q}
              </h3>

              {/* Refined toggle icon pill */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "border-[#FAB406]/60 bg-[#FAB406]/15 text-[#FAB406] shadow-[0_0_12px_rgba(250,180,6,0.25)]"
                    : "border-white/10 bg-white/[0.04] text-zinc-400 group-hover:border-white/25 group-hover:text-white group-hover:bg-white/[0.08]"
                }`}
                aria-hidden
              >
                <Plus
                  className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                />
              </div>
            </button>

            {/* Animated Accordion Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                    {/* Golden accent dividing hairline */}
                    <div className="mb-3.5 h-[1px] w-full bg-gradient-to-r from-[#FAB406]/40 via-white/[0.08] to-transparent" />
                    <p className="font-epilogue text-sm sm:text-[15px] font-normal leading-relaxed text-zinc-300">
                      {f.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
