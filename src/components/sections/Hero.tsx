import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero rounded-b-[1.5rem] sm:rounded-b-[2rem] md:rounded-b-[3rem] lg:rounded-b-[5rem] py-12 sm:py-16 md:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(31,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,107,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] md:bg-[size:60px_60px] rounded-xl" />
        
        {/* Floating orbs - smaller on mobile */}
        <motion.div animate={{
        y: [-20, 20, -20]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl" />
        <motion.div animate={{
        y: [20, -20, 20]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass mb-5 sm:mb-6 md:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-primary-foreground/80 text-xs sm:text-sm font-medium">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.1
        }} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-foreground leading-[1.3] sm:leading-[1.25] md:leading-tight mb-5 sm:mb-6 md:mb-8 px-2 sm:px-4">
            {t("hero.headline")}{" "}
            <span className="text-gradient">{t("hero.headlineHighlight")}</span> {t("hero.headlineEnd")}
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/75 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6 leading-relaxed">
            {t("hero.subheadline")}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                {t("hero.requestConsultation")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                {t("hero.exploreServices")}
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-primary-foreground/10 px-4">
            <p className="text-primary-foreground/50 text-xs sm:text-sm mb-4 sm:mb-5">
              {t("hero.trustedBy")}
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
              {["enterprise", "government", "healthcare", "finance"].map((sector, i) => <div key={sector} className="text-primary-foreground/40 font-display font-semibold text-sm sm:text-base md:text-lg">
                  {t(`hero.${sector}`)}
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      
    </section>;
}