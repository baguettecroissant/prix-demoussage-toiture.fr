"use client";

import { useEffect, useRef } from "react";

export function ViteUnDevisWidget() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Avoid double injection
        if (containerRef.current && containerRef.current.querySelector("script")) {
            return;
        }

        // Global variables expected by the ViteUnDevis script
        const w = window as any;
        w.vud_partenaire_id = '2353';
        w.vud_categorie_id = '81';

        // Create & inject script
        const vud_js = document.createElement('script');
        vud_js.type = 'text/javascript';
        vud_js.async = true;
        vud_js.src = '//www.viteundevis.com/d3bb248cd3/' + w.vud_partenaire_id + '/' + w.vud_categorie_id + '/';

        if (containerRef.current) {
            containerRef.current.appendChild(vud_js);
        }
    }, []);

    return (
        <div className="bg-white p-4 rounded-2xl border border-blue-200/50">
            <div id="vd3bb248cd3d" className="min-h-[400px] flex items-center justify-center text-stone-400">
                <span ref={containerRef}>
                    {/* ViteUnDevis widget dédié — Partner ID 2353, Catégorie 81 (Démoussage toiture) */}
                </span>
            </div>
            <p className="text-center text-xs text-stone-400 mt-2">
                Service gratuit et sans engagement
            </p>
        </div>
    );
}
