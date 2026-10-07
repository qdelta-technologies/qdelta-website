"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ChamferButton from "@/components/ui/ChamferButton";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll state past hero (rAF-coalesced — avoids setState every scroll tick)
  useEffect(() => {
    let rafId = 0;
    let lastPastHero = false;

    const measure = () => {
      rafId = 0;
      const heroEl = document.getElementById("hero");
      const nextPastHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= 80
        : window.scrollY > 480;
      if (nextPastHero !== lastPastHero) {
        lastPastHero = nextPastHero;
        setIsPastHero(nextPastHero);
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div
        className="relative pointer-events-auto w-full max-w-full select-none h-[56px] min-[680px]:h-[78px]"
      >
        {/* ======================================================== */}
        {/* 1. ARCHITECTURAL GLASS FRAME & BORDERS (PURE CSS ZERO-SHIFT) */}
        {/* ======================================================== */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Glassmorphism body fill with responsive polygon clip-path */}
          <div
            className={`navbar-frame-glass absolute inset-0 w-full h-full backdrop-blur-2xl transition-colors duration-300 ${
              isPastHero ? "bg-[#06070A]/92" : "bg-[#080A0E]/78"
            }`}
          />

          {/* Top architectural reference line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-[#E5B528]/30 via-white/25 to-[#E5B528]/30" />

          {/* Left Wing Bottom Border */}
          <div className="absolute left-0 top-[43px] min-[680px]:top-[60px] w-[calc(50%-102px)] min-[680px]:w-[calc(50%-130px)] h-[1px]" style={{ background: "linear-gradient(to right, rgba(229,181,40,0.15), rgba(229,181,40,0.7))" }} />

          {/* Right Wing Bottom Border */}
          <div className="absolute right-0 top-[43px] min-[680px]:top-[60px] w-[calc(50%-102px)] min-[680px]:w-[calc(50%-130px)] h-[1px]" style={{ background: "linear-gradient(to left, rgba(229,181,40,0.15), rgba(229,181,40,0.7))" }} />

          {/* Center Keystone Notch (Desktop >= 680px: width 260px, height 78px) */}
          <svg
            width="260"
            height="78"
            viewBox="0 0 260 78"
            fill="none"
            className="hidden min-[680px]:block absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none overflow-visible"
          >
            <defs>
              <linearGradient id="navbar-gold-notch-desktop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E5B528" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#E5B528" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FFF4A3" stopOpacity="1" />
                <stop offset="80%" stopColor="#E5B528" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E5B528" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Structural bottom border */}
            <path
              d="M 0 60 L 28 78 L 232 78 L 260 60"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
            {/* Golden Keystone Accent */}
            <path
              d="M 0 60 L 28 78 L 232 78 L 260 60"
              stroke="url(#navbar-gold-notch-desktop)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>

          {/* Center Keystone Notch (Mobile < 680px: width 204px, height 56px) */}
          <svg
            width="204"
            height="56"
            viewBox="0 0 204 56"
            fill="none"
            className="block min-[680px]:hidden absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none overflow-visible"
          >
            <defs>
              <linearGradient id="navbar-gold-notch-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E5B528" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#E5B528" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FFF4A3" stopOpacity="1" />
                <stop offset="80%" stopColor="#E5B528" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E5B528" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Structural bottom border */}
            <path
              d="M 0 43 L 22 56 L 182 56 L 204 43"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
            {/* Golden Keystone Accent */}
            <path
              d="M 0 43 L 22 56 L 182 56 L 204 43"
              stroke="url(#navbar-gold-notch-mobile)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* 2. THREE-ZONE CONTENT CONTAINER (LEFT - CENTER - RIGHT)  */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full h-full">
          {/* ----------------- ZONE 1: LEFT (NAV LINKS) ----------------- */}
          <div
            className="absolute left-0 top-0 flex items-center pl-6 sm:pl-10 md:pl-12 lg:pl-16 pr-4 h-[43px] min-[680px]:h-[60px]"
          >
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 sm:gap-6 lg:gap-7" aria-label="Main Navigation">
              {NAV_LINKS.map((link, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative py-1.5 text-[13px] lg:text-[13.5px] font-epilogue font-medium text-zinc-300 hover:text-white transition-colors duration-200 tracking-wide"
                  >
                    <span>{link.label}</span>
                    {/* Subtle warm gold indicator dot on hover */}
                    {isHovered && (
                      <motion.span
                        layoutId="nav-dot-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E5B528] shadow-[0_0_6px_rgba(229, 181, 40,0.9)]"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

          </div>

          {/* ----------------- ZONE 2: CENTER (QDELTA LOGO BLOCK) ----------------- */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center h-[56px] min-[680px]:h-[78px]"
          >
            <Link
              href="/"
              className="flex items-center justify-center focus:outline-none"
              aria-label="QDelta Technologies Homepage"
            >
              <Image
                src="/images/qdelta-logo.png"
                alt="QDelta Technologies"
                width={160}
                height={48}
                className="h-7.5 sm:h-8 w-auto object-contain select-none"
                priority
              />
            </Link>
          </div>

          {/* ----------------- ZONE 3: RIGHT (MAIN CTA BUTTON & MOBILE MENU) ----------------- */}
          <div
            className="absolute right-0 top-0 flex items-center justify-end pr-6 sm:pr-10 md:pr-12 lg:pr-16 pl-4 h-[43px] min-[680px]:h-[60px]"
          >
            {/* Desktop-only CTA (xl+); hidden on mobile & tablet */}
            <div className="hidden xl:block shrink-0">
              <ChamferButton
                href="#contact"
                variant="outline"
                cutLarge={10}
                cutSmall={5}
                strokeWidth={1.5}
                className="!px-5 !py-2 text-xs sm:!text-[13px] font-bold"
              >
                <span>Contact Us</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ChamferButton>
            </div>

            {/* Mobile & tablet menu */}
            <div className="flex xl:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center text-[#E5B528] hover:text-[#F0C034] transition-colors focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[1.5]" />
                ) : (
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
                    <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MOBILE EXPANDED MENU DRAWER                           */}
        {/* ======================================================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto absolute top-full left-0 right-0 mt-2 rounded-[8px] bg-[#080A0E]/96 border border-white/12 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl xl:hidden z-50"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-[6px] text-xs font-epilogue font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5B528]/60" />
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
