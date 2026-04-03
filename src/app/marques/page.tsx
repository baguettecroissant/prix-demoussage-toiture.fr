import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { getAllBrands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Marques & Réseaux Démoussage Toiture — Comparatif",
  description: "Comparatif des marques et réseaux de démoussage toiture : Technitoit, Algimouss, Dalep, Sikagard, Guard Industrie, Préservation du Patrimoine.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/marques" },
};

export default function MarquesPage() {
  const brands = getAllBrands();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Layers className="h-6 w-6 text-blue-600" />
          <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">Marques &amp; Réseaux</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
          Marques de <span className="text-blue-700">démoussage toiture</span>
        </h1>
        <div className="energy-separator mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map(brand => (
          <Link key={brand.slug} href={`/marques/${brand.slug}`} className="card-hover p-6 group">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-lg text-stone-900 group-hover:text-blue-700 transition-colors">{brand.name}</h2>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">{brand.gamme}</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 mb-3">{brand.description}</p>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>{brand.origin}</span>
              <span className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">Voir →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
