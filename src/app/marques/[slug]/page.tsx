import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle, Shield, Star, Layers, Package, BookOpen } from "lucide-react";
import { getAllBrands } from "@/data/brands";
import { getAllGuides } from "@/data/guides";

export function generateStaticParams() {
  return getAllBrands().map(b => ({ slug: b.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = getAllBrands().find(b => b.slug === slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Démoussage Toiture : Avis, Prix et Garantie`,
    description: `${brand.name} : ${brand.description.substring(0, 150)}...`,
    alternates: { canonical: `https://www.prix-demoussage-toiture.fr/marques/${slug}` },
  };
}

export default async function BrandDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brands = getAllBrands();
  const brand = brands.find(b => b.slug === slug);
  if (!brand) notFound();

  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Marques", item: "https://www.prix-demoussage-toiture.fr/marques" },
          { "@type": "ListItem", position: 3, name: brand.name, item: `https://www.prix-demoussage-toiture.fr/marques/${slug}` },
        ],
      }) }} />

      <nav className="bg-stone-100 border-b border-stone-200 text-xs text-stone-500" aria-label="Fil d'Ariane">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/marques" className="hover:text-blue-700">Marques</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{brand.name}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase">{brand.gamme}</span>
            <span className="text-xs text-stone-400">{brand.origin}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900 leading-tight">{brand.name}</h1>
          <div className="energy-separator mt-4" />
          <p className="text-stone-600 mt-4 text-lg leading-relaxed">{brand.description}</p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="card-hover p-5 text-center">
            <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Certification</p>
            <p className="font-heading font-bold text-stone-900 text-sm">{brand.certification}</p>
          </div>
          <div className="card-hover p-5 text-center">
            <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
            <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Garantie</p>
            <p className="font-heading font-bold text-stone-900 text-sm">{brand.garantie}</p>
          </div>
          <div className="card-hover p-5 text-center">
            <Layers className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xs text-stone-400 uppercase tracking-wider font-heading font-bold mb-1">Budget</p>
            <p className="font-heading font-bold text-stone-900 text-sm">{brand.budget}</p>
          </div>
        </div>

        {/* Content */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-black text-stone-900 mb-4">Présentation</h2>
          <p className="text-stone-600 leading-relaxed">{brand.content}</p>
        </section>

        {/* Points forts */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-black text-stone-900 mb-4">Points forts</h2>
          <div className="space-y-3">
            {brand.points_forts.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-stone-700">{pt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-black text-stone-900 mb-4">Produits phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {brand.produits_phares.map((prod, i) => (
              <div key={i} className="card-hover p-4 flex items-start gap-3">
                <Package className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-stone-700">{prod}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 rounded-2xl p-8 text-center text-white mb-10">
          <h2 className="font-heading text-2xl font-black">Devis démoussage <span className="text-blue-400">gratuit</span></h2>
          <p className="text-stone-400 mt-2 text-sm">Comparez les prix des artisans utilisant {brand.name}.</p>
          <Link href="/devis" className="btn-cta mt-4 inline-flex">
            Demander un devis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Guides associés — cross-linking */}
        <section className="mt-10">
          <h3 className="font-heading text-xl font-bold text-stone-900 mb-4">Guides associés</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {getAllGuides().slice(0, 4).map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card-hover p-4 group flex items-start gap-3">
                <BookOpen className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">{g.title}</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{g.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other brands */}
        <div className="mt-8">
          <h3 className="font-heading font-bold text-stone-900 mb-4">Autres marques</h3>
          <div className="flex flex-wrap gap-2">
            {brands.filter(b => b.slug !== slug).map(b => (
              <Link key={b.slug} href={`/marques/${b.slug}`} className="text-xs bg-stone-100 hover:bg-blue-50 text-stone-600 hover:text-blue-700 px-3 py-1.5 rounded border border-stone-200 hover:border-blue-200 transition-colors">
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/marques" className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Toutes les marques
          </Link>
        </div>
      </article>
    </>
  );
}
