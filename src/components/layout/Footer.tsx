import { Linkedin, Twitter, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoImage from "@/asesst/tttech.png";

const footerLinks = {
  services: [
    { label: "Digital Transformation", href: "/services/digital-transformation" },
    { label: "Data Governance", href: "/services/data-governance" },
    { label: "Cloud Computing", href: "/services/cloud-computing" },
    { label: "Beneficiary Experience", href: "/services/beneficiary-experience" },
    { label: "Innovation Services", href: "/services/innovation-services" },
    { label: "Governance, Risk & Compliance", href: "/services/governance-risk-compliance" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Why Choose Us", href: "/#why-us" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/toptiertech", label: "LinkedIn", external: true },
  { icon: Twitter, href: "https://twitter.com/toptiertech", label: "Twitter", external: true },
  { icon: Mail, href: "mailto:sales@toptiertech.com", label: "Email", external: true },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.split("#")[1];
    
    // If we're already on the homepage, just scroll to the section
    if (location.pathname === "/") {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure smooth scroll
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    } else {
      // Navigate to homepage with hash - Index component will handle scrolling
      navigate(`/#${hash}`);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src={logoImage} 
                alt="Top Tier Tech Logo" 
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-110"
              />
              <span className="font-display font-bold text-xl text-secondary-foreground">
                Top Tier Tech
              </span>
            </Link>
            <p className="text-secondary-foreground/70 max-w-sm mb-6">
              Engineering Digital Excellence. Your trusted partner for digital 
              transformation and technology consulting.
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
                    to={social.href}
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
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => {
                // Handle hash links for homepage sections
                if (link.href.startsWith("/#")) {
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleHashLink(e, link.href)}
                        className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200 cursor-pointer"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Top Tier Tech. All rights reserved.
          </p>
          <p className="text-secondary-foreground/50 text-sm">
            Engineering Digital Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
