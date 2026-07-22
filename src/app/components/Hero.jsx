"use client";

import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-start justify-center px-12 lg:px-24 overflow-visible">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero banner.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
      </div>

      <Navbar />

      {/* Content Area */}
      <div className="relative z-10 mt-80 w-[553px]">
        {/* HEADING 1 (96pt from style guide) */}
        <h1 className="tracking-tight mb-4 drop-shadow-2xl">
          The Witcher
        </h1>

        {/* PARAGRAPH (16pt Medium from style guide) */}
        <p className="p-medium text-gray-300 max-w-xl mb-10 opacity-90">
          Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny
          in a turbulent world where people often prove more wicked than beasts.
        </p>

        <div className="flex items-center gap-6 mb-10">
  {/* Stars Container */}
  <div className="flex items-center gap-1">
    {/* 4 Full Stars */}
    {[1, 2, 3, 4].map((star) => (
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
          width: 20,
          height: 20

        }}
        // className="w-6 h-6"
      />
    ))}

    {/* Half Star */}
    <div className="relative w-6 h-6 overflow-hidden">
      <div
        style={{
          backgroundColor: '#E5DB22D6',
          WebkitMaskImage: 'url(/assets/star.png)',
          maskImage: 'url(/assets/star.png)',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          clipPath: 'inset(0 50% 0 0)', // This cuts the colored mask in half
          width: 20,
          height: 20
        }}
        className="absolute top-0 left-0"
      />
    </div>
  </div>

  {/* IMDb Section */}
  <div className="flex items-center gap-3">
  <img 
    src="/assets/imdb.png" 
    alt="IMDb" 
    className="h-[20px] w-[37px] object-cover object-left" 
  />
  <span className="text-white text-[16px] font-medium leading-none">
    8.1
  </span>
</div>

  {/* Netflix Logo */}
  <img 
    src="/assets/netflix.png" 
    alt="Netflix" 
    className="object-contain w-[53.57] h-[14.03]" 
  />
</div>

        {/* Action Row */}
        <div className="flex items-center gap-2">
          <button className="bg-[#228EE5] hover:bg-blue-600 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 w-[168px] h-[40px] flex justify-center">
            <img src='/assets/play.png' className='w-[16px] h-[16px]' /> <span style={{ whiteSpace: 'nowrap' }}> Whatch Movie</span>
          </button>
          <button className="border border-white/40 hover:bg-white/10 px-10 py-4 rounded-full font-[500] text-[16px] transition-all flex items-center gap-2 w-[128px] h-[40px]  flex justify-center">
            <span style={{ whiteSpace: 'nowrap' }}>More Info</span> <span>→</span>
          </button>
        </div>
      </div>

      {/* Stacking Cards Container */}
<div className="absolute bottom-8 right-12 z-20 flex items-end">
  
  {/* Card 1 (Oppenheimer - Left) */}
  <div className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 transition-all hover:scale-105 cursor-pointer relative z-10">
    <img 
      src="/assets/1.png" 
      className="w-full h-full object-cover" 
      alt="Movie 1" 
    />
    <div className="absolute inset-0 bg-black/50" /> {/* Slight dimming */}
  </div>

  {/* Card 2 (The Witcher - Main Focused Card) */}
  <div className="w-[174px] h-[174px] rounded-[20px] overflow-hidden border-1 border-[#228EE5] shadow-[0_0_40px_rgba(34,142,229,0.4)] relative z-40 -ml-12 scale-105 transition-transform hover:scale-110 cursor-pointer">
    <img 
      src="/assets/2.png" 
      className="w-full h-full object-cover" 
      alt="Featured Witcher" 
    />
  </div>

  {/* Card 3 (Mission Impossible - Overlapped) */}
  <div className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 relative z-30 -ml-10 transition-all hover:scale-105 cursor-pointer">
    <img 
      src="/assets/3.png" 
      className="w-full h-full object-cover" 
      alt="Movie 3" 
    />
    <div className="absolute inset-0 bg-black/10" />
  </div>

  {/* Card 4 (Red Poster - Far Right) */}
  <div className="w-[122px] h-[122px] rounded-[20px] overflow-hidden border border-white/10 relative z-20 -ml-10 opacity-60 transition-all hover:opacity-100 hover:scale-105 cursor-pointer">
    <img 
      src="/assets/4.png" 
      className="w-full h-full object-cover" 
      alt="Movie 4" 
    />
  </div>
</div>
    </section>
  );
};

export default Hero;