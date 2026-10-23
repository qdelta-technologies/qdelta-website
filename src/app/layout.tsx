import type { Metadata, Viewport } from "next";
import { Alata, DM_Sans, Bricolage_Grotesque, Space_Grotesk, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursorRoot from "@/components/ui/CustomCursorRoot";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import CookieConsent from "@/components/ui/CookieConsent";

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
  "QDelta Technologies is a digital solutions company specialising in web design, custom web & app development, AI chatbots, business automation and high-converting digital experiences for brands and businesses worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QDelta - Digital Solutions | Web Development",
    template: "%s | QDelta Technologies",
  },
  description: SITE_DESCRIPTION,
  applicationName: "QDelta Technologies",
  keywords: [
    "QDelta",
    "QDelta Technologies",
    "digital solutions company",
    "AI-powered web design",
    "web design agency",
    "web development company",
    "AI chatbot development",
    "business automation",
    "high-converting landing pages",
    "custom website development",
    "e-commerce website design",
    "full stack web app development",
    "MVP development",
    "AI integration services",
    "digital transformation",
    "premium website design",
    "WhatsApp automation",
    "SEO optimised websites",
    "brand identity design",
    "MSME registered company",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "QDelta Technologies",
    title: "QDelta - Digital Solutions | Web Development",
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@qdelta_agency",
    title: "QDelta - Digital Solutions | Web Development",
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
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${satoshi.variable} ${epilogue.variable} ${alata.variable} ${excon.variable} ${heading.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
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
                  foundingDate: "2025",
                  knowsAbout: [
                    "Artificial Intelligence",
                    "Web Design",
                    "Web Development",
                    "AI Chatbots",
                    "Business Automation",
                    "E-commerce Development",
                    "Search Engine Optimisation",
                    "Digital Transformation",
                  ],
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
                  alternateName: "QDelta - Digital Solutions",
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
                  areaServed: "Worldwide",
                  serviceType: "AI Solutions, Web Design & Development, Business Automation",
                  makesOffer: [
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "AI-Powered Web Design & Development",
                        serviceType: "High-converting landing pages, premium websites, e-commerce stores and web applications",
                      },
                    },
                    {
                      "@type": "Offer",
                      itemOffered: {
                        "@type": "Service",
                        name: "AI Chatbots & Business Automation",
                        serviceType: "Custom AI chatbots, WhatsApp automation, workflow automation and AI integrations",
                      },
                    },
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
                        serviceType: "Flagship custom website design and development with premium motion and interaction",
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
