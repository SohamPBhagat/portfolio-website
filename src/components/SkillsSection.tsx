'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Terminal, Brain, Layers, Cpu, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface SpecRow {
  name: string;
  layer: string;
  description: string;
  deployedIn: string;
  liveUrl?: string;
}

interface SpecDiscipline {
  number: string;
  id: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  specs: SpecRow[];
}

const DISCIPLINES: SpecDiscipline[] = [
  {
    number: '01',
    id: 'systems',
    title: 'Systems & Low-Level Runtimes',
    tagline: 'Windows pseudoconsole streaming, GPU terminal grids & worktree sandboxing',
    icon: <Terminal className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'ConPTY & node-pty',
        layer: 'OS PTY Kernel',
        description: 'Raw Windows pseudoconsole streaming, bidirectional ANSI escape parsing, and sub-20ms multiplexed terminal I/O in desktop apps.',
        deployedIn: 'Forge Studio Parallel IDE',
        liveUrl: 'https://www.forgeapi.org/',
      },
      {
        name: 'xterm.js Engine',
        layer: 'Terminal Emulation',
        description: 'GPU-accelerated multi-pane terminal grid rendering, custom VT100 font metrics, and high-frequency stream buffering.',
        deployedIn: 'Forge Studio Terminal Matrix',
        liveUrl: 'https://www.forgeapi.org/',
      },
      {
        name: 'Git Worktree Sandboxing',
        layer: 'Version Control IPC',
        description: 'Zero-collision parallel branch isolation per agent session, eliminating git merge lockups during concurrent agent code writes.',
        deployedIn: 'Multi-Agent Sandbox Engine',
        liveUrl: 'https://www.forgeapi.org/',
      },
      {
        name: 'FastAPI & AsyncIO',
        layer: 'Async Control Plane',
        description: 'High-throughput non-blocking REST and WebSocket control servers with strict Pydantic data validation and sub-50ms latency.',
        deployedIn: 'MediKiosk & Agent Daemons',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
      {
        name: 'Electron & Node.js Core',
        layer: 'Desktop Runtime',
        description: 'Cross-process IPC architecture, local OS process spawning, background daemon management, and sandboxed native windows.',
        deployedIn: 'Forge Studio Desktop App',
        liveUrl: 'https://www.forgeapi.org/',
      },
      {
        name: 'Faster-Whisper & FFmpeg',
        layer: 'Audio/Video Engine',
        description: 'Zero-API-cost local voice transcription daemons on-device paired with automated frame-accurate media composition pipelines.',
        deployedIn: 'Clinical Triage & Media Pipelines',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
    ],
  },
  {
    number: '02',
    id: 'datascience',
    title: 'Statistical Theory & Mathematical Rigor',
    tagline: 'Probability distributions, Bayesian inference & relational database architectures',
    icon: <Brain className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Statistical Inference & Probability',
        layer: 'Theoretical Core',
        description: 'Formal academic training in probability distributions, Bayesian estimation, hypothesis testing, ANOVA, and confidence bounds.',
        deployedIn: 'SPPU Department of Technology',
      },
      {
        name: 'Python Scientific Stack',
        layer: 'Vectorized Computing',
        description: 'NumPy, Pandas, and Scikit-Learn for matrix transformations, feature engineering pipelines, and classical predictive modeling.',
        deployedIn: 'Predictive ML & Analytics',
      },
      {
        name: 'R Scientific Modeling',
        layer: 'Statistical Lab',
        description: 'Rigorous exploratory data analysis (EDA), multivariate regression modeling, distribution testing, and formal statistical reports.',
        deployedIn: 'SPPU Honors Coursework',
      },
      {
        name: 'Relational Database Systems (RDBMS)',
        layer: 'Schema Architecture',
        description: '3NF normalization, index optimization, query execution plan analysis, ACID transactions, and zero-token SQLite graphs.',
        deployedIn: 'SPPU DBMS & Local Knowledge DB',
      },
      {
        name: 'Multivariate EDA & Data Viz',
        layer: 'Analytical Synthesis',
        description: 'ggplot2, Matplotlib, and Seaborn for high-density publication-grade statistical distribution visuals and correlation matrices.',
        deployedIn: 'Academic Research & Telemetry',
      },
      {
        name: 'Algorithmic Complexity & Bounds',
        layer: 'Foundational Rigor',
        description: 'Big-O asymptotic bounds, cache locality, memory layout constraints, and tree/graph search dynamics under data-intensive loads.',
        deployedIn: 'SPPU Computing Curriculum',
      },
    ],
  },
  {
    number: '03',
    id: 'frontend',
    title: 'Frontend & 3D WebGL Interaction',
    tagline: 'Hardware-accelerated Three.js shaders, Next.js 15 SSR & spring physics',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Next.js 15 (App Router)',
        layer: 'Production Web Core',
        description: 'Server Components, streaming SSR, parallel routes, dynamic interceptors, and edge caching for sub-100ms first contentful paint.',
        deployedIn: 'MediKiosk & Telemetry Web Apps',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
      {
        name: 'React 19 Concurrent Mode',
        layer: 'Reactive UI Core',
        description: 'Concurrent transitions, optimistic updates, custom hook abstractions, and predictable unidirectional data pipelines.',
        deployedIn: 'Production Applications',
      },
      {
        name: 'Three.js & WebGL Shaders',
        layer: 'Hardware 3D Graphics',
        description: 'Procedural geometry coordinates, real-time radar sweep shaders, camera matrix math, and buttery 60 FPS rendering under load.',
        deployedIn: 'Broadcast Telemetry Dashboard',
        liveUrl: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
      },
      {
        name: 'Tailwind CSS Design Tokens',
        layer: 'Design System Architecture',
        description: 'Fluid typographic scales, Swiss brutalist hairline borders, dark aerospace palettes, and custom tokenized component systems.',
        deployedIn: 'High-Ticket UI/UX Interfaces',
      },
      {
        name: 'Framer Motion & Spring Physics',
        layer: 'Kinetic Interaction',
        description: 'Damped harmonic spring animations, layout projection transitions, scroll-linked choreography, and tactile micro-interactions.',
        deployedIn: 'Motion Systems & Interactive Demos',
      },
      {
        name: 'Figma & Editorial UI/UX',
        layer: 'Interface Craft',
        description: 'Precision wireframing, typography rhythm, auto-layout token components, spatial hierarchy, and high-fidelity prototypes.',
        deployedIn: 'Bespoke Client & Product Builds',
      },
    ],
  },
  {
    number: '04',
    id: 'applied_ai',
    title: 'Applied AI & Clinical Protocols',
    tagline: 'Multi-agent orchestration, regional Indic Whisper ASR & FHIR R4 clinical schemas',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
    specs: [
      {
        name: 'Multi-Agent Parallel Orchestration',
        layer: 'Agentic Infrastructure',
        description: 'Simultaneous dispatching and monitoring of autonomous AI agents (Claude Code, AGY CLI) across isolated workspace environments.',
        deployedIn: 'Forge Studio Parallel Engine',
        liveUrl: 'https://www.forgeapi.org/',
      },
      {
        name: 'Indic Whisper & Ambient Voice ASR',
        layer: 'Clinical Voice Triage',
        description: 'Real-time multilingual voice transcription in regional Indian languages, filtering acoustic noise for accurate clinical intake.',
        deployedIn: 'MediKiosk Clinical OS',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
      {
        name: 'FHIR R4 & ABDM Clinical Protocols',
        layer: 'Health Informatics',
        description: 'Structured JSON-LD schema parsing, HL7 compliance, diagnostic differential pathways, and Ayushman Bharat Digital Mission interoperability.',
        deployedIn: 'MediKiosk Health Stack',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
      {
        name: 'Token-Optimized Knowledge Graphs',
        layer: 'Prompt Compression',
        description: 'On-demand SQLite relational graph extraction that yields compact ~200 token context slices, avoiding bloated prompt dumps.',
        deployedIn: 'Local Knowledge Agent Systems',
      },
      {
        name: 'LangGraph & Cyclical Tool Workflows',
        layer: 'Deterministic Agent Graphs',
        description: 'Cyclical state machines, structured schema validation, programmatic error recovery loops, and deterministic tool dispatching.',
        deployedIn: 'Autonomous Agent Pipelines',
      },
      {
        name: 'Clinical SOAP Note Synthesis',
        layer: 'Clinical Decision Support',
        description: 'Automated extraction of patient dialogue into structured Subjective, Objective, Assessment, and Plan records for physician review.',
        deployedIn: 'MediKiosk Doctor Copilot',
        liveUrl: 'https://medikiosk-six.vercel.app/',
      },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);

  // Track natural scroll progress through Section 6
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  // Smooth spring laser-scanline tracking your scroll
  const smoothLaserProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  const laserScaleY = useTransform(smoothLaserProgress, [0, 1], [0.05, 1]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] py-28 sm:py-36 lg:py-44 border-t border-black/10 select-none flex flex-col items-center"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Main Symmetrical Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 self-center flex flex-col">
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Aligned Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-12 sm:mb-16">
          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>CREDENTIALS & TECHNICAL MATRIX</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[#FF3B1D] text-sm animate-pulse">
            <span>&#9830;</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>06 // TECHNICAL ARSENAL</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="w-full mb-16 sm:mb-24 space-y-3">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
            <span>SWISS INDUSTRIAL SPECIFICATION TABLE</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-[1.05]">
            Engineering Stack & Deployed Runtimes
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-sans pt-1 max-w-2xl leading-relaxed">
            Industrial catalog of verified production tooling, low-level desktop runtimes, and theoretical computing foundations.
          </p>
        </div>

        {/* =====================================================================
            THE SWISS INDUSTRIAL SPEC TABLE (CARD-FREE, SCROLL-ANIMATED)
            ===================================================================== */}
        <div className="relative w-full flex">
          {/* ── Left Animated Scroll Laser Scan Track ── */}
          <div className="hidden md:block w-8 shrink-0 relative mr-6 lg:mr-10">
            {/* Background hairline guide rail */}
            <div className="absolute left-3 top-0 bottom-0 w-[1.5px] bg-black/10" />

            {/* Active Scroll Laser Scanline */}
            <motion.div
              style={{ scaleY: laserScaleY, originY: 0 }}
              className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF3B1D] via-[#FF3B1D] to-orange-400 shadow-[0_0_8px_rgba(255,59,29,0.5)]"
            />

            {/* Glowing Laser Bead */}
            <motion.div
              style={{
                top: useTransform(smoothLaserProgress, [0, 1], ['0%', '100%']),
              }}
              className="absolute left-[7px] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FF3B1D] border-2 border-white shadow-[0_0_12px_#FF3B1D]"
            />
          </div>

          {/* ── Main Spec Table Body ── */}
          <div className="flex-1 w-full space-y-16 sm:space-y-20">
            {DISCIPLINES.map((discipline, dIdx) => (
              <motion.div
                key={discipline.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: dIdx * 0.08 }}
                className="w-full"
              >
                {/* Discipline Header Bar */}
                <div className="pb-4 border-b-2 border-black/15 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#FF3B1D] tracking-tight">
                      [ {discipline.number} ]
                    </span>
                    <div>
                      <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#111111] tracking-tight">
                        {discipline.title}
                      </h3>
                      <p className="font-mono text-[11px] sm:text-xs text-neutral-500 pt-0.5">
                        {discipline.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>06 VERIFIED RUNTIMES</span>
                  </div>
                </div>

                {/* Table Column Subheaders */}
                <div className="hidden lg:grid grid-cols-12 gap-4 py-2.5 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600 border-b border-black/10 bg-black/[0.015]">
                  <div className="col-span-3">TECHNOLOGY &bull; RUNTIME LAYER</div>
                  <div className="col-span-6">TECHNICAL SCOPE &bull; OPERATIONAL ARCHITECTURE</div>
                  <div className="col-span-3 text-right">DEPLOYED SYSTEM PROOF</div>
                </div>

                {/* Spec Rows */}
                <div className="divide-y divide-black/10 border-b border-black/15">
                  {discipline.specs.map((spec, sIdx) => {
                    const isHovered = hoveredSpec === `${discipline.id}-${sIdx}`;

                    return (
                      <div
                        key={spec.name}
                        onMouseEnter={() => setHoveredSpec(`${discipline.id}-${sIdx}`)}
                        onMouseLeave={() => setHoveredSpec(null)}
                        className={`group transition-all duration-200 py-4 px-3 sm:px-4 rounded-xl cursor-default ${
                          isHovered ? 'bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)]' : 'hover:bg-white/60'
                        }`}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 items-start lg:items-center">
                          {/* Col 1: Name & Layer Badge (3 cols) */}
                          <div className="lg:col-span-3 flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                  isHovered ? 'bg-[#FF3B1D]' : 'bg-black/20'
                                }`}
                              />
                              <span className="font-sans font-bold text-sm sm:text-[15px] text-[#111111] group-hover:text-[#FF3B1D] transition-colors tracking-tight">
                                {spec.name}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider pl-3.5 pt-0.5">
                              {spec.layer}
                            </span>
                          </div>

                          {/* Col 2: Technical Scope & Utility (6 cols) */}
                          <div className="lg:col-span-6 pl-3.5 lg:pl-0">
                            <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed group-hover:text-neutral-900 transition-colors">
                              {spec.description}
                            </p>
                          </div>

                          {/* Col 3: Deployed System Citation (3 cols) */}
                          <div className="lg:col-span-3 pl-3.5 lg:pl-0 flex items-center lg:justify-end">
                            {spec.liveUrl ? (
                              <a
                                href={spec.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-neutral-700 hover:text-[#FF3B1D] transition-colors group/link"
                              >
                                <span>{spec.deployedIn}</span>
                                <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover/link:text-[#FF3B1D] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                              </a>
                            ) : (
                              <span className="font-mono text-[11px] text-neutral-500 font-medium">
                                {spec.deployedIn}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            MINIMALIST INDUSTRIAL FOOTER STRIP
            ===================================================================== */}
        <div className="w-full mt-16 sm:mt-24 pt-8 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800 tracking-wide">
              24 VERIFIED RUNTIMES &bull; 100% PRODUCTION PROVEN
            </span>
          </div>

          <a
            href="https://github.com/SohamPBhagat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-neutral-700 hover:text-black font-semibold transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Audit Repositories on GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
