import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, MapPin, Leaf, Droplets, Sun, Clock, Shield, Thermometer, TrendingUp, AlertTriangle } from "lucide-react";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";
import { generateCityContent } from "@/lib/content/content-engine";

export const dynamic = "force-dynamic";

const cities = citiesData as City[];

function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

function findNearbyCities(city: City, count = 8): City[] {
  return cities
    .filter((c) => c.slug !== city.slug && c.department_code === city.department_code)
    .sort((a, b) => b.population - a.population)
    .slice(0, count);
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const city = findCity(slug);
  if (!city) return {};

  const title = `Démoussage Toiture à ${city.name} — Prix et Devis ${city.zip}`;
  const description = `Démoussage et nettoyage de toiture à ${city.name} (${city.zip}) ➜ Prix de 15 à 45€/m². Artisans couvreurs en ${city.department_name}. Devis gratuit sous 48h.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.prix-demoussage-toiture.fr/demoussage-toiture/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { slug } = await params;
  const city = findCity(slug);
  if (!city) notFound();

  const content = generateCityContent(city);
  const nearby = findNearbyCities(city);

  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
            { "@type": "ListItem", position: 2, name: `Démoussage ${city.department_name}`, item: `https://www.prix-demoussage-toiture.fr/annuaire/${city.department_code}` },
            { "@type": "ListItem", position: 3, name: `Démoussage ${city.name}`, item: `https://www.prix-demoussage-toiture.fr/demoussage-toiture/${slug}` },
          ],
        }),
      }} />

      {/* Schema.org — Service */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Démoussage de toiture à ${city.name}`,
          description: `Service de démoussage, nettoyage et traitement hydrofuge de toiture à ${city.name} (${city.zip})`,
          areaServed: {
            "@type": "City",
            name: city.name,
            containedInPlace: { "@type": "AdministrativeArea", name: city.department_name },
          },
          provider: { "@type": "Organization", name: "prix-demoussage-toiture.fr" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: content.pricing.totalMin,
            highPrice: content.pricing.totalMax,
            offerCount: 3,
          },
        }),
      }} />

      {/* Schema.org — FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      }} />

      {/* ── Breadcrumb ── */}
      <nav className="bg-stone-100 border-b border-stone-200 text-xs text-stone-500" aria-label="Fil d'Ariane">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/annuaire" className="hover:text-blue-700">Annuaire</Link>
          <span>/</span>
          <Link href={`/annuaire/${city.department_code}`} className="hover:text-blue-700">{city.department_name}</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{city.name}</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 text-stone-400 text-xs">
            <MapPin className="h-3.5 w-3.5" />
            <span>{city.name} — {city.zip} — {city.department_name}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
            Démoussage toiture à <span className="text-blue-400">{city.name}</span>
            <span className="block text-xl md:text-2xl text-stone-400 mt-2 font-normal">
              Nettoyage et traitement {city.zip}
            </span>
          </h1>

          <p className="text-stone-300 text-base md:text-lg mt-6 max-w-3xl leading-relaxed">
            {content.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/devis" className="btn-cta text-base px-8 py-4">
              Devis démoussage gratuit à {city.name}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* ── PRICING ── */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
            Prix du démoussage à <span className="text-blue-700">{city.name}</span>
          </h2>
          <div className="energy-separator mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-hover p-5 text-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-mono font-bold text-2xl text-blue-700">{content.pricing.pricePerM2Min}–{content.pricing.pricePerM2Max}€</p>
              <p className="text-xs text-stone-500 mt-1">Prix au m² (nettoyage + anti-mousse)</p>
            </div>
            <div className="card-hover p-5 text-center">
              <Shield className="h-6 w-6 text-green-700 mx-auto mb-2" />
              <p className="font-mono font-bold text-2xl text-green-700">{content.pricing.totalMin}–{content.pricing.totalMax}€</p>
              <p className="text-xs text-stone-500 mt-1">Budget 100 m² de toiture</p>
            </div>
            <div className="card-hover p-5 text-center bg-blue-50/60">
              <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="font-mono font-bold text-2xl text-blue-700">{content.pricing.hydrofugeMin}–{content.pricing.hydrofugeMax}€</p>
              <p className="text-xs text-stone-500 mt-1">Supplément hydrofuge /m²</p>
            </div>
            <div className="card-hover p-5 text-center">
              <Clock className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <p className="font-mono font-bold text-2xl text-amber-600">1–2 jours</p>
              <p className="text-xs text-stone-500 mt-1">Durée intervention moyenne</p>
            </div>
          </div>
        </section>

        {/* ── CLIMATE ── */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
            Climat et <span className="text-green-700">risque mousse</span> à {city.name}
          </h2>
          <div className="energy-separator mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-hover p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Zone climatique</p>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-600" />
                    <p className="font-heading font-bold text-stone-900">{content.climate.zone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Risque mousse</p>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <p className="font-heading font-bold text-stone-900 capitalize">{content.climate.mossRisk}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Fréquence recommandée</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <p className="font-heading font-bold text-stone-900">Tous les {content.climate.frequency}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Meilleure période</p>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <p className="font-heading font-bold text-stone-900 capitalize">{content.climate.bestPeriod}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover p-6">
              <h3 className="font-heading font-bold text-stone-900 mb-3">Marché local du démoussage</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{content.marketAnalysis}</p>
            </div>
          </div>
        </section>

        {/* ── TECHNIQUES ── */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
            Comparatif des <span className="text-blue-700">techniques</span>
          </h2>
          <div className="energy-separator mb-6" />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-950 text-white text-xs">
                  <th className="px-4 py-3 font-heading font-bold text-left rounded-tl-xl">Technique</th>
                  <th className="px-4 py-3 font-heading font-bold text-center">Prix /m²</th>
                  <th className="px-4 py-3 font-heading font-bold text-center">Durabilité</th>
                  <th className="px-4 py-3 font-heading font-bold text-center hidden md:table-cell">Avantages</th>
                  <th className="px-4 py-3 font-heading font-bold text-center rounded-tr-xl hidden md:table-cell">Inconvénients</th>
                </tr>
              </thead>
              <tbody>
                {content.techniques.map((tech, i) => (
                  <tr key={tech.name} className={`border-b border-stone-200 ${
                    i === 2 ? "bg-blue-50/80 border-l-4 border-l-blue-600" : i % 2 === 0 ? "bg-white" : "bg-stone-50"
                  }`}>
                    <td className="px-4 py-3">
                      <p className="font-heading font-bold text-stone-900 text-sm">{tech.name}</p>
                      {i === 2 && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Recommandé</span>}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700 text-center text-sm">{tech.price}</td>
                    <td className="px-4 py-3 font-mono text-center text-sm">{tech.durability}</td>
                    <td className="px-4 py-3 text-xs text-stone-600 hidden md:table-cell">{tech.pros}</td>
                    <td className="px-4 py-3 text-xs text-stone-500 hidden md:table-cell">{tech.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── ROOF TYPES ── */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
            Traitement par <span className="text-blue-700">type de couverture</span>
          </h2>
          <div className="energy-separator mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.roofTypes.map((roof) => (
              <div key={roof.name} className="card-hover p-5">
                <h3 className="font-heading font-bold text-stone-900 mb-2">{roof.name}</h3>
                <div className="space-y-2 text-sm text-stone-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span><strong>Méthode :</strong> {roof.method}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>Prix :</strong> {roof.price}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                    <span><strong>Attention :</strong> {roof.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
            Questions fréquentes — Démoussage à <span className="text-blue-700">{city.name}</span>
          </h2>
          <div className="energy-separator mb-6" />

          <div className="space-y-4">
            {content.faq.map((f, i) => (
              <div key={i} className="card-hover p-5">
                <h3 className="font-heading font-bold text-stone-900 text-sm mb-2">{f.question}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="font-heading text-2xl md:text-3xl font-black">
            Devis démoussage gratuit à <span className="text-blue-400">{city.name}</span>
          </h2>
          <p className="text-stone-400 mt-3 max-w-xl mx-auto">
            Comparez les prix des artisans couvreurs dans le {city.zip}. Réponse garantie sous 48h.
          </p>
          <div className="mt-6">
            <Link href="/devis" className="btn-cta text-base px-10 py-5">
              Demander mes devis gratuits
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* ── NEARBY CITIES ── */}
        {nearby.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-6">
              Démoussage toiture en <span className="text-blue-700">{city.department_name}</span>
            </h2>
            <div className="energy-separator mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {nearby.map((c) => (
                <Link key={c.slug} href={`/demoussage-toiture/${c.slug}`} className="bg-white hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-sm font-medium py-3 px-4 rounded-xl border border-stone-200 hover:border-blue-300 transition-all hover:shadow-md text-center">
                  {c.name}
                  <span className="text-stone-400 text-xs block">{c.zip}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link href={`/annuaire/${city.department_code}`} className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm uppercase tracking-wider">
                Toutes les villes du {city.department_name} →
              </Link>
            </div>
          </section>
        )}

        {/* ── GUIDES LINKING ── */}
        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900 mb-4">Guides utiles</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/guides/prix-demoussage-toiture-2026" className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded border border-blue-200 transition-colors">Prix démoussage 2026</Link>
            <Link href="/guides/demoussage-vs-nettoyage-haute-pression" className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded border border-blue-200 transition-colors">Kärcher vs traitement chimique</Link>
            <Link href="/guides/traitement-hydrofuge-toiture" className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded border border-blue-200 transition-colors">Traitement hydrofuge</Link>
            <Link href="/guides/quand-demousser-toiture" className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded border border-blue-200 transition-colors">Quand démousser ?</Link>
          </div>
        </section>
      </div>
    </>
  );
}
