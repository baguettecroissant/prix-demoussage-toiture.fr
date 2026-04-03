"use client";
import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";

const NAV_LINKS = [
    { href: "/guides", label: "Guides" },
    { href: "/marques", label: "Marques" },
    { href: "/annuaire", label: "Annuaire" },
    { href: "/faq", label: "FAQ" },
];

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-stone-950 text-white border-b-2 border-blue-600 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-bold font-heading tracking-wider group-hover:text-blue-400 transition-colors">
                            Démoussage Toiture
                        </span>
                        <span className="text-[10px] text-stone-400 tracking-widest uppercase">
                            Prix &amp; Professionnels 2026
                        </span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1 text-sm">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link key={href} href={href} className="text-stone-300 hover:text-blue-400 transition-colors font-medium uppercase tracking-wider text-xs px-3 py-2 rounded hover:bg-stone-800/50">
                            {label}
                        </Link>
                    ))}
                    <Link href="/devis" className="bg-red-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs py-2 px-5 rounded-full transition-all duration-500 hover:scale-105 ml-2">
                        Devis Gratuit
                    </Link>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg hover:bg-stone-800 transition-colors"
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile slide-out */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <nav className="flex flex-col gap-1 px-4 pb-4 border-t border-stone-800 pt-3">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="text-stone-300 hover:text-blue-400 transition-colors font-medium uppercase tracking-wider text-sm px-3 py-3 rounded hover:bg-stone-800/50"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/devis"
                        onClick={() => setOpen(false)}
                        className="bg-red-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-sm py-3 px-5 rounded-full transition-all duration-500 text-center mt-2"
                    >
                        Devis Gratuit
                    </Link>
                </nav>
            </div>
        </header>
    );
}
