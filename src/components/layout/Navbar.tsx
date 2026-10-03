"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState<number>(1200);

  // Monitor scroll state past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // User has scrolled past hero when hero bottom is near the top
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(window.scrollY > 480);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure navbar width dynamically for responsive precision SVG geometry
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setNavWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    window.addEventListener("resize", updateWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const cx = navWidth / 2;
  const isMobile = navWidth < 680;

  // Architectural frame dimensions (sleeker sizing)
  const H1 = isMobile ? 52 : 60; // Wing height (px)
  const H2 = isMobile ? 68 : 78; // Center notch height (px)
  // Width parameters for center notch with comfortable, balanced proportions
  const notchFlatHalf = isMobile ? 80 : 102; // Half of flat bottom under logo
  const chamferWidth = isMobile ? 22 : 28; // Horizontal span of angled chamfer

  const x1 = 0;
  const x2 = Math.max(0, cx - notchFlatHalf - chamferWidth);
  const x3 = Math.max(0, cx - notchFlatHalf);
  const x4 = Math.min(navWidth, cx + notchFlatHalf);
  const x5 = Math.min(navWidth, cx + notchFlatHalf + chamferWidth);
  const x6 = navWidth;

  // Exact polygon path of the architectural navbar
  const framePath = `
    M 0 0
    L ${x6} 0
    L ${x6} ${H1}
    L ${x5} ${H1}
    L ${x4} ${H2}
    L ${x3} ${H2}
    L ${x2} ${H1}
    L 0 ${H1}
    Z
  `;

  // Perimeter architectural line contour (excluding top edge)
  const bottomContourPath = `
    M 0 ${H1}
    L ${x2} ${H1}
    L ${x3} ${H2}
    L ${x4} ${H2}
    L ${x5} ${H1}
    L ${x6} ${H1}
  `;

  // Gold accent line trace highlighting the center keystone notch
  const notchAccentPath = `
    M ${x2} ${H1}
    L ${x3} ${H2}
    L ${x4} ${H2}
    L ${x5} ${H1}
  `;

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div
        ref={containerRef}
        className="relative pointer-events-auto w-full max-w-full select-none"
        style={{ height: `${H2}px` }}
      >
        {/* ======================================================== */}
        {/* 1. ARCHITECTURAL SVG GEOMETRY FRAME & GLASS SURFACE     */}
        {/* ======================================================== */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg
            suppressHydrationWarning
            width={navWidth}
            height={H2}
            viewBox={`0 0 ${navWidth} ${H2}`}
            className="w-full h-full"
            fill="none"
          >
            <defs>
              {/* Subtle gold gradient for the center notch edge */}
              <linearGradient id="navbar-gold-notch" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FAB406" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FFF4A3" stopOpacity="1" />
                <stop offset="80%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FAB406" stopOpacity="0.2" />
              </linearGradient>

              {/* Top subtle horizon shimmer */}
              <linearGradient id="navbar-top-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FAB406" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FAB406" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Glassmorphism body fill */}
            <path
              suppressHydrationWarning
              d={framePath}
              fill={isPastHero ? "rgba(6, 7, 10, 0.92)" : "rgba(8, 10, 14, 0.78)"}
              className="backdrop-blur-2xl transition-colors duration-300"
            />

            {/* Perimeter crisp 1px architectural border */}
            <path
              suppressHydrationWarning
              d={framePath}
              stroke="rgba(255, 255, 255, 0.09)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Bottom structural outline */}
            <path
              suppressHydrationWarning
              d={bottomContourPath}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Golden Keystone Accent: Angled cuts + notch base */}
            <path
              suppressHydrationWarning
              d={notchAccentPath}
              stroke="url(#navbar-gold-notch)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Top architectural reference line */}
            <line
              suppressHydrationWarning
              x1="0"
              y1="0"
              x2={navWidth}
              y2="0"
              stroke="url(#navbar-top-shimmer)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* ======================================================== */}
        {/* 2. THREE-ZONE CONTENT CONTAINER (LEFT - CENTER - RIGHT)  */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full h-full">
          {/* ----------------- ZONE 1: LEFT (NAV LINKS) ----------------- */}
          <div
            className="absolute left-0 top-0 flex items-center pl-6 sm:pl-10 md:pl-12 lg:pl-16 pr-4"
            style={{ height: `${H1}px` }}
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
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FAB406] shadow-[0_0_6px_rgba(250,180,6,0.9)]"
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
            className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center"
            style={{ height: `${H2}px` }}
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
            className="absolute right-0 top-0 flex items-center justify-end pr-6 sm:pr-10 md:pr-12 lg:pr-16 pl-4"
            style={{ height: `${H1}px` }}
          >
            {/* Desktop CTA */}
            <Link
              href="#contact"
              className="group relative hidden lg:inline-flex items-center gap-2 h-9 sm:h-9.5 px-4.5 sm:px-5.5 rounded-[6px] border border-[#FAB406]/70 bg-[#FAB406] text-[#06070A] font-epilogue font-bold text-xs sm:text-[13px] tracking-tight shadow-[0_0_16px_rgba(250,180,6,0.25)] hover:shadow-[0_0_26px_rgba(250,180,6,0.48)] hover:bg-[#ffbe1a] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>Let’s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-[#06070A] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Mobile Menu Trigger Button */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center w-8.5 h-8.5 rounded-[6px] bg-white/[0.04] border border-white/12 text-zinc-300 hover:text-white hover:border-[#FAB406]/40 transition-colors focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Menu className="w-4 h-4 stroke-[2]" />
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
              className="pointer-events-auto absolute top-full left-0 right-0 mt-2 rounded-[8px] bg-[#080A0E]/96 border border-white/12 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl lg:hidden z-50"
            >
              <nav className="flex flex-col gap-1 pb-3 border-b border-white/[0.08]">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-[6px] text-xs font-epilogue font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406]/60" />
                  </Link>
                ))}
              </nav>

              <div className="pt-3">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-center gap-2 w-full h-9 rounded-[6px] bg-[#FAB406] text-[#06070A] font-epilogue font-semibold text-xs tracking-tight shadow-[0_0_14px_rgba(250,180,6,0.3)] transition-all"
                >
                  <span>Let’s Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
