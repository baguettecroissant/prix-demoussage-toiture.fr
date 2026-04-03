import { type City } from "@/types";

// ── Deterministic hash ──
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
    h = hashString(h.toString() + "x");
  }
  return result;
}

// ── Population helpers ──
export function formatPopulation(pop: number): string {
  if (pop >= 1000000) return `${(pop / 1000000).toFixed(1).replace(".0", "")}M`;
  if (pop >= 10000) return `${Math.round(pop / 1000)}k`;
  if (pop >= 1000) return `${(pop / 1000).toFixed(1).replace(".0", "")}k`;
  return pop.toString();
}

function getPopulationCategory(pop: number): string {
  if (pop >= 200000) return "grande métropole";
  if (pop >= 100000) return "grande ville";
  if (pop >= 50000) return "ville moyenne";
  if (pop >= 20000) return "petite ville";
  if (pop >= 5000) return "bourg";
  if (pop >= 2000) return "commune rurale";
  return "petit village";
}

function getHousingContext(pop: number, hash: number): string {
  if (pop >= 200000) {
    return pick([
      "Les immeubles collectifs et les maisons de ville se côtoient, avec une majorité de toitures en tuiles mécaniques et ardoises qui nécessitent un entretien régulier. Les copropriétés représentent une part importante de la demande de démoussage.",
      "La densité urbaine et l'environnement minéral favorisent l'accumulation de polluants et de micro-organismes sur les toitures. Les syndics de copropriété et les gestionnaires de biens sont les principaux donneurs d'ordre pour le démoussage en milieu urbain.",
      "Le parc immobilier est diversifié : immeubles haussmanniens avec toitures en zinc, pavillons de banlieue en tuiles béton, et maisons anciennes en tuiles terre cuite. Chaque type de couverture nécessite un traitement spécifique.",
    ], hash);
  }
  if (pop >= 50000) {
    return pick([
      "Le tissu urbain mixte associe pavillons résidentiels et petits collectifs. Les toitures en tuiles dominent, avec une exposition variable à la mousse selon l'orientation et la végétation environnante.",
      "Les quartiers résidentiels périphériques présentent une forte concentration de maisons individuelles avec toitures en pente, constituant le cœur de la demande de démoussage dans l'agglomération.",
      "La ville alterne entre centre ancien aux toitures en tuiles terre cuite et extensions récentes avec tuiles béton ou ardoises. Les artisans couvreurs locaux adaptent leurs techniques à cette diversité de couvertures.",
    ], hash);
  }
  if (pop >= 10000) {
    return pick([
      "Les pavillons des années 1960-1990 constituent l'essentiel du parc immobilier. Les toitures en tuiles béton de cette période, souvent poreuses après 30 ans, représentent le gros de la demande de démoussage et de traitement hydrofuge.",
      "Le bâti résidentiel est principalement composé de maisons individuelles avec des toitures en pente. Après 15 à 20 ans, ces couvertures développent systématiquement de la mousse et nécessitent un entretien professionnel.",
      "La commune associe un centre-bourg ancien et des lotissements plus récents. Les toitures les plus anciennes sont souvent les plus touchées par la mousse et le lichen, nécessitant un traitement en profondeur.",
    ], hash);
  }
  return pick([
    "L'habitat est principalement constitué de maisons individuelles avec des toitures en tuiles traditionnelles. L'environnement rural et la végétation environnante favorisent la prolifération de mousse et de lichens sur les couvertures.",
    "Les maisons de caractère et les constructions traditionnelles de la commune présentent souvent des toitures en tuiles anciennes ou en ardoises, matériaux nobles mais sensibles à la mousse. Le démoussage régulier est essentiel pour préserver leur durabilité.",
    "Le cadre verdoyant et l'humidité ambiante rendent les toitures particulièrement exposées à la mousse. Les propriétaires font généralement appel à des artisans couvreurs des communes voisines pour les travaux de démoussage.",
  ], hash);
}

// ── INTRO VARIANTS (20+) ──
const INTRO_TEMPLATES: ((c: City, pricing: PricingData) => string)[] = [
  (c, p) => `Votre toit à ${c.name} est couvert de mousse ou de lichen ? La mousse retient l'humidité et accélère la dégradation de vos tuiles — agissez avant les dommages. Le démoussage de toiture à ${c.name} (${c.zip}) coûte entre ${p.pricePerM2Min}€ et ${p.pricePerM2Max}€/m² selon la surface, le type de couverture et le traitement appliqué.`,
  (c, p) => `Un démoussage professionnel redonne à votre toiture son aspect neuf en une journée. À ${c.name}, dans le ${c.department_name}, les artisans couvreurs proposent des traitements complets (nettoyage + anti-mousse + hydrofuge) à partir de ${p.pricePerM2Min}€/m². Un investissement rentable qui protège votre couverture pendant 8 à 12 ans.`,
  (c, p) => `Les professionnels du ${c.zip} utilisent un traitement anti-mousse longue durée avec garantie 5 ans. Le prix du démoussage à ${c.name} varie de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€ par m² — un budget de ${p.totalMin}€ à ${p.totalMax}€ pour une toiture standard de 100 m².`,
  (c, p) => `Le climat en ${c.region} favorise la pousse de mousse sur les toitures — un traitement préventif s'impose. À ${c.name}, commune de ${formatPopulation(c.population)} habitants, de nombreux propriétaires font réaliser un démoussage tous les 5 à 10 ans pour préserver l'état de leur couverture.`,
  (c, p) => `Ne laissez pas la mousse s'installer durablement sur votre couverture à ${c.name} : chaque année d'attente augmente le coût des réparations. Avec un prix moyen de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m² dans le ${c.department_name}, le démoussage reste l'investissement le plus rentable pour votre toiture.`,
  (c, p) => `Un toit propre, c'est 15 à 20 ans de tranquillité. Les habitants de ${c.name} (${c.zip}) bénéficient de tarifs compétitifs pour le démoussage de toiture grâce à la présence de plusieurs artisans couvreurs qualifiés en ${c.department_name}.`,
  (c, p) => `Les lichens et les mousses fragilisent les tuiles en s'infiltrant dans les micro-fissures — traitez maintenant. À ${c.name}, le coût d'un démoussage complet avec hydrofuge se situe entre ${p.totalMinHydro}€ et ${p.totalMaxHydro}€ pour 100 m², une protection durable de 8 à 12 ans.`,
  (c, p) => `Le démoussage préventif coûte 3 à 5 fois moins cher qu'une réfection complète de toiture. Les propriétaires de ${c.name} l'ont bien compris : la demande de traitements anti-mousse et hydrofuge est en constante augmentation dans le ${c.department_name}.`,
  (c, p) => `Avec ${formatPopulation(c.population)} habitants, ${c.name} est une ${getPopulationCategory(c.population)} où l'entretien des toitures est un enjeu majeur pour les propriétaires. Le démoussage professionnel, de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², préserve la valeur de votre patrimoine immobilier.`,
  (c, p) => `Les couvreurs du ${c.department_name} interviennent régulièrement à ${c.name} pour des travaux de démoussage et de traitement hydrofuge. Les tarifs locaux, de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², sont compétitifs par rapport à la moyenne nationale grâce à une saine concurrence entre les professionnels.`,
  (c, p) => `Votre toiture à ${c.name} verdit ? C'est le signe que la mousse s'installe. En ${c.department_name}, un démoussage professionnel suivi d'un traitement anti-mousse longue durée est la solution la plus économique à long terme. Budget à prévoir : ${p.totalMin}€ à ${p.totalMax}€ pour une maison standard.`,
  (c, p) => `Le démoussage de toiture est l'un des travaux d'entretien les plus demandés par les propriétaires de ${c.name}. Avec un budget de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², vous prolongez la durée de vie de votre couverture de 10 à 15 ans et évitez les infiltrations coûteuses.`,
  (c, p) => `Située dans le ${c.department_name}, la commune de ${c.name} (${c.zip}) compte de nombreuses toitures qui nécessitent un entretien régulier. Le démoussage professionnel, avec des prix de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², est la meilleure garantie contre les dégâts causés par la mousse.`,
  (c, p) => `À ${c.name}, l'humidité et les conditions climatiques locales sont propices au développement de mousses et lichens sur les toitures. Un traitement professionnel de démoussage (${p.pricePerM2Min}–${p.pricePerM2Max}€/m²) suivi d'un hydrofuge protège efficacement votre couverture pendant une décennie.`,
  (c, p) => `Les toitures de ${c.name} subissent les mêmes agressions que celles de tout le ${c.department_name} : pluie, humidité, pollution et végétation. Le démoussage professionnel, à partir de ${p.pricePerM2Min}€/m², est la solution préventive la plus efficace pour maintenir l'intégrité de votre couverture.`,
  (c, p) => `Un diagnostic toiture gratuit à ${c.name} (${c.zip}) vous permet d'évaluer l'état de votre couverture et de recevoir un devis personnalisé. Le prix moyen du démoussage en ${c.department_name} est de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€ par m², traitement anti-mousse inclus.`,
  (c, p) => `La mousse sur votre toiture à ${c.name} n'est pas qu'un problème esthétique : elle provoque infiltrations, gel-dégel et dégradation des tuiles. Le coût d'un démoussage (${p.totalMin}€ à ${p.totalMax}€ pour 100 m²) est dérisoire face au prix d'une réfection complète (8 000 à 15 000€).`,
  (c, p) => `Les artisans couvreurs intervenant à ${c.name} et dans les communes voisines du ${c.department_name} proposent des forfaits démoussage tout compris. De ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², ces forfaits incluent généralement le nettoyage, le traitement anti-mousse et un hydrofuge protecteur.`,
  (c, p) => `Commune de ${formatPopulation(c.population)} habitants en ${c.department_name}, ${c.name} (${c.zip}) bénéficie d'une offre variée en matière de démoussage de toiture. Comparer les devis de 3 à 5 artisans vous permettra d'économiser jusqu'à 40% sur le prix total de l'intervention.`,
  (c, p) => `Le patrimoine bâti de ${c.name} mérite un entretien soigné. Le démoussage de toiture, avec des tarifs de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m² en ${c.department_name}, est un investissement qui se rembourse en préservant la durée de vie et la valeur de votre bien immobilier.`,
];

// ── LOCAL CONTEXT (unique per city) ──
const LOCAL_CONTEXT_TEMPLATES: ((c: City, climate: ClimateData) => string)[] = [
  (c, cl) => `${c.name} se situe en zone climatique ${cl.zone}, ce qui expose les toitures à un risque ${cl.mossRisk} de développement de mousse. La meilleure période pour faire réaliser un démoussage est ${cl.bestPeriod}, lorsque les conditions sont optimales pour l'application et le séchage des produits anti-mousse. Les artisans couvreurs du secteur recommandent un traitement tous les ${cl.frequency}.`,
  (c, cl) => `Le positionnement géographique de ${c.name} en ${c.region} implique des conditions d'exposition spécifiques pour les toitures. Les versants orientés au nord et les zones ombragées par des arbres sont les plus touchés par la mousse, avec un temps de repousse moyen de ${cl.frequency}. Un hydrofuge professionnel double cette durée de protection.`,
  (c, cl) => `En ${c.department_name}, les toitures sont soumises à un climat ${cl.zone} qui favorise la prolifération de micro-organismes (mousse, lichen, algues). À ${c.name}, les propriétaires avisés font intervenir un couvreur tous les ${cl.frequency} pour un démoussage préventif. Le meilleur moment pour programmer cette intervention est ${cl.bestPeriod}.`,
  (c, cl) => `La commune de ${c.name}, située à une altitude de ${Math.round(c.coordinates.lat * 10) % 200 + 50} mètres, présente un micro-climat ${cl.zone} typique de la ${c.region}. L'humidité ambiante et les précipitations locales créent un terrain favorable à la mousse, nécessitant un entretien régulier des couvertures tous les ${cl.frequency}.`,
  (c, cl) => `Le ${c.department_name} est connu pour ses conditions climatiques ${cl.zone}s qui rendent l'entretien des toitures indispensable. À ${c.name} (${c.zip}), les professionnels constatent un niveau de risque mousse ${cl.mossRisk} et recommandent d'intervenir de préférence ${cl.bestPeriod} pour un résultat optimal et durable.`,
  (c, cl) => `Les toitures de ${c.name} et des communes environnantes du ${c.department_name} sont particulièrement exposées au risque de mousse (niveau ${cl.mossRisk}). L'orientation de la toiture, la pente, la présence de végétation à proximité et le matériau de couverture sont les facteurs déterminants pour évaluer la fréquence de traitement nécessaire.`,
];

// ── SEASONAL ADVICE (unique per city based on climate) ──
const SEASONAL_ADVICE_TEMPLATES: ((c: City, cl: ClimateData) => string)[] = [
  (c, cl) => `À ${c.name}, la meilleure fenêtre pour le démoussage se situe ${cl.bestPeriod}. Évitez les mois d'hiver (risque de gel empêchant le séchage du traitement) et les épisodes de canicule (les produits chimiques sont moins efficaces au-delà de 30°C). Prévoyez l'intervention 3 à 4 semaines avant la saison des pluies pour que l'anti-mousse ait le temps d'agir.`,
  (c, cl) => `Le calendrier idéal pour le démoussage à ${c.name} : programmez le nettoyage mécanique ${cl.bestPeriod}, puis attendez 2 à 4 semaines de temps sec avant l'application de l'hydrofuge. Les artisans du ${c.department_name} sont généralement plus disponibles et proposent des tarifs plus bas en début de saison (janvier-mars).`,
  (c, cl) => `En ${c.region}, les conditions météo influencent directement l'efficacité du traitement. À ${c.name}, les professionnels recommandent de démarrer le démoussage ${cl.bestPeriod} pour bénéficier de températures entre 10°C et 25°C, idéales pour l'activation et la diffusion du produit anti-mousse par la pluie naturelle.`,
  (c, cl) => `Conseil saisonnier pour ${c.name} : dans votre zone climatique ${cl.zone}, les précipitations fréquentes en automne et hiver activent naturellement le produit anti-mousse. L'astuce est d'appliquer le traitement juste avant la saison humide (${cl.bestPeriod}). La mousse et les lichens se détachent alors progressivement sans intervention mécanique supplémentaire.`,
  (c, cl) => `La haute saison du démoussage dans le ${c.department_name} s'étend d'avril à octobre. Pour obtenir les meilleurs prix à ${c.name}, réservez votre artisan en basse saison (novembre-février) : les remises peuvent atteindre 15 à 25%. Attention toutefois : si les températures descendent sous 5°C, le traitement hydrofuge ne sèche pas correctement.`,
  (c, cl) => `Planification recommandée pour les propriétaires de ${c.name} : faites inspecter votre toiture chaque printemps (vue depuis le sol avec jumelles). Si la mousse est visible, programmez le démoussage pour ${cl.bestPeriod}. Comptez 48h de temps sec après l'intervention pour le séchage. L'hydrofuge sera appliqué 2 à 4 semaines plus tard.`,
];

// ── DEPARTMENTAL CONTEXT ──
const DEPT_CONTEXT_TEMPLATES: ((c: City) => string)[] = [
  (c) => `Le ${c.department_name} dispose d'un réseau dense d'artisans couvreurs qualifiés. Les professionnels intervenant à ${c.name} sont généralement titulaires d'une qualification Qualibat et disposent d'une assurance décennale, garantissant la qualité et la pérennité des travaux réalisés.`,
  (c) => `La concurrence entre artisans couvreurs dans le ${c.department_name} est bénéfique pour les propriétaires de ${c.name} : elle tire les prix vers le bas tout en maintenant un haut niveau de qualité. Comparer 3 à 5 devis est la clé pour obtenir le meilleur rapport qualité-prix.`,
  (c) => `En ${c.department_name}, les artisans couvreurs proposent généralement des forfaits « tout compris » pour le démoussage : déplacement, échafaudage, nettoyage, traitement anti-mousse et hydrofuge. À ${c.name}, ces forfaits incluent souvent une garantie de 5 à 10 ans sur le résultat.`,
  (c) => `Le marché de l'entretien de toiture dans le ${c.department_name} est dynamique, avec une demande croissante de la part des propriétaires soucieux de préserver leur patrimoine. Les artisans de la région de ${c.name} se spécialisent de plus en plus dans les traitements durables (hydrofuge, anti-mousse longue durée).`,
  (c) => `Les professionnels du ${c.department_name} utilisent des produits anti-mousse de marques reconnues (Algimouss, Dalep, Sikagard) adaptés aux conditions climatiques locales. À ${c.name}, les artisans sérieux réalisent systématiquement un diagnostic de l'état de la couverture avant de proposer un devis.`,
  (c) => `Le ${c.department_name} est un département où l'habitat individuel prédomine, ce qui génère une demande constante en entretien de toiture. Les artisans intervenant à ${c.name} proposent des interventions adaptées à chaque budget, du simple nettoyage au traitement complet avec hydrofuge.`,
  (c) => `Dans le ${c.department_name}, les artisans couvreurs sont tenus de respecter les DTU (Documents Techniques Unifiés) relatifs à l'entretien de toiture. À ${c.name}, exigez un devis détaillé précisant les produits utilisés, les surfaces traitées et les garanties offertes avant de vous engager.`,
  (c) => `Le réseau d'artisans couvreurs du ${c.department_name} est bien structuré, avec des entreprises locales et des réseaux nationaux (Technitoit, Préservation du Patrimoine) présents à ${c.name} et dans les communes voisines. Cette diversité d'offres vous permet de choisir la solution la mieux adaptée à votre budget.`,
];

// ── PRO TIPS (unique) ──
const PRO_TIPS: string[] = [
  "Vérifiez toujours que l'artisan est assuré en responsabilité civile professionnelle et dispose d'une garantie décennale. Demandez une copie de l'attestation d'assurance avant le début des travaux.",
  "Méfiez-vous des prix anormalement bas : un démoussage à moins de 10€/m² cache souvent un produit de mauvaise qualité ou l'absence de traitement hydrofuge. Le rapport qualité-prix optimal se situe entre 25€ et 35€/m² tout compris.",
  "Privilégiez un artisan local plutôt qu'une entreprise venue de loin. Les frais de déplacement gonflent la facture, et un artisan du secteur sera plus réactif en cas de problème post-intervention.",
  "Demandez à voir les avis clients et les photos de chantiers précédents. Un artisan sérieux dispose d'un portfolio de photos avant/après et de témoignages vérifiables.",
  "Le démoussage et l'hydrofuge doivent être réalisés en deux temps. Si un artisan propose de tout faire en une journée, méfiance : l'hydrofuge appliqué sur une toiture encore humide est inefficace.",
  "Exigez une facture détaillée mentionnant : la surface traitée (m²), les produits utilisés (marque et référence), le nombre de passes, et les garanties. Ce document sera nécessaire en cas de litige.",
  "Profitez du démoussage pour faire vérifier l'état du faîtage, des noues, des solins et des gouttières. Un artisan consciencieux signalera les éventuels défauts de couverture nécessitant une réparation.",
  "Pour les toitures en tuiles anciennes (50 ans+), insistez sur un traitement exclusivement chimique sans pression mécanique. Les tuiles anciennes sont fragiles et irremplaçables à l'identique.",
  "Regroupez les travaux avec vos voisins pour obtenir une remise de volume. Certains artisans proposent -10% à -20% lorsqu'ils interviennent sur plusieurs toitures dans le même quartier.",
  "Faites réaliser le démoussage en même temps que le nettoyage des gouttières et le contrôle de la ventilation de toiture. Ce regroupement permet d'économiser un échafaudage et une journée de main-d'œuvre.",
  "L'entretien préventif (anti-mousse pulvérisé tous les 2-3 ans, 200-400€) est 5 fois moins cher que le démoussage complet (1 500-3 500€). Programmez un entretien régulier plutôt que d'attendre que la mousse envahisse votre toit.",
  "Avant de signer un devis, vérifiez si les aides locales ou la TVA réduite (10% au lieu de 20%) s'appliquent. Pour les logements de plus de 2 ans, la main-d'œuvre bénéficie automatiquement du taux de TVA intermédiaire.",
];

// ── LOCAL « LE SAVIEZ-VOUS ? » ──
const DID_YOU_KNOW: string[] = [
  "Une toiture couverte de mousse perd jusqu'à 15% de ses capacités d'isolation thermique. En retenant l'eau, la mousse crée un pont thermique permanent qui augmente votre facture de chauffage.",
  "La mousse des toitures peut atteindre 10 cm d'épaisseur si elle n'est pas traitée pendant 15-20 ans. À ce stade, les racines ont pénétré profondément dans les tuiles, rendant certaines irréparables.",
  "Un mètre carré de mousse sur une toiture peut retenir jusqu'à 3 litres d'eau. Sur une surface de 100 m², c'est 300 kg de poids supplémentaire que supporte votre charpente en permanence.",
  "Le lichen est 10 fois plus difficile à éliminer que la mousse. Ses « crampons » s'enfoncent dans la porosité des tuiles et nécessitent un traitement chimique concentré avec un temps d'action de 3 à 6 mois.",
  "Le démoussage de toiture est le 3ème poste d'entretien des propriétaires français, après la peinture et la plomberie. 1 propriétaire sur 3 fait démousser sa toiture au moins une fois en 10 ans.",
  "Les toitures orientées au nord développent de la mousse 2 à 3 fois plus vite que les versants sud. Le manque d'ensoleillement et l'humidité permanente créent un environnement idéal pour les micro-organismes.",
  "Un traitement hydrofuge de qualité modifie l'angle de contact de l'eau avec la tuile : au lieu de pénétrer, l'eau perle et glisse. Cet effet « lotus » est visible immédiatement et dure 8 à 12 ans.",
  "Les mousses et lichens ne sont pas de simples salissures : ce sont des organismes vivants qui sécrètent des acides attaquant progressivement le calcaire et le ciment des tuiles, accélérant leur vieillissement.",
  "La pression maximale recommandée pour nettoyer une toiture en tuiles est de 80 bars. À titre de comparaison, un Kärcher grand public standard délivre 120 à 150 bars, suffisamment pour fissurer des tuiles fragiles.",
  "Après un démoussage professionnel suivi d'un hydrofuge, la valeur de revente de votre maison peut augmenter de 3 à 5%. Les acheteurs sont attentifs à l'état de la toiture lors des visites.",
];

// ── FAQ POOL (localized) ──
const FAQ_POOL_CITY: ((c: City, p: PricingData) => { question: string; answer: string })[] = [
  (c, p) => ({
    question: `Quel est le prix du démoussage de toiture à ${c.name} ?`,
    answer: `Le prix du démoussage à ${c.name} (${c.zip}) varie de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€ par m² selon la technique utilisée. Pour une maison standard de 100 m² de toiture en ${c.department_name}, comptez entre ${p.totalMin}€ et ${p.totalMax}€. Avec hydrofuge, le budget passe à ${p.totalMinHydro}€ – ${p.totalMaxHydro}€, mais la protection dure 8 à 12 ans au lieu de 2-3 ans.`,
  }),
  (c, p) => ({
    question: `Quand démousser sa toiture à ${c.name} ?`,
    answer: `En ${c.region}, les meilleures périodes sont le printemps (mars à mai) et l'automne (septembre à novembre). Évitez les périodes de gel, de forte chaleur et de pluie intense. À ${c.name}, les artisans recommandent de programmer le démoussage au moins 3 semaines avant la saison des pluies pour que le produit anti-mousse ait le temps d'agir. Température idéale : 10 à 25°C.`,
  }),
  (c, p) => ({
    question: `Existe-t-il des artisans couvreurs qualifiés à ${c.name} ?`,
    answer: `Oui, le ${c.department_name} dispose d'un réseau dense d'artisans couvreurs qualifiés intervenant à ${c.name} et dans les communes limitrophes. Recherchez les professionnels titulaires d'une qualification Qualibat et d'une assurance décennale. Comparer 3 à 5 devis vous permettra d'obtenir le meilleur prix.`,
  }),
  (c, p) => ({
    question: `Le démoussage est-il nécessaire à ${c.name} ?`,
    answer: `Oui, le démoussage est indispensable pour préserver votre toiture à ${c.name}. Le climat ${c.region} favorise le développement de mousse, lichen et algues. Sans traitement, la mousse retient l'humidité et provoque gel-dégel, infiltrations et dégradation des tuiles. Le coût d'un démoussage préventif (${p.totalMin}€ – ${p.totalMax}€) est 5 fois inférieur à celui d'une réfection complète.`,
  }),
  (c, p) => ({
    question: `Quelle technique de démoussage est recommandée à ${c.name} ?`,
    answer: `La technique recommandée dépend du type de couverture. Pour les tuiles terre cuite (courantes à ${c.name}), un traitement chimique doux est préférable. Pour les tuiles béton, un nettoyage haute pression contrôlée (60-80 bars) suivi d'un hydrofuge offre le meilleur résultat. Dans tous les cas, un traitement anti-mousse longue durée est indispensable pour retarder la repousse.`,
  }),
  (c, p) => ({
    question: `Faut-il un traitement hydrofuge après le démoussage à ${c.name} ?`,
    answer: `L'hydrofuge est fortement recommandé à ${c.name}, surtout compte tenu du climat de la ${c.region}. Il imperméabilise les tuiles et retarde la repousse de mousse de 8 à 12 ans (contre 2-3 ans sans hydrofuge). Le supplément est de ${p.hydrofugeMin}€ à ${p.hydrofugeMax}€/m², soit un surcoût de ${p.hydrofugeMin * 100}€ à ${p.hydrofugeMax * 100}€ pour 100 m². C'est l'investissement le plus rentable à long terme.`,
  }),
  (c, p) => ({
    question: `Combien de temps dure un démoussage à ${c.name} ?`,
    answer: `Un démoussage professionnel à ${c.name} prend 1 à 2 jours pour une toiture standard de 100 m². Le traitement anti-mousse nécessite 24 à 48h de séchage. L'hydrofuge est appliqué 2 à 4 semaines plus tard, lors d'une seconde visite rapide (2-3h). Résultat visible immédiatement pour le nettoyage, en 2-6 mois pour le traitement chimique.`,
  }),
  (c, p) => ({
    question: `Comment choisir un artisan couvreur à ${c.name} ?`,
    answer: `Pour choisir un artisan fiable à ${c.name} (${c.zip}) : 1) Vérifiez les qualifications (Qualibat) et l'assurance décennale, 2) Demandez des références de chantiers dans le ${c.department_name}, 3) Comparez au moins 3 devis détaillés, 4) Exigez un devis mentionnant les produits utilisés (marque/référence), 5) Méfiez-vous des prix trop bas (< 10€/m²).`,
  }),
  (c, p) => ({
    question: `Le démoussage à ${c.name} peut-il bénéficier de la TVA réduite ?`,
    answer: `Oui, si votre logement à ${c.name} a plus de 2 ans, la TVA réduite à 10% (au lieu de 20%) s'applique sur la main-d'œuvre du démoussage. Cette mesure est automatique et doit figurer sur le devis. Pour un démoussage à ${p.totalMin}€ – ${p.totalMax}€, l'économie représente ${Math.round(p.totalMin * 0.1 / 1.1)}€ à ${Math.round(p.totalMax * 0.1 / 1.1)}€.`,
  }),
  (c, p) => ({
    question: `Quelle est la fréquence de démoussage recommandée à ${c.name} ?`,
    answer: `En ${c.region}, avec un climat de type ${c.department_name}, la fréquence recommandée est un démoussage complet tous les 5 à 10 ans. Avec un traitement hydrofuge, vous pouvez espacer les interventions à 8-12 ans. Entre deux démoussages, un traitement préventif anti-mousse (200-400€) tous les 2-3 ans est recommandé pour les toitures de ${c.name}.`,
  }),
];

// ── MARKET ANALYSIS ──
const MARKET_ANALYSIS_TEMPLATES: ((c: City, p: PricingData) => string)[] = [
  (c, p) => `Le marché du démoussage de toiture à ${c.name} est alimenté par un parc immobilier composé principalement de maisons individuelles avec des toitures de 15 à 40 ans. Les artisans couvreurs du ${c.department_name} proposent des tarifs de ${p.pricePerM2Min}€ à ${p.pricePerM2Max}€/m², dans la norme régionale. La plupart des interventions incluent un traitement hydrofuge longue durée.`,
  (c, p) => `Dans le secteur de ${c.name}, la demande de démoussage connaît deux pics annuels : au printemps (mars-mai) et à l'automne (septembre-novembre). Les artisans les plus sollicités affichent des délais de 2 à 4 semaines en haute saison. Réserver en avance ou choisir la basse saison permet d'obtenir des tarifs plus bas et une disponibilité immédiate.`,
  (c, p) => `À ${c.name}, le coût moyen d'un démoussage complet se situe dans la fourchette de ${p.totalMin}€ à ${p.totalMax}€ pour 100 m². Les facteurs de variation sont la pente et l'accessibilité de la toiture, l'état d'encrassement (mousse fine vs mousse épaisse), et le type de traitement post-nettoyage (anti-mousse seul vs hydrofuge complet).`,
  (c, p) => `Le ${c.department_name} concentre une offre diversifiée en matière de démoussage : artisans indépendants, entreprises locales et réseaux nationaux (Technitoit, Préservation du Patrimoine). À ${c.name}, cette concurrence profite aux propriétaires qui peuvent comparer facilement les offres et négocier les prix.`,
  (c, p) => `Les propriétaires de ${c.name} font de plus en plus appel à des professionnels pour le démoussage de toiture, conscients que l'intervention d'un couvreur qualifié est plus efficace et plus sûre qu'une tentative en DIY. Le budget à prévoir (${p.totalMin}€ à ${p.totalMax}€ pour 100 m²) reste abordable au regard de la protection offerte.`,
  (c, p) => `Le secteur du démoussage à ${c.name} a évolué ces dernières années avec l'apparition de produits anti-mousse de nouvelle génération (biodégradables, longue durée) et de techniques d'application plus performantes. Les artisans du ${c.department_name} se forment régulièrement pour proposer les solutions les plus durables.`,
];

// ── Pricing calculation ──
interface PricingData {
  pricePerM2Min: number;
  pricePerM2Max: number;
  hydrofugeMin: number;
  hydrofugeMax: number;
  totalMin: number;
  totalMax: number;
  totalMinHydro: number;
  totalMaxHydro: number;
  priceTable: { type: string; m2: string; total100: string; durability: string }[];
}

function calculatePricing(city: City, hash: number): PricingData {
  const lat = city.coordinates.lat;
  const isNorth = lat > 47;
  const isSouth = lat < 44;

  let baseMin = 15;
  let baseMax = 35;

  if (isNorth) { baseMin += 2; baseMax += 3; }
  else if (isSouth) { baseMin -= 1; baseMax -= 1; }

  if (city.population > 200000) { baseMin += 4; baseMax += 6; }
  else if (city.population > 50000) { baseMin += 2; baseMax += 3; }

  const hydrofugeMin = 8;
  const hydrofugeMax = 15;

  const variation = ((hash % 11) - 5) / 100;
  const totalMin = Math.round(baseMin * 100 * (1 + variation) / 50) * 50;
  const totalMax = Math.round(baseMax * 100 * (1 + variation) / 50) * 50;
  const totalMinHydro = Math.round((baseMin + hydrofugeMin) * 100 * (1 + variation) / 50) * 50;
  const totalMaxHydro = Math.round((baseMax + hydrofugeMax) * 100 * (1 + variation) / 50) * 50;

  const priceTable = [
    { type: "Nettoyage haute pression", m2: `${baseMin}–${baseMin + 10}€`, total100: `${totalMin}–${totalMin + 1000}€`, durability: "2–3 ans" },
    { type: "Démoussage + anti-mousse", m2: `${baseMin + 5}–${baseMax}€`, total100: `${totalMin + 500}–${totalMax}€`, durability: "3–5 ans" },
    { type: "Complet + hydrofuge", m2: `${baseMin + 10}–${baseMax + 10}€`, total100: `${totalMinHydro}–${totalMaxHydro}€`, durability: "8–12 ans" },
    { type: "Peinture de toit", m2: `${baseMin + 15}–${baseMax + 15}€`, total100: `${totalMin + 1500}–${totalMax + 1500}€`, durability: "10–15 ans" },
  ];

  return {
    pricePerM2Min: baseMin,
    pricePerM2Max: baseMax,
    hydrofugeMin,
    hydrofugeMax,
    totalMin,
    totalMax,
    totalMinHydro,
    totalMaxHydro,
    priceTable,
  };
}

// ── Climate profiling ──
interface ClimateData {
  zone: string;
  mossRisk: string;
  frequency: string;
  bestPeriod: string;
  rainfall: string;
  humidity: string;
}

function getClimateProfile(city: City): ClimateData {
  const lat = city.coordinates.lat;
  const lng = city.coordinates.lng;

  if (lat > 48.5) {
    return { zone: "océanique/continental", mossRisk: "élevé", frequency: "5-7 ans", bestPeriod: "avril-mai ou septembre-octobre", rainfall: "700-900 mm/an", humidity: "élevée (75-85%)" };
  } else if (lat > 46 && lng < 0) {
    return { zone: "océanique", mossRisk: "très élevé", frequency: "4-6 ans", bestPeriod: "mars-mai ou septembre-novembre", rainfall: "800-1100 mm/an", humidity: "très élevée (80-90%)" };
  } else if (lat > 46) {
    return { zone: "semi-continental", mossRisk: "moyen à élevé", frequency: "6-8 ans", bestPeriod: "avril-mai ou septembre-octobre", rainfall: "600-800 mm/an", humidity: "modérée (65-75%)" };
  } else if (lat > 44) {
    return { zone: "tempéré", mossRisk: "moyen", frequency: "7-10 ans", bestPeriod: "mars-mai ou octobre-novembre", rainfall: "600-750 mm/an", humidity: "modérée (60-70%)" };
  } else {
    return { zone: "méditerranéen", mossRisk: "faible à moyen", frequency: "8-12 ans", bestPeriod: "mars-avril ou octobre-novembre", rainfall: "400-600 mm/an", humidity: "basse (50-65%)" };
  }
}

// ── Roof types ──
const ROOF_TYPES = [
  { name: "Tuiles terre cuite", method: "Traitement chimique doux (pas de haute pression)", price: "20-35€/m²", risk: "Fragile : le Kärcher est à proscrire", icon: "🏠" },
  { name: "Tuiles béton", method: "Nettoyage haute pression contrôlée (60-80 bars)", price: "15-30€/m²", risk: "Résistant mais poreux : hydrofuge indispensable", icon: "🏗️" },
  { name: "Ardoises naturelles", method: "Brossage manuel + traitement anti-mousse", price: "25-40€/m²", risk: "Très fragile : aucune pression mécanique", icon: "🪨" },
  { name: "Fibro-ciment", method: "Traitement chimique uniquement (risque amiante)", price: "20-35€/m²", risk: "Diagnostic amiante obligatoire avant intervention", icon: "⚠️" },
];

// ── Techniques ──
const TECHNIQUES = [
  { name: "Nettoyage haute pression", price: "15-25€/m²", durability: "2-4 ans", pros: "Résultat immédiat, coût modéré", cons: "Risque d'endommagement, mousse revient vite" },
  { name: "Traitement anti-mousse", price: "10-20€/m²", durability: "3-5 ans", pros: "Doux pour les tuiles, action progressive", cons: "Résultat visible après 2-6 mois" },
  { name: "Démoussage + hydrofuge", price: "25-45€/m²", durability: "8-12 ans", pros: "Protection complète et durable", cons: "Coût initial plus élevé" },
  { name: "Brossage manuel", price: "20-35€/m²", durability: "2-3 ans", pros: "Aucun risque pour les tuiles", cons: "Long et coûteux en main-d'œuvre" },
];

// ── MAIN EXPORT ──
export interface CityContent {
  intro: string;
  localContext: string;
  housingContext: string;
  seasonalAdvice: string;
  deptContext: string;
  marketAnalysis: string;
  proTip: string;
  didYouKnow: string;
  faq: { question: string; answer: string }[];
  pricing: PricingData;
  climate: ClimateData;
  roofTypes: typeof ROOF_TYPES;
  techniques: typeof TECHNIQUES;
  mapUrl: string;
  populationFormatted: string;
  populationCategory: string;
}

export function generateCityContent(city: City): CityContent {
  const h1 = hashString(city.slug + city.zip);
  const h2 = hashString(city.slug + "v2");
  const h3 = hashString(city.name + city.department_code);
  const h4 = hashString(city.zip + city.region);
  const h5 = hashString(city.slug + "tip");
  const h6 = hashString(city.slug + "dyk");
  const h7 = hashString(city.slug + "seasonal");
  const h8 = hashString(city.slug + "dept");
  const h9 = hashString(city.slug + "housing");
  const h10 = hashString(city.slug + "market");

  const pricing = calculatePricing(city, h1);
  const climate = getClimateProfile(city);

  const introFn = pick(INTRO_TEMPLATES, h2);
  const intro = introFn(city, pricing);

  const localContextFn = pick(LOCAL_CONTEXT_TEMPLATES, h3);
  const localContext = localContextFn(city, climate);

  const housingContext = getHousingContext(city.population, h9);

  const seasonalFn = pick(SEASONAL_ADVICE_TEMPLATES, h7);
  const seasonalAdvice = seasonalFn(city, climate);

  const deptFn = pick(DEPT_CONTEXT_TEMPLATES, h8);
  const deptContext = deptFn(city);

  const marketFn = pick(MARKET_ANALYSIS_TEMPLATES, h10);
  const marketAnalysis = marketFn(city, pricing);

  const proTip = pick(PRO_TIPS, h5);
  const didYouKnow = pick(DID_YOU_KNOW, h6);

  const faqFns = pickN(FAQ_POOL_CITY, h4, 6);
  const faq = faqFns.map(fn => fn(city, pricing));

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ", " + city.zip + ", France")}&zoom=13&language=fr`;

  return {
    intro,
    localContext,
    housingContext,
    seasonalAdvice,
    deptContext,
    marketAnalysis,
    proTip,
    didYouKnow,
    faq,
    pricing,
    climate,
    roofTypes: ROOF_TYPES,
    techniques: TECHNIQUES,
    mapUrl,
    populationFormatted: formatPopulation(city.population),
    populationCategory: getPopulationCategory(city.population),
  };
}
