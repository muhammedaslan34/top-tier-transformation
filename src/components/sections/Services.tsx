import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

export function Services() {
  const { t } = useTranslation();
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
            {t("services.title")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6"
          >
            {t("services.heading")}{" "}
            <span className="text-gradient">{t("services.headingHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t("services.description")}
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
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-muted-foreground mb-6">{t(`services.${service.key}.description`)}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {t(`services.${service.key}.features`, { returnObjects: true }).map((feature: string, idx: number) => (
                  <li
                    key={idx}
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
                {t("common.learnMore")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
