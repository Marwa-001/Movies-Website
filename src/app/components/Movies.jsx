"use client";

import { useState } from "react";
import PosterRow from "./PosterRow";
import PosterRowSkeleton from "./PosterRowSkeleton";
import GenreFilter from "./GenreFilter";
import { useMovies } from "@/hooks/useMovies";

export default function Movies({ genres, onAdd, onSeeMore }) {
  const [activeGenres, setActiveGenres] = useState([]);

  const toggleGenre = (genre) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const { data: items, isLoading, isError } = useMovies({ genres: activeGenres });

  if (isLoading) return <PosterRowSkeleton heading="Movies" />;

  return (
    <PosterRow
      heading="Movies"
      items={items || []}
      onAdd={onAdd}
      onSeeMore={onSeeMore}
      linkBase="/movies"
      filters={<GenreFilter genres={genres} activeGenres={activeGenres} onToggle={toggleGenre} />}
    />
  );
  // Note: `isError` is intentionally not blocking render — PosterRow just
  // renders an empty row if the TMDB request fails, keeping the layout stable.
}
