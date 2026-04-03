import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

const POPULAR_GUIDES = [
    { slug: "prix-demoussage-toiture-2026", title: "Prix démoussage 2026" },
    { slug: "demoussage-vs-nettoyage-haute-pression", title: "Kärcher vs traitement" },
    { slug: "traitement-hydrofuge-toiture", title: "Hydrofuge toiture" },
    { slug: "quand-demousser-toiture", title: "Quand démousser ?" },
    { slug: "identifier-mousse-lichen-algues", title: "Mousse, lichen, algues" },
    { slug: "demoussage-tuiles-terre-cuite-beton-ardoise", title: "Types de tuiles" },
    { slug: "demoussage-soi-meme-vs-professionnel", title: "DIY vs Pro" },
    { slug: "frequence-demoussage-toiture", title: "Fréquence démoussage" },
];

const TOP_CITIES = [
    { slug: "paris-75001", name: "Paris" },
    { slug: "lyon-69001", name: "Lyon" },
    { slug: "marseille-13001", name: "Marseille" },
    { slug: "toulouse-31000", name: "Toulouse" },
    { slug: "bordeaux-33000", name: "Bordeaux" },
    { slug: "nantes-44000", name: "Nantes" },
    { slug: "strasbourg-67000", name: "Strasbourg" },
    { slug: "lille-59000", name: "Lille" },
    { slug: "rennes-35000", name: "Rennes" },
    { slug: "montpellier-34000", name: "Montpellier" },
    { slug: "grenoble-38000", name: "Grenoble" },
    { slug: "nice-06000", name: "Nice" },
];

const BRANDS = [
    { slug: "technitoit", name: "Technitoit" },
    { slug: "preservation-du-patrimoine", name: "Préservation du Patrimoine" },
    { slug: "algimouss", name: "Algimouss" },
    { slug: "dalep", name: "Dalep" },
    { slug: "sikagard", name: "Sikagard" },
    { slug: "guard-industrie", name: "Guard Industrie" },
];

const POPULAR_DEPTS = [
    { code: "75", name: "Paris" },
    { code: "13", name: "Bouches-du-Rhône" },
    { code: "69", name: "Rhône" },
    { code: "33", name: "Gironde" },
    { code: "31", name: "Haute-Garonne" },
    { code: "59", name: "Nord" },
    { code: "44", name: "Loire-Atlantique" },
    { code: "34", name: "Hérault" },
    { code: "06", name: "Alpes-Maritimes" },
    { code: "67", name: "Bas-Rhin" },
    { code: "35", name: "Ille-et-Vilaine" },
    { code: "29", name: "Finistère" },
];

export function Footer() {
    return (
        <footer className="bg-stone-950 text-stone-400 border-t-2 border-blue-600">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top section — 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* Brand & Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Leaf className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-white font-bold font-heading text-base tracking-wider">
                                <span className="text-blue-400">Prix</span>Démoussage
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed max-w-sm mb-6">
                            Votre guide expert du démoussage et nettoyage de toiture en France. Tarifs au m², techniques, hydrofuge et devis gratuits dans plus de 35 000 communes.
                        </p>
                        <Link href="/devis" className="inline-flex items-center btn-cta text-xs gap-1">
                            DEVIS GRATUIT <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">Navigation</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">Accueil</Link></li>
                            <li><Link href="/guides" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">Guides &amp; Conseils</Link></li>
                            <li><Link href="/annuaire" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">Annuaire par Département</Link></li>
                            <li><Link href="/faq" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">FAQ</Link></li>
                            <li><Link href="/devis" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">Devis Gratuit</Link></li>
                            <li><Link href="/mentions-legales" className="text-stone-300 hover:text-blue-400 transition-colors text-sm">Mentions Légales</Link></li>
                        </ul>
                    </div>

                    {/* Popular Guides */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">Guides Populaires</h4>
                        <ul className="space-y-2">
                            {POPULAR_GUIDES.map(guide => (
                                <li key={guide.slug}>
                                    <Link href={`/guides/${guide.slug}`} className="text-stone-300 hover:text-blue-400 transition-colors text-sm">
                                        {guide.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brands */}
                    <div>
                        <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">Marques &amp; Réseaux</h4>
                        <ul className="space-y-2">
                            {BRANDS.map(brand => (
                                <li key={brand.slug}>
                                    <Link href={`/marques/${brand.slug}`} className="text-stone-300 hover:text-blue-400 transition-colors text-sm">
                                        {brand.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Middle section — Internal linking */}
                <div className="border-t border-stone-800 pt-8 mb-8">
                    <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">Démoussage toiture par ville</h4>
                    <div className="flex flex-wrap gap-2">
                        {TOP_CITIES.map(city => (
                            <Link
                                key={city.slug}
                                href={`/demoussage-toiture/${city.slug}`}
                                className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-blue-400 px-3 py-1.5 rounded border border-stone-700 hover:border-blue-500/50 transition-colors"
                            >
                                {city.name}
                            </Link>
                        ))}
                        <Link
                            href="/annuaire"
                            className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1.5 rounded border border-blue-600/30 transition-colors font-medium"
                        >
                            Toutes les villes →
                        </Link>
                    </div>

                    {/* Popular departments */}
                    <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mt-6 mb-3">Départements populaires</h4>
                    <div className="flex flex-wrap gap-2">
                        {POPULAR_DEPTS.map(dept => (
                            <Link
                                key={dept.code}
                                href={`/annuaire/${dept.code}`}
                                className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-blue-400 px-3 py-1.5 rounded border border-stone-700 hover:border-blue-500/50 transition-colors"
                            >
                                {dept.name} ({dept.code})
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom section — Copyright */}
                <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs">
                        © {new Date().getFullYear()} prix-demoussage-toiture.fr — Tous droits réservés. Guide indépendant.
                    </p>
                    <p className="text-[10px] text-stone-600 max-w-md text-center md:text-right">
                        Site d&apos;information sur les prix du démoussage de toiture. Les tarifs sont indicatifs et varient selon la surface, le type de couverture et l&apos;artisan.
                    </p>
                </div>
            </div>
        </footer>
    );
}
