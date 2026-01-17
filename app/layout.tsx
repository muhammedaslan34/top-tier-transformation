import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "@/index.css";
import iconImage from "@/asesst/icon.png";

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

export const metadata: Metadata = {
  title: "Top Tier Tech | Digital Transformation & Technology Consulting",
  description: "Top Tier Tech partners with enterprises and government entities to design, implement, and govern advanced digital solutions using data, cloud, and emerging technologies.",
  keywords: "digital transformation, technology consulting, cloud computing, data governance, enterprise solutions",
  authors: [{ name: "Top Tier Tech" }],
  openGraph: {
    title: "Top Tier Tech | Engineering Digital Excellence",
    description: "Your trusted partner for digital transformation and technology consulting. We design, implement, and govern advanced digital solutions.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TopTierTech",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  icons: {
    icon: iconImage.src,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
