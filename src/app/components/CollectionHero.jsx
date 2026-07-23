"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CollectionHero({ collections }) {
  const [current, setCurrent] = useState(0);

  // Auto-cycle every 5 seconds (matching Hero)
  useEffect(() => {
    if (!collections || collections.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [collections?.length]);

  // Safety checks
  if (!collections || collections.length === 0) {
    return <div className="h-[500px] w-full bg-[#05070a] animate-pulse rounded-[32px] mb-12" />;
  }

  const active = collections[current];

  // Logic to determine which images show in which overlapping slot
  // This matches your Hero component's logic perfectly
  const order = [
    collections[(current + collections.length - 1) % collections.length], // Slot 1 (Left)
    collections[current],                                               // Slot 2 (Focused)
    collections[(current + 1) % collections.length],                   // Slot 3 (Right 1)
    collections[(current + 2) % collections.length],                   // Slot 4 (Right 2)
  ];

  const goTo = (offset) => {
    setCurrent((prev) => (prev + offset + collections.length) % collections.length);
  };

  return (
    <section className="relative w-full h-[600px] rounded-[32px] overflow-hidden mb-12 flex flex-col justify-center px-12 lg:px-24">
      
      {/* Background Image with Hero Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={active.imageSrc || null} // Passing null fixes the console error
          alt={active.title || "Collection"}
          fill
          className="object-cover object-top transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 w-full max-w-xl">
        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-2xl">
          {active.title} Collection
        </h1>

        <p className="text-gray-300 text-lg mb-8 opacity-90 line-clamp-3 leading-relaxed">
          Experience the complete cinematic journey of {active.title}. From the origins to the 
          epic conclusion, witness the story that defined a generation.
        </p>

        {/* Rating Row */}
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

        {/* Action Row */}
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

      {/* STACKED CARDS CONTAINER — Exact styling from Hero */}
      <div className="absolute bottom-8 right-12 z-20 flex items-end">
        
        {/* Card 1 (Left - Small) */}
        <div
          onClick={() => goTo(-1)}
          className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 transition-all hover:scale-105 cursor-pointer relative z-10"
        >
          {order[0]?.imageSrc && (
            <Image src={order[0].imageSrc} fill className="object-cover" alt="" />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Card 2 (Main Focused Card) */}
        <div className="w-[174px] h-[174px] rounded-[20px] overflow-hidden border border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.4)] relative z-40 -ml-12 scale-105 transition-transform hover:scale-110 cursor-pointer">
          {order[1]?.imageSrc && (
            <Image src={order[1].imageSrc} fill className="object-cover" alt="" />
          )}
        </div>

        {/* Card 3 (Overlapped) */}
        <div
          onClick={() => goTo(1)}
          className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 relative z-30 -ml-10 transition-all hover:scale-105 cursor-pointer"
        >
          {order[2]?.imageSrc && (
            <Image src={order[2].imageSrc} fill className="object-cover" alt="" />
          )}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Card 4 (Far Right) */}
        <div
          onClick={() => goTo(2)}
          className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 relative z-20 -ml-10 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-pointer"
        >
          {order[3]?.imageSrc && (
            <Image src={order[3].imageSrc} fill className="object-cover" alt="" />
          )}
        </div>
      </div>

    </section>
  );
}