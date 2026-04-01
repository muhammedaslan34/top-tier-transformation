"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import logoImage from "@/asesst/logo.png";
import { GB, SA } from "country-flag-icons/react/3x2";

const services = [
  { key: "digitalTransformation", href: "/services/digital-transformation" },
  { key: "dataGovernance", href: "/services/data-governance" },
  { key: "cloudComputing", href: "/services/cloud-computing" },
  { key: "beneficiaryExperience", href: "/services/beneficiary-experience" },
  { key: "innovationServices", href: "/services/innovation-services" },
  { key: "governanceRiskCompliance", href: "/services/governance-risk-compliance" },
];

const navItems = [
  { key: "about", href: "/about" },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const normalizeLangCode = (lang?: string) => (lang || "").split("-")[0].toLowerCase();
  const currentLang = normalizeLangCode(i18n.resolvedLanguage || i18n.language);
  const languages = [
    { code: "en", name: "English", FlagIcon: GB },
    { code: "ar", name: "العربية", FlagIcon: SA },
  ];

  const oppositeLang = languages.find((l) => l.code !== currentLang) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 lg:px-8 mt-4">
        <nav className="flex items-center justify-between h-20">
          {/* Desktop Nav */}
          <section className="hidden md:block w-full">
            <div className={`transition-all duration-300 rounded-lg px-6 py-3 ${
              isScrolled
                ? "bg-secondary/80 backdrop-blur-sm"
                : "bg-transparent"
            }`}>
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                  <img 
                    src={logoImage.src} 
                    alt="Top Tier Tech Logo" 
                    className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </Link>
                
                {/* Navigation Items */}
                <div className="flex items-center gap-4">
                  {/* Services Dropdown */}
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link 
                      href="/services"
                      className="flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors duration-200"
                    >
                      {t("header.services")}
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
                                key={service.key}
                                href={service.href}
                                className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                              >
                                {t(`services.${service.key}.title`)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors duration-200"
                    >
                      {t(`header.${item.key}`)}
                    </Link>
                  ))}
                  
                  {/* Language Switcher - Flag Button */}
                  <button
                    onClick={() => {
                      changeLanguage(oppositeLang.code);
                    }}
                    className="flex items-center justify-center p-1.5 hover:bg-primary-foreground/10 transition-all duration-200 hover:scale-110"
                    aria-label={`Switch to ${oppositeLang.name || "other language"}`}
                    title={`Switch to ${oppositeLang.name || "other language"}`}
                  >
                    {/* Show only the opposite language flag */}
                    <div className="w-7 h-5 overflow-hidden flex-shrink-0 rounded-[2px]">
                      <oppositeLang.FlagIcon
                        title={oppositeLang.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>

                  <Link href="/contact">
                    <Button variant="hero" size="default">
                      {t("common.requestConsultation")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Logo and Menu Button */}
          <div className={`md:hidden flex items-center justify-between w-full transition-all duration-300 rounded-lg px-4 py-3 ${
            isScrolled
              ? "bg-secondary/80 backdrop-blur-sm"
              : "bg-transparent"
          }`}>
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src={logoImage.src} 
                alt="Top Tier Tech Logo" 
                className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
              />
            </Link>
            <button
              className="text-primary-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                    href="/services"
                    className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("header.services")}
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
                            key={service.key}
                            href={service.href}
                            className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-1 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(`services.${service.key}.title`)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(`header.${item.key}`)}
              </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t border-primary-foreground/10 mt-2">
                <button
                  onClick={() => {
                    changeLanguage(oppositeLang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 hover:bg-primary-foreground/10 transition-all duration-200"
                  aria-label={`Switch to ${oppositeLang.name || "other language"}`}
                >
                  <>
                    <div className="w-7 h-5 overflow-hidden flex-shrink-0 rounded-[2px]">
                      <oppositeLang.FlagIcon
                        title={oppositeLang.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-primary-foreground/80 font-medium">
                      {t("common.language", "Language")}: {oppositeLang.name}
                    </span>
                  </>
                </button>
              </div>

              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="hero" size="default" className="w-full mt-2">
                  {t("common.requestConsultation")}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}