import { NextResponse } from "next/server";
import { getSeriesByGenres } from "@/lib/tmdb-server";
import { TV_GENRE_IDS } from "@/lib/tmdb-genres";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genresParam = searchParams.get("genres") || "";
  const page = Number(searchParams.get("page")) || 1;
  const year = searchParams.get("year") || undefined;
  const query = searchParams.get("query") || undefined;

  const genreNames = genresParam.split(",").map((g) => g.trim()).filter(Boolean);
  const genreIds = genreNames.map((name) => TV_GENRE_IDS[name]).filter(Boolean);

  try {
    const items = await getSeriesByGenres({ genreIds, page, year, query });
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[api/tmdb/series] error:", err);
    return NextResponse.json({ items: [], error: err.message }, { status: 502 });
  }
}
