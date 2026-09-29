import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const plusJakartaSans = localFont({
  src: [
    {
      path: "../../public/fonts/PlusJakartaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "../../public/fonts/PlusJakartaSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-[#040406] text-[#f4f4f5] antialiased selection:bg-[#FAB406] selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
