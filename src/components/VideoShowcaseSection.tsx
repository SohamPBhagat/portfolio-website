'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';

const PLACEHOLDER_VIDEO_URL = '/videos/showcase.mp4';
const FALLBACK_POSTER_URL = '/images/forge-studio-canvas.png';

export default function VideoShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'canvas' | 'grid'>('video');

  // Master scroll progress for Section 3 pinning & generous scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Automatically sequence the 3 tabs as user scrolls through Section 3
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.35) {
      setActiveTab('video');
    } else if (latest < 0.70) {
      setActiveTab('canvas');
    } else {
      setActiveTab('grid');
    }
  });

  // Smooth 3D perspective scale & subtle elevation
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [6, 0, 0, -4]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.85, 1, 1, 0.85]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Direct DOM style update on progress bar (Zero React re-renders during playback)
  const handleTimeUpdate = () => {
    if (!videoRef.current || !progressBarRef.current) return;
    const duration = videoRef.current.duration;
    if (!duration || isNaN(duration)) return;
    const percent = (videoRef.current.currentTime / duration) * 100;
    progressBarRef.current.style.width = `${percent}%`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const totalDuration = videoRef.current.duration || 45;
    videoRef.current.currentTime = newProgress * totalDuration;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${newProgress * 100}%`;
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative z-10 w-full bg-[#F6F5F2] h-[240vh] border-t border-black/10"
    >
      {/* Subtle Architectural Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Viewport Stage: Locks the showcase in view to provide generous scroll time */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 overflow-hidden select-none"
        style={{ perspective: '1200px' }}
      >
        
        {/* Animated Centered Showcase Stage with 3D Physics */}
        <motion.div
          style={{ scale, opacity, rotateX, transformStyle: 'preserve-3d' }}
          className="w-full max-w-[1240px] mx-auto relative z-10 flex flex-col items-center will-change-transform"
        >
          
          {/* =====================================================================
              SECTION 3 MASTHEAD
              ===================================================================== */}
          <div className="w-full mb-5 sm:mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/10">
            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
                <span>03 // THE WORKBENCH & DEMO SHOWCASE</span>
              </div>
              <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
                Forge Studio ADE Workbench
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-sans text-neutral-600 text-xs sm:text-sm max-w-sm font-normal">
                Autonomous agent visual workbench with deterministic PTY sandboxes and real-time state telemetry.
              </p>
            </div>
          </div>

          {/* =====================================================================
              CENTERPIECE macOS SHOWCASE WINDOW
              ===================================================================== */}
          <div className="w-full aspect-[16/9] max-h-[70vh] min-h-[380px] sm:min-h-[430px] bg-[#0A0D15] rounded-2xl border border-black/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col relative">
            
            {/* Top Clean Control Bar */}
            <div className="h-12 sm:h-14 bg-[#07090F] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between select-none shrink-0 z-20">
              {/* Left Label: Clean DEMO */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-pulse" />
                <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.20em] text-white">
                  DEMO
                </span>
              </div>

              {/* Spacious Spring-Animated View Switcher Tabs */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#05070C] p-1.5 rounded-xl border border-white/10 text-xs sm:text-[13px] font-mono select-none relative shadow-inner">
                {(
                  [
                    { id: 'video', label: 'Demo Video' },
                    { id: 'canvas', label: 'Canvas Graph' },
                    { id: 'grid', label: 'Agent Grid' },
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors duration-200 cursor-pointer z-10 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeShowcaseTab"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          className="absolute inset-0 bg-[#FF3B1D] rounded-lg shadow-sm -z-10"
                        />
                      )}
                      <span className="tracking-wider">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Link */}
              <a
                href="https://www.forgeapi.org/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-emerald-400 hover:underline transition-opacity hover:opacity-85"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">forgeapi.org</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Video / Graphic Display Stage with AnimatePresence */}
            <div className="relative flex-1 bg-[#05070C] overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                {/* Active Tab: Demo Video */}
                {activeTab === 'video' && (
                  <motion.div
                    key="tab-video"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    <video
                      ref={videoRef}
                      src={PLACEHOLDER_VIDEO_URL}
                      poster={FALLBACK_POSTER_URL}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={handleTimeUpdate}
                      className="w-full h-full object-cover"
                    />

                    {/* Center Play/Pause Click Handler */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors duration-200 group/playbtn cursor-pointer"
                    >
                      {!isPlaying && (
                        <div className="w-16 h-16 rounded-full bg-[#FF3B1D] text-white flex items-center justify-center shadow-2xl transform scale-100 group-hover/playbtn:scale-105 transition-transform duration-200">
                          <Play size={24} className="ml-1 fill-current" />
                        </div>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Active Tab: Canvas Graph */}
                {activeTab === 'canvas' && (
                  <motion.div
                    key="tab-canvas"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07090F]"
                  >
                    <img
                      src="/images/forge-studio-canvas.png"
                      alt="Forge Studio Multi-Agent Canvas"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Live Tech Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-white/90 flex items-center gap-2 pointer-events-none shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>DAG WORKFLOW CANVAS &bull; LIVE EXECUTION GRAPH</span>
                    </div>
                  </motion.div>
                )}

                {/* Active Tab: Agent Grid */}
                {activeTab === 'grid' && (
                  <motion.div
                    key="tab-grid"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07090F]"
                  >
                    <img
                      src="/images/forge-studio-grid.png"
                      alt="Forge Studio Multi-Agent Grid"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Live Tech Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-white/90 flex items-center gap-2 pointer-events-none shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span>PARALLEL WORKTREE RUNTIME &bull; 8 PTY THREADS</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Technical Corner Brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/70 pointer-events-none z-20" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/70 pointer-events-none z-20" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/70 pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/70 pointer-events-none z-20" />
            </div>

            {/* Bottom Status / Audio Controls Bar */}
            <div className="h-11 sm:h-12 bg-[#0A0D15] border-t border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20">
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-[#FF3B1D] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5 fill-current" />}
                </button>
                <span className="font-mono text-[10px] sm:text-[11px] text-white/70 tracking-wider hidden sm:inline">
                  {activeTab === 'video'
                    ? 'FORGE STUDIO PREVIEW'
                    : activeTab === 'canvas'
                    ? 'CANVAS GRAPH ACTIVE'
                    : 'AGENT GRID ACTIVE'}
                </span>
              </div>

              {/* Zero-Re-render Interactive Video Scrub Bar */}
              <div
                onClick={handleSeek}
                role="progressbar"
                aria-label="Video timeline scrubber"
                className="flex-1 max-w-[480px] h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group/scrub py-1"
              >
                <div className="w-full h-full bg-white/15 rounded-full overflow-hidden relative">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-[#FF3B1D] rounded-full transition-[width] duration-100 ease-linear w-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                >
                  {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

