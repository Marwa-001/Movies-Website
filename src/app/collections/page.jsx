import { ArrowLeft, Bell, Search, User } from "lucide-react";
import Link from "next/link";
import { getThematicCollection } from "@/lib/tmdb-server";
import CollectionHero from "../components/CollectionHero";

export default async function CollectionsPage() {
  const genres = ["Marvel", "DC", "Star Wars", "The Nun", "Insidious", "Musicals", "Harry Potter", "John Wick", "Godzilla"];
  const data = await Promise.all(genres.map(g => getThematicCollection(g)));

  return (
    <main className="min-h-screen bg-[#050514] pb-20">
      {/* Top Navbar mimic */}
      <div className="max-w-7xl mx-auto pt-8 px-8 flex justify-between items-center mb-8">
         <div className="flex items-center gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-lg text-white font-bold text-lg">
                Collection
            </div>
         </div>
         <div className="flex items-center gap-6 text-gray-400 text-sm">
            <Search size={20} />
            <Bell size={20} />
            <div className="w-8 h-8 rounded-full bg-[#228EE5] flex items-center justify-center text-white">
                <User size={18} />
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* 1. HERO CAROUSEL */}
        <CollectionHero collections={data.slice(0, 5)} />

        {/* 2. GRID HEADER & TOGGLE */}
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Collections</h2>
            
            {/* Toggle Switch matching your reference */}
            <div className="flex bg-black/40 border border-white/10 rounded-full p-1 w-[110px] relative h-8">
                <button className="flex-1 text-[9px] uppercase font-bold text-gray-500 z-10">Series</button>
                <button className="flex-1 text-[9px] uppercase font-bold text-white z-10">Movies</button>
                <div className="absolute top-1 bottom-1 right-1 w-[52px] bg-[#228EE5] rounded-full shadow-[0_0_10px_#228EE5]" />
            </div>
        </div>

        {/* 3. STACKED GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-16 gap-x-6">
          {data.map((cat, idx) => (
            <Link href={`/collection/${cat.title.toLowerCase().replace(/\s+/g, '')}`} key={idx} className="block group">
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

        {/* 4. FOOTER (Matching Image) */}
        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center">
            <div className="flex gap-8 text-[11px] text-gray-500 font-medium mb-10">
                <a href="#">Get the OMO App</a>
                <a href="#">Help</a>
                <a href="#">Site Index</a>
                <a href="#">Advertising</a>
                <a href="#">Privacy Policy</a>
            </div>
            <div className="flex gap-6 text-white/40">
                {/* Icons placeholder */}
                <div className="w-5 h-5 bg-white/20 rounded" />
                <div className="w-5 h-5 bg-white/20 rounded" />
                <div className="w-5 h-5 bg-white/20 rounded" />
                <div className="w-5 h-5 bg-white/20 rounded" />
            </div>
        </footer>
      </div>
    </main>
  );
}