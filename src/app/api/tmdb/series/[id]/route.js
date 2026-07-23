import { NextResponse } from "next/server";
import { getSeriesDetails } from "@/lib/tmdb-server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const series = await getSeriesDetails(id);
    return NextResponse.json({ series });
  } catch (err) {
    console.error("[api/tmdb/series/[id]] error:", err);
    return NextResponse.json({ series: null, error: err.message }, { status: 502 });
  }
}