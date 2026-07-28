import { getThematicCollection } from "@/lib/tmdb-server";
import { COLLECTION_THEMES, slugifyTheme } from "@/lib/collection-themes";
import Navbar from "../components/Navbar";
import CollectionHero from "../components/CollectionHero";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import StackedCollectionCard from "../components/StackedCollectionCard";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const data = await Promise.all(COLLECTION_THEMES.map((g) => getThematicCollection(g)));

  return (
    <>
     <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pb-20">
        <Navbar />

        {/* 1. HERO SECTION */}
        <CollectionHero collections={data.slice(0, 4)} />

        <div className="max-w-7xl mx-auto lg:px-12 px-6">
          
          {/* 2. GRID HEADER */}
          {/* 2. GRID HEADER */}
{/* PERMANENTLY STACKED GRID — visible at all breakpoints */}
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 md:gap-y-20 md:gap-x-20 justify-items-center">
  {data.map((cat, idx) => (
    <Link href={`/collections/${slugifyTheme(cat.title)}`} key={idx} className="block">
      <div className="md:hidden">
        <StackedCollectionCard title={cat.title} images={cat.images} imageSrc={cat.imageSrc} size="mobile" />
      </div>
      <div className="hidden md:block">
        <StackedCollectionCard title={cat.title} images={cat.images} imageSrc={cat.imageSrc} />
      </div>
    </Link>
  ))}
</div>

{/* 3a. MOBILE: simple 2-col grid, no stacked layers */}
{/* <div className="grid grid-cols-2 gap-4 md:hidden mb-4">
  {data.map((cat, idx) => (
    <Link href={`/collections/${slugifyTheme(cat.title)}`} key={idx} className="block">
      <div className="relative w-full aspect-[2/3] rounded-[14px] overflow-hidden border border-white/10 shadow-lg">
        {cat.imageSrc ? (
          <Image src={cat.imageSrc} alt={cat.title} fill sizes="50vw" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[#1a1f2e] animate-pulse" />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-3">
          <h3 className="text-white text-[16px] font-bold text-center leading-tight tracking-tight drop-shadow-lg">
            {cat.title}
          </h3>
        </div>
      </div>
    </Link>
  ))}
</div> */}

{/* 3b. DESKTOP: permanently stacked 3-layer grid */}
{/* <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-20 gap-x-20 justify-items-center">
  {data.map((cat, idx) => (
    <Link href={`/collections/${slugifyTheme(cat.title)}`} key={idx} className="block group">
      <div className="relative w-[236px] h-[324px] transition-transform duration-300 group-hover:-translate-y-2">
        <div className="absolute bottom-0 right-0 w-[208px] h-[296px] bg-white/5 rounded-[12px] border border-white/5 z-0" />
        <div className="absolute top-[14px] right-[14px] w-[208px] h-[296px] bg-white/10 rounded-[12px] border border-white/5 z-10" />
        <div className="absolute top-0 left-0 w-[208px] h-[296px] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 z-20">
          {cat.imageSrc ? (
            <Image src={cat.imageSrc} alt={cat.title} fill sizes="208px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-[#1a1f2e] animate-pulse" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
            <h3 className="text-white text-[26px] font-bold text-center leading-tight tracking-tight drop-shadow-lg">
              {cat.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div> */}
        </div>
      </main>
      <Footer />
    </>
  );
}