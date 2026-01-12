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
      <div className="pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
