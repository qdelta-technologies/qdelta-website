"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/**
 * Scroll progress of a tall section, 0 when its top reaches the top of the screen and 1 when its bottom reaches the
 * bottom of the screen (the same value as useScroll({ target, offset: ["start start", "end end"] })).
 *
 * useScroll measures the page again on every scroll frame, which forces layout while the page is also being restyled and
 * makes scrolling stutter on phones. This measures the section once (and again when sizes change) and then only does
 * arithmetic on scroll. Below minWidth it does nothing at all and stays at 0, so phones and tablets get the plain layout.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, minWidth = 1024): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    let top = 0;
    let range = 1;
    let raf = 0;
    let active = false;

    const measure = () => {
      const r = el.getBoundingClientRect();
      top = r.top + window.scrollY;
      range = Math.max(1, r.height - window.innerHeight);
    };
    const update = () => {
      raf = 0;
      progress.set(Math.min(1, Math.max(0, (window.scrollY - top) / range)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(() => {
      if (!active) return;
      measure();
      update();
    });
    const start = () => {
      if (active) return;
      active = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      ro.observe(el);
      ro.observe(document.body);
    };
    const stop = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      progress.set(0);
    };
    const sync = () => (mq.matches ? start() : stop());

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, [ref, progress, minWidth]);

  return progress;
}
