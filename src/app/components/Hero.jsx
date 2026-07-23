"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useTrending } from '@/hooks/useTrending';

const FALLBACK = {
  title: 'The Witcher',
  overview:
    'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
  backdropSrc: "/assets/hero banner.png",
  imageSrc: '/assets/2.png',
  voteAverage: 8.1,
};
const FALLBACK_THUMBS = ['/assets/1.png', '/assets/2.png', '/assets/3.png', '/assets/4.png'];

function StarRow({ rating = 0 }) {
  // rating comes in on TMDB's 0-10 scale; render as 5 stars, proportionally filled.
  const stars = rating / 2;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, stars - i)) * 100;
        return (
          <div key={i} className="relative w-5 h-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                WebkitMaskImage: 'url(/assets/star.png)',
                maskImage: 'url(/assets/star.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: '#E5DB22D6',
                WebkitMaskImage: 'url(/assets/star.png)',
                maskImage: 'url(/assets/star.png)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                clipPath: `inset(0 ${100 - fill}% 0 0)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

const Hero = () => {
  // Pull 4 trending titles to drive the carousel — no assumption made about
  // whether they're "popular", "top rated", etc.; trending/week is a good
  // general-purpose "what's hot right now" feed for a movie site's hero.
  const { data: trending } = useTrending({ mediaType: 'movie', timeWindow: 'week' });
  const features = (trending || []).slice(0, 4);
  const hasData = features.length >= 4;

  const [current, setCurrent] = useState(1); // default: 2nd title focused

  useEffect(() => {
    if (!hasData) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasData, features.length]);

  // Active title driving the background/title/description/rating.
  const active = hasData ? features[current] : FALLBACK;

  // Rotate the 4 items so the "current" one always lands in the enlarged,
  // focused slot (position 2) — the per-slot styling below never changes,
  // only which image occupies each slot.
  const order = hasData
    ? [
        features[(current + features.length - 1) % features.length],
        features[current],
        features[(current + 1) % features.length],
        features[(current + 2) % features.length],
      ]
    : FALLBACK_THUMBS.map((src) => ({ imageSrc: src, title: 'Featured title' }));

  const goTo = (offset) => {
    if (!hasData) return;
    setCurrent((prev) => (prev + offset + features.length) % features.length);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-start justify-center px-12 lg:px-24 overflow-visible">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-[background-image] duration-700"
        style={{ backgroundImage: `url('${active.backdropSrc || active.imageSrc}')` }}
      >
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent" />
      </div>

      <Navbar />

      {/* Content Area */}
      <div className="relative z-10 mt-80 w-[553px]">
        {/* HEADING 1 (96pt from style guide) */}
        <h1 className="tracking-tight mb-4 drop-shadow-2xl">
          {active.title}
        </h1>

        {/* PARAGRAPH (16pt Medium from style guide) */}
        <p className="p-medium text-[var(--text-secondary)] max-w-xl mb-10 opacity-90 line-clamp-3">
          {active.overview || FALLBACK.overview}
        </p>

        <div className="flex items-center gap-6 mb-10">
          {/* Stars Container */}
          <StarRow rating={active.voteAverage} />

          {/* IMDb Section */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/imdb.png"
              alt="IMDb"
              className="h-[20px] w-[37px] object-cover object-left"
            />
            <span className="text-[var(--text-primary)] text-[16px] font-medium leading-none">
              {active.voteAverage ? active.voteAverage.toFixed(1) : FALLBACK.voteAverage}
            </span>
          </div>

          {/* Netflix Logo */}
          <img
            src="/assets/netflix.png"
            alt="Netflix"
            className="object-contain w-[53.57] h-[14.03]"
          />
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-2">
          <button className="bg-[#228EE5] hover:bg-blue-600 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 w-[168px] h-[40px] flex justify-center">
            <img src='/assets/play.png' className='w-[16px] h-[16px]' alt="" /> <span style={{ whiteSpace: 'nowrap' }}> Whatch Movie</span>
          </button>
          <button className="border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 w-[128px] h-[40px]  flex justify-center">
            <span style={{ whiteSpace: 'nowrap' }}>More Info</span> <span>→</span>
          </button>
        </div>
      </div>

      {/* Stacking Cards Container — exact original styling; images swap per slot */}
      <div className="absolute bottom-8 right-12 z-20 flex items-end">

        {/* Card 1 (Left) */}
        <div
          onClick={() => goTo(-1)}
          className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-[var(--border-subtle)] transition-all hover:scale-105 cursor-pointer relative z-10"
        >
          <img
            src={order[0].imageSrc}
            className="w-full h-full object-cover"
            alt={order[0].title}
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Slight dimming */}
        </div>

        {/* Card 2 (Main Focused Card) */}
        <div className="w-[174px] h-[174px] rounded-[20px] overflow-hidden border-1 border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.4)] relative z-40 -ml-12 scale-105 transition-transform hover:scale-110 cursor-pointer">
          <img
            src={order[1].imageSrc}
            className="w-full h-full object-cover"
            alt={order[1].title}
          />
        </div>

        {/* Card 3 (Overlapped) */}
        <div
          onClick={() => goTo(1)}
         className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-[var(--border-subtle)] relative z-30 -ml-10 transition-all hover:scale-105 cursor-pointer"
        >
          <img
            src={order[2].imageSrc}
            className="w-full h-full object-cover"
            alt={order[2].title}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Card 4 (Far Right) */}
        <div
          onClick={() => goTo(2)}
          className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-[var(--border-subtle)] relative z-20 -ml-10 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          <img
            src={order[3].imageSrc}
            className="w-full h-full object-cover"
            alt={order[3].title}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
