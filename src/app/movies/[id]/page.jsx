"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Bookmark, ThumbsUp, ThumbsDown } from "lucide-react";
import Navbar from "../../components/Navbar";
import PosterRow from "../../components/PosterRow";
import Footer from "../../components/Footer";
import { useMovieDetails } from "@/hooks/useMovieDetails";

function StarRating({ rating = 0 }) {
  // rating comes in on TMDB's 0-10 scale; render as 5 stars.
  const stars = rating / 2;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, stars - i)) * 100;
        return (
          <div key={i} className="relative w-4 h-4 md:w-5 md:h-5">
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

// Static placeholder comments — no comments backend exists yet, this just
// mirrors the design. Swap for real data once a comments API is added.
const placeholderComments = [
  { id: "c1", name: "Noah2145" },
  { id: "c2", name: "William" },
  { id: "c3", name: "Arashzarei109" },
  { id: "c4", name: "Arashzarei109" },
  { id: "c5", name: "Arashzarei109" },
];

// Section headings ("Genres", "Characters", "Director", "Comments", "Suggestion like ...")
// Lato 700 / 48px / 100% line-height / 0 tracking, per spec — scaled down on mobile.
const sectionHeadingClass =
  "font-bold theme-text-primary mb-4 md:mb-6 text-2xl md:text-[48px] leading-none tracking-normal";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetails(id);
  const router = useRouter();

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
        <p className="text-[var(--text-secondary)]">Couldn&apos;t load this title. It may not exist.</p>
      </div>
    );
  }

  const goToWatch = () => {
    const params = new URLSearchParams({
      title: movie.title,
      poster: movie.posterPath || "",
      backdrop: movie.backdropPath || "",
    });
    router.push(`/watch/movie/${movie.id}?${params.toString()}`);
  };

  return (
    <>
      <section className="relative pt-28 md:pt-40 pb-24 md:pb-8 px-6 md:px-12 bg-[var(--bg-page)] text-[var(--text-primary)]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${movie.backdropUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/20 md:via-[var(--bg-page)]/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent" />
        </div>

        <Navbar />

        <div className="relative z-10 mt-32 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <h1
              className="text-[40px] md:text-[72px] font-bold theme-text-primary mb-3 leading-none tracking-normal drop-shadow-2xl"
            >
              {movie.title}
            </h1>

            <div className="flex items-center gap-2 text-[14px] md:text-[24px] font-medium leading-none theme-text-secondary mb-3">
              <span className="align-middle">{movie.isAdult ? "18+" : "PG"}</span>
              {movie.runtime ? (
                <>
                  <span className="opacity-40">•</span>
                  <span className="align-middle">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </>
              ) : null}
              {movie.year && (
                <>
                  <span className="opacity-40">•</span>
                  <span className="align-middle">{movie.year}</span>
                </>
              )}
              {movie.country && (
                <>
                  <span className="opacity-40">•</span>
                  <span className="align-middle">{movie.country}</span>
                </>
              )}
            </div>

            {movie.tagline && (
              <p className="text-[14px] md:text-[24px] font-medium leading-tight theme-text-secondary mb-4 opacity-90">
                {movie.tagline}
              </p>
            )}

            <div className="flex items-center gap-6 mb-4">
              <StarRating rating={movie.voteAverage} />
              <div className="flex items-center gap-3">
                <img src="/assets/imdb.png" alt="IMDb" className="h-[16px] md:h-[20px] w-auto object-cover object-left" />
                <span className="theme-text-secondary text-[13px] md:text-[16px] font-medium leading-none">
                  {movie.voteAverage.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Bookmark / Like / Dislike icons */}
            <div className="flex items-center gap-3 mb-4">
              <button
                type="button"
                aria-label="Bookmark"
                className="h-9 w-9 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <Bookmark className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Like"
                className="h-9 w-9 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Dislike"
                className="h-9 w-9 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action buttons*/}
          <div className="flex items-center gap-3 mb-10 md:mb-20 shrink-0">
            <button
              onClick={goToWatch}
              style={{
                width: '160px',
                height: '44px',
                borderRadius: '8px',
              }}
              className="bg-[#228EE5] hover:bg-blue-600 flex items-center justify-center font-bold text-[14px] text-white transition-all active:scale-95"
            >
              <Play className="w-4 h-4 shrink-0 mr-2" fill="white" stroke="none" />
              <span className="whitespace-nowrap">Watch Now</span>
            </button>

            <button
              style={{
                width: '120px',
                height: '44px',
                borderRadius: '8px',
                borderWidth: '1.5px',
              }}
              className="border-[#228EE5] hover:bg-white/10 flex items-center justify-center font-medium text-[14px] theme-text-primary transition-all"
            >
              <span className="whitespace-nowrap">Preview</span>
            </button>
          </div>
        </div>
      </section>

      {movie.gallery.length > 0 && (
        <div className="px-6 md:px-12 -mt-8 relative z-10">
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {movie.gallery.map((src, i) => (
              <div
                key={i}
                style={{ borderRadius: 15 }}
                className="relative w-28 h-28 md:w-[240px] md:h-[240px] flex-shrink-0 overflow-hidden border border-[var(--border-subtle)]"
              >
                <Image
                  src={src || null}
                  alt={`${movie.title} still ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 112px, 240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 md:px-12 py-10 md:py-16 space-y-10 md:space-y-16">
        {/* About */}
        {movie.overview && (
          <section>
            <h3 className="text-2xl md:text-[72px] font-bold theme-text-primary mb-4 leading-tight md:leading-none tracking-normal">
              about {movie.title}
            </h3>
            <p className="text-[14px] md:text-[24px] font-medium leading-relaxed md:leading-[1.4] theme-text-secondary max-w-4xl">
              {movie.overview}
            </p>
          </section>
        )}

        {/* Genres */}
        {movie.genres.length > 0 && (
          <section>
            <h3 className={sectionHeadingClass}>Genres</h3>
            <div className="flex flex-wrap gap-3">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full px-5 py-2 text-sm font-medium bg-[#E5228E] text-white"
                >
                  {g}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Characters */}
        {movie.cast.length > 0 && (
          <section>
            <h3 className={sectionHeadingClass}>Characters</h3>
            <div className="flex flex-wrap gap-6">
              {movie.cast.map((c) => (
                <div key={c.id} className="w-16 text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] mx-auto">
                    <Image src={c.photoUrl || null} alt={c.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <p className="mt-2 text-xs theme-text-secondary truncate" title={c.name}>
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Director */}
        {movie.director && (
          <section>
            <h3 className={sectionHeadingClass}>Director</h3>
            <div className="w-16 text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] mx-auto">
                <Image
                  src={movie.director.photoUrl || null}
                  alt={movie.director.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 text-xs theme-text-secondary truncate" title={movie.director.name}>
                {movie.director.name}
              </p>
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className={sectionHeadingClass + " mb-0"}>Comments</h3>
            <button type="button" className="text-sm font-semibold text-[#228EE5] hover:text-blue-400 flex items-center gap-1">
              See More <span aria-hidden>→</span>
            </button>
          </div>
          <div className="no-scrollbar flex gap-3 md:gap-4 overflow-x-auto pb-2">
            {placeholderComments.map((c) => (
              <div
                key={c.id}
                style={{ borderColor: "var(--comment-border)" }}
                className="relative w-[160px] h-[86px] md:w-[238px] md:h-[120px] shrink-0 rounded-lg bg-[var(--bg-page)] p-3 md:p-4 flex flex-col border"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-9 md:h-9 rounded-full overflow-hidden border border-[var(--border-subtle)] shrink-0 flex items-center justify-center bg-[var(--bg-surface-strong)]">
                    {c.avatarUrl ? (
                      <img
                        src={c.avatarUrl}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] md:text-xs font-bold theme-text-secondary">
                        {c.name[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] md:text-[14px] font-medium theme-text-secondary truncate">
                    {c.name}
                  </span>
                </div>

                {/* Comment Body */}
                <p className="mt-1.5 md:mt-2 text-[11px] md:text-[14px] theme-text-primary leading-snug">
                  that was perfect
                </p>

                {/* Bottom Reactions Section */}
                <div className="absolute bottom-2 right-3 md:bottom-3 md:right-4 flex items-center gap-2 md:gap-3 theme-text-secondary">
                  <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" /></svg>
                    <span className="text-[9px] md:text-[10px]">0</span>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                    <span className="text-[9px] md:text-[10px] font-bold">+1</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Suggestions */}
      {movie.recommendations.length > 0 && (
        <PosterRow
          heading={`Suggestion like "${movie.title}"`}
          items={movie.recommendations}
          onAdd={(itemId) => console.log("Add to list:", itemId)}
          onSeeMore={() => { }}
          linkBase="/movies"
        />
      )}

      <Footer />
    </>
  );
}