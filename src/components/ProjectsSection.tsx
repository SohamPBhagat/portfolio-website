'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface ProjectCaseStudy {
  number: string;
  total: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  displayUrl: string;
}

const PROJECTS: ProjectCaseStudy[] = [
  {
    number: '01',
    total: '03',
    title: 'Forge Studio',
    tagline: 'Multi-Agent Parallel IDE & ConPTY Terminal Orchestration Engine',
    category: 'DEVELOPER TOOLS & MULTI-AGENT RUNTIMES',
    year: '2026',
    status: 'ACTIVE PRODUCTION',
    description:
      'A production desktop IDE engineered to orchestrate multiple autonomous AI coding agents (Claude Code, AGY CLI) simultaneously. Solves multi-agent code divergence using per-session Git worktree sandboxing to completely eliminate merge collisions, coupled with GPU-accelerated ConPTY terminal streaming for sub-20ms latency.',
    metrics: [
      { label: 'WORKTREE ISOLATION', value: '100% Collision-Free' },
      { label: 'STREAM LATENCY', value: '<20ms ConPTY' },
      { label: 'PARALLEL AGENTS', value: '8 Concurrent Panes' },
    ],
    tags: ['Electron', 'React', 'TypeScript', 'ConPTY', 'xterm.js', 'Git Worktrees'],
    image: '/images/forge-studio-grid.png',
    liveUrl: 'https://www.forgeapi.org/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'forgeapi.org/runtime/orchestrator',
  },
  {
    number: '02',
    total: '03',
    title: 'Broadcast Design Telemetry Dashboard',
    tagline: 'Cybernetic 3D Globe Radar & Diagnostics Command Console',
    category: 'UI/UX & 3D WEBGL INTERACTION',
    year: '2026',
    status: 'LIVE ON VERCEL',
    description:
      'A high-performance cybernetic telemetry console featuring an interactive hardware-accelerated 3D WebGL globe, real-time radar beam sweeps, broadcast satellite diagnostics, and brutalist aerospace HUD telemetry. Built for fluid 60 FPS performance under heavy telemetry data streams.',
    metrics: [
      { label: 'RENDER ENGINE', value: 'Three.js / WebGL 60 FPS' },
      { label: 'HUD DIAGNOSTICS', value: 'Real-Time Reactive' },
      { label: 'EDGE DEPLOYMENT', value: 'Active on Vercel' },
    ],
    tags: ['Next.js', 'React', 'Three.js', 'WebGL', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/broadcast-telemetry-dashboard.png',
    liveUrl: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'broadcast-design-telemetry.vercel.app',
  },
  {
    number: '03',
    total: '03',
    title: 'MediKiosk Clinical OS',
    tagline: 'Autonomous Patient Case-Taking & Clinical Decision Support (CDSS)',
    category: 'HEALTHCARE AI & CLINICAL SYSTEMS',
    year: '2026',
    status: 'LIVE ON VERCEL',
    description:
      'A touch-first clinical intake terminal and intelligent doctor copilot engineered for high-throughput OPD clinics. Conducts ambient multilingual triage in regional Indian languages, extracts structured FHIR-compliant symptoms directly into patient records, and assists practitioners with real-time differential diagnoses via ABDM-compliant clinical workflows.',
    metrics: [
      { label: 'MULTILINGUAL VOICE', value: '99.2% Indic ASR' },
      { label: 'DOCTOR OVERHEAD', value: '-68% Intake Delay' },
      { label: 'INTEROPERABILITY', value: 'ABDM & FHIR R4' },
    ],
    tags: ['Next.js', 'FastAPI', 'Ambient NLP', 'Indic Whisper', 'FHIR R4', 'Tailwind CSS'],
    image: '/images/medikiosk.png',
    liveUrl: 'https://medikiosk-six.vercel.app/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'medikiosk-six.vercel.app',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [userSelected, setUserSelected] = useState<boolean>(false);
  const userOverrideTimeout = useRef<NodeJS.Timeout | null>(null);

  // Dedicated pinned scroll runway for Section 5 (300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly sync scroll progress across the 3 flagship projects
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (userSelected) return;
    if (latest < 0.33) {
      setActiveProjectIdx(0);
    } else if (latest < 0.67) {
      setActiveProjectIdx(1);
    } else {
      setActiveProjectIdx(2);
    }
  });

  const handleProjectClick = (index: number) => {
    setActiveProjectIdx(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    const targetProgress = (index + 0.35) / 3;
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    setUserSelected(true);
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    if (userOverrideTimeout.current) clearTimeout(userOverrideTimeout.current);
    userOverrideTimeout.current = setTimeout(() => {
      setUserSelected(false);
    }, 1000);
  };

  const project = PROJECTS[activeProjectIdx];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] h-[300vh] border-t-2 border-black/15 select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 lg:py-10 overflow-hidden bg-[#F6F5F2]">
        
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Aligned Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3 border-b border-black/10 shrink-0">
          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>SELECTED WORKS & ARCHITECTURES</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>

          <div className="flex items-center text-[#FF3B1D] text-sm animate-pulse">
            <span>&#9830;</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>05 // SHIPPED SYSTEMS</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>
        </div>

        {/* =====================================================================
            HEADER STRIP & INTERACTIVE PROJECT SELECTOR
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 my-2">
          <div className="space-y-1">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>PINNED CASE STUDY STAGE &bull; SCROLL TO TRANSITION</span>
            </div>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
              Featured Production Systems
            </h2>
          </div>

          {/* Segmented 3-Project Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-black/10 shadow-sm shrink-0 self-start md:self-auto">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.number}
                  type="button"
                  onClick={() => handleProjectClick(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#111111] text-[#F4E3B2] shadow-sm font-semibold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <span className={isActive ? 'text-[#FF3B1D]' : 'text-neutral-400'}>
                    0{idx + 1}
                  </span>
                  <span className="hidden sm:inline truncate max-w-[120px]">{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            MAIN PINNED CASE STUDY CARD
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col justify-center my-auto min-h-0">
          <AnimatePresence mode="wait">
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl bg-white border border-black/10 p-5 sm:p-7 lg:p-9 xl:p-10 shadow-[0_12px_45px_-15px_rgba(0,0,0,0.08)] flex flex-col justify-between my-auto"
            >
              {/* Card Meta Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-2.5 py-0.5 rounded-full">
                    [ {project.number} / {project.total} ]
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-neutral-700">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-semibold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {project.status}
                  </span>
                  <span className="hidden sm:inline text-neutral-300">&bull;</span>
                  <span className="hidden sm:inline font-medium text-neutral-400">{project.year}</span>
                </div>
              </div>

              {/* Main Split Grid: 5 Cols Spec / 7 Cols Cinematic Frame */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 pt-5 items-center">
                
                {/* Column 1: Details & Specs (5 Cols) */}
                <div className="space-y-4 lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#111111] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-[13px] text-[#FF3B1D] font-medium tracking-wide">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 lg:line-clamp-4">
                    {project.description}
                  </p>

                  {/* Architectural Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-[#F6F5F2] border border-black/5 flex flex-col justify-between"
                      >
                        <div className="font-sans font-bold text-xs sm:text-[13px] text-[#111111] leading-tight truncate">
                          {m.value}
                        </div>
                        <div className="font-mono text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider pt-0.5 truncate font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#F6F5F2] text-neutral-700 border border-black/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md group/btn"
                      >
                        <span>Explore System</span>
                        <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F5F2] hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold tracking-wider transition-colors border border-black/5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Column 2: Large Cinematic Browser Frame (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#0B0E14] border border-black/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col group/img">
                    {/* Browser Window Header */}
                    <div className="h-8 sm:h-9 bg-[#07090F] border-b border-white/10 px-4 flex items-center justify-between shrink-0 select-none z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        <span className="hidden sm:inline-block ml-3 font-mono text-[10px] text-white/40 tracking-wider">
                          {project.title}
                        </span>
                      </div>

                      {/* Interactive URL bar pill */}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-mono text-[9px] sm:text-[10px] tracking-wide transition-colors group/link"
                      >
                        <span className="truncate max-w-[160px] sm:max-w-[240px]">{project.displayUrl}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60 group-hover/link:opacity-100" />
                      </a>
                    </div>

                    {/* Image Preview Window (Clickable directly to live URL) */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="relative flex-1 w-full overflow-hidden bg-[#07090F] block cursor-pointer"
                      title={`Open ${project.title} in new tab`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top brightness-95 group-hover/img:scale-[1.03] group-hover/img:brightness-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/20 text-[#F4E3B2] font-mono text-xs font-semibold flex items-center gap-2 shadow-xl">
                          <span>Open Live System</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

            </motion.article>
          </AnimatePresence>
        </div>

        {/* =====================================================================
            BOTTOM VIEWPORT FOOTER BAR
            ===================================================================== */}
        <div className="w-full max-w-[1600px] mx-auto pt-3 border-t border-black/10 flex items-center justify-between font-mono text-xs text-neutral-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800">
              03 FLAGSHIP SYSTEMS &bull; ALL LIVE IN PRODUCTION
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
            <span>CURRENT STAGE: [ {activeProjectIdx + 1} / 03 ]</span>
            <span className="text-neutral-300">&bull;</span>
            <span className="text-[#FF3B1D] font-semibold">{project.title}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
