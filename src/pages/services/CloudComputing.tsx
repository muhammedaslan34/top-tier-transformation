import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { useTranslation } from "react-i18next";
import { 
  Cloud, 
  Server, 
  ArrowRightLeft, 
  Zap,
  Shield,
  DollarSign,
  Gauge,
  RefreshCcw,
  Lock
} from "lucide-react";

export default function CloudComputing() {
  const { t } = useTranslation();
  
  const subServices = t("serviceDetails.cloudComputing.subServices", { returnObjects: true }) as Array<{title: string, description: string}>;
  const processSteps = t("serviceDetails.cloudComputing.processSteps", { returnObjects: true }) as Array<{title: string, description: string}>;
  const features = t("serviceDetails.cloudComputing.features", { returnObjects: true }) as Array<{title: string, description: string}>;
  const caseStudies = t("serviceDetails.cloudComputing.caseStudies", { returnObjects: true }) as Array<{industry: string, title: string, result: string, metric: string}>;

  const featuresWithIcons = [
    { ...features[0], icon: <Zap className="w-6 h-6 text-primary" /> },
    { ...features[1], icon: <DollarSign className="w-6 h-6 text-primary" /> },
    { ...features[2], icon: <Shield className="w-6 h-6 text-primary" /> },
    { ...features[3], icon: <Gauge className="w-6 h-6 text-primary" /> },
    { ...features[4], icon: <RefreshCcw className="w-6 h-6 text-primary" /> },
    { ...features[5], icon: <Lock className="w-6 h-6 text-primary" /> },
  ];

  const processStepsWithNumbers = processSteps.map((step, index) => ({
    ...step,
    number: String(index + 1).padStart(2, "0"),
  }));

  return (
    <ServicePageLayout
      serviceName={t("serviceDetails.cloudComputing.serviceName")}
      tagline={t("serviceDetails.cloudComputing.tagline")}
      description={t("serviceDetails.cloudComputing.description")}
      heroIcon={<Cloud className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processStepsWithNumbers}
      features={featuresWithIcons}
      caseStudies={caseStudies}
    />
  );
}
