'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section
      id="projects"
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] py-32 sm:py-48 lg:py-56 border-t border-black/10 select-none flex flex-col items-center"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Main Symmetrical Center Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 self-center flex flex-col">
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Aligned Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-12 sm:mb-16">
          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>SELECTED WORKS & ARCHITECTURES</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[#FF3B1D] text-sm animate-pulse">
            <span>&#9830;</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
            <span className="text-black/30 font-light">&#123;</span>
            <span>05 // SHIPPED SYSTEMS</span>
            <span className="text-black/30 font-light">&#125;</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="w-full mb-20 sm:mb-28 space-y-3">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
            <span>CASE STUDIES & PRODUCTION ARCHITECTURES</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-[1.05]">
            Featured Systems & Things I Have Built
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-sans pt-1 max-w-2xl leading-relaxed">
            In-depth architectural breakdowns of parallel developer tooling, interactive 3D WebGL telemetry consoles, and autonomous clinical operating systems.
          </p>
        </div>

        {/* =====================================================================
            EXPANSIVE NON-STACKING ARCHITECTURAL CASE STUDIES
            Each project has generous breathing room and zero overlapping borders.
            ===================================================================== */}
        <div className="w-full space-y-32 sm:space-y-44 lg:space-y-56 pb-20 sm:pb-32">
          {PROJECTS.map((proj, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.article
                key={proj.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-3xl bg-white border border-black/10 p-7 sm:p-11 lg:p-14 xl:p-16 shadow-[0_12px_45px_-15px_rgba(0,0,0,0.06)] hover:border-black/25 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.10)] transition-all duration-500"
              >
                {/* Case Study Meta Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-black/10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-3 py-1 rounded-full">
                      [ {proj.number} / {proj.total} ]
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-700">
                      {proj.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-semibold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {proj.status}
                    </span>
                    <span className="hidden sm:inline text-neutral-300">&bull;</span>
                    <span className="hidden sm:inline font-medium text-neutral-400">{proj.year}</span>
                  </div>
                </div>

                {/* Main Split Grid: 5 Cols Spec / 7 Cols Cinematic Frame */}
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 pt-8 sm:pt-10 items-center ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Column 1: Details & Specs (5 Cols) */}
                  <div className={`space-y-6 lg:col-span-5 ${isReversed ? 'lg:col-start-8' : ''}`}>
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#111111] tracking-tight">
                        {proj.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#FF3B1D] font-medium tracking-wide leading-relaxed">
                        {proj.tagline}
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Architectural Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                      {proj.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 sm:p-3.5 rounded-xl bg-[#F6F5F2] border border-black/5 flex flex-col justify-between"
                        >
                          <div className="font-sans font-bold text-xs sm:text-sm lg:text-[15px] text-[#111111] leading-tight">
                            {m.value}
                          </div>
                          <div className="font-mono text-[8px] sm:text-[9px] text-neutral-500 uppercase tracking-wider pt-1 font-medium">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-[#F6F5F2] text-neutral-700 border border-black/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                        >
                          <span>Explore System</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F6F5F2] hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold tracking-wider transition-colors border border-black/5"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Column 2: Large Cinematic Browser Frame (7 Cols) */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:col-start-1' : ''}`}>
                    <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#0B0E14] border border-black/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col group/img">
                      {/* Browser Window Header */}
                      <div className="h-9 sm:h-10 bg-[#07090F] border-b border-white/10 px-4 flex items-center justify-between shrink-0 select-none z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          <span className="hidden sm:inline-block ml-3 font-mono text-[10px] text-white/40 tracking-wider">
                            {proj.title}
                          </span>
                        </div>

                        {/* Interactive URL bar pill */}
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-mono text-[10px] tracking-wide transition-colors group/link"
                        >
                          <span className="truncate max-w-[180px] sm:max-w-[260px]">{proj.displayUrl}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60 group-hover/link:opacity-100" />
                        </a>
                      </div>

                      {/* Image Preview Window (Clickable directly to live URL) */}
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative flex-1 w-full overflow-hidden bg-[#07090F] block cursor-pointer"
                        title={`Open ${proj.title} in new tab`}
                      >
                        <img
                          src={proj.image}
                          alt={proj.title}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
