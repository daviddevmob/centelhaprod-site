import { NextResponse } from "next/server";

export async function GET() {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "SUA_CHAVE_RAPIDAPI";

  if (RAPIDAPI_KEY === "SUA_CHAVE_RAPIDAPI") {
    console.warn("⚠️ RAPIDAPI_KEY não configurada. Defina no .env.local");
    return NextResponse.json({ links: [] });
  }

  try {
    const res = await fetch(
      "https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=centelhaprod",
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com"
        },
        next: { revalidate: 86400 } // 24h cache
      }
    );

    if (!res.ok) {
      console.error("RapidAPI error:", res.status, await res.text());
      return NextResponse.json({ links: [] });
    }

    const data = await res.json();
    const items = data?.data?.items || [];

    const postUrls = items.slice(0, 6).map((item: any) => {
      const code = item.code || item.shortcode || item.pk || "";
      return `https://www.instagram.com/p/${code}/`;
    }).filter((url: string) => url.endsWith("/p//") === false);

    return NextResponse.json({ links: postUrls });
  } catch (error) {
    console.error("Erro ao buscar links do Instagram:", error);
    return NextResponse.json({ links: [] });
  }
}
