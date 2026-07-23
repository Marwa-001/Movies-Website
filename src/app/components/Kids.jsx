"use client";

import React from "react";
import Image from "next/image";

const kidsContent = [
  {
    id: 1,
    character: "/assets/kids-pig.png", // Transparent PNG of character
    background: "/assets/kids-pig-bg.jpg", // The poster background
  },
  {
    id: 2,
    character: "/assets/kids-panda.png",
    background: "/assets/kids-panda-bg.jpg",
  },
  {
    id: 3,
    character: "/assets/kids-raya.png",
    background: "/assets/kids-raya-bg.jpg",
  },
];

export default function KidsSection() {
  return (
    <section className="relative bg-[#228EE5] py-20 px-6 overflow-hidden flex flex-col items-center">
      {/* Header Text */}
      <div className="text-center mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Family-friendly streaming
        </h2>
        <p className="text-white/90 text-sm md:text-base leading-relaxed px-4">
          create kids profile, set parental control, and choose rating levels.
          Easily find new favorites by sorting by characters and using age
          filters.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {/* Posters Row */}
        <div className="flex flex-row gap-4 md:gap-8 justify-center items-end">
          {kidsContent.map((item) => (
            <KidsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Reflection Row */}
        <div 
          className="flex flex-row gap-4 md:gap-8 justify-center items-start opacity-30 pointer-events-none select-none"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          }}
        >
          {kidsContent.map((item) => (
            <div key={`ref-${item.id}`} className="scale-y-[-1]">
               <KidsCard item={item} isReflection />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <button className="bg-[#05070a] hover:bg-black text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all shadow-2xl border border-white/5">
            Watch the children's section
          </button>
        </div>
      </div>
    </section>
  );
}

function KidsCard({ item, isReflection = false }) {
  return (
    <div className="relative w-28 h-40 md:w-64 md:h-80 group">
      {/* The Colored/Image Frame */}
      <div className="absolute bottom-0 w-full h-[85%] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-white/20">
        <Image
          src={item.background}
          alt="background"
          fill
          className="object-cover"
        />
      </div>

      {/* The "Pop-out" Character */}
      {/* We make this container taller than the frame and align to bottom */}
      <div className="absolute bottom-0 w-full h-[110%] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
        <Image
          src={item.character}
          alt="character"
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}