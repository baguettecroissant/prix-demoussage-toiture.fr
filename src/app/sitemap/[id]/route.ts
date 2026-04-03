import { NextResponse } from "next/server";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";
import { getAllGuides } from "@/data/guides";
import { getAllBrands } from "@/data/brands";

const cities = citiesData as City[];
const BASE = "https://www.prix-demoussage-toiture.fr";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;

  if (id === "static") {
    return staticSitemap();
  }

  // Department-based sitemap
  const deptCities = cities.filter(c => c.department_code === id);
  if (deptCities.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const urls = [
    `<url><loc>${BASE}/annuaire/${id}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    ...deptCities.map(c =>
      `<url><loc>${BASE}/demoussage-toiture/${c.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}

function staticSitemap() {
  const guides = getAllGuides();
  const brands = getAllBrands();

  const urls = [
    `<url><loc>${BASE}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${BASE}/devis</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`,
    `<url><loc>${BASE}/guides</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${BASE}/marques</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${BASE}/annuaire</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `<url><loc>${BASE}/faq</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
    `<url><loc>${BASE}/mentions-legales</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
    ...guides.map(g => `<url><loc>${BASE}/guides/${g.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
    ...brands.map(b => `<url><loc>${BASE}/marques/${b.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
