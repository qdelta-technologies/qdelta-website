import React from "react";
import { AlertTriangle, ArrowRight, Globe, Search, Layers, FileText, Database } from "lucide-react";

export const OrdinaryWebsite: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#12141a] text-[#8e95a5] font-sans flex flex-col overflow-hidden select-none border border-slate-700/60 shadow-2xl rounded-2xl">
      {/* Browser Top Chrome */}
      <div className="h-14 bg-[#1a1d26] border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#475569]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#475569]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#475569]" />
        </div>
        <div className="h-8 w-[420px] max-w-[45%] bg-[#0c0e12] rounded-md border border-slate-800 flex items-center px-3.5 text-xs text-slate-500 gap-2 font-mono">
          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">https://www.novacraft-studio.com</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>EN</span>
          <Search className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Ordinary Navbar */}
      <div className="h-20 border-b border-slate-800/80 bg-[#12141a] px-12 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            <Layers className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <span className="font-semibold text-slate-200 text-base tracking-tight block">NovaCraft Studio</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Creative Agency</span>
          </div>
        </div>
        <div className="flex items-center gap-8 text-sm text-slate-400">
          <span className="text-slate-300">Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Work</span>
          <span>Contact</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 font-medium">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Ordinary Hero Content */}
      <div className="flex-1 p-12 lg:p-16 flex flex-row items-center justify-between gap-12 bg-[#12141a]">
        {/* Left Column */}
        <div className="flex-1 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-950/40 border border-rose-800/40 rounded-full text-xs text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Outdated Template • 76% Visitor Drop-off</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-normal text-slate-200 leading-[1.18] tracking-tight">
            Creative digital agency building websites & brands
          </h1>

          <p className="text-sm lg:text-base text-slate-400 leading-relaxed max-w-xl">
            We are a creative studio specializing in web design, branding, and digital marketing. We help businesses grow their online presence with modern solutions.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="px-6 py-3 bg-blue-600/80 text-white text-sm rounded-md font-medium flex items-center gap-2 shadow-sm">
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="px-5 py-3 border border-slate-700 text-slate-400 text-sm rounded-md flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Our Brochure</span>
            </div>
          </div>

          {/* Cluttered bullet list */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              <span>Load Time: 3.8s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500/60" />
              <span>Conversion Rate: 0.9%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Cluttered Dashboard Preview */}
        <div className="w-[460px] h-[360px] bg-[#171a22] border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-xs text-slate-300 font-mono">STAGNANT PERFORMANCE</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">BASIC ANALYTICS</span>
          </div>

          <div className="space-y-4 py-2">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[11px] text-slate-500 font-mono">BOUNCE RATE</div>
                <div className="text-2xl font-bold text-rose-400 font-mono">76.4% ↑</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-500 font-mono">LEAD CONVERSION</div>
                <div className="text-lg font-bold text-slate-400 font-mono">0.9% (Flat)</div>
              </div>
            </div>

            {/* Flat line chart */}
            <div className="h-20 w-full relative flex items-end">
              <svg className="w-full h-full" viewBox="0 0 380 60">
                <path
                  d="M 0 35 Q 95 38 190 32 T 380 34"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          <div className="text-xs text-slate-500 text-center border-t border-slate-800/80 pt-3">
            Generic Template • Weak Value Proposition
          </div>
        </div>
      </div>
    </div>
  );
};
