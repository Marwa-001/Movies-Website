import { NextResponse } from "next/server";
import { getMovieDetails } from "@/lib/tmdb-server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const movie = await getMovieDetails(id);
    return NextResponse.json({ movie });
  } catch (err) {
    console.error("[api/tmdb/movie/[id]] error:", err);
    return NextResponse.json({ movie: null, error: err.message }, { status: 502 });
  }
}
