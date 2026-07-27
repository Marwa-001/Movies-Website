"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const kidsContent = [
  {
    id: 1,
    background: "/assets/kids1.png",
    mobile: { w: 76.74, h: 115.83 },
    desktop: { w: 230, h: 347 },
  },
  {
    id: 2,
    background: "/assets/kids2.png",
    mobile: { w: 111.56, h: 123.64 },
    desktop: { w: 335, h: 371 },
  },
  {
    id: 3,
    background: "/assets/kids3.png",
    mobile: { w: 142.12, h: 120.09 },
    desktop: { w: 426, h: 360 },
  },
];

export default function KidsSection() {
  const router = useRouter();

  return (
    <section 
      className={`${lato.className} relative bg-[#228EE5] pt-10 md:pt-20 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden flex flex-col items-center`}
    >
      {/* Header Text */}
      <div className="text-center mb-8 md:mb-10 max-w-[280px] md:max-w-4xl">
        <h2 className="text-[#EBFAFF] mb-2 md:mb-4 font-bold text-[20px] md:text-[48px] leading-none">
          Family-friendly streaming
        </h2>
        <p className="text-[#EBFAFF] font-medium text-[10px] md:text-[24px] leading-[1.2] md:leading-none tracking-normal">
          create kids profile, set parental control, and choose rating levels.
          Easily find new favorites by sorting by characters and using age
          filters.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-6xl flex flex-col items-center">
        
        {/* Posters Row */}
        <div className="flex flex-row gap-4 md:gap-8 justify-center items-end z-10">
          {kidsContent.map((item) => (
            <KidsCard key={item.id} item={item} />
          ))}
        </div>

        {/* Reflection Row - Height limited to cut section size */}
        <div
          className="flex flex-row gap-4 md:gap-8 justify-center items-start opacity-35 pointer-events-none select-none mt-1 h-[50px] md:h-[220px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          {kidsContent.map((item) => (
            <div key={`ref-${item.id}`} className="scale-y-[-1]">
              <KidsCard item={item} isReflection />
            </div>
          ))}
        </div>

        {/* Action Button - Positioned to overlap shadows */}
        <div className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
          <button
            type="button"
            onClick={() => router.push("/kids")}
            className={`
              bg-[#030A1B] text-[#EBFAFF] border border-[#EBFAFF] 
              flex items-center justify-center transition-all hover:scale-105 active:scale-95
              w-[150px] h-[24px] rounded-[8px] text-[10px] font-bold
              md:w-[429px] md:h-[61px] md:rounded-[12px] md:text-[24px]
            `}
          >
            Watch the children&apos;s section
          </button>
        </div>
      </div>
    </section>
  );
}

function KidsCard({ item, isReflection = false }) {
  return (
    <div
      className={`group relative transition-transform duration-500 w-[var(--card-mw)] h-[var(--card-mh)] md:w-[var(--card-dw)] md:h-[var(--card-dh)] ${
        !isReflection ? "hover:scale-105 hover:-translate-y-2" : ""
      }`}
      style={{
        "--card-mw": `${item.mobile.w}px`,
        "--card-mh": `${item.mobile.h}px`,
        "--card-dw": `${item.desktop.w}px`,
        "--card-dh": `${item.desktop.h}px`,
      }}
    >
      <div className="absolute left-[-6%] right-[-6%] top-[-8%] bottom-0 overflow-visible pointer-events-none">
        <Image
          src={item.background}
          alt="character"
          fill
          sizes="(max-width: 768px) 180px, 500px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}