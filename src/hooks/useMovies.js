"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenres } from "@/services/tmdb";

/**
 * useMovies
 * Refetches automatically whenever `genres`, `year`, or `query` change,
 * since they're all part of the query key. `query` is used for the
 * Advance Search text box; when present it takes priority over genre/year
 * filtering (TMDB's /search endpoint doesn't support combining the two).
 */
export function useMovies({ genres = [], page = 1, year, query } = {}) {
  return useQuery({
    queryKey: ["movies", genres, page, year, query],
    queryFn: () => fetchMoviesByGenres({ genres, page, year, query }),
    staleTime: 1000 * 60 * 5,
  });
}
