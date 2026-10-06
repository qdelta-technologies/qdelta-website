import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BrandTransformationSection from "@/components/sections/BrandTransformationSection";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SectionDivider from "@/components/ui/SectionDivider";
import DeferredOverlays from "@/components/ui/DeferredOverlays";

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
