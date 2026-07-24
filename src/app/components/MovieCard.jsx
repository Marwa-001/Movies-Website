"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useId, useState, useEffect } from "react";

export default function MovieCard({ id, title, imageSrc, onAdd, priority = false, href }) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};
  const maskId = useId().replace(/:/g, "");
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cardW = isMobile ? 150 : 208;
  const cardH = isMobile ? 214 : 296;
  const btnS = isMobile ? 28 : 56; 
  const gap = isMobile ? 4 : 8;
  const cutout = btnS + gap;
  const outerR = isMobile ? 12 : 16;
  const btnR = isMobile ? 6 : 12; 
  const innerR = isMobile ? 6 : 12;

  return (
    <Wrapper
      {...wrapperProps}
      className="group relative w-[150px] h-[214px] md:w-[208px] md:h-[296px] flex-shrink-0 bg-[#020617] rounded-[12px] md:rounded-[16px] cursor-pointer block"
    >
      <svg width="0" height="0" className="absolute" viewBox={`0 0 ${cardW} ${cardH}`}>
        <defs>
          <clipPath id={maskId} clipPathUnits="userSpaceOnUse">
            {/* 1. THE ISLAND */}
            <path d={`
              M ${outerR},0 
              H ${btnS - btnR} 
              A ${btnR} ${btnR} 0 0 1 ${btnS} ${btnR} 
              V ${btnS - btnR} 
              A ${btnR} ${btnR} 0 0 1 ${btnS - btnR} ${btnS} 
              H ${btnR} 
              A ${btnR} ${btnR} 0 0 1 0 ${btnS - btnR} 
              V ${outerR} 
              A ${outerR} ${outerR} 0 0 1 ${outerR} 0 
              Z
            `} />
            {/* 2. MAIN POSTER BODY */}
            <path d={`
              M ${cutout + innerR}, 0 
              H ${cardW - outerR} 
              A ${outerR} ${outerR} 0 0 1 ${cardW} ${outerR} 
              V ${cardH - outerR} 
              A ${outerR} ${outerR} 0 0 1 ${cardW - outerR} ${cardH} 
              H ${outerR} 
              A ${outerR} ${outerR} 0 0 1 0 ${cardH - outerR} 
              V ${cutout + innerR} 
              A ${innerR} ${innerR} 0 0 1 ${innerR} ${cutout} 
              H ${cutout - innerR} 
              A ${innerR} ${innerR} 0 0 0 ${cutout} ${cutout - innerR} 
              V ${innerR} 
              A ${innerR} ${innerR} 0 0 1 ${cutout + innerR} 0 
              Z
            `} />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `url(#${maskId})` }}>
        <Image src={imageSrc} alt={title} fill priority={priority} sizes="(max-width: 768px) 150px, 208px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>
      
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd?.(id); }}
        className="absolute left-0 top-0 z-30 flex h-[28px] w-[28px] md:h-[56px] md:w-[56px] items-center justify-center 
                   rounded-[6px] md:rounded-[12px] border border-white/10
                   bg-gradient-to-b from-black/50 to-black/20 backdrop-blur-[5px] transition-all"
      >
        <Plus className="h-4 w-4 md:h-8 md:w-8 text-white" strokeWidth={3} />
      </button>

      <div className="absolute bottom-3 md:bottom-4 left-0 right-0 text-center px-2 pointer-events-none">
         <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] text-white/90 uppercase drop-shadow-md">
           {title}
         </span>
      </div>
    </Wrapper>
  );
}