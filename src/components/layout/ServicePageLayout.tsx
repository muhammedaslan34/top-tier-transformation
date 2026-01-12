import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-primary-foreground/50" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/#services" className="text-primary-foreground/70 hover:text-primary-foreground">
                      Services
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-primary-foreground/50" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground font-medium">
                    {serviceName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
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
                <Link to="/contact">
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
                    className="relative flex"
                  >
                    <div className="bg-card rounded-2xl p-6 shadow-card relative z-10 w-full min-h-[200px] flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4 flex-shrink-0">
                        <span className="text-primary-foreground font-display font-bold text-lg">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
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

       

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
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
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow"
                    >
                      {heroIcon && (
                        <div className="text-primary-foreground [&_svg]:w-8 [&_svg]:h-8">
                          {heroIcon}
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Heading */}
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                      Ready to Transform Your{" "}
                      <span className="text-gradient">{serviceName}</span>?
                    </h2>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
                      Let's discuss how Top Tier Tech can help you achieve your goals with 
                      our proven {serviceName.toLowerCase()} solutions. Get started with a free consultation today.
                    </p>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link to="/contact" className="w-full sm:w-auto">
                      <Button variant="hero" size="xl" className="w-full sm:w-auto group/btn">
                        Schedule a Consultation
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/services" className="w-full sm:w-auto">
                      <Button variant="outline" size="xl" className="w-full sm:w-auto">
                        Explore All Services
                      </Button>
                    </Link>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                      <span>Expert Team</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
                      <span>Proven Results</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
