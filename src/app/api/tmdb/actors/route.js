import { NextResponse } from "next/server";
import { getPopularActors } from "@/lib/tmdb-server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;

  try {
    const items = await getPopularActors({ page });
    return NextResponse.json({ items });
  } catch (err) {
    console.error("[api/tmdb/actors] error:", err);
    return NextResponse.json({ items: [], error: err.message }, { status: 502 });
  }
}
