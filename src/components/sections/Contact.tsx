"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, CheckCircle2, Check, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setDetails("");
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full bg-[#040406] border-t border-white/10 py-20 sm:py-24 md:py-32 text-white selection:bg-[#FAB406] selection:text-black overflow-hidden"
    >
      {/* Ambient Radial Lighting */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-[#FAB406]/[0.07] via-transparent to-transparent blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-stretch">
          {/* ================= LEFT SIDE (The Hook) ================= */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FAB406]/20 bg-[#FAB406]/[0.06] px-4 py-1.5 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.9)]" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FAB406] font-semibold">
                  Get in Touch
                </span>
              </div>

              <h2 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white select-none">
                Let&apos;s <br />
                <span className="italic text-[#FAB406]">Talk.</span>
              </h2>

              <p className="mt-6 max-w-md text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                Have an ambitious idea or want to build a world-class digital experience? Let&apos;s engineer it together.
              </p>
            </div>

            {/* Value Props Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-10 border-t border-white/10 lg:pt-16 lg:mt-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406]">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold tracking-wide text-white">
                    Quick Turnaround
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Guaranteed response and discovery call within 24 hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold tracking-wide text-white">
                    Transparent Execution
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Fixed timelines, locked deliverables, and weekly sprints.
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Frosted Glass Form Card) ================= */}
          <div className="lg:col-span-6 flex items-center">
            <div className="w-full rounded-3xl border border-white/10 bg-[#0e0e14]/95 p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="contact-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="flex min-h-[380px] flex-col items-center justify-center py-6 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FAB406]/60 bg-[#FAB406]/10 text-[#FAB406] shadow-[0_0_30px_rgba(250,180,6,0.3)]">
                      <Check className="h-8 w-8 stroke-[2.5]" />
                    </div>
                    <h3 className="mt-6 font-sans text-3xl font-extrabold text-white sm:text-4xl">
                      Inquiry Received!
                    </h3>
                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-300">
                      Thank you, <strong className="text-white">{name}</strong>. We will review your project requirements and follow up at <span className="font-semibold text-[#FAB406]">{email}</span> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-8 rounded-full bg-[#FAB406] px-8 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-6 sm:mb-8">
                      <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                        Have a project in mind?
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
                        Fill in your details below and our team will get back to you promptly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div>
                        <label
                          htmlFor="asym-name"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                        >
                          How should we call you?*
                        </label>
                        <input
                          id="asym-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-medium text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406] focus:bg-white/[0.08] focus:ring-1 focus:ring-[#FAB406] focus:shadow-[0_0_20px_rgba(250,180,6,0.15)]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="asym-email"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                        >
                          Email Address*
                        </label>
                        <input
                          id="asym-email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-medium text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406] focus:bg-white/[0.08] focus:ring-1 focus:ring-[#FAB406] focus:shadow-[0_0_20px_rgba(250,180,6,0.15)]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="asym-details"
                          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400"
                        >
                          Project Scope & Goals*
                        </label>
                        <textarea
                          id="asym-details"
                          required
                          rows={3}
                          placeholder="Tell us about your project goals, scope, and target launch timeline..."
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5 sm:py-3.5 text-sm font-medium text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#FAB406] focus:bg-white/[0.08] focus:ring-1 focus:ring-[#FAB406] focus:shadow-[0_0_20px_rgba(250,180,6,0.15)]"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#FAB406] py-3.5 sm:py-4 text-sm font-bold tracking-wide text-black shadow-[0_0_20px_rgba(250,180,6,0.35)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:scale-[1.02] cursor-pointer"
                        >
                          <span>Submit Inquiry</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>

                      <p className="text-center text-[11px] text-zinc-500">
                        Protected by client confidentiality & standard NDA.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
