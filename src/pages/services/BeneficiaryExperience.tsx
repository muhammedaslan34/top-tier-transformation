import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Experience Study",
    description: "Comprehensive user journey analysis to understand pain points, needs, and opportunities for improvement.",
  },
  {
    title: "UX Measurement",
    description: "Behavior tracking and analytics frameworks to quantify user experience and satisfaction.",
  },
  {
    title: "Maturity Enhancement",
    description: "Digital service optimization programs that elevate your beneficiary experience capabilities.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Journey Mapping",
    description: "Document and analyze every touchpoint in your beneficiary's experience journey.",
  },
  {
    number: "02",
    title: "Pain Point Analysis",
    description: "Identify friction points, gaps, and opportunities for experience improvement.",
  },
  {
    number: "03",
    title: "Solution Design",
    description: "Create user-centered designs that address identified needs and enhance satisfaction.",
  },
  {
    number: "04",
    title: "Continuous Improvement",
    description: "Implement feedback loops and analytics for ongoing experience optimization.",
  },
];

const features = [
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Human-Centered Design",
    description: "Every solution is designed with the beneficiary's needs, preferences, and context in mind.",
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: "Omnichannel Excellence",
    description: "Seamless experiences across all channels—web, mobile, in-person, and beyond.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Data-Driven Insights",
    description: "Analytics and metrics that reveal exactly how beneficiaries interact with your services.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "Feedback Integration",
    description: "Systems that capture, analyze, and act on beneficiary feedback in real-time.",
  },
  {
    icon: <Smile className="w-6 h-6 text-primary" />,
    title: "Satisfaction Focus",
    description: "Measurable improvements in beneficiary satisfaction and service adoption rates.",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Accessibility First",
    description: "Inclusive design ensuring all beneficiaries can access and use your services.",
  },
];

const caseStudies = [
  {
    industry: "Government",
    title: "Citizen Services Portal",
    result: "Redesigned citizen portal reducing average task completion time and support calls.",
    metric: "92% Satisfaction Rate",
  },
  {
    industry: "Healthcare",
    title: "Patient Experience Transformation",
    result: "Created seamless patient journey from scheduling through post-visit follow-up.",
    metric: "4.8/5 Patient Rating",
  },
  {
    industry: "Social Services",
    title: "Benefits Application Redesign",
    result: "Simplified benefits application process increasing completion rates dramatically.",
    metric: "70% Higher Completion",
  },
];

export default function BeneficiaryExperience() {
  return (
    <ServicePageLayout
      serviceName="Beneficiary Experience"
      tagline="Create meaningful experiences that build trust and satisfaction"
      description="We help organizations understand and optimize every interaction with their beneficiaries, creating seamless, intuitive experiences that drive engagement and satisfaction."
      heroIcon={<Users className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
