import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    description: "We analyze your current state, challenges, and opportunities to create a comprehensive roadmap.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy Development",
    description: "Our experts design a tailored strategy aligned with your business goals and industry best practices.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Implementation",
    description: "We execute the plan with precision, ensuring minimal disruption to your operations.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Optimization & Support",
    description: "Continuous improvement and support to maximize value and adapt to changing needs.",
    icon: TrendingUp,
  },
];

export const OurProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="process" className="py-24 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven methodology ensures successful outcomes at every stage
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/60 to-accent rounded-full" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 1;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative md:flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ marginTop: index === 0 ? 0 : undefined }}
                >
                  {/* Card */}
                  <div className={`md:w-5/12 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
                      {/* Number badge */}
                      <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                        {step.number}
                      </div>

                      <div className="pt-4">
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Decorative gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </div>
                  </div>

                  {/* Center icon - visible on desktop */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full items-center justify-center shadow-lg shadow-primary/30 z-10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Mobile icon */}
                  <div className="md:hidden absolute -left-2 top-6 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile timeline line */}
          <div className="md:hidden absolute left-3 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-primary/60 to-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};
