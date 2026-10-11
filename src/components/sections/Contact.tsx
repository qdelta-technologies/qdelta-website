"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import ChamferButton from "@/components/ui/ChamferButton";

import OpenBoxServicePills from "@/components/ui/OpenBoxServicePills";
import SectionAtmosphere from "@/components/ui/SectionAtmosphere";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import {
  evaluateRateLimit,
  recordSubmission,
  getActiveCooldownStatus,
  MAX_SUBMISSIONS_PER_USER,
} from "@/lib/rateLimit";

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
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldownStatus, setCooldownStatus] = useState<{
    isCooldown: boolean;
    minutesRemaining: number;
    totalSubmissions: number;
  }>({ isCooldown: false, minutesRemaining: 0, totalSubmissions: 0 });

  // Monitor anti-spam cooldown status periodically
  useEffect(() => {
    const refreshStatus = () => {
      setCooldownStatus(getActiveCooldownStatus());
    };
    refreshStatus();
    const timer = setInterval(refreshStatus, 15000);
    return () => clearInterval(timer);
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Invisible Honeypot Check: Trap automated bots before they spam FormSubmit or Google Sheets
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    // 2. Validate mandatory fields
    if (!name.trim() || !email.trim() || !mobile.trim()) {
      setErrorMessage("Name, email address, and mobile number are mandatory.");
      return;
    }

    // 3. Client-side Rate Limit check (30-min gap & max 2 submissions per person)
    const rateCheck = evaluateRateLimit(email, mobile);
    if (!rateCheck.allowed) {
      setErrorMessage(rateCheck.message || "Submission limit reached.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        services: selectedServices.length > 0 ? selectedServices.join(", ") : "Not specified",
        brief: brief.trim(),
        _honey: honeypot,
        _subject: `New Project Inquiry from ${name.trim()} - QDelta`,
        _template: "table",
        _captcha: "false",
      };

      let succeeded = false;
      let failureReason = "";

      // Step A: Attempt server-side rate-limited submission
      try {
        const serverRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const serverData = await serverRes.json().catch(() => ({}));

        if (serverRes.ok && (serverData.success === true || serverData.success === "true")) {
          succeeded = true;
        } else if (serverRes.status === 429) {
          // Explicit rate limit triggered on server
          setErrorMessage(serverData.message || "Rate limit reached. Please wait 30 minutes.");
          setSubmitting(false);
          return;
        } else {
          failureReason = serverData.message || "";
        }
      } catch {
        // Fallback to direct FormSubmit.co client call if server route network interrupted
      }

      // Step B: Fallback directly to FormSubmit.co
      if (!succeeded) {
        const directRes = await fetch("https://formsubmit.co/ajax/hello@qdelta.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const directData = await directRes.json().catch(() => ({}));

        if (directRes.ok && (directData.success === "true" || directData.success === true)) {
          succeeded = true;
        } else if (directData.message && directData.message.toLowerCase().includes("activate")) {
          failureReason =
            "FormSubmit has sent a one-time activation email to hello@qdelta.in. Please click the confirmation link in your inbox to enable forwarding.";
        } else {
          failureReason = directData.message || failureReason;
        }
      }

      if (succeeded) {
        // Save to browser localStorage rate limiting logs
        recordSubmission(email, mobile);
        setCooldownStatus(getActiveCooldownStatus());
        setSubmitted(true);
      } else {
        setErrorMessage(
          failureReason ||
            "Unable to submit inquiry at the moment. Please try again or reach out directly at hello@qdelta.in."
        );
      }
    } catch (err) {
      console.error("Form inquiry submission error:", err);
      setErrorMessage(
        "Network connection issue. Please check your internet connection or email us directly at hello@qdelta.in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    // Check if cooldown is active before resetting
    const currentStatus = getActiveCooldownStatus();
    if (currentStatus.isCooldown) {
      setErrorMessage(
        `Anti-spam cooldown active: Please wait ${currentStatus.minutesRemaining} more minute${
          currentStatus.minutesRemaining > 1 ? "s" : ""
        } before submitting another inquiry (Limit: ${MAX_SUBMISSIONS_PER_USER} per person).`
      );
      setSubmitted(false);
      return;
    }

    setSubmitted(false);
    setSubmitting(false);
    setErrorMessage(null);
    setName("");
    setEmail("");
    setMobile("");
    setSelectedServices(["Landing Page"]);
    setBrief("");
    setHoneypot("");
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full overflow-hidden bg-[#06070A] py-16 sm:py-20 md:py-24 text-white selection:bg-[#E5B528] selection:text-[#06070A]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent z-10" aria-hidden />
      {/* ================= BACKGROUND ATMOSPHERE (YELLOW GRID, PARTICLES & GOLDEN GLOW) ================= */}
      <SectionAtmosphere variant="center" />

      <div className="relative z-10 mx-auto w-full max-w-6xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* ART-DIRECTED SPLIT SHOWCASE CONTAINER                   */}
        {/* ======================================================= */}
        <div className="relative w-full rounded-md overflow-hidden border border-[#E5B528]/20 shadow-[0_24px_80px_rgba(0,0,0,0.85)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
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

            {/* Unified Section Eyebrow */}
            <div className="relative z-10">
              <SectionEyebrow textColor="text-[#06070A]" className="!mb-0">
                Get In Touch
              </SectionEyebrow>
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
                  className="group inline-flex items-center gap-1.5 justify-center rounded-full bg-[#06070A] text-white pl-5 sm:pl-6 pr-4 sm:pr-5 py-2 sm:py-2.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#E5B528]/40 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
                  aria-label="Book a 15-min call with QDelta"
                >
                  <span className="font-epilogue text-xs sm:text-[13px] font-semibold text-white tracking-tight whitespace-nowrap">
                    Book a 15-min call
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#E5B528] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal font-medium text-[#06070A]/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.6)]" />
                Available for projects
              </span>
            </div>
          </div>

          {/* ===================================================== */}
          {/* RIGHT SIDE: TRANSPARENT-BLACK GRAPHITE FORM (55%)     */}
          {/* ===================================================== */}
          <div className="relative lg:col-span-7 bg-[#0B0E12]/93 backdrop-blur-md p-5 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center overflow-hidden">
            {/* Crisp Golden Top Accent Hairline */}
            <div className="absolute top-0 inset-x-12 sm:inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-[#E5B528]/50 to-transparent pointer-events-none" />

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
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5B528]/15 border border-[#E5B528]/40 text-[#E5B528] shadow-[0_0_24px_rgba(229,181,40,0.25)]">
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

                  {/* Anti-Spam Rate Limit Notice */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E5B528]/25 bg-[#E5B528]/10 px-3.5 py-1.5 text-[11px] font-epilogue text-[#E5B528]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#E5B528]" />
                    <span>30-min cooldown between submissions (Limit: {MAX_SUBMISSIONS_PER_USER} per person)</span>
                  </div>

                  {cooldownStatus.totalSubmissions >= MAX_SUBMISSIONS_PER_USER ? (
                    <p className="mt-6 text-xs font-epilogue text-zinc-400 max-w-xs leading-relaxed">
                      You have reached the maximum limit of {MAX_SUBMISSIONS_PER_USER} inquiries for this session. For any additional updates, please contact{" "}
                      <a href="mailto:hello@qdelta.in" className="text-[#E5B528] underline underline-offset-2">
                        hello@qdelta.in
                      </a>{" "}
                      directly.
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 rounded-full bg-[#E5B528] px-6 py-2.5 text-xs font-epilogue font-bold text-[#06070A] transition-all hover:bg-[#F0C034] hover:scale-105 cursor-pointer shadow-md"
                    >
                      Send Another Inquiry
                    </button>
                  )}
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
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-excon text-xl sm:text-2xl md:text-[2rem] font-bold text-white tracking-tight">
                        Start Your Project
                      </h3>
                      {cooldownStatus.isCooldown && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-epilogue text-[#E5B528] bg-[#E5B528]/10 border border-[#E5B528]/30 px-3 py-1 rounded-full shrink-0">
                          <Clock className="w-3 h-3 text-[#E5B528]" />
                          <span>{cooldownStatus.minutesRemaining}m cooldown</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs sm:text-sm font-epilogue text-zinc-400">
                      A few details are enough. (Max {MAX_SUBMISSIONS_PER_USER} submissions per person)
                    </p>
                  </div>

                  <form
                    action="https://formsubmit.co/hello@qdelta.in"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-7"
                  >
                    {/* Bot Trap: Invisible honeypot field (Catches automated scripts) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* FormSubmit.co Configuration */}
                    <input
                      type="hidden"
                      name="_subject"
                      value={`New Project Inquiry from ${name.trim() || "Website Visitor"} - QDelta`}
                    />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input
                      type="hidden"
                      name="services"
                      value={selectedServices.join(", ")}
                    />

                    {/* Name & Email (Underline Minimal Inputs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-7">
                      {/* Name */}
                      <div className="relative group">
                        <label
                          htmlFor="name"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
                        >
                          Name <span className="text-[#E5B528]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
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
                          Email <span className="text-[#E5B528]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528]"
                        />
                      </div>

                      {/* Mobile */}
                      <div className="relative group sm:col-span-2">
                        <label
                          htmlFor="mobile"
                          className="block text-xs font-epilogue uppercase tracking-widest text-zinc-400 font-medium mb-1.5 transition-colors group-focus-within:text-[#E5B528]"
                        >
                          Mobile <span className="text-[#E5B528]">*</span>
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          required
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
                        Project brief <span className="text-[#E5B528]">*</span>
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        rows={2}
                        required
                        placeholder="Tell us briefly about your project..."
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        className="w-full bg-transparent border-b border-white/15 pb-2 text-sm sm:text-base font-sans text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-[#E5B528] resize-none"
                      />
                    </div>

                    {/* Anti-Spam Active Cooldown Banner */}
                    {cooldownStatus.isCooldown && !errorMessage && (
                      <div className="rounded-md border border-[#E5B528]/30 bg-[#E5B528]/10 p-3.5 text-xs font-epilogue text-[#E5B528] flex items-center gap-2.5">
                        <Clock className="h-4 w-4 shrink-0 text-[#E5B528]" />
                        <span>
                          Anti-spam cooldown: Next inquiry submission available in{" "}
                          <strong>
                            {cooldownStatus.minutesRemaining} minute
                            {cooldownStatus.minutesRemaining > 1 ? "s" : ""}
                          </strong>{" "}
                          (Limit: {MAX_SUBMISSIONS_PER_USER} per person).
                        </span>
                      </div>
                    )}

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs font-epilogue text-amber-200 leading-relaxed">
                        <p className="font-semibold text-amber-300 mb-0.5">Notice:</p>
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    {/* Submit CTA */}
                    <div className="pt-0">
                      <ChamferButton
                        type="submit"
                        variant="primary"
                        disabled={submitting || cooldownStatus.isCooldown}
                        className="w-full text-sm font-bold tracking-wide px-8 py-3"
                      >
                        <span>
                          {submitting
                            ? "Sending Inquiry..."
                            : cooldownStatus.isCooldown
                            ? `Cooldown Active (${cooldownStatus.minutesRemaining}m left)`
                            : "Send Inquiry"}
                        </span>
                        <span
                          className={`relative inline-grid place-items-center shrink-0 w-4 h-4 text-[#06070A] ${
                            submitting
                              ? "animate-spin"
                              : "-rotate-[14deg] transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:rotate-[18deg]"
                          }`}
                          aria-hidden="true"
                        >
                          {submitting ? (
                            <svg
                              className="w-4 h-4 animate-spin text-[#06070A]"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 392.94 418.13" className="w-full h-full fill-current block">
                              <path d="M243.7,418.13C198.37,312.3,118.14,268.5,0,294.73,135.19,238.54,203.38,148.99,149.24,0c49.45,103.91,130.68,145.05,243.7,123.4-127.69,63.18-168.91,165.26-149.24,294.73Z" />
                            </svg>
                          )}
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
