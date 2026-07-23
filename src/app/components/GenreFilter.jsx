"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GenreFilter({ genres, activeGenres, onToggle }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Scroll genres left"
        onClick={() => scrollBy(-1)}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div ref={scrollRef} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth">
        {genres.map((genre) => {
          const isActive = activeGenres.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onToggle(genre)}
              aria-pressed={isActive}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive ? "bg-[#E5228E] text-white" : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-strong)]"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Scroll genres right"
        onClick={() => scrollBy(1)}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}