"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft,
  Share2,
  PictureInPicture2,
  SlidersHorizontal,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  RotateCw,
} from "lucide-react";

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

let youtubeApiPromise = null;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
  return youtubeApiPromise;
}

export default function VideoPlayer({ title, youtubeId, thumbnail, initialTime = 0, onBack, onTimeUpdate }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);
  const hasSeekedToInitial = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hoverPercent, setHoverPercent] = useState(null);

  useEffect(() => {
    let destroyed = false;
    loadYouTubeApi().then((YT) => {
      if (destroyed || !YT) return;
      playerRef.current = new YT.Player(`yt-player-${youtubeId}`, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            setDuration(e.target.getDuration());
            if (initialTime > 0 && !hasSeekedToInitial.current) {
              e.target.seekTo(initialTime, true);
              hasSeekedToInitial.current = true;
            }
            e.target.playVideo();
          },
          onStateChange: (e) => setIsPlaying(e.data === 1),
        },
      });
    });
    return () => {
      destroyed = true;
      clearInterval(progressIntervalRef.current);
      playerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [youtubeId]);

  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        const t = playerRef.current.getCurrentTime();
        const d = playerRef.current.getDuration();
        setCurrentTime(t);
        if (d) setDuration(d);
        onTimeUpdate?.(t, d);
      }
    }, 5000);
    return () => clearInterval(progressIntervalRef.current);
  }, [onTimeUpdate]);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimeoutRef.current);
    hideControlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetHideTimer();
    return () => clearTimeout(hideControlsTimeoutRef.current);
  }, [isPlaying, resetHideTimer]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const skip = (seconds) => {
    if (!playerRef.current) return;
    const t = Math.max(0, Math.min(duration, playerRef.current.getCurrentTime() + seconds));
    playerRef.current.seekTo(t, true);
    setCurrentTime(t);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const t = percent * duration;
    playerRef.current?.seekTo(t, true);
    setCurrentTime(t);
  };

  const handleSeekHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHoverPercent(percent);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Flush progress once when the player unmounts (navigating away, closing tab via back button)
  useEffect(() => {
    return () => {
      if (playerRef.current?.getCurrentTime) {
        onTimeUpdate?.(playerRef.current.getCurrentTime(), playerRef.current.getDuration());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const hoverTime = hoverPercent !== null ? hoverPercent * duration : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetHideTimer}
      className="relative w-full max-w-[960px] aspect-video rounded-[16px] overflow-hidden bg-black shadow-2xl select-none"
    >
      <div id={`yt-player-${youtubeId}`} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

      <div
        className={`absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPlaying ? "Playing" : "Paused"}
      </div>

      <div
        className={`absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-48px)] flex items-center justify-between px-5 py-3 rounded-2xl bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button type="button" onClick={onBack} className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-[15px] font-medium">{title}</span>
        </button>

        <div className="flex items-center gap-5 text-white/80">
          <button type="button" className="hover:text-white transition-colors"><Share2 className="h-5 w-5" /></button>
          <button type="button" className="hover:text-white transition-colors"><PictureInPicture2 className="h-5 w-5" /></button>
          <button type="button" className="hover:text-white transition-colors"><SlidersHorizontal className="h-5 w-5" /></button>
          <button type="button" className="hover:text-white transition-colors"><Settings className="h-5 w-5" /></button>
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 flex items-center justify-center gap-10 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button type="button" onClick={(e) => { e.stopPropagation(); skip(-10); }} className="relative flex items-center justify-center h-11 w-11 text-[#228EE5] hover:scale-110 transition-transform">
          <RotateCcw className="h-11 w-11" strokeWidth={1.5} />
          <span className="absolute text-[11px] font-bold">10</span>
        </button>

        <button type="button" onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="flex items-center justify-center h-16 w-16 rounded-full bg-[#228EE5]/90 hover:bg-[#228EE5] transition-colors shadow-[0_0_30px_rgba(34,142,229,0.5)]">
          {isPlaying ? <Pause className="h-7 w-7 text-white" fill="white" /> : <Play className="h-7 w-7 text-white ml-1" fill="white" />}
        </button>

        <button type="button" onClick={(e) => { e.stopPropagation(); skip(10); }} className="relative flex items-center justify-center h-11 w-11 text-[#228EE5] hover:scale-110 transition-transform">
          <RotateCw className="h-11 w-11" strokeWidth={1.5} />
          <span className="absolute text-[11px] font-bold">10</span>
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 z-20 px-6 pb-5 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {hoverPercent !== null && (
          <div className="absolute bottom-16 flex flex-col items-center" style={{ left: `calc(${hoverPercent * 100}% - 60px)` }}>
            <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border-2 border-[#228EE5] shadow-xl">
              {thumbnail && <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />}
            </div>
            <span className="mt-1 text-[11px] font-semibold text-white bg-black/70 px-2 py-0.5 rounded">
              {formatTime(hoverTime)}
            </span>
          </div>
        )}

        <div
          className="relative h-1.5 w-full rounded-full bg-white/20 cursor-pointer group"
          onClick={(e) => { e.stopPropagation(); handleSeekClick(e); }}
          onMouseMove={(e) => { e.stopPropagation(); handleSeekHover(e); }}
          onMouseLeave={() => setHoverPercent(null)}
        >
          <div className="absolute top-0 left-0 h-full rounded-full bg-[#228EE5]" style={{ width: `${progressPercent}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#228EE5] shadow-[0_0_8px_rgba(34,142,229,0.8)] transition-transform group-hover:scale-125"
            style={{ left: `calc(${progressPercent}% - 7px)` }}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-white">
            <button type="button" onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="hover:opacity-80 transition-opacity">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <span className="text-[13px] font-medium tabular-nums">{formatTime(currentTime)}</span>
          </div>

          <div className="flex items-center gap-3 text-white">
            <span className="text-[13px] font-medium tabular-nums">{formatTime(duration)}</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="hover:opacity-80 transition-opacity">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}