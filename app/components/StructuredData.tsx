export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toptiertech.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Top Tier Tech",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: "Top Tier Tech partners with enterprises and government entities to design, implement, and govern advanced digital solutions using data, cloud, and emerging technologies.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [
      "https://twitter.com/TopTierTech",
      "https://www.linkedin.com/company/toptiertech",
      "https://www.facebook.com/toptiertech",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Top Tier Tech",
    url: siteUrl,
    description: "Digital Transformation & Technology Consulting",
    publisher: {
      "@type": "Organization",
      name: "Top Tier Tech",
    },
    inLanguage: ["en-US", "ar-SA"],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Transformation & Technology Consulting",
    provider: {
      "@type": "Organization",
      name: "Top Tier Tech",
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact`,
      serviceType: "Online",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
