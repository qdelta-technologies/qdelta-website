import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SectionDivider from "@/components/ui/SectionDivider";
import DeferredOverlays from "@/components/ui/DeferredOverlays";
import SectionReveal from "@/components/ui/SectionReveal";

// Everything below the first screen is its own chunk. It is still rendered on the server (nothing changes for search
// engines), but React hydrates each one separately instead of all at once in one long task before the page responds.
const BrandTransformationSection = dynamic(() => import("@/components/sections/BrandTransformationSection"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const HomeFaq = dynamic(() => import("@/components/sections/HomeFaq"));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#06070A] text-white selection:bg-[#FAB406] selection:text-[#06070A] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        {/* Hero is above the fold — no reveal wrapper needed */}
        <Hero />

        {/* TrustBar enters fast: it's right below the hero */}
        <SectionReveal delay={0} amount={0.1} yOffset={16}>
          <TrustBar />
        </SectionReveal>

        <SectionDivider />

        {/* Each section reveals as it scrolls into view — staggered for butter-smooth cascade */}
        <SectionReveal delay={0} amount={0.08} yOffset={28}>
          <BrandTransformationSection />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.06} yOffset={28}>
          <Services />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.06} yOffset={28}>
          <Process />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.05} yOffset={28}>
          <Portfolio />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.08} yOffset={24}>
          <Testimonials />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.06} yOffset={28}>
          <Team />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.06} yOffset={20}>
          <HomeFaq />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal delay={0} amount={0.05} yOffset={20}>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
      <DeferredOverlays />
      <WhatsAppButton />
    </div>
  );
}
