'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Brain,
  Terminal,
  ArrowUpRight
} from 'lucide-react';

interface StackCategory {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  pillarNumber: string;
  pillarTitle: string;
  pillarDescription: string;
  pillarBadge: string;
  skills: { name: string; level: string; note: string; proficiency: number }[];
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    id: 'languages',
    tabLabel: 'Languages',
    title: 'Core Languages & Runtimes',
    subtitle: 'High-throughput backends, scripting & statistical computing',
    icon: <Code2 className="w-4 h-4 text-[#FF3B1D]" />,
    pillarNumber: '01',
    pillarTitle: 'Data Science Theory & Statistical Rigor',
    pillarDescription:
      'Formal academic training at SPPU Department of Technology. Deep understanding of probability distributions, Bayesian inference, and statistical validity behind modern intelligence.',
    pillarBadge: 'SPPU B.Sc. Data Science Track',
    skills: [
      { name: 'Python', level: 'Advanced', note: 'FastAPI, LangGraph, Scikit-Learn, PyTorch', proficiency: 95 },
      { name: 'TypeScript', level: 'Advanced', note: 'Strict typing, Next.js, Electron, Node APIs', proficiency: 92 },
      { name: 'JavaScript (ES6+)', level: 'Advanced', note: 'Event-loop multiplexing, asynchronous concurrency', proficiency: 94 },
      { name: 'R', level: 'Honors', note: 'Statistical modeling, hypothesis testing, EDA', proficiency: 90 },
      { name: 'SQL / SQLite', level: 'Proficient', note: 'Graph relation queries, zero-token memory structures', proficiency: 88 },
      { name: 'C++ (Foundations)', level: 'Academic', note: 'Data structures, algorithmic complexity, memory', proficiency: 82 },
    ],
  },
  {
    id: 'frontend',
    tabLabel: 'Frontend',
    title: 'Frontend & Luxury Product Craft',
    subtitle: 'Modern interfaces, micro-interactions & design systems',
    icon: <Layers className="w-4 h-4 text-[#FF3B1D]" />,
    pillarNumber: '02',
    pillarTitle: 'High-Ticket Editorial Product Craft',
    pillarDescription:
      'Bridging deterministic code with luxury editorial aesthetics: liquid glass tokens, fluid spring physics, and production-ready Next.js 15 & Webflow client builds.',
    pillarBadge: 'Awwwards-Tier Design Standards',
    skills: [
      { name: 'Next.js 15 (App Router)', level: 'Production', note: 'Server components, streaming SSR, edge runtime', proficiency: 96 },
      { name: 'React 19', level: 'Production', note: 'Concurrent rendering, custom hooks, state stores', proficiency: 95 },
      { name: 'Tailwind CSS', level: 'Mastery', note: 'Design systems, liquid glass tokens, responsive grids', proficiency: 98 },
      { name: 'Framer Motion & GSAP', level: 'Production', note: 'Spring physics, layout animations, kinetic waves', proficiency: 94 },
      { name: 'Webflow & CMS', level: 'Bespoke', note: 'High-converting client builds & semantic setups', proficiency: 92 },
      { name: 'UI/UX & Figma', level: 'Editorial', note: 'Typography hierarchy, design tokens, wireframing', proficiency: 90 },
    ],
  },
  {
    id: 'tooling',
    tabLabel: 'Autonomous Systems',
    title: 'Autonomous Systems & Low-Level Tooling',
    subtitle: 'Agentic runtimes, terminal multiplexers & video engines',
    icon: <Cpu className="w-4 h-4 text-[#FF3B1D]" />,
    pillarNumber: '03',
    pillarTitle: 'Low-Level Autonomous Runtimes',
    pillarDescription:
      'Architecting deep developer infrastructure: raw ConPTY streaming, multi-pane terminal grid multiplexers, and per-session Git worktree isolation for parallel AI coding agents.',
    pillarBadge: 'Shipped Forge Studio & Verica OS',
    skills: [
      { name: 'ConPTY & node-pty', level: 'Specialization', note: 'Raw pseudo-terminal streaming in desktop apps', proficiency: 95 },
      { name: 'xterm.js', level: 'Production', note: 'GPU-accelerated multi-pane terminal grids', proficiency: 93 },
      { name: 'Git Worktree Architecture', level: 'Specialization', note: 'Zero-collision branch isolation per agent session', proficiency: 96 },
      { name: 'FastAPI & Async IO', level: 'Production', note: 'Sub-50ms REST/WebSocket agent control planes', proficiency: 92 },
      { name: 'Faster-Whisper & Edge-TTS', level: 'Local Daemon', note: 'Zero-API-cost on-device speech intelligence', proficiency: 89 },
      { name: 'Remotion & FFmpeg', level: 'Pipeline Core', note: 'Automated video composition & kinetic typography', proficiency: 91 },
    ],
  },
  {
    id: 'theory',
    tabLabel: 'Data Science & Theory',
    title: 'Data Science & Statistical Theory',
    subtitle: 'Academic foundation from SPPU Department of Technology',
    icon: <Brain className="w-4 h-4 text-[#FF3B1D]" />,
    pillarNumber: '04',
    pillarTitle: 'Academic Rigor & Theoretical Foundation',
    pillarDescription:
      'Formal 4-year undergraduate track in Data Science at Savitribai Phule Pune University. Grounded in mathematical foundations, statistical analytics, and database management.',
    pillarBadge: 'SPPU 2nd Year Honors (2024–2028)',
    skills: [
      { name: 'Statistical Analytics', level: 'SPPU Honors', note: 'Probability theory, Bayesian reasoning, regression', proficiency: 94 },
      { name: 'Data Visualization', level: 'SPPU Honors', note: 'ggplot2, Matplotlib, Seaborn, interactive dashboards', proficiency: 92 },
      { name: 'Database Management', level: 'SPPU Honors', note: 'Relational schemas, normalization, query optimization', proficiency: 90 },
      { name: 'Machine Learning Pipelines', level: 'Applied', note: 'Data preprocessing, feature engineering, evaluation', proficiency: 88 },
      { name: 'Exploratory Data Analysis', level: 'Applied', note: 'Multivariate distributions, anomaly detection', proficiency: 91 },
      { name: 'Algorithmic Complexity', level: 'Foundational', note: 'Big-O bounds, cache locality, memory patterns', proficiency: 86 },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);

  // Dedicated scroll runway for Section 6
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly sync scroll progress across the 4 technical domains
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveCategoryIdx(0);
    } else if (latest < 0.50) {
      setActiveCategoryIdx(1);
    } else if (latest < 0.75) {
      setActiveCategoryIdx(2);
    } else {
      setActiveCategoryIdx(3);
    }
  });

  const activeCategory = STACK_CATEGORIES[activeCategoryIdx];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative z-20 bg-[#F6F5F2] text-[#111111] h-[220vh] border-t border-black/10 select-none"
    >
      {/* Architectural Blueprint Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 xl:px-20 overflow-hidden bg-[#F6F5F2]">
        
        {/* Symmetrical Container matching Sections 4 & 5 */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col self-center">
          
          {/* =====================================================================
              TOP MASTHEAD — Edge-to-Edge Aligned Symmetrical Bar
              ===================================================================== */}
          <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-6 lg:mb-8">
            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>SKILLS & CREDENTIALS</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[#FF3B1D] text-sm animate-pulse">
              <span>&#9830;</span>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>06 // TECHNICAL MATRIX</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-6 lg:mb-8 space-y-1.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>THE ARCHITECTURAL ARSENAL & UNIQUE EDGE</span>
            </div>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
              What Makes My Engineering Unique
            </h2>
          </div>

          {/* =====================================================================
              MAIN BALANCED 5/7 WORKBENCH STAGE
              ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* ── LEFT CONSOLE: 4 Interactive Category Pillars (5 Cols) ── */}
            <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
              {STACK_CATEGORIES.map((cat, idx) => {
                const isActive = activeCategoryIdx === idx;

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryIdx(idx)}
                    onClick={() => setActiveCategoryIdx(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl transition-all duration-300 relative group cursor-pointer border ${
                      isActive
                        ? 'bg-white border-black/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]'
                        : 'bg-transparent border-black/5 hover:border-black/15 hover:bg-white/40'
                    }`}
                  >
                    {/* Left Crimson Active Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activePillarBar"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#FF3B1D] rounded-r shadow-sm"
                      />
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 pl-2 min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-mono text-xs font-bold tracking-wider transition-colors shrink-0 ${
                              isActive ? 'text-[#FF3B1D]' : 'text-neutral-400 group-hover:text-neutral-600'
                            }`}
                          >
                            [ {cat.pillarNumber} ]
                          </span>
                          <h3
                            className={`font-sans text-sm sm:text-base lg:text-[17px] tracking-tight transition-colors ${
                              isActive
                                ? 'font-semibold text-[#111111]'
                                : 'font-normal text-neutral-600 group-hover:text-black'
                            }`}
                          >
                            {cat.pillarTitle}
                          </h3>
                        </div>

                        <p className="font-sans text-[11px] sm:text-xs text-neutral-500 pl-7 leading-relaxed line-clamp-2">
                          {cat.pillarDescription}
                        </p>

                        <div className="pl-7 pt-1 flex items-center gap-1.5 text-[10px] font-mono text-[#FF3B1D]">
                          <CheckCircle2 size={11} className="shrink-0" />
                          <span className="font-medium tracking-wide truncate">{cat.pillarBadge}</span>
                        </div>
                      </div>

                      <div
                        className={`shrink-0 transition-all duration-300 pt-1 ${
                          isActive
                            ? 'opacity-100 text-[#FF3B1D] translate-x-0'
                            : 'opacity-0 -translate-x-2 text-neutral-400 group-hover:opacity-40'
                        }`}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* SPPU University Credential Mini-Banner */}
              <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#0B0E14] text-white border border-white/10 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2.5 pl-1">
                  <div className="p-1.5 rounded-lg bg-[#FF3B1D]/20 text-[#FF3B1D] shrink-0">
                    <GraduationCap size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-xs sm:text-sm text-white tracking-tight truncate">
                      B.Sc. Data Science @ SPPU
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-neutral-400 truncate">
                      Dept of Technology &bull; 2nd Year (2024–2028)
                    </div>
                  </div>
                </div>

                <div className="shrink-0 px-2.5 py-1 rounded-md bg-white/10 border border-white/10 font-mono text-[9px] font-bold text-emerald-400">
                  Honors Track
                </div>
              </div>
            </div>

            {/* ── RIGHT CONSOLE: Deep Technical Matrix Terminal (7 Cols) ── */}
            <div className="lg:col-span-7">
              <div className="w-full bg-[#0A0D15] rounded-2xl border border-black/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
                
                {/* Top macOS Control Bar */}
                <div className="h-11 bg-[#07090F] border-b border-white/10 px-4 sm:px-5 flex items-center justify-between select-none shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                    <span className="ml-2 font-mono text-[10px] sm:text-[11px] text-white/60 tracking-wider">
                      MATRIX://{activeCategory.id} &bull; {activeCategory.skills.length} TECHNOLOGIES
                    </span>
                  </div>

                  {/* View Tabs */}
                  <div className="flex items-center gap-1">
                    {STACK_CATEGORIES.map((cat, idx) => {
                      const isSelected = activeCategoryIdx === idx;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategoryIdx(idx)}
                          className={`relative px-2.5 py-1 rounded-md font-mono text-[10px] tracking-wider transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'text-white font-bold bg-[#FF3B1D]'
                              : 'text-neutral-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          0{idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subheader Title Inside Terminal */}
                <div className="px-5 py-3 bg-[#080B11] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/5">
                      {activeCategory.icon}
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-xs sm:text-sm text-white">
                        {activeCategory.title}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400">
                        {activeCategory.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">
                    Active Stack
                  </span>
                </div>

                {/* Skills Grid: Clean 2-Col or 3-Col Matrix Stage */}
                <div className="p-4 sm:p-5 relative bg-[#05070C] min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {activeCategory.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3 sm:p-3.5 rounded-xl bg-[#0D111A] border border-white/5 hover:border-[#FF3B1D]/30 transition-all duration-300 space-y-2 group/card"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-sans font-bold text-xs sm:text-[13px] text-white group-hover/card:text-[#FF3B1D] transition-colors">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[9px] font-semibold text-[#FF3B1D] bg-[#FF3B1D]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {skill.level}
                            </span>
                          </div>

                          {/* Progress Track */}
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 0.6, delay: sIdx * 0.04 }}
                              className="h-full bg-[#FF3B1D] rounded-full"
                            />
                          </div>

                          <p className="text-[10px] sm:text-[11px] text-neutral-400 font-sans leading-relaxed">
                            {skill.note}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Technical Corner Brackets */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40 pointer-events-none" />
                </div>

                {/* Bottom Terminal Status Bar */}
                <div className="h-8 bg-[#07090F] border-t border-white/10 px-4 flex items-center justify-between text-[10px] font-mono text-neutral-400 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: ALL RUNTIMES VERIFIED</span>
                  </div>
                  <span className="text-neutral-500 hidden sm:inline">
                    SPPU DEPT OF TECHNOLOGY &bull; PUNE, IN
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
