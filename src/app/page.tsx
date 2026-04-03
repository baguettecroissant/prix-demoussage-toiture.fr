import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Shield, Euro, Clock, Leaf, Droplets, Sparkles, Star, TrendingUp, Layers } from "lucide-react";
import { getAllGuides } from "@/data/guides";
import { getAllBrands } from "@/data/brands";

const PRICE_TABLE = [
  { type: "Nettoyage haute pression", m2: "15 – 25€", total: "1 500 – 2 500€", duration: "2 – 3 ans" },
  { type: "Démoussage + anti-mousse", m2: "20 – 35€", total: "2 000 – 3 500€", duration: "3 – 5 ans" },
  { type: "Complet + hydrofuge", m2: "25 – 45€", total: "2 500 – 4 500€", duration: "8 – 12 ans" },
  { type: "Peinture de toit", m2: "30 – 50€", total: "3 000 – 5 000€", duration: "10 – 15 ans" },
];

const TOP_CITIES = [
  { slug: "paris-75001", name: "Paris", dept: "75" },
  { slug: "lyon-69001", name: "Lyon", dept: "69" },
  { slug: "marseille-13001", name: "Marseille", dept: "13" },
  { slug: "toulouse-31000", name: "Toulouse", dept: "31" },
  { slug: "bordeaux-33000", name: "Bordeaux", dept: "33" },
  { slug: "nantes-44000", name: "Nantes", dept: "44" },
  { slug: "strasbourg-67000", name: "Strasbourg", dept: "67" },
  { slug: "lille-59000", name: "Lille", dept: "59" },
  { slug: "rennes-35000", name: "Rennes", dept: "35" },
  { slug: "montpellier-34000", name: "Montpellier", dept: "34" },
  { slug: "nice-06000", name: "Nice", dept: "06" },
  { slug: "grenoble-38000", name: "Grenoble", dept: "38" },
];

export default function HomePage() {
  const guides = getAllGuides();
  const brands = getAllBrands();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white pt-20 pb-16">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home-hero.png"
            alt="Toiture propre et rénovée après démoussage"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left: Copy */}
            <div className="flex-1 space-y-8 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-600/20 text-blue-400 text-xs font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                  Guide expert 2026
                </span>
                <span className="bg-white/10 text-stone-200 text-xs font-heading font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                  35 000+ communes
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-white drop-shadow-lg">Démoussage</span>
                <br />
                <span className="text-stone-300">toiture</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-green-400 bg-clip-text text-transparent drop-shadow-md">
                  Prix au m²
                </span>
              </h1>

              <p className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                Redonnez vie à votre toiture. Comparez les artisans locaux, découvrez les vrais tarifs (de <strong className="text-white font-mono font-medium">15€</strong> à <strong className="text-white font-mono font-medium">45€/m²</strong>) et demandez vos devis gratuits en 2 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/devis" className="btn-cta text-base px-8 py-4 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/guides/prix-demoussage-toiture-2026" className="group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full backdrop-blur-md transition-all">
                  Voir tarifs 2026
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-stone-300 border-t border-white/10">
                <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-400" /> 100% gratuit</span>
                <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-blue-400" /> Sans engagement</span>
                <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-400" /> Artisans qualifiés</span>
              </div>
            </div>

            {/* Right: Glassmorphism Info Visual */}
            <div className="flex-1 w-full max-w-lg lg:ml-auto">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-1 border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-3xl" />
                
                <div className="relative bg-stone-900/60 rounded-[22px] overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg">Traitement complet</h3>
                      <p className="text-stone-400 text-xs mt-0.5">La solution la plus durable</p>
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      Garantie 10 ans
                    </span>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 divide-x divide-y divide-white/5 border-b border-white/10">
                    <div className="p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                      <Euro className="h-6 w-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-mono font-bold text-2xl">25-45€</p>
                      <p className="text-stone-400 text-xs">Prix par m²</p>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                      <Shield className="h-6 w-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-mono font-bold text-2xl">Hydrofuge</p>
                      <p className="text-stone-400 text-xs">Finition protectrice</p>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                      <Clock className="h-6 w-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-mono font-bold text-2xl">1 à 2</p>
                      <p className="text-stone-400 text-xs">Jours de travaux</p>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                      <Sparkles className="h-6 w-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-white font-mono font-bold text-2xl">Neuf</p>
                      <p className="text-stone-400 text-xs">Aspect final obtenu</p>
                    </div>
                  </div>

                  {/* Footer CTA inside card */}
                  <div className="bg-stone-950/50 p-4 text-center">
                    <p className="text-stone-400 text-xs mb-2">Découvrez les tarifs exacts de votre toit</p>
                    <Link href="/devis" className="inline-flex items-center justify-center w-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2.5 rounded-lg border border-white/5 transition-colors">
                      Calculer mon prix
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
            Prix du <span className="text-blue-700">démoussage de toiture</span> au m²
          </h2>
          <div className="energy-separator mx-auto mt-4" />
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Tarifs moyens constatés en France pour une maison standard (100 m² de toiture). Les prix varient selon la région, l&apos;accessibilité et l&apos;état de la couverture.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-stone-950 text-white text-sm">
                <th className="px-6 py-4 font-heading font-bold text-left rounded-tl-xl">Type de traitement</th>
                <th className="px-6 py-4 font-heading font-bold text-center">Prix au m²</th>
                <th className="px-6 py-4 font-heading font-bold text-center hidden sm:table-cell">Total 100 m²</th>
                <th className="px-6 py-4 font-heading font-bold text-center rounded-tr-xl">Durabilité</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_TABLE.map((row, i) => (
                <tr
                  key={row.type}
                  className={`border-b border-stone-200 ${
                    i === 2 ? "bg-blue-50/80 border-l-4 border-l-blue-600" : i % 2 === 0 ? "bg-white" : "bg-stone-50"
                  } hover:bg-blue-50/40 transition-colors`}
                >
                  <td className="px-6 py-4">
                    <div className="font-heading font-bold text-stone-900 text-sm">{row.type}</div>
                    {i === 2 && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Recommandé</span>}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-blue-700 text-center">{row.m2}</td>
                  <td className="px-6 py-4 font-mono font-bold text-stone-700 text-center hidden sm:table-cell">{row.total}</td>
                  <td className="px-6 py-4 font-mono text-center text-sm">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <Link href="/devis" className="btn-cta">
            Comparer les devis gratuits <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── BENEFITS STRIP ── */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Euro, title: "Prix transparents", desc: "Tarifs au m² détaillés" },
            { icon: Shield, title: "Artisans qualifiés", desc: "Garantie décennale" },
            { icon: Droplets, title: "Traitement hydrofuge", desc: "Protection 8-12 ans" },
            { icon: Clock, title: "Devis sous 48h", desc: "Réponse garantie" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <Icon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <h3 className="font-heading font-bold text-sm">{title}</h3>
              <p className="text-blue-200 text-xs mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
            Guides <span className="text-blue-700">démoussage toiture</span>
          </h2>
          <div className="energy-separator mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {guides.map(guide => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="card-hover p-5 group">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-heading font-bold">{guide.readTime}</span>
              </div>
              <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                {guide.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/guides" className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm uppercase tracking-wider transition-colors">
            Tous les guides → 
          </Link>
        </div>
      </section>

      {/* ── TOP CITIES ── */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
              Démoussage toiture <span className="text-blue-700">dans votre ville</span>
            </h2>
            <div className="energy-separator mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES.map(city => (
              <Link
                key={city.slug}
                href={`/demoussage-toiture/${city.slug}`}
                className="bg-white hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-sm font-medium py-3 px-4 rounded-xl border border-stone-200 hover:border-blue-300 transition-all hover:shadow-md text-center"
              >
                {city.name}
                <span className="text-stone-400 text-xs block">({city.dept})</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/annuaire" className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm uppercase tracking-wider transition-colors">
              Annuaire complet par département →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-stone-900">
            Marques &amp; réseaux <span className="text-blue-700">recommandés</span>
          </h2>
          <div className="energy-separator mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map(brand => (
            <Link key={brand.slug} href={`/marques/${brand.slug}`} className="card-hover p-5 group">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-blue-700 transition-colors">{brand.name}</h3>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{brand.gamme}</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">{brand.description}</p>
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-stone-300" />
                <span className="text-[11px] text-stone-400">{brand.origin}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black">
            Votre toit a besoin d&apos;un <span className="text-blue-400">nettoyage</span> ?
          </h2>
          <p className="text-stone-400 mt-4 text-lg">
            Demandez vos devis gratuits en 2 minutes. Comparez les prix des artisans couvreurs dans votre commune.
          </p>
          <div className="mt-8">
            <Link href="/devis" className="btn-cta text-base px-10 py-5">
              Devis démoussage gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
