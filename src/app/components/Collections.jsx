"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const THEMES = ["Musicals", "Marvel", "DC", "John Wick", "Godzilla"];

function CollectionCard({ title, imageSrc }) {
  return (
    /* Total Container: 236px x 324px to accommodate the stack offset */
    <div className="relative w-[236px] h-[324px] group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
      
      {/* Back Layer (Furthest): 208x296, offset to top-right corner of the 236x324 box */}
      <div 
        className="absolute bottom-0 right-0 w-[208px] h-[296px] bg-white/5 rounded-[12px] -z-30 border border-white/5"
      />

      {/* Middle Layer: 208x296, offset by 14px from top and right */}
      <div 
        className="absolute top-[14px] right-[14px] w-[208px] h-[296px] bg-white/10 rounded-[12px] -z-20 border border-white/5"
      />

      {/* Main Poster (Front): 208x296, positioned at the bottom-left of the 236x324 box */}
      <div className="absolute top-0 left-0 w-[208px] h-[296px] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 z-10">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="208px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#1a1f2e] animate-pulse" />
        )}

        {/* Cinematic Overlay & Title */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <h3 className="text-[var(--text-primary)] text-[32px] font-bold text-center leading-tight tracking-tight drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const [activeTab, setActiveTab] = useState("movies");
  const [collectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      setLoading(true);
      try {
        const results = await Promise.all(
          THEMES.map(async (theme) => {
            const themeKey = theme.toLowerCase().replace(/\s+/g, "");
            const res = await fetch(`/api/tmdb/collections?theme=${themeKey}&type=${activeTab}`);
            if (!res.ok) return { title: theme, imageSrc: null };
            const data = await res.json();
            return { ...data, title: theme }; 
          })
        );
        setCollectionsData(results);
      } catch (err) {
        console.error("Failed to load collections", err);
      } finally {
        setLoading(false);
      }
    }
    loadCollections();
  }, [activeTab]);

  return (
    <section className="mt-16 px-4 lg:px-12"  id="collections">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Collection</h2>

        {/* Pixel Perfect Toggle */}
        <div className="flex bg-black/40 border border-white/10 rounded-full p-1 w-[120px] relative">
          <button
            onClick={() => setActiveTab("series")}
            className={`flex-1 text-[10px] uppercase tracking-wider font-bold z-10 transition-colors duration-300 ${activeTab === 'series' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
          >
            Series
          </button>
          <button
            onClick={() => setActiveTab("movies")}
            className={`flex-1 text-[10px] uppercase tracking-wider font-bold z-10 transition-colors duration-300 ${activeTab === 'movies' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
          >
            Movies
          </button>
          <div
            className={`absolute top-1 bottom-1 w-[56px] bg-[#228EE5] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,142,229,0.6)] ${activeTab === 'movies' ? 'left-[60px]' : 'left-1'}`}
          />
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex gap-4 overflow-x-auto pb-10 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
        {loading
          ? Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[236px] h-[324px] bg-white/5 rounded-[12px] animate-pulse" />
            ))
          : collectionsData.map((col, idx) => (
              <Link 
                href={`/collections/${col.title.toLowerCase().replace(/\s+/g, "")}`} 
                key={idx}
                className="shrink-0"
              >
                <CollectionCard title={col.title} imageSrc={col.imageSrc} />
              </Link>
            ))
        }
        
        {/* See More Trigger */}
        <Link 
          href="/collections" 
          className="flex items-center justify-center min-w-[120px] text-[var(--text-secondary)] hover:text-[#228EE5] font-bold transition-colors group shrink-0"
        >
          See More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}