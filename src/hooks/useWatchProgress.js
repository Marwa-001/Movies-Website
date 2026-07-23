"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function getJson(url) {
  const res = await fetch(url, { credentials: "include" });
  return res.json();
}

export function useContinueWatching() {
  return useQuery({
    queryKey: ["watch-progress"],
    queryFn: () => getJson("/api/watch-progress"),
    select: (data) => data.items || [],
    staleTime: 1000 * 30,
  });
}

export function useTrailerKey(mediaType, id) {
  return useQuery({
    queryKey: ["trailer", mediaType, id],
    queryFn: () => getJson(`/api/tmdb/video/${mediaType}/${id}`),
    select: (data) => data.key || null,
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
}

export function useSaveProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) =>
      fetch("/api/watch-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch-progress"] });
    },
  });
}