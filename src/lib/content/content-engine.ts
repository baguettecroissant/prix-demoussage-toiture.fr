import { type City } from "@/types";

// ── Deterministic hash function ──
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0x7fffffff;
  }
  return hash;
}

function pick<T>(arr: T[], hash: number): T {
  return arr[hash % arr.length];
}

function pickN<T>(arr: T[], hash: number, n: number): T[] {
  const result: T[] = [];
  const used = new Set<number>();
  let h = hash;
  while (result.length < n && result.length < arr.length) {
    const idx = h % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    h = hashString(h.toString() + "next");
  }
  return result;
}

// ── Intro variants ──
const INTROS = [
  (city: string) =>
    `La mousse retient l'humidité et accélère la dégradation de vos tuiles — agissez avant les dommages`,
  (city: string) =>
    `Un démoussage professionnel redonne à votre toiture son aspect neuf en une journée`,
  (city: string) =>
    `Les professionnels locaux utilisent un traitement anti-mousse longue durée avec garantie 5 ans`,
  (city: string) =>
    `Le climat local favorise la pousse de mousse sur les toitures — un traitement préventif s'impose`,
  (city: string) =>
    `Ne laissez pas la mousse s'installer durablement sur votre couverture : chaque année d'attente augmente le coût des réparations`,
  (city: string) =>
    `Un toit propre, c'est 15 à 20 ans de tranquillité : demandez votre diagnostic gratuit`,
  (city: string) =>
    `Les lichens et les mousses fragilisent les tuiles en s'infiltrant dans les micro-fissures — traitez maintenant`,
  (city: string) =>
    `Le démoussage préventif coûte 3 à 5 fois moins cher qu'une réfection complète de toiture`,
];

// ── Market analysis variants ──
const MARKET_ANALYSIS = [
  (dept: string) =>
    `Le marché du démoussage de toiture dans le ${dept} est particulièrement actif en raison du climat océanique qui favorise la prolifération de mousse et de lichens. Les artisans couvreurs locaux proposent des tarifs compétitifs grâce à une forte concurrence entre les entreprises spécialisées. La plupart des interventions incluent un traitement hydrofuge longue durée qui protège votre couverture pendant 5 à 10 ans.`,
  (dept: string) =>
    `Dans le ${dept}, les propriétaires font démousser leur toiture en moyenne tous les 7 à 10 ans. Les conditions climatiques locales (humidité, précipitations) accélèrent la formation de mousses et d'algues sur les couvertures en tuiles et en ardoises. Les professionnels recommandent un traitement préventif anti-mousse après chaque nettoyage pour espacer les interventions.`,
  (dept: string) =>
    `Le ${dept} compte de nombreux artisans qualifiés en entretien de toiture. La demande est soutenue, notamment au printemps et à l'automne, périodes idéales pour le démoussage. Les prix varient selon la surface, l'accessibilité du toit et le type de couverture (tuiles béton, terre cuite, ardoises naturelles). Un traitement complet avec hydrofuge est recommandé pour une protection durable.`,
  (dept: string) =>
    `Les toitures du ${dept} sont exposées à des conditions météorologiques qui favorisent l'apparition de mousse dès 5 à 8 ans. La plupart des artisans locaux proposent des forfaits incluant le nettoyage mécanique, le traitement anti-mousse et l'application d'un hydrofuge incolore. Comparer plusieurs devis permet d'économiser jusqu'à 30% sur le coût total de l'intervention.`,
  (dept: string) =>
    `Le démoussage de toiture est l'un des travaux d'entretien les plus demandés dans le ${dept}. Les professionnels utilisent des techniques adaptées à chaque type de couverture : traitement chimique doux pour les tuiles fragiles, nettoyage haute pression contrôlée pour les surfaces résistantes. Un hydrofuge de qualité prolonge l'effet du traitement pendant 8 à 12 ans.`,
  (dept: string) =>
    `Dans le ${dept}, le coût du démoussage dépend principalement de la surface de toiture et de son état. Une toiture très encrassée avec mousse épaisse nécessite un traitement en deux passes (nettoyage + anti-mousse), ce qui augmente le prix de 20 à 30%. Les artisans sérieux incluent systématiquement une inspection de l'état des tuiles et des éléments de couverture (faîtage, noues, solins).`,
];

// ── FAQ variants ──
const FAQ_POOL = [
  {
    question: "Quel est le prix du démoussage de toiture au m² ?",
    answer:
      "Le prix du démoussage de toiture varie de 15€ à 35€ par m² selon la technique utilisée, l'état de la toiture et la région. Un traitement complet (nettoyage + anti-mousse + hydrofuge) coûte entre 25€ et 45€/m². Pour une toiture de 100 m², comptez entre 1 500€ et 3 500€ tout compris.",
  },
  {
    question: "Quelle est la meilleure période pour démousser sa toiture ?",
    answer:
      "Les meilleures périodes sont le printemps (mars à mai) et l'automne (septembre à novembre). Évitez les périodes de gel, de fortes chaleurs ou de pluie intense. Le traitement anti-mousse est plus efficace appliqué par temps sec avec des températures entre 10°C et 25°C.",
  },
  {
    question: "Faut-il un professionnel pour démousser sa toiture ?",
    answer:
      "Oui, le démoussage de toiture est un travail en hauteur qui présente des risques importants. Un professionnel dispose de l'équipement de sécurité, des produits adaptés et de l'expertise pour ne pas endommager vos tuiles. De plus, un artisan assure son travail et fournit une garantie.",
  },
  {
    question: "Combien de temps dure un démoussage de toiture ?",
    answer:
      "Un démoussage professionnel de toiture prend en moyenne 1 à 2 jours pour une maison standard (100 m² de toiture). Le traitement anti-mousse nécessite ensuite 24 à 48h de séchage. L'application d'un hydrofuge se fait généralement dans un second temps, après 2 à 4 semaines.",
  },
  {
    question: "Quelle différence entre nettoyage et démoussage de toiture ?",
    answer:
      "Le nettoyage consiste à retirer les salissures et débris (feuilles, poussière) par brossage ou lavage. Le démoussage va plus loin : il élimine les mousses, lichens et algues avec un traitement chimique spécifique. Le démoussage inclut généralement un traitement préventif anti-mousse pour retarder la repousse.",
  },
  {
    question: "Le nettoyage haute pression est-il dangereux pour les tuiles ?",
    answer:
      "Un Kärcher trop puissant (plus de 100 bars) ou mal utilisé peut casser, déplacer ou éroder les tuiles, surtout les tuiles terre cuite et les ardoises. Les professionnels utilisent une pression contrôlée (50-80 bars) avec un angle adapté. Pour les tuiles fragiles, le traitement chimique sans pression est préférable.",
  },
  {
    question: "Qu'est-ce qu'un traitement hydrofuge pour toiture ?",
    answer:
      "L'hydrofuge est un produit imperméabilisant appliqué après le démoussage. Il crée une barrière invisible qui empêche l'eau de pénétrer dans les tuiles tout en laissant la toiture respirer. Un hydrofuge de qualité protège votre couverture pendant 8 à 12 ans et retarde considérablement la repousse de mousse.",
  },
  {
    question: "Tous les combien d'années faut-il démousser sa toiture ?",
    answer:
      "En moyenne, une toiture doit être démoussée tous les 5 à 10 ans selon le climat et l'environnement. Les toitures exposées au nord, à l'ombre d'arbres ou en zone humide nécessitent un traitement plus fréquent (5-7 ans). Avec un hydrofuge, vous pouvez espacer les traitements à 10-12 ans.",
  },
  {
    question: "Le démoussage est-il déductible des impôts ?",
    answer:
      "Non, le démoussage de toiture ne bénéficie pas de crédit d'impôt. Cependant, si le démoussage est réalisé dans le cadre d'une rénovation énergétique (isolation de toiture), la TVA réduite à 10% s'applique sur la main-d'œuvre pour les logements de plus de 2 ans. Demandez un devis détaillé à votre artisan.",
  },
  {
    question: "Quels sont les risques d'une toiture non entretenue ?",
    answer:
      "Une toiture couverte de mousse retient l'humidité en permanence, ce qui provoque : infiltrations d'eau, gel-dégel fragilisant les tuiles, développement de champignons dans la charpente, dégradation des joints et du faîtage. Le coût d'une réfection complète (5 000 à 15 000€) est 5 à 10 fois supérieur à un démoussage préventif.",
  },
];

// ── Pricing calculation ──
function calculatePricing(city: City, hash: number) {
  const lat = city.coordinates.lat;
  const isNorth = lat > 47;
  const isSouth = lat < 44;

  // Base price per m²
  let baseMin = 15;
  let baseMax = 35;

  // Climate adjustment
  if (isNorth) {
    baseMin += 2;
    baseMax += 3;
  } else if (isSouth) {
    baseMin -= 1;
    baseMax -= 1;
  }

  // Urban premium
  if (city.population > 200000) {
    baseMin += 4;
    baseMax += 6;
  } else if (city.population > 50000) {
    baseMin += 2;
    baseMax += 3;
  }

  // Hydrofuge supplement
  const hydrofugeMin = 8;
  const hydrofugeMax = 15;

  // 100m² reference
  const totalMin = baseMin * 100;
  const totalMax = baseMax * 100;
  const totalMinHydro = (baseMin + hydrofugeMin) * 100;
  const totalMaxHydro = (baseMax + hydrofugeMax) * 100;

  // Hash-based micro-variation (±5%)
  const variation = ((hash % 11) - 5) / 100;
  const adjustedMin = Math.round(totalMin * (1 + variation) / 50) * 50;
  const adjustedMax = Math.round(totalMax * (1 + variation) / 50) * 50;

  return {
    pricePerM2Min: baseMin,
    pricePerM2Max: baseMax,
    hydrofugeMin,
    hydrofugeMax,
    totalMin: adjustedMin,
    totalMax: adjustedMax,
    totalMinHydro: Math.round(totalMinHydro * (1 + variation) / 50) * 50,
    totalMaxHydro: Math.round(totalMaxHydro * (1 + variation) / 50) * 50,
  };
}

// ── Climate profiling ──
function getClimateProfile(city: City, hash: number) {
  const lat = city.coordinates.lat;
  const lng = city.coordinates.lng;

  if (lat > 48.5) {
    return {
      zone: "océanique/continental",
      mossRisk: "élevé",
      frequency: "5-7 ans",
      bestPeriod: "avril-mai ou septembre-octobre",
    };
  } else if (lat > 46 && lng < 0) {
    return {
      zone: "océanique",
      mossRisk: "très élevé",
      frequency: "4-6 ans",
      bestPeriod: "mars-mai ou septembre-novembre",
    };
  } else if (lat > 46) {
    return {
      zone: "semi-continental",
      mossRisk: "moyen à élevé",
      frequency: "6-8 ans",
      bestPeriod: "avril-mai ou septembre-octobre",
    };
  } else if (lat > 44) {
    return {
      zone: "tempéré",
      mossRisk: "moyen",
      frequency: "7-10 ans",
      bestPeriod: "mars-mai ou octobre-novembre",
    };
  } else {
    return {
      zone: "méditerranéen",
      mossRisk: "faible à moyen",
      frequency: "8-12 ans",
      bestPeriod: "mars-avril ou octobre-novembre",
    };
  }
}

// ── Roof type profiling ──
const ROOF_TYPES = [
  {
    name: "Tuiles terre cuite",
    method: "Traitement chimique doux (pas de haute pression)",
    price: "20-35€/m²",
    risk: "Fragile : le Kärcher est à proscrire",
  },
  {
    name: "Tuiles béton",
    method: "Nettoyage haute pression contrôlée (60-80 bars)",
    price: "15-30€/m²",
    risk: "Résistant mais poreux : hydrofuge indispensable",
  },
  {
    name: "Ardoises naturelles",
    method: "Brossage manuel + traitement anti-mousse",
    price: "25-40€/m²",
    risk: "Très fragile : aucune pression mécanique",
  },
  {
    name: "Fibro-ciment",
    method: "Traitement chimique uniquement (risque amiante)",
    price: "20-35€/m²",
    risk: "Diagnostic amiante obligatoire avant intervention",
  },
];

// ── Main content generator ──
export interface CityContent {
  intro: string;
  marketAnalysis: string;
  faq: { question: string; answer: string }[];
  pricing: ReturnType<typeof calculatePricing>;
  climate: ReturnType<typeof getClimateProfile>;
  roofTypes: typeof ROOF_TYPES;
  techniques: typeof TECHNIQUES;
}

const TECHNIQUES = [
  {
    name: "Nettoyage haute pression",
    price: "15-25€/m²",
    durability: "2-4 ans",
    pros: "Résultat immédiat, coût modéré",
    cons: "Risque d'endommagement, mousse revient vite",
  },
  {
    name: "Traitement anti-mousse chimique",
    price: "10-20€/m²",
    durability: "3-5 ans",
    pros: "Doux pour les tuiles, action lente et progressive",
    cons: "Résultat visible après 2-6 mois",
  },
  {
    name: "Démoussage + hydrofuge",
    price: "25-45€/m²",
    durability: "8-12 ans",
    pros: "Protection complète et durable, meilleur rapport qualité-prix",
    cons: "Coût initial plus élevé",
  },
  {
    name: "Brossage manuel",
    price: "20-35€/m²",
    durability: "2-3 ans",
    pros: "Aucun risque pour les tuiles, idéal tuiles fragiles",
    cons: "Long et coûteux en main-d'œuvre",
  },
];

export function generateCityContent(city: City): CityContent {
  const hash = hashString(city.slug + city.zip + city.region);
  const hash2 = hashString(city.slug + "variation");
  const hash3 = hashString(city.name + city.department_code);

  const pricing = calculatePricing(city, hash);
  const climate = getClimateProfile(city, hash);

  const introFn = pick(INTROS, hash);
  const intro = `Votre toit à ${city.name} est couvert de mousse ou de lichen ? ${introFn(city.name)}. Le démoussage de toiture en ${city.department_name} coûte entre ${pricing.pricePerM2Min}€ et ${pricing.pricePerM2Max}€/m² selon la surface, le type de couverture (tuiles, ardoises) et le traitement appliqué.`;

  const marketFn = pick(MARKET_ANALYSIS, hash2);
  const marketAnalysis = marketFn(city.department_name);

  const faq = pickN(FAQ_POOL, hash3, 5);

  return {
    intro,
    marketAnalysis,
    faq,
    pricing,
    climate,
    roofTypes: ROOF_TYPES,
    techniques: TECHNIQUES,
  };
}
