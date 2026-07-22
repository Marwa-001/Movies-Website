import { getThematicCollection } from "@/lib/tmdb-server";
import { COLLECTION_THEMES, slugifyTheme } from "@/lib/collection-themes";
import Navbar from "../components/Navbar";
import CollectionHero from "../components/CollectionHero";
import Footer from "../components/Footer";
import Link from "next/link";

// This page depends on live TMDB data — render on request rather than at
// build time so a missing/rotated API key never breaks the production build.
export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const data = await Promise.all(COLLECTION_THEMES.map((g) => getThematicCollection(g)));

  return (
    <main className="min-h-screen bg-[#050514] pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 pt-32">
        {/* 1. HERO CAROUSEL — 4 fixed thumbnails, focus auto-cycles */}
        <CollectionHero collections={data.slice(0, 4)} />

        {/* 2. GRID HEADER & TOGGLE */}
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Collections</h2>

          {/* Toggle Switch matching the reference */}
          <div className="flex bg-black/40 border border-white/10 rounded-full p-1 w-[110px] relative h-8">
            <button className="flex-1 text-[9px] uppercase font-bold text-gray-500 z-10">Series</button>
            <button className="flex-1 text-[9px] uppercase font-bold text-white z-10">Movies</button>
            <div className="absolute top-1 bottom-1 right-1 w-[52px] bg-[#228EE5] rounded-full shadow-[0_0_10px_#228EE5]" />
          </div>
        </div>

        {/* 3. STACKED GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-6">
          {data.map((cat, idx) => (
            <Link href={`/collections/${slugifyTheme(cat.title)}`} key={idx} className="block group">
              {/* Card Stack Logic: 208x296 Poster Base */}
              <div className="relative w-[208px] h-[296px] mx-auto">
                {/* Layer 2 (Back) */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 rounded-[12px] -z-20 border border-white/5" />
                {/* Layer 1 (Middle) */}
                <div className="absolute -top-2 -right-2 w-full h-full bg-white/10 rounded-[12px] -z-10 border border-white/5" />

                {/* Front Card */}
                <div className="relative w-full h-full rounded-[12px] overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={cat.imageSrc}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center p-4">
                    <h3 className="text-white text-2xl font-bold text-center leading-tight tracking-tight drop-shadow-lg">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
