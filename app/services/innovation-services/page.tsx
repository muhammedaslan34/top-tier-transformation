"use client";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  Lightbulb, 
  Brain, 
  Cpu, 
  Glasses,
  Rocket,
  Sparkles,
  Cog,
  Zap,
  Globe
} from "lucide-react";

export default function InnovationServices() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.innovationServices.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.innovationServices.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.innovationServices.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.innovationServices.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <Brain className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <Cpu className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <Glasses className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <Cog className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <Sparkles className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <Globe className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.innovationServices.serviceName")}
      tagline={t("serviceDetails.innovationServices.tagline")}
      description={t("serviceDetails.innovationServices.description")}
      heroIcon={<Lightbulb className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
