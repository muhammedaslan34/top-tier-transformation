"use client";

import { Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import logoImage from "@/asesst/logo.png";

const footerLinks = {
  services: [
    { key: "digitalTransformation", href: "/services/digital-transformation" },
    { key: "dataGovernance", href: "/services/data-governance" },
    { key: "cloudComputing", href: "/services/cloud-computing" },
    { key: "beneficiaryExperience", href: "/services/beneficiary-experience" },
    { key: "innovationServices", href: "/services/innovation-services" },
    { key: "governanceRiskCompliance", href: "/services/governance-risk-compliance" },
  ],
  company: [
    { key: "aboutUs", href: "/about" },
    { key: "whyChooseUs", href: "/#why-us" },
    { key: "services", href: "/services" },
    { key: "contact", href: "/contact" },
  ],
  legal: [
    { key: "privacyPolicy", href: "/privacy" },
    { key: "termsOfService", href: "/terms" },
    { key: "cookiePolicy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/toptiertech", label: "LinkedIn", external: true },
  { icon: Twitter, href: "https://twitter.com/toptiertech", label: "Twitter", external: true },
  { icon: Mail, href: "mailto:sales@toptiertech.com", label: "Email", external: true },
];

export function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.split("#")[1];
    
    // If we're already on the homepage, just scroll to the section
    if (pathname === "/") {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure smooth scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    } else {
      // Navigate to homepage with hash - Home component will handle scrolling
      router.push(`/#${hash}`);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src={logoImage.src} 
                alt="Top Tier Tech Logo" 
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
              />
            </Link>
            <p className="text-secondary-foreground/70 max-w-sm mb-6">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                if (social.external) {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  );
                }
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                  >
                    {t(`services.${link.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => {
                // Handle hash links for homepage sections
                if (link.href.startsWith("/#")) {
                  return (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200 cursor-pointer"
                      >
                        {t(`footer.${link.key}`)}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                    >
                      {t(`footer.${link.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          {/* <p className="text-secondary-foreground/50 text-sm">
            Engineering Digital Excellence
          </p> */}
        </div>
      </div>
    </footer>
  );
}
