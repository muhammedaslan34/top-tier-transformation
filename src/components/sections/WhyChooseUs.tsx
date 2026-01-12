import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Target, 
  Building2, 
  ShieldCheck, 
  Expand, 
  BarChart3,
  CheckCircle2 
} from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Strategy-First Approach",
    description: "Every solution starts with understanding your unique business objectives and challenges.",
  },
  {
    icon: Building2,
    title: "Enterprise Experience",
    description: "Proven track record with Fortune 500 companies and government organizations.",
  },
  {
    icon: ShieldCheck,
    title: "Security by Design",
    description: "Security is embedded at every layer, not added as an afterthought.",
  },
  {
    icon: Expand,
    title: "Scalable Solutions",
    description: "Architectures designed to grow with your organization's evolving needs.",
  },
  {
    icon: BarChart3,
    title: "Measurable Outcomes",
    description: "Clear KPIs and metrics to track ROI and demonstrate business value.",
  },
];

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              <div className="bg-navy-light/50 backdrop-blur-sm rounded-3xl p-8 border border-primary/20">
                <div className="space-y-6">
                  {[
                    { label: "Project Success Rate", value: "98%" },
                    { label: "Client Retention", value: "95%" },
                    { label: "Enterprise Clients", value: "50+" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                    >
                      <span className="text-secondary-foreground/70">{stat.label}</span>
                      <span className="font-display text-2xl font-bold text-gradient">
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
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
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mt-4 mb-8">
              The <span className="text-gradient">Top Tier</span> Difference
            </h2>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
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
                      {reason.title}
                    </h4>
                    <p className="text-secondary-foreground/70">{reason.description}</p>
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
