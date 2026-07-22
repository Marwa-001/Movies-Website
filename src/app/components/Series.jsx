"use client";

import { useState } from "react";
import PosterRow from "./PosterRow";
import PosterRowSkeleton from "./PosterRowSkeleton";
import GenreFilter from "./GenreFilter";
import { useSeries } from "@/hooks/useSeries";

export default function Series({ genres, onAdd, onSeeMore }) {
  const [activeGenres, setActiveGenres] = useState(["Action", "Adventure", "Fantasy", "Thriller"]); // Matching original default active states

  const toggleGenre = (genre) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const { data: items, isLoading } = useSeries({ genres: activeGenres });

  if (isLoading) {
    return (
      <div className="bg-[#050514]">
        <PosterRowSkeleton heading="Series" />
      </div>
    );
  }

  return (
    <div className="bg-[#050514]"> {/* Deep navy/black background matching the screenshot */}
      <PosterRow
        heading="Series"
        items={items || []}
        onAdd={onAdd}
        onSeeMore={onSeeMore}
        filters={
          <GenreFilter
            genres={genres}
            activeGenres={activeGenres}
            onToggle={toggleGenre}
          />
        }
      />
    </div>
  );
}
