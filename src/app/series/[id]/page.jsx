"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Play } from "lucide-react";
import Navbar from "../../components/Navbar";
import PosterRow from "../../components/PosterRow";
import Footer from "../../components/Footer";
import { useSeriesDetails } from "../../../hooks/useSeriesDetail";

function StarRating({ rating = 0 }) {
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

const placeholderComments = [
  { id: "c1", name: "Ava01" },
  { id: "c2", name: "Marcus_R" },
  { id: "c3", name: "sunny.wrtd" },
  { id: "c4", name: "kino_fan" },
  { id: "c5", name: "reelviews" },
];

export default function SeriesDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: series, isLoading, isError } = useSeriesDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050514]">
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  if (isError || !series) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050514]">
        <p className="text-white/50">Couldn&apos;t load this title. It may not exist.</p>
      </div>
    );
  }

  const goToWatch = () => {
    const params = new URLSearchParams({
      title: series.title,
      poster: series.posterPath || "",
      backdrop: series.backdropPath || "",
    });
    router.push(`/watch/tv/${series.id}?${params.toString()}`);
  };

  return (
    <>
      <section className="relative w-full min-h-[70vh] flex flex-col items-start justify-end px-12 lg:px-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${series.backdropUrl}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/20 to-transparent" />
        </div>

        <Navbar />

        <div className="relative z-10 mt-32 max-w-2xl">
          <h1 className="tracking-tight mb-3 drop-shadow-2xl text-[var(--text-primary)]">{series.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <span>{series.isAdult ? "18+" : "PG"}</span>
            {series.year && (
              <>
                <span className="opacity-40">•</span>
                <span>{series.year}</span>
              </>
            )}
            {series.numberOfSeasons && (
              <>
                <span className="opacity-40">•</span>
                <span>{series.numberOfSeasons} Season{series.numberOfSeasons > 1 ? "s" : ""}</span>
              </>
            )}
          </div>

          {series.tagline && <p className="p-medium text-gray-300 mb-6 opacity-90">{series.tagline}</p>}

          <div className="flex items-center gap-6 mb-8">
            <StarRating rating={series.voteAverage} />
            <div className="flex items-center gap-3">
              <img src="/assets/imdb.png" alt="IMDb" className="h-[20px] w-[37px] object-cover object-left" />
              <span className="text-white text-[16px] font-medium leading-none">{series.voteAverage.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToWatch}
              className="bg-[#228EE5] hover:bg-blue-600 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 h-[40px] justify-center"
            >
              <Play className="w-4 h-4" fill="white" />
              <span style={{ whiteSpace: "nowrap" }}>Watch Now</span>
            </button>
            <button className="border border-white/40 hover:bg-white/10 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 h-[40px] justify-center">
              <span style={{ whiteSpace: "nowrap" }}>Preview</span>
            </button>
          </div>
        </div>
      </section>

      {series.gallery.length > 0 && (
        <div className="px-12 lg:px-24 -mt-8 relative z-10">
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {series.gallery.map((src, i) => (
              <div key={i} className="relative w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                <Image src={src || null} alt={`${series.title} still ${i + 1}`} fill sizes="160px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-12 lg:px-24 py-16 space-y-16">
        {series.overview && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">about {series.title}</h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl">{series.overview}</p>
          </section>
        )}

        {series.genres.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Genres</h3>
            <div className="flex flex-wrap gap-3">
              {series.genres.map((g) => (
                <span key={g} className="rounded-full px-5 py-2 text-sm font-medium bg-[#E5228E] text-white">
                  {g}
                </span>
              ))}
            </div>
          </section>
        )}

        {series.cast.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Characters</h3>
            <div className="flex flex-wrap gap-6">
              {series.cast.map((c) => (
                <div key={c.id} className="w-16 text-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 mx-auto">
                    <Image src={c.photoUrl || null} alt={c.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <p className="mt-2 text-xs text-gray-400 truncate" title={c.name}>
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {series.creator && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Creator</h3>
            <div className="w-16 text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5 mx-auto">
                <Image src={series.creator.photoUrl || null} alt={series.creator.name} fill sizes="64px" className="object-cover" />
              </div>
              <p className="mt-2 text-xs text-gray-400 truncate" title={series.creator.name}>
                {series.creator.name}
              </p>
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">Comments</h3>
            <button type="button" className="text-sm font-semibold text-[#228EE5] hover:text-blue-400">
              See More
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {placeholderComments.map((c) => (
              <div key={c.id} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-[#228EE5]/30 flex items-center justify-center text-[10px] font-semibold text-white">
                  {c.name[0].toUpperCase()}
                </div>
                <span className="text-xs text-gray-300">{c.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {series.recommendations.length > 0 && (
        <PosterRow
          heading={`Suggestion like "${series.title}"`}
          items={series.recommendations}
          onAdd={(itemId) => console.log("Add to list:", itemId)}
          onSeeMore={() => {}}
          linkBase="/series"
        />
      )}

      <Footer />
    </>
  );
}