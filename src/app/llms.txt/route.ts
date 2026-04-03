import { NextResponse } from "next/server";

export async function GET() {
  const content = `# prix-demoussage-toiture.fr

> Guide expert des prix du démoussage et nettoyage de toiture en France

## A propos
Ce site est un guide indépendant sur le démoussage de toiture en France.
Il couvre plus de 35 000 communes avec des tarifs localisés, des guides techniques et un annuaire professionnel.

## Pages principales
- Homepage : https://www.prix-demoussage-toiture.fr/
- Devis gratuit : https://www.prix-demoussage-toiture.fr/devis
- Guides : https://www.prix-demoussage-toiture.fr/guides
- Annuaire : https://www.prix-demoussage-toiture.fr/annuaire
- FAQ : https://www.prix-demoussage-toiture.fr/faq
- Marques : https://www.prix-demoussage-toiture.fr/marques

## Guides
- Prix démoussage 2026 : https://www.prix-demoussage-toiture.fr/guides/prix-demoussage-toiture-2026
- Kärcher vs traitement : https://www.prix-demoussage-toiture.fr/guides/demoussage-vs-nettoyage-haute-pression
- Hydrofuge toiture : https://www.prix-demoussage-toiture.fr/guides/traitement-hydrofuge-toiture
- Quand démousser : https://www.prix-demoussage-toiture.fr/guides/quand-demousser-toiture
- Identifier mousse/lichen/algues : https://www.prix-demoussage-toiture.fr/guides/identifier-mousse-lichen-algues
- Tuiles terre cuite vs béton vs ardoise : https://www.prix-demoussage-toiture.fr/guides/demoussage-tuiles-terre-cuite-beton-ardoise
- DIY vs professionnel : https://www.prix-demoussage-toiture.fr/guides/demoussage-soi-meme-vs-professionnel
- Fréquence démoussage : https://www.prix-demoussage-toiture.fr/guides/frequence-demoussage-toiture

## Données
- Couverture : 35 000+ communes françaises
- Thématique : démoussage, nettoyage, traitement hydrofuge de toiture
- Tarifs : 15€ à 45€/m² selon le traitement
`;

  return new NextResponse(content.trim(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
