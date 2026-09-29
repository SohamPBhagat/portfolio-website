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

  // Dedicated pinned scroll runway for Section 5 (300vh for generous dwell time)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth harmonic spring for continuous, buttery-smooth scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  // Real-time project 1 continuous motion curves
  const p1Opacity = useTransform(smoothProgress, [0, 0.22, 0.35], [1, 1, 0]);
  const p1Scale = useTransform(smoothProgress, [0, 0.22, 0.35], [1, 1, 0.95]);
  const p1Y = useTransform(smoothProgress, [0, 0.22, 0.35], [0, 0, -45]);
  const p1PointerEvents = useTransform(smoothProgress, (v) => (v < 0.33 ? 'auto' : 'none'));

  // Real-time project 2 continuous motion curves
  const p2Opacity = useTransform(smoothProgress, [0.25, 0.36, 0.58, 0.70], [0, 1, 1, 0]);
  const p2Scale = useTransform(smoothProgress, [0.25, 0.36, 0.58, 0.70], [0.96, 1, 1, 0.95]);
  const p2Y = useTransform(smoothProgress, [0.25, 0.36, 0.58, 0.70], [50, 0, 0, -45]);
  const p2PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.33 && v < 0.67 ? 'auto' : 'none'));

  // Real-time project 3 continuous motion curves
  const p3Opacity = useTransform(smoothProgress, [0.60, 0.72, 1], [0, 1, 1]);
  const p3Scale = useTransform(smoothProgress, [0.60, 0.72, 1], [0.96, 1, 1]);
  const p3Y = useTransform(smoothProgress, [0.60, 0.72, 1], [50, 0, 0]);
  const p3PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.67 ? 'auto' : 'none'));

  // Continuously track active index for pill buttons and bottom status
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

      {/* Sticky Fullscreen Viewport Stage — With generous 110px top clearance for fixed SOHAM navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 pt-24 sm:pt-28 pb-5 sm:pb-6 overflow-hidden bg-[#F6F5F2]">
        
        {/* =====================================================================
            TOP MASTHEAD (Aligned with safe left margin so SOHAM navbar floats freely)
            ===================================================================== */}
        <div className="w-full max-w-[1540px] mx-auto flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-2.5 border-b border-black/10 shrink-0">
          <div className="flex items-center gap-2 text-neutral-800 font-semibold tracking-[0.20em] pl-0 sm:pl-32 lg:pl-36">
            <span className="text-black/30 font-light">&#123;</span>
            <span className="hidden sm:inline">SELECTED WORKS &amp; </span>ARCHITECTURES
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
        <div className="w-full max-w-[1540px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 my-1 sm:my-2">
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>SCROLL TO GLIDE &bull; {activeProjectIdx + 1} OF 03</span>
            </div>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl tracking-tight text-[#111111]">
              Featured Production Systems
            </h2>
          </div>

          {/* Segmented 3-Project Switcher Pills */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-black/10 shadow-sm shrink-0 self-start sm:self-auto">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={proj.number}
                  type="button"
                  onClick={() => handleProjectClick(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111111] text-[#F4E3B2] shadow-sm font-semibold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <span className={isActive ? 'text-[#FF3B1D]' : 'text-neutral-400'}>
                    0{idx + 1}
                  </span>
                  <span className="truncate max-w-[110px]">{proj.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            MAIN CONTINUOUS SCROLL STAGE (Directly Bound to Scroll Transforms)
            Zero frozen dead zones! Every pixel of scroll moves the system!
            ===================================================================== */}
        <div className="w-full max-w-[1540px] mx-auto flex-1 relative flex items-center justify-center my-auto min-h-[460px] max-h-[580px]">
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
                className="absolute inset-0 w-full rounded-3xl bg-white border border-black/10 p-5 sm:p-7 lg:p-8 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.08)] flex flex-col justify-between my-auto"
              >
                {/* Card Meta Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/10 shrink-0">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 pt-3 sm:pt-4 items-center flex-1">
                  
                  {/* Column 1: Details & Specs (5 Cols) */}
                  <div className="space-y-3.5 lg:col-span-5 flex flex-col justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-sans font-semibold text-xl sm:text-2xl lg:text-3xl text-[#111111] tracking-tight">
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

                    {/* Single Line Tech Stack */}
                    <div className="pt-0.5 border-t border-black/5">
                      <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-semibold pb-0.5">
                        Core Stack
                      </div>
                      <div className="font-mono text-[10px] sm:text-[11px] text-neutral-700 truncate">
                        {proj.stack}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-md group/btn"
                      >
                        <span>Explore System</span>
                        <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F5F2] hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold tracking-wider transition-colors border border-black/5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>

                  {/* Column 2: Large Cinematic Browser Frame (7 Cols) */}
                  <div className="lg:col-span-7 flex items-center justify-center">
                    <div className="relative aspect-[16/10] w-full max-h-[340px] rounded-2xl bg-[#0B0E14] border border-black/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col group/img">
                      {/* Browser Window Header */}
                      <div className="h-8 bg-[#07090F] border-b border-white/10 px-3.5 flex items-center justify-between shrink-0 select-none z-10">
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
                          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-mono text-[9px] sm:text-[10px] tracking-wide transition-colors group/link"
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
            BOTTOM VIEWPORT FOOTER BAR WITH CONTINUOUS PROGRESS TRACK
            ===================================================================== */}
        <div className="w-full max-w-[1540px] mx-auto pt-2 border-t border-black/10 flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">
                03 PRODUCTION SYSTEMS &bull; ALL VERIFIED
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
              <span>STAGE: [ {activeProjectIdx + 1} / 03 ]</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="text-[#FF3B1D] font-semibold">{PROJECTS[activeProjectIdx].title}</span>
            </div>
          </div>

          {/* Continuous Scroll Progress Bar Line */}
          <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: smoothProgress, originX: 0 }}
              className="h-full bg-[#FF3B1D] rounded-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
