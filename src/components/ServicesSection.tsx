'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  learning: string;
  tag: string;
  tags: string[];
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'UI/UX Design',
    subtitle: 'Human-Computer Interfaces & Real-Time Dashboards',
    learning:
      'In high-density data interfaces, cognitive load is reduced by ruthless visual hierarchy, fluid state transitions, and responsive feedback. High-end design is clarity under high data velocity.',
    tag: 'Design Systems · 3D WebGL · Micro-Interactions · Spatial Architecture',
    tags: ['Figma', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js / WebGL'],
    href: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
  },
  {
    number: '02',
    title: 'Autonomous Multi-Agent Systems',
    subtitle: 'DAG Topology, Concurrency & Worktree Sandboxing',
    learning:
      'Agents cannot safely share a single working directory without merge collisions. Deterministic isolation via isolated Git worktrees and directed acyclic execution graphs is mandatory for 100% collision-free swarms.',
    tag: 'DAG Graphs · Worktree Sandboxing · Swarm Orchestration · State Machines',
    tags: ['DAG Graphs', 'Python', 'FastAPI', 'Git Worktrees', 'Swarm Isolation'],
    href: 'https://www.forgeapi.org/',
  },
  {
    number: '03',
    title: 'Terminal & Low-Latency Systems',
    subtitle: 'ConPTY Multiplexing, GPU Acceleration & IPC Streams',
    learning:
      'Standard stdout buffering causes lag and ANSI escape sequence corruption. Multiplexing native Windows ConPTY / node-pty into GPU-rendered xterm.js canvases keeps latency under 15ms under high throughput.',
    tag: 'ConPTY / node-pty · xterm.js WebGL · IPC Streams · Raw Telemetry',
    tags: ['ConPTY', 'node-pty', 'xterm.js', 'IPC Pipelines', 'WebSockets'],
    href: 'https://www.forgeapi.org/',
  },
  {
    number: '04',
    title: 'Developer Experience (DX) & Tooling',
    subtitle: 'Local-First Runtimes, State Persistence & Flow State',
    learning:
      'The best tools feel invisible. Instant hotkeys, zero-configuration startup topologies, local SQLite caching, and zero cloud lock-in create the coveted flow state for power users.',
    tag: 'Local-First · SQLite Graph · Zero-Config Scaffolding · Keyboard First',
    tags: ['Local-First', 'SQLite Graph', 'Zustand', 'CLI Engines', 'Monorepo DX'],
    href: 'https://www.forgeapi.org/',
  },
];

// =====================================================================
// SPECIMEN 01: UI/UX DESIGN (Design System & Telemetry HUD Specimen)
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
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between bg-[#07090E] text-white font-mono select-none">
      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
            DESIGN TOKENS // HUD SPECIMEN
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>60 FPS WEBGL</span>
        </div>
      </div>

      {/* Main Interactive HUD & Design Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-auto py-2">
        {/* Left: Design System Color Palette & Type Scale */}
        <div className="sm:col-span-6 space-y-3">
          <span className="text-[10px] uppercase text-neutral-500 tracking-wider">01. TOKENS & TYPOGRAPHY</span>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-10 rounded-lg bg-[#FF3B1D] flex flex-col justify-end p-1 text-[8px] font-bold text-white shadow-md">
              <span>#FF3B1D</span>
            </div>
            <div className="h-10 rounded-lg bg-[#10B981] flex flex-col justify-end p-1 text-[8px] font-bold text-black shadow-md">
              <span>#10B981</span>
            </div>
            <div className="h-10 rounded-lg bg-[#0F141F] border border-white/15 flex flex-col justify-end p-1 text-[8px] text-neutral-300">
              <span>#0F141F</span>
            </div>
            <div className="h-10 rounded-lg bg-[#F6F5F2] flex flex-col justify-end p-1 text-[8px] text-black font-semibold">
              <span>#F6F5F2</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] text-neutral-400 flex justify-between">
              <span>DISPLAY SERIF / MONO</span>
              <span className="text-[#FF3B1D]">700 BOLD</span>
            </div>
            <div className="text-sm font-sans font-semibold tracking-tight text-white">
              Ruthless Visual Hierarchy
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              Fluid 60FPS Framer Motion Spring Dynamics
            </div>
          </div>
        </div>

        {/* Right: Simulated Radar HUD Diagnostics */}
        <div className="sm:col-span-6 p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px]" />
          
          {/* Animated Circular Radar Display */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-emerald-500/30 relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-emerald-500/20" />
            <div className="w-8 h-8 rounded-full border border-emerald-500/20" />
            <div className="absolute w-full h-[1px] bg-emerald-500/20" />
            <div className="absolute h-full w-[1px] bg-emerald-500/20" />

            {/* Sweep Line */}
            <div
              className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-emerald-400 origin-left"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${radarDegree}deg)`,
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)',
              }}
            />

            {/* Target Blips */}
            <div className="absolute top-4 right-5 w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
            <div className="absolute bottom-5 left-6 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="mt-2 text-center space-y-0.5 z-10">
            <div className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
              RADAR ACTIVE · LATENCY 8.2ms
            </div>
            <div className="text-[8px] text-neutral-400">
              TARGET LOCK: 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Link Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-neutral-500">PROJECT: BROADCAST TELEMETRY HUD</span>
        <a
          href="https://broadcast-design-telemetry-dashboar.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3 py-1 rounded-full border border-[#FF3B1D]/30"
        >
          <span>OPEN VERCEL DEMO</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 02: MULTI-AGENT SWARMS (DAG Topology Visualizer)
// =====================================================================
function SpecimenAgentSwarm() {
  const agents = [
    { name: 'Apex', role: 'Engine', status: 'Slithering' },
    { name: 'Nova', role: 'CSS', status: 'Nibbling' },
    { name: 'Cipher', role: 'Loop', status: 'Orchestrating' },
    { name: 'Vortex', role: 'Entity', status: 'Architecting' },
    { name: 'Echo', role: 'Food', status: 'Generating' },
    { name: 'Pulse', role: 'Score', status: 'Streaming' },
  ];

  return (
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between bg-[#07090E] text-white font-mono select-none">
      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
            DAG SWARM TOPOLOGY // ORCHESTRATOR
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>6 WIRES ACTIVE</span>
        </div>
      </div>

      {/* Center SVG DAG Topology Graph */}
      <div className="relative my-auto py-2 flex flex-col items-center">
        {/* Master Boss Node */}
        <div className="px-4 py-2 rounded-xl bg-[#0F1424] border border-[#FF3B1D]/50 shadow-[0_0_20px_rgba(255,59,29,0.15)] flex items-center gap-3 z-10 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B1D] animate-ping" />
          <div className="text-left">
            <div className="text-[11px] font-bold text-white">MASTER ORCHESTRATOR (PTY)</div>
            <div className="text-[9px] text-neutral-400">Directed Acyclic Graph · ConPTY Parent</div>
          </div>
        </div>

        {/* 6 Connected Worker Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-2 z-10">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF3B1D]/40 transition-colors flex items-center justify-between text-left"
            >
              <div>
                <div className="text-[10px] font-bold text-white flex items-center gap-1.5">
                  <span className="text-[#FF3B1D]">0{i + 1}</span>
                  <span>{agent.name}</span>
                </div>
                <div className="text-[8px] text-neutral-400">{agent.role} · {agent.status}</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-neutral-400 font-mono">
          ISOLATION: 100% COLLISION-FREE GIT WORKTREES
        </span>
        <a
          href="https://www.forgeapi.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3 py-1 rounded-full border border-[#FF3B1D]/30"
        >
          <span>FORGE RUNTIME</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 03: TERMINAL & LOW-LATENCY SYSTEMS (Live ConPTY Streamer)
// =====================================================================
function SpecimenTerminalRuntime() {
  const [logIndex, setLogIndex] = useState(3);

  const logs = [
    { type: 'cmd', text: 'PS C:\\Users\\soham\\Downloads\\Movies> forge swarm --isolate' },
    { type: 'success', text: '✓ [conpty:01] ConPTY thread spawned (PID 18492)' },
    { type: 'info', text: '➜ [xterm.js] WebGL GPU context mounted @ 60 FPS' },
    { type: 'metric', text: '⚡ [ipc:stream] Throughput: 5.4 MB/s · frame: 1.1ms' },
    { type: 'success', text: '✔ [worktree] Sandboxed branch: worktrees/apex' },
    { type: 'success', text: '✔ [worktree] Sandboxed branch: worktrees/vortex' },
    { type: 'metric', text: '● [latency] STDOUT stream latency: 11.2ms (zero drop)' },
    { type: 'cmd', text: 'Streaming ConPTY multiplexer buffer...' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length ? prev + 1 : 3));
    }, 1200);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between bg-[#07090E] text-white font-mono select-none">
      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
            CONPTY STREAMING TELEMETRY // XTERM.JS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LATENCY &lt;15ms</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="p-3 sm:p-4 rounded-xl bg-black/80 border border-white/10 my-auto text-left space-y-1 font-mono text-[10px] sm:text-[11px] overflow-hidden leading-relaxed">
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
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-neutral-400">RENDERER: GPU-ACCELERATED WEBGL CANVAS</span>
        <a
          href="https://www.forgeapi.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3 py-1 rounded-full border border-[#FF3B1D]/30"
        >
          <span>VIEW ENGINE</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// SPECIMEN 04: DX & TOOLING (Local-First Architecture Specimen)
// =====================================================================
function SpecimenDXTooling() {
  return (
    <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between bg-[#07090E] text-white font-mono select-none">
      {/* Top Specimen Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-[#FF3B1D]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
            LOCAL-FIRST ARCHITECTURE // BENCHMARKS
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ZERO CLOUD LOCK-IN</span>
        </div>
      </div>

      {/* 3 Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto py-2">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-left">
          <div className="text-[9px] uppercase text-neutral-400">CONTEXT OPTIMIZATION</div>
          <div className="text-xl font-bold text-white font-sans">~200 Tokens</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={10} />
            <span>-98.3% Prompt Bloat</span>
          </div>
          <div className="text-[8px] text-neutral-500 pt-1">SQLite relationship slices</div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-left">
          <div className="text-[9px] uppercase text-neutral-400">LOCAL SPEECH STT</div>
          <div className="text-xl font-bold text-white font-sans">$0.00 / mo</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={10} />
            <span>Sub-500ms Local</span>
          </div>
          <div className="text-[8px] text-neutral-500 pt-1">Whisper on local GPU</div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-left">
          <div className="text-[9px] uppercase text-neutral-400">SESSION STARTUP</div>
          <div className="text-xl font-bold text-white font-sans">Instant</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={10} />
            <span>Zero-Config Topology</span>
          </div>
          <div className="text-[8px] text-neutral-500 pt-1">Zustand persistent state</div>
        </div>
      </div>

      {/* Interactive Keybinding Specimen */}
      <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white">⌘ / Ctrl + K</span>
          <span className="text-neutral-400">Launch Topology</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white">⌘ / Ctrl + ↵</span>
          <span className="text-neutral-400">Parallel Swarm Dispatch</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white">Alt + 1..6</span>
          <span className="text-neutral-400">Pane Focus</span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[10px] text-neutral-400">LOCAL SQLITE CACHE · PERSISTENT STATE</span>
        <a
          href="https://www.forgeapi.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[#FF3B1D] hover:text-white transition-colors bg-[#FF3B1D]/10 hover:bg-[#FF3B1D] px-3 py-1 rounded-full border border-[#FF3B1D]/30"
        >
          <span>DX RUNTIME</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

// =====================================================================
// MAIN SERVICES SECTION (What I Learned & What I Do)
// =====================================================================
export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Dedicated pinned scroll runway for Section 4
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly sync scroll progress across the 4 disciplines during scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
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

  const activeService = SERVICES[activeIndex];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 bg-[#F6F5F2] text-[#111111] h-[220vh] border-t border-black/10 select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage: Centered horizontally and vertically */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 xl:px-20 overflow-hidden bg-[#F6F5F2]">
        
        {/* Perfectly Centered Container */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col self-center">
          
          {/* Top Masthead */}
          <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-6 lg:mb-8">
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

          {/* Section Title Header */}
          <div className="mb-6 lg:mb-8 space-y-1.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>DISCIPLINES FOR PEOPLE, COMMUNITY &amp; DIGITAL WORLD</span>
            </div>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
              Designing &amp; Engineering for the Digital World
            </h2>
          </div>

          {/* =====================================================================
              MAIN SPLIT WORKBENCH — 5-col list / 7-col live interactive specimen
              ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: 4 Disciplines with What I Learned (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
              {SERVICES.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.number}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full p-4 sm:p-5 rounded-2xl transition-all duration-300 relative group cursor-pointer border ${
                      isActive
                        ? 'bg-white border-black/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]'
                        : 'bg-transparent border-black/5 hover:border-black/15 hover:bg-white/40'
                    }`}
                  >
                    {/* Left Crimson Active Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="disciplineActiveBar"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#FF3B1D] rounded-r shadow-sm"
                      />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 pl-2 min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors shrink-0 ${
                              isActive ? 'text-[#FF3B1D]' : 'text-neutral-400 group-hover:text-neutral-600'
                            }`}
                          >
                            [ {item.number} ]
                          </span>
                          <h3
                            className={`font-sans text-base sm:text-lg lg:text-xl tracking-tight transition-colors ${
                              isActive
                                ? 'font-semibold text-[#111111]'
                                : 'font-normal text-neutral-600 group-hover:text-black'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Subtitle / Focus */}
                        <div className="font-mono text-[10px] sm:text-[11px] text-neutral-600 font-medium pl-8 sm:pl-9">
                          {item.subtitle}
                        </div>

                        {/* What I Learned (Detailed Architectural Takeaway) */}
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="font-sans text-xs text-neutral-600 font-normal pl-8 sm:pl-9 pt-1 leading-relaxed"
                          >
                            {item.learning}
                          </motion.p>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pl-8 sm:pl-9 pt-1">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/5 text-neutral-600 border border-black/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`shrink-0 transition-all duration-300 mt-1 ${
                          isActive
                            ? 'opacity-100 text-[#FF3B1D] translate-x-0'
                            : 'opacity-0 -translate-x-2 text-neutral-400 group-hover:opacity-40'
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Interactive Architectural Specimen Cards (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="w-full aspect-[16/10] bg-[#07090E] rounded-2xl border border-black/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative">
                
                {/* macOS Style Window Top Control Header */}
                <div className="h-10 bg-[#05060A] border-b border-white/10 px-4 flex items-center justify-between select-none shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                    <span className="ml-2 font-mono text-[10px] text-white/50 tracking-wider hidden sm:inline">
                      [{activeService.number}] {activeService.title} // LIVE SPECIMEN
                    </span>
                  </div>

                  <a
                    href={activeService.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 hover:underline"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Source</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>

                {/* Display Stage with Dynamic Specimen Card based on Active Discipline */}
                <div className="relative flex-1 bg-[#07090E] overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`specimen-${activeService.number}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                    >
                      {activeService.number === '01' && <SpecimenUIUX />}
                      {activeService.number === '02' && <SpecimenAgentSwarm />}
                      {activeService.number === '03' && <SpecimenTerminalRuntime />}
                      {activeService.number === '04' && <SpecimenDXTooling />}
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
