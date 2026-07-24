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
  const stars = rating / 2;
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, stars - i)) * 100;
        return (
          <div key={i} className="relative w-4 h-4 md:w-5 md:h-5">
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
  const { data: trending } = useTrending({ mediaType: 'movie', timeWindow: 'week' });
  const features = (trending || []).slice(0, 4);
  const hasData = features.length >= 4;

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!hasData) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasData, features.length]);

  const active = hasData ? features[current] : FALLBACK;

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
    <section className="relative w-full h-[624px] md:min-h-screen flex flex-col items-start justify-end md:justify-center px-4 md:px-12 lg:px-24 overflow-hidden md:overflow-visible">
      <div
        className="absolute w-[756px] h-[447px] left-[-241px] top-[-5px] md:inset-0 md:w-full md:h-full md:left-0 md:top-0 z-0 bg-cover bg-center transition-[background-image] duration-700"
        style={{ backgroundImage: `url('${active.backdropSrc || active.imageSrc}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/20 md:via-[var(--bg-page)]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 w-full md:w-[553px] mb-8 md:mb-0 md:mt-80 flex flex-col items-start">
        
        {/* Mobile Stacking Cards (Centered) */}
        <div className="flex justify-center items-end mb-8 md:hidden w-full">
          {order.map((item, idx) => {
            const isMain = idx === 1;
            return (
              <div
                key={idx}
                onClick={() => idx !== 1 && goTo(idx - 1)}
                className={`
                  ${isMain ? 'w-[74px] h-[100px] z-40 scale-110 border-2 border-[#228EE5] shadow-[0_0_20px_rgba(34,142,229,0.4)]' : 'w-[52px] h-[72px] border border-[var(--border-subtle)]'}
                  ${idx > 0 ? '-ml-4' : ''}
                  ${idx === 0 ? 'z-10' : idx === 2 ? 'z-30' : 'z-20 opacity-60'}
                  rounded-[12px] overflow-hidden transition-all cursor-pointer relative
                `}
              >
                <img src={item.imageSrc} className="w-full h-full object-cover" alt="" />
                {idx === 0 && <div className="absolute inset-0 bg-black/30" />}
                {idx === 2 && <div className="absolute inset-0 bg-black/10" />}
              </div>
            );
          })}
        </div>

        {/* Heading */}
        <h1 className="text-[48px] font-bold md:text-[96px] md:font-normal tracking-tight mb-2 md:mb-4 drop-shadow-2xl leading-[1.1] md:leading-normal">
          {active.title}
        </h1>

        {/* Paragraph */}
        <p className="text-[12px] font-bold md:text-[16px] md:font-medium text-[var(--text-secondary)] max-w-xl mb-6 md:mb-10 opacity-90 line-clamp-3">
          {active.overview || FALLBACK.overview}
        </p>

        {/* Info Row */}
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10 scale-90 md:scale-100 origin-left">
          <StarRow rating={active.voteAverage} />
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/assets/imdb.png" alt="IMDb" className="h-[16px] md:h-[20px] w-auto object-contain" />
            <span className="text-[var(--text-primary)] text-[14px] md:text-[16px] font-bold md:font-medium leading-none">
              {active.voteAverage ? active.voteAverage.toFixed(1) : FALLBACK.voteAverage}
            </span>
          </div>
          <img src="/assets/netflix.png" alt="Netflix" className="object-contain w-[40px] md:w-[53.57px]" />
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-3">
          <button className="bg-[#228EE5] hover:bg-blue-600 rounded-full font-bold md:font-[500] text-[14px] md:text-[16px] transition-all flex items-center justify-center gap-2 w-[128px] h-[32px] md:w-[168px] md:h-[40px]">
            <img src='/assets/play.png' className='w-3 h-3 md:w-[16px] md:h-[16px]' alt="" /> 
            <span className="whitespace-nowrap">Watch Movie</span>
          </button>
          <button className="border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-full font-bold md:font-[500] text-[14px] md:text-[16px] transition-all flex items-center justify-center gap-2 w-[128px] h-[32px] md:w-[128px] md:h-[40px]">
            <span className="whitespace-nowrap">More Info</span> <span>→</span>
          </button>
        </div>
      </div>

      {/* Desktop Stacking Cards  */}
       <div className="hidden md:flex absolute bottom-8 right-12 z-20 items-end">
        {order.map((item, idx) => {
          const isMain = idx === 1;
          return (
            <div
              key={idx}
              onClick={() => idx !== 1 && goTo(idx - 1)}
              className={`
                ${isMain ? 'w-[174px] h-[174px] z-40 scale-105 border-1 border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.4)] -ml-12' : 'w-[122px] h-[122px] border border-[var(--border-subtle)]'}
                ${idx > 1 ? '-ml-10' : ''}
                ${idx === 0 ? 'z-10' : idx === 2 ? 'z-30' : 'z-20 opacity-60'}
                rounded-[20px] overflow-hidden transition-all cursor-pointer relative hover:scale-110
              `}
            >
              <img src={item.imageSrc} className="w-full h-full object-cover" alt="" />
              {idx === 0 && <div className="absolute inset-0 bg-black/30" />}
              {idx === 2 && <div className="absolute inset-0 bg-black/10" />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;