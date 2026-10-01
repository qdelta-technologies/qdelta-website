"use client";

import React from "react";
import { Player } from "@remotion/player";
import { BrandTransformationComposition } from "@/remotion/BrandTransformation";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function BrandTransformationSection() {



  return (
    <section
      id="transformation"
      className="relative z-20 w-full bg-[#040406] text-white py-20 sm:py-28 md:py-32 scroll-mt-20 overflow-hidden selection:bg-[#FAB406] selection:text-black"
    >
      {/* Background Lighting Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[32rem] w-[64rem] rounded-full bg-gradient-to-b from-[#FAB406]/[0.08] via-[#FAB406]/[0.02] to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* ================= REMOTION VIDEO PLAYER CHASSIS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full mt-10 sm:mt-14 rounded-2xl md:rounded-3xl border border-[#FAB406]/30 bg-[#07080d]/90 p-2 sm:p-3 md:p-4 shadow-[0_0_70px_rgba(250,180,6,0.14)] backdrop-blur-xl group"
        >
          {/* Subtle Outer Glow Accent */}
          <div className="absolute -inset-0.5 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#FAB406]/20 via-transparent to-[#FAB406]/20 blur-xl opacity-40 pointer-events-none" />

          {/* Embedded Remotion Player Container */}
          <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden bg-[#030305] shadow-2xl border border-white/10">
            <Player
              component={BrandTransformationComposition}
              durationInFrames={300}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
                height: "100%",
              }}
              controls={false}
              autoPlay={true}
              loop={true}
              acknowledgeRemotionLicense
            />



          </div>
        </motion.div>

        {/* Value Highlights Grid Below Player */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-[#FAB406] shrink-0" />
            <div className="text-xs sm:text-sm text-zinc-300 font-medium">
              Surgical Visual Hierarchy
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-[#FAB406] shrink-0" />
            <div className="text-xs sm:text-sm text-zinc-300 font-medium">
              High-Converting Microcopy & CTA
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <CheckCircle2 className="w-5 h-5 text-[#FAB406] shrink-0" />
            <div className="text-xs sm:text-sm text-zinc-300 font-medium">
              Hyper-Responsive Spring Physics
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
