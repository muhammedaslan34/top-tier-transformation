"use client";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  Layers, 
  Target, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Compass,
  Lightbulb,
  Award,
  Rocket
} from "lucide-react";

export default function DigitalTransformation() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.digitalTransformation.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.digitalTransformation.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.digitalTransformation.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.digitalTransformation.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <Target className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <Users className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <TrendingUp className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <Compass className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <Lightbulb className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <Award className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.digitalTransformation.serviceName")}
      tagline={t("serviceDetails.digitalTransformation.tagline")}
      description={t("serviceDetails.digitalTransformation.description")}
      heroIcon={<Layers className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
