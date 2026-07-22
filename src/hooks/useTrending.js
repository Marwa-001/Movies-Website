"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTrending } from "@/services/tmdb";

export function useTrending({ mediaType = "movie", timeWindow = "week" } = {}) {
  return useQuery({
    queryKey: ["trending", mediaType, timeWindow],
    queryFn: () => fetchTrending({ mediaType, timeWindow }),
    staleTime: 1000 * 60 * 10, // trending list doesn't change every minute
  });
}
