import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface CaseStudy {
  industry: string;
  title: string;
  result: string;
  metric: string;
}

interface ServicePageLayoutProps {
  serviceName: string;
  tagline: string;
  description: string;
  heroIcon: ReactNode;
  processSteps: ProcessStep[];
  features: Feature[];
  caseStudies: CaseStudy[];
  subServices: { title: string; description: string }[];
}

export function ServicePageLayout({
  serviceName,
  tagline,
  description,
  heroIcon,
  processSteps,
  features,
  caseStudies,
  subServices,
}: ServicePageLayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(31,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,107,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link 
              to="/#services" 
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mb-8"
              >
                {heroIcon}
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6"
              >
                {serviceName}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-accent font-medium mb-4"
              >
                {tagline}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-primary-foreground/70 max-w-2xl"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <Link to="/#contact">
                  <Button variant="hero" size="xl">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sub-Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What We Offer
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                Our <span className="text-gradient">{serviceName}</span> Services
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {subServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                How We <span className="text-gradient">Deliver Results</span>
              </h2>
            </motion.div>
            
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary opacity-20 -translate-y-1/2" />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="bg-card rounded-2xl p-6 shadow-card relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                        <span className="text-primary-foreground font-display font-bold text-lg">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Key Benefits
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4">
                Why Choose Our <span className="text-gradient">{serviceName}</span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Success Stories
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mt-4">
                Real <span className="text-gradient">Results</span> for Real Clients
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-navy-light/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
                >
                  <span className="text-accent text-sm font-medium uppercase tracking-wider">
                    {study.industry}
                  </span>
                  <h3 className="font-display text-xl font-bold text-secondary-foreground mt-3 mb-4">
                    {study.title}
                  </h3>
                  <p className="text-secondary-foreground/70 mb-6">{study.result}</p>
                  <div className="pt-4 border-t border-secondary-foreground/10">
                    <span className="font-display text-3xl font-bold text-gradient">
                      {study.metric}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Transform Your{" "}
                <span className="text-gradient">{serviceName}</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how Top Tier Tech can help you achieve your goals with 
                our proven {serviceName.toLowerCase()} solutions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/#contact">
                  <Button variant="hero" size="xl">
                    Schedule a Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/#services">
                  <Button variant="outline" size="xl">
                    Explore All Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
