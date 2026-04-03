import type { Metadata } from "next";
import { Lexend, Lato, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", display: "swap" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-lato", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Prix Démoussage Toiture 2026 — Tarifs au m² et Devis Gratuits",
    template: "%s | prix-demoussage-toiture.fr",
  },
  description: "Démoussage et nettoyage de toiture : prix au m², techniques (Kärcher, anti-mousse, hydrofuge), devis gratuits dans 35 000+ communes. Guide expert indépendant 2026.",
  metadataBase: new URL("https://www.prix-demoussage-toiture.fr"),
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "prix-demoussage-toiture.fr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" as const, "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${lexend.variable} ${lato.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">
        {/* Schema.org — Organization */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "prix-demoussage-toiture.fr",
          url: "https://www.prix-demoussage-toiture.fr",
          description: "Guide expert des prix du démoussage et nettoyage de toiture en France",
          contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "French" },
        }) }} />
        {/* Schema.org — WebSite + SearchAction */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "prix-demoussage-toiture.fr",
          url: "https://www.prix-demoussage-toiture.fr",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.prix-demoussage-toiture.fr/demoussage-toiture/{search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }) }} />
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
