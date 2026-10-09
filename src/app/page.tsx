import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SectionDivider from "@/components/ui/SectionDivider";
import DeferredOverlays from "@/components/ui/DeferredOverlays";

// Everything below the first screen is its own chunk. It is still rendered on the server (nothing changes for search
// engines), but React hydrates each one separately instead of all at once in one long task before the page responds.
const BrandTransformationSection = dynamic(() => import("@/components/sections/BrandTransformationSection"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#06070A] text-white selection:bg-[#E5B528] selection:text-[#06070A] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <SectionDivider />
        <BrandTransformationSection />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Team />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <DeferredOverlays />
      <WhatsAppButton />
    </div>
  );
}
