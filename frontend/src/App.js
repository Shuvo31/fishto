import "@/App.css";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import OccasionsSection from "@/components/OccasionsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import useTheme from "@/hooks/use-theme";

function App() {
  const { theme, toggle } = useTheme();

  // Sections render after the browser's own anchor jump, so deep links like /#contact need a manual scroll.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash === "#top") return undefined;
    const timer = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "auto" });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[60] focus:rounded-pill focus:bg-brand focus:px-4 focus:py-2 focus:text-xs focus:text-white"
      >
        Skip to content
      </a>
      <Toaster position="top-center" richColors theme={theme} />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseUs />
        <OccasionsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
