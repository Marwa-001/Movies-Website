"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSeriesByGenres } from "@/services/tmdb";

export function useSeries({ genres = [], page = 1, year, query } = {}) {
  return useQuery({
    queryKey: ["series", genres, page, year, query],
    queryFn: () => fetchSeriesByGenres({ genres, page, year, query }),
    staleTime: 1000 * 60 * 5,
  });
}
