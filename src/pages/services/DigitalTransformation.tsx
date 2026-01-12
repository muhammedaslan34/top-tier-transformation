import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Benchmark Studies",
    description: "Assess your digital maturity against industry benchmarks and identify gaps and opportunities for transformation.",
  },
  {
    title: "Leadership & Capacity Building",
    description: "Training programs and workshops to strengthen digital leadership capabilities across your organization.",
  },
  {
    title: "Strategic Planning",
    description: "Comprehensive digital roadmaps with clear KPIs, milestones, and governance structures for success.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    description: "We analyze your current state, identify pain points, and benchmark against industry standards.",
  },
  {
    number: "02",
    title: "Strategy Development",
    description: "Create a comprehensive digital roadmap aligned with your business objectives.",
  },
  {
    number: "03",
    title: "Implementation",
    description: "Execute transformation initiatives with agile methodologies and change management.",
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description: "Continuously measure, optimize, and scale successful digital initiatives.",
  },
];

const features = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Business-Aligned Strategy",
    description: "Every digital initiative is directly tied to measurable business outcomes and strategic objectives.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "People-First Approach",
    description: "We prioritize change management and employee enablement for lasting transformation.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    title: "Measurable ROI",
    description: "Clear metrics and KPIs to track progress and demonstrate return on investment.",
  },
  {
    icon: <Compass className="w-6 h-6 text-primary" />,
    title: "Industry Expertise",
    description: "Deep knowledge across sectors including government, healthcare, and financial services.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    title: "Innovation Integration",
    description: "Leverage emerging technologies like AI, IoT, and automation in your transformation.",
  },
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Proven Methodology",
    description: "Battle-tested frameworks refined through hundreds of successful transformations.",
  },
];

const caseStudies = [
  {
    industry: "Government",
    title: "Federal Agency Digital Modernization",
    result: "Transformed citizen services from paper-based to fully digital, reducing processing times and improving satisfaction.",
    metric: "85% Faster Processing",
  },
  {
    industry: "Healthcare",
    title: "Hospital Network Integration",
    result: "Unified 12 hospital systems into a single digital platform, enabling seamless patient care coordination.",
    metric: "40% Cost Reduction",
  },
  {
    industry: "Financial Services",
    title: "Banking Digital Experience",
    result: "Redesigned customer journey resulting in increased digital adoption and reduced branch dependency.",
    metric: "3x Digital Adoption",
  },
];

export default function DigitalTransformation() {
  return (
    <ServicePageLayout
      serviceName="Digital Transformation"
      tagline="Accelerate your journey to becoming a digital-first organization"
      description="We help enterprises and government organizations navigate complex digital transformations, modernizing operations and building sustainable digital ecosystems that drive lasting competitive advantage."
      heroIcon={<Layers className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
