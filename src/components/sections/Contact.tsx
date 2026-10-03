"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import SaffronButton from "@/components/ui/SaffronButton";

import OpenBoxServicePills from "@/components/ui/OpenBoxServicePills";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";

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
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 sm:py-20 md:py-24 text-white selection:bg-[#F5B800] selection:text-[#06070A]"
    >
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="center" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* ART-DIRECTED SPLIT SHOWCASE CONTAINER                   */}
        {/* ======================================================= */}
        <div className="relative w-full rounded-xl sm:rounded-2xl md:rounded-[20px] overflow-hidden border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* ===================================================== */}
          {/* LEFT SIDE: VIBRANT BRAND GOLD PANEL (45%)             */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-5 bg-[#FAB406] text-[#06070A] p-7 sm:p-9 md:p-11 lg:p-12 flex flex-col justify-between overflow-hidden select-none min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            {/* Subtle Texture Grain Over Clean Golden Background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                backgroundSize: "8px 8px",
              }}
            />

            {/* Top Eyebrow — Editorial Style in Dark Charcoal */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 select-none">
                <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-[#06070A]/80 font-bold">
                  07 / Get In Touch
                </span>
                <div className="w-10 sm:w-12 h-[1px] bg-black/25" />
              </div>
            </div>

            {/* Upper / Center Editorial Statement */}
            <div className="relative z-10 pt-4 sm:pt-5">
              <h2 className="font-excon font-bold text-2xl sm:text-3xl lg:text-[2.75rem] text-[#06070A] leading-[1.08] tracking-tight text-balance">
                Have a project in mind?
              </h2>

              <p className="mt-2 text-sm sm:text-base font-epilogue font-normal text-[#06070A]/85 leading-snug">
                Tell us what you’re building.
              </p>

              {/* Compact Black Booking Callout Pill */}
              <div className="mt-4 sm:mt-5">
                <button
                  type="button"
                  onClick={() => {
                    const nameInput = document.getElementById("name");
                    if (nameInput) {
                      nameInput.focus();
                      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-[#06070A] text-white pl-2 pr-4 sm:pr-5 py-1.5 sm:py-2 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 text-left cursor-pointer select-none"
                  aria-label="Book a 15-min call with QDelta"
                >
                  {/* Left Avatar */}
                  <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden ring-1 ring-white/25 shrink-0 bg-zinc-800">
                    <Image
                      src="/team/qais-founder-latest.png"
                      alt="QDelta Team"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Plus Symbol */}
                  <span className="text-[11px] font-epilogue text-zinc-400 font-medium select-none">
                    +
                  </span>

                  {/* Secondary 'You' Badge */}
                  <span className="flex items-center justify-center w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-zinc-800/90 border border-zinc-700/70 text-[10px] sm:text-[11px] font-epilogue font-semibold text-zinc-200 select-none">
                    You
                  </span>

                  {/* Main Text */}
                  <span className="font-epilogue text-xs sm:text-[13px] font-semibold text-white tracking-tight whitespace-nowrap pl-0.5 sm:pl-1">
                    Book a 15-min call
                  </span>

                  {/* Subtle Accent Arrow */}
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#F5B800] transition-colors shrink-0 -ml-0.5 sm:-ml-1" />
                </button>
              </div>
            </div>

            {/* Lower-Middle Area: Open Box Graphic with Floating Service Pills */}
            <div className="relative z-10 w-full my-auto py-2 flex items-center justify-center">
              <OpenBoxServicePills />
            </div>

            {/* Subtle Editorial Baseline Mark */}
            <div className="relative z-10 pt-4 mt-auto border-t border-black/10 flex items-center justify-between text-[11px] font-epilogue uppercase tracking-widest text-[#06070A]/60 font-semibold">
              <span>QDelta Technologies</span>
              <span>Available 2026</span>
            </div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT SIDE: TRANSPARENT-BLACK GRAPHITE FORM (55%)     */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-7 bg-[#0B0E12]/92 backdrop-blur-xl p-7 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center overflow-hidden">
            {/* Crisp Golden Top Accent Hairline */}
            <div className="absolute top-0 inset-x-12 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#F5B800]/50 to-transparent pointer-events-none" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#F5B800]/[0.035] blur-[100px]" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 sm:py-14 flex flex-col items-center justify-center text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B800]/15 border border-[#F5B800]/40 text-[#F5B800] shadow-[0_0_24px_rgba(245,184,0,0.25)]">
                    <Check className="h-7 w-7 stroke-[2.5]" />
                  </div>

                  <h3 className="mt-5 font-excon text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Inquiry Received
                  </h3>

                  <p className="mt-2 text-sm font-epilogue text-zinc-300 max-w-sm leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>.
                    We’ve received your project brief and will follow up at{" "}
                    <span className="text-[#F5B800] font-medium">{email}</span>{" "}
                    shortly.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-7 rounded-full bg-[#FAB406] px-6 py-2.5 text-xs font-epilogue font-bold text-[#06070A] transition-all hover:bg-[#ffbe1a] hover:scale-105 cursor-pointer shadow-md"
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
                  <div className="mb-7 sm:mb-8">
                    <h3 className="font-excon text-xl sm:text-2xl md:text-[2rem] font-bold text-white tracking-tight">
                      Start Your Project
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-epilogue text-zinc-400">
                      A few details are enough.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                    {/* Name & Email (Underline Minimal Inputs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                      {/* Name */}
                      <div className="relative group">
                        <label
                          htmlFor="name"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#F5B800]"
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
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#F5B800]"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative group">
                        <label
                          htmlFor="email"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#F5B800]"
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
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#F5B800]"
                        />
                      </div>
                    </div>

                    {/* What do you need? (Chips) */}
                    <div>
                      <label className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-2.5">
                        What do you need?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES.map((service) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-epilogue tracking-wide transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#F5B800] text-[#06070A] font-semibold shadow-[0_0_12px_rgba(245,184,0,0.3)] border border-[#F5B800]"
                                  : "bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white"
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
                        className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#F5B800]"
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
                        className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-epilogue text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#F5B800] resize-none"
                      />
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <SaffronButton
                        type="submit"
                        size="lg"
                        variant="primary"
                        className="w-full h-12 sm:h-13 text-sm font-bold tracking-wide"
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
