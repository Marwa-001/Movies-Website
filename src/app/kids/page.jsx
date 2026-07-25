"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PosterRow from "../components/PosterRow";
import PosterRowSkeleton from "../components/PosterRowSkeleton";
import { useTrending } from "@/hooks/useTrending";
import { useMovies } from "@/hooks/useMovies";

// Popular kid-friendly characters strip. Swap the src paths for real
// character cut-outs whenever you have them — placeholders live under
// /public/assets/characters/*.png
const POPULAR_CHARACTERS = [
  { name: "Olaf", img: "/assets/characters/olaf.png" },
  { name: "Anger", img: "/assets/characters/anger.png" },
  { name: "Elsa", img: "/assets/characters/elsa.png" },
  { name: "Moana", img: "/assets/characters/moana.png" },
  { name: "Vanlope", img: "/assets/characters/vanlope.png" },
  { name: "Boss", img: "/assets/characters/boss.png" },
];

export default function KidsPage() {
  const router = useRouter();

  const { data: suggestion, isLoading: loadingSuggestion } = useTrending({
    mediaType: "movie",
    timeWindow: "week",
  });
  const { data: theBest, isLoading: loadingBest } = useMovies({
    genres: ["Animation", "Family"],
  });
  const { data: mostView, isLoading: loadingMostView } = useMovies({
    genres: ["Animation", "Adventure", "Family"],
    page: 2,
  });

  const goToKidsTitle = (id) => router.push(`/kids/${id}`);
  const handleAdd = (id) => console.log("Add to kids list:", id);

  const featured = suggestion?.[0];

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[500px] md:h-[640px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featured?.backdropSrc || "/assets/kids-hero.jpg"}
            alt="Welcome to omni kid"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)]/70 md:from-[var(--bg-page)]/60 via-transparent to-transparent" />
        </div>

        <Navbar />

        <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-24 pb-8 md:pb-0 max-w-xl">
          <h1 className="text-[36px] md:text-[64px] font-bold leading-[1.05] tracking-tight mb-3 md:mb-6 drop-shadow-2xl">
            Welcome
            <br />
            to omni kid
          </h1>
          <p className="hidden md:block text-[var(--text-secondary)] text-lg mb-8 max-w-md">
            Enjoy the magic of storytelling with us.
          </p>
          <div className="md:hidden">
            <p className="text-[13px] font-semibold text-white/90 mb-4">
              Enjoy the magic of storytelling with us.
            </p>
          </div>
          <button
            type="button"
            className="self-start bg-[#228EE5] hover:bg-blue-500 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95"
          >
            About omni kid
          </button>
        </div>
      </section>

      {/* SUGGESTION */}
      {loadingSuggestion ? (
        <PosterRowSkeleton heading="Suggestion" />
      ) : (
        <PosterRow
          heading="Suggestion"
          items={suggestion || []}
          onAdd={handleAdd}
          onSeeMore={() => {}}
          linkBase="/kids"
        />
      )}

      {/* THE BEST */}
      {loadingBest ? (
        <PosterRowSkeleton heading="The Best" />
      ) : (
        <PosterRow
          heading="The Best"
          items={theBest || []}
          onAdd={handleAdd}
          onSeeMore={() => {}}
          linkBase="/kids"
        />
      )}

      {/* PARENTAL CONTROL CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1">
            <p className="text-[20px] md:text-[32px] leading-relaxed md:leading-snug font-medium max-w-xl">
              Making a omni kid allows you to create a safe space for your
              child to watch by choosing the age of your child. It means that
              he can see himself for his age and not have access to other
              movies and series.
            </p>
            <button
              type="button"
              className="mt-8 bg-[#228EE5] hover:bg-blue-500 text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Create a omni kids
            </button>
          </div>
          <div className="relative w-[220px] h-[220px] md:w-[340px] md:h-[340px] flex-shrink-0">
            <Image
              src="/assets/kids-minions.png"
              alt="Minions"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* POPULAR CHARACTERS */}
      <section className="px-6 md:px-12 lg:px-24 py-8 md:py-12">
        <div className="mb-6 md:mb-10 flex items-center justify-between">
          <h2 className="text-[24px] md:text-5xl font-bold tracking-tight">
            Popular characters
          </h2>
          <button type="button" className="text-[#228EE5] text-sm md:text-lg font-semibold hover:text-blue-400">
            See More →
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {POPULAR_CHARACTERS.map((c) => (
            <div key={c.name} className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[var(--bg-surface)]">
              <Image src={c.img} alt={c.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/25 flex items-end justify-center pb-3">
                <span className="text-white font-bold text-xs md:text-lg drop-shadow-md">
                  {c.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SPOTLIGHT (Elemental-style banner) */}
      {featured && (
        <section className="px-6 md:px-12 lg:px-24 py-4">
          <div className="relative rounded-2xl overflow-hidden h-[140px] md:h-[220px] flex items-center">
            <Image
              src={featured.backdropSrc || featured.imageSrc}
              alt={featured.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 pl-6 md:pl-10 flex items-center gap-4 md:gap-8">
              <div className="relative w-16 h-24 md:w-24 md:h-36 rounded-lg overflow-hidden shadow-xl flex-shrink-0 hidden sm:block">
                <Image src={featured.imageSrc} alt="" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-white text-lg md:text-3xl font-bold mb-1">{featured.title}</h3>
                {featured.genres?.length > 0 && (
                  <p className="text-white/70 text-xs md:text-sm mb-2">{featured.genres.join("/")}</p>
                )}
                <button
                  type="button"
                  onClick={() => goToKidsTitle(featured.id)}
                  className="flex items-center gap-2 bg-[#228EE5] hover:bg-blue-500 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all"
                >
                  ▶ Watch Movie
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MOST VIEW */}
      <section className="px-6 md:px-12 lg:px-24 py-10 md:py-16">
        <h2 className="text-[24px] md:text-5xl font-bold tracking-tight mb-6 md:mb-10">
          Most View
        </h2>
        {loadingMostView ? (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-full aspect-[208/296] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {(mostView || []).map((item) => (
              <div
                key={item.id}
                onClick={() => goToKidsTitle(item.id)}
                className="relative w-full aspect-[112/160] md:aspect-[208/296] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="bg-[#228EE5] hover:bg-blue-500 text-white font-semibold text-sm px-10 py-3 rounded-full transition-all"
          >
            See More
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}