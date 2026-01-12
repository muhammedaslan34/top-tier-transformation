import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Infrastructure Analysis",
    description: "Comprehensive cloud readiness assessments to evaluate your current infrastructure and migration potential.",
  },
  {
    title: "System Selection",
    description: "Expert guidance on choosing the right cloud platforms and solutions for your specific requirements.",
  },
  {
    title: "Transition Planning",
    description: "Detailed migration roadmaps with risk management strategies and minimal business disruption.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Cloud Readiness Assessment",
    description: "Evaluate current infrastructure, applications, and workloads for cloud compatibility.",
  },
  {
    number: "02",
    title: "Architecture Design",
    description: "Design scalable, secure cloud architecture aligned with your business requirements.",
  },
  {
    number: "03",
    title: "Migration Execution",
    description: "Systematic migration with testing, validation, and minimal downtime.",
  },
  {
    number: "04",
    title: "Optimization & Management",
    description: "Ongoing optimization for performance, cost, and security in the cloud.",
  },
];

const features = [
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Accelerated Performance",
    description: "Leverage cloud scalability for faster application performance and better user experiences.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    title: "Cost Optimization",
    description: "Right-sized resources and pay-as-you-go models that reduce infrastructure costs.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Enhanced Security",
    description: "Enterprise-grade cloud security with encryption, access controls, and compliance.",
  },
  {
    icon: <Gauge className="w-6 h-6 text-primary" />,
    title: "Infinite Scalability",
    description: "Scale resources up or down instantly to meet changing business demands.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-primary" />,
    title: "Business Continuity",
    description: "Built-in redundancy and disaster recovery for maximum uptime and resilience.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Compliance Ready",
    description: "Cloud environments configured for regulatory compliance across industries.",
  },
];

const caseStudies = [
  {
    industry: "Enterprise",
    title: "Legacy System Migration",
    result: "Migrated 200+ applications from on-premises data centers to multi-cloud environment.",
    metric: "45% Cost Savings",
  },
  {
    industry: "Government",
    title: "Secure Cloud Adoption",
    result: "Implemented FedRAMP-compliant cloud infrastructure for sensitive government workloads.",
    metric: "99.99% Uptime",
  },
  {
    industry: "Retail",
    title: "E-commerce Platform",
    result: "Built auto-scaling cloud infrastructure handling 10x traffic during peak seasons.",
    metric: "300% Scalability",
  },
];

export default function CloudComputing() {
  return (
    <ServicePageLayout
      serviceName="Cloud Computing"
      tagline="Unlock agility and innovation with strategic cloud adoption"
      description="We guide organizations through every phase of their cloud journey—from assessment and architecture to migration and optimization—ensuring you realize the full potential of cloud computing."
      heroIcon={<Cloud className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
