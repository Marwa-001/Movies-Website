"use client";

import PosterRow from "./PosterRow";
import PosterRowSkeleton from "./PosterRowSkeleton";
import { useTrending } from "@/hooks/useTrending";

export default function Trends({ onAdd, onSeeMore }) {
  const { data: items, isLoading } = useTrending({ mediaType: "movie", timeWindow: "week" });

  if (isLoading) return <PosterRowSkeleton heading="Trends" />;

  return <PosterRow heading="Trends" items={items || []} onAdd={onAdd} onSeeMore={onSeeMore} linkBase="/movies" />;
}
