import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Database,
  Cloud,
  Users,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Digital Transformation",
    description:
      "Benchmark studies, leadership training, and strategic planning to accelerate your digital journey.",
    features: ["Benchmark Studies", "Leadership & Capacity Building", "Strategic Planning"],
    href: "/services/digital-transformation",
  },
  {
    icon: Database,
    title: "Data Governance",
    description:
      "Ensure data quality, security, and access management across your organization.",
    features: ["Data Quality", "Data Security", "Access Management"],
    href: "/services/data-governance",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description:
      "Infrastructure analysis, system selection, and seamless transition planning.",
    features: ["Infrastructure Analysis", "System Selection", "Transition Planning"],
    href: "/services/cloud-computing",
  },
  {
    icon: Users,
    title: "Beneficiary Experience",
    description:
      "User journey analysis, UX measurement, and digital service optimization.",
    features: ["Experience Study", "UX Measurement", "Maturity Enhancement"],
    href: "/services/beneficiary-experience",
  },
  {
    icon: Lightbulb,
    title: "Innovation Services",
    description:
      "Institutional innovation, emerging technologies, and custom digital solutions.",
    features: ["AI & Automation", "IoT & VR/AR", "Custom Solutions"],
    href: "/services/innovation-services",
  },
  {
    icon: ShieldCheck,
    title: "Governance, Risk & Compliance",
    description:
      "Regulatory compliance, risk management, and IT governance frameworks.",
    features: ["Compliance Management", "Risk Management", "IT Governance"],
    href: "/services/governance-risk-compliance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6"
          >
            Comprehensive Solutions for{" "}
            <span className="text-gradient">Digital Success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From strategy to implementation, we provide end-to-end services to help you 
            navigate your digital transformation journey with confidence.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                to={service.href}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
