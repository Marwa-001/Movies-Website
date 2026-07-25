"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const YEARS = Array.from({ length: 2026 - 1980 + 1 }, (_, i) => 2026 - i);

function SelectField({ label, value, options = [], onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <span className="text-[var(--text-primary)] text-[13px] md:text-[13px] font-medium min-w-[52px] md:min-w-[55px] text-left md:text-right shrink-0">
        {label}
      </span>
      <div className="relative flex-1 min-w-0">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] pl-4 md:pl-5 pr-8 md:pr-10 py-2.5 text-[13px] md:text-xs text-[var(--text-secondary)] focus:outline-none focus:border-[#228EE5] transition-all disabled:cursor-not-allowed"
        >
          {options.length > 0 ? (
            options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt} className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                {opt.label ?? opt}
              </option>
            ))
          ) : (
            <option>{value}</option>
          )}
        </select>
        <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-[var(--text-secondary)] pointer-events-none" />
      </div>
    </div>
  );
}

// Mobile-only compact field: fixed 135x24px pill per Figma spec, label to the left.
function MobileSelectField({ label, value, options = [], onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[var(--text-primary)] text-[11px] font-medium shrink-0">
        {label}
      </span>
      <div className="relative" style={{ width: "135px", height: "24px" }}>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full h-full appearance-none rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] pl-3 pr-6 text-[10px] leading-none text-[var(--text-secondary)] focus:outline-none focus:border-[#228EE5] transition-all disabled:cursor-not-allowed"
        >
          {options.length > 0 ? (
            options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt} className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                {opt.label ?? opt}
              </option>
            ))
          ) : (
            <option>{value}</option>
          )}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--text-secondary)] pointer-events-none" />
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 8;

  const displayGenres = genres.length > 0 ? genres : [
    "Drama", "Action", "Adventure", "Romance", "Fantasy", "Comedy", "Animation", "Thriller", "Horror", "Sci-Fi"
  ];

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex((prev) => Math.min(displayGenres.length - visibleCount, prev + 1));

  const visibleGenres = displayGenres.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="relative w-full max-w-[1184px] mx-auto mt-16 md:mt-32 px-4 mb-16 overflow-x-hidden md:overflow-visible">

      {/* MOBILE: small "Advance Search" pill, top-right */}
      <div className="md:hidden absolute -top-[16px] right-8 z-30">
        <div className="bg-[#228EE5] text-white px-5 py-2 pt-4 rounded-[12px] font-bold text-[12px] tracking-wide shadow-lg shadow-blue-900/30 whitespace-nowrap">
          Advance Search
        </div>
      </div>

      {/* DESKTOP: pixel-perfect skewed arch tab — untouched */}
      <div className="hidden md:block absolute -top-[58px] left-[142px] z-0">
        <div
          style={{
            width: '243.87px',
            height: '109.84px',
            backgroundColor: '#228EE5',
            borderRadius: '110px 90px 15px 15px / 60px 45px 5px 5px',
            transform: 'skewX(-12deg)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
            boxShadow: '0 -10px 40px rgba(34, 142, 229, 0.25)'
          }}
        >
          <span
            style={{ transform: 'skewX(12deg)' }}
            className="text-white font-bold text-[19px] tracking-tight antialiased"
          >
            Advance Search
          </span>
        </div>
      </div>

      {/* DESKTOP: mascot, positioned outside normal flow — untouched */}
      <div className="hidden md:block absolute -top-[-30px] left-[30px] z-30 pointer-events-none">
        <img
          src="/assets/searchlogo 1.png"
          alt="Camera Mascot"
          className="w-[215px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* MAIN CONTAINER CARD */}
      <div className="relative z-20 rounded-[24px] md:rounded-[32px] border border-[var(--border-subtle)] bg-[var(--bg-page)] p-6 md:p-10 shadow-2xl overflow-hidden">

        <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-10">

          {/* MOBILE-ONLY mascot (centered, inline) */}
          <div className="md:hidden shrink-0">
            <img
              src="/assets/searchlogo 1.png"
              alt="Mascot"
              className="w-[150px] h-auto object-contain"
            />
          </div>

          {/* Visual spacer to account for desktop mascot overlap */}
          <div className="shrink-0 w-[150px] hidden lg:block" />

          <div className="flex-1 w-full min-w-0 space-y-6 md:space-y-10 md:pt-4">

            {/* MOBILE: Search bar — fixed 216x36px per spec, centered under mascot */}
            <div className="relative md:hidden flex justify-center">
              <div className="relative" style={{ width: "216px", height: "36px" }}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search"
                  className="w-full h-full rounded-[8px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] pl-4 pr-9 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[#228EE5] transition-all"
                  style={{ paddingTop: "0px" }}
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
              </div>
            </div>

            {/* MOBILE: 2x2 field grid (Year/Country, Director/Actor) — each pill fixed 135x24px, 8px gap */}
            <div className="md:hidden flex justify-center">
              <div className="grid grid-cols-2 gap-x-2 gap-y-2" style={{ width: "fit-content" }}>
                <MobileSelectField
                  label="Year"
                  value={year}
                  onChange={(e) => onYearChange(e.target.value)}
                  options={[{ value: "", label: "2023" }, ...YEARS.map(y => ({ value: y, label: y }))]}
                />
                <MobileSelectField label="Country" value="2023" disabled />
                <MobileSelectField label="Director" value="2023" disabled />
                <MobileSelectField label="Actor" value="2023" disabled />
              </div>
            </div>

            {/* DESKTOP: Top Row: Year, Country, Actor */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              <SelectField
                label="Year"
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
                options={[{ value: "", label: "2023" }, ...YEARS.map(y => ({ value: y, label: y }))]}
              />
              <SelectField label="Country" value="Germany" disabled />
              <SelectField label="Actor" value="Tom Hardy" disabled />
            </div>

            {/* DESKTOP: Middle Row: Big Search Input and Director */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search"
                  className="w-full rounded-[20px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] pl-8 pr-16 py-4 text-[20px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[#228EE5] transition-all"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="h-7 w-7 text-[var(--text-secondary)]" />
                </div>
              </div>

              <div className="flex items-center">
                <SelectField label="Director" value="Christopher Nolan" disabled />
              </div>
            </div>

          </div>
        </div>

        {/* GENRE ROW */}
        {/* MOBILE: horizontally scrollable, no forced equal-width shrinking, no letter truncation */}
        <div className="mt-8 md:hidden flex items-center gap-2">
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto scroll-smooth py-1">
            {displayGenres.map((genre) => {
              const name = typeof genre === 'string' ? genre : genre.name;
              const isActive = activeGenres.some(g => (typeof g === 'string' ? g === name : g.name === name));
              const isPinkDemo = ["Drama", "Action", "Fantasy", "Thriller"].includes(name);

              return (
                <button
                  key={name}
                  onClick={() => onToggleGenre?.(genre)}
                  className={`shrink-0 whitespace-nowrap py-2 px-4 rounded-full text-[12px] font-medium transition-all
                    ${(isActive || isPinkDemo)
                      ? "bg-[#E966A0] border-none text-white shadow-[0_0_20px_rgba(233,102,160,0.4)]"
                      : "bg-transparent border-[0.5px] border-[#E966A0] text-[var(--text-primary)]/80 hover:bg-[#E966A0]/10"
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP: paginated fixed row, exactly as before */}
        <div className="mt-12 hidden md:flex items-center gap-4">
          <button onClick={handlePrev} disabled={currentIndex === 0} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-10">
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="flex flex-1 justify-between gap-3 overflow-hidden">
            {visibleGenres.map((genre) => {
              const name = typeof genre === 'string' ? genre : genre.name;
              const isActive = activeGenres.some(g => (typeof g === 'string' ? g === name : g.name === name));
              const isPinkDemo = ["Drama", "Action", "Fantasy", "Thriller"].includes(name);

              return (
                <button
                  key={name}
                  onClick={() => onToggleGenre?.(genre)}
                  className={`flex-1 min-w-0 py-3 rounded-full text-[13px] font-medium transition-all text-center whitespace-nowrap
                    ${(isActive || isPinkDemo)
                      ? "bg-[#E966A0] border-none text-white shadow-[0_0_20px_rgba(233,102,160,0.4)]"
                      : "bg-transparent border-[0.5px] border-[#E966A0] text-[var(--text-primary)]/80 hover:bg-[#E966A0]/10"
                    }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <button onClick={handleNext} disabled={currentIndex >= displayGenres.length - visibleCount} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-10">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}