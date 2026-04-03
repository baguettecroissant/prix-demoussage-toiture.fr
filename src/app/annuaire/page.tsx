import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";

export const metadata: Metadata = {
  title: "Annuaire Démoussage Toiture par Département — 35 000+ Communes",
  description: "Retrouvez les prix du démoussage de toiture dans votre département. Annuaire complet de plus de 35 000 communes françaises.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/annuaire" },
};

const cities = citiesData as City[];

export default function AnnuairePage() {
  // Group by department
  const departments = new Map<string, { code: string; name: string; count: number }>();
  cities.forEach((c) => {
    const key = c.department_code;
    if (!departments.has(key)) {
      departments.set(key, { code: key, name: c.department_name, count: 0 });
    }
    departments.get(key)!.count++;
  });

  const sortedDepts = Array.from(departments.values()).sort((a, b) => a.code.localeCompare(b.code));

  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Annuaire", item: "https://www.prix-demoussage-toiture.fr/annuaire" },
        ],
      }) }} />

    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="h-6 w-6 text-blue-600" />
          <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">Annuaire</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
          Démoussage toiture <span className="text-blue-700">par département</span>
        </h1>
        <div className="energy-separator mx-auto mt-4" />
        <p className="text-stone-600 mt-4 max-w-2xl mx-auto">
          {cities.length.toLocaleString("fr-FR")} communes couvertes dans toute la France. Sélectionnez votre département pour trouver les prix de démoussage dans votre ville.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sortedDepts.map((dept) => (
          <Link
            key={dept.code}
            href={`/annuaire/${dept.code}`}
            className="bg-white hover:bg-blue-50 text-stone-700 hover:text-blue-700 py-3 px-4 rounded-xl border border-stone-200 hover:border-blue-300 transition-all hover:shadow-md"
          >
            <span className="font-heading font-bold text-sm block">{dept.name}</span>
            <span className="text-xs text-stone-400">({dept.code}) — {dept.count} villes</span>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
