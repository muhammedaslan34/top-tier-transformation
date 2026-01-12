import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Shield, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [{
  icon: Target,
  key: "strategyFirst"
}, {
  icon: Users,
  key: "expertTeam"
}, {
  icon: Shield,
  key: "securityFocus"
}, {
  icon: TrendingUp,
  key: "measurableImpact"
}];

export function WhoWeAre() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="about" className="py-24 bg-background rounded-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div ref={ref} initial={{
          opacity: 0,
          x: -50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.7
        }}>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {t("whoWeAre.title")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              {t("whoWeAre.heading")}{" "}
              <span className="text-gradient">{t("whoWeAre.headingHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("whoWeAre.description")}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => <motion.div key={feature.key} initial={{
              opacity: 0,
              y: 20
            }} animate={isInView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1
            }} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t(`whoWeAre.${feature.key}`)}</h4>
                    <p className="text-sm text-muted-foreground">{t(`whoWeAre.${feature.key}Desc`)}</p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10" />
              <div className="absolute inset-4 bg-card rounded-2xl shadow-card overflow-hidden">
                {/* Abstract pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.05)_50%,transparent_75%)] bg-[length:60px_60px]" />
                
                {/* Stats */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-6xl font-bold text-gradient mb-2">100+</div>
                    <p className="text-muted-foreground font-medium">{t("whoWeAre.projectsDelivered")}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <motion.div animate={{
              y: [-10, 10, -10]
            }} transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute -right-4 top-1/4 bg-card p-4 rounded-xl shadow-card-hover">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t("whoWeAre.enterpriseGrade")}</div>
                    <div className="text-sm text-muted-foreground">{t("whoWeAre.gradeSecurity")}</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div animate={{
              y: [10, -10, 10]
            }} transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }} className="absolute -left-4 bottom-1/4 bg-card p-4 rounded-xl shadow-card-hover">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">95%</div>
                    <div className="text-sm text-muted-foreground">{t("whoWeAre.clientSatisfaction")}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}