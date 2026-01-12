import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  Target, 
  Building2, 
  ShieldCheck, 
  Expand, 
  BarChart3,
  CheckCircle2 
} from "lucide-react";

// Custom hook for count-up animation
function useCountUp(end: number, duration: number = 2000, start: number = 0, isInView: boolean) {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, start, hasAnimated]);

  return count;
}

const reasons = [
  { icon: Target, key: "strategyFirst" },
  { icon: Building2, key: "enterpriseExperience" },
  { icon: ShieldCheck, key: "securityByDesign" },
  { icon: Expand, key: "scalableSolutions" },
  { icon: BarChart3, key: "measurableOutcomes" },
];

export function WhyChooseUs() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Define stats
  const stats = [
    { key: "projectSuccessRate", value: 98, isPercentage: true },
    { key: "clientRetention", value: 95, isPercentage: true },
    { key: "enterpriseClients", value: 50, isPercentage: false },
  ];

  // Call hooks at top level
  const successRate = useCountUp(98, 2000, 0, isInView);
  const clientRetention = useCountUp(95, 2000, 0, isInView);
  const enterpriseClients = useCountUp(50, 2000, 0, isInView);

  const animatedValues = [successRate, clientRetention, enterpriseClients];

  return (
    <section id="why-us" className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-navy-light/50 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-500 group"
              >
                <div className="space-y-6">
                  {stats.map((stat, index) => {
                    const animatedValue = animatedValues[index];
                    const displayValue = stat.isPercentage 
                      ? `${animatedValue}%` 
                      : `${animatedValue}+`;

                    return (
                      <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                        className="group/item relative p-4 bg-secondary/50 rounded-xl hover:bg-secondary/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-secondary-foreground/70 text-sm font-medium">
                            {t(`whyChooseUs.${stat.key}`)}
                          </span>
                          <span className="font-display text-3xl font-bold text-gradient">
                            {displayValue}
                          </span>
                        </div>
                        
                        {/* Progress Bar for percentages */}
                        {stat.isPercentage && (
                          <div className="relative h-2 bg-secondary-foreground/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${stat.value}%` } : {}}
                              transition={{ 
                                duration: 1.5, 
                                delay: 0.5 + index * 0.15,
                                ease: "easeOut"
                              }}
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full shadow-lg"
                            >
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    "0 0 10px rgba(31, 107, 255, 0.5)",
                                    "0 0 20px rgba(31, 107, 255, 0.8)",
                                    "0 0 10px rgba(31, 107, 255, 0.5)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="absolute inset-0 rounded-full"
                              />
                            </motion.div>
                          </div>
                        )}
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover/item:bg-primary/5 transition-colors duration-300 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Enhanced decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              {t("whyChooseUs.title")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mt-4 mb-8">
              {t("whyChooseUs.heading")} <span className="text-gradient">{t("whyChooseUs.headingHighlight")}</span> {t("whyChooseUs.headingEnd")}
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-foreground text-lg mb-1">
                      {t(`whyChooseUs.${reason.key}`)}
                    </h4>
                    <p className="text-secondary-foreground/70">{t(`whyChooseUs.${reason.key}Desc`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
