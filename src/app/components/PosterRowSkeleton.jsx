"use client";

export default function PosterRowSkeleton({ heading, count = 6 }) {
  return (
    <section className="py-16 px-12 lg:px-24">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-5xl font-bold tracking-tight text-white">{heading}</h2>
      </div>
      <div className="no-scrollbar flex items-start gap-6 overflow-x-auto pb-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-[208px] h-[296px] flex-shrink-0 rounded-[24px] border border-white/10 bg-white/5 animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
