"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StackedCollectionCard from "./StackedCollectionCard";

const THEMES = ["Musicals", "Marvel", "DC", "John Wick", "Godzilla"];

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
            if (!res.ok) return { title: theme, imageSrc: null, images: [] };
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
    <section className="mt-16 px-4 lg:px-12" id="collections">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Collection</h2>

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

      <div className="flex gap-4 overflow-x-auto pb-10 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
        {loading
          ? Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[152px] h-[210px] md:min-w-[236px] md:h-[324px] bg-[var(--bg-surface-strong)] rounded-[12px] animate-pulse" />
            ))
          : collectionsData.map((col, idx) => (
              <Link
                href={`/collections/${col.title.toLowerCase().replace(/\s+/g, "")}`}
                key={idx}
                className="shrink-0"
              >
                {/* Mobile-sized stack */}
                <div className="md:hidden">
                  <StackedCollectionCard title={col.title} images={col.images} imageSrc={col.imageSrc} size="mobile" />
                </div>
                {/* Desktop-sized stack */}
                <div className="hidden md:block">
                  <StackedCollectionCard title={col.title} images={col.images} imageSrc={col.imageSrc} />
                </div>
              </Link>
            ))
        }

        <Link
          href="/collections"
          className="flex items-center justify-center min-w-[100px] md:min-w-[120px] text-[var(--text-secondary)] hover:text-[#228EE5] font-bold transition-colors group shrink-0"
        >
          See More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}