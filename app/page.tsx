"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { OurProcess } from "@/components/sections/OurProcess";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

function HashScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle hash scrolling when component mounts or hash changes
    const hash = searchParams?.get("hash") || window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  return null;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <HashScrollHandler />
      </Suspense>
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
}
