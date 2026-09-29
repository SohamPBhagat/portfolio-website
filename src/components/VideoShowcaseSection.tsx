'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'video' | 'grid' | 'canvas'>('video');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [userSelectedTab, setUserSelectedTab] = useState<boolean>(false);
  const userOverrideTimeout = useRef<NodeJS.Timeout | null>(null);

  // Master scroll progress for Section 3 pinning & generous scroll runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Automatically sequence the 3 tabs as user scrolls through Section 3 (unless user explicitly clicked a tab)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (userSelectedTab) return;
    if (latest < 0.35) {
      setActiveTab('video');
    } else if (latest < 0.70) {
      setActiveTab('grid');
    } else {
      setActiveTab('canvas');
    }
  });

  const handleTabClick = (tab: 'video' | 'grid' | 'canvas') => {
    setActiveTab(tab);
    setUserSelectedTab(true);
    if (userOverrideTimeout.current) clearTimeout(userOverrideTimeout.current);
    userOverrideTimeout.current = setTimeout(() => {
      setUserSelectedTab(false);
    }, 7000);
  };

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
    const totalDuration = videoRef.current.duration || 10;
    videoRef.current.currentTime = newProgress * totalDuration;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${newProgress * 100}%`;
    }
  };

  // Smooth 3D perspective scale & subtle elevation
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.95, 1, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [4, 0, 0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.85, 1, 1, 0.85]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative z-10 w-full bg-[#F6F5F2] h-[380vh] border-t border-black/10"
    >
      {/* Subtle Architectural Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Viewport Stage: Centered with comfortable vertical margins */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 overflow-hidden select-none pt-10 sm:pt-12 pb-6"
        style={{ perspective: '1200px' }}
      >
        
        {/* Animated Centered Showcase Stage with 3D Physics */}
        <motion.div
          style={{ scale, opacity, rotateX, transformStyle: 'preserve-3d' }}
          className="w-full max-w-[1260px] mx-auto relative z-10 flex flex-col items-center will-change-transform"
        >
          
          {/* =====================================================================
              SECTION 3 MASTHEAD (Clean Editorial Hierarchy)
              ===================================================================== */}
          <div className="w-full mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/10">
            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
                <span>03 // FLAGSHIP SYSTEM ARCHITECTURE</span>
              </div>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
                Forge Studio (ForgeADE)
              </h2>
              <p className="font-mono text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider">
                Multi-Agent Parallel IDE &amp; CLI Orchestration Engine
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-700">
                <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">REACT</span>
                <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">CONPTY</span>
                <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">XTERM.JS</span>
                <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10">GIT WORKTREES</span>
              </div>
              <p className="font-sans text-neutral-600 text-xs sm:text-[13px] max-w-md font-normal sm:text-right leading-relaxed">
                Desktop orchestration runtime running multiple autonomous AI coding agents in isolated Git worktrees with zero merge collisions.
              </p>
            </div>
          </div>

          {/* =====================================================================
              SPACIOUS EXECUTIVE VIEW SWITCHER (Clear Segregation & Breathing Room)
              ===================================================================== */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-5 sm:mb-6 select-none gap-4">
            
            {/* Left: Feed Status Tag */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.20em] text-neutral-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>INTERACTIVE WORKBENCH FEED</span>
            </div>

            {/* Center: Spacious Segmented Switcher Pill */}
            <div className="inline-flex items-center gap-2 sm:gap-3 p-1.5 rounded-full bg-[#E8E6E0] border border-black/10 shadow-sm">
              {(
                [
                  { id: 'video', label: '3D Product Reel' },
                  { id: 'grid', label: '6-Agent Parallel Grid' },
                  { id: 'canvas', label: 'DAG Workflow Canvas' },
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative px-5 sm:px-6 py-2.5 rounded-full font-mono text-xs sm:text-[12.5px] font-semibold transition-all duration-200 cursor-pointer z-10 flex items-center gap-2.5 ${
                      isActive
                        ? 'text-[#0A0D14]'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeShowcaseTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute inset-0 bg-white rounded-full border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.06)] -z-10"
                      />
                    )}
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        isActive ? 'bg-[#FF3B1D] shadow-[0_0_8px_rgba(255,59,29,0.7)]' : 'bg-neutral-400'
                      }`}
                    />
                    <span className="tracking-wider uppercase">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Clean Live Link */}
            <a
              href="https://www.forgeapi.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-700 hover:text-black transition-colors px-4 py-2 rounded-full border border-black/10 hover:border-black/25 bg-white/70 shadow-sm"
            >
              <span>forgeapi.org</span>
              <ExternalLink size={12} className="text-[#FF3B1D]" />
            </a>
          </div>

          {/* =====================================================================
              CENTERPIECE SHOWCASE WINDOW (Zero Cropping with aspect-[48/25] + object-contain)
              ===================================================================== */}
          <div className="w-full aspect-[48/25] max-h-[58vh] min-h-[340px] sm:min-h-[420px] bg-[#07090F] rounded-2xl border border-black/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col relative">
            
            {/* Display Stage with AnimatePresence */}
            <div className="relative flex-1 bg-[#07090F] overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                
                {/* =============================================================
                    TAB 1: 3D CINEMATIC LAUNCH REEL (10s Product Trailer)
                    ============================================================= */}
                {activeTab === 'video' && (
                  <motion.div
                    key="tab-video"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07090F]"
                  >
                    <video
                      ref={videoRef}
                      src="/videos/forge-showcase.mp4"
                      poster="/images/forge-studio-grid.png"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onTimeUpdate={handleTimeUpdate}
                      className="w-full h-full object-contain bg-[#07090F]"
                    />

                    {/* Overlay Click-to-Play Handler */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5 hover:bg-black/20 transition-colors duration-200 group/playbtn cursor-pointer"
                    >
                      {!isPlaying && (
                        <div className="w-16 h-16 rounded-full bg-[#FF3B1D] text-white flex items-center justify-center shadow-2xl transform scale-100 group-hover/playbtn:scale-105 transition-transform duration-200">
                          <Play size={24} className="ml-1 fill-current" />
                        </div>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* =============================================================
                    TAB 2: 6-AGENT CONPTY PARALLEL TERMINAL GRID (Live Typing MP4)
                    ============================================================= */}
                {activeTab === 'grid' && (
                  <motion.div
                    key="tab-grid"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07090F]"
                  >
                    <video
                      src="/videos/forge-agent-grid.mp4"
                      poster="/images/forge-studio-grid.png"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain bg-[#07090F]"
                    />
                  </motion.div>
                )}

                {/* =============================================================
                    TAB 3: DAG WORKFLOW BEZIER CANVAS (Live Motion MP4)
                    ============================================================= */}
                {activeTab === 'canvas' && (
                  <motion.div
                    key="tab-canvas"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#07090F]"
                  >
                    <video
                      src="/videos/forge-dag-canvas.mp4"
                      poster="/images/forge-studio-canvas.png"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-contain bg-[#07090F]"
                    />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Media Controls Bar (Only visible when 3D Product Reel is active, zero clutter on Grid & Canvas) */}
            {activeTab === 'video' && (
              <div className="h-11 sm:h-12 bg-[#080B12] border-t border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20 font-mono text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="h-7 w-7 rounded-full bg-white/10 hover:bg-[#FF3B1D] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5 fill-current" />}
                  </button>
                  <span className="font-mono text-[10px] sm:text-[11px] text-white/70 tracking-wider">
                    3D PRODUCT REEL
                  </span>
                </div>

                {/* Interactive Seek Scrubber */}
                <div
                  onClick={handleSeek}
                  role="progressbar"
                  aria-label="Video scrubber"
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
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  </button>
                </div>
              </div>
            )}

          </div>

        </motion.div>

      </div>
    </section>
  );
}
