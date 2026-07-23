"use client";
import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";

const continueData = [
  { id: 1, title: "Godzilla Minus One", progress: 75, img: "/assets/godzilla.jpg" },
  { id: 2, title: "Kung Fu Panda", progress: 40, img: "/assets/panda.jpg" },
  { id: 3, title: "Killers of the Flower Moon", progress: 10, img: "/assets/killers.jpg" },
];

export function ContinueWatching() {
  return (
    <section className="py-8 px-12 lg:px-24 bg-[#050514]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Continue watching</h2>
        <button className="flex items-center gap-1 text-[#228EE5] hover:text-blue-400 font-medium transition-colors">
          See More <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {continueData.map((item) => (
          <div key={item.id} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-2xl">
            {/* Image backdrop */}
            <Image 
              src={item.img} 
              alt={item.title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#E5228E] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1 w-5 h-5" />
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <span className="text-white font-medium drop-shadow-md">{item.title}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20">
              {/* Pink Progress Line */}
              <div 
                className="h-full bg-[#E5228E] transition-all duration-300" 
                style={{ width: `${item.progress}%` }}
              />
              {/* Circular Thumb at end of progress */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#E5228E] rounded-full shadow-[0_0_8px_#E5228E]"
                style={{ left: `calc(${item.progress}% - 4px)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}