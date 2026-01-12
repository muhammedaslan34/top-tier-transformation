import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
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

const subServices = [
  {
    title: "Institutional Innovation",
    description: "Build innovation governance models and cultures that foster creativity and continuous improvement.",
  },
  {
    title: "Emerging Technologies",
    description: "Strategic adoption of AI, IoT, VR/AR, and automation technologies to drive competitive advantage.",
  },
  {
    title: "Innovative Solutions Design",
    description: "Custom digital solutions designed to solve unique challenges and create new opportunities.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Innovation Assessment",
    description: "Evaluate your organization's innovation maturity and identify high-impact opportunities.",
  },
  {
    number: "02",
    title: "Technology Exploration",
    description: "Explore emerging technologies and assess their potential value for your organization.",
  },
  {
    number: "03",
    title: "Proof of Concept",
    description: "Rapid prototyping and testing of innovative solutions in controlled environments.",
  },
  {
    number: "04",
    title: "Scale & Integrate",
    description: "Scale successful innovations and integrate them into core business operations.",
  },
];

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI & Machine Learning",
    description: "Harness artificial intelligence to automate processes and unlock predictive insights.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "IoT Solutions",
    description: "Connected devices and sensors that enable real-time monitoring and smart operations.",
  },
  {
    icon: <Glasses className="w-6 h-6 text-primary" />,
    title: "VR/AR Experiences",
    description: "Immersive technologies for training, visualization, and customer engagement.",
  },
  {
    icon: <Cog className="w-6 h-6 text-primary" />,
    title: "Process Automation",
    description: "RPA and intelligent automation that eliminate manual work and reduce errors.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "Innovation Labs",
    description: "Dedicated environments for experimentation, prototyping, and rapid iteration.",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Future-Ready Design",
    description: "Solutions architected for flexibility and adaptation to emerging technologies.",
  },
];

const caseStudies = [
  {
    industry: "Manufacturing",
    title: "AI-Powered Quality Control",
    result: "Implemented computer vision AI for automated quality inspection on production lines.",
    metric: "95% Defect Detection",
  },
  {
    industry: "Healthcare",
    title: "VR Training Platform",
    result: "Created immersive VR training program for surgical procedures and medical education.",
    metric: "50% Training Time Reduction",
  },
  {
    industry: "Logistics",
    title: "IoT Fleet Management",
    result: "Deployed IoT sensors across vehicle fleet for real-time tracking and predictive maintenance.",
    metric: "30% Cost Reduction",
  },
];

export default function InnovationServices() {
  return (
    <ServicePageLayout
      serviceName="Innovation Services"
      tagline="Transform bold ideas into breakthrough solutions"
      description="We help organizations embrace emerging technologies and build cultures of innovation, turning disruptive ideas into tangible solutions that create lasting competitive advantage."
      heroIcon={<Lightbulb className="w-10 h-10 text-primary-foreground" />}
      subServices={subServices}
      processSteps={processSteps}
      features={features}
      caseStudies={caseStudies}
    />
  );
}
