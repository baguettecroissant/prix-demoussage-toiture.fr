"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
                <Link
                    href="/devis"
                    className="flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm"
                >
                    <span>Devis Démoussage Gratuit</span>
                    <ArrowRight className="h-4 w-4 animate-pulse" />
                </Link>
            </div>
        </div>
    );
}
