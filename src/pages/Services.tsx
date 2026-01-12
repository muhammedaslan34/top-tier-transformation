import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Layers, 
  Database, 
  Cloud, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Layers,
    title: "Digital Transformation",
    description:
      "Benchmark studies, leadership capacity building, and strategic planning for organizational change. We help you navigate the complexities of digital evolution.",
    href: "/services/digital-transformation",
    subServices: ["Benchmark Studies", "Leadership & Capacity Building", "Strategic Planning"],
  },
  {
    icon: Database,
    title: "Data Governance",
    description:
      "Comprehensive data quality, security, and access management solutions for enterprise data assets. Ensure your data is accurate, secure, and accessible.",
    href: "/services/data-governance",
    subServices: ["Data Quality", "Data Security", "Access Management"],
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description:
      "Infrastructure analysis, system selection, and seamless transition planning to the cloud. Modernize your infrastructure for agility and scale.",
    href: "/services/cloud-computing",
    subServices: ["Infrastructure Analysis", "System Selection", "Transition Planning"],
  },
  {
    icon: Users,
    title: "Beneficiary Experience",
    description:
      "Experience studies, UX measurement, and maturity enhancement for customer-centric organizations. Put your users at the center of everything you do.",
    href: "/services/beneficiary-experience",
    subServices: ["Experience Study", "UX Measurement", "Maturity Enhancement"],
  },
  {
    icon: Lightbulb,
    title: "Innovation Services",
    description:
      "Institutional innovation, emerging technologies (AI, IoT, VR/AR), and innovative solution design. Stay ahead of the curve with cutting-edge solutions.",
    href: "/services/innovation-services",
    subServices: ["Institutional Innovation", "Emerging Technologies", "Innovative Solutions Design"],
  },
  {
    icon: ShieldCheck,
    title: "Governance, Risk & Compliance",
    description:
      "Comprehensive compliance management, risk assessment, and IT governance frameworks. Protect your organization while enabling growth.",
    href: "/services/governance-risk-compliance",
    subServices: ["Compliance Management", "Risk Management", "IT Governance"],
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

export default function Services() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,107,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-semibold text-sm uppercase tracking-wider"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
          >
            Comprehensive Solutions for{" "}
            <span className="text-gradient">Digital Success</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            From strategy to implementation, we provide end-to-end services to help you 
            navigate your digital transformation journey with confidence.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative"
              >
                <div className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 h-full flex flex-col overflow-hidden border border-transparent hover:border-primary/20">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Sub-services Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                      {service.subServices.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Decorative Corner Gradient */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our experts are here to help you identify the right solutions for your unique challenges.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Schedule a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
