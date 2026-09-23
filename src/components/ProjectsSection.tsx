'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface ProjectCaseStudy {
  number: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: ProjectCaseStudy[] = [
  {
    number: '01',
    title: 'Forge Studio',
    tagline: 'Multi-Agent Parallel IDE & Terminal Orchestrator',
    category: 'DEVELOPER TOOLS & IDEs',
    year: '2026',
    description:
      'A production desktop application that orchestrates multiple autonomous AI coding agents (Claude Code, AGY CLI) simultaneously. Features per-session Git worktree sandboxing to eliminate merge collisions, paired with GPU-accelerated ConPTY terminal streaming.',
    metrics: [
      { label: 'Worktree Isolation', value: '100% Collision-Free' },
      { label: 'Terminal Panes', value: 'Up to 8 Parallel' },
      { label: 'Streaming Latency', value: '<20ms ConPTY' },
    ],
    tags: ['Electron', 'React', 'TypeScript', 'ConPTY', 'xterm.js', 'Git Worktrees'],
    image: '/images/forge-studio-grid.png',
    liveUrl: 'https://www.forgeapi.org/',
    githubUrl: 'https://github.com/SohamBhagat',
  },
  {
    number: '02',
    title: 'Verica Agentic OS',
    tagline: 'Token-Optimized Knowledge Graph & Desktop Assistant',
    category: 'AI AGENTS & OPERATING SYSTEMS',
    year: '2026',
    description:
      'An autonomous personal operating assistant built to solve LLM prompt bloat. Extracts on-demand SQLite relationship graphs in compact ~200 token slices, integrated with local Whisper speech-to-text and real-time screen capture diagnostics.',
    metrics: [
      { label: 'Context Size', value: '~200 Tokens' },
      { label: 'Voice Stack Cost', value: '$0.00 Local' },
      { label: 'Response Engine', value: 'Sub-500ms FastAPI' },
    ],
    tags: ['Python', 'FastAPI', 'SQLite Graph', 'Whisper STT', 'Next.js', 'Tailwind'],
    image: '/images/forge-studio-canvas.png',
    liveUrl: 'https://www.forgeapi.org/',
    githubUrl: 'https://github.com/SohamBhagat',
  },
  {
    number: '03',
    title: 'HyperFrames Motion',
    tagline: 'Autonomous Motion Graphics & Kinetic Video Pipeline',
    category: 'VIDEO & MOTION ENGINEERING',
    year: '2026',
    description:
      'A headless video synthesis pipeline that converts raw scripts and voice tracks into frame-accurate GSAP motion graphics, audio-reactive waveforms, and rendered MP4 deliverables via Remotion and FFmpeg.',
    metrics: [
      { label: 'Visual Identities', value: '32 Cataloged' },
      { label: 'Turnaround Boost', value: '10x Faster' },
      { label: 'Rendering Core', value: 'Frame-Accurate FFmpeg' },
    ],
    tags: ['GSAP', 'Remotion', 'FFmpeg', 'Node.js', 'TypeScript', 'Whisper'],
    image: '/images/forge-studio-grid.png',
    liveUrl: 'https://www.forgeapi.org/',
    githubUrl: 'https://github.com/SohamBhagat',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] py-24 sm:py-32 lg:py-40 border-t border-black/10 select-none flex flex-col items-center">
      
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Perfectly Centered Full-Width Container (1600px max, equal margins left and right) */}
      <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 self-center flex flex-col">
        
        {/* =====================================================================
            TOP MASTHEAD (Edge-to-Edge Aligned Symmetrical Bar)
            ===================================================================== */}
        <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-10 sm:mb-14">
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

        {/* Section Title */}
        <div className="w-full mb-12 sm:mb-16 space-y-2">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
            <span>CASE STUDIES & PRODUCTION ARCHITECTURES</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-[1.05]">
            Featured Systems & Things I Have Built
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-sans pt-1 max-w-2xl leading-relaxed">
            In-depth architectural breakdowns of production developer tooling, local AI agent operating systems, and video synthesis engines.
          </p>
        </div>

        {/* =====================================================================
            FULL-WIDTH BALANCED CARD-DECK STACKING SHOWCASE
            ===================================================================== */}
        <div className="w-full space-y-12 sm:space-y-16 pb-12">
          {PROJECTS.map((proj, idx) => {
            const isEven = idx % 2 === 1;
            const topOffset = 90 + idx * 24;

            return (
              <motion.article
                key={proj.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  top: `${topOffset}px`,
                  zIndex: idx + 10,
                }}
                className="sticky w-full rounded-3xl bg-white border border-black/10 p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] hover:border-black/20 transition-all duration-500"
              >
                {/* Card Top Metadata Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-black/10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-3 py-1 rounded-full">
                      [ {proj.number} ]
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-600">
                      {proj.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 font-medium">
                    {proj.year} &bull; PRODUCTION SYSTEM
                  </span>
                </div>

                {/* Main Split Grid: 5 Cols Text & 7 Cols Large Cinematic Media */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-8 sm:pt-10 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}>
                  
                  {/* Left Column: Details, Metrics & CTAs (5 Cols) */}
                  <div className={`space-y-6 lg:col-span-5 ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#111111] tracking-tight">
                        {proj.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#FF3B1D] font-medium tracking-wide">
                        {proj.tagline}
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                      {proj.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-3 sm:p-3.5 rounded-xl bg-[#F6F5F2] border border-black/5">
                          <div className="font-sans font-bold text-sm sm:text-base text-[#111111]">
                            {m.value}
                          </div>
                          <div className="font-mono text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-wider pt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 border border-black/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md group/btn"
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
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold tracking-wider transition-colors border border-black/5"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Large Cinematic Media Window (7 Cols) */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="relative aspect-[16/10] w-full rounded-2xl bg-[#0B0E14] border border-black/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col group/img">
                      {/* macOS Header Bar */}
                      <div className="h-9 bg-[#07090F] border-b border-white/10 px-4 flex items-center justify-between shrink-0 select-none z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                          <span className="ml-2 font-mono text-[10px] text-white/50 tracking-wider">
                            {proj.title} &bull; Runtime
                          </span>
                        </div>
                      </div>

                      {/* Image Preview */}
                      <div className="relative flex-1 w-full overflow-hidden bg-[#07090F]">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover brightness-95 group-hover/img:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />
                      </div>
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
