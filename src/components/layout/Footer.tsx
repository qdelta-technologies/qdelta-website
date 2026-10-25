"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import YellowDotWaves from "@/components/ui/YellowDotWaves";

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

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

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

const SERVICES_LINKS = [
  { label: "Landing Pages", href: "/services/high-converting-landing-pages" },
  { label: "Business Websites", href: "/services/business-website-design" },
  { label: "Portfolio & Author Sites", href: "/services/portfolio-and-author-websites" },
  { label: "E-commerce Stores", href: "/services/ecommerce-website-design" },
  { label: "Web & App Development", href: "/services/web-app-development" },
  { label: "AI Chatbots", href: "/services/ai-chatbot-for-business" },
];

const QUICK_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        const h = containerRef.current.offsetHeight;
        if (w > 0 && h > 0) {
          setSize({ w, h });
        }
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const w = size.w || 1200;
  const h = size.h || 420;
  const isMobile = size.w > 0 && size.w < 640;
  const cut = isMobile ? 22 : 34;
  const strokeWidth = 1.5;
  const inset = strokeWidth / 2;

  // Exact 8-point chamfered path (matching the chamfered button geometry)
  const pathD = `
    M ${cut} ${inset}
    L ${w - cut} ${inset}
    L ${w - inset} ${cut}
    L ${w - inset} ${h - cut}
    L ${w - cut} ${h - inset}
    L ${cut} ${h - inset}
    L ${inset} ${h - cut}
    L ${inset} ${cut}
    Z
  `;

  // Hardware-accelerated CSS polygon clip-path for pixel-accurate hit testing and clipping
  const clipPathStyle = `polygon(
    ${cut}px 0px,
    calc(100% - ${cut}px) 0px,
    100% ${cut}px,
    100% calc(100% - ${cut}px),
    calc(100% - ${cut}px) 100%,
    ${cut}px 100%,
    0px calc(100% - ${cut}px),
    0px ${cut}px
  )`;

  return (
    <footer className="w-full bg-[#06070A] pb-8 sm:pb-12 pt-6 px-4 sm:px-6 lg:px-8 relative z-20 overflow-hidden">
      {/* ================= VISIBLE ARCHITECTURAL GRID IN FOOTER BACKGROUND (NO GRADIENT) ================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(250, 180, 6, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(250, 180, 6, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "center top",
          }}
        />
      </div>

      {/* ======================================================= */}
      {/* CHAMFERED OCTAGON FOOTER CONTAINER (GRAPHITE & GOLD)    */}
      {/* ======================================================= */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto drop-shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
        <div
          ref={containerRef}
          className="relative w-full bg-[#0B0E12] text-white px-6 py-9 sm:px-10 sm:py-12 md:px-12 md:py-14 overflow-hidden flex flex-col justify-between transition-all duration-300"
          style={{ clipPath: clipPathStyle }}
        >
          {/* ================= UNIFORM GREY 8-EDGE PRECISION CHAMFER BORDER ================= */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-30"
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
          >
            {/* Complete 8-point chamfered perimeter border in uniform clean grey across all sides and corners */}
            <path
              d={pathD}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={strokeWidth}
              strokeLinejoin="miter"
              strokeMiterlimit={4}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

        {/* ================= UPPER SECTION: 4-COLUMN COMPOSITION ================= */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 sm:mb-14">
          {/* LEFT SIDE: Brand & Direct Contacts */}
          <div className="lg:col-span-5 xl:col-span-4 max-w-sm flex flex-col justify-between">
            <div>
              {/* Brand Logo (Matching Header) */}
              <Link href="/" className="inline-block focus:outline-none group">
                <Image
                  src="/images/qdelta-logo-v8.png"
                  alt="QDelta Technologies"
                  width={160}
                  height={60}
                  className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                />
              </Link>

              {/* Authoritative Brand Tagline */}
              <p className="mt-3.5 text-xs sm:text-sm font-epilogue text-zinc-400 leading-relaxed font-normal">
                Turning ideas into high-impact digital experiences. Designed with purpose, built for performance, and engineered to grow your business.
              </p>

              {/* Direct Contacts Block */}
              <div className="mt-4 space-y-2">
                <a
                  href="mailto:hello@qdelta.in"
                  className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-300 hover:text-[#FAB406] transition-colors font-medium group"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/25 text-[#FAB406] group-hover:bg-[#FAB406]/20 transition-all">
                    <MailIcon className="w-3 h-3" />
                  </span>
                  <span>hello@qdelta.in</span>
                </a>

                <div className="flex items-center">
                  <a
                    href="mailto:qdelta.in@gmail.com"
                    className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-300 hover:text-[#FAB406] transition-colors font-medium group"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/25 text-[#FAB406] group-hover:bg-[#FAB406]/20 transition-all">
                      <MailIcon className="w-3 h-3" />
                    </span>
                    <span>qdelta.in@gmail.com</span>
                  </a>
                </div>

                <div className="flex items-center">
                  <a
                    href="tel:+917815895689"
                    className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-300 hover:text-[#FAB406] transition-colors font-medium group"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/25 text-[#FAB406] group-hover:bg-[#FAB406]/20 transition-all">
                      <PhoneIcon className="w-3 h-3" />
                    </span>
                    <span>+91 78158 95689</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social & Contact Icons — brand-colored buttons */}
            <div className="flex items-center gap-2.5 mt-5 sm:mt-7">
              <a
                href="https://www.instagram.com/qdelta.in?srtk=c2l2djJwazQ2b3Uy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/qdelta_agency"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/company/qdelta/home/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href="mailto:hello@qdelta.in"
                aria-label="Email"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <MailIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917815895689?text=Hi%20QDelta%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20get%20more%20information."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:+917815895689"
                aria-label="Call"
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#FAB406]/10 border border-[#FAB406]/30 text-[#FAB406] hover:bg-[#FAB406]/25 hover:border-[#FAB406] hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: 3 Structured Columns */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1.35fr] gap-6 sm:gap-8 lg:gap-8">
            {/* COLUMN 1: Services */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.6)]" />
                <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/90">
                  Services
                </h4>
              </div>
              <ul className="space-y-2.5">
                {SERVICES_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-[#FAB406] group-hover:scale-125 transition-all duration-200 opacity-60 group-hover:opacity-100" />
                      <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FAB406]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: Quick Links (Exact Nav Links) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB406] shadow-[0_0_8px_rgba(250,180,6,0.6)]" />
                <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/90">
                  Quick Links
                </h4>
              </div>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 font-epilogue text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-all duration-200"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-[#FAB406] group-hover:scale-125 transition-all duration-200 opacity-60 group-hover:opacity-100" />
                      <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FAB406]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Enterprise Trust & Status */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-4 sm:gap-4.5">
              {/* Live Availability Status */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-epilogue text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-zinc-300 font-medium">Available for new projects</span>
              </div>

              {/* MSME Ministry Official Logo */}
              <div className="pt-0.5">
                <Image
                  src="/images/msme-logo-dark.png"
                  alt="MSME Registered Enterprise, Govt. of India"
                  width={260}
                  height={114}
                  className="h-10 sm:h-11 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
                />
                <p className="mt-1.5 text-[11px] sm:text-xs font-epilogue text-zinc-400 font-medium">
                  MSME Registered Enterprise
                </p>
              </div>

              {/* Subtle architectural divider */}
              <div className="w-full h-px bg-white/[0.08] my-1" />

              {/* Legal Links (Privacy Policy & Terms) */}
              <div className="flex flex-row items-center gap-2">
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-[#FAB406] hover:border-[#FAB406]/40 hover:bg-[#FAB406]/5 transition-all text-[11px] sm:text-xs whitespace-nowrap font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-[#FAB406] hover:border-[#FAB406]/40 hover:bg-[#FAB406]/5 transition-all text-[11px] sm:text-xs whitespace-nowrap font-medium"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOWER SECTION: DIVIDER & COPYRIGHT ================= */}
        <div className="relative z-10 pt-5 sm:pt-6 border-t border-white/[0.08] text-xs font-epilogue text-zinc-500">
          <div className="flex items-center justify-center sm:justify-end text-center sm:text-right">
            <p>© 2026 QDelta Technologies. All rights reserved.</p>
          </div>
        </div>

        {/* ================= BOTTOM BORDER YELLOW DOT WAVE & GRASS ACCENT ================= */}
        <YellowDotWaves className="absolute bottom-0 inset-x-0 w-full h-8 sm:h-10 pointer-events-none z-20" />

      </div>
    </div>
  </footer>
  );
}

