import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ Démoussage Toiture — Questions Fréquentes",
  description: "Toutes les réponses à vos questions sur le démoussage de toiture : prix, fréquence, meilleure période, techniques, hydrofuge, garantie.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/faq" },
};

const FAQS = [
  { q: "Combien coûte un démoussage de toiture ?", a: "Le prix du démoussage de toiture varie de 15€ à 45€ par m² selon le type de traitement. Un nettoyage simple coûte 15-25€/m², un démoussage avec anti-mousse 20-35€/m², et un traitement complet avec hydrofuge 25-45€/m². Pour une maison standard (100 m²), comptez entre 1 500€ et 4 500€ tout compris." },
  { q: "Quelle est la meilleure période pour démousser sa toiture ?", a: "Les meilleures périodes sont le printemps (mars à mai) et l'automne (septembre à novembre). Évitez les périodes de gel, de fortes chaleurs ou de pluie intense. Le traitement anti-mousse est plus efficace par temps sec avec des températures entre 10°C et 25°C." },
  { q: "Tous les combien faut-il démousser sa toiture ?", a: "En moyenne, une toiture doit être démoussée tous les 5 à 10 ans selon le climat et l'environnement. En zone humide (Bretagne, Normandie) : 4-6 ans. En zone tempérée : 6-8 ans. En zone sèche (Méditerranée) : 8-12 ans. Avec un hydrofuge, ces délais sont multipliés par 1,5 à 2." },
  { q: "Le nettoyage haute pression est-il dangereux pour les tuiles ?", a: "Un Kärcher trop puissant (plus de 100 bars) ou mal utilisé peut casser, déplacer ou éroder les tuiles, surtout les tuiles terre cuite et les ardoises. Les professionnels utilisent une pression contrôlée (50-80 bars) avec un angle adapté. Pour les tuiles fragiles, le traitement chimique sans pression est préférable." },
  { q: "Qu'est-ce qu'un traitement hydrofuge ?", a: "L'hydrofuge est un produit imperméabilisant appliqué après le démoussage. Il crée une barrière invisible qui empêche l'eau de pénétrer dans les tuiles tout en laissant la toiture respirer. Un hydrofuge de qualité protège votre couverture pendant 8 à 12 ans et retarde la repousse de mousse." },
  { q: "Peut-on démousser sa toiture soi-même ?", a: "Un traitement préventif depuis le sol (pulvérisation d'anti-mousse) est la seule intervention DIY raisonnable. Monter sur le toit est dangereux et déconseillé sans équipement professionnel. Le risque de chute et d'endommagement des tuiles est élevé." },
  { q: "Le démoussage est-il déductible des impôts ?", a: "Non, le démoussage ne bénéficie pas de crédit d'impôt. Cependant, si les travaux sont réalisés dans un logement de plus de 2 ans, la TVA réduite à 10% s'applique sur la main-d'œuvre au lieu de 20%. Demandez une facture détaillée." },
  { q: "Mousse, lichen, algues : quelle différence ?", a: "La mousse est verte, épaisse et spongieuse — elle retient l'eau. Le lichen forme des plaques grises et croûteuses, très tenaces. Les algues créent des traces noires ou rouges. Chaque problème nécessite un traitement adapté. La mousse est le plus courant et le plus nuisible pour les tuiles." },
  { q: "Quelle garantie sur un démoussage professionnel ?", a: "Les artisans sérieux offrent une garantie de 2 à 5 ans sur le démoussage et de 5 à 10 ans sur l'hydrofuge. Exigez une attestation de garantie écrite et vérifiez que l'artisan dispose d'une assurance décennale. Un devis détaillé est indispensable." },
  { q: "Le démoussage augmente-t-il la durée de vie de la toiture ?", a: "Oui. Un entretien régulier prolonge la durée de vie de votre couverture de 10 à 20 ans. Sans démoussage, la mousse provoque infiltrations, gel-dégel et dégradation des tuiles. Le coût d'un démoussage préventif (1 500-3 500€) est 5 à 10x inférieur à une réfection complète (8 000-15 000€)." },
];

export default function FAQPage() {
  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.prix-demoussage-toiture.fr/faq" },
        ],
      }) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">FAQ</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
            Questions <span className="text-blue-700">fréquentes</span>
          </h1>
          <div className="energy-separator mx-auto mt-4" />
        </div>

        <div className="space-y-4 mb-12">
          {FAQS.map((f, i) => (
            <div key={i} className="card-hover p-5">
              <h2 className="font-heading font-bold text-stone-900 mb-2">{f.q}</h2>
              <p className="text-sm text-stone-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 rounded-2xl p-8 text-center text-white">
          <h2 className="font-heading text-2xl font-black">Une question <span className="text-blue-400">spécifique</span> ?</h2>
          <p className="text-stone-400 mt-2 text-sm">Demandez directement un devis gratuit à un artisan couvreur.</p>
          <Link href="/devis" className="btn-cta mt-4 inline-flex">
            Devis gratuit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
