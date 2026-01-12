import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import DigitalTransformation from "./pages/services/DigitalTransformation";
import DataGovernance from "./pages/services/DataGovernance";
import CloudComputing from "./pages/services/CloudComputing";
import BeneficiaryExperience from "./pages/services/BeneficiaryExperience";
import InnovationServices from "./pages/services/InnovationServices";
import GovernanceRiskCompliance from "./pages/services/GovernanceRiskCompliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
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

export default App;
