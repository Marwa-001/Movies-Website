import { getThematicCollectionDetails } from "@/lib/tmdb-server";
import { findThemeBySlug } from "@/lib/collection-themes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import Image from "next/image"; // Added for better performance

export const dynamic = "force-dynamic";

export default async function SingleCollectionPage({ params }) {
  const { slug } = await params;
  const themeName = findThemeBySlug(slug);
  // const data = await getThematicCollectionDetails(themeName);
  const data = await getThematicCollectionDetails(themeName);
console.log("Collection Data:", data); // Check if backdropSrc or backdrop_path exists

  return (
    <main className="min-h-screen bg-[#050514] pb-20">
      <Navbar />
<section className="relative w-full h-[420px] rounded-[32px] overflow-hidden mb-16 flex flex-col justify-center px-12">
          <div className="absolute inset-0 z-0">
            {/* 
               Updated to Next.js Image + Fallback check 
               to prevent the "empty string" error 
            */}
            <Image
              src={data.backdropSrc || "/assets/hero banner.png"} 
              alt={data.title || "Collection"}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-2xl">
              {data.title} Collection
            </h1>
            <p className="text-gray-300 text-base mb-6 opacity-90 leading-relaxed">
              What the mysteries linked in this popular franchise reveal about the
              legacy of {data.title} and each of its most physical feats of life
              ability to fight against evil.
            </p>

            <div className="flex items-center gap-4 mb-2">
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
                      width: 16,
                      height: 16,
                    }}
                  />
                ))}
              </div>
              <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white font-bold border border-white/10">
                4K ULTRA HD
              </span>
            </div>
          </div>
        </section>
      <div className="max-w-7xl mx-auto px-8">

        {/* Movies belonging to this collection */}
        <h2 className="text-3xl font-bold text-white tracking-tight mb-10">
          {data.title} Movies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 justify-items-center mb-10">
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