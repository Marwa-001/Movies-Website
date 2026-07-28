"use client";

import React, { useState, useEffect } from "react";

// Using the same StarRow logic for visual consistency
function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="relative w-4 h-4 md:w-5 md:h-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#E5DB22D6",
              WebkitMaskImage: "url(/assets/star.png)",
              maskImage: "url(/assets/star.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        </div>
      ))}
    </div>
  );
}

const CollectionHero = ({ collections }) => {
  const [current, setCurrent] = useState(0);
  const hasData = collections && collections.length > 0;

  useEffect(() => {
    if (!hasData || collections.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasData, collections?.length]);

  if (!hasData) {
    return <div className="h-[500px] w-full bg-[var(--bg-page)] animate-pulse rounded-[32px] mb-12" />;
  }

  const active = collections[current];
  const order = collections;

  const goTo = (idx) => {
    setCurrent(idx);
  };

  return (
    <section className="relative w-full md:h-[624px] md:min-h-screen flex flex-col items-start justify-start md:justify-end px-0 md:px-12 lg:px-24 pb-0 md:pb-24 overflow-visible mb-12">
      
      {/* ===== MOBILE: image block (fully visible, in normal flow) ===== */}
      <div className="relative w-full aspect-[3/4] md:hidden">
        <img
          src={active.backdropSrc || active.imageSrc}
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent" />
      </div>

      {/* ===== DESKTOP: absolute background image ===== */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full z-0 bg-cover bg-center transition-[background-image] duration-700 md:rounded-[32px]"
        style={{ backgroundImage: `url('${active.backdropSrc || active.imageSrc}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/20 md:via-[var(--bg-page)]/10 to-transparent md:rounded-[32px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent md:rounded-[32px]" />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full md:w-[553px] mb-8 md:mb-0 flex flex-col items-start px-4 md:px-0">
        
        {/* Mobile Stacking Cards */}
        <div className="flex justify-center items-end mt-0 mb-2 md:hidden w-full">
          {order.map((item, idx) => {
            const isMain = idx === current;
            return (
              <div
                key={idx}
                onClick={() => goTo(idx)}
                className={`
                  ${isMain ? 'w-[74px] h-[100px] z-40 scale-110 border-2 border-[#228EE5] shadow-[0_0_20px_rgba(34,142,229,0.4)]' : 'w-[52px] h-[72px] border border-[var(--border-subtle)]'}
                  ${idx > 0 ? '-ml-4' : ''}
                  ${isMain ? 'z-40' : 'z-20'}
                  rounded-[12px] overflow-hidden transition-all duration-500 cursor-pointer relative
                `}
              >
                <img src={item.imageSrc} className="w-full h-full object-cover" alt="" />
              </div>
            );
          })}
        </div>

        {/* Heading */}
        <h1 className="text-[48px] font-bold md:font-normal tracking-tight mb-2 md:mb-2 drop-shadow-2xl leading-tight md:leading-none">
          {active.title} <span className="md:block lg:inline">Collection</span>
        </h1>

        {/* Paragraph */}
        <p className="text-[12px] font-bold md:text-[16px] md:font-medium text-[var(--text-secondary)] max-w-xl mb-6 md:mb-6 opacity-90 line-clamp-3">
          Experience the complete cinematic journey of {active.title}. From the origins to the epic conclusion, witness the story that defined a generation.
        </p>

        {/* Info Row */}
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-6 scale-90 md:scale-100 origin-left">
          <StarRow />
          <div className="flex items-center gap-2 md:gap-3">
            <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] md:text-[12px] text-[var(--text-primary)] font-bold border border-white/10 whitespace-nowrap">
              4K ULTRA HD
            </span>
          </div>
          <img src="/assets/netflix.png" alt="Netflix" className="object-contain w-[40px] md:w-[53.57px]" />
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-3 pb-8 md:pb-0">
          <button className="bg-[#228EE5] hover:bg-blue-600 rounded-full font-bold md:font-[500] text-[14px] md:text-[16px] transition-all flex items-center justify-center gap-2 w-[150px] h-[32px] md:w-[190px] md:h-[40px]">
            <img src='/assets/play.png' className='w-3 h-3 md:w-[16px] md:h-[16px]' alt="" />
            <span className="whitespace-nowrap">Watch Collection</span>
          </button>
          <button className="border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-full font-bold md:font-[500] text-[14px] md:text-[16px] transition-all flex items-center justify-center gap-2 w-[128px] h-[32px] md:w-[128px] md:h-[40px]">
            <span className="whitespace-nowrap">More Info</span> <span>→</span>
          </button>
        </div>
      </div>

      {/* Desktop Stacking Cards */}
      <div className="hidden md:flex absolute bottom-8 right-12 z-20 items-end">
        {order.map((item, idx) => {
          const isMain = idx === current;
          return (
            <div
              key={idx}
              onClick={() => goTo(idx)}
              className={`
                ${isMain ? 'w-[174px] h-[174px] z-40 scale-105 border-1 border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.4)] -ml-12' : 'w-[122px] h-[122px] border border-[var(--border-subtle)] opacity-50'}
                ${idx > 0 ? '-ml-10' : ''}
                ${isMain ? 'z-40' : 'z-20'}
                rounded-[20px] overflow-hidden transition-all duration-500 cursor-pointer relative hover:scale-110
              `}
            >
              <img src={item.imageSrc} className="w-full h-full object-cover" alt="" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CollectionHero;