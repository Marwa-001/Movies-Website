import { getThematicCollectionDetails } from "@/lib/tmdb-server";
import { findThemeBySlug } from "@/lib/collection-themes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import Image from "next/image"; // Added for better performance
import { Play } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SingleCollectionPage({ params }) {
  const { slug } = await params;
  const themeName = findThemeBySlug(slug);
  // const data = await getThematicCollectionDetails(themeName);
  const data = await getThematicCollectionDetails(themeName);
console.log("Collection Data:", data); // Check if backdropSrc or backdrop_path exists

  return (
   <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pb-20">
      <Navbar />
      <section className="relative w-full h-[75vh] md:h-[420px] rounded-b-[24px] md:rounded-[32px] overflow-hidden mb-8 md:mb-16 flex flex-col justify-end md:justify-center px-5 md:px-12 pb-8 md:pb-0">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backdropSrc || "/assets/hero banner.png"}
            alt={data.title || "Collection"}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/60 to-transparent md:bg-gradient-to-r md:from-[#05070a] md:via-[#05070a]/50 md:to-transparent" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
        </div>

        {/* "Collection" pill badge — mobile only, top of poster */}
        <div className="md:hidden absolute top-6 left-5 z-10 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="text-white text-sm font-semibold">Collection</span>
        </div>
        <div className="md:hidden absolute top-6 right-5 z-10 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Play className="h-3.5 w-3.5 text-white" fill="white" />
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4 drop-shadow-2xl">
            {data.title} Collection
          </h1>
          <p className="text-gray-300 text-[13px] md:text-base mb-4 md:mb-6 opacity-90 leading-relaxed line-clamp-3 md:line-clamp-none">
            What the mysteries linked in this popular franchise reveal about the
            legacy of {data.title} and each of its most physical feats of life
            ability to fight against evil.
          </p>

          <div className="flex items-center gap-3 md:gap-4 mb-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  style={{
                    backgroundColor: "#E5DB22D6",
                    WebkitMaskImage: "url(/assets/star.png)",
                    maskImage: "url(/assets/star.png)",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    width: 14,
                    height: 14,
                  }}
                />
              ))}
            </div>
            <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] md:text-[10px] text-white font-bold border border-white/10">
              4K ULTRA HD
            </span>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-8">

        {/* Movies belonging to this collection */}
        <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-10">
          {data.title} Movies
        </h2>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 justify-items-center mb-10">
          {data.items.map((item, idx) => (
            /* 
               FIX: Removed onAdd={() => {}} 
               Functions cannot be passed from Server Components to Client Components.
            */
            <MovieCard 
              key={item.id} 
              {...item} 
              priority={idx < 5} 
              href={`/movies/${item.id}`} 
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}