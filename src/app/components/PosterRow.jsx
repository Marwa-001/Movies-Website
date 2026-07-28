"use client";

import { ArrowRight } from 'lucide-react';
import MovieCard from "./MovieCard";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PosterRow({ heading, items, onAdd, onSeeMore, filters, linkBase }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to check scroll position
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // scrollLeft > 0 means we can go back
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      // Check initial state
      checkScroll();

      // Add event listener
      scrollContainer.addEventListener("scroll", checkScroll);
      // Re-check on window resize (in case the container width changes)
      window.addEventListener("resize", checkScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [items]);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <section className="py-8 md:py-16 px-4 md:px-12">
      <div className="mb-6 md:mb-10 flex items-center justify-between">
        <h2 className="text-[20px] md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          {heading}
        </h2>

        <button
          type="button"
          onClick={onSeeMore}
          className="group flex items-center gap-1 text-[16px] md:text-[18px] font-medium md:font-semibold text-[#228EE5] transition-colors hover:text-blue-400"
        >
          See More
          <ArrowRight className="w-[10px] h-[12px] md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {filters && <div className="mb-8">{filters}</div>}

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Scroll genres left"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          className={`hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all 
          ${!canScrollLeft ? "opacity-20 cursor-not-allowed" : "hover:text-[var(--text-primary)]"}`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div ref={scrollRef} className="no-scrollbar flex items-start gap-4 md:gap-6 overflow-x-auto pb-4">
          {items?.map((item, index) => (
            <MovieCard
              key={item.id}
              {...item}
              onAdd={onAdd}
              priority={index < 6}
              href={linkBase ? `${linkBase}/${item.id}` : undefined}
            />
          ))}
        </div>
          <button
            type="button"
            aria-label="Scroll genres right"
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            className={`hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-all 
          ${!canScrollRight ? "opacity-20 cursor-not-allowed" : "hover:text-[var(--text-primary)]"}`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
      </div>
    </section>
  );
}