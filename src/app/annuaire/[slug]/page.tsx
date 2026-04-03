import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";

export const dynamic = "force-dynamic";

const cities = citiesData as City[];

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const deptCities = cities.filter(c => c.department_code === slug);
  if (deptCities.length === 0) return {};
  const deptName = deptCities[0].department_name;
  return {
    title: `Démoussage Toiture ${deptName} (${slug}) — Prix et Artisans`,
    description: `Démoussage de toiture en ${deptName} (${slug}) : ${deptCities.length} communes couvertes. Tarifs, artisans couvreurs et devis gratuits.`,
    alternates: { canonical: `https://www.prix-demoussage-toiture.fr/annuaire/${slug}` },
  };
}

export default async function AnnuaireDeptPage({ params }: { params: Params }) {
  const { slug } = await params;
  const deptCities = cities
    .filter(c => c.department_code === slug)
    .sort((a, b) => b.population - a.population);

  if (deptCities.length === 0) notFound();
  const deptName = deptCities[0].department_name;

  // Nearby departments
  const allDeptCodes = [...new Set(cities.map(c => c.department_code))].sort();
  const currentIdx = allDeptCodes.indexOf(slug);
  const nearbyDepts = allDeptCodes
    .filter((_, i) => Math.abs(i - currentIdx) <= 3 && _ !== slug)
    .slice(0, 6);

  const nearbyDeptInfo = nearbyDepts.map(code => {
    const first = cities.find(c => c.department_code === code);
    return { code, name: first?.department_name || code };
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Annuaire", item: "https://www.prix-demoussage-toiture.fr/annuaire" },
          { "@type": "ListItem", position: 3, name: deptName, item: `https://www.prix-demoussage-toiture.fr/annuaire/${slug}` },
        ],
      }) }} />

      <nav className="bg-stone-100 border-b border-stone-200 text-xs text-stone-500" aria-label="Fil d'Ariane">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/annuaire" className="hover:text-blue-700">Annuaire</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{deptName} ({slug})</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">{deptCities.length} communes</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
            Démoussage toiture en <span className="text-blue-700">{deptName}</span>
            <span className="text-stone-400 text-2xl"> ({slug})</span>
          </h1>
          <div className="energy-separator mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {deptCities.map(city => (
            <Link
              key={city.slug}
              href={`/demoussage-toiture/${city.slug}`}
              className="bg-white hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-sm font-medium py-3 px-4 rounded-xl border border-stone-200 hover:border-blue-300 transition-all hover:shadow-md"
            >
              <span className="block font-heading font-bold">{city.name}</span>
              <span className="text-xs text-stone-400">{city.zip}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 rounded-2xl p-8 text-center text-white mb-12">
          <h2 className="font-heading text-2xl font-black">
            Devis démoussage en <span className="text-blue-400">{deptName}</span>
          </h2>
          <p className="text-stone-400 mt-2 text-sm">Comparez les prix des artisans couvreurs.</p>
          <Link href="/devis" className="btn-cta mt-4 inline-flex">
            Devis gratuit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Nearby departments */}
        {nearbyDeptInfo.length > 0 && (
          <section>
            <h2 className="font-heading text-xl font-bold text-stone-900 mb-4">Départements voisins</h2>
            <div className="flex flex-wrap gap-2">
              {nearbyDeptInfo.map(d => (
                <Link key={d.code} href={`/annuaire/${d.code}`} className="text-xs bg-stone-100 hover:bg-blue-50 text-stone-600 hover:text-blue-700 px-3 py-1.5 rounded border border-stone-200 hover:border-blue-200 transition-colors">
                  {d.name} ({d.code})
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8">
          <Link href="/annuaire" className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Tous les départements
          </Link>
        </div>
      </div>
    </>
  );
}
