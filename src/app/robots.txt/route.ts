import { NextResponse } from "next/server";

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.prix-demoussage-toiture.fr/sitemap.xml
`;

  return new NextResponse(robots.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
}
