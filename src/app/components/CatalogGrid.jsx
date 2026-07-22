"use client";

import MovieCard from "./MovieCard";

export default function CatalogGrid({ items, onAdd, linkBase }) {
  if (!items?.length) {
    return <p className="text-white/50 py-16 text-center">No titles found. Try a different search or filters.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 justify-items-center">
      {items.map((item, index) => (
        <MovieCard
          key={item.id}
          {...item}
          onAdd={onAdd}
          priority={index < 10}
          href={linkBase ? `${linkBase}/${item.id}` : undefined}
        />
      ))}
    </div>
  );
}
