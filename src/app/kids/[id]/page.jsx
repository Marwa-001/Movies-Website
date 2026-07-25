"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Bookmark, ThumbsUp, ThumbsDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PosterRow from "../../components/PosterRow";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useAuthStore } from "@/store/useAuthStore";

function StarRating({ rating = 0 }) {
  const stars = rating / 2;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, stars - i)) * 100;
        return (
          <div key={i} className="relative w-4 h-4">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                WebkitMaskImage: "url(/assets/star.png)",
                maskImage: "url(/assets/star.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#E5DB22D6",
                WebkitMaskImage: "url(/assets/star.png)",
                maskImage: "url(/assets/star.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                clipPath: `inset(0 ${100 - fill}% 0 0)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// Static placeholder comments — swap for a real comments API when available.
const placeholderComments = [
  { id: "c1", name: "Noah2145" },
  { id: "c2", name: "William" },
  { id: "c3", name: "Arashzarei109" },
  { id: "c4", name: "Arashzarei109" },
  { id: "c5", name: "Arashzarei109" },
];

export default function KidsTitleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: movie, isLoading, isError } = useMovieDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
        <p className="text-[var(--text-secondary)]">Loading...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
        <p className="text-[var(--text-secondary)]">Couldn&apos;t load this title.</p>
      </div>
    );
  }

  const handleLoginAndWatch = () => {
    if (isAuthenticated) {
      const params = new URLSearchParams({
        title: movie.title,
        poster: movie.posterPath || "",
        backdrop: movie.backdropPath || "",
      });
      router.push(`/watch/movie/${movie.id}?${params.toString()}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[420px] md:h-[520px] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-8 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={movie.backdropUrl} alt={movie.title} fill priority className="object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)]/80 md:from-[var(--bg-page)]/70 via-transparent to-transparent" />
        </div>

        <Navbar />

        <div className="relative z-10 max-w-xl flex items-end justify-between gap-6">
          <div>
            <h1 className="text-[32px] md:text-5xl font-bold tracking-tight mb-2 drop-shadow-2xl">
              {movie.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-2">
              {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
              {movie.year && (
                <>
                  <span className="opacity-40">-</span>
                  <span>{movie.year}</span>
                </>
              )}
              {movie.country && (
                <>
                  <span className="opacity-40">-</span>
                  <span>{movie.country}</span>
                </>
              )}
            </div>
            <StarRating rating={movie.voteAverage} />
          </div>

          <button
            type="button"
            onClick={handleLoginAndWatch}
            className="hidden md:block bg-[#228EE5] hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
          >
            {isAuthenticated ? "Watch Now" : "Login And whatch"}
          </button>
        </div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 -mt-2 md:-mt-4 relative z-10 space-y-8 md:space-y-10 pb-16">
        {/* Genre pills + action icons + mobile watch button */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {movie.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold bg-[#E5228E] text-white"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Bookmark"
              className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Like"
              className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Dislike"
              className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--text-primary)] hover:bg-white/10 transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleLoginAndWatch}
            className="md:hidden w-full bg-[#228EE5] hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all active:scale-95"
          >
            {isAuthenticated ? "Watch Now" : "Login And whatch"}
          </button>
        </div>

        {/* About */}
        {movie.overview && (
          <section>
            <h3 className="text-xl md:text-2xl font-bold mb-3">About {movie.title}</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-3xl text-sm md:text-base">
              {movie.overview}
            </p>
          </section>
        )}
      </div>

      {/* Suggestion */}
      {movie.recommendations.length > 0 && (
        <PosterRow
          heading="Suggestion"
          items={movie.recommendations}
          onAdd={(itemId) => console.log("Add to kids list:", itemId)}
          onSeeMore={() => {}}
          linkBase="/kids"
        />
      )}

      {/* Comments */}
      <section className="px-6 md:px-12 lg:px-24 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold">Comments</h3>
          <button type="button" className="text-sm font-semibold text-[#228EE5] hover:text-blue-400">
            See More
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {placeholderComments.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2"
            >
              <div className="w-6 h-6 rounded-full bg-[#228EE5]/30 flex items-center justify-center text-[10px] font-semibold">
                {c.name[0].toUpperCase()}
              </div>
              <span className="text-xs text-[var(--text-secondary)]">that was perfect</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}