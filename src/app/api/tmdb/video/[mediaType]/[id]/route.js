import { NextResponse } from "next/server";
import { getVideoKey } from "@/lib/tmdb-server";

export async function GET(request, { params }) {
  const { mediaType, id } = await params;

  try {
    const key = await getVideoKey(id, mediaType);
    if (!key) {
      return NextResponse.json({ key: null, error: "No trailer available" }, { status: 404 });
    }
    return NextResponse.json({ key });
  } catch (err) {
    console.error("[api/tmdb/video] error:", err);
    return NextResponse.json({ key: null, error: err.message }, { status: 502 });
  }
}