import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import WatchProgress from "@/models/WatchProgress";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/jwt";
import { z } from "zod";

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? verifyToken(token) : null;
  return payload?.sub || null;
}

// GET: list this user's in-progress titles, most recently watched first.
// Excludes anything already finished (>= 95% watched).
export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }

  try {
    await connectDB();
    const docs = await WatchProgress.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean();

    const items = docs
      .filter((d) => !d.durationSeconds || d.progressSeconds / d.durationSeconds < 0.95)
      .map((d) => ({
        id: d.tmdbId,
        mediaType: d.mediaType,
        title: d.title,
        posterPath: d.posterPath,
        backdropPath: d.backdropPath,
        progressSeconds: d.progressSeconds,
        durationSeconds: d.durationSeconds,
        progressPercent: d.durationSeconds ? Math.round((d.progressSeconds / d.durationSeconds) * 100) : 0,
      }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("[watch-progress GET] error:", err);
    return NextResponse.json({ items: [], error: err.message }, { status: 500 });
  }
}

const saveSchema = z.object({
  tmdbId: z.string().min(1),
  mediaType: z.enum(["movie", "tv"]).default("movie"),
  title: z.string().min(1),
  posterPath: z.string().nullable().optional(),
  backdropPath: z.string().nullable().optional(),
  progressSeconds: z.number().min(0),
  durationSeconds: z.number().min(0),
});

// POST: upsert progress for the current user + title.
export async function POST(request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  try {
    await connectDB();
    const { tmdbId, mediaType, ...rest } = parsed.data;

    await WatchProgress.findOneAndUpdate(
      { user: userId, tmdbId, mediaType },
      { $set: { ...rest, tmdbId, mediaType, user: userId } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[watch-progress POST] error:", err);
    return NextResponse.json({ message: "Failed to save progress" }, { status: 500 });
  }
}