export interface Brand {
  slug: string;
  name: string;
  description: string;
  gamme: string;
  origin: string;
  budget: string;
  certification: string;
  garantie: string;
  points_forts: string[];
  produits_phares: string[];
  content: string;
}

export const brands: Brand[] = [
  {
    slug: "technitoit",
    name: "Technitoit",
    description: "N°1 français de la rénovation de l'habitat avec plus de 100 agences. Technitoit propose un service clé en main pour le démoussage, le nettoyage et la protection hydrofuge de toiture avec garantie décennale.",
    gamme: "Premium",
    origin: "France (Angers, 1994)",
    budget: "25 – 45€/m² (traitement complet)",
    certification: "Qualibat, RGE, Garantie décennale",
    garantie: "Garantie 10 ans sur traitement hydrofuge, 2 ans sur nettoyage",
    points_forts: [
      "N°1 français de la rénovation avec 100+ agences partout en France",
      "Traitement hydrofuge exclusif TechniProtect® — efficacité prouvée 10 ans",
      "Garantie décennale sur tous les traitements de toiture",
      "Diagnostic toiture gratuit avec rapport photographique complet",
      "Devis détaillé sous 48h avec visite technique obligatoire",
      "SAV réactif avec taux de satisfaction client de 94%",
    ],
    produits_phares: [
      "Pack Démoussage Complet — nettoyage HP + anti-mousse + hydrofuge",
      "Traitement TechniProtect® — hydrofuge incolore longue durée 10 ans",
      "Pack Rénovation Toiture — démoussage + peinture de toit + hydrofuge",
      "Traitement préventif anti-mousse — application biennale",
    ],
    content: "Technitoit est le leader français incontesté du traitement de toiture. Avec plus de 100 agences réparties sur tout le territoire, l'entreprise angevine propose un service complet : diagnostic gratuit, nettoyage, démoussage, traitement anti-mousse et hydrofuge. Le traitement exclusif TechniProtect® offre une imperméabilisation durable avec une garantie de 10 ans. Technitoit est particulièrement recommandé pour les propriétaires recherchant un prestataire fiable avec une couverture nationale et une garantie décennale.",
  },
  {
    slug: "preservation-du-patrimoine",
    name: "Préservation du Patrimoine",
    description: "Réseau national de 60 agences spécialisées dans la rénovation et l'entretien de toiture. Expert du traitement anti-mousse longue durée avec des produits certifiés NF.",
    gamme: "Premium",
    origin: "France (Paris, 1999)",
    budget: "20 – 40€/m² (traitement complet)",
    certification: "Qualibat, RGE, NF Habitat",
    garantie: "Garantie 10 ans sur hydrofuge, 5 ans sur anti-mousse",
    points_forts: [
      "60 agences en France — maillage national dense",
      "Spécialiste de la rénovation de toiture depuis 25 ans",
      "Traitement anti-mousse avec produits certifiés NF Environnement",
      "Suivi client personnalisé avec inspections de contrôle à 1 an et 5 ans",
      "Solutions adaptées à chaque type de couverture (tuiles, ardoises, zinc)",
      "Label NF Habitat pour la qualité des interventions",
    ],
    produits_phares: [
      "Traitement complet toiture — démoussage + anti-mousse + hydrofuge NF",
      "Rénovation ardoises — nettoyage doux + traitement spécifique",
      "Pack isolation + toiture — démoussage + isolation combles",
      "Entretien préventif annuel — inspection et traitement anti-mousse",
    ],
    content: "Préservation du Patrimoine est un réseau français de 60 agences spécialisées dans la rénovation de l'habitat. Leur expertise en traitement de toiture s'appuie sur des produits certifiés NF Environnement et un processus rigoureux : diagnostic photographique, nettoyage adapté, traitement anti-mousse et hydrofuge longue durée. Le réseau se distingue par son suivi client avec des inspections de contrôle post-traitement. C'est un choix sûr pour les propriétaires soucieux de la qualité et de la durabilité du traitement.",
  },
  {
    slug: "algimouss",
    name: "Algimouss",
    description: "Fabricant français de référence en produits de traitement anti-mousse et hydrofuge pour toiture depuis 1983. Gamme professionnelle et grand public distribuée dans tout le réseau professionnel.",
    gamme: "Milieu de gamme",
    origin: "France (Nantes, 1983)",
    budget: "8 – 15€/m² (produit seul)",
    certification: "NF Environnement, Ecolabel",
    garantie: "Efficacité garantie 5 ans sur anti-mousse",
    points_forts: [
      "Plus de 40 ans d'expertise en traitement anti-mousse",
      "Gamme complète : anti-mousse concentré, hydrofuge, nettoyant toiture",
      "Produits certifiés NF Environnement — respectueux de la biodiversité",
      "Utilisé par 80% des artisans couvreurs professionnels",
      "Application facile par pulvérisation — résultat progressif et durable",
      "Distribution large : GSB, négoces matériaux, en ligne",
    ],
    produits_phares: [
      "Algimouss Anti-mousse Pro 30L — le bestseller des pros, concentré",
      "Algimouss Hydrofuge 20L — imperméabilisant incolore longue durée",
      "Algimouss Multi-surfaces — toiture, terrasse, façade, murs",
      "Algimouss Express — anti-mousse action rapide 24h",
    ],
    content: "Algimouss est la marque de référence des professionnels du traitement anti-mousse en France. Depuis 1983, le fabricant nantais développe des produits certifiés NF Environnement, efficaces et respectueux de l'environnement. Le produit phare Algimouss Anti-mousse Pro est utilisé par 80% des artisans couvreurs pour le traitement des toitures. L'anti-mousse agit par temps de pluie : appliqué par pulvérisation, il élimine progressivement mousses, lichens et algues en 2 à 6 mois. C'est le choix de référence pour un traitement efficace et durable.",
  },
  {
    slug: "dalep",
    name: "Dalep",
    description: "Fabricant français de produits d'entretien et de traitement de surface depuis 1946. Dalep 2100 est le produit anti-mousse professionnel le plus vendu en France avec des millions de litres utilisés chaque année.",
    gamme: "Premium professionnel",
    origin: "France (Bondoufle, 1946)",
    budget: "10 – 18€/m² (produit seul)",
    certification: "NF Environnement, ISO 14001",
    garantie: "Efficacité anti-mousse garantie 3-5 ans",
    points_forts: [
      "Dalep 2100 : l'anti-mousse professionnel n°1 en France",
      "Plus de 75 ans d'expertise en chimie du bâtiment",
      "Gamme professionnelle ultra-concentrée — rendement exceptionnel",
      "Action progressive sans rinçage — laisse agir la pluie",
      "Certifié NF Environnement et ISO 14001",
      "Gamme complète : anti-mousse, hydrofuge, décapant, nettoyant",
    ],
    produits_phares: [
      "Dalep 2100 — Anti-mousse professionnel concentré, le n°1 des pros",
      "Dalep Hydrofuge — Imperméabilisant phase aqueuse longue durée",
      "Dalep Fast — Anti-mousse action express 24-48h",
      "Dalep Net-Toit — Nettoyant désincrustant pour toitures encrassées",
    ],
    content: "Dalep est un fabricant français historique (1946) de produits chimiques pour le bâtiment. Le Dalep 2100 est devenu l'anti-mousse de référence des professionnels : ultra-concentré (1L pour 5L d'eau), il s'applique par pulvérisation basse pression et agit progressivement grâce à la pluie. Résultat visible en 2 à 6 mois, efficacité durable de 3 à 5 ans. Le Dalep 2100 est le choix des artisans couvreurs qui recherchent un produit performant, économique et certifié NF Environnement.",
  },
  {
    slug: "sikagard",
    name: "Sikagard",
    description: "Gamme de produits de protection et d'imperméabilisation du groupe suisse Sika, leader mondial des produits chimiques pour le bâtiment. Solutions hydrofuges haute performance pour toiture.",
    gamme: "Haut de gamme",
    origin: "Suisse (Baar, 1910) — filiale France",
    budget: "12 – 22€/m² (produit seul)",
    certification: "CE, Avis Technique CSTB, ISO 9001",
    garantie: "Garantie produit 10 ans sur hydrofuge",
    points_forts: [
      "Groupe Sika : leader mondial des produits chimiques bâtiment",
      "Hydrofuge Sikagard-223 : référence haute performance pour toiture",
      "Protection anti-mousse + imperméabilisation en un seul produit",
      "Résistance aux UV et aux intempéries supérieure à la moyenne",
      "Avis Technique CSTB — performances validées en laboratoire",
      "Réseau de distribution professionnel dense (Point P, Cedeo, etc.)",
    ],
    produits_phares: [
      "Sikagard-223 — Hydrofuge incolore haute performance pour toiture",
      "Sikagard-703W — Hydrofuge façade + toiture, base aqueuse",
      "Sikagard Stop Mousse — Anti-mousse concentré action progressive",
      "Sika Nettoyant Toiture — Décapant algicides multi-surfaces",
    ],
    content: "Sikagard est la gamme de protection de surface du groupe suisse Sika, leader mondial des solutions chimiques pour le bâtiment. Le Sikagard-223 est considéré comme l'un des meilleurs hydrofuges du marché pour toiture : imperméabilisation longue durée (10 ans+), résistance aux UV et aux intempéries, et action anti-mousse préventive. Le surcoût par rapport aux marques concurrentes (15-25%) se justifie par une durabilité et des performances supérieures. Sikagard est le choix des professionnels exigeants.",
  },
  {
    slug: "guard-industrie",
    name: "Guard Industrie",
    description: "Fabricant français innovant de produits de protection et d'entretien des surfaces depuis 1993. Spécialiste du traitement hydrofuge et oléofuge avec des technologies brevetées.",
    gamme: "Premium",
    origin: "France (Paris, 1993)",
    budget: "12 – 20€/m² (produit seul)",
    certification: "CE, Green Building Council",
    garantie: "Garantie produit 10 ans, anti-mousse 5 ans",
    points_forts: [
      "Technologies brevetées de protection des surfaces (Guard® Technology)",
      "Hydrofuge oléofuge 2-en-1 : protection complète eau + graisses",
      "Produits éco-conçus avec label Green Building",
      "Solutions professionnelles et grand public",
      "Innovation constante : nouveaux produits chaque année",
      "SAV technique avec conseils d'application personnalisés",
    ],
    produits_phares: [
      "ProtectGuard® — Hydrofuge oléofuge haute performance pour toiture",
      "Guard'N Clean — Nettoyant désincrustant toiture sans pression",
      "Guard Anti-Mousse — Traitement curatif et préventif concentré",
      "ProtectGuard Color — Hydrofuge coloré pour rénovation esthétique",
    ],
    content: "Guard Industrie est un fabricant français innovant spécialisé dans la protection des surfaces. La technologie Guard® brevetée offre une double protection hydrofuge et oléofuge (contre l'eau ET les graisses/salissures). Le ProtectGuard® est un hydrofuge nouvelle génération qui protège les toitures pendant 10 ans+ avec un effet perlant remarquable. Guard Industrie se distingue par son engagement environnemental (label Green Building) et son innovation constante. C'est le choix des professionnels qui recherchent des produits à la pointe de la technologie.",
  },
];

export function getAllBrands() {
  return brands;
}
