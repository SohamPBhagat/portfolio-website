'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import {
  Terminal,
  Brain,
  Layers,
  Cpu,
  ArrowUpRight,
  Activity,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  GitBranch,
  Database,
  FileCode2,
} from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface BlueprintSpec {
  name: string;
  layer: string;
  description: string;
  deployedIn: string;
  liveUrl?: string;
  icon: React.ReactNode;
}

interface BlueprintBay {
  index: string;
  id: string;
  title: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  specs: BlueprintSpec[];
}

const BLUEPRINT_BAYS: BlueprintBay[] = [
  {
    index: '01',
    id: 'systems',
    title: 'Systems & Low-Level Runtimes',
    tagline: 'Windows pseudoconsole streaming, GPU terminal grids & worktree sandboxing',
    badge: 'CORE RUNTIME KERNEL',
    icon: <Terminal className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'ConPTY & node-pty',
        layer: 'OS PTY Kernel',
        description: 'Raw Windows pseudoconsole streaming, bidirectional ANSI escape parsing, and sub-20ms multiplexed terminal I/O.',
        deployedIn: 'Forge Studio Parallel IDE',
        liveUrl: 'https://www.forgeapi.org/',
        icon: <Terminal className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'xterm.js Engine',
        layer: 'Terminal Emulation',
        description: 'GPU-accelerated multi-pane terminal grid rendering, custom VT100 font metrics, and high-frequency stream buffering.',
        deployedIn: 'Forge Studio Terminal Matrix',
        liveUrl: 'https://www.forgeapi.org/',
        icon: <Cpu className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Git Worktree Sandboxing',
        layer: 'Branch Sandboxing IPC',
        description: 'Zero-collision parallel branch isolation per agent session, eliminating git merge lockups during concurrent agent code writes.',
        deployedIn: 'Multi-Agent Sandbox Engine',
        liveUrl: 'https://www.forgeapi.org/',
        icon: <GitBranch className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'FastAPI & AsyncIO',
        layer: 'Async Control Plane',
        description: 'High-throughput non-blocking REST and WebSocket control servers with strict typed Pydantic contracts and sub-50ms latency.',
        deployedIn: 'MediKiosk & Agent Daemons',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <Activity className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Electron & Node.js Core',
        layer: 'Desktop Runtime',
        description: 'Cross-process IPC architecture, local OS process spawning, background daemon management, and sandboxed native windows.',
        deployedIn: 'Forge Studio Desktop App',
        liveUrl: 'https://www.forgeapi.org/',
        icon: <Layers className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Faster-Whisper & FFmpeg',
        layer: 'Audio/Video Engine',
        description: 'Zero-API-cost local voice transcription daemons on-device paired with automated frame-accurate media composition pipelines.',
        deployedIn: 'Clinical Triage & Media Core',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <FileCode2 className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
    ],
  },
  {
    index: '02',
    id: 'datascience',
    title: 'Statistical Theory & Mathematical Rigor',
    tagline: 'Probability distributions, Bayesian inference & relational database architectures',
    badge: 'ACADEMIC RIGOR TRACK',
    icon: <Brain className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Statistical Inference & Probability',
        layer: 'Theoretical Core',
        description: 'Formal academic training in probability distributions, Bayesian estimation, hypothesis testing, ANOVA, and confidence bounds.',
        deployedIn: 'SPPU Department of Technology',
        icon: <Brain className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Python Scientific Stack',
        layer: 'Vectorized Computing',
        description: 'NumPy, Pandas, and Scikit-Learn for matrix transformations, feature engineering pipelines, and classical predictive modeling.',
        deployedIn: 'Predictive ML & Analytics',
        icon: <FileCode2 className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'R Scientific Modeling',
        layer: 'Statistical Lab',
        description: 'Rigorous exploratory data analysis (EDA), multivariate regression modeling, distribution testing, and formal statistical reports.',
        deployedIn: 'SPPU Honors Coursework',
        icon: <Activity className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Relational Databases (RDBMS)',
        layer: 'Schema Architecture',
        description: '3NF normalization, index optimization, query execution plan analysis, ACID transactions, and zero-token SQLite graphs.',
        deployedIn: 'SPPU DBMS & Local Knowledge DB',
        icon: <Database className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Multivariate EDA & Data Viz',
        layer: 'Analytical Synthesis',
        description: 'ggplot2, Matplotlib, and Seaborn for high-density publication-grade statistical distribution visuals and correlation matrices.',
        deployedIn: 'Academic Research & Telemetry',
        icon: <Activity className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Algorithmic Complexity & Bounds',
        layer: 'Foundational Rigor',
        description: 'Big-O asymptotic bounds, cache locality, memory layout constraints, and tree/graph search dynamics under data-intensive loads.',
        deployedIn: 'SPPU Computing Curriculum',
        icon: <Cpu className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
    ],
  },
  {
    index: '03',
    id: 'frontend',
    title: 'Frontend & 3D WebGL Interaction',
    tagline: 'Hardware-accelerated Three.js shaders, Next.js 15 SSR & spring physics',
    badge: '60 FPS INTERACTION CRAFT',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Next.js 15 (App Router)',
        layer: 'Production Web Core',
        description: 'Server Components, streaming SSR, parallel routes, dynamic interceptors, and edge caching for sub-100ms first contentful paint.',
        deployedIn: 'MediKiosk & Telemetry Web Apps',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <Layers className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'React 19 Concurrent Mode',
        layer: 'Reactive UI Core',
        description: 'Concurrent transitions, optimistic updates, custom hook abstractions, and predictable unidirectional data pipelines.',
        deployedIn: 'Production Applications',
        icon: <FileCode2 className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Three.js & WebGL Shaders',
        layer: 'Hardware 3D Graphics',
        description: 'Procedural geometry coordinates, real-time radar sweep shaders, camera matrix math, and buttery 60 FPS rendering under load.',
        deployedIn: 'Broadcast Telemetry Dashboard',
        liveUrl: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
        icon: <Sparkles className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Tailwind CSS Design Tokens',
        layer: 'Design System Architecture',
        description: 'Fluid typographic scales, Swiss brutalist hairline borders, dark aerospace palettes, and custom tokenized component systems.',
        deployedIn: 'High-Ticket UI/UX Interfaces',
        icon: <Sparkles className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Framer Motion & Spring Physics',
        layer: 'Kinetic Interaction',
        description: 'Damped harmonic spring animations, layout projection transitions, scroll-linked choreography, and tactile micro-interactions.',
        deployedIn: 'Motion Systems & Interactive Demos',
        icon: <Activity className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Figma & Interface Architecture',
        layer: 'Interface Craft',
        description: 'Precision wireframing, typography rhythm, auto-layout token components, spatial hierarchy, and high-fidelity prototypes.',
        deployedIn: 'Bespoke Client & Product Builds',
        icon: <Layers className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
    ],
  },
  {
    index: '04',
    id: 'applied_ai',
    title: 'Applied AI & Clinical Protocols',
    tagline: 'Multi-agent orchestration, regional Indic Whisper ASR & FHIR R4 clinical schemas',
    badge: 'HEALTHCARE INTELLIGENCE OS',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Multi-Agent Parallel Orchestration',
        layer: 'Agentic Infrastructure',
        description: 'Simultaneous dispatching and monitoring of autonomous AI agents (Claude Code, AGY CLI) across isolated workspace environments.',
        deployedIn: 'Forge Studio Parallel Engine',
        liveUrl: 'https://www.forgeapi.org/',
        icon: <Cpu className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Indic Whisper & Ambient Voice ASR',
        layer: 'Clinical Voice Triage',
        description: 'Real-time multilingual voice transcription in regional Indian languages, filtering acoustic noise for accurate clinical intake.',
        deployedIn: 'MediKiosk Clinical OS',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <Brain className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'FHIR R4 & ABDM Clinical Protocols',
        layer: 'Health Informatics',
        description: 'Structured JSON-LD schema parsing, HL7 compliance, diagnostic differential pathways, and Ayushman Bharat Digital Mission interoperability.',
        deployedIn: 'MediKiosk Health Stack',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <ShieldCheck className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Token-Optimized Knowledge Graphs',
        layer: 'Prompt Compression',
        description: 'On-demand SQLite relational graph extraction that yields compact ~200 token context slices, avoiding bloated prompt dumps.',
        deployedIn: 'Local Knowledge Agent Systems',
        icon: <Database className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'LangGraph State Machines',
        layer: 'Deterministic Agent Graphs',
        description: 'Cyclical state machines, structured schema validation, programmatic error recovery loops, and deterministic tool dispatching.',
        deployedIn: 'Autonomous Agent Pipelines',
        icon: <GitBranch className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
      {
        name: 'Clinical SOAP Note Synthesis',
        layer: 'Clinical Decision Support',
        description: 'Automated extraction of patient dialogue into structured Subjective, Objective, Assessment, and Plan records for physician review.',
        deployedIn: 'MediKiosk Doctor Copilot',
        liveUrl: 'https://medikiosk-six.vercel.app/',
        icon: <Activity className="w-3.5 h-3.5 text-[#FF3B1D]" />,
      },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBayIdx, setActiveBayIdx] = useState<number>(0);

  // Dedicated vertical runway for the horizontal tape animation (380vh for ample dwell time)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth weighted spring for the horizontal runway glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate the horizontal glide translation across the 4 bays
  // Translates the tape from 0% to -75% as the user scrolls through the 380vh height
  const tapeTranslateX = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

  // Sync active bay indicator with scroll progression
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveBayIdx(0);
    } else if (latest < 0.50) {
      setActiveBayIdx(1);
    } else if (latest < 0.75) {
      setActiveBayIdx(2);
    } else {
      setActiveBayIdx(3);
    }
  });

  const handleBayClick = (index: number) => {
    setActiveBayIdx(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    const targetProgress = (index + 0.35) / 4;
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const activeBay = BLUEPRINT_BAYS[activeBayIdx];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] h-[380vh] border-t-2 border-black/20 select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-8 lg:py-10 overflow-hidden bg-[#F6F5F2]">
        
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 shrink-0">
          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>CREDENTIALS &amp; TECHNICAL MATRIX</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>

          <div className="flex items-center text-[#FF3B1D] text-sm animate-pulse">
            <span>&#9830;</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>06 // HORIZONTAL BLUEPRINT RUNWAY</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>
        </div>

        {/* =====================================================================
            MAIN WORKBENCH STAGE: PINNED LEFT TELEMETRY + HORIZONTAL RUNWAY
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-14 my-auto overflow-hidden">
          
          {/* ── PINNED LEFT TELEMETRY CONSOLE (Width ~340px) ── */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 space-y-6 flex flex-col justify-center">
            
            <div className="space-y-2">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
                <span>SCROLL-DRIVEN RUNWAY</span>
              </div>
              <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111] leading-[1.08]">
                Engineering Arsenal Tape
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm font-sans pt-1 leading-relaxed">
                Scroll to slide across the 4 verified disciplines: low-level PTY kernels, statistical foundations, 3D WebGL, and autonomous clinical agents.
              </p>
            </div>

            {/* Live Active Bay Telemetry Badge */}
            <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.06)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-2.5 py-0.5 rounded-md">
                  [ {activeBay.index} / 04 ]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-md font-semibold">
                  {activeBay.badge}
                </span>
              </div>

              <div>
                <div className="font-sans font-semibold text-base text-[#111111] tracking-tight">
                  {activeBay.title}
                </div>
                <div className="font-mono text-[11px] text-neutral-500 pt-0.5">
                  {activeBay.specs.length} Verified Systems Deployed
                </div>
              </div>

              {/* Segmented 4-Discipline Pill Progress Rail */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {BLUEPRINT_BAYS.map((bay, idx) => {
                  const isActive = activeBayIdx === idx;
                  return (
                    <button
                      key={bay.id}
                      type="button"
                      onClick={() => handleBayClick(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive ? 'bg-[#FF3B1D] shadow-sm' : 'bg-black/10 hover:bg-black/25'
                      }`}
                      title={`Jump to ${bay.title}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Scroll Navigation Cue */}
            <div className="hidden lg:flex items-center gap-2.5 text-neutral-400 font-mono text-[11px]">
              <span className="text-neutral-600 font-semibold">SCROLL DOWN</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF3B1D] animate-pulse" />
              <span>TO GLIDE BLUEPRINT</span>
            </div>

          </div>

          {/* ── THE HORIZONTAL BLUEPRINT RUNWAY (Sliding Horizontally) ── */}
          <div className="flex-1 w-full overflow-hidden relative flex items-center py-4">
            
            {/* Ambient left/right fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F6F5F2] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F6F5F2] to-transparent z-10 pointer-events-none" />

            {/* The Animated Panoramic Tape */}
            <motion.div
              style={{ x: tapeTranslateX }}
              className="flex items-stretch gap-8 sm:gap-12 w-[400%] shrink-0 will-change-transform"
            >
              {BLUEPRINT_BAYS.map((bay) => (
                <div
                  key={bay.id}
                  className="w-full min-w-[320px] sm:min-w-[620px] lg:min-w-[760px] xl:min-w-[880px] rounded-3xl bg-white border border-black/10 p-6 sm:p-8 lg:p-10 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)] flex flex-col justify-between relative group hover:border-black/25 transition-all duration-300"
                >
                  {/* Blueprint Crosshair Accents */}
                  <div className="absolute top-3 left-3 font-mono text-[9px] text-neutral-300 select-none">+</div>
                  <div className="absolute top-3 right-3 font-mono text-[9px] text-neutral-300 select-none">+</div>
                  <div className="absolute bottom-3 left-3 font-mono text-[9px] text-neutral-300 select-none">+</div>
                  <div className="absolute bottom-3 right-3 font-mono text-[9px] text-neutral-300 select-none">+</div>

                  {/* Bay Header */}
                  <div className="pb-5 sm:pb-6 border-b border-black/10 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-2.5 py-0.5 rounded-full">
                          BAY [ {bay.index} ]
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                          {bay.badge}
                        </span>
                      </div>
                      <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#111111] tracking-tight pt-1">
                        {bay.title}
                      </h3>
                      <p className="font-mono text-xs text-neutral-500 leading-relaxed pt-0.5">
                        {bay.tagline}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-[#F6F5F2] border border-black/5 shrink-0 hidden sm:block">
                      {bay.icon}
                    </div>
                  </div>

                  {/* Bay Specifications Grid (2 Columns of 3 items each) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-5 sm:py-6">
                    {bay.specs.map((spec) => (
                      <div
                        key={spec.name}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#F6F5F2] border border-black/5 hover:border-black/15 hover:bg-white transition-all duration-200 flex flex-col justify-between space-y-2 group/spec"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-sans font-bold text-xs sm:text-sm text-[#111111] group-hover/spec:text-[#FF3B1D] transition-colors tracking-tight truncate">
                              {spec.name}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 bg-black/5 px-2 py-0.5 rounded shrink-0">
                              {spec.layer}
                            </span>
                          </div>

                          <p className="font-sans text-[11px] sm:text-xs text-neutral-600 leading-relaxed line-clamp-2">
                            {spec.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-neutral-400">Deployed In:</span>
                          {spec.liveUrl ? (
                            <a
                              href={spec.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-neutral-800 hover:text-[#FF3B1D] transition-colors inline-flex items-center gap-1 group/btn"
                            >
                              <span className="truncate max-w-[130px]">{spec.deployedIn}</span>
                              <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </a>
                          ) : (
                            <span className="font-semibold text-neutral-700 truncate max-w-[140px]">
                              {spec.deployedIn}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bay Bottom Verification Bar */}
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>100% PRODUCTION PROVEN</span>
                    </span>
                    <span className="uppercase text-neutral-400">BAY SEQUENCE {bay.index} OF 04</span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>

        {/* =====================================================================
            BOTTOM VIEWPORT FOOTER BAR
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto pt-3 border-t border-black/10 flex items-center justify-between font-mono text-xs text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800">
              24 VERIFIED RUNTIMES ACROSS 4 ARCHITECTURAL BAYS
            </span>
          </div>

          <a
            href="https://github.com/SohamPBhagat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black font-semibold transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audit Repositories on GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
