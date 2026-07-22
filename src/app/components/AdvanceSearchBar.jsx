"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const YEARS = Array.from({ length: 2026 - 1980 + 1 }, (_, i) => 2026 - i);

// Custom Select that matches the "Label on the left" design
function SelectField({ label, value, options = [], onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white text-[13px] font-medium min-w-[55px] text-right">
        {label}
      </span>
      <div className="relative flex-1">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none rounded-full bg-white/[0.03] border border-white/10 pl-5 pr-10 py-2.5 text-xs text-white/60 focus:outline-none focus:border-[#228EE5] transition-all disabled:cursor-not-allowed"
        >
          {options.length > 0 ? (
            options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt} className="bg-[#030A1B]">
                {opt.label ?? opt}
              </option>
            ))
          ) : (
            <option>{value}</option>
          )}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
      </div>
    </div>
  );
}

export default function AdvanceSearchBar({
  genres = [],
  activeGenres = [],
  onToggleGenre,
  year,
  onYearChange,
  search,
  onSearchChange,
}) {
  // Pagination State for Genres
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 8;

  // Ensure we have a list of genres to display
  const displayGenres = genres.length > 0 ? genres : [
    "Drama", "Action", "Adventure", "Romance", "Fantasy", "Comedy", "Animation", "Thriller", "Horror", "Sci-Fi"
  ];

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(displayGenres.length - visibleCount, prev + 1));

  const visibleGenres = displayGenres.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="relative w-full max-w-[1184px] mx-auto mt-16 px-4 mb-16">
      
      {/* "Advance Search" Tab Header */}
      <div className="absolute -top-[44px] left-10 z-10">
        <div className="bg-[#228EE5] text-white px-10 py-3 rounded-t-[22px] font-bold text-[18px] tracking-wide shadow-lg shadow-blue-900/20">
          Advance Search
        </div>
      </div>

      {/* Main Container Card */}
      <div className="relative rounded-[32px] border border-white/10 bg-[#030A1B] p-8 md:p-10 shadow-2xl">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          
          {/* Mascot Illustration */}
          <div className="shrink-0">
            <img 
              src="/assets/searchlogo 1.png" 
              alt="Mascot" 
              className="w-[180px] h-auto object-contain"
            />
          </div>

          {/* Controls Container */}
          <div className="flex-1 w-full space-y-10">
            
            {/* Top Row: Year, Country, Actor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SelectField 
                label="Year" 
                value={year} 
                onChange={(e) => onYearChange(e.target.value)}
                options={[{ value: "", label: "2023" }, ...YEARS.map(y => ({ value: y, label: y }))]} 
              />
              <SelectField label="Country" value="Germany" disabled />
              <SelectField label="Actor" value="Tom Hardy" disabled />
            </div>

            {/* Middle Row: Big Search Input and Director */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search"
                  className="w-full rounded-[20px] bg-white/[0.03] border border-white/10 pl-8 pr-16 py-4 text-[20px] text-white/50 placeholder:text-white/20 focus:outline-none focus:border-[#228EE5] transition-all"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="h-7 w-7 text-white/60" />
                </div>
              </div>

              {/* Director Field */}
              <div className="flex items-center">
                <SelectField label="Director" value="Christopher Nolan" disabled />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Genre Pagination Row */}
        <div className="mt-12 flex items-center gap-4">
          
          {/* Prev Arrow */}
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-white/40 hover:text-white transition-colors disabled:opacity-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          {/* Genre Pill Row */}
          <div className="flex flex-1 justify-between gap-3 overflow-hidden">
            {visibleGenres.map((genre) => {
              const name = typeof genre === 'string' ? genre : genre.name;
              
              // Logic to check if active
              const isActive = activeGenres.some(g => (typeof g === 'string' ? g === name : g.name === name));
              
              // Reference check for the specific pink ones in your image
              const isPinkDemo = ["Drama", "Action", "Fantasy", "Thriller"].includes(name);

              return (
                <button
                  key={name}
                  onClick={() => onToggleGenre?.(genre)}
                  className={`flex-1 min-w-0 py-3 rounded-full text-[13px] font-medium transition-all text-center whitespace-nowrap
                    ${(isActive || isPinkDemo)
                      ? "bg-[#E966A0] border-none text-white shadow-[0_0_20px_rgba(233,102,160,0.4)]" 
                      : "bg-transparent border-[0.5px] border-[#E966A0] text-white/80 hover:bg-[#E966A0]/10"
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button 
            onClick={handleNext}
            disabled={currentIndex >= displayGenres.length - visibleCount}
            className="text-white/40 hover:text-white transition-colors disabled:opacity-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          
        </div>
      </div>
    </div>
  );
}