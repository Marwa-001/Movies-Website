"use client";

import { useQuery } from "@tanstack/react-query";

async function getJson(url) {
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export function usePopularDirectors({ page = 1 } = {}) {
  return useQuery({
    queryKey: ["popular-directors", page],
    queryFn: () => getJson(`/api/tmdb/directors?page=${page}`).then((d) => d.items || []),
    staleTime: 1000 * 60 * 10,
  });
}