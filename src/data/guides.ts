export interface Guide {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  readTime: string;
  sections: GuideSection[];
  tableData?: TableRow[];
  faq?: { question: string; answer: string }[];
}

interface GuideSection {
  title: string;
  content: string;
  tip?: string;
}

interface TableRow {
  label: string;
  values: string[];
}

export const guides: Guide[] = [
  {
    slug: "prix-demoussage-toiture-2026",
    title: "Prix Démoussage Toiture 2026 : Tarifs au m² Détaillés",
    description: "De 15€ à 45€/m² : tous les prix du démoussage de toiture détaillés par type de traitement, surface et type de couverture.",
    heroImage: "/images/guides/prix-demoussage-2026.svg",
    readTime: "14 min",
    sections: [
      {
        title: "Combien coûte un démoussage de toiture en 2026 ?",
        content: "Le prix d'un démoussage de toiture varie de **15€ à 45€ par m²** selon le type de traitement, l'état de la toiture et la région. Ce tarif comprend le nettoyage, le traitement anti-mousse et éventuellement l'application d'un hydrofuge.\n\n**Nettoyage simple** (15-25€/m²) : retrait mécanique de la mousse par haute pression contrôlée ou brossage manuel. Résultat immédiat mais mousse de retour en 2-3 ans.\n\n**Démoussage + anti-mousse** (20-35€/m²) : nettoyage suivi d'un traitement chimique préventif qui retarde la repousse pendant 3-5 ans.\n\n**Démoussage complet + hydrofuge** (25-45€/m²) : la formule complète avec imperméabilisation de la couverture. Protection 8-12 ans. Le meilleur rapport qualité-prix à long terme.\n\nPour une maison standard avec 100 m² de toiture, le budget total se situe entre **1 500€ et 4 500€** tout compris.",
        tip: "Demandez systématiquement un devis détaillé séparant : nettoyage mécanique, traitement anti-mousse, hydrofuge, et frais d'échafaudage. C'est le seul moyen de comparer objectivement les offres."
      },
      {
        title: "Prix par type de couverture",
        content: "**Tuiles béton** : 15-30€/m². Couverture la plus courante et la plus facile à traiter. Supporte le nettoyage haute pression contrôlée (60-80 bars). Hydrofuge fortement recommandé car les tuiles béton sont poreuses.\n\n**Tuiles terre cuite** : 20-35€/m². Plus fragile que le béton, la tuile terre cuite nécessite un traitement chimique doux (pas de haute pression). Le surcoût s'explique par le temps de main-d'œuvre plus long.\n\n**Ardoises naturelles** : 25-40€/m². Le traitement le plus délicat. Brossage manuel uniquement + anti-mousse liquide basse pression. L'ardoise ne doit jamais être soumise à un jet haute pression.\n\n**Fibro-ciment** : 20-35€/m². Attention : un diagnostic amiante est obligatoire avant toute intervention. Si le matériau contient de l'amiante, seule une entreprise certifiée peut intervenir.",
      },
      {
        title: "Facteurs de variation du prix",
        content: "Plusieurs éléments font varier le devis final :\n\n1. **La surface** : le prix au m² baisse avec la surface totale (effet d'échelle). 50 m² = 30-45€/m², 100 m² = 20-35€/m², 200 m² = 15-25€/m².\n2. **L'état de la toiture** : une toiture très encrassée (mousse épaisse) nécessite un double traitement (+20-30%).\n3. **L'accessibilité** : échafaudage obligatoire (+500 à 1 500€), toiture pentue (+15-25%).\n4. **La localisation** : +10 à 20% en Île-de-France et PACA par rapport aux zones rurales.\n5. **Le type de traitement** : nettoyage seul vs démoussage complet + hydrofuge (x2 à x3).\n6. **La saison** : tarifs plus bas en janvier-mars (basse saison).",
      },
      {
        title: "Comment réduire le coût du démoussage ?",
        content: "1. **Comparer 3 à 5 devis** : les écarts peuvent atteindre 40% pour un même travail.\n2. **Choisir la basse saison** (janvier-mars) : les artisans sont plus disponibles et pratiquent des remises.\n3. **Grouper les travaux** : démoussage + traitement hydrofuge en une seule intervention = économie d'échafaudage.\n4. **Faire démousser en même temps que le voisin** : certains artisans proposent une remise « groupée ».\n5. **Entretien préventif** : un traitement anti-mousse préventif tous les 3-4 ans (200-400€) évite le démoussage complet (1 500-3 500€).\n6. **TVA réduite** : pour les logements de plus de 2 ans, la TVA est de 10% au lieu de 20% sur la main-d'œuvre."
      }
    ],
    tableData: [
      { label: "Type de traitement", values: ["Nettoyage HP", "Démoussage + anti-mousse", "Complet + hydrofuge", "Peinture de toit"] },
      { label: "Prix au m²", values: ["15-25€", "20-35€", "25-45€", "30-50€"] },
      { label: "Prix 100 m²", values: ["1 500-2 500€", "2 000-3 500€", "2 500-4 500€", "3 000-5 000€"] },
      { label: "Durabilité", values: ["2-3 ans", "3-5 ans", "8-12 ans", "10-15 ans"] },
    ],
    faq: [
      { question: "Le démoussage est-il rentable ?", answer: "Oui, un démoussage préventif (1 500-3 500€) prolonge la durée de vie de votre couverture de 10 à 15 ans. Sans entretien, une toiture peut nécessiter une réfection complète (8 000-15 000€). Le retour sur investissement est de 3 à 5 ans." },
      { question: "Quel est le meilleur rapport qualité-prix ?", answer: "Le démoussage complet avec hydrofuge (25-45€/m²) offre le meilleur rapport coût/durabilité : protection de 8 à 12 ans contre 2-3 ans pour un simple nettoyage. Sur 10 ans, il revient 40% moins cher qu'un nettoyage répété tous les 3 ans." },
    ]
  },
  {
    slug: "demoussage-vs-nettoyage-haute-pression",
    title: "Démoussage vs Nettoyage Haute Pression : Quelle Méthode Choisir ?",
    description: "Kärcher, traitement chimique ou brossage ? Comparatif des méthodes de nettoyage de toiture : prix, efficacité, risques et durabilité.",
    heroImage: "/images/guides/demoussage-vs-hp.svg",
    readTime: "11 min",
    sections: [
      {
        title: "Les 4 méthodes de nettoyage de toiture",
        content: "**1. Nettoyage haute pression (Kärcher)** : la méthode la plus rapide et la plus visible. Un jet d'eau à 80-150 bars décolle instantanément mousse, lichens et salissures. Résultat spectaculaire mais risque d'endommagement des tuiles fragiles. Prix : 15-25€/m².\n\n**2. Traitement chimique anti-mousse** : un produit (Algimouss, Dalep) est pulvérisé sur la toiture et agit progressivement grâce à la pluie. Résultat visible en 2-6 mois. Doux pour les tuiles mais plus lent. Prix : 10-20€/m².\n\n**3. Brossage manuel** : la méthode la plus douce. Un couvreur brosse manuellement chaque tuile. Aucun risque d'endommagement mais coûteux en main-d'œuvre. Adapté aux tuiles terre cuite et ardoises. Prix : 20-35€/m².\n\n**4. Combinaison nettoyage + anti-mousse + hydrofuge** : la méthode complète et la plus durable. Nettoyage mécanique adapté + traitement préventif + imperméabilisation. Protection 8-12 ans. Prix : 25-45€/m².",
        tip: "Pour les tuiles terre cuite et les ardoises, évitez absolument le nettoyage haute pression classique (100+ bars). Préférez un traitement chimique doux ou un brossage manuel. La haute pression n'est adaptée qu'aux tuiles béton et aux surfaces résistantes."
      },
      {
        title: "Comparatif détaillé",
        content: "**Efficacité immédiate** : Kärcher ★★★★★ | Chimique ★★☆☆☆ | Brossage ★★★★☆ | Combiné ★★★★★\n\n**Durabilité** : Kärcher ★★☆☆☆ (2-3 ans) | Chimique ★★★☆☆ (3-5 ans) | Brossage ★★☆☆☆ (2-3 ans) | Combiné ★★★★★ (8-12 ans)\n\n**Risque pour les tuiles** : Kärcher ★★★★☆ (élevé) | Chimique ★☆☆☆☆ (très faible) | Brossage ★☆☆☆☆ (nul) | Combiné ★★☆☆☆ (faible si adapté)\n\n**Sur 10 ans** : Kärcher = 3 interventions × 2 000€ = **6 000€** | Chimique = 2 interventions × 1 500€ = **3 000€** | Combiné = 1 intervention × 3 500€ = **3 500€**\n\nVainqueur sur 10 ans : le **traitement chimique seul** est le moins cher, mais le **combiné** offre la meilleure protection. Le Kärcher seul est le plus cher à long terme ET le plus risqué pour votre couverture.",
      }
    ],
    faq: [
      { question: "Le Kärcher abîme-t-il les tuiles ?", answer: "Oui, si la pression est trop forte (100+ bars) ou si l'angle de jet est mauvais. Le Kärcher peut casser, fissurer ou déplacer les tuiles, surtout les tuiles terre cuite, les ardoises et les tuiles anciennes. Un professionnel utilise une pression contrôlée (50-80 bars) et un angle adapté (45°)." },
    ]
  },
  {
    slug: "traitement-hydrofuge-toiture",
    title: "Traitement Hydrofuge Toiture : Prix, Durée et Efficacité",
    description: "Hydrofuge incolore ou coloré ? Prix de 8 à 22€/m², durée de protection de 8 à 12 ans. Guide complet du traitement imperméabilisant pour toiture.",
    heroImage: "/images/guides/hydrofuge-toiture.svg",
    readTime: "10 min",
    sections: [
      {
        title: "Qu'est-ce qu'un hydrofuge de toiture ?",
        content: "L'**hydrofuge** est un produit imperméabilisant appliqué sur les tuiles après le démoussage. Il crée une barrière invisible qui empêche l'eau de pénétrer tout en laissant la toiture respirer (perméabilité à la vapeur d'eau).\n\n**Hydrofuge incolore** (le plus courant) : ne modifie pas l'apparence de la toiture. Application invisible. Prix : 8-15€/m². Durée : 8-12 ans.\n\n**Hydrofuge coloré** : teinte les tuiles pour raviver leur couleur d'origine. Effet esthétique immédiat. Prix : 12-22€/m². Durée : 10-15 ans.\n\n**Hydrofuge filmogène** : crée un film en surface. Très efficace mais empêche la toiture de respirer. Risque de cloquage. Déconseillé par les professionnels.\n\n**Hydrofuge à effet perlant** : l'eau perle et glisse sur les tuiles (effet lotus). Le plus performant. Prix : 12-18€/m².\n\nL'hydrofuge se différencie de la peinture de toit : il est invisible ou transparent, ne modifie pas la texture et laisse respirer le support.",
        tip: "N'appliquez JAMAIS un hydrofuge sur une toiture non nettoyée ou encore humide. Le séchage complet après démoussage (2-4 semaines) est impératif. Un hydrofuge appliqué trop tôt emprisonne l'humidité et accélère la dégradation."
      },
      {
        title: "Quand appliquer un hydrofuge ?",
        content: "**Conditions idéales** :\n- Température : 10-25°C\n- Temps sec depuis 48h minimum\n- Pas de pluie prévue dans les 24h suivant l'application\n- Toiture parfaitement propre et sèche\n\n**Délai après démoussage** : attendez 2 à 4 semaines après le nettoyage pour que les tuiles sèchent complètement en profondeur.\n\n**Application** : par pulvérisation basse pression (airless), en 2 passes croisées. Consommation : 0,5 à 1 L/m² selon la porosité des tuiles.\n\n**Résultat** : l'effet perlant est visible immédiatement. La protection complète (anti-mousse préventive) est effective après 48h de séchage."
      }
    ],
    faq: [
      { question: "L'hydrofuge empêche-t-il la mousse de revenir ?", answer: "Pas totalement, mais il retarde considérablement la repousse. Un hydrofuge de qualité empêche l'eau de stagner dans les micro-porosités des tuiles, ce qui réduit le terrain favorable à la mousse. Sans hydrofuge, la mousse revient en 3-5 ans. Avec hydrofuge, comptez 8-12 ans avant un nouveau traitement." },
    ]
  },
  {
    slug: "quand-demousser-toiture",
    title: "Quand Démousser sa Toiture ? Le Calendrier Idéal par Région",
    description: "Printemps ou automne ? Le meilleur moment pour démousser votre toiture selon votre région, le climat et le type de couverture.",
    heroImage: "/images/guides/calendrier-demoussage.svg",
    readTime: "9 min",
    sections: [
      {
        title: "Les meilleures périodes par région",
        content: "**Nord et Est de la France** (climat continental/océanique) :\n- **Printemps** : avril-mai (après les gelées, avant les chaleurs)\n- **Automne** : septembre-octobre (avant les pluies hivernales)\n- Éviter : novembre à mars (gel, givre, pluie intense)\n\n**Ouest et façade Atlantique** (climat océanique) :\n- **Printemps** : mars-mai (la meilleure période, temps doux)\n- **Automne** : septembre-novembre\n- Éviter : décembre à février (pluie abondante)\n\n**Sud et Méditerranée** (climat méditerranéen) :\n- **Printemps** : mars-avril (avant les chaleurs)\n- **Automne** : octobre-novembre (la période idéale, temps sec modéré)\n- Éviter : juin à août (chaleur intense, produits moins efficaces)\n\n**Montagne** (climat montagnard) :\n- **Été** : juin-août (la seule fenêtre sans risque de gel)\n- Éviter : octobre à mai (neige, gel, accessibilité réduite)",
        tip: "Le meilleur moment pour appliquer un traitement anti-mousse est juste avant la saison des pluies : l'eau de pluie active et diffuse le produit sur toute la surface. En pratique, septembre-octobre est souvent la période optimale."
      },
      {
        title: "Signes qu'il est temps de démousser",
        content: "**Signes visuels** :\n- Mousse verte épaisse visible depuis le sol\n- Lichens gris-blanc sur les tuiles (crôutes)\n- Algues noires (taches sombres, surtout versant nord)\n- Tuiles qui changent de couleur (verdir = mousse, noircir = algues)\n\n**Signes d'urgence** :\n- Mousse qui soulève les tuiles ou pénètre sous la couverture\n- Tuiles fissurées par le gel (l'eau retenue par la mousse gèle)\n- Gouttières bouchées par des débris de mousse\n- Infiltrations d'eau au niveau des combles\n\n**Fréquence recommandée** :\n- Zone humide/ombragée : tous les 5-7 ans\n- Zone tempérée : tous les 7-10 ans\n- Zone sèche/ensoleillée : tous les 10-15 ans\n- Toiture avec hydrofuge : intervalle x1,5 à x2"
      }
    ],
    faq: [
      { question: "Peut-on démousser sa toiture en hiver ?", answer: "Non, c'est déconseillé. Le gel empêche les produits anti-mousse d'agir correctement, l'humidité permanente ralentit le séchage, et les tuiles mouillées/gelées sont glissantes (risque d'accident). De plus, les produits hydrofuges ne sèchent pas en dessous de 5°C. Attendez le printemps ou l'automne." },
    ]
  },
  {
    slug: "identifier-mousse-lichen-algues",
    title: "Mousse, Lichen, Algues : Identifier le Problème sur Votre Toit",
    description: "Mousse verte, lichen gris, algues noires : apprenez à identifier ce qui pousse sur votre toiture et le traitement adapté à chaque cas.",
    heroImage: "/images/guides/identifier-probleme.svg",
    readTime: "8 min",
    sections: [
      {
        title: "Les 3 types de végétation sur votre toit",
        content: "**La mousse** (verte, épaisse, spongieuse) :\nC'est le problème n°1 des toitures. La mousse forme des coussins verts épais qui retiennent l'eau et s'enracinent dans les micro-fissures des tuiles. Elle apparaît principalement sur les versants nord et les zones ombragées. Traitement : nettoyage mécanique + anti-mousse.\n\n**Le lichen** (gris-blanc ou jaune, croûteux) :\nLe lichen forme des plaques plates et dures, difficiles à retirer. Il est plus résistant que la mousse et nécessite un traitement chimique spécifique. Le lichen pénètre profondément dans la porosité des tuiles et peut les fragiliser à long terme. Traitement : anti-mousse concentré + brossage.\n\n**Les algues** (noires ou rouges, traces/salissures) :\nLes algues forment des traces noires ou rougeâtres, surtout en milieu humide et urbain. Elles n'endommagent pas directement les tuiles mais dégradent l'esthétique. Traitement : nettoyant spécifique ou anti-mousse multi-usage.",
        tip: "Ne confondez pas mousse et lichen. Le lichen est beaucoup plus tenace et nécessite un produit concentré (type Dalep 2100) avec un temps d'action de 3 à 6 mois. Le brossage seul ne suffit pas à éliminer le lichen."
      },
      {
        title: "Quel traitement pour quel problème ?",
        content: "**Mousse légère** (fine couche verte) : anti-mousse liquide pulvérisé + action de la pluie. Coût : 10-15€/m². Résultat en 1-3 mois.\n\n**Mousse épaisse** (coussins de mousse, 2-5 cm) : nettoyage mécanique (HP contrôlée ou brossage) + anti-mousse + hydrofuge. Coût : 25-40€/m². Résultat immédiat.\n\n**Lichen incrusté** : traitement chimique concentré (double dose) + attente 3-6 mois + brossage + hydrofuge. Coût : 30-45€/m². Traitement en deux phases.\n\n**Algues noires** : nettoyant algicide + rinçage basse pression. Coût : 15-25€/m². Résultat en 24-48h.\n\n**Problème mixte** (mousse + lichen + algues) : traitement complet en 2 passes avec nettoyage, anti-mousse polyvalent et hydrofuge. Coût : 30-50€/m²."
      }
    ],
    faq: [
      { question: "La mousse endommage-t-elle vraiment les tuiles ?", answer: "Oui. La mousse retient l'eau en permanence, ce qui accélère le cycle gel-dégel (fissuration des tuiles en hiver). Les racines de la mousse pénètrent dans les micro-fissures et les élargissent progressivement. Sur une toiture non traitée pendant 15-20 ans, la mousse peut rendre les tuiles poreuses et nécessiter leur remplacement." },
    ]
  },
  {
    slug: "demoussage-tuiles-terre-cuite-beton-ardoise",
    title: "Démoussage Tuiles Terre Cuite vs Béton vs Ardoise : Spécificités",
    description: "Chaque type de couverture nécessite un traitement adapté. Tuiles terre cuite, béton, ardoises : méthodes, prix et précautions.",
    heroImage: "/images/guides/types-couvertures.svg",
    readTime: "10 min",
    sections: [
      {
        title: "Tuiles terre cuite : le traitement le plus délicat",
        content: "La tuile terre cuite est la couverture la plus répandue en France (60% des toitures). Elle est aussi la plus sensible aux traitements agressifs.\n\n**Ce qui est interdit** : nettoyage haute pression classique (100+ bars). Le jet d'eau peut fissurer, déplacer ou éroder la surface de la tuile. Résultat : porosité accrue et dégradation accélérée.\n\n**Ce qui est recommandé** :\n- Traitement chimique doux (anti-mousse liquide) — action progressive\n- Brossage manuel doux avec brosse à poils souples\n- Nettoyage très basse pression (30-50 bars max) si nécessaire\n- Hydrofuge incolore après séchage complet\n\n**Prix** : 20-35€/m² en traitement complet\n\n**Fréquence** : tous les 7-10 ans en moyenne\n\nLes tuiles terre cuite de qualité (fabrication française) durent 50 à 100 ans avec un entretien régulier.",
        tip: "Vérifiez toujours l'âge de vos tuiles terre cuite avant le traitement. Les tuiles de plus de 50 ans sont particulièrement fragiles et ne supportent aucune pression mécanique. Optez pour un traitement 100% chimique (pulvérisation sans contact)."
      },
      {
        title: "Tuiles béton et ardoises : approches spécifiques",
        content: "**Tuiles béton** :\nPlus résistantes que la terre cuite, les tuiles béton supportent un nettoyage haute pression contrôlée (60-80 bars). Cependant, elles sont plus poreuses et se couvrent de mousse plus rapidement. L'hydrofuge est quasiment indispensable pour les tuiles béton.\n- Prix : 15-30€/m²\n- Fréquence : tous les 5-8 ans sans hydrofuge, 10-12 ans avec\n\n**Ardoises naturelles** :\nL'ardoise est un matériau noble mais fragile. Elle ne supporte aucune pression mécanique (ni Kärcher, ni brossage dur). Le traitement est exclusivement chimique : pulvérisation d'anti-mousse liquide, action de la pluie pendant 2-6 mois.\n- Prix : 25-40€/m²\n- Fréquence : tous les 8-12 ans\n- Attention : les ardoises cassées doivent être remplacées (50-100€ pièce posée)\n\n**Fibro-ciment** :\nDiagnostic amiante OBLIGATOIRE avant toute intervention. Si positif, seule une entreprise certifiée peut intervenir (coûts 3 à 5x supérieurs)."
      }
    ],
    faq: [
      { question: "Peut-on utiliser un Kärcher sur des tuiles terre cuite ?", answer: "Fortement déconseillé. Les tuiles terre cuite sont des matériaux poreux et relativement fragiles. Un Kärcher classique (100-150 bars) peut les fissurer, les rendre poreuses et accélérer leur vieillissement. Si un nettoyage mécanique est indispensable, utilisez un nettoyeur basse pression (30-50 bars max) avec une buse large et un angle de 45°." },
    ]
  },
  {
    slug: "demoussage-soi-meme-vs-professionnel",
    title: "Démoussage Toiture Soi-même vs Professionnel : Le Vrai Comparatif",
    description: "Faire son démoussage soi-même ou faire appel à un pro ? Coûts, risques, efficacité : le comparatif honnête pour faire le bon choix.",
    heroImage: "/images/guides/diy-vs-pro.svg",
    readTime: "9 min",
    sections: [
      {
        title: "Le vrai coût du démoussage soi-même",
        content: "**Matériel nécessaire** :\n- Anti-mousse 30L concentré : 60-120€\n- Pulvérisateur 16L : 40-80€\n- Échelle coulissante 2 plans : 150-300€\n- Harnais de sécurité + ligne de vie : 100-200€\n- Nettoyeur haute pression : 200-600€ (achat) ou 50-100€ (location/jour)\n- Hydrofuge 20L : 80-150€\n\n**Budget total matériel** : 630 à 1 450€\n\n**Temps de travail** : 2 à 4 jours complets (100 m²)\n\n**Risques** :\n- Chute de hauteur (première cause de mortalité dans le bâtiment)\n- Endommagement des tuiles (mauvaise technique)\n- Inefficacité du traitement (mauvais dosage, mauvaises conditions)\n- Pas de garantie sur le résultat\n\n**Démoussage professionnel** : 1 500 à 3 500€ pour 100 m². Garantie 5-10 ans. Assurance RC Pro. Résultat professionnel en 1-2 jours.",
        tip: "Le démoussage en hauteur est la première cause d'accidents domestiques mortels en France. Un professionnel dispose d'un échafaudage sécurisé, d'une assurance RC Pro et de l'habitude du travail en hauteur. Ne prenez aucun risque pour économiser 500-1 000€."
      },
      {
        title: "Quand le faire soi-même est envisageable",
        content: "Le démoussage DIY est envisageable uniquement si :\n\n1. **Toiture de plain-pied** accessible depuis le sol (maison de plain-pied avec gouttière basse)\n2. **Traitement préventif uniquement** : pulvérisation d'anti-mousse depuis le sol avec un pulvérisateur à rallonge (pas de montée sur le toit)\n3. **Mousse légère** : fine couche verte sans mousse épaisse\n4. **Vous avez le matériel de sécurité** : harnais, ligne de vie, chaussures antidérapantes\n\n**Ce qui reste au professionnel** :\n- Toute toiture haute (étage+) ou pentue (30°+)\n- Mousse épaisse nécessitant un nettoyage mécanique\n- Remplacement de tuiles cassées\n- Application d'hydrofuge (nécessite un pulvérisateur professionnel)\n- Toute intervention impliquant de marcher sur les tuiles\n\n**Notre recommandation** : le traitement préventif depuis le sol (anti-mousse pulvérisé) est la seule intervention DIY raisonnable. Tout le reste doit être confié à un professionnel couvreur."
      }
    ],
    faq: [
      { question: "L'assurance habitation couvre-t-elle un accident lors du démoussage DIY ?", answer: "La garantie accidents de la vie (GAV) peut couvrir les frais médicaux, mais la responsabilité civile est engagée si des tuiles tombent sur un voisin ou un passant. De plus, si vous endommagez votre toiture vous-même, l'assurance habitation ne couvrira pas les dégâts (exclusion des travaux réalisés par l'assuré sans qualification)." },
    ]
  },
  {
    slug: "frequence-demoussage-toiture",
    title: "Fréquence de Démoussage : Tous les Combien d'Années ?",
    description: "Tous les 5 ans ? 10 ans ? La bonne fréquence de démoussage de toiture selon le climat, le type de couverture et l'environnement.",
    heroImage: "/images/guides/frequence-demoussage.svg",
    readTime: "8 min",
    sections: [
      {
        title: "La bonne fréquence selon votre situation",
        content: "Il n'existe pas de fréquence universelle. Le rythme de démoussage dépend de 4 facteurs clés :\n\n**1. Le climat** :\n- Zone humide (Bretagne, Normandie, Nord) : tous les 4-6 ans\n- Zone tempérée (Centre, Île-de-France, Rhône-Alpes) : tous les 6-8 ans\n- Zone sèche (Méditerranée, Sud-Ouest) : tous les 8-12 ans\n\n**2. L'orientation du toit** :\n- Versant nord : mousse 2x plus rapide que le versant sud\n- Versant à l'ombre d'arbres : fréquence x1,5\n\n**3. Le type de couverture** :\n- Tuiles béton : tous les 5-8 ans (très poreux)\n- Tuiles terre cuite : tous les 7-10 ans\n- Ardoises : tous les 8-12 ans\n\n**4. Le dernier traitement** :\n- Sans hydrofuge : intervalle normal\n- Avec hydrofuge : intervalle x1,5 à x2\n- Avec peinture de toit : intervalle x2 à x2,5",
        tip: "Un simple coup d'œil annuel (depuis le sol, avec des jumelles) suffit à surveiller l'état de votre toiture. Si vous voyez apparaître une couche verte uniforme sur le versant nord, il est temps de programmer un démoussage."
      },
      {
        title: "Entretien préventif : la solution économique",
        content: "**Le traitement préventif** est la clé pour espacer les démoussages complets :\n\n**Anti-mousse préventif** : tous les 2-3 ans, un artisan pulvérise un anti-mousse liquide concentré sur votre toiture. Coût : 200-400€. Temps : 1 à 2 heures. Ce traitement empêche la mousse de s'installer durablement.\n\n**Nettoyage de gouttières** : au moins 1 fois par an (automne). Les gouttières bouchées par les mousses et feuilles provoquent des infiltrations au niveau des rives et du faîtage.\n\n**Inspection visuelle** : 1 fois par an, vérifiez depuis le sol : tuiles déplacées, faîtage abîmé, mousses naissantes.\n\n**Budget entretien annuel** : 100 à 200€/an (anti-mousse préventif + nettoyage gouttières). Ce budget annuel évite un démoussage complet (1 500 à 3 500€) tous les 5-7 ans.\n\n**Calcul sur 20 ans** :\n- Sans entretien : 3 démoussages × 2 500€ = **7 500€**\n- Avec entretien préventif : 1 démoussage × 2 500€ + 20 × 150€ = **5 500€**\n- Économie : **2 000€** sur 20 ans"
      }
    ],
    faq: [
      { question: "Un démoussage tous les 5 ans, est-ce trop souvent ?", answer: "En zone humide (Bretagne, Normandie), un démoussage tous les 5 ans peut être nécessaire, surtout sans hydrofuge. Cependant, un traitement préventif annuel (200-300€) peut doubler cet intervalle. Si vous devez démousser tous les 5 ans, investissez dans un hydrofuge lors du prochain traitement pour passer à 8-10 ans." },
    ]
  },
];

export function getAllGuides() {
  return guides;
}
