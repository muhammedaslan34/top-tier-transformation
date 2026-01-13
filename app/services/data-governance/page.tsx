"use client";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  Database, 
  Shield, 
  Key, 
  CheckCircle2, 
  Lock,
  Eye,
  FileCheck,
  AlertTriangle,
  BarChart3
} from "lucide-react";

export default function DataGovernance() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.dataGovernance.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.dataGovernance.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.dataGovernance.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.dataGovernance.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <CheckCircle2 className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <Lock className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <Eye className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <FileCheck className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <AlertTriangle className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <BarChart3 className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.dataGovernance.serviceName")}
      tagline={t("serviceDetails.dataGovernance.tagline")}
      description={t("serviceDetails.dataGovernance.description")}
      heroIcon={<Database className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
