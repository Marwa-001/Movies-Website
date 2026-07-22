"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/services/tmdb";

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
