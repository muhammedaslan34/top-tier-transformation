"use client";

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  Users, 
  Search, 
  BarChart3, 
  TrendingUp,
  Heart,
  Smartphone,
  MessageCircle,
  Smile,
  Target
} from "lucide-react";

export default function BeneficiaryExperience() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.beneficiaryExperience.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.beneficiaryExperience.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.beneficiaryExperience.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.beneficiaryExperience.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <Heart className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <Smartphone className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <BarChart3 className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <MessageCircle className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <Smile className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <Target className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.beneficiaryExperience.serviceName")}
      tagline={t("serviceDetails.beneficiaryExperience.tagline")}
      description={t("serviceDetails.beneficiaryExperience.description")}
      heroIcon={<Users className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
