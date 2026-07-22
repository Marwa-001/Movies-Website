"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularActors } from "@/services/tmdb";

export function usePopularActors({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["popular-actors", page],
    queryFn: () => fetchPopularActors({ page }),
    staleTime: 1000 * 60 * 10,
  });
}
