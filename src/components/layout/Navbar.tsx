import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full transition-all">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-8 md:px-10 lg:px-12 xl:px-14">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 focus:outline-none shrink-0">
          <Image
            src="/images/qdelta-logo.png"
            alt="QDelta Technologies"
            width={160}
            height={52}
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            priority
          />
        </Link>

        {/* Center / Right Floating Capsule Dock */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#0e0e14]/80 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <nav className="flex items-center gap-0.5 px-1.5">
            <Link
              href="#services"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Services
            </Link>
            <Link
              href="#packages"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Packages
            </Link>
            <Link
              href="#process"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Process
            </Link>
            <Link
              href="#projects"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Projects
            </Link>
            <Link
              href="#team"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Team
            </Link>
            <Link
              href="#contact"
              className="rounded-full px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white hover:bg-white/5"
            >
              Contact
            </Link>
          </nav>

          {/* Integrated Start a Project Button */}
          <Link
            href="#contact"
            className="group ml-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs lg:text-[13px] font-semibold text-black shadow-sm transition-all duration-300 hover:bg-[#FAB406] hover:shadow-[0_0_24px_rgba(250,180,6,0.45)] hover:scale-[1.02]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Action Button */}
        <div className="flex md:hidden">
          <Link
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-[#FAB406] px-3.5 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-xs font-semibold text-black shadow-[0_0_15px_rgba(250,180,6,0.35)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
