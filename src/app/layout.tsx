import type { Metadata } from "next";
import { Alata, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursorRoot from "@/components/ui/CustomCursorRoot";

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata-family",
  display: "swap",
});

const epilogue = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-epilogue-family",
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

export const metadata: Metadata = {
  title: "QDelta Technologies | Built to Speak. Designed to Work.",
  description:
    "We build websites that speak for your brand and work for your business. Conversion-focused landing pages and flagship digital experiences.",
  icons: {
    icon: "/images/qdelta-icon.png",
    shortcut: "/favicon.ico",
    apple: "/images/qdelta-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${epilogue.variable} ${alata.variable}`}>
      <head>
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
      <body className="font-sans bg-[#040406] text-[#f4f4f5] antialiased selection:bg-[#E5B528] selection:text-black">
        <CustomCursorRoot />
        {children}
      </body>
    </html>
  );
}
