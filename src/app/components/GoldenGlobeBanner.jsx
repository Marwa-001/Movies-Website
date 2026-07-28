"use client";

import Image from "next/image";

export default function GoldenGlobeBanner() {
  return (
    /*
      MAIN CONTAINER
      container-type: inline-size turns this element into a query container,
      so every child below can be sized in `cqw` (1cqw = 1% of THIS element's
      width). Combined with the locked aspect-[1440/576], that gives us
      continuous, pixel-accurate scaling that exactly matches the Figma frame
      at every viewport width — no breakpoint jump between mobile/desktop,
      because the actual design doesn't have two different layouts.
    */
    <div
      className="relative w-full max-w-[1440px] mx-auto overflow-hidden bg-[var(--bg-page)] aspect-[1440/576] max-h-[576px] min-h-[180px] [container-type:inline-size]"
    >
      {/* 1. THE YELLOW BACKGROUND FLOOR */}
      <div className="absolute inset-0 bg-[#DAA521] overflow-hidden">
        {/* Top / bottom blend into the page background */}
        <div className="absolute top-0 left-0 right-0 h-[4%] bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/70 to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[4%] bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/70 to-transparent z-20" />

        {/* 2. LOGO — Figma: left 42, top 101, w 639, h 402 (of 1440x576) */}
        <div
          className="absolute z-10 left-[2.9167cqw] top-[7.014cqw] w-[44.375cqw] h-[27.917cqw]"
        >
          <Image
            src="/assets/golden-globe-1.png"
            alt="Golden Globe Awards"
            fill
            sizes="45vw"
            className="object-contain object-left"
            priority
          />
        </div>

        {/* 3. MOVIE POSTERS — Figma: left 644, top 105, w 827, h 386 */}
        <div
          className="absolute z-10 left-[44.722cqw] top-[7.292cqw] w-[57.431cqw] h-[26.806cqw]"
        >
          <Image
            src="/assets/golden-globe-2.png"
            alt="Movie Posters"
            fill
            sizes="58vw"
            className="object-cover rounded-sm"
            priority
          />
          {/* Internal yellow blend — merges posters into the gold side */}
          <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#DAA521] via-[#DAA521]/80 to-transparent" />
        </div>
      </div>

      {/* 4. THE PILL BUTTON — Figma: w 970, h 120, containing 799x58 text */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[1.667cqw] z-30 w-[67.361cqw] h-[8.333cqw] min-w-[150px] min-h-[24px] rounded-full border border-[#EBFAFF] bg-gradient-to-b from-black/80 to-black/40 flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Subtle grain overlay, matching the 10%-opacity noisy-background layer in Figma */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay"
          aria-hidden="true"
        >
          <filter id="goldenGlobeNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#goldenGlobeNoise)" />
        </svg>

        <h2
          className="relative w-[55.486cqw] h-[4.028cqw] flex items-center justify-center text-[#EBFAFF] text-[3.333cqw] font-bold tracking-normal text-center leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          Watching Golden Globe 2024 Movies
        </h2>
      </div>
    </div>
  );
}