"use client";

export default function CatalogGridSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 justify-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[208px] h-[296px] rounded-[24px] border border-white/10 bg-white/5 animate-pulse"
        />
      ))}
    </div>
  );
}
