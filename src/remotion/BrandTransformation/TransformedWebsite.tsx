import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Lock, Layers, Search } from "lucide-react";

interface TransformedWebsiteProps {
  isHovered?: boolean;
}

export const TransformedWebsite: React.FC<TransformedWebsiteProps> = ({ isHovered = false }) => {
  return (
    <div
      className="w-full h-full bg-[#06070A] text-white flex flex-col overflow-hidden select-none border border-[#E5B528]/40 shadow-[0_0_100px_rgba(245,184,0,0.2)] rounded-2xl relative"
      style={{ fontFamily: "'Satoshi', 'Alata', -apple-system, BlinkMacSystemFont, sans-serif", letterSpacing: "0.02em" }}
    >
      {/* Ambient Top & Bottom Gold Horizon Halos */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[54rem] h-64 bg-gradient-to-b from-[#E5B528]/25 via-[#E5B528]/5 to-transparent blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-20 inset-x-0 h-48 bg-gradient-to-t from-[#E5B528]/20 via-[#E5B528]/5 to-transparent blur-[80px]" />

      {/* Modern Browser Chrome */}
      <div className="h-14 bg-[#0B0E12] border-b border-white/10 px-6 flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#E5B528] shadow-[0_0_10px_rgba(245,184,0,0.9)]" />
          <div className="w-3.5 h-3.5 rounded-full bg-white/20" />
          <div className="w-3.5 h-3.5 rounded-full bg-white/20" />
        </div>
        <div className="h-8 w-[440px] max-w-[45%] bg-[#0B0E12] rounded-md border border-slate-800 flex items-center px-3.5 text-xs text-slate-500 gap-2 font-mono">
          <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate text-xs text-slate-400">https://www.novacraft-studio.com</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>EN</span>
          <Search className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Transformed Premium Navbar — Same brand, premium execution */}
      <div className="h-20 border-b border-white/10 bg-[#06070A]/85 backdrop-blur-md px-12 flex items-center justify-between shrink-0 relative z-10">
        {/* Same Brand Logo — Now elevated */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5B528] to-[#D9A51A] flex items-center justify-center shadow-[0_0_18px_rgba(245,184,0,0.6)]">
            <Layers className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-bold text-white text-lg tracking-tight block">NovaCraft</span>
            <span className="text-[10px] text-[#E5B528] uppercase tracking-[0.2em] block font-mono font-medium">Creative Studio</span>
          </div>
        </div>

        {/* Floating Capsule Dock */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#0B0E12]/90 px-3 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center gap-6 px-3 text-xs font-medium text-zinc-300">
            <span className="text-white hover:text-[#E5B528] cursor-pointer">Home</span>
            <span className="hover:text-[#E5B528] cursor-pointer">About</span>
            <span className="hover:text-[#E5B528] cursor-pointer">Services</span>
            <span className="hover:text-[#E5B528] cursor-pointer">Work</span>
            <span className="hover:text-[#E5B528] cursor-pointer">Contact</span>
          </div>
          <div className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#E5B528] px-4 py-1.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(245,184,0,0.5)]">
            <span>Start a Project</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Transformed Hero Showcase */}
      <div className="flex-1 p-12 lg:p-16 flex flex-row items-center justify-between gap-14 relative z-10">
        {/* Left Column: Premium Typography & Hierarchy in Alata */}
        <div className="flex-1 max-w-2xl space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5B528]/10 border border-[#E5B528]/35 text-xs font-semibold tracking-wider text-[#E5B528] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#E5B528]" />
            <span>REDESIGNED BY QDELTA • HIGH CONVERSION</span>
          </div>

          <h1
            className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Alata', sans-serif" }}
          >
            We craft brands <br />
            <span
              className="text-[#E5B528] font-extrabold italic drop-shadow-[0_0_35px_rgba(245,184,0,0.5)]"
              style={{ fontFamily: "'Alata', sans-serif" }}
            >
              that command attention.
            </span>
          </h1>

          <p
            className="text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            Award-winning creative studio delivering bespoke digital experiences that captivate audiences and convert visitors into loyal clients.
          </p>

          <div className="flex items-center gap-5 pt-3">
            <div
              className={`px-8 py-4 rounded-full font-bold text-sm lg:text-base flex items-center gap-3 transition-all duration-300 ${
                isHovered
                  ? "bg-white text-black shadow-[0_0_40px_rgba(245,184,0,1)] scale-105"
                  : "bg-[#E5B528] text-black shadow-[0_0_30px_rgba(245,184,0,0.7)]"
              }`}
              style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
              <span>Start a Project</span>
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#E5B528]" />
              <span>Built by QDelta</span>
            </div>
          </div>

          {/* Luxury Metric Badges */}
          <div className="grid grid-cols-2 gap-5 pt-7 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <Zap className="w-4 h-4 text-[#E5B528]" />
              <span><strong>0.4s</strong> Ultra-Fast Load Speed</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span><strong>+340%</strong> Conversion Growth</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Glassmorphic 3D Card */}
        <div className="w-[500px] h-[380px] rounded-2xl p-7 flex flex-col justify-between relative bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/20 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Card Ambient Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#E5B528]/25 rounded-full blur-2xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#E5B528] shadow-[0_0_10px_#E5B528]" />
              <span className="text-sm font-semibold text-white tracking-wide">Live Revenue Engine</span>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 font-semibold">
              +340% Active
            </span>
          </div>

          {/* Visual Showcase: Animated Graph and Stats */}
          <div className="space-y-4 py-2 relative z-10">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs text-zinc-400 font-medium">MONTHLY CONVERSIONS</div>
                <div className="text-3xl font-extrabold text-white">$142,800</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-400 font-medium">BOUNCE RATE</div>
                <div className="text-xl font-bold text-emerald-400">14.2% (-60%)</div>
              </div>
            </div>

            {/* Glowing Wave Chart SVG */}
            <div className="h-24 w-full relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 420 80">
                <defs>
                  <linearGradient id="chartGlowTransform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E5B528" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E5B528" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 70 Q 105 60 210 40 T 420 12 L 420 80 L 0 80 Z"
                  fill="url(#chartGlowTransform)"
                />
                <path
                  d="M 0 70 Q 105 60 210 40 T 420 12"
                  fill="none"
                  stroke="#E5B528"
                  strokeWidth="3.5"
                  filter="drop-shadow(0 0 10px rgba(245,184,0,0.9))"
                />
                <circle cx="420" cy="12" r="6" fill="#FFFFFF" stroke="#E5B528" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* Card Footer Micro-Tags */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400 relative z-10">
            <span>Next.js 16 • Tailwind v4</span>
            <span className="text-[#E5B528] font-semibold">Built by QDelta</span>
          </div>
        </div>
      </div>
    </div>
  );
};
