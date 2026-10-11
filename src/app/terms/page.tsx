import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, Mail, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | QDelta Technologies",
  description: "Terms and Conditions for digital agency design, development, and engineering services provided by QDelta.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black flex flex-col justify-between">
      <Navbar />

      <main className="relative flex-1 pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[35rem] w-[50rem] rounded-full bg-gradient-to-b from-[#FAB406]/10 via-transparent to-transparent blur-[140px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-[#FAB406]/40 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="border-b border-white/10 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FAB406]/30 bg-[#FAB406]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#FAB406] mb-4">
              <Scale className="h-3.5 w-3.5" />
              <span>Service Agreement</span>
            </div>
            <h1 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Terms &amp; <span className="italic text-[#FAB406]">Conditions</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-400 font-mono">
              Effective Date: September 2026 &bull; QDelta Technologies
            </p>
            <p className="mt-3 text-base text-zinc-300 leading-relaxed max-w-2xl">
              These Terms and Conditions apply to all digital design, web development, cloud architecture, and technical services provided by QDelta.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="mt-12 space-y-8 text-zinc-300">
            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAB406]/15 font-mono text-xs font-bold text-[#FAB406]">
                  01
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Scope & Deliverables</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                QDelta provides bespoke design and engineering services explicitly outlined in the project quotation, proposal, or Statement of Work (SOW). Any additional features or scope expansions will be quoted transparently.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAB406]/15 font-mono text-xs font-bold text-[#FAB406]">
                  02
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Milestone Payments & Invoicing</h2>
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-300 list-disc list-inside">
                <li>Payment milestones follow the structured agreement (e.g. 50% deposit, 50% upon launch).</li>
                <li>Production credentials and full code repositories are transferred upon final invoice settlement.</li>
                <li>All invoices are denominated in INR / USD as agreed in the contract.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#0e0e14]/90 p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAB406]/15 font-mono text-xs font-bold text-[#FAB406]">
                  03
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Intellectual Property & Ownership</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                Upon final payment, full intellectual property rights, source code, and design assets belong 100% to the client. QDelta retains the right to display the completed work in its portfolio unless a strict white-label NDA is requested.
              </p>
            </section>

            <section className="rounded-3xl border border-[#FAB406]/30 bg-gradient-to-br from-[#FAB406]/10 via-[#0e0e14] to-[#0e0e14] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FAB406]/20 font-mono text-xs font-bold text-[#FAB406]">
                  04
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-sans">Inquiries & Legal Clarification</h2>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                Have questions about our service agreements or want a customized Master Services Agreement (MSA)?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:hello@qdelta.in"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FAB406] px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-white"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@qdelta.in</span>
                </a>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Shield className="h-4 w-4 text-[#FAB406]" />
                  <span>View Privacy Policy</span>
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
