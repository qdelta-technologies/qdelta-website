const TRUST_ITEMS = [
  "Landing Pages",
  "Web Design",
  "Development",
  "Brand Systems",
  "UX Strategy",
  "Design Systems",
  "Webflow & Next.js",
  "Interactive 3D",
  "Next.js",
  "Conversion",
];

// Duplicate items twice to guarantee smooth, seamless loop on all screen widths
const TRACK_ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustBar() {
  return (
    <section
      aria-label="Core Capabilities and Technologies"
      className="relative z-30 w-full h-11 sm:h-12 overflow-hidden border-t border-white/[0.06] bg-[#06070A] flex items-center select-none"
    >
      {/* Edge gradient fades for premium look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-[#06070A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-[#06070A] to-transparent" />

      {/* Infinite scrolling marquee track moving towards the left */}
      <div className="flex w-max animate-marquee items-center">
        {/* Track Half 1 */}
        <div className="flex shrink-0 items-center">
          {TRACK_ITEMS.map((item, index) => (
            <div key={`t1-${index}`} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              <span className="text-xs sm:text-[13px] font-epilogue font-medium tracking-wide text-zinc-300 transition-colors hover:text-white">
                {item}
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rotate-45 bg-[#F5B800] shadow-[0_0_6px_rgba(245,184,0,0.6)]"
              />
            </div>
          ))}
        </div>

        {/* Track Half 2 (identical duplicate for seamless infinite loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {TRACK_ITEMS.map((item, index) => (
            <div key={`t2-${index}`} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              <span className="text-xs sm:text-[13px] font-epilogue font-medium tracking-wide text-zinc-300 transition-colors hover:text-white">
                {item}
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rotate-45 bg-[#F5B800] shadow-[0_0_6px_rgba(245,184,0,0.6)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
