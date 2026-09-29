'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  GraduationCap,
  Sparkles,
  Brain,
  Terminal,
  Activity,
  ArrowUpRight,
  Database,
  Globe2,
  FileCode2,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

type DomainId = 'all' | 'systems' | 'datascience' | 'frontend' | 'applied_ai';

interface DomainFilter {
  id: DomainId;
  label: string;
  tag: string;
  count: number;
}

interface TechnicalCompetency {
  name: string;
  category: DomainId;
  categoryLabel: string;
  roleTag: string;
  description: string;
  deployedIn: string;
  icon: React.ReactNode;
}

const DOMAIN_FILTERS: DomainFilter[] = [
  { id: 'all', label: 'All Technologies', tag: 'COMPLETE MATRIX', count: 24 },
  { id: 'systems', label: 'Systems & Runtimes', tag: 'LOW-LEVEL CORE', count: 6 },
  { id: 'datascience', label: 'Data Science & Theory', tag: 'SPPU ACADEMIC', count: 6 },
  { id: 'frontend', label: 'Frontend & 3D WebGL', tag: '60 FPS INTERACTION', count: 6 },
  { id: 'applied_ai', label: 'Applied AI & Clinical', tag: 'INTELLIGENCE OS', count: 6 },
];

const TECHNICAL_COMPETENCIES: TechnicalCompetency[] = [
  // ─── Systems & Runtimes ───
  {
    name: 'ConPTY & node-pty',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Low-Latency IPC',
    description:
      'Raw Windows pseudoconsole streaming, bidirectional ANSI escape parsing, and sub-20ms multiplexed terminal I/O in desktop apps.',
    deployedIn: 'Forge Studio Parallel IDE',
    icon: <Terminal className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'xterm.js Engine',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Terminal Emulation',
    description:
      'GPU-accelerated multi-pane terminal grid rendering, custom VT100 font metrics, and high-frequency stream buffering.',
    deployedIn: 'Forge Studio Terminal Matrix',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Git Worktree Architecture',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Branch Sandboxing',
    description:
      'Zero-collision parallel branch isolation per agent session, eliminating git merge lockups during concurrent agent code writes.',
    deployedIn: 'Multi-Agent Sandbox Engine',
    icon: <GitBranch className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'FastAPI & AsyncIO',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Asynchronous Control Plane',
    description:
      'High-throughput non-blocking REST and WebSocket control servers with strict Pydantic data validation and sub-50ms latency.',
    deployedIn: 'MediKiosk & Agent Daemons',
    icon: <Activity className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Electron & Node.js Core',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Desktop Runtime',
    description:
      'Cross-process IPC architecture, local OS process spawning, background daemon management, and sandboxed native windows.',
    deployedIn: 'Forge Studio Desktop App',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Faster-Whisper & FFmpeg',
    category: 'systems',
    categoryLabel: 'Systems & Runtimes',
    roleTag: 'Audio/Video Engine',
    description:
      'Zero-API-cost local voice transcription daemons on-device paired with automated frame-accurate media composition pipelines.',
    deployedIn: 'Clinical Triage & Media Engines',
    icon: <FileCode2 className="w-4 h-4 text-[#FF3B1D]" />,
  },

  // ─── Data Science & Statistical Theory ───
  {
    name: 'Statistical Inference & Probability',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Theoretical Foundation',
    description:
      'Formal academic training in probability distributions, Bayesian estimation, hypothesis testing, ANOVA, and statistical confidence bounds.',
    deployedIn: 'SPPU Department of Technology',
    icon: <Brain className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Python (Scientific Stack)',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Vectorized Computing',
    description:
      'NumPy, Pandas, and Scikit-Learn for matrix transformations, feature engineering pipelines, and classical predictive modeling.',
    deployedIn: 'Predictive ML & Analytics',
    icon: <FileCode2 className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'R Programming & Modeling',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Statistical Computing',
    description:
      'Rigorous exploratory data analysis (EDA), multivariate regression modeling, distribution testing, and formal academic statistical reports.',
    deployedIn: 'SPPU Honors Coursework',
    icon: <Activity className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Relational Database Management (RDBMS)',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Schema Architecture',
    description:
      '3NF normalization, index optimization, query execution plan analysis, ACID transactions, and lightweight embedded SQLite graphs.',
    deployedIn: 'SPPU DBMS & Local Knowledge DB',
    icon: <Database className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Multivariate EDA & Data Viz',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Analytical Synthesis',
    description:
      'ggplot2, Matplotlib, and Seaborn for high-density publication-grade statistical distribution visuals, correlation matrices, and dashboards.',
    deployedIn: 'Academic Research & Telemetry',
    icon: <Globe2 className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Algorithmic Complexity & Bounds',
    category: 'datascience',
    categoryLabel: 'Data Science & Theory',
    roleTag: 'Foundational Rigor',
    description:
      'Big-O asymptotic bounds, cache locality, memory layout constraints, and tree/graph search dynamics under data-intensive workloads.',
    deployedIn: 'SPPU Computing Curriculum',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
  },

  // ─── Frontend & 3D WebGL ───
  {
    name: 'Next.js 15 (App Router)',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Modern Web Core',
    description:
      'Server Components, streaming SSR, parallel routes, dynamic interceptors, and edge caching for sub-100ms first contentful paint.',
    deployedIn: 'MediKiosk & Portfolio Web Apps',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'React 19 & Concurrent Mode',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Reactive State',
    description:
      'Concurrent transitions, optimistic updates, custom hook abstractions, and predictable unidirectional data pipelines.',
    deployedIn: 'Production Applications',
    icon: <FileCode2 className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Three.js & WebGL Shaders',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Hardware 3D Graphics',
    description:
      'Procedural geometry coordinates, real-time radar sweep shaders, camera matrix math, and buttery 60 FPS rendering under load.',
    deployedIn: 'Broadcast Telemetry Dashboard',
    icon: <Globe2 className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Tailwind CSS Design Tokens',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Design System Architecture',
    description:
      'Fluid typographic scales, Swiss brutalist hairline borders, dark aerospace palettes, and custom tokenized component systems.',
    deployedIn: 'High-Ticket UI/UX Interfaces',
    icon: <Sparkles className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Framer Motion & Spring Physics',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Kinetic Interaction',
    description:
      'Damped harmonic spring animations, layout projection transitions, scroll-linked choreography, and tactile micro-interactions.',
    deployedIn: 'Motion Systems & Interactive Demos',
    icon: <Activity className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Figma & Editorial UI/UX',
    category: 'frontend',
    categoryLabel: 'Frontend & 3D WebGL',
    roleTag: 'Interface Craft',
    description:
      'Precision wireframing, typography rhythm, auto-layout token components, spatial hierarchy, and high-fidelity interactive prototypes.',
    deployedIn: 'Bespoke Client & Product Builds',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
  },

  // ─── Applied AI & Clinical Systems ───
  {
    name: 'Multi-Agent Parallel Orchestration',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Agentic Infrastructure',
    description:
      'Simultaneous dispatching and monitoring of autonomous AI agents (Claude Code, AGY CLI) across isolated workspace environments.',
    deployedIn: 'Forge Studio Parallel Engine',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Indic Whisper & Ambient Voice ASR',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Clinical Voice Triage',
    description:
      'Real-time multilingual voice transcription in regional Indian languages, filtering acoustic noise for accurate clinical intake.',
    deployedIn: 'MediKiosk Clinical OS',
    icon: <Brain className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'FHIR R4 & ABDM Clinical Protocols',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Health Informatics',
    description:
      'Structured JSON-LD schema parsing, HL7 compliance, diagnostic differential pathways, and Ayushman Bharat Digital Mission interoperability.',
    deployedIn: 'MediKiosk Health Stack',
    icon: <ShieldCheck className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Token-Optimized Knowledge Graphs',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Prompt Compression',
    description:
      'On-demand SQLite relational graph extraction that yields compact ~200 token context slices, avoiding costly prompt dumps.',
    deployedIn: 'Local Knowledge Agent Systems',
    icon: <Database className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'LangGraph & Cyclical Tool Workflows',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Deterministic Agent Graphs',
    description:
      'Cyclical state machines, structured schema validation, programmatic error recovery loops, and deterministic tool dispatching.',
    deployedIn: 'Autonomous Agent Pipelines',
    icon: <GitBranch className="w-4 h-4 text-[#FF3B1D]" />,
  },
  {
    name: 'Clinical SOAP Note Synthesis',
    category: 'applied_ai',
    categoryLabel: 'Applied AI & Clinical',
    roleTag: 'Clinical Decision Support',
    description:
      'Automated extraction of patient dialogue into structured Subjective, Objective, Assessment, and Plan records for physician review.',
    deployedIn: 'MediKiosk Doctor Copilot',
    icon: <CheckCircle2 className="w-4 h-4 text-[#FF3B1D]" />,
  },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<DomainId>('all');

  const filteredCompetencies =
    activeFilter === 'all'
      ? TECHNICAL_COMPETENCIES
      : TECHNICAL_COMPETENCIES.filter((c) => c.category === activeFilter);

  return (
    <section
      id="skills"
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] py-24 sm:py-32 lg:py-36 border-t border-black/10 select-none flex flex-col items-center"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Main Symmetrical Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 self-center flex flex-col">
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Aligned Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-10 sm:mb-14">
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
        <div className="w-full mb-14 sm:mb-16 space-y-3">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
            <span>ARCHITECTURAL MASTERY & UNIQUE ADVANTAGE</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-[1.05]">
            Engineering Stack & Theoretical Rigor
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-sans pt-1 max-w-2xl leading-relaxed">
            A distinct convergence of formal university data science training, low-level desktop systems engineering, and luxury high-performance UI craft.
          </p>
        </div>

        {/* =====================================================================
            PART 1: THE THREE ARCHITECTURAL PILLARS (THE UNIQUE ADVANTAGE)
            ===================================================================== */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-3xl bg-white border border-black/10 p-7 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05)] hover:border-black/25 hover:shadow-[0_15px_45px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-3 py-1 rounded-full">
                  [ PILLAR 01 ]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-md font-semibold">
                  SPPU Honors Track
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans font-semibold text-xl sm:text-2xl text-[#111111] tracking-tight">
                  Academic & Statistical Rigor
                </h3>
                <p className="font-mono text-xs text-[#FF3B1D] font-medium tracking-wide">
                  Formal 4-Year B.Sc. Data Science Curriculum
                </p>
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Grounded in mathematical probability distributions, Bayesian inference, hypothesis testing, and 3NF database normalization at Savitribai Phule Pune University Department of Technology.
              </p>
            </div>

            <div className="pt-6 border-t border-black/5 mt-6 space-y-2">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Core Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Probability Theory', 'Bayesian Inference', 'Multivariate EDA', 'R & Python', 'RDBMS Normalization'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F6F5F2] text-neutral-700 border border-black/5"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-3xl bg-white border border-black/10 p-7 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05)] hover:border-black/25 hover:shadow-[0_15px_45px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-3 py-1 rounded-full">
                  [ PILLAR 02 ]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 bg-blue-500/10 px-2.5 py-0.5 rounded-md font-semibold">
                  Low-Level Runtimes
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans font-semibold text-xl sm:text-2xl text-[#111111] tracking-tight">
                  Systems & Agent Tooling
                </h3>
                <p className="font-mono text-xs text-[#FF3B1D] font-medium tracking-wide">
                  Multi-Agent IDE & ConPTY Streaming
                </p>
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Architecting real desktop infrastructure: raw Windows pseudoconsole (ConPTY) streams, multi-terminal GPU grids, and per-session Git worktree sandboxing eliminating parallel agent collisions.
              </p>
            </div>

            <div className="pt-6 border-t border-black/5 mt-6 space-y-2">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Core Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['ConPTY Streams', 'xterm.js GPU', 'Git Worktrees', 'Electron IPC', 'Sub-20ms I/O'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F6F5F2] text-neutral-700 border border-black/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.19 }}
            className="rounded-3xl bg-white border border-black/10 p-7 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05)] hover:border-black/25 hover:shadow-[0_15px_45px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-3 py-1 rounded-full">
                  [ PILLAR 03 ]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-700 bg-purple-500/10 px-2.5 py-0.5 rounded-md font-semibold">
                  Aesthetic Engineering
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans font-semibold text-xl sm:text-2xl text-[#111111] tracking-tight">
                  Interaction & 60 FPS WebGL
                </h3>
                <p className="font-mono text-xs text-[#FF3B1D] font-medium tracking-wide">
                  Swiss Brutalism Meets Hardware Shaders
                </p>
              </div>

              <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                Bridging deterministic backend code with high-end aesthetic execution. Hardware-accelerated 3D WebGL globes, fluid Framer spring physics, and tokenized design systems built for production.
              </p>
            </div>

            <div className="pt-6 border-t border-black/5 mt-6 space-y-2">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                Core Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Next.js 15 App Router', 'Three.js / WebGL', 'Framer Spring Physics', 'Tailwind Tokens', 'Figma Systems'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F6F5F2] text-neutral-700 border border-black/5"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================================
            PART 2: THE INTERACTIVE ARCHITECTURAL MATRIX (NO FAKE % BARS)
            ===================================================================== */}
        <div className="w-full bg-white rounded-3xl border border-black/10 p-6 sm:p-10 lg:p-12 shadow-[0_12px_45px_-15px_rgba(0,0,0,0.06)] mb-16 sm:mb-20">
          {/* Matrix Controls Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-black/10">
            <div>
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.20em] text-[#FF3B1D] font-semibold flex items-center gap-2">
                <span>VERIFIED PRODUCTION & ACADEMIC STACK</span>
              </div>
              <h3 className="font-sans font-semibold text-2xl sm:text-3xl text-[#111111] tracking-tight pt-1">
                Technical Competencies & Deployed Runtimes
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {DOMAIN_FILTERS.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#111111] text-[#F4E3B2] shadow-sm font-semibold'
                        : 'bg-[#F6F5F2] text-neutral-600 hover:text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-neutral-500'
                      }`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Verified Competencies */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCompetencies.map((item) => (
                <motion.div
                  layout
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F6F5F2] border border-black/5 hover:border-black/20 hover:bg-white transition-all duration-300 flex flex-col justify-between group/card shadow-none hover:shadow-[0_8px_25px_-10px_rgba(0,0,0,0.06)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white border border-black/5 group-hover/card:border-black/15 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 bg-black/5 px-2 py-0.5 rounded-md font-medium">
                        {item.roleTag}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-sm sm:text-[15px] text-[#111111] group-hover/card:text-[#FF3B1D] transition-colors">
                        {item.name}
                      </h4>
                      <div className="font-mono text-[10px] text-neutral-400 font-medium pt-0.5">
                        {item.categoryLabel}
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-neutral-600 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 mt-4 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">Deployed In:</span>
                    <span className="font-semibold text-neutral-800 text-right truncate max-w-[170px]">
                      {item.deployedIn}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* =====================================================================
            PART 3: FORMAL INSTITUTIONAL & ACADEMIC DOSSIER BANNER
            ===================================================================== */}
        <div className="w-full rounded-3xl bg-[#07090F] text-white p-7 sm:p-10 lg:p-12 border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF3B1D]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Details */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#F4E3B2] font-mono text-[10px] tracking-wider uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF3B1D]" />
              <span>Savitribai Phule Pune University (SPPU)</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-sans font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                Department of Technology (DoT)
              </h3>
              <p className="font-mono text-xs sm:text-sm text-neutral-400">
                Bachelor of Science (B.Sc.) in Data Science &bull; 2nd Year (2024–2028)
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              Rigorous 4-year undergraduate education covering probability & statistics, data structures, multivariate analysis, relational database systems, and modern AI algorithms. Open for high-impact AI Engineering, Systems, and Data Science internships.
            </p>
          </div>

          {/* Right Action Quick Connect */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="mailto:soham.ai.research@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#FF3B1D] hover:bg-[#e03419] text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md group"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact via Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://www.linkedin.com/in/soham-bhagat-0132b33a0/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-semibold tracking-wider transition-colors border border-white/15"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>View LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
