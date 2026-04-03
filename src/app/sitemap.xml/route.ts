import { NextResponse } from "next/server";
import citiesData from "@/data/cities.json";
import { type City } from "@/types";

const cities = citiesData as City[];

export async function GET() {
  const BASE = "https://www.prix-demoussage-toiture.fr";

  // Get unique department codes
  const deptCodes = [...new Set(cities.map(c => c.department_code))].sort();

  const sitemaps = [
    `<sitemap><loc>${BASE}/sitemap/static</loc></sitemap>`,
    ...deptCodes.map(code => `<sitemap><loc>${BASE}/sitemap/${code}</loc></sitemap>`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
