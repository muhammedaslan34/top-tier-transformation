import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "@/asesst/logo.png";

const services = [
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "Data Governance", href: "/services/data-governance" },
  { label: "Cloud Computing", href: "/services/cloud-computing" },
  { label: "Beneficiary Experience", href: "/services/beneficiary-experience" },
  { label: "Innovation Services", href: "/services/innovation-services" },
  { label: "Governance, Risk & Compliance", href: "/services/governance-risk-compliance" },
];

const navItems = [
  { label: "About", href: "/about" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Top Tier Tech Logo" 
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link 
                to="/services"
                className="flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors duration-200"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                />
              </Link>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl overflow-hidden"
                  >
                    <div className="py-2">
                     
                        
                      {services.map((service) => (
                        <Link
                          key={service.label}
                          to={service.href}
                          className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="hero" size="default">
                Request Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-secondary/95 backdrop-blur-lg rounded-b-2xl pb-6"
          >
            <div className="flex flex-col gap-2 px-4">
              {/* Mobile Services Accordion */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="text-primary-foreground/80 hover:text-primary-foreground p-2 transition-colors"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-2">
                        {services.map((service) => (
                          <Link
                            key={service.label}
                            to={service.href}
                            className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-1 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="hero" size="default" className="w-full mt-2">
                  Request Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}