"use client";

import Image from "next/image";

export default function GoldenGlobeBanner() {
  return (
    <div className="relative w-full max-w-[1400px] h-[450px] mx-auto overflow-hidden bg-black flex items-center">
      
      {/* 1. THE MAIN YELLOW CONTAINER */}
      {/* This acts as the floor. It has the top and bottom "blended" look via masks */}
      <div className="relative w-full h-full bg-[#DAA521] flex overflow-hidden">
        
        {/* TOP BLEND (Black to Transparent) */}
        <div className="absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-black to-transparent" />
        
        {/* BOTTOM BLEND (Transparent to Black) */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-black to-transparent" />

        {/* 2. LEFT IMAGE (Logo & Trophy) */}
        {/* "Inside yellow container not covering exact height" per your request */}
        <div className="relative w-1/2 h-full flex items-center justify-center p-12">
          <div className="relative w-full h-[70%]"> 
            <Image
              src="/assets/golden-globe-1.png"
              alt="Golden Globe Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 3. RIGHT IMAGE (Posters) */}
        <div className="relative w-1/2 h-full py-12">
          {/* THE IMAGE ITSELF */}
          <div className="relative w-full h-full">
             <Image
              src="/assets/golden-globe-2.png"
              alt="Golden Globe Posters"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* LEFT BLEND (Yellow fading into posters) */}
          {/* This creates the "blended yellow from the left side" effect */}
          <div className="absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-[#f1b229] via-[#f1b229]/50 to-transparent" />
        </div>
      </div>

      {/* 4. THE PILL BUTTON (Updated to Design Specs) */}
      <div className="absolute inset-x-0 bottom-10 z-30 flex justify-center px-4">
        <div 
          className="w-full max-w-[970px] h-[120px] rounded-full border border-[#EBFAFF] bg-gradient-to-b from-black/80 to-black/40 flex items-center justify-center shadow-2xl"
        >
          <h2 className="text-white text-2xl md:text-[48px] font-[700] tracking-tight text-center leading-none">
            Watching Golden Globe 2024 Movies
          </h2>
        </div>
      </div>
      
    </div>
  );
}