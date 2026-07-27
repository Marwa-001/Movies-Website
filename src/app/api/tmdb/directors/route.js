import { NextResponse } from "next/server";
import { getPopularDirectors } from "@/lib/tmdb-server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;

  try {
    const items = await getPopularDirectors({ page });
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[api/tmdb/directors] error:", err);
    return NextResponse.json({ items: [], error: err.message }, { status: 502 });
  }
}