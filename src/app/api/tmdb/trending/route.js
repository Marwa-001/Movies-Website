import { NextResponse } from "next/server";
import { getTrending } from "@/lib/tmdb-server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mediaType = searchParams.get("mediaType") || "movie";
  const timeWindow = searchParams.get("timeWindow") || "week";

  try {
    const items = await getTrending({ mediaType, timeWindow });
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[api/tmdb/trending] error:", err);
    return NextResponse.json({ items: [], error: err.message }, { status: 502 });
  }
}
