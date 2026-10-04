"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function Manifesto() {
  return (
    <section className="relative z-20 w-full bg-[#040406] text-white selection:bg-[#E5B528] selection:text-black py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Top Hairline Flare */}
      <div className="relative w-full flex items-center justify-center pointer-events-none mb-10 sm:mb-14">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent" />
      </div>

      {/* Ambient Warm Golden Flare */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[28rem] w-[54rem] rounded-full bg-gradient-to-b from-[#E5B528]/[0.09] via-[#E5B528]/[0.02] to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Monospace Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#E5B528]/25 bg-[#E5B528]/[0.06] px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5B528] backdrop-blur-md mb-6"
        >
          <Sparkles className="h-3 w-3" />
          <span>Our Promise</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl min-[480px]:text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight text-white leading-[1.2] text-balance max-w-3xl mx-auto"
        >
          <span>A website that actually </span>
          <br className="hidden sm:inline" />
          <span className="italic font-serif text-[#E5B528] drop-shadow-[0_0_28px_rgba(229, 181, 40,0.45)]">
            grows your business.
          </span>
        </motion.h2>

        {/* User-Approved Punchline Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-sans font-light text-zinc-300 max-w-lg mx-auto tracking-wide leading-relaxed text-balance"
        >
          <span>And that’s what we build at </span>
          <span className="font-semibold text-white tracking-normal">QDelta.</span>
        </motion.p>
      </div>

      {/* Bottom Hairline Flare */}
      <div className="relative w-full flex items-center justify-center pointer-events-none mt-10 sm:mt-14">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute w-1/2 max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/30 to-transparent" />
      </div>
    </section>
  );
}
