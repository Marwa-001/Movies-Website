"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

/**
 * Three-layer poster stack. Back two layers stay static (depth effect);
 * the front layer cycles through `images` on hover (desktop) or tap (mobile).
 * Layer surfaces use theme CSS vars so they're visible in both dark and light mode.
 */
export default function StackedCollectionCard({ title, images = [], imageSrc, size = "default" }) {
  const gallery = images.length > 0 ? images : [imageSrc].filter(Boolean);
  const [frontIndex, setFrontIndex] = useState(0);
  const intervalRef = useRef(null);

  const startCycle = useCallback(() => {
    if (gallery.length < 2) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFrontIndex((i) => (i + 1) % gallery.length);
    }, 700);
  }, [gallery.length]);

  const stopCycle = useCallback(() => {
    clearInterval(intervalRef.current);
    setFrontIndex(0);
  }, []);

  const isMobileSize = size === "mobile";

  const containerClass = isMobileSize
    ? "relative w-[152px] h-[210px]"
    : "relative w-[236px] h-[324px]";

  const backClass = isMobileSize
    ? "absolute bottom-0 right-0 w-[134px] h-[192px] rounded-[10px]"
    : "absolute bottom-0 right-0 w-[208px] h-[296px] rounded-[12px]";

  const midClass = isMobileSize
    ? "absolute top-[9px] right-[9px] w-[134px] h-[192px] rounded-[10px]"
    : "absolute top-[14px] right-[14px] w-[208px] h-[296px] rounded-[12px]";

  const frontClass = isMobileSize
    ? "absolute top-0 left-0 w-[134px] h-[192px] rounded-[10px]"
    : "absolute top-0 left-0 w-[208px] h-[296px] rounded-[12px]";

  const titleClass = isMobileSize ? "text-[18px]" : "text-[32px]";

  return (
    <div
      className={`${containerClass} group cursor-pointer transition-transform duration-300 hover:-translate-y-2`}
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      onTouchStart={startCycle}
      onTouchEnd={stopCycle}
    >
      {/* Back layer — theme-aware, always visible */}
      <div
        className={`${backClass} bg-[var(--bg-surface-strong)] border border-[var(--border-subtle)] shadow-md z-0`}
      />

      {/* Middle layer — theme-aware, always visible */}
      <div
        className={`${midClass} bg-[var(--bg-surface-strong)] border border-[var(--border-subtle)] shadow-lg z-10 overflow-hidden`}
      >
        {gallery[1] && (
          <Image src={gallery[1]} alt="" fill sizes="208px" className="object-cover opacity-70" />
        )}
      </div>

      {/* Front layer — cycles through images on hover/tap */}
      <div className={`${frontClass} overflow-hidden shadow-2xl border border-[var(--border-subtle)] z-20`}>
        {gallery[frontIndex] ? (
          <Image
            key={frontIndex}
            src={gallery[frontIndex]}
            alt={title}
            fill
            sizes={isMobileSize ? "134px" : "208px"}
            className="object-cover transition-opacity duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg-surface-strong)] animate-pulse" />
        )}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <h3
            className={`${titleClass} text-white font-bold text-center leading-tight tracking-tight drop-shadow-lg`}
          >
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}