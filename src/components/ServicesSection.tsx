'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Sparkles, Box, Cpu, Terminal } from 'lucide-react';

interface DisciplineItem {
  number: string;
  title: string;
  subtitle: string;
  href: string;
}

const DISCIPLINES: DisciplineItem[] = [
  {
    number: '01',
    title: 'UI/UX Design',
    subtitle: 'Design Systems · Spatial Interfaces · Real-Time Telemetry',
    href: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
  },
  {
    number: '02',
    title: 'Full-Stack & WebGL',
    subtitle: 'Next.js · Three.js · 60 FPS 3D Interactive Web',
    href: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
  },
  {
    number: '03',
    title: 'Applied AI & Agents',
    subtitle: 'Context Optimization · Swarm Runtimes · Whisper STT',
    href: 'https://www.forgeapi.org/',
  },
  {
    number: '04',
    title: 'Systems & Runtimes',
    subtitle: 'FastAPI · ConPTY · Low-Latency IPC Pipelines',
    href: 'https://www.forgeapi.org/',
  },
];

// =====================================================================
// SPECIMEN 01: UI/UX DESIGN (Telemetry Command Radar HUD)
// =====================================================================
function SpecimenUIUX() {
  const [radarDegree, setRadarDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarDegree((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#07090F] text-white font-mono select-none relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300 font-semibold">
            UI/UX SPECIMEN // TELEMETRY RADAR
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE VERCEL HUD</span>
        </div>
      </div>

      {/* Center Radar HUD */}
      <div className="flex flex-col items-center justify-center my-auto py-4 relative z-10">
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-emerald-500/30 relative flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.08)]">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-emerald-500/20" />
          <div className="w-16 h-16 rounded-full border border-emerald-500/20" />
          <div className="absolute w-full h-[1px] bg-emerald-500/20" />
          <div className="absolute h-full w-[1px] bg-emerald-500/20" />

          {/* Sweeping Radar Beam */}
          <div
            className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-emerald-400 origin-left"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${radarDegree}deg)`,
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.9)',
            }}
          />

          {/* Active Target Pins */}
          <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-[#FF3B1D] animate-ping" />
          <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-[#FF3B1D]" />
          <div className="absolute bottom-8 left-10 w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <div className="mt-4 text-center space-y-1">
          <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-bold">
            LATENCY: 8.2ms · 60 FPS WEBGL
          </div>
          <div className="text-[10px] text-neutral-400 tracking-wider">
            TARGET LOCK: 40.7128° N, 74.0060° W // BRUTALIST HUD
          </div>
        </div>
      </div>

      {/* Bottom Live Link Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 relative z-10">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
          PROJECT: BROADCAST TELEMETRY DASHBOARD
        </span>
        <a
          href="https://broadcast-design-telemetry-dashboar.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3.5 py-1.5 rounded-full border border-[#FF3B1D]/30"
        >
          <span>LAUNCH DEMO</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 02: FULL-STACK & WEBGL (Interactive 3D Geometric Canvas)
// =====================================================================
function SpecimenWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;

    // 3D Octahedron vertices
    const vertices = [
      [0, 1, 0],
      [0, -1, 0],
      [1, 0, 0],
      [-1, 0, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];

    const edges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2],
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = Math.min(cx, cy) * 0.7;

      angleX += 0.012;
      angleY += 0.018;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 3.5;
        const depth = fov / (fov + z2);
        return [cx + x1 * scale * depth, cy + y2 * scale * depth];
      });

      // Draw edges
      ctx.strokeStyle = '#FF3B1D';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#FF3B1D';
      ctx.shadowBlur = 12;

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });

      // Draw vertices
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 16;
      projected.forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#07090F] text-white font-mono select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Box size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300 font-semibold">
            3D WEBGL ENGINE // 60 FPS RENDERER
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>GPU ACCELERATED</span>
        </div>
      </div>

      {/* Center 3D Wireframe Canvas */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10">
        <canvas
          ref={canvasRef}
          width={280}
          height={200}
          className="w-[280px] h-[200px]"
        />
        <div className="text-center space-y-0.5 mt-2">
          <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-400 font-bold">
            THREE.JS / WEBGL · FRAME TIME: 16.4ms
          </div>
          <div className="text-[10px] text-neutral-400 tracking-wider">
            GEODESIC POLYHEDRON · ZERO JANK REACTIVE STATE
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 relative z-10">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
          STACK: NEXT.JS APP ROUTER · THREE.JS · SHADERS
        </span>
        <a
          href="https://broadcast-design-telemetry-dashboar.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3.5 py-1.5 rounded-full border border-[#FF3B1D]/30"
        >
          <span>VIEW WORK</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 03: APPLIED AI & AGENTS (Animated DAG Swarm Topology)
// =====================================================================
function SpecimenAIAgents() {
  const agents = [
    { name: 'Apex', role: 'Engine' },
    { name: 'Nova', role: 'Styles' },
    { name: 'Cipher', role: 'Loop' },
    { name: 'Vortex', role: 'Entity' },
    { name: 'Echo', role: 'Food' },
    { name: 'Pulse', role: 'Score' },
  ];

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#07090F] text-white font-mono select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300 font-semibold">
            DAG SWARM // CONTEXT OPTIMIZATION
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>6 AGENTS WIRED</span>
        </div>
      </div>

      {/* Center Swarm DAG Visualizer */}
      <div className="flex flex-col items-center justify-center my-auto py-2 relative z-10 w-full">
        {/* Master Boss Node */}
        <div className="px-5 py-2.5 rounded-xl bg-[#0F1424] border border-[#FF3B1D]/60 shadow-[0_0_25px_rgba(255,59,29,0.2)] flex items-center gap-3 z-10 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B1D] animate-ping" />
          <div className="text-left">
            <div className="text-[11px] font-bold text-white tracking-wide">MASTER ORCHESTRATOR</div>
            <div className="text-[9px] text-neutral-400">Context Optimizer · ~200 Tokens</div>
          </div>
        </div>

        {/* 6 Connected Worker Agents */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full mt-2 z-10">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF3B1D]/50 transition-colors flex items-center justify-between text-left"
            >
              <div>
                <div className="text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="text-[#FF3B1D]">0{i + 1}</span>
                  <span>{agent.name}</span>
                </div>
                <div className="text-[8px] text-neutral-400">{agent.role} · Active Worktree</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 relative z-10">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
          ISOLATION: 100% COLLISION-FREE GIT WORKTREES
        </span>
        <a
          href="https://www.forgeapi.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3.5 py-1.5 rounded-full border border-[#FF3B1D]/30"
        >
          <span>VIEW SYSTEM</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 04: SYSTEMS & RUNTIMES (Live ConPTY Terminal Stream)
// =====================================================================
function SpecimenSystems() {
  const [logIndex, setLogIndex] = useState(4);

  const logs = [
    { type: 'cmd', text: 'PS C:\\workbench> run-distributed-pipeline --workers=6' },
    { type: 'success', text: '✓ [conpty:01] Process spawned PID 18492' },
    { type: 'info', text: '➜ [xterm.js] WebGL GPU context mounted @ 60 FPS' },
    { type: 'metric', text: '⚡ [ipc:stream] Throughput: 5.4 MB/s · frame: 1.1ms' },
    { type: 'success', text: '✔ [worktree] Sandboxed branch: worktrees/vortex' },
    { type: 'metric', text: '● [latency] STDOUT stream latency: 11.2ms (zero drop)' },
    { type: 'cmd', text: 'Pipeline healthy. Streaming raw ANSI buffers...' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length ? prev + 1 : 3));
    }, 1100);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#07090F] text-white font-mono select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-300 font-semibold">
            CONPTY STREAMING ENGINE // XTERM.JS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LATENCY &lt;15ms</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 rounded-xl bg-black/80 border border-white/10 my-auto text-left space-y-1.5 font-mono text-[10px] sm:text-[11px] overflow-hidden leading-relaxed relative z-10">
        {logs.slice(0, logIndex).map((log, i) => (
          <div key={i} className="flex items-start gap-2">
            {log.type === 'cmd' && <span className="text-neutral-400">{log.text}</span>}
            {log.type === 'success' && <span className="text-emerald-400 font-medium">{log.text}</span>}
            {log.type === 'info' && <span className="text-cyan-400 font-medium">{log.text}</span>}
            {log.type === 'metric' && <span className="text-amber-300 font-medium">{log.text}</span>}
          </div>
        ))}
        <div className="flex items-center gap-1 text-[#FF3B1D]">
          <span>&gt;</span>
          <span className="w-2 h-3.5 bg-[#FF3B1D] animate-pulse inline-block" />
        </div>
      </div>

      {/* Bottom Telemetry Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 relative z-10">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
          CORE: FASTAPI · CONPTY · ASYNC PIPELINES
        </span>
        <a
          href="https://www.forgeapi.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3.5 py-1.5 rounded-full border border-[#FF3B1D]/30"
        >
          <span>VIEW RUNTIME</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// MAIN SECTION 4: THE MINIMALIST EXHIBITION INDEX
// =====================================================================
export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userSelected, setUserSelected] = useState<boolean>(false);
  const userOverrideTimeout = useRef<NodeJS.Timeout | null>(null);

  // Dedicated pinned scroll runway for Section 4
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly sync scroll progress across the 4 disciplines during scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (userSelected) return;
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest < 0.50) {
      setActiveIndex(1);
    } else if (latest < 0.75) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setUserSelected(true);
    if (userOverrideTimeout.current) clearTimeout(userOverrideTimeout.current);
    userOverrideTimeout.current = setTimeout(() => {
      setUserSelected(false);
    }, 7000);
  };

  const activeDiscipline = DISCIPLINES[activeIndex];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 bg-[#F6F5F2] text-[#111111] h-[260vh] border-t border-black/10 select-none"
    >
      {/* Subtle Architectural Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 xl:px-20 overflow-hidden bg-[#F6F5F2]">
        
        {/* Perfectly Centered Container (Max 1600px, Matches Projects Section) */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col self-center">
          
          {/* Top Editorial Masthead Bar */}
          <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-8 lg:mb-12">
            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>WHAT I LEARNED &amp; WHAT I DO</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[#FF3B1D] text-sm animate-pulse">
              <span>&#9829;</span>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>04 // DISCIPLINES &amp; CRAFT</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>
          </div>

          {/* Section Heading */}
          <div className="mb-8 lg:mb-10 space-y-1.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>DISCIPLINES FOR PEOPLE, COMMUNITY &amp; DIGITAL WORLD</span>
            </div>
            <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111]">
              Designing &amp; Engineering for the Digital World
            </h2>
          </div>

          {/* =====================================================================
              MAIN SPLIT WORKBENCH — 6-col Minimalist Index / 6-col High-End Stage
              ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Clean Minimalist Typographic List (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center divide-y divide-black/10 border-y border-black/10">
              {DISCIPLINES.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.number}
                    onMouseEnter={() => handleItemClick(index)}
                    onClick={() => handleItemClick(index)}
                    className="group cursor-pointer py-5 sm:py-6 lg:py-7 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      
                      {/* Active Status Indicator Dot */}
                      <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center shrink-0">
                        {isActive ? (
                          <motion.div
                            layoutId="activeDisciplineDot"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="w-2.5 h-2.5 rounded-full bg-[#FF3B1D] shadow-[0_0_12px_rgba(255,59,29,0.85)]"
                          />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-500 transition-colors" />
                        )}
                      </div>

                      {/* Typographic Title & Subtitle */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors shrink-0 ${
                              isActive ? 'text-[#FF3B1D]' : 'text-neutral-400 group-hover:text-neutral-600'
                            }`}
                          >
                            [ {item.number} ]
                          </span>
                          <h3
                            className={`font-sans text-xl sm:text-2xl lg:text-3xl tracking-tight transition-colors ${
                              isActive
                                ? 'font-bold text-[#111111]'
                                : 'font-normal text-neutral-400 group-hover:text-neutral-800'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Clean Subtitle */}
                        <p
                          className={`font-mono text-xs sm:text-[13px] tracking-wide pl-8 sm:pl-9 transition-colors ${
                            isActive
                              ? 'text-neutral-700 font-medium'
                              : 'text-neutral-400/80 group-hover:text-neutral-500'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      </div>

                    </div>

                    {/* Arrow Icon */}
                    <div
                      className={`shrink-0 transition-all duration-300 pr-2 ${
                        isActive
                          ? 'opacity-100 text-[#FF3B1D] translate-x-0'
                          : 'opacity-0 -translate-x-2 text-neutral-400 group-hover:opacity-40'
                      }`}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Large Luxury Specimen Stage (6 Cols) */}
            <div className="lg:col-span-6">
              <div className="w-full aspect-[16/11] max-h-[50vh] min-h-[340px] sm:min-h-[380px] bg-[#07090F] rounded-2xl border border-black/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col relative">
                
                {/* macOS Style Window Top Control Header */}
                <div className="h-10 bg-[#05060A] border-b border-white/10 px-4 flex items-center justify-between select-none shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                    <span className="ml-2 font-mono text-[10px] text-white/50 tracking-wider hidden sm:inline">
                      [{activeDiscipline.number}] {activeDiscipline.title} // LIVE SPECIMEN
                    </span>
                  </div>

                  <a
                    href={activeDiscipline.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 hover:underline"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live App</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>

                {/* Display Stage with Dynamic Specimen Card based on Active Discipline */}
                <div className="relative flex-1 bg-[#07090F] overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`specimen-${activeDiscipline.number}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                    >
                      {activeDiscipline.number === '01' && <SpecimenUIUX />}
                      {activeDiscipline.number === '02' && <SpecimenWebGL />}
                      {activeDiscipline.number === '03' && <SpecimenAIAgents />}
                      {activeDiscipline.number === '04' && <SpecimenSystems />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Corner Accent Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none z-20" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none z-20" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none z-20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none z-20" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
