import { getThematicCollectionDetails } from "@/lib/tmdb-server";
import { findThemeBySlug } from "@/lib/collection-themes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import Image from "next/image";
import { Play } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SingleCollectionPage({ params }) {
  const { slug } = await params;
  const themeName = findThemeBySlug(slug);
  const data = await getThematicCollectionDetails(themeName);

  return (
    <main className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pb-20">
      <Navbar />

      {/* --- HERO SECTION START --- */}
      <section className="relative w-full h-[80vh] md:h-[600px] overflow-hidden flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.backdropSrc || "/assets/hero banner.png"}
            alt={data.title || "Collection"}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/60 to-transparent" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[var(--bg-page)]/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          {/* Heading */}
          <h1 className="text-[var(--text-primary)] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 drop-shadow-2xl">
            {data.title} Collection
          </h1>
          {/* Info Row (Stars & 4K Label) */}
          <div className="flex items-center gap-4">
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
                    width: 20, // Slightly larger stars for bottom placement
                    height: 20,
                  }}
                />
              ))}
            </div>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] md:text-[12px] text-[var(--text-primary)] font-bold border border-white/20">
              4K ULTRA HD
            </span>
          </div>

          {/* Paragraph */}
          <p className="text-[var(--text-secondary)] text-sm md:text-lg mb-6 md:mb-8 opacity-90 leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
            What the mysteries linked in this popular franchise reveal about the
            legacy of {data.title} and each of its most physical feats of life
            ability to fight against evil.
          </p>

        </div>
      </section>
      {/* --- HERO SECTION END --- */}

      <div className="max-w-7xl mx-auto px-8">
        {/* Movies belonging to this collection */}
        <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-10">
          {data.title} Movies
        </h2>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-10 justify-items-center mb-10">
          {data.items.map((item, idx) => (
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