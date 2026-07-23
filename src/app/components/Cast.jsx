"use client";
import { useState } from "react";
import Image from "next/image";

const castData = [
  { id: 1, name: "Jason Momoa", img: "/assets/cast1.jpg" },
  { id: 2, name: "Dwayne Johnson", img: "/assets/cast2.jpg" },
  { id: 3, name: "Emma Watson", img: "/assets/cast3.jpg" },
  { id: 4, name: "Tom Holland", img: "/assets/cast4.jpg" },
  { id: 5, name: "Ana de Armas", img: "/assets/cast5.jpg" },
  { id: 6, name: "Keanu Reeves", img: "/assets/cast6.jpg" },
];

export function Cast() {
  const [role, setRole] = useState("Actors"); // 'Directors' or 'Actors'

  return (
    <section className="py-8 px-12 lg:px-24 bg-[var(--bg-page)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Characters</h2>

        {/* Custom Toggle Switch */}
        <div className="relative flex items-center bg-[#0a0c1a] border border-white/10 rounded-full p-1 w-44">
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#228EE5] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,142,229,0.4)] ${
              role === "Actors" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button 
            onClick={() => setRole("Directors")}
            className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors ${role === "Directors" ? "text-[var(--text-primary)]" : "text-gray-500"}`}
          >
            Directors
          </button>
          <button 
            onClick={() => setRole("Actors")}
            className={`relative z-10 flex-1 text-center text-xs font-semibold transition-colors ${role === "Actors" ? "text-[var(--text-primary)]" : "text-gray-500"}`}
          >
            Actors
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
        {castData.map((person) => (
          <div key={person.id} className="flex-shrink-0 group cursor-pointer">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#228EE5] transition-all shadow-xl">
              <Image 
                src={person.img || null} 
                alt={person.name} 
                fill 
                className="object-cover"
              />
            </div>
            {/* Optional Name on hover */}
            <p className="text-center text-gray-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              {person.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}