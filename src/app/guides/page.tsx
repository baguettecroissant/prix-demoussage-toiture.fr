import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">Guides &amp; conseils</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
          Guides <span className="text-blue-700">démoussage toiture</span>
        </h1>
        <div className="energy-separator mx-auto mt-4" />
        <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
          Tout savoir sur le démoussage de toiture : prix, techniques, calendrier, comparatifs. 8 guides experts pour entretenir votre couverture.
        </p>
      </div>

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
  );
}
