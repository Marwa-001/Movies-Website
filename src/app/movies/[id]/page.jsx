"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Play } from "lucide-react";
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
          <div key={i} className="relative w-5 h-5">
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
  { id: "c1", name: "Ava01" },
  { id: "c2", name: "Marcus_R" },
  { id: "c3", name: "sunny.wrtd" },
  { id: "c4", name: "kino_fan" },
  { id: "c5", name: "reelviews" },
];

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data: movie, isLoading, isError } = useMovieDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050514]">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050514]">
        <p className="text-white/50">Couldn&apos;t load this title. It may not exist.</p>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop hero */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-start justify-end px-12 lg:px-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${movie.backdropUrl}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
        </div>

        <Navbar />

        <div className="relative z-10 mt-32 max-w-2xl">
          <h1 className="tracking-tight mb-3 drop-shadow-2xl">{movie.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <span>{movie.isAdult ? "18+" : "PG"}</span>
            {movie.year && (
              <>
                <span className="opacity-40">•</span>
                <span>{movie.year}</span>
              </>
            )}
            {movie.country && (
              <>
                <span className="opacity-40">•</span>
                <span>{movie.country}</span>
              </>
            )}
          </div>

          {movie.tagline && <p className="p-medium text-gray-300 mb-6 opacity-90">{movie.tagline}</p>}

          <div className="flex items-center gap-6 mb-8">
            <StarRating rating={movie.voteAverage} />
            <div className="flex items-center gap-3">
              <img src="/assets/imdb.png" alt="IMDb" className="h-[20px] w-[37px] object-cover object-left" />
              <span className="text-white text-[16px] font-medium leading-none">{movie.voteAverage.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-[#228EE5] hover:bg-blue-600 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 h-[40px] justify-center">
              <Play className="w-4 h-4" fill="white" />
              <span style={{ whiteSpace: "nowrap" }}>Watch Now</span>
            </button>
            <button className="border border-white/40 hover:bg-white/10 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 h-[40px] justify-center">
              <span style={{ whiteSpace: "nowrap" }}>Preview</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {movie.gallery.length > 0 && (
        <div className="px-12 lg:px-24 -mt-8 relative z-10">
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {movie.gallery.map((src, i) => (
              <div key={i} className="relative w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                <Image src={src} alt={`${movie.title} still ${i + 1}`} fill sizes="160px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-12 lg:px-24 py-16 space-y-16">
        {/* About */}
        {movie.overview && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">about {movie.title}</h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl">{movie.overview}</p>
          </section>
        )}

        {/* Genres */}
        {movie.genres.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Genres</h3>
            <div className="flex flex-wrap gap-3">
              {movie.genres.map((g) => (
                <span key={g} className="rounded-full px-5 py-2 text-sm font-medium bg-[#E5228E] text-white">
                  {g}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Characters */}
        {movie.cast.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Characters</h3>
            <div className="flex flex-wrap gap-6">
              {movie.cast.map((c) => (
                <div key={c.id} className="w-16 text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 mx-auto">
                    <Image src={c.photoUrl} alt={c.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <p className="mt-2 text-xs text-gray-400 truncate" title={c.name}>
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
            <h3 className="text-2xl font-bold text-white mb-4">Director</h3>
            <div className="w-16 text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 mx-auto">
                <Image src={movie.director.photoUrl} alt={movie.director.name} fill sizes="64px" className="object-cover" />
              </div>
              <p className="mt-2 text-xs text-gray-400 truncate" title={movie.director.name}>
                {movie.director.name}
              </p>
            </div>
          </section>
        )}

        {/* Comments (static placeholder — no comments backend yet) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">Comments</h3>
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
                <div className="w-6 h-6 rounded-full bg-[#228EE5]/30 flex items-center justify-center text-[10px] font-semibold text-white">
                  {c.name[0].toUpperCase()}
                </div>
                <span className="text-xs text-gray-300">{c.name}</span>
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
          onSeeMore={() => {}}
          linkBase="/movies"
        />
      )}

      <Footer />
    </>
  );
}
