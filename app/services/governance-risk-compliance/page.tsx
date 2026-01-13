"use client";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle, 
  Scale,
  Lock,
  Eye,
  ClipboardCheck,
  Building2,
  Gavel
} from "lucide-react";

export default function GovernanceRiskCompliance() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.governanceRiskCompliance.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.governanceRiskCompliance.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.governanceRiskCompliance.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.governanceRiskCompliance.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <Scale className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <Lock className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <Eye className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <ClipboardCheck className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <Building2 className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <Gavel className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.governanceRiskCompliance.serviceName")}
      tagline={t("serviceDetails.governanceRiskCompliance.tagline")}
      description={t("serviceDetails.governanceRiskCompliance.description")}
      heroIcon={<ShieldCheck className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
