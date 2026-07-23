"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSeriesDetails } from "@/services/tmdb";

export function useSeriesDetails(id) {
  return useQuery({
    queryKey: ["series-details", id],
    queryFn: () => fetchSeriesDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}