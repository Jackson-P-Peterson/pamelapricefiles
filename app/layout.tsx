import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pamelapricefiles.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteDescription =
  "The definitive exposé of Pamela Price — recalled by 62.9% of Alameda County voters. Prosecutorial failures, victim betrayals, nepotism, Special Directive 23-01, and the 2026 comeback attempt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Pamela Price Files | Alameda County's Recalled DA Exposed",
    template: "%s | The Pamela Price Files",
  },
  description: siteDescription,
  applicationName: "The Pamela Price Files",
  authors: [{ name: "Americans for Opportunity", url: "https://opportunity.vote" }],
  creator: "Americans for Opportunity",
  publisher: "Americans for Opportunity",
  category: "Politics",
  keywords: [
    "Pamela Price",
    "Pamela Price recall",
    "Pamela Price files",
    "Alameda County District Attorney",
    "Alameda County DA recall",
    "Pamela Price 2026",
    "Special Directive 23-01",
    "progressive prosecutor recall",
    "Oakland DA",
    "Alameda County voters",
    "Jasper Wu",
    "Delonzo Logwood",
    "Blake Mohs",
    "Dijon Holifield",
    "Antwon Cloird",
    "opposition research",
    "Pamela Price scandal",
    "Alameda County crime",
    "district attorney recall California",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "THE PAMELA PRICE FILES",
    description:
      "62.9% of voters recalled her. She's running again. This dossier documents every failure, betrayal, and scandal that removed Alameda County's District Attorney.",
    type: "website",
    locale: "en_US",
    siteName: "The Pamela Price Files",
    url: SITE_URL,
    images: [
      {
        url: "/Pamela_Price.webp",
        width: 1602,
        height: 999,
        alt: "Pamela Price, recalled Alameda County District Attorney — The Pamela Price Files opposition research dossier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE PAMELA PRICE FILES",
    description:
      "The largest DA recall by volume in recent U.S. history. Every scandal. Every victim. Every fact.",
    images: ["/Pamela_Price.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Alameda County",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "The Pamela Price Files",
      description: siteDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "The Pamela Price Files | Alameda County's Recalled DA Exposed",
      description: siteDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Person",
        name: "Pamela Price",
        jobTitle: "Former Alameda County District Attorney",
        description:
          "Recalled Alameda County District Attorney who received 62.9% recall vote in November 2024.",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Pamela_Price.webp`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Americans for Opportunity",
      url: "https://opportunity.vote",
      email: "contact@pamelapricefiles.com",
    },
    {
      "@type": "Article",
      headline: "The Pamela Price Files: Opposition Research on Alameda County's Recalled District Attorney",
      description: siteDescription,
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/Pamela_Price.webp`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      about: {
        "@type": "Person",
        name: "Pamela Price",
      },
      keywords:
        "Pamela Price, Alameda County DA, recall, opposition research, Special Directive 23-01",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
