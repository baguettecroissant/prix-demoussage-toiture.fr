import type { Metadata } from "next";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales — prix-demoussage-toiture.fr",
  description: "Mentions légales du site prix-demoussage-toiture.fr, guide indépendant des prix du démoussage et nettoyage de toiture.",
  alternates: { canonical: "https://www.prix-demoussage-toiture.fr/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Scale className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="font-heading text-3xl font-black text-stone-900">Mentions légales</h1>
        <div className="energy-separator mx-auto mt-4" />
      </div>

      <div className="prose prose-stone max-w-none space-y-8">
        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Éditeur du site</h2>
          <p className="text-sm text-stone-600">Le site prix-demoussage-toiture.fr est un guide indépendant d&apos;information sur les prix du démoussage et du nettoyage de toiture en France.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Hébergement</h2>
          <p className="text-sm text-stone-600">Ce site est hébergé par Vercel Inc., 440 N Bashaw St, Covina, CA 91723, États-Unis.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Données personnelles</h2>
          <p className="text-sm text-stone-600">Ce site ne collecte aucune donnée personnelle directement. Les formulaires de devis sont gérés par notre partenaire ViteUnDevis, qui dispose de sa propre politique de confidentialité. Nous vous invitons à la consulter lors de la soumission d&apos;un formulaire.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Cookies</h2>
          <p className="text-sm text-stone-600">Ce site n&apos;utilise pas de cookies de traçage. Des cookies techniques peuvent être déposés par notre partenaire ViteUnDevis dans le cadre du fonctionnement du formulaire de devis.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Responsabilité</h2>
          <p className="text-sm text-stone-600">Les informations et prix présentés sur ce site sont donnés à titre indicatif et ne constituent pas un devis. Les tarifs réels peuvent varier en fonction de nombreux facteurs. Nous déclinons toute responsabilité quant à l&apos;utilisation de ces données.</p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-stone-900">Propriété intellectuelle</h2>
          <p className="text-sm text-stone-600">L&apos;ensemble des contenus de ce site (textes, images, structure) est protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
        </section>
      </div>
    </div>
  );
}
