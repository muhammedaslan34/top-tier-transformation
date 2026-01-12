import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact as ContactSection } from "@/components/sections/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-hero rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Get in touch with our team to discuss how we can help transform your organization.
          </p>
        </div>
      </section>
      <ContactSection />
      <Footer />
    </div>
  );
}
