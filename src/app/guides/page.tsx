import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, TrendingUp } from "lucide-react";
import { getAllGuides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides Démoussage Toiture — Conseils, Prix et Techniques",
  description: "Tous nos guides experts sur le démoussage de toiture : prix au m², techniques de nettoyage, traitement hydrofuge, calendrier, et plus encore.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/guides" },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.prix-demoussage-toiture.fr/guides" },
        ],
      }) }} />
      <section className="relative bg-stone-950 text-white overflow-hidden">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/guides-hero.png"
            alt="Outils de démoussage professionnels"
            fill
            priority
            className="object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-6 bg-blue-600/20 text-blue-400 border border-blue-500/30 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs uppercase tracking-widest font-heading font-bold">Guides &amp; conseils</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
            Guides <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">démoussage toiture</span>
          </h1>
          
          <p className="text-stone-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Tout savoir sur l&apos;entretien de votre couverture : prix, comparatif de techniques, hydrofuge et calendrier. Nos experts vous répondent.
          </p>
        </div>
        
        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-green-500 to-blue-600" />
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-16">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map(guide => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card-hover p-6 group">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-heading font-bold">{guide.readTime}</span>
            </div>
            <h2 className="font-heading font-bold text-lg text-stone-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
              {guide.title}
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
