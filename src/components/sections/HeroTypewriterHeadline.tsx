"use client";

import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

const LINE_1 = "Designed to be remembered.";
const LINE_2 = "Built to perform.";
const TOTAL = LINE_1.length + LINE_2.length;
const LINE_1_WHITE_LEN = 12;
const LINE_2_GOLD_LEN = 9;

const INITIAL_DELAY_MS = 280;
const CHAR_MS = 36;
const PAUSE_AFTER_LINE_1_MS = 220;
const PAUSE_AFTER_BUILT_MS = 85;

/** Monotonic ms from animation start when `count` characters should be visible */
function buildRevealThresholds(): number[] {
  const thresholds = new Array(TOTAL + 1).fill(0);
  let t = INITIAL_DELAY_MS;
  for (let count = 1; count <= TOTAL; count++) {
    let step = CHAR_MS;
    if (count === LINE_1.length + 1) step = PAUSE_AFTER_LINE_1_MS;
    else if (count === LINE_1.length + 6) step = PAUSE_AFTER_BUILT_MS;
    t += step;
    thresholds[count] = t;
  }
  return thresholds;
}

const REVEAL_THRESHOLDS = buildRevealThresholds();

function TypewriterCursor({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block w-[2.5px] h-[0.78em] align-middle bg-[#EBBF2E] ml-1.5 rounded-full ${
        active ? "animate-[hero-cursor-blink_1s_ease-in-out_infinite]" : "opacity-0 transition-opacity duration-500"
      }`}
    />
  );
}

function StackedLine({
  fullText,
  children,
}: {
  fullText: string;
  children: ReactNode;
}) {
  return (
    <span className="grid [&>*]:col-start-1 [&>*]:row-start-1 [&>*]:justify-self-center">
      <span className="invisible select-none" aria-hidden>{fullText}</span>
      <span>{children}</span>
    </span>
  );
}

type HeroTypewriterHeadlineProps = {
  shouldReduceMotion: boolean | null;
  onTypingDone: () => void;
};

function HeroTypewriterHeadline({
  shouldReduceMotion,
  onTypingDone,
}: HeroTypewriterHeadlineProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion === null) return;

    if (shouldReduceMotion) {
      setDisplayedCount(TOTAL);
      setIsTypingDone(true);
      setShowCursor(false);
      if (!completedRef.current) {
        completedRef.current = true;
        onTypingDone();
      }
      return;
    }

    const start = performance.now();
    let rafId = 0;
    let lastCount = 0;
    let cursorFadeTimer = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      let count = 0;
      while (count < TOTAL && elapsed >= REVEAL_THRESHOLDS[count + 1]) {
        count++;
      }

      if (count !== lastCount) {
        lastCount = count;
        setDisplayedCount(count);
      }

      if (count < TOTAL) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      setIsTypingDone(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onTypingDone();
      }
      cursorFadeTimer = window.setTimeout(() => setShowCursor(false), 600);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(cursorFadeTimer);
    };
  }, [shouldReduceMotion, onTypingDone]);

  const line1Len = Math.min(displayedCount, LINE_1.length);
  const line2Len = Math.max(0, displayedCount - LINE_1.length);

  const line1Content =
    line1Len <= LINE_1_WHITE_LEN
      ? <span className="text-[#F5F5F7]">{LINE_1.slice(0, line1Len)}</span>
      : (
          <>
            <span className="text-[#F5F5F7]">{LINE_1.slice(0, LINE_1_WHITE_LEN)}</span>
            <span className="text-hero-gold">{LINE_1.slice(LINE_1_WHITE_LEN, line1Len)}</span>
          </>
        );

  const line2Content =
    line2Len <= 0
      ? null
      : line2Len <= LINE_2_GOLD_LEN
        ? <span className="text-hero-gold">{LINE_2.slice(0, line2Len)}</span>
        : (
            <>
              <span className="text-hero-gold">{LINE_2.slice(0, LINE_2_GOLD_LEN)}</span>
              <span className="text-[#F5F5F7]">{LINE_2.slice(LINE_2_GOLD_LEN, line2Len)}</span>
            </>
          );

  return (
    <h1
      className="relative z-10 flex flex-col items-center text-center font-alata font-bold tracking-tight text-white text-2xl min-[400px]:text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] xl:text-[52px] 2xl:text-[56px] leading-[1.18] sm:leading-[1.14]"
    >
      <span className="sr-only">Designed to be remembered. Built to perform.</span>

      <div aria-hidden="true" className="flex flex-col items-center gap-1 sm:gap-2">
        <div className="relative inline-block mx-auto px-1 sm:px-2">
          <motion.div
            initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            animate={
              isTypingDone
                ? shouldReduceMotion
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 1, y: [0, -3, 0], filter: "blur(0px)" }
                : { opacity: 0, y: -6, filter: "blur(4px)" }
            }
            transition={{
              opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
              filter: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
              y: isTypingDone && !shouldReduceMotion
                ? { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
            }}
            className="pointer-events-none select-none z-20 absolute -top-8 sm:-top-9 md:-top-10 -left-2 min-[440px]:-left-5 sm:-left-10 md:-left-14 flex items-center gap-2 scale-[0.75] min-[420px]:scale-[0.85] sm:scale-[0.9] lg:scale-100 origin-bottom-left"
          >
            <div className="relative flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-black/60 px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] shrink-0 animate-pulse" />
              <span className="whitespace-nowrap font-medium text-white">Strategy & Design</span>
            </div>
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-[#E5B528] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              style={{ transform: "rotate(170deg)" }}
            >
              <path
                d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
                fill="currentColor"
                stroke="#050315"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            animate={
              isTypingDone
                ? shouldReduceMotion
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 1, y: [0, -3, 0], filter: "blur(0px)" }
                : { opacity: 0, y: -6, filter: "blur(4px)" }
            }
            transition={{
              opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
              filter: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
              y: isTypingDone && !shouldReduceMotion
                ? { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.15 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
            }}
            className="pointer-events-none select-none z-20 md:hidden absolute -top-8 sm:-top-9 -right-2 min-[440px]:-right-5 sm:-right-10 flex items-center gap-2 scale-[0.75] min-[420px]:scale-[0.85] sm:scale-[0.9] origin-bottom-right"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-[#E5B528] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              style={{ transform: "rotate(170deg) scaleX(-1)" }}
            >
              <path
                d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
                fill="currentColor"
                stroke="#050315"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <div className="relative flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-black/60 px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] shrink-0 animate-pulse" />
              <span className="whitespace-nowrap font-medium text-white">Development & Growth</span>
            </div>
          </motion.div>

          <StackedLine fullText={LINE_1}>
            <>
              {line1Content}
              {displayedCount <= LINE_1.length && !isTypingDone && (
                <TypewriterCursor active={showCursor} />
              )}
            </>
          </StackedLine>
        </div>

        <div className="relative inline-block mx-auto px-1 sm:px-2 mt-0.5 sm:mt-1">
          <StackedLine fullText={LINE_2}>
            <>
              {line2Content}
              {displayedCount > LINE_1.length && !isTypingDone && (
                <TypewriterCursor active={showCursor} />
              )}
            </>
          </StackedLine>

          <motion.div
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={
              isTypingDone
                ? shouldReduceMotion
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 1, y: [0, 3, 0], filter: "blur(0px)" }
                : { opacity: 0, y: 6, filter: "blur(4px)" }
            }
            transition={{
              opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
              filter: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
              y: isTypingDone && !shouldReduceMotion
                ? { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.15 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
            }}
            className="pointer-events-none select-none z-20 hidden md:flex absolute left-full ml-1.5 sm:ml-2.5 md:ml-3.5 bottom-0.5 sm:bottom-1 md:bottom-1.5 items-center gap-1.5 sm:gap-2 flex-row-reverse scale-[0.72] min-[440px]:scale-[0.82] sm:scale-[0.9] lg:scale-100 origin-left"
          >
            <div className="relative flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-black/60 px-3.5 py-1 sm:py-1.5 text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)] shrink-0 animate-pulse" />
              <span className="whitespace-nowrap font-medium text-white">Development & Growth</span>
            </div>
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-[#E5B528] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              style={{ transform: "rotate(-10deg)" }}
            >
              <path
                d="M4 4L11.5 21L14 13.5L21.5 11L4 4Z"
                fill="currentColor"
                stroke="#050315"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </h1>
  );
}

export default memo(HeroTypewriterHeadline);
