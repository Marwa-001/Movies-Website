import { getThematicCollection } from "@/lib/tmdb-server";
import { COLLECTION_THEMES, slugifyTheme } from "@/lib/collection-themes";
import Navbar from "../components/Navbar";
import CollectionHero from "../components/CollectionHero";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const data = await Promise.all(COLLECTION_THEMES.map((g) => getThematicCollection(g)));

  return (
    <>
      <main className="min-h-screen bg-[#050514] pb-20">
        <Navbar />

        {/* 1. HERO SECTION */}
        <CollectionHero collections={data.slice(0, 4)} />

        <div className="max-w-7xl mx-auto lg:px-12 px-6">
          
          {/* 2. GRID HEADER */}
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight">Collections</h2>

            {/* Toggle Switch */}
            <div className="flex bg-black/40 border border-white/10 rounded-full p-1 w-[120px] relative h-9">
              <button className="flex-1 text-[10px] uppercase tracking-wider font-bold text-gray-500 z-10">Series</button>
              <button className="flex-1 text-[10px] uppercase tracking-wider font-bold text-white z-10">Movies</button>
              <div className="absolute top-1 bottom-1 right-1 w-[56px] bg-[#228EE5] rounded-full shadow-[0_0_15px_rgba(34,142,229,0.6)]" />
            </div>
          </div>

          {/* 3. PERMANENTLY STACKED GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-20 gap-x-20 justify-items-center">
            {data.map((cat, idx) => (
              <Link 
                href={`/collections/${slugifyTheme(cat.title)}`} 
                key={idx} 
                className="block group"
              >
                {/* 
                   Bounding Box: 236x324 
                   This allows all three layers to be visible simultaneously.
                */}
                <div className="relative w-[236px] h-[324px] transition-transform duration-300 group-hover:-translate-y-2">
                  
                  {/* Layer 3: Back Layer (Permanently Visible) */}
                  <div className="absolute bottom-0 right-0 w-[208px] h-[296px] bg-white/5 rounded-[12px] border border-white/5 z-0" />

                  {/* Layer 2: Middle Layer (Permanently Visible) */}
                  <div className="absolute top-[14px] right-[14px] w-[208px] h-[296px] bg-white/10 rounded-[12px] border border-white/5 z-10" />

                  {/* Layer 1: Front Poster */}
                  <div className="absolute top-0 left-0 w-[208px] h-[296px] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 z-20">
                    {cat.imageSrc ? (
                      <Image
                        src={cat.imageSrc}
                        alt={cat.title}
                        fill
                        sizes="208px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a1f2e] animate-pulse" />
                    )}

                    {/* Cinematic Overlay & Title */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                      <h3 className="text-white text-[26px] font-bold text-center leading-tight tracking-tight drop-shadow-lg">
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}