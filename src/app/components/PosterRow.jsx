"use client";

import { ArrowRight } from 'lucide-react';
import MovieCard from "./MovieCard";

export default function PosterRow({ heading, items, onAdd, onSeeMore, filters, linkBase }) {
  return (
    <section className="py-16 px-6 lg:px-12">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-5xl font-bold tracking-tight text-[var(--text-primary)]">{heading}</h2>
        <button
          type="button"
          onClick={onSeeMore}
          className="group flex items-center gap-1 text-[18px] font-semibold text-[#228EE5] transition-colors hover:text-blue-400"
        >
          See More
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      {filters && <div className="mb-8">{filters}</div>}
      
      {/* Added 'items-start' to prevent the first image from dictating the row height */}
      <div className="no-scrollbar flex items-start gap-6 overflow-x-auto pb-2">
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
    </section>
  );
}