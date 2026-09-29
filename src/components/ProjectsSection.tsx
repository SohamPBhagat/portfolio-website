'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface ProjectCaseStudy {
  number: string;
  total: string;
  shortName: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: string;
  description: string;
  specs: { label: string; value: string }[];
  stack: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  displayUrl: string;
}

const PROJECTS: ProjectCaseStudy[] = [
  {
    number: '01',
    total: '03',
    shortName: 'FORGE STUDIO',
    title: 'Forge Studio',
    tagline: 'Multi-Agent Parallel IDE & ConPTY Terminal Engine',
    category: 'DEVELOPER TOOLS & MULTI-AGENT RUNTIMES',
    year: '2026',
    status: 'ACTIVE PRODUCTION',
    description:
      'A production desktop IDE engineered to orchestrate multiple autonomous AI coding agents (Claude Code, AGY CLI) simultaneously. Solves code divergence using per-session Git worktree sandboxing to eliminate merge collisions, paired with sub-20ms GPU-accelerated ConPTY terminal streaming.',
    specs: [
      { label: 'WORKTREE SANDBOXING', value: '100% Collision-Free' },
      { label: 'STREAM LATENCY', value: '<20ms ConPTY Core' },
    ],
    stack: 'Electron · React · TypeScript · ConPTY · xterm.js · Git Worktrees',
    image: '/images/forge-studio-grid.png',
    liveUrl: 'https://www.forgeapi.org/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'forgeapi.org/runtime/orchestrator',
  },
  {
    number: '02',
    total: '03',
    shortName: 'TELEMETRY HUD',
    title: 'Broadcast Design Telemetry Dashboard',
    tagline: 'Cybernetic 3D Globe Radar & Diagnostics Command Console',
    category: 'UI/UX & 3D WEBGL INTERACTION',
    year: '2026',
    status: 'LIVE ON VERCEL',
    description:
      'A high-performance telemetry console featuring an interactive hardware-accelerated 3D WebGL globe, real-time radar beam sweeps, broadcast satellite diagnostics, and brutalist aerospace HUD telemetry. Built for fluid 60 FPS performance under heavy telemetry data streams.',
    specs: [
      { label: '3D RENDER ENGINE', value: 'Three.js / WebGL 60 FPS' },
      { label: 'HUD DIAGNOSTICS', value: 'Real-Time Reactive' },
    ],
    stack: 'Next.js · React · Three.js · WebGL · Tailwind CSS · Framer Motion',
    image: '/images/broadcast-telemetry-dashboard.png',
    liveUrl: 'https://broadcast-design-telemetry-dashboar.vercel.app/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'broadcast-design-telemetry.vercel.app',
  },
  {
    number: '03',
    total: '03',
    shortName: 'MEDIKIOSK OS',
    title: 'MediKiosk Clinical OS',
    tagline: 'Autonomous Patient Case-Taking & Clinical Decision Support (CDSS)',
    category: 'HEALTHCARE AI & CLINICAL SYSTEMS',
    year: '2026',
    status: 'LIVE ON VERCEL',
    description:
      'A touch-first clinical intake terminal and intelligent doctor copilot engineered for high-throughput OPD clinics. Conducts ambient multilingual triage in regional Indian languages, extracts structured FHIR-compliant symptoms directly into patient records, and assists practitioners with real-time differential diagnoses via ABDM-compliant clinical workflows.',
    specs: [
      { label: 'MULTILINGUAL VOICE', value: '99.2% Indic Voice ASR' },
      { label: 'INTEROPERABILITY', value: 'ABDM & FHIR R4 Standard' },
    ],
    stack: 'Next.js · FastAPI · Ambient NLP · Indic Whisper · FHIR R4 · Tailwind',
    image: '/images/medikiosk.png',
    liveUrl: 'https://medikiosk-six.vercel.app/',
    githubUrl: 'https://github.com/SohamBhagat',
    displayUrl: 'medikiosk-six.vercel.app',
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  // Dedicated pinned scroll runway for Section 5 (300vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth harmonic spring for continuous, buttery-smooth scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  // Project 1 continuous transforms
  const p1Opacity = useTransform(smoothProgress, [0, 0.22, 0.35], [1, 1, 0]);
  const p1Scale = useTransform(smoothProgress, [0, 0.22, 0.35], [1, 1, 0.96]);
  const p1Y = useTransform(smoothProgress, [0, 0.22, 0.35], [0, 0, -40]);
  const p1PointerEvents = useTransform(smoothProgress, (v) => (v < 0.33 ? 'auto' : 'none'));

  // Project 2 continuous transforms
  const p2Opacity = useTransform(smoothProgress, [0.26, 0.38, 0.58, 0.70], [0, 1, 1, 0]);
  const p2Scale = useTransform(smoothProgress, [0.26, 0.38, 0.58, 0.70], [0.96, 1, 1, 0.96]);
  const p2Y = useTransform(smoothProgress, [0.26, 0.38, 0.58, 0.70], [40, 0, 0, -40]);
  const p2PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.33 && v < 0.67 ? 'auto' : 'none'));

  // Project 3 continuous transforms
  const p3Opacity = useTransform(smoothProgress, [0.62, 0.74, 1], [0, 1, 1]);
  const p3Scale = useTransform(smoothProgress, [0.62, 0.74, 1], [0.96, 1, 1]);
  const p3Y = useTransform(smoothProgress, [0.62, 0.74, 1], [40, 0, 0]);
  const p3PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.67 ? 'auto' : 'none'));

  // Track active project for UI buttons and indicators
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
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

    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.48 : 0.88;
    const targetScrollY = containerTop + targetProgress * scrollableDistance;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const projectStates = [
    { opacity: p1Opacity, scale: p1Scale, y: p1Y, pointerEvents: p1PointerEvents },
    { opacity: p2Opacity, scale: p2Scale, y: p2Y, pointerEvents: p2PointerEvents },
    { opacity: p3Opacity, scale: p3Scale, y: p3Y, pointerEvents: p3PointerEvents },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] h-[300vh] border-t-2 border-black/15 select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Viewport Stage: Vertically centered with 120px top clearance for fixed SOHAM navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 sm:pt-32 pb-8 overflow-hidden bg-[#F6F5F2]">
        
        {/* Centered Symmetrical Stage Container */}
        <div className="w-full max-w-[1500px] flex flex-col items-center justify-center my-auto">
          
          {/* =====================================================================
              CLEAN HEADER STRIP (Zero top-left masthead text — 100% clean for SOHAM navbar)
              ===================================================================== */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="space-y-1">
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3B1D] animate-ping" />
                <span>05 // SHIPPED SYSTEMS &bull; CASE STUDY STAGE</span>
              </div>
              <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
                Featured Production Systems
              </h2>
            </div>

            {/* Segmented Switcher Pills */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-black/10 shadow-sm shrink-0 self-start sm:self-auto">
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
                    <span className="truncate max-w-[120px]">{proj.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================================
              MAIN STACKED STAGE (Height tuned to ~430px — Fits any screen comfortably)
              ===================================================================== */}
          <div className="w-full relative h-[420px] sm:h-[440px] lg:h-[460px] flex items-center justify-center">
            {PROJECTS.map((proj, idx) => {
              const state = projectStates[idx];

              return (
                <motion.article
                  key={proj.number}
                  style={{
                    opacity: state.opacity,
                    scale: state.scale,
                    y: state.y,
                    pointerEvents: state.pointerEvents as any,
                  }}
                  className="absolute inset-0 w-full h-full rounded-3xl bg-white border border-black/10 p-5 sm:p-6 lg:p-7 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.07)] flex flex-col justify-between"
                >
                  {/* Card Meta Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 shrink-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#FF3B1D] bg-[#FF3B1D]/10 px-2.5 py-0.5 rounded-full">
                        [ {proj.number} / {proj.total} ]
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-neutral-700">
                        {proj.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-500">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-semibold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {proj.status}
                      </span>
                      <span className="text-neutral-300">&bull;</span>
                      <span className="font-medium text-neutral-400">{proj.year}</span>
                    </div>
                  </div>

                  {/* Main Split Grid: 5 Cols Specs / 7 Cols Framed Media */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1 my-auto">
                    
                    {/* Left: Specs & Details (5 Cols) */}
                    <div className="space-y-3 lg:col-span-5 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-[26px] text-[#111111] tracking-tight">
                          {proj.title}
                        </h3>
                        <p className="font-mono text-xs text-[#FF3B1D] font-medium tracking-wide">
                          {proj.tagline}
                        </p>
                      </div>

                      <p className="font-sans text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>

                      {/* 2 Clean Architectural Spec Blocks */}
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        {proj.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2 sm:p-2.5 rounded-xl bg-[#F6F5F2] border border-black/5 flex flex-col justify-between"
                          >
                            <div className="font-sans font-bold text-xs sm:text-[13px] text-[#111111] leading-tight truncate">
                              {spec.value}
                            </div>
                            <div className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider pt-0.5 truncate font-medium">
                              {spec.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Row */}
                      <div className="pt-0.5 border-t border-black/5">
                        <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Core Stack
                        </div>
                        <div className="font-mono text-[10px] sm:text-[11px] text-neutral-700 truncate pt-0.5">
                          {proj.stack}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-md group/btn"
                        >
                          <span>Explore System</span>
                          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>

                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6F5F2] hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold tracking-wider transition-colors border border-black/5"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      </div>
                    </div>

                    {/* Right: Framed Media Window (7 Cols) */}
                    <div className="lg:col-span-7 flex items-center justify-center">
                      <div className="relative aspect-[16/10] w-full max-h-[300px] sm:max-h-[320px] rounded-2xl bg-[#0B0E14] border border-black/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col group/img">
                        {/* Browser Window Header */}
                        <div className="h-7 sm:h-8 bg-[#07090F] border-b border-white/10 px-3 flex items-center justify-between shrink-0 select-none z-10">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            <span className="hidden sm:inline-block ml-3 font-mono text-[10px] text-white/40 tracking-wider truncate max-w-[140px]">
                              {proj.title}
                            </span>
                          </div>

                          {/* Interactive URL bar pill */}
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-mono text-[9px] sm:text-[10px] tracking-wide transition-colors group/link"
                          >
                            <span className="truncate max-w-[140px] sm:max-w-[220px]">{proj.displayUrl}</span>
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

          {/* =====================================================================
              BOTTOM FOOTER BAR WITH REAL-TIME SCROLL PROGRESS TRACK
              ===================================================================== */}
          <div className="w-full flex flex-col gap-1.5 mt-5 sm:mt-6 pt-3 border-t border-black/10">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">
                  03 FLAGSHIP SYSTEMS &bull; ALL LIVE IN PRODUCTION
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
                <span>STAGE [ {activeProjectIdx + 1} / 03 ]</span>
                <span className="text-neutral-300">&bull;</span>
                <span className="text-[#FF3B1D] font-semibold">{PROJECTS[activeProjectIdx].title}</span>
              </div>
            </div>

            {/* Continuous Real-Time Scroll Progress Line */}
            <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress, originX: 0 }}
                className="h-full bg-[#FF3B1D] rounded-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
