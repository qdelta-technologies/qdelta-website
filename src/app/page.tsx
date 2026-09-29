import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import WebsiteAssembly from "@/components/sections/WebsiteAssembly";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-[#FAB406] selection:text-black flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <WebsiteAssembly />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
