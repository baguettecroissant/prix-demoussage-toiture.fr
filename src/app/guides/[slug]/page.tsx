import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen, Lightbulb, HelpCircle, Calendar, Clock } from "lucide-react";
import { getAllGuides } from "@/data/guides";
import { getAllBrands } from "@/data/brands";

export function generateStaticParams() {
  return getAllGuides().map(g => ({ slug: g.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getAllGuides().find(g => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `https://www.prix-demoussage-toiture.fr/guides/${slug}` },
  };
}

export default async function GuideDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const guides = getAllGuides();
  const guide = guides.find(g => g.slug === slug);
  if (!guide) notFound();

  return (
    <>
      {/* Schema.org — BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.prix-demoussage-toiture.fr" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.prix-demoussage-toiture.fr/guides" },
          { "@type": "ListItem", position: 3, name: guide.title, item: `https://www.prix-demoussage-toiture.fr/guides/${slug}` },
        ],
      }) }} />

      {/* Schema.org — Article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        image: `https://www.prix-demoussage-toiture.fr${guide.heroImage}`,
        datePublished: "2026-01-15",
        dateModified: "2026-03-25",
        author: { "@type": "Organization", name: "prix-demoussage-toiture.fr" },
        publisher: { "@type": "Organization", name: "prix-demoussage-toiture.fr", url: "https://www.prix-demoussage-toiture.fr" },
        mainEntityOfPage: `https://www.prix-demoussage-toiture.fr/guides/${slug}`,
      }) }} />

      {/* Schema.org — FAQPage */}
      {guide.faq && guide.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faq.map(f => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }) }} />
      )}

      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center bg-stone-900 overflow-hidden">
        <Image
          src={guide.heroImage}
          alt={guide.title}
          fill
          priority
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        
        <div className="relative z-10 max-w-4xl w-full mx-auto px-4 pb-12">
          {/* Breadcrumb inside hero */}
          <nav className="mb-6 flex flex-wrap gap-2 text-xs font-semibold text-stone-300 uppercase tracking-widest" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-blue-400 transition-colors">Accueil</Link>
            <span className="text-stone-600">/</span>
            <Link href="/guides" className="hover:text-blue-400 transition-colors">Guides</Link>
            <span className="text-stone-600">/</span>
            <span className="text-blue-400 truncate max-w-[200px] sm:max-w-xs">{guide.title}</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs uppercase tracking-widest font-heading font-bold shadow-lg flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {guide.readTime} de lecture
            </span>
            <span className="bg-stone-800/50 text-stone-300 border border-stone-700 backdrop-blur-md px-3 py-1.5 rounded-full text-xs uppercase tracking-widest font-heading font-bold flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Mis à jour: Mars 2026
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-black text-white leading-[1.15] drop-shadow-lg">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-stone-300 font-light max-w-3xl leading-relaxed">
            {guide.description}
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-16">

        {/* Table data */}
        {guide.tableData && guide.tableData.length > 0 && (
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-950 text-white text-xs">
                  {guide.tableData[0].values.map((_, i) => (
                    <th key={i} className={`px-4 py-3 font-heading font-bold text-center ${i === 0 ? "rounded-tl-xl" : ""} ${i === guide.tableData![0].values.length - 1 ? "rounded-tr-xl" : ""}`}>
                      {guide.tableData![0].values[i]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.tableData.slice(1).map((row, i) => (
                  <tr key={i} className={`border-b border-stone-200 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}>
                    {row.values.map((val, j) => (
                      <td key={j} className={`px-4 py-3 text-sm text-center ${j === 0 ? "font-heading font-bold text-stone-900" : "font-mono text-stone-700"}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-heading text-2xl font-black text-stone-900 mb-4">{section.title}</h2>
              <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
              {section.tip && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4 flex gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800 leading-relaxed">{section.tip}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQ */}
        {guide.faq && guide.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-black text-stone-900 mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {guide.faq.map((f, i) => (
                <div key={i} className="card-hover p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-bold text-stone-900 text-sm mb-1">{f.question}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{f.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-stone-950 via-blue-950 to-stone-950 rounded-2xl p-8 mt-12 text-center text-white">
          <h2 className="font-heading text-2xl font-black">Besoin d&apos;un devis <span className="text-blue-400">démoussage</span> ?</h2>
          <p className="text-stone-400 mt-2 text-sm">Comparez les prix des artisans couvreurs dans votre ville.</p>
          <Link href="/devis" className="btn-cta mt-4 inline-flex">
            Devis gratuit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Marques recommandées — cross-linking */}
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-stone-900 mb-4">Marques & produits recommandés</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getAllBrands().map(b => (
              <Link key={b.slug} href={`/marques/${b.slug}`} className="card-hover p-4 group text-center">
                <h4 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">{b.name}</h4>
                <p className="text-[10px] text-stone-400 mt-1">{b.gamme}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Other guides */}
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-stone-900 mb-4">Guides complémentaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guides.filter(g => g.slug !== slug).map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card-hover p-4 group flex items-start gap-3">
                <BookOpen className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-stone-900 group-hover:text-blue-700 transition-colors">{g.title}</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{g.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/guides" className="text-blue-700 hover:text-blue-800 font-heading font-bold text-sm flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Retour aux guides
          </Link>
        </div>
      </article>
    </>
  );
}
