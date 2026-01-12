import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { OurProcess } from "@/components/sections/OurProcess";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash scrolling when component mounts or hash changes
    if (location.hash) {
      const hash = location.hash.substring(1); // Remove the # symbol
      const element = document.getElementById(hash);
      
      if (element) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <Services />
        <WhyChooseUs />
        <OurProcess />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
