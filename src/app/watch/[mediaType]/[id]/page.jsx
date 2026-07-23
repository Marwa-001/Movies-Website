"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTrailerKey, useSaveProgress, useContinueWatching } from "@/hooks/useWatchProgress";
import VideoPlayer from "@/app/components/VideoPlayer";

export default function WatchPage() {
  const { mediaType, id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Title/poster/backdrop are passed as query params by whatever card linked
  // here (MovieCard, ContinueWatching, etc.) so we don't need a second fetch.
  const title = searchParams.get("title") || "Untitled";
  const posterPath = searchParams.get("poster") || null;
  const backdropPath = searchParams.get("backdrop") || null;

  const { data: trailerKey, isLoading, isError } = useTrailerKey(mediaType, id);
  const { data: continueWatching } = useContinueWatching();
  const saveProgress = useSaveProgress();

  const existing = continueWatching?.find((c) => c.id === id && c.mediaType === mediaType);
  const initialTime = existing?.progressSeconds || 0;

  const latestProgress = useRef({ current: initialTime, duration: existing?.durationSeconds || 0 });

  const handleTimeUpdate = (currentTime, duration) => {
    latestProgress.current = { current: currentTime, duration };
    saveProgress.mutate({
      tmdbId: id,
      mediaType,
      title,
      posterPath,
      backdropPath,
      progressSeconds: currentTime,
      durationSeconds: duration,
    });
  };

  // Also flush progress on tab close
  useEffect(() => {
    const handleUnload = () => {
      const { current, duration } = latestProgress.current;
      if (!duration) return;
      navigator.sendBeacon(
        "/api/watch-progress",
        new Blob(
          [JSON.stringify({ tmdbId: id, mediaType, title, posterPath, backdropPath, progressSeconds: current, durationSeconds: duration })],
          { type: "application/json" }
        )
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mediaType]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white/60">
        Loading trailer...
      </div>
    );
  }

  if (isError || !trailerKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white/60">
        No trailer is available for this title yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <VideoPlayer
        title={title}
        youtubeId={trailerKey}
        thumbnail={backdropPath ? `https://image.tmdb.org/t/p/w300${backdropPath}` : null}
        initialTime={initialTime}
        onBack={() => router.back()}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}