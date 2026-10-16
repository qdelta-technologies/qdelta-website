"use client";

import Script from "next/script";

type GtagArg = string | Date | Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: GtagArg[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BFZS664T32";
export const CONSENT_STORAGE_KEY = "qdelta_cookie_consent";

export function updateGtagConsent(granted: boolean) {
  const status = granted ? "granted" : "denied";
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
  } catch {
    // storage blocked (private mode): the choice just lasts for this visit
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: status });
  }
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {/* Consent Mode: analytics stays off until the visitor accepts. Ads storage is always denied (we run no ads). */}
      <Script
        id="google-consent-mode"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var savedConsent = 'denied';
            try {
              if (localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') savedConsent = 'granted';
            } catch (e) {}

            gtag('consent', 'default', {
              'analytics_storage': savedConsent,
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `,
        }}
      />
      <Script
        id="google-analytics-tag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
