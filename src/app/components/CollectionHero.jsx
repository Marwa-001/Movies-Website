"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CollectionHero({ collections }) {
  const [current, setCurrent] = useState(1); // default: 2nd image focused

  // Auto-cycle the "popped out" focus every 4 seconds
  useEffect(() => {
    if (!collections || collections.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collections.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [collections?.length]);

  // Safety checks
  if (!collections || collections.length === 0) {
    return <div className="h-[500px] w-full bg-[#05070a] animate-pulse rounded-[32px] mb-12" />;
  }

  const item = collections[current];

  if (!item || !item.imageSrc) {
    return <div className="h-[500px] w-full bg-[#05070a] animate-pulse rounded-[32px] mb-12" />;
  }

  return (
    <section className="relative w-full h-[600px] rounded-[32px] overflow-hidden mb-12 flex flex-col justify-center px-12 lg:px-24">
      
      {/* Background Image with Hero Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover object-top transition-opacity duration-1000"
          priority
        />
        {/* Gradients matching your Hero component */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
      </div>

      {/* Content Area - Styled like Hero */}
      <div className="relative z-10 w-full max-w-xl">
        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-2xl">
          {item.title} Collection
        </h1>

        <p className="text-gray-300 text-lg mb-8 opacity-90 line-clamp-3 leading-relaxed">
          Experience the complete cinematic journey of {item.title}. From the origins to the 
          epic conclusion, witness the story that defined a generation.
        </p>

        {/* Rating Row from Hero */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                style={{
                  backgroundColor: '#E5DB22D6',
                  WebkitMaskImage: 'url(/assets/star.png)',
                  maskImage: 'url(/assets/star.png)',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  width: 18,
                  height: 18
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white font-bold border border-white/10">4K ULTRA HD</span>
          </div>
        </div>

        {/* Action Row from Hero */}
        <div className="flex items-center gap-4">
          <button className="bg-[#228EE5] hover:bg-blue-600 text-white rounded-full font-[500] text-[15px] transition-all flex items-center justify-center gap-2 w-[168px] h-[44px]">
            <img src='/assets/play.png' className='w-[14px] h-[14px]' alt="" /> 
            <span className="whitespace-nowrap">Watch Collection</span>
          </button>
          <button className="border border-white/40 hover:bg-white/10 text-white rounded-full font-[500] text-[15px] transition-all flex items-center justify-center gap-2 w-[128px] h-[44px]">
            <span className="whitespace-nowrap">More Info</span> 
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Carousel: 4 fixed thumbnails, the active one "pops out" with a glow */}
      <div className="absolute bottom-10 right-12 z-20 flex items-end gap-3">
        {collections.slice(0, 4).map((c, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={c.title ?? idx}
              onClick={() => setCurrent(idx)}
              className={`relative overflow-hidden rounded-[20px] cursor-pointer transition-all duration-500 ease-out ${
                isActive
                  ? "w-[150px] h-[150px] border-2 border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.5)] z-10 scale-105"
                  : "w-[100px] h-[100px] border border-white/10 opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={c.imageSrc} fill className="object-cover" alt="" />
              {!isActive && <div className="absolute inset-0 bg-black/30" />}
            </div>
          );
        })}
      </div>

    </section>
  );
}