import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Legal from "./pages/Legal";
import DigitalTransformation from "./pages/services/DigitalTransformation";
import DataGovernance from "./pages/services/DataGovernance";
import CloudComputing from "./pages/services/CloudComputing";
import BeneficiaryExperience from "./pages/services/BeneficiaryExperience";
import InnovationServices from "./pages/services/InnovationServices";
import GovernanceRiskCompliance from "./pages/services/GovernanceRiskCompliance";
import iconImage from "@/asesst/icon.png";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => {
  const { i18n } = useTranslation();

  // Set favicon dynamically
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = iconImage;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.type = "image/png";
      newLink.href = iconImage;
      document.head.appendChild(newLink);
    }
  }, []);

  // Handle RTL/LTR direction based on language
  useEffect(() => {
    const isRTL = i18n.language === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/cookies" element={<Legal />} />
            <Route path="/services/digital-transformation" element={<DigitalTransformation />} />
            <Route path="/services/data-governance" element={<DataGovernance />} />
            <Route path="/services/cloud-computing" element={<CloudComputing />} />
            <Route path="/services/beneficiary-experience" element={<BeneficiaryExperience />} />
            <Route path="/services/innovation-services" element={<InnovationServices />} />
            <Route path="/services/governance-risk-compliance" element={<GovernanceRiskCompliance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
