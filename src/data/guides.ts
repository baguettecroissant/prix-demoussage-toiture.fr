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

export interface GuideSection {
  title: string;
  content: string;
  tip?: string;
}

export interface TableRow {
  label: string;
  values: string[];
}

import { guidePrix2026 } from "./guides-content/prix-2026";
import { guideMethodes } from "./guides-content/demoussage-methodes";
import { guideHydrofuge } from "./guides-content/hydrofuge-toiture";
import { guideCalendrier } from "./guides-content/quand-demousser";
import { guideIdentifier } from "./guides-content/identifier-probleme";
import { guideTypes } from "./guides-content/types-couvertures";
import { guideDIY } from "./guides-content/diy-vs-pro";
import { guideFrequence } from "./guides-content/frequence-entretien";

export const guides: Guide[] = [
  guidePrix2026,
  guideMethodes,
  guideHydrofuge,
  guideCalendrier,
  guideIdentifier,
  guideTypes,
  guideDIY,
  guideFrequence
];

export function getAllGuides() {
  return guides;
}
