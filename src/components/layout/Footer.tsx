"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#040406] text-white border-t border-white/[0.08] relative z-20">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 sm:px-10 md:px-14 sm:pt-20">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 sm:gap-12">
          {/* Left Brand Identity */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/images/qdelta-logo.png"
                alt="QDelta Technologies"
                width={160}
                height={52}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              Digital experiences for a better tomorrow.
            </p>
          </div>

          {/* Right Navigation Columns */}
          <div className="flex flex-wrap items-start gap-12 sm:gap-20">
            {/* Overview Column */}
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3 sm:mb-4">
                Overview
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                <li>
                  <Link href="#services" className="transition-colors duration-200 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#packages" className="transition-colors duration-200 hover:text-white">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="transition-colors duration-200 hover:text-white">
                    Process
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase mb-3 sm:mb-4">
                Connect
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
                <li>
                  <Link
                    href="#contact"
                    className="font-medium text-[#FAB406] transition-colors duration-200 hover:text-[#F6A803]"
                  >
                    Start a Project
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@qdelta.in"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    hello@qdelta.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Row */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-zinc-400 select-none">
              Q
            </span>
            <span>© 2026 QDelta Technologies</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="#privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="group flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
