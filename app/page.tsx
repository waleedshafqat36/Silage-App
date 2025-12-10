import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import AboutSection from "@/components/Landing/AboutSection";
import WhyChooseSection from "@/components/Landing/WhyChooseSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import ContactSection from "@/components/Landing/ContactSection";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
