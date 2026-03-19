import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { StructuredData } from "./components/StructuredData";
import "@/index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toptiertech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Top Tier Tech | Digital Transformation & Technology Consulting",
    template: "%s | Top Tier Tech",
  },
  description: "Top Tier Tech partners with enterprises and government entities to design, implement, and govern advanced digital solutions using data, cloud, and emerging technologies. Expert consulting for digital transformation.",
  keywords: [
    "digital transformation",
    "technology consulting",
    "cloud computing",
    "data governance",
    "enterprise solutions",
    "IT consulting",
    "digital strategy",
    "cloud migration",
    "data analytics",
    "enterprise architecture",
    "government technology",
    "business transformation",
  ],
  authors: [{ name: "Top Tier Tech" }],
  creator: "Top Tier Tech",
  publisher: "Top Tier Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: siteUrl,
    siteName: "Top Tier Tech",
    title: "Top Tier Tech | Engineering Digital Excellence",
    description: "Your trusted partner for digital transformation and technology consulting. We design, implement, and govern advanced digital solutions for enterprises and government entities.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Top Tier Tech - Digital Transformation & Technology Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TopTierTech",
    creator: "@TopTierTech",
    title: "Top Tier Tech | Engineering Digital Excellence",
    description: "Your trusted partner for digital transformation and technology consulting.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/en`,
      "ar-SA": `${siteUrl}/ar`,
    },
  },
  category: "Technology",
  classification: "Business",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        <StructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
