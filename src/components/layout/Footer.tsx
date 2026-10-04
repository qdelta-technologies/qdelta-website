"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import YellowDotWaves from "@/components/ui/YellowDotWaves";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const SERVICES_LINKS = [
  { label: "Landing Pages", href: "#services" },
  { label: "Premium Websites", href: "#services" },
  { label: "E-commerce", href: "#services" },
  { label: "Interactive / 3D", href: "#services" },
  { label: "Design Systems", href: "#services" },
];

const COMPANY_LINKS = [
  { label: "Why QDelta", href: "#why-qdelta" },
  { label: "Our Work", href: "#projects" },
  { label: "Our Process", href: "#process" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const CONNECT_LINKS = [
  { label: "Start a Project", href: "#contact", highlight: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/qdelta-technologies", external: true },
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "Email", href: "mailto:hello@qdelta.in", external: true },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#06070A] pb-8 sm:pb-12 pt-2 px-4 sm:px-6 lg:px-8 relative z-20 overflow-hidden">
      {/* ======================================================= */}
      {/* FLOATING ROUNDED FOOTER CONTAINER (GRAPHITE & GOLD)     */}
      {/* ======================================================= */}
      <div className="relative w-full max-w-6xl xl:max-w-7xl mx-auto rounded-xl sm:rounded-2xl md:rounded-[20px] bg-[#0B0E12]/90 backdrop-blur-md text-white border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.95)] px-6 py-9 sm:px-10 sm:py-12 md:px-12 md:py-14 overflow-hidden flex flex-col justify-between">
        
        {/* Top Glowing Golden Horizon Accent Hairline */}
        <div className="absolute top-0 inset-x-12 sm:inset-x-20 h-[1px] bg-gradient-to-r from-transparent via-[#E7B72A]/35 to-transparent pointer-events-none" />

        {/* Ambient Warm Golden Backlight */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[38rem] h-[16rem] rounded-full bg-[#E7B72A]/[0.035] blur-[140px]" />

        {/* ================= UPPER SECTION: 4-COLUMN COMPOSITION ================= */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-14">
          {/* LEFT SIDE: Brand & Socials */}
          <div className="lg:col-span-5 max-w-sm flex flex-col justify-between">
            <div>
              {/* Brand Logo (Matching Header) */}
              <Link href="/" className="inline-block focus:outline-none group">
                <Image
                  src="/images/qdelta-logo.png"
                  alt="QDelta Technologies"
                  width={160}
                  height={52}
                  className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                />
              </Link>

              {/* Short Description */}
              <p className="mt-3.5 text-xs sm:text-sm font-epilogue text-zinc-400 leading-relaxed font-normal">
                Websites that speak for your brand and work for your business.
              </p>
            </div>

            {/* Social Icons (Black & Gold Interaction) */}
            <div className="flex items-center gap-2.5 mt-5 sm:mt-7">
              <a
                href="https://www.linkedin.com/company/qdelta-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-[#E7B72A] hover:text-[#06070A] hover:border-[#E7B72A] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-[#E7B72A] hover:text-[#06070A] hover:border-[#E7B72A] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-[#E7B72A] hover:text-[#06070A] hover:border-[#E7B72A] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-[#E7B72A] hover:text-[#06070A] hover:border-[#E7B72A] transition-all duration-200 cursor-pointer shadow-sm"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: 3 Minimal Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-7 sm:gap-9">
            {/* COLUMN 1: Services */}
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7B72A]" />
                <h4 className="font-epilogue font-bold text-xs uppercase tracking-wider text-white">
                  Services
                </h4>
              </div>
              <ul className="space-y-2">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-epilogue text-xs sm:text-[13px] text-zinc-400 hover:text-[#E7B72A] transition-colors duration-150 inline-block font-normal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: Company */}
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7B72A]" />
                <h4 className="font-epilogue font-bold text-xs uppercase tracking-wider text-white">
                  Company
                </h4>
              </div>
              <ul className="space-y-2">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-epilogue text-xs sm:text-[13px] text-zinc-400 hover:text-[#E7B72A] transition-colors duration-150 inline-block font-normal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Connect */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E7B72A]" />
                <h4 className="font-epilogue font-bold text-xs uppercase tracking-wider text-white">
                  Connect
                </h4>
              </div>
              <ul className="space-y-2">
                {CONNECT_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-epilogue text-xs sm:text-[13px] text-zinc-400 hover:text-[#E7B72A] transition-colors duration-150 inline-block font-normal"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`font-epilogue text-xs sm:text-[13px] transition-colors duration-150 inline-flex items-center gap-1 font-semibold ${
                          link.highlight
                            ? "text-[#E7B72A] hover:text-white"
                            : "text-zinc-400 hover:text-[#E7B72A]"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.highlight && <ArrowUpRight className="w-3.5 h-3.5" />}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= LOWER SECTION: DIVIDER & LEGAL ================= */}
        <div className="relative z-10 pt-5 sm:pt-7 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-epilogue text-zinc-500">
          <p className="text-center sm:text-left">
            © 2026 QDelta Technologies. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="#contact"
              className="text-zinc-400 hover:text-[#E7B72A] transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="#contact"
              className="text-zinc-400 hover:text-[#E7B72A] transition-colors duration-150"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* ================= LARGE BRAND ELEMENT: OVERSIZED QDELTA ================= */}
        <div className="relative w-full pt-4 sm:pt-6 pb-6 sm:pb-10 pointer-events-none select-none flex items-center justify-center">
          <div className="font-excon font-bold tracking-tight text-[15vw] lg:text-[13vw] leading-[1.05] text-center text-[#E7B72A]/[0.05] uppercase">
            QDELTA
          </div>
        </div>

        {/* ================= BOTTOM BORDER YELLOW DOT WAVE & GRASS ACCENT ================= */}
        <YellowDotWaves className="absolute bottom-0 inset-x-0 w-full h-8 sm:h-10 pointer-events-none z-20" />

      </div>
    </footer>
  );
}

