"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import ChamferButton from "@/components/ui/ChamferButton";

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
  const [mobile, setMobile] = useState("");
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
    setMobile("");
    setSelectedServices(["Landing Page"]);
    setBrief("");
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 sm:py-20 md:py-24 text-white selection:bg-[#E5B528] selection:text-[#06070A]"
    >
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="center" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* ART-DIRECTED SPLIT SHOWCASE CONTAINER                   */}
        {/* ======================================================= */}
        <div className="relative w-full rounded-xl sm:rounded-2xl md:rounded-[20px] overflow-hidden border border-[#E5B528]/20 shadow-[0_24px_80px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* ===================================================== */}
          {/* LEFT SIDE: VIBRANT BRAND GOLD PANEL (45%)             */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-5 bg-[#E5B528] text-[#06070A] p-7 sm:p-9 md:p-11 lg:p-12 flex flex-col justify-between overflow-hidden select-none min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
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
              <div className="select-none">
                <span className="font-epilogue text-xs tracking-[0.2em] uppercase text-[#06070A]/80 font-bold">
                  Get In Touch
                </span>
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
                  className="group inline-flex items-center justify-center rounded-full bg-[#06070A] text-white px-5 sm:px-6 py-2 sm:py-2.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
                  aria-label="Book a 15-min call with QDelta"
                >
                  <span className="font-epilogue text-xs sm:text-[13px] font-semibold text-white tracking-tight whitespace-nowrap">
                    Book a 15-min call
                  </span>
                </button>
              </div>
            </div>

            {/* Lower-Middle Area: Open Box Graphic with Floating Service Pills */}
            <div className="relative z-10 w-full my-auto py-2 flex items-center justify-center">
              <OpenBoxServicePills />
            </div>

            {/* Subtle Editorial Baseline Mark */}
            <div className="relative z-10 pt-4 mt-auto border-t border-black/10 text-[11px] font-epilogue uppercase tracking-widest text-[#06070A]/60 font-semibold">
              <span>QDelta Technologies</span>
            </div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT SIDE: TRANSPARENT-BLACK GRAPHITE FORM (55%)     */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-7 bg-[#0B0E12]/93 backdrop-blur-md p-5 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center overflow-hidden">
            {/* Crisp Golden Top Accent Hairline */}
            <div className="absolute top-0 inset-x-12 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent pointer-events-none" />

            {/* Ambient Warm Golden Backlight */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#E5B528]/[0.035] blur-[100px]" />

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
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5B528]/15 border border-[#E5B528]/40 text-[#E5B528] shadow-[0_0_24px_rgba(229, 181, 40,0.25)]">
                    <Check className="h-7 w-7 stroke-[2.5]" />
                  </div>

                  <h3 className="mt-5 font-excon text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Inquiry Received
                  </h3>

                  <p className="mt-2 text-sm font-epilogue text-zinc-300 max-w-sm leading-relaxed">
                    Thank you, <strong className="text-white">{name}</strong>.
                    We’ve received your project brief and will follow up at{" "}
                    <span className="text-[#E5B528] font-medium">{email}</span>{" "}
                    shortly.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-7 rounded-full bg-[#E5B528] px-6 py-2.5 text-xs font-epilogue font-bold text-[#06070A] transition-all hover:bg-[#F0C034] hover:scale-105 cursor-pointer shadow-md"
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
                  <div className="mb-4 sm:mb-8">
                    <h3 className="font-excon text-xl sm:text-2xl md:text-[2rem] font-bold text-white tracking-tight">
                      Start Your Project
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-epilogue text-zinc-400">
                      A few details are enough.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-7">
                    {/* Name & Email (Underline Minimal Inputs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7">
                      {/* Name */}
                      <div className="relative group">
                        <label
                          htmlFor="name"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
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
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528]"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative group">
                        <label
                          htmlFor="email"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
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
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528]"
                        />
                      </div>

                      {/* Mobile */}
                      <div className="relative group">
                        <label
                          htmlFor="mobile"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
                        >
                          Mobile
                        </label>
                        <input
                          id="mobile"
                          type="tel"
                          placeholder="+1 000 000 0000"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528]"
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
                                  ? "bg-[#E5B528] text-[#06070A] font-semibold shadow-[0_0_12px_rgba(229, 181, 40,0.3)] border border-[#E5B528]"
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
                        className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
                      >
                        Project brief
                      </label>
                      <textarea
                        id="brief"
                        rows={2}
                        required
                        placeholder="Tell us briefly about your project..."
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528] resize-none"
                      />
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-0">
                      <ChamferButton
                        type="submit"
                        variant="primary"
                        className="w-full text-sm font-bold tracking-wide px-8 py-3"
                      >
                        <span>Send Inquiry</span>
                        <span
                          className="relative inline-grid place-items-center shrink-0 w-4 h-4 text-[#06070A] -rotate-[14deg] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:rotate-[18deg]"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 392.94 418.13" className="w-full h-full fill-current block">
                            <path d="M243.7,418.13C198.37,312.3,118.14,268.5,0,294.73,135.19,238.54,203.38,148.99,149.24,0c49.45,103.91,130.68,145.05,243.7,123.4-127.69,63.18-168.91,165.26-149.24,294.73Z" />
                          </svg>
                        </span>
                      </ChamferButton>
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
