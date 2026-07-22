import { getThematicCollection } from "../../../../lib/tmdb-server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get("theme");
  const type = searchParams.get("type") || "movie"; // "movie" or "series"
  
  try {
    const data = await getThematicCollection(theme, type);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to fetch collection" }, { status: 500 });
  }
}