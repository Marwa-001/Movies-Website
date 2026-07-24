"use client";

import Image from "next/image";

export default function GoldenGlobeBanner() {
  return (
    /*
       MAIN CONTAINER
       Height scales fluidly with viewport width (via aspect-ratio) instead of
       jumping at the md breakpoint, so there's no dead zone between the
       mobile and desktop "fixed" layouts.
    */
    <div className="relative w-full max-w-[1440px] mx-auto overflow-hidden bg-[var(--bg-page)] aspect-[1440/576] max-h-[576px] min-h-[180px]">

      {/* 1. THE YELLOW BACKGROUND FLOOR */}
      <div className="absolute inset-0 bg-[#DAA521] overflow-hidden">

        {/* Top / bottom blend into the page background */}
        <div className="absolute top-0 left-0 right-0 h-[4%] bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/70 to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[4%] bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/70 to-transparent z-20" />

        {/*
          2 & 3. LOGO + POSTERS
          A flex row filling the whole floor keeps both pieces proportionally
          sized and positioned at every width, instead of absolute px offsets
          that only look right at the two extremes.
        */}
        <div className="relative z-10 flex items-center h-full w-full px-[4%]">
          {/* Golden Globe Logo */}
          <div className="relative shrink-0 w-[32%] md:w-[40%] aspect-[420/250]">
            <Image
              src="/assets/golden-globe-1.png"
              alt="Golden Globe Awards"
              fill
              sizes="(max-width: 768px) 32vw, 420px"
              className="object-contain"
              priority
            />
          </div>

          {/* Movie Posters */}
          <div className="relative flex-1 h-[75%] md:h-[75%] ml-[2%]">
            <Image
              src="/assets/golden-globe-2.png"
              alt="Movie Posters"
              fill
              sizes="(max-width: 768px) 55vw, 600px"
              className="object-cover rounded-sm"
              priority
            />
            {/* Internal Yellow Blend - Merges posters into the gold side */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#DAA521] via-[#DAA521]/80 to-transparent z-10" />
          </div>
        </div>
      </div>

      {/* 4. THE PILL BUTTON (glassmorphism styling unchanged) */}
       <div className="absolute inset-x-0 bottom-4 md:bottom-12 z-30 flex justify-center px-4">
        <div 
          className="w-[202px] h-[28px] md:w-full md:max-w-[970px] md:h-[120px] rounded-full border border-[#EBFAFF] bg-gradient-to-b from-black/80 to-black/40 flex items-center justify-center shadow-2xl transition-all"
        >
          <h2 className="text-[#EBFAFF] text-[10px] font-[500] md:text-[48px] md:font-[700] tracking-tight text-center leading-none whitespace-nowrap md:whitespace-normal">
            Watching Golden Globe 2024 Movies
          </h2>
        </div>
      </div>

    </div>
  );
}