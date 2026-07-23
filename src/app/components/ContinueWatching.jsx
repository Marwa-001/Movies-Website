"use client";

import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContinueWatching } from "@/hooks/useWatchProgress";
import { getTmdbImageUrl } from "@/lib/tmdb-image";

export function ContinueWatching() {
  const router = useRouter();
  const { data: items, isLoading } = useContinueWatching();

  if (isLoading) {
    return (
      <section className="py-8 px-12 lg:px-24 bg-[var(--bg-page)]">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Continue watching</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl bg-[var(--bg-surface)] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!items?.length) return null; // nothing watched yet — don't show an empty row

  const goToWatch = (item) => {
    const params = new URLSearchParams({
      title: item.title,
      poster: item.posterPath || "",
      backdrop: item.backdropPath || "",
    });
    router.push(`/watch/${item.mediaType}/${item.id}?${params.toString()}`);
  };

  return (
    <section className="py-8 px-12 lg:px-24 bg-[var(--bg-page)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Continue watching</h2>
        <button className="flex items-center gap-1 text-[#228EE5] hover:text-blue-400 font-medium transition-colors">
          See More <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={`${item.mediaType}-${item.id}`}
            onClick={() => goToWatch(item)}
            className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-2xl bg-[var(--bg-surface)]"
          >
            <Image
              src={getTmdbImageUrl(item.backdropPath, "w780") || getTmdbImageUrl(item.posterPath, "w500")}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#E5228E] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1 w-5 h-5" />
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-white font-medium drop-shadow-md">{item.title}</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
              <div
                className="h-full bg-[#E5228E] transition-all duration-300"
                style={{ width: `${item.progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#E5228E] rounded-full shadow-[0_0_8px_#E5228E]"
                style={{ left: `calc(${item.progressPercent}% - 4px)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}