"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GenreFilter({ genres, activeGenres, onToggle }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        type="button"
        aria-label="Scroll genres left"
        onClick={() => scrollBy(-1)}
        className="hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div 
        ref={scrollRef} 
        className="no-scrollbar flex gap-[10px] overflow-x-auto scroll-smooth py-1"
      >
        {genres.map((genre) => {
          const isActive = activeGenres.includes(genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onToggle(genre)}
              aria-pressed={isActive}
              className={`
                flex-shrink-0 whitespace-nowrap font-medium transition-all duration-200 flex items-center justify-center
                /* Mobile Styles: 21px height, 15px radius, 4px/8px padding */
                h-[21px] px-2 text-[10px] rounded-[15px] 
                /* Desktop Styles: 41px height, 25px radius, 12px/28px padding */
                md:h-[41px] md:px-7 md:text-base md:rounded-[25px] md:border-[0.5px]
                ${
                  isActive 
                    ? "bg-[#EC5BAA] text-white border-[#EC5BAA]" 
                    : "bg-transparent text-[var(--text-primary)] border-[#EC5BAA] border-[0.5px] md:border-[0.5px] hover:bg-[#EC5BAA]/10"
                }
              `}
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
        className="hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}