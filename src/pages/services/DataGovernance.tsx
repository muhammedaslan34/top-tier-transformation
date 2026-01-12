import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Data Quality Management",
    description: "Ensure accuracy, completeness, and consistency of your data assets through comprehensive quality frameworks.",
  },
  {
    title: "Data Security",
    description: "Enterprise-grade encryption, backup strategies, and incident management to protect your valuable data.",
  },
  {
    title: "Access Management",
    description: "Role-based access control systems that ensure the right people have the right access to the right data.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Data Landscape Audit",
    description: "Map your entire data ecosystem, identifying sources, flows, and current governance gaps.",
  },
  {
    number: "02",
    title: "Framework Design",
    description: "Develop comprehensive data governance policies, standards, and procedures tailored to your needs.",
  },
  {
    number: "03",
    title: "Implementation & Training",
    description: "Deploy governance tools and train your teams on new processes and responsibilities.",
  },
  {
    number: "04",
    title: "Monitoring & Compliance",
    description: "Continuous monitoring, reporting, and optimization of your data governance program.",
  },
];

const features = [
  {
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    title: "Data Quality Assurance",
    description: "Automated quality checks and validation rules to maintain data integrity across all systems.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Enterprise Security",
    description: "Multi-layered security architecture protecting data at rest, in transit, and in use.",
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: "Complete Visibility",
    description: "End-to-end data lineage and cataloging for full transparency into your data assets.",
  },
  {
    icon: <FileCheck className="w-6 h-6 text-primary" />,
    title: "Regulatory Compliance",
    description: "Built-in compliance frameworks for GDPR, HIPAA, SOX, and industry-specific regulations.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-primary" />,
    title: "Risk Mitigation",
    description: "Proactive identification and mitigation of data-related risks before they become issues.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Analytics Ready",
    description: "Clean, governed data that powers reliable analytics and AI initiatives.",
  },
];

const caseStudies = [
  {
    industry: "Financial Services",
    title: "Bank Data Quality Initiative",
    result: "Implemented enterprise-wide data governance reducing reporting errors and regulatory findings.",
    metric: "99.9% Data Accuracy",
  },
  {
    industry: "Healthcare",
    title: "Patient Data Protection",
    result: "Established HIPAA-compliant data governance framework across a multi-state health system.",
    metric: "Zero Data Breaches",
  },
  {
    industry: "Government",
    title: "Citizen Data Management",
    result: "Unified citizen data across 15 agencies while maintaining strict privacy controls.",
    metric: "60% Faster Reporting",
  },
];

export default function DataGovernance() {
  return (
    <ServicePageLayout
      serviceName="Data Governance"
      tagline="Turn your data into a strategic asset with enterprise-grade governance"
      description="We establish comprehensive data governance frameworks that ensure data quality, security, and compliance while enabling your organization to leverage data as a strategic differentiator."
      heroIcon={<Database className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
