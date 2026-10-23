import type { Metadata, Viewport } from "next";
import { Alata, DM_Sans, Bricolage_Grotesque, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursorRoot from "@/components/ui/CustomCursorRoot";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import CookieConsent from "@/components/ui/CookieConsent";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-family",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-family",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-editorial-family",
  display: "swap",
});

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata-family",
  display: "swap",
});

const epilogue = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-epilogue-family",
  display: "swap",
});

const heading = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading-family",
  display: "swap",
});

const excon = localFont({
  src: [
    {
      path: "../../public/fonts/Excon-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-excon-family",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Variable-Italic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06070A",
};

const SITE_URL = "https://www.qdelta.in";
const SITE_DESCRIPTION =
  "QDelta Technologies is a web design agency that builds fast, conversion-focused websites for businesses, creators and brands. Two packages: QDelta Digital and QDelta Signature.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "QDelta Technologies - Web Design Agency",
  description: SITE_DESCRIPTION,
  applicationName: "QDelta Technologies",
  keywords: [
    "web design agency",
    "website development",
    "landing page design",
    "business website",
    "portfolio website",
    "QDelta",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "QDelta Technologies",
    title: "QDelta Technologies - Web Design Agency",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@qdelta_agency",
    title: "QDelta Technologies - Web Design Agency",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/images/qdelta-icon.png?v=3" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/images/qdelta-icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable} ${satoshi.variable} ${epilogue.variable} ${alata.variable} ${excon.variable} ${heading.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "QDelta Technologies",
                  alternateName: "QDelta",
                  url: SITE_URL,
                  logo: `${SITE_URL}/images/qdelta-icon.png`,
                  email: "qdelta.in@gmail.com",
                  description: SITE_DESCRIPTION,
                  sameAs: [
                    "https://www.instagram.com/qdelta.in",
                    "https://x.com/qdelta_agency",
                    "https://www.linkedin.com/company/qdelta/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "QDelta Technologies",
                  inLanguage: "en",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${SITE_URL}/#service`,
                  name: "QDelta Technologies",
                  url: SITE_URL,
                  image: `${SITE_URL}/images/qdelta-landscape.jpg`,
                  description: SITE_DESCRIPTION,
                  parent: { "@id": `${SITE_URL}/#organization` },
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "QDelta Digital",
                        serviceType: "Conversion-focused website and landing page design",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "QDelta Signature",
                        serviceType: "Flagship custom website design and development",
                      },
                    },
                  ],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {/* Instant desktop custom cursor activation — zero invisible cursor delay */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    var activated = false;
                    function activate(e) {
                      if (activated) return;
                      activated = true;
                      document.documentElement.classList.add('custom-cursor-active');
                      var c = document.getElementById('qdelta-custom-cursor');
                      if (c) {
                        c.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0)';
                        c.style.opacity = '1';
                      }
                      window.removeEventListener('pointermove', activate);
                      window.removeEventListener('mousemove', activate);
                    }
                    window.addEventListener('pointermove', activate, { passive: true });
                    window.addEventListener('mousemove', activate, { passive: true });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-[#040406] text-[#f4f4f5] antialiased selection:bg-[#FAB406] selection:text-black">
        <CustomCursorRoot />
        {children}
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
