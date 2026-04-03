import type { Metadata } from "next";
import { CheckCircle, Shield, Clock, ArrowRight, FileText } from "lucide-react";
import { ViteUnDevisWidget } from "@/components/affiliation/ViteUnDevisWidget";

export const metadata: Metadata = {
  title: "Devis Démoussage Toiture Gratuit — Comparez les Prix",
  description: "Demandez vos devis de démoussage toiture gratuits en 2 minutes. Comparez les prix et les artisans couvreurs dans votre ville. Service 100% gratuit et sans engagement.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/devis" },
};

const BENEFITS = [
  { icon: CheckCircle, text: "Gratuit et sans engagement" },
  { icon: Shield, text: "Artisans qualifiés et assurés" },
  { icon: Clock, text: "Réponse garantie sous 48h" },
  { icon: FileText, text: "Jusqu'à 5 devis comparatifs" },
];

export default function DevisPage() {
  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Devis", item: "https://www.prix-demoussage-toiture.fr/devis" },
        ],
      }) }} />

    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
          Devis <span className="text-blue-700">démoussage toiture</span> gratuit
        </h1>
        <div className="energy-separator mx-auto mt-4" />
        <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
          Remplissez le formulaire ci-dessous pour recevoir vos devis personnalisés. Service gratuit, rapide et sans engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Widget */}
        <div className="lg:col-span-2">
          <ViteUnDevisWidget />
        </div>

        {/* Benefits sidebar */}
        <div className="space-y-4">
          <div className="card-hover p-6">
            <h2 className="font-heading font-bold text-lg text-stone-900 mb-4">Pourquoi comparer ?</h2>
            <div className="space-y-4">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-sm text-stone-700">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-hover p-6 bg-blue-50/80">
            <h3 className="font-heading font-bold text-sm text-stone-900 mb-2">💡 Bon à savoir</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Comparer 3 à 5 devis peut vous faire économiser jusqu&apos;à 40% sur le coût de votre démoussage. Les écarts de prix entre artisans sont importants, même dans une même ville.
            </p>
          </div>

          <div className="card-hover p-6">
            <h3 className="font-heading font-bold text-sm text-stone-900 mb-2">Tarifs indicatifs 2026</h3>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex justify-between"><span>Nettoyage HP</span><span className="font-mono font-bold text-blue-700">15-25€/m²</span></li>
              <li className="flex justify-between"><span>Démoussage + anti-mousse</span><span className="font-mono font-bold text-blue-700">20-35€/m²</span></li>
              <li className="flex justify-between"><span>Complet + hydrofuge</span><span className="font-mono font-bold text-blue-700">25-45€/m²</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
