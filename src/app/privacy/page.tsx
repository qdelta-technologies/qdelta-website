import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Mail, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | QDelta Technologies",
  description: "Privacy Policy and client data protection practices of QDelta Technologies.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-[#E5B528] selection:text-black flex flex-col justify-between">
      <Navbar />

      <main className="relative flex-1 pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[35rem] w-[50rem] rounded-full bg-gradient-to-b from-[#E5B528]/10 via-transparent to-transparent blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-[#E5B528]/40 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="border-b border-white/10 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5B528]/30 bg-[#E5B528]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#E5B528] mb-4">
              <Shield className="h-3.5 w-3.5" />
              <span>Legal Document</span>
            </div>
            <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Privacy <span className="italic text-[#E5B528]">Policy</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-400 font-mono">
              Effective Date: September 2026 &bull; QDelta Technologies
            </p>
            <p className="mt-3 text-base text-zinc-300 leading-relaxed max-w-2xl">
              QDelta respects your privacy and is committed to protecting your personal and proprietary business information.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="mt-12 space-y-8 text-zinc-300">
            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5B528]/15 font-mono text-xs font-bold text-[#E5B528]">
                  01
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Information We Collect</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400 mb-3">We may collect:</p>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-300 list-disc list-inside">
                <li>Name, email, and corporate contact details.</li>
                <li>Company, brand assets, and project requirements.</li>
                <li>Files, media, and architectural specifications shared by the client.</li>
                <li>Invoice and payment transaction records.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5B528]/15 font-mono text-xs font-bold text-[#E5B528]">
                  02
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">How We Use Information</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400 mb-3">We use the information exclusively to:</p>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-300 list-disc list-inside">
                <li>Architect and deliver client software and web systems.</li>
                <li>Communicate milestone progress and deliverable walkthroughs.</li>
                <li>Provide post-launch maintenance, SLAs, and technical support.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5B528]/15 font-mono text-xs font-bold text-[#E5B528]">
                  03
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Information Protection & NDA</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                QDelta implements industry-grade encryption and administrative safeguards to protect client source code, design assets, and confidential roadmaps under strict bilateral NDA obligations.
              </p>
            </section>

            <section className="rounded-3xl border border-[#E5B528]/30 bg-gradient-to-br from-[#E5B528]/10 via-[#0e0e14] to-[#0e0e14] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5B528]/20 font-mono text-xs font-bold text-[#E5B528]">
                  04
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Contact Legal & Compliance</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                For questions regarding our privacy practices or data handling, reach out directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@qdelta.in"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E5B528] px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-white"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@qdelta.in</span>
                </a>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <FileText className="h-4 w-4 text-[#E5B528]" />
                  <span>View Terms and Conditions</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
