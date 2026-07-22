"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import AdvanceSearchBar from "../components/AdvanceSearchBar";
import CatalogGrid from "../components/CatalogGrid";
import CatalogGridSkeleton from "../components/CatalogGridSkeleton";
import Footer from "../components/Footer";
import { useMovies } from "@/hooks/useMovies";

const genreList = [
  "Drama", "Action", "Adventure", "Romance", "Fantasy",
  "Comedy", "Animation", "Thriller", "Mystery", "History",
];

export default function MoviesPage() {
  const [activeGenres, setActiveGenres] = useState(["Fantasy"]);
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");

  const toggleGenre = (genre) => {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const { data: items, isLoading } = useMovies({ genres: activeGenres, year, query: search });

  const handleAdd = (id) => console.log("Add to list:", id);

  return (
    <>
      <div className="relative pt-40 pb-8 px-12 lg:px-24">
        <Navbar />
        <h1 className="text-5xl font-bold tracking-tight text-white mb-10">Movies</h1>

        <AdvanceSearchBar
          genres={genreList}
          activeGenres={activeGenres}
          onToggleGenre={toggleGenre}
          year={year}
          onYearChange={setYear}
          search={search}
          onSearchChange={setSearch}
        />

        {isLoading ? <CatalogGridSkeleton /> : <CatalogGrid items={items} onAdd={handleAdd} linkBase="/movies" />}
      </div>
      <Footer />
    </>
  );
}
