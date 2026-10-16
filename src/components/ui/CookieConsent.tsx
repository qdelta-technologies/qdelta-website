"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_STORAGE_KEY, updateGtagConsent } from "@/components/ui/GoogleAnalytics";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer = 0;
    try {
      if (!localStorage.getItem(CONSENT_STORAGE_KEY)) {
        // Wait a moment so the page can load first.
        timer = window.setTimeout(() => setIsVisible(true), 1500);
      }
    } catch {
      // storage blocked: skip the banner, analytics stays off
    }
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (granted: boolean) => {
    updateGtagConsent(granted);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 sm:max-w-sm z-[60]"
    >
      <div className="rounded-2xl border border-white/15 bg-[#0e0e14]/95 p-4 shadow-2xl backdrop-blur-md">
        <p className="text-[13px] leading-relaxed text-zinc-300">
          We use Google Analytics, only with your permission, to see how visitors use the site and improve it. See our{" "}
          <Link href="/privacy" className="text-[#FAB406] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="rounded-lg bg-[#FAB406] px-4 py-1.5 text-xs font-bold text-black transition-colors hover:bg-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
