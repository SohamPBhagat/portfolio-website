'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ExternalLink, Terminal, Cpu, GitFork, Layers, CheckCircle2 } from 'lucide-react';

export default function VideoShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'grid' | 'canvas' | 'telemetry'>('grid');
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
    if (latest < 0.36) {
      setActiveTab('grid');
    } else if (latest < 0.70) {
      setActiveTab('canvas');
    } else {
      setActiveTab('telemetry');
    }
  });

  const handleTabClick = (tab: 'grid' | 'canvas' | 'telemetry') => {
    setActiveTab(tab);
    setUserSelectedTab(true);
    if (userOverrideTimeout.current) clearTimeout(userOverrideTimeout.current);
    userOverrideTimeout.current = setTimeout(() => {
      setUserSelectedTab(false);
    }, 6000);
  };

  // Smooth 3D perspective scale & subtle elevation
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.95, 1, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [4, 0, 0, -3]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.85, 1, 1, 0.85]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative z-10 w-full bg-[#F6F5F2] h-[260vh] border-t border-black/10"
    >
      {/* Subtle Architectural Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Viewport Stage: Centered with comfortable vertical margins */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 overflow-hidden select-none pt-12 sm:pt-14 pb-6"
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
          <div className="w-full mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/10">
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
              CENTERPIECE macOS SHOWCASE WINDOW
              ===================================================================== */}
          <div className="w-full aspect-[16/9.6] max-h-[58vh] min-h-[360px] sm:min-h-[420px] bg-[#0A0D15] rounded-2xl border border-black/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col relative">
            
            {/* Top Clean Control Bar */}
            <div className="h-12 sm:h-13 bg-[#080B12] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between select-none shrink-0 z-20">
              
              {/* Left macOS Window Traffic Dots & System Label */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/85 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/85 inline-block" />
                </div>
                <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10 font-mono text-[11px] text-white/50 tracking-wider">
                  <span className="text-white/80 font-medium">FORGE_STUDIO</span>
                  <span className="text-white/30">/</span>
                  <span>v2.4_ADE</span>
                </div>
              </div>

              {/* Spacious Spring-Animated View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-[#04060A] p-1 rounded-xl border border-white/10 text-xs font-mono select-none relative shadow-inner">
                {(
                  [
                    { id: 'grid', label: 'Parallel Grid', icon: Layers },
                    { id: 'canvas', label: 'DAG Canvas', icon: GitFork },
                    { id: 'telemetry', label: 'Live Telemetry', icon: Terminal },
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 cursor-pointer z-10 flex items-center gap-1.5 ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeShowcaseTab"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          className="absolute inset-0 bg-white/15 border border-white/20 rounded-lg shadow-sm -z-10"
                        />
                      )}
                      <Icon className="w-3.5 h-3.5" />
                      <span className="tracking-wide uppercase text-[11px] sm:text-xs">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right External Link */}
              <a
                href="https://www.forgeapi.org/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-emerald-400 hover:underline transition-opacity hover:opacity-85"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">forgeapi.org</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Display Stage with AnimatePresence */}
            <div className="relative flex-1 bg-[#05070C] overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                
                {/* =============================================================
                    TAB 1: PARALLEL TERMINAL GRID
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
                    <img
                      src="/images/forge-studio-grid.png"
                      alt="Forge Studio Multi-Agent Grid"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    
                    {/* Live Tech Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-white/90 flex items-center gap-2 pointer-events-none shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <span>PARALLEL WORKTREE RUNTIME &bull; 8 CONPTY THREADS</span>
                    </div>

                    <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-neutral-300 pointer-events-none">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>ZERO GIT MERGE CONFLICTS</span>
                    </div>
                  </motion.div>
                )}

                {/* =============================================================
                    TAB 2: DAG WORKFLOW CANVAS
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
                    <img
                      src="/images/forge-studio-canvas.png"
                      alt="Forge Studio Multi-Agent Canvas"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    
                    {/* Live Tech Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-white/90 flex items-center gap-2 pointer-events-none shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>DAG WORKFLOW CANVAS &bull; REAL-TIME AGENT DEPENDENCY GRAPH</span>
                    </div>

                    <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg font-mono text-[10px] text-neutral-300 pointer-events-none">
                      <Cpu className="w-3 h-3 text-blue-400" />
                      <span>DYNAMIC STATE ORCHESTRATION</span>
                    </div>
                  </motion.div>
                )}

                {/* =============================================================
                    TAB 3: LIVE TERMINAL TELEMETRY & RUNTIME STREAM
                    ============================================================= */}
                {activeTab === 'telemetry' && (
                  <motion.div
                    key="tab-telemetry"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full bg-[#05070C] p-6 sm:p-8 flex flex-col justify-between font-mono text-xs overflow-hidden select-text"
                  >
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-[11px]">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-white/80">pty-stream // session-4812</span>
                        <span className="text-white/30">|</span>
                        <span>pid: 28419</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>STREAMING 60 FPS</span>
                        </span>
                      </div>
                    </div>

                    {/* Monospace Telemetry Logs */}
                    <div className="flex-1 py-4 space-y-2 sm:space-y-2.5 overflow-hidden text-neutral-300 text-[11px] sm:text-xs leading-relaxed">
                      <div className="text-neutral-500 font-mono">
                        [09:42:01.004] <span className="text-blue-400">[SYSTEM]</span> ConPTY Multiplexer initialized on port :4812 (ConPTY / node-pty backend)
                      </div>
                      <div>
                        [09:42:01.140] <span className="text-amber-400">[AGENT-01 // Claude Code]</span> Forking worktree sandbox to <code className="text-white/90 bg-white/10 px-1 py-0.5 rounded">.worktrees/auth-refactor</code>
                      </div>
                      <div>
                        [09:42:01.320] <span className="text-emerald-400">[AGENT-02 // Antigravity]</span> Building SQLite HNSW vector index: 1,420 codebase symbols mapped in 38ms.
                      </div>
                      <div>
                        [09:42:01.605] <span className="text-purple-400">[AGENT-03 // Codex]</span> Compiling Tailwind CSS design tokens and verifying TypeScript strict types.
                      </div>
                      <div className="text-neutral-400">
                        [09:42:01.880] <span className="text-emerald-400">[GIT-WORKTREE]</span> Checking branch heads: 3 parallel worktrees verified. Zero lock collisions.
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white">
                        <div>
                          <span className="text-white/50 block text-[9px] uppercase tracking-wider">Context Memory</span>
                          <span className="text-emerald-400 font-bold">&lt; 200 Tokens</span> (Zero-token SQLite Graph)
                        </div>
                        <div>
                          <span className="text-white/50 block text-[9px] uppercase tracking-wider">Parallel Panes</span>
                          <span className="text-blue-400 font-bold">8 Active</span> (xterm.js GPU Canvas)
                        </div>
                        <div>
                          <span className="text-white/50 block text-[9px] uppercase tracking-wider">Git Status</span>
                          <span className="text-amber-400 font-bold">100% Collision-Free</span>
                        </div>
                        <div>
                          <span className="text-white/50 block text-[9px] uppercase tracking-wider">PTY Latency</span>
                          <span className="text-emerald-400 font-bold">12ms Roundtrip</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/90 pt-1">
                        <span className="text-emerald-400">zen-tech@forge:~$</span>
                        <span>agy stream --session session-4812 --verify-build</span>
                        <span className="w-2 h-4 bg-[#FF3B1D] inline-block animate-pulse ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Status pill */}
                    <div className="pt-2 border-t border-white/10 text-[10px] text-white/40 flex items-center justify-between">
                      <span>RUNNING IN ELECTRON WORKBENCH HARNESS</span>
                      <span className="text-white/60">PRESS ESC TO DETACH PTY</span>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Status & Engineering Telemetry Bar */}
            <div className="h-11 sm:h-12 bg-[#080B12] border-t border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20 font-mono text-[10px] sm:text-[11px]">
              
              {/* Left Indicator */}
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold tracking-wide">
                  {activeTab === 'grid'
                    ? '8 PARALLEL PTY THREADS'
                    : activeTab === 'canvas'
                    ? 'DAG AGENT GRAPH ACTIVE'
                    : 'TELEMETRY STREAM CONNECTED'}
                </span>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="text-white/50 hidden sm:inline">.worktrees/agent-01</span>
              </div>

              {/* Center Tech Note */}
              <div className="hidden lg:flex items-center gap-2 text-white/50">
                <span>GPU-ACCELERATED XTERM.JS RENDERING</span>
                <span className="text-white/20">&bull;</span>
                <span className="text-emerald-400">60 FPS</span>
              </div>

              {/* Right Worktree Status */}
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-neutral-400 hidden md:inline">GIT WORKTREE ISOLATION:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold">
                  100% COLLISION FREE
                </span>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
