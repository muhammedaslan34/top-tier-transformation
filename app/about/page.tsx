"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Users, Shield, TrendingUp, Award, Globe, Lightbulb, Heart } from "lucide-react";

const values = [
  { icon: Target, key: "excellence" },
  { icon: Users, key: "collaboration" },
  { icon: Shield, key: "integrity" },
  { icon: Lightbulb, key: "innovation" },
];

const stats = [
  { value: "100+", key: "projectsDelivered" },
  { value: "50+", key: "enterpriseClients" },
  { value: "95%", key: "clientSatisfaction" },
  { value: "15+", key: "yearsExperience" },
];

const team = [
  {
    name: "Leadership Team",
    description: "Experienced executives with decades of combined experience in digital transformation and technology consulting.",
  },
  {
    name: "Technology Experts",
    description: "Certified professionals in cloud computing, data governance, and enterprise architecture.",
  },
  {
    name: "Industry Specialists",
    description: "Domain experts across healthcare, finance, government, and enterprise sectors.",
  },
];

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {t("about.title")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
          >
            {t("about.heading")}{" "}
            <span className="text-gradient">{t("about.headingHighlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("about.description")}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-muted-foreground font-medium">{t(`about.stats.${stat.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t("about.mission.title")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
                {t("about.mission.heading")}{" "}
                <span className="text-gradient">{t("about.mission.headingHighlight")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("about.mission.description1")}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("about.mission.description2")}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{t("about.mission.globalReach")}</h3>
                    <p className="text-muted-foreground">{t("about.mission.globalReachDesc")}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t("about.mission.certifications")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t("about.mission.clientCentric")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{t("about.mission.provenTrackRecord")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {t("about.values.title")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
              {t("about.values.heading")} <span className="text-gradient">{t("about.values.headingHighlight")}</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {t(`about.values.${value.key}`)}
                </h3>
                <p className="text-muted-foreground text-sm">{t(`about.values.${value.key}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
