import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
    key: "digitalTransformation",
    href: "/services/digital-transformation",
  },
  {
    icon: Database,
    key: "dataGovernance",
    href: "/services/data-governance",
  },
  {
    icon: Cloud,
    key: "cloudComputing",
    href: "/services/cloud-computing",
  },
  {
    icon: Users,
    key: "beneficiaryExperience",
    href: "/services/beneficiary-experience",
  },
  {
    icon: Lightbulb,
    key: "innovationServices",
    href: "/services/innovation-services",
  },
  {
    icon: ShieldCheck,
    key: "governanceRiskCompliance",
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

export default function Services() {
  const { t } = useTranslation();
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
            {t("servicesPage.title")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
          >
            {t("servicesPage.heading")}{" "}
            <span className="text-gradient">{t("servicesPage.headingHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("servicesPage.description")}
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
                key={service.key}
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
                      {t(`services.${service.key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {t(`services.${service.key}.description`)}
                    </p>

                    {/* Sub-services Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 flex-grow">
                      {Array.isArray(t(`services.${service.key}.features`, { returnObjects: true })) ? (t(`services.${service.key}.features`, { returnObjects: true }) as string[]).map((sub: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {sub}
                        </span>
                      )) : null}
                    </div>

                    {/* Link */}
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto"
                    >
                      {t("common.learnMore")}
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
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(31,107,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main CTA Card */}
            <div className="relative bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl p-8 md:p-12 shadow-card border border-primary/10 overflow-hidden group">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Decorative corner elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-primary rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  {/* Icon/Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow"
                  >
                    <ArrowRight className="w-8 h-8 text-primary-foreground rotate-[-45deg]" />
                  </motion.div>
                  
                  {/* Heading */}
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    {t("servicesPage.notSure")}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    {t("servicesPage.notSureDesc")}
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button variant="hero" size="xl" className="w-full sm:w-auto group/btn">
                      {t("servicesPage.scheduleConsultation")}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                  
                </div>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>{t("servicesPage.freeConsultation")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <span>{t("servicesPage.noObligation")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
                    <span>{t("servicesPage.expertGuidance")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
