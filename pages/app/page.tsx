import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutStrip from "@/components/AboutStrip";
import ServicesGrid from "@/components/ServicesGrid";
import ImpactNumbers from "@/components/ImpactNumbers";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <AboutStrip />
      <ServicesGrid />
      <ImpactNumbers />
      <ProcessSection />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
