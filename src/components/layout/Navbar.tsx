import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SaffronButton from "@/components/ui/SaffronButton";

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
          <SaffronButton href="#contact" size="sm" variant="white" className="ml-1.5 !h-8 text-xs px-4">
            Start a Project
          </SaffronButton>
        </div>

        {/* Mobile Action Button */}
        <div className="flex md:hidden">
          <SaffronButton href="#contact" size="sm" variant="primary" className="!h-8 text-[11px] px-3.5">
            Start a Project
          </SaffronButton>
        </div>
      </div>
    </header>
  );
}
