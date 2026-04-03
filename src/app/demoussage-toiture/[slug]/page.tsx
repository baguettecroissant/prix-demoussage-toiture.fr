import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, CheckCircle, MapPin, Leaf, Droplets, Sun, Clock, Shield,
  Thermometer, TrendingUp, AlertTriangle, Building2, Users, ExternalLink,
  Lightbulb, Info, Calendar, Home, Wrench, CloudRain, Map,
} from "lucide-react";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";
import { generateCityContent, formatPopulation } from "@/lib/content/content-engine";

export const dynamic = "force-dynamic";

const cities = citiesData as City[];

function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

function findNearbyCities(city: City, count = 12): City[] {
  // First, get cities from same department, sorted by geo proximity
  const sameDept = cities
    .filter((c) => c.slug !== city.slug && c.department_code === city.department_code)
    .map(c => ({
      ...c,
      dist: Math.sqrt(
        Math.pow(c.coordinates.lat - city.coordinates.lat, 2) +
        Math.pow(c.coordinates.lng - city.coordinates.lng, 2)
      ),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count);
  return sameDept;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const city = findCity(slug);
  if (!city) return {};

  const title = `Démoussage Toiture à ${city.name} (${city.zip}) — Prix au m² & Devis 2026`;
  const description = `Démoussage et nettoyage de toiture à ${city.name} (${city.zip}) ➜ De 15 à 45€/m². Comparez les artisans couvreurs en ${city.department_name}. Devis gratuit sous 48h. Traitement anti-mousse et hydrofuge.`;

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
      {/* Schema.org — LocalBusiness + Service */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Démoussage de toiture à ${city.name}`,
          description: `Service professionnel de démoussage, nettoyage et traitement hydrofuge de toiture à ${city.name} (${city.zip}), ${city.department_name}`,
          areaServed: {
            "@type": "City",
            name: city.name,
            postalCode: city.zip,
            containedInPlace: { "@type": "AdministrativeArea", name: city.department_name },
            geo: { "@type": "GeoCoordinates", latitude: city.coordinates.lat, longitude: city.coordinates.lng },
          },
          provider: { "@type": "Organization", name: "prix-demoussage-toiture.fr" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: content.pricing.totalMin,
            highPrice: content.pricing.totalMaxHydro,
            offerCount: 4,
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

      {/* ── BREADCRUMB ── */}
      <nav className="bg-stone-100 border-b border-stone-200 text-xs text-stone-500" aria-label="Fil d'Ariane">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/annuaire" className="hover:text-blue-700">Annuaire</Link>
          <span>/</span>
          <Link href={`/annuaire/${city.department_code}`} className="hover:text-blue-700">{city.department_name} ({city.department_code})</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{city.name}</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-900 text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.015\'%3E%3Cpath d=\'M0 0h20v20H0zM20 20h20v20H20z\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-900/60 text-blue-300 text-[11px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-600/30">
              <MapPin className="h-3 w-3 inline mr-1" />{city.zip} — {city.department_name}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-[3.25rem] font-black leading-tight">
            Démoussage Toiture à{" "}
            <span className="text-blue-400">{city.name}</span>
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

        {/* Separator */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-700 via-lime-500 to-blue-600" />
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN (main content) ── */}
          <div className="lg:col-span-2 space-y-14">

            {/* ── INTRO + HOUSING CONTEXT ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Démoussage de toiture à {city.name} <span className="text-stone-400 text-xl">({content.populationFormatted} habitants)</span>
              </h2>
              <div className="energy-separator mb-6" />
              <div className="prose prose-stone max-w-none">
                <p className="text-stone-700 leading-relaxed text-[15px]">
                  {content.housingContext}
                </p>
                <p className="text-stone-700 leading-relaxed text-[15px] mt-4">
                  {content.localContext}
                </p>
              </div>
            </section>

            {/* ── PRICING TABLE ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Prix du démoussage de toiture à <span className="text-blue-700">{city.name}</span> — Tarifs 2026
              </h2>
              <div className="energy-separator mb-4" />
              <p className="text-sm text-stone-500 mb-6">
                À {city.name}, les tarifs sont dans la moyenne du département du {city.department_name}. Les prix dépendent de la surface, de l&apos;accessibilité, du type de couverture et du traitement choisi.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone-950 text-white text-xs">
                      <th className="px-4 py-3 font-heading font-bold text-left rounded-tl-xl">Type de traitement</th>
                      <th className="px-4 py-3 font-heading font-bold text-center">Prix au m²</th>
                      <th className="px-4 py-3 font-heading font-bold text-center hidden sm:table-cell">Total 100 m²</th>
                      <th className="px-4 py-3 font-heading font-bold text-center rounded-tr-xl">Durabilité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.pricing.priceTable.map((row, i) => (
                      <tr key={row.type} className={`border-b border-stone-200 ${i === 2 ? "bg-blue-50/80 border-l-4 border-l-blue-600" : i % 2 === 0 ? "bg-white" : "bg-stone-50"} hover:bg-blue-50/40 transition-colors`}>
                        <td className="px-4 py-3">
                          <p className="font-heading font-bold text-stone-900 text-sm">{row.type}</p>
                          {i === 2 && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Recommandé</span>}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700 text-center text-sm">{row.m2}</td>
                        <td className="px-4 py-3 font-mono text-stone-700 text-center text-sm hidden sm:table-cell">{row.total100}</td>
                        <td className="px-4 py-3 font-mono text-center text-sm">{row.durability}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 italic">
                * Prix indicatifs TTC pour {city.name}. Tarif final sur devis selon l&apos;artisan et la complexité du chantier.
              </p>
            </section>

            {/* ── KEY DATA CARDS ── */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="card-hover p-4 text-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <p className="font-mono font-bold text-xl text-blue-700">{content.pricing.pricePerM2Min}–{content.pricing.pricePerM2Max}€</p>
                  <p className="text-[11px] text-stone-500 mt-1">Prix au m²</p>
                </div>
                <div className="card-hover p-4 text-center">
                  <Droplets className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <p className="font-mono font-bold text-xl text-blue-700">+{content.pricing.hydrofugeMin}–{content.pricing.hydrofugeMax}€</p>
                  <p className="text-[11px] text-stone-500 mt-1">Hydrofuge /m²</p>
                </div>
                <div className="card-hover p-4 text-center">
                  <Clock className="h-5 w-5 text-amber-600 mx-auto mb-2" />
                  <p className="font-mono font-bold text-xl text-amber-600">1–2 jours</p>
                  <p className="text-[11px] text-stone-500 mt-1">Durée travaux</p>
                </div>
                <div className="card-hover p-4 text-center">
                  <Shield className="h-5 w-5 text-green-700 mx-auto mb-2" />
                  <p className="font-mono font-bold text-xl text-green-700">8–12 ans</p>
                  <p className="text-[11px] text-stone-500 mt-1">Protection hydrofuge</p>
                </div>
              </div>
            </section>

            {/* ── COMPARATIF TECHNIQUES ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Quelle technique de démoussage à <span className="text-blue-700">{city.name}</span> ?
              </h2>
              <div className="energy-separator mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.techniques.map((tech, i) => (
                  <div key={tech.name} className={`card-hover p-5 ${i === 2 ? "ring-2 ring-blue-600/30 bg-blue-50/30" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-bold text-stone-900 text-sm">{tech.name}</h3>
                      {i === 2 && <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-bold">★ Recommandé</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 mt-3">
                      <div><span className="text-stone-400">Prix :</span> <span className="font-mono font-bold text-blue-700">{tech.price}</span></div>
                      <div><span className="text-stone-400">Durée :</span> <span className="font-mono font-bold">{tech.durability}</span></div>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-stone-600">{tech.pros}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-stone-500">{tech.cons}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── ROOF TYPES ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Traitement par <span className="text-blue-700">type de couverture</span>
              </h2>
              <div className="energy-separator mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.roofTypes.map((roof) => (
                  <div key={roof.name} className="card-hover p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{roof.icon}</span>
                      <h3 className="font-heading font-bold text-stone-900">{roof.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-stone-600">
                      <div className="flex items-start gap-2">
                        <Wrench className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>{roof.method}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span><strong>Prix :</strong> {roof.price}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-amber-700">{roof.risk}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── MARKET ANALYSIS ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Marché du démoussage à <span className="text-blue-700">{city.name}</span>
              </h2>
              <div className="energy-separator mb-6" />
              <p className="text-stone-700 leading-relaxed text-[15px]">{content.marketAnalysis}</p>
              <p className="text-stone-700 leading-relaxed text-[15px] mt-4">{content.deptContext}</p>
            </section>

            {/* ── SEASONAL ADVICE ── */}
            <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 md:p-8 border border-blue-200/50">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h2 className="font-heading text-xl md:text-2xl font-black text-stone-900">
                  Conseil saisonnier pour {city.name}
                </h2>
              </div>
              <p className="text-stone-700 leading-relaxed text-[15px]">{content.seasonalAdvice}</p>
            </section>

            {/* ── MAP ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                <Map className="h-6 w-6 inline text-blue-600 mr-2" />
                Localisation de <span className="text-blue-700">{city.name}</span>
              </h2>
              <div className="energy-separator mb-6" />
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                <iframe
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${city.coordinates.lat},${city.coordinates.lng}&z=13&output=embed`}
                  title={`Carte de ${city.name} (${city.zip})`}
                />
              </div>
              <p className="text-xs text-stone-400 mt-2">
                📍 {city.name} ({city.zip}) — {city.department_name}, {city.region} — Coordonnées : {city.coordinates.lat.toFixed(4)}°N, {city.coordinates.lng.toFixed(4)}°E
              </p>
            </section>

            {/* ── CLIMATE PROFILE ── */}
            <section>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                Climat et <span className="text-green-700">risque mousse</span> à {city.name}
              </h2>
              <div className="energy-separator mb-6" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Zone climatique</p>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-600" />
                    <p className="font-heading font-bold text-stone-900 text-sm capitalize">{content.climate.zone}</p>
                  </div>
                </div>
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Risque mousse</p>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <p className="font-heading font-bold text-stone-900 text-sm capitalize">{content.climate.mossRisk}</p>
                  </div>
                </div>
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Fréquence</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <p className="font-heading font-bold text-stone-900 text-sm">Tous les {content.climate.frequency}</p>
                  </div>
                </div>
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Meilleure période</p>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <p className="font-heading font-bold text-stone-900 text-sm capitalize">{content.climate.bestPeriod}</p>
                  </div>
                </div>
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Pluviométrie</p>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <p className="font-heading font-bold text-stone-900 text-sm">{content.climate.rainfall}</p>
                  </div>
                </div>
                <div className="card-hover p-4">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Humidité moyenne</p>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-cyan-600" />
                    <p className="font-heading font-bold text-stone-900 text-sm">{content.climate.humidity}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── DID YOU KNOW ── */}
            <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-amber-600" />
                <h3 className="font-heading font-bold text-stone-900 text-lg">💡 Le saviez-vous ?</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">{content.didYouKnow}</p>
            </section>

            {/* ── PRO TIP ── */}
            <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Info className="h-6 w-6 text-blue-600" />
                <h3 className="font-heading font-bold text-stone-900 text-lg">Conseil de pro</h3>
              </div>
              <p className="text-stone-700 leading-relaxed">{content.proTip}</p>
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
                Besoin d&apos;un démoussage à <span className="text-blue-400">{city.name}</span> ?
              </h2>
              <p className="text-stone-400 mt-3 max-w-xl mx-auto">
                Obtenez vos devis gratuits en 2 minutes. Comparez les prix des artisans couvreurs dans le {city.zip}. Réponse garantie sous 48h.
              </p>
              <div className="mt-6">
                <Link href="/devis" className="btn-cta text-base px-10 py-5">
                  Devis Gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </section>

            {/* ── NEARBY ── */}
            {nearby.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl md:text-3xl font-black text-stone-900 mb-4">
                  Démoussage toiture près de <span className="text-blue-700">{city.name}</span>
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
              <h2 className="font-heading text-xl font-bold text-stone-900 mb-4">Nos guides pour votre projet</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/guides/prix-demoussage-toiture-2026" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Prix démoussage 2026</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Grille tarifaire complète</p>
                </Link>
                <Link href="/guides/demoussage-vs-nettoyage-haute-pression" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Kärcher vs traitement</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Comparatif méthodes</p>
                </Link>
                <Link href="/guides/traitement-hydrofuge-toiture" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Hydrofuge toiture</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Prix et efficacité</p>
                </Link>
                <Link href="/guides/quand-demousser-toiture" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Quand démousser ?</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Calendrier par région</p>
                </Link>
                <Link href="/guides/identifier-mousse-lichen-algues" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Mousse, lichen, algues</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Identifier le problème</p>
                </Link>
                <Link href="/guides/demoussage-tuiles-terre-cuite-beton-ardoise" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Types de tuiles</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Terre cuite, béton, ardoise</p>
                </Link>
                <Link href="/guides/demoussage-soi-meme-vs-professionnel" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">DIY vs Professionnel</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Le vrai comparatif</p>
                </Link>
                <Link href="/guides/frequence-demoussage-toiture" className="card-hover p-4 group text-center">
                  <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">Fréquence entretien</h3>
                  <p className="text-[11px] text-stone-400 mt-1">Tous les combien ?</p>
                </Link>
              </div>
            </section>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="space-y-6">
            {/* City Data Card (sticky) */}
            <div className="lg:sticky lg:top-20">
              {/* City info card */}
              <div className="card-hover overflow-hidden mb-6">
                <div className="bg-stone-950 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-400" />
                    <span className="font-heading font-bold">{city.name}</span>
                  </div>
                  <span className="font-mono text-blue-300 text-sm">{city.zip}</span>
                </div>
                <div className="divide-y divide-stone-100">
                  <div className="p-4 flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Code postal</p>
                      <p className="font-heading font-bold text-stone-900">{city.zip}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Département</p>
                      <Link href={`/annuaire/${city.department_code}`} className="font-heading font-bold text-blue-700 hover:text-blue-800 transition-colors">
                        {city.department_name} ({city.department_code})
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Population</p>
                      <p className="font-heading font-bold text-stone-900">{content.populationFormatted} habitants</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <Home className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Type de commune</p>
                      <p className="font-heading font-bold text-stone-900 capitalize">{content.populationCategory}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-stone-400" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Mairie</p>
                      <a
                        href={`https://www.annuaire-mairie.fr/mairie-${city.slug.split("-")[0]}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading font-bold text-blue-700 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors"
                      >
                        Site officiel <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white text-center">
                <h3 className="font-heading font-bold text-lg">Devis Gratuit à {city.name}</h3>
                <p className="text-red-100 text-xs mt-2">Comparez les prix des couvreurs. Sans engagement.</p>
                <Link href="/devis" className="bg-white text-red-700 hover:bg-blue-50 hover:text-blue-700 font-bold uppercase tracking-widest text-xs py-3 px-6 rounded-full transition-all duration-500 mt-4 inline-flex items-center gap-2">
                  Demander un devis <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Quick price summary */}
              <div className="card-hover p-5 mt-6">
                <h4 className="font-heading font-bold text-sm text-stone-900 mb-3">💰 Résumé des prix</h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <span className="text-stone-500">Nettoyage simple</span>
                    <span className="font-mono font-bold text-blue-700">{content.pricing.pricePerM2Min}–{content.pricing.pricePerM2Min + 10}€/m²</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-stone-100">
                    <span className="text-stone-500">Démoussage + anti-mousse</span>
                    <span className="font-mono font-bold text-blue-700">{content.pricing.pricePerM2Min + 5}–{content.pricing.pricePerM2Max}€/m²</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-stone-100 bg-blue-50/50 -mx-2 px-2 py-2 rounded">
                    <span className="text-stone-700 font-semibold">Complet + hydrofuge ★</span>
                    <span className="font-mono font-bold text-blue-700">{content.pricing.pricePerM2Min + 10}–{content.pricing.pricePerM2Max + 10}€/m²</span>
                  </li>
                  <li className="flex justify-between items-center pt-2">
                    <span className="text-stone-700 font-semibold">Budget 100 m²</span>
                    <span className="font-mono font-bold text-green-700">{content.pricing.totalMin}–{content.pricing.totalMax}€</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
