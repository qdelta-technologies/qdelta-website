import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const epilogue = localFont({
  src: [
    {
      path: "../../public/fonts/Epilogue-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/Epilogue-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Epilogue-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-epilogue",
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
    <html lang="en" className={epilogue.variable}>
      <body className="font-sans bg-[#040406] text-[#f4f4f5] antialiased selection:bg-[#FAB406] selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
