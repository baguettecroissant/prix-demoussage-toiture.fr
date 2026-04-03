import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import { getAllGuides } from "@/data/guides";

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

      {/* Breadcrumb */}
      <nav className="bg-stone-100 border-b border-stone-200 text-xs text-stone-500" aria-label="Fil d'Ariane">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-1 items-center">
          <Link href="/" className="hover:text-blue-700">Accueil</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-blue-700">Guides</Link>
          <span>/</span>
          <span className="text-stone-900 font-semibold truncate">{guide.title}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-xs uppercase tracking-widest text-stone-400 font-heading font-bold">{guide.readTime} de lecture</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-black text-stone-900 leading-tight">{guide.title}</h1>
          <div className="energy-separator mt-4" />
          <p className="text-stone-600 mt-4 text-lg leading-relaxed">{guide.description}</p>
        </div>

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

        {/* Other guides */}
        <div className="mt-12">
          <h3 className="font-heading font-bold text-stone-900 mb-4">Autres guides</h3>
          <div className="flex flex-wrap gap-2">
            {guides.filter(g => g.slug !== slug).map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="text-xs bg-stone-100 hover:bg-blue-50 text-stone-600 hover:text-blue-700 px-3 py-1.5 rounded border border-stone-200 hover:border-blue-200 transition-colors">
                {g.title}
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
