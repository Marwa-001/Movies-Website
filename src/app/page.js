"use client";

import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trends from "./components/Trends";
import Movies from "./components/Movies";
import GoldenGlobeBanner from "./components/GoldenGlobeBanner";
import Series from "./components/Series";
import PricingSection from "./components/PricesSection";
import Collections from "./components/Collections";
import Footer from "./components/Footer";
import FAQs from "./components/Faq";
import { Cast } from "./components/Cast";
import { ContinueWatching } from "./components/ContinueWatching";
import KidsSection from "./components/Kids";

// Genre labels shown in the GenreFilter pills. These map to TMDB genre ids
// in services/tmdb.js (MOVIE_GENRE_IDS / TV_GENRE_IDS).
const genreList = [
  "Drama", "Action", "Adventure", "Romance", "Fantasy",
  "Comedy", "Animation", "Thriller", "Mystery", "History",
];

export default function Home() {
  const router = useRouter();
  const handleAdd = (id) => {
    console.log("Add to list:", id);
  };

  return (
    <div className="bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* <Navbar /> */}
      <Hero />
      <Trends onAdd={handleAdd} onSeeMore={() => router.push("/movies")} />
      <Movies genres={genreList} onAdd={handleAdd} onSeeMore={() => router.push("/movies")} />
      <GoldenGlobeBanner />
      <Series onAdd={handleAdd} onSeeMore={() => router.push("/series")} genres={genreList} />
      <PricingSection />
      <Collections />
      <ContinueWatching />
      <Cast />
      <KidsSection />
      <FAQs />
      <Footer />
      </div>
  );
}
