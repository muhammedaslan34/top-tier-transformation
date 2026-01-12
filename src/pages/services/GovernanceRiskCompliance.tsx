import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Compliance Management",
    description: "Comprehensive regulatory adherence programs ensuring you meet all industry and government requirements.",
  },
  {
    title: "Risk Management",
    description: "Cybersecurity risk assessments, business continuity planning, and threat mitigation strategies.",
  },
  {
    title: "IT Governance",
    description: "Operational governance frameworks that align IT with business objectives and ensure accountability.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Risk Assessment",
    description: "Comprehensive evaluation of your current risk landscape and compliance posture.",
  },
  {
    number: "02",
    title: "Framework Development",
    description: "Design tailored GRC frameworks aligned with your industry and regulatory requirements.",
  },
  {
    number: "03",
    title: "Control Implementation",
    description: "Deploy controls, policies, and procedures to manage risk and ensure compliance.",
  },
  {
    number: "04",
    title: "Continuous Monitoring",
    description: "Ongoing monitoring, auditing, and reporting to maintain compliance and manage risk.",
  },
];

const features = [
  {
    icon: <Scale className="w-6 h-6 text-primary" />,
    title: "Regulatory Expertise",
    description: "Deep knowledge of regulations across industries including GDPR, HIPAA, SOX, and FedRAMP.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Cybersecurity Focus",
    description: "Integrated security controls that protect against evolving cyber threats.",
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: "Real-Time Visibility",
    description: "Dashboards and reporting that provide instant insight into your risk and compliance status.",
  },
  {
    icon: <ClipboardCheck className="w-6 h-6 text-primary" />,
    title: "Audit Readiness",
    description: "Maintain documentation and controls that ensure smooth audits and assessments.",
  },
  {
    icon: <Building2 className="w-6 h-6 text-primary" />,
    title: "Enterprise Integration",
    description: "GRC solutions that integrate with your existing systems and processes.",
  },
  {
    icon: <Gavel className="w-6 h-6 text-primary" />,
    title: "Policy Management",
    description: "Centralized policy creation, distribution, and acknowledgment tracking.",
  },
];

const caseStudies = [
  {
    industry: "Financial Services",
    title: "SOX Compliance Program",
    result: "Established comprehensive SOX compliance framework passing all internal and external audits.",
    metric: "100% Audit Pass Rate",
  },
  {
    industry: "Healthcare",
    title: "HIPAA Security Program",
    result: "Implemented HIPAA-compliant security controls across a healthcare network of 50+ facilities.",
    metric: "Zero Compliance Violations",
  },
  {
    industry: "Government",
    title: "FedRAMP Authorization",
    result: "Guided cloud service provider through FedRAMP authorization process for government contracts.",
    metric: "6-Month Authorization",
  },
];

export default function GovernanceRiskCompliance() {
  return (
    <ServicePageLayout
      serviceName="Governance, Risk & Compliance"
      tagline="Navigate complexity with confidence and clarity"
      description="We help organizations build robust GRC frameworks that mitigate risk, ensure regulatory compliance, and establish governance structures that enable secure, sustainable growth."
      heroIcon={<ShieldCheck className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
