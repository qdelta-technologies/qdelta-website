"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ChamferButton from "@/components/ui/ChamferButton";

const NAV_LINKS = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "Process", href: "#process", sectionId: "process" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Team", href: "#team", sectionId: "team" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll state past hero (rAF-coalesced — avoids setState every scroll tick)
  useEffect(() => {
    let rafId = 0;
    let lastPastHero = false;

    let heroEnd = 480;
    const measureHero = () => {
      const heroEl = document.getElementById("hero");
      heroEnd = heroEl ? heroEl.getBoundingClientRect().bottom + window.scrollY : 480 + 80;
    };

    const measure = () => {
      rafId = 0;
      const nextPastHero = window.scrollY >= heroEnd - 80;
      if (nextPastHero !== lastPastHero) {
        lastPastHero = nextPastHero;
        setIsPastHero(nextPastHero);
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(measure);
    };

    measureHero();
    const resizeObserver = new ResizeObserver(() => {
      measureHero();
      measure();
    });
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", handleScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Precise Active Section Scroll-Spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY;

      // 1. Unconditional Hero Check:
      // When user is anywhere at or near Hero (top of page), NO nav link must be active.
      if (scrollPos < 350) {
        setActiveSection(null);
        return;
      }

      // Check boundary of About section (the very first navigation item).
      // If the scroll position has not yet reached About, the user is still in the Hero / TrustBar zone.
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const aboutTop = aboutEl.getBoundingClientRect().top + scrollPos;
        if (aboutTop > 300 && scrollPos < aboutTop - 180) {
          setActiveSection(null);
          return;
        }
      } else {
        // If about section hasn't mounted yet and scroll is under 600, stay null
        if (scrollPos < 600) {
          setActiveSection(null);
          return;
        }
      }

      // Check if scrolled near the bottom of page (highlight Contact)
      const isAtBottom =
        window.innerHeight + scrollPos >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // 2. Track sections in DOM order from bottom to top
      const sections = NAV_LINKS.map((l) => l.sectionId);
      const navOffset = 180;
      let found: string | null = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const sectionDocTop = el.getBoundingClientRect().top + scrollPos;
          // Must be a valid rendered section with height and position below hero
          if (sectionDocTop > 300 && el.offsetHeight > 50) {
            if (scrollPos >= sectionDocTop - navOffset) {
              found = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(found);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScrollSpy();
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run immediately on mount
    handleScrollSpy();

    // Also run a short delayed check after dynamic components hydrate
    const timeoutId = setTimeout(handleScrollSpy, 150);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth scroll handler for nav clicks
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        const navOffset = 70;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navOffset,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
        setActiveSection(sectionId);
      }
      setMobileMenuOpen(false);
    }
  };

  // Center logo click handler -> smooth redirect to hero
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "/");
    setActiveSection(null);
    setMobileMenuOpen(false);
  };

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
            className="navbar-frame-glass absolute inset-0 w-full h-full backdrop-blur-lg bg-[#06070A]/40"
          />

          {/* Top architectural reference line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-[#FAB406]/30 via-white/25 to-[#FAB406]/30" />

          {/* Left Wing Bottom Border */}
          <div className="absolute left-0 top-[43px] min-[680px]:top-[60px] w-[calc(50%-102px)] min-[680px]:w-[calc(50%-130px)] h-[1px]" style={{ background: "linear-gradient(to right, rgba(250,180,6,0.15), rgba(250,180,6,0.7))" }} />

          {/* Right Wing Bottom Border */}
          <div className="absolute right-0 top-[43px] min-[680px]:top-[60px] w-[calc(50%-102px)] min-[680px]:w-[calc(50%-130px)] h-[1px]" style={{ background: "linear-gradient(to left, rgba(250,180,6,0.15), rgba(250,180,6,0.7))" }} />

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
                <stop offset="0%" stopColor="#FAB406" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FFF4A3" stopOpacity="1" />
                <stop offset="80%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FAB406" stopOpacity="0.2" />
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
                <stop offset="0%" stopColor="#FAB406" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#FFF4A3" stopOpacity="1" />
                <stop offset="80%" stopColor="#FAB406" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FAB406" stopOpacity="0.2" />
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
            className="absolute left-0 top-0 flex items-center pl-5 sm:pl-8 md:pl-10 lg:pl-12 xl:pl-14 pr-4 h-[43px] min-[680px]:h-[60px]"
          >
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 sm:gap-4.5 lg:gap-5 xl:gap-6" aria-label="Main Navigation">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative py-1.5 text-[13px] lg:text-[13.5px] font-epilogue font-medium transition-colors duration-200 tracking-wide cursor-pointer ${
                      isActive ? "text-[#FAB406] font-semibold" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
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
              href="#hero"
              onClick={handleLogoClick}
              className="flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label="QDelta Technologies Homepage"
            >
              <Image
                src="/images/qdelta-logo.png"
                alt="QDelta Technologies"
                width={160}
                height={48}
                className="h-7.5 sm:h-8 w-auto object-contain select-none transition-transform duration-200 hover:scale-105 active:scale-95"
                priority
              />
            </Link>
          </div>

          {/* ----------------- ZONE 3: RIGHT (MAIN CTA BUTTON & MOBILE MENU) ----------------- */}
          <div
            className="absolute right-0 top-0 flex items-center justify-end pr-6 sm:pr-10 md:pl-12 lg:pr-16 pl-4 h-[43px] min-[680px]:h-[60px]"
          >
            {/* Desktop-only CTA (xl+); hidden on mobile & tablet */}
            <div className="hidden xl:block shrink-0">
              <ChamferButton
                href="#contact"
                variant="primary"
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
                className="flex items-center justify-center text-[#FAB406] hover:text-[#FFC015] transition-colors focus:outline-none cursor-pointer"
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
              className="pointer-events-auto absolute top-full left-0 right-0 mt-2 rounded-[8px] bg-[#080A0E]/96 border border-white/12 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-md xl:hidden z-50"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.sectionId;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                      className={`px-3 py-2 rounded-[6px] text-xs font-epilogue font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? "text-[#FAB406] bg-[#FAB406]/10 font-bold"
                          : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#FAB406]" : "bg-white/20"}`} />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
