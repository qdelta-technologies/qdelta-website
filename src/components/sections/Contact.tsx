"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import SaffronButton from "@/components/ui/SaffronButton";

const SERVICES = [
  "Landing Page",
  "Premium Website",
  "E-commerce",
  "Interactive / 3D",
  "Other",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Landing Page",
  ]);
  const [brief, setBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setSelectedServices(["Landing Page"]);
    setBrief("");
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full overflow-hidden bg-[#040406] py-20 sm:py-28 text-white selection:bg-black selection:text-[#FAB406]"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* ART-DIRECTED SPLIT SHOWCASE CONTAINER                   */}
        {/* ======================================================= */}
        <div className="relative w-full rounded-3xl sm:rounded-[36px] md:rounded-[40px] overflow-hidden border border-white/[0.1] shadow-[0_30px_90px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* ===================================================== */}
          {/* LEFT SIDE: RICH TEXTURED YELLOW BRAND PANEL (45%)     */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-5 bg-gradient-to-br from-[#FFC72C] via-[#FAB406] to-[#E89E00] text-black p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between overflow-hidden select-none min-h-[360px] sm:min-h-[420px] lg:min-h-[540px]">
            {/* Tactile Fine Film Grain / Noise Texture Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Soft Ambient Inner Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_20%_20%] from-white/20 via-transparent to-black/10" />

            {/* Top Eyebrow — Editorial Style in Black */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 select-none">
                <span className="font-excon text-xs sm:text-[13px] tracking-[0.24em] uppercase text-black/80 font-bold">
                  07 / GET IN TOUCH
                </span>
                <div className="w-10 sm:w-12 h-[1px] bg-black/40" />
                <svg
                  className="w-2.5 h-2.5 text-black fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
            </div>

            {/* Middle / Center Editorial Statement */}
            <div className="relative z-10 my-auto py-8">
              <h2 className="font-epilogue font-black text-4xl sm:text-5xl lg:text-[3.25rem] text-black leading-[1.05] tracking-tight text-balance">
                Have a project in mind?
              </h2>

              <p className="mt-3.5 sm:mt-4 text-base sm:text-lg font-excon font-medium text-black/80 leading-snug">
                Tell us what you’re building.
              </p>
            </div>

            {/* Subtle Editorial Baseline Mark */}
            <div className="relative z-10 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] font-excon uppercase tracking-widest text-black/60 font-semibold">
              <span>QDelta Technologies</span>
              <span>Available 2026</span>
            </div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT SIDE: PREMIUM DARK CONTACT FORM (55%)          */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-7 bg-[#08090E] p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-center">
            {/* Subtle Horizon Glow Line */}
            <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 sm:py-16 flex flex-col items-center justify-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAB406]/15 border border-[#FAB406]/40 text-[#FAB406] shadow-[0_0_24px_rgba(250,180,6,0.25)]">
                    <Check className="h-8 w-8 stroke-[2.5]" />
                  </div>

                  <h3 className="mt-6 font-epilogue text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Inquiry Received
                  </h3>

                  <p className="mt-2.5 text-sm font-epilogue text-zinc-300 max-w-sm leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>.
                    We’ve received your project brief and will follow up at{" "}
                    <span className="text-[#FAB406] font-medium">{email}</span>{" "}
                    shortly.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 rounded-full bg-[#FAB406] px-6 py-2.5 text-xs font-epilogue font-bold text-black transition-all hover:bg-white hover:scale-105 cursor-pointer shadow-md"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Form Header */}
                  <div className="mb-8 sm:mb-10">
                    <h3 className="font-epilogue text-2xl sm:text-3xl md:text-[2.1rem] font-bold text-white tracking-tight">
                      Start Your Project
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-excon text-zinc-400">
                      A few details are enough.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-8">
                    {/* Name & Email (Underline Minimal Inputs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {/* Name */}
                      <div className="relative group">
                        <label
                          htmlFor="name"
                          className="block text-xs font-excon uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#FAB406]"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border-b border-white/15 pb-2.5 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406]"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative group">
                        <label
                          htmlFor="email"
                          className="block text-xs font-excon uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#FAB406]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-white/15 pb-2.5 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406]"
                        />
                      </div>
                    </div>

                    {/* What do you need? (Chips) */}
                    <div>
                      <label className="block text-xs font-excon uppercase tracking-widest text-zinc-400 font-medium mb-3">
                        What do you need?
                      </label>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {SERVICES.map((service) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-4 py-2 rounded-full text-xs font-excon tracking-wide transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#FAB406] text-black font-semibold shadow-[0_0_12px_rgba(250,180,6,0.3)] border border-[#FAB406]"
                                  : "bg-white/[0.03] text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Brief */}
                    <div className="relative group">
                      <label
                        htmlFor="brief"
                        className="block text-xs font-excon uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#FAB406]"
                      >
                        Project brief
                      </label>
                      <textarea
                        id="brief"
                        rows={3}
                        required
                        placeholder="Tell us briefly about your project..."
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full bg-transparent border-b border-white/15 pb-2.5 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406] resize-none"
                      />
                    </div>

                    {/* Submit CTA (UIVerse Saffron Pill with rotating star mark) */}
                    <div className="pt-3">
                      <SaffronButton
                        type="submit"
                        size="lg"
                        variant="primary"
                        className="w-full h-13 sm:h-14 text-sm font-bold tracking-wide"
                      >
                        Send Inquiry
                      </SaffronButton>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
