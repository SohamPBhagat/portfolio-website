'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/SocialIcons';

interface StackItem {
  name: string;
  focus: string;
  href?: string;
}

interface StackColumn {
  index: string;
  category: string;
  subtitle: string;
  items: StackItem[];
}

const STACK_COLUMNS: StackColumn[] = [
  {
    index: '01',
    category: 'SYSTEMS & RUNTIMES',
    subtitle: 'Low-level desktop & process infrastructure',
    items: [
      { name: 'ConPTY / node-pty', focus: 'OS Terminal Streaming', href: 'https://www.forgeapi.org/' },
      { name: 'xterm.js', focus: 'GPU Terminal Canvas', href: 'https://www.forgeapi.org/' },
      { name: 'Git Worktrees', focus: 'Branch Sandboxing', href: 'https://www.forgeapi.org/' },
      { name: 'FastAPI', focus: 'Async Control Planes', href: 'https://medikiosk-six.vercel.app/' },
      { name: 'Electron Core', focus: 'Desktop Runtimes', href: 'https://www.forgeapi.org/' },
      { name: 'Faster-Whisper', focus: 'Local Audio Daemon', href: 'https://medikiosk-six.vercel.app/' },
    ],
  },
  {
    index: '02',
    category: 'DATA SCIENCE & STATS',
    subtitle: 'Mathematical rigor & database foundations',
    items: [
      { name: 'Python Stack', focus: 'NumPy, Pandas, Scikit' },
      { name: 'R Programming', focus: 'Statistical Inference & ANOVA' },
      { name: 'SQL & SQLite', focus: '3NF RDBMS & Graph Memory' },
      { name: 'Bayesian Theory', focus: 'Probability Distributions' },
      { name: 'Multivariate EDA', focus: 'ggplot2 & Analytical Viz' },
      { name: 'Complexity Bounds', focus: 'Big-O & Algorithmic Rigor' },
    ],
  },
  {
    index: '03',
    category: 'FRONTEND & 3D WEBGL',
    subtitle: 'Luxury interaction & hardware shaders',
    items: [
      { name: 'Next.js 15', focus: 'App Router & Streaming SSR', href: 'https://medikiosk-six.vercel.app/' },
      { name: 'React 19', focus: 'Concurrent Mode & Actions' },
      { name: 'Three.js / WebGL', focus: '60 FPS Procedural Shaders', href: 'https://broadcast-design-telemetry-dashboar.vercel.app/' },
      { name: 'Tailwind CSS', focus: 'Tokenized Design Systems' },
      { name: 'Framer Motion', focus: 'Kinetic Spring Physics' },
      { name: 'Figma Systems', focus: 'Spatial Typography & Layout' },
    ],
  },
  {
    index: '04',
    category: 'APPLIED AI & CLINICAL',
    subtitle: 'Agent swarms & healthcare interoperability',
    items: [
      { name: 'Multi-Agent Swarms', focus: 'Parallel Agent Orchestration', href: 'https://www.forgeapi.org/' },
      { name: 'Indic Whisper', focus: 'Multilingual Clinical ASR', href: 'https://medikiosk-six.vercel.app/' },
      { name: 'FHIR R4 & ABDM', focus: 'Health Informatics Protocols', href: 'https://medikiosk-six.vercel.app/' },
      { name: 'Graph Compression', focus: 'Sub-200 Token Memory' },
      { name: 'LangGraph', focus: 'Deterministic State Graphs' },
      { name: 'SOAP Synthesis', focus: 'Automated Case Intake', href: 'https://medikiosk-six.vercel.app/' },
    ],
  },
];

export default function SkillsSection() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative z-20 w-full bg-[#F6F5F2] text-[#111111] py-28 sm:py-36 lg:py-44 border-t-2 border-black/15 select-none flex flex-col items-center"
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
            <span>CREDENTIALS &amp; TECHNICAL MATRIX</span>
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
            <span>MINIMALIST TECHNICAL INDEX &bull; ZERO BLOAT</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-[1.05]">
            Core Stack &amp; Disciplines
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-sans pt-1 max-w-2xl leading-relaxed">
            A curated index of verified production tooling, low-level desktop runtimes, and theoretical computing foundations.
          </p>
        </div>

        {/* =====================================================================
            SPACIOUS 4-COLUMN TYPOGRAPHIC INDEX (CARD-FREE, VAST WHITESPACE)
            ===================================================================== */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-12 xl:gap-14">
          {STACK_COLUMNS.map((col, colIdx) => (
            <motion.div
              key={col.index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: colIdx * 0.08 }}
              className="space-y-6"
            >
              {/* Column Top Meta Header */}
              <div className="pb-4 border-b-2 border-black/15 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#FF3B1D]">
                    [ {col.index} ]
                  </span>
                  <h3 className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#111111]">
                    {col.category}
                  </h3>
                </div>
                <p className="font-mono text-[11px] text-neutral-400 pl-6">
                  {col.subtitle}
                </p>
              </div>

              {/* Minimalist Stack List */}
              <div className="space-y-4 pt-1">
                {col.items.map((item, itemIdx) => {
                  const itemKey = `${col.index}-${itemIdx}`;
                  const isHovered = hoveredItem === itemKey;

                  const content = (
                    <div
                      onMouseEnter={() => setHoveredItem(itemKey)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group cursor-default py-2.5 px-3 -mx-3 rounded-xl transition-all duration-200 flex flex-col justify-between hover:bg-black/[0.03]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`font-sans font-semibold text-sm sm:text-[15px] transition-colors ${
                            isHovered ? 'text-[#FF3B1D]' : 'text-[#111111] group-hover:text-black'
                          }`}
                        >
                          {item.name}
                        </span>

                        {item.href && (
                          <ArrowUpRight
                            size={13}
                            className={`shrink-0 transition-all duration-200 ${
                              isHovered
                                ? 'opacity-100 text-[#FF3B1D] translate-x-0.5 -translate-y-0.5'
                                : 'opacity-30 text-neutral-400 group-hover:opacity-70'
                            }`}
                          />
                        )}
                      </div>

                      <div className="font-mono text-[11px] text-neutral-500 pt-0.5 group-hover:text-neutral-700 transition-colors">
                        {item.focus}
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.name}>{content}</div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* =====================================================================
            MINIMALIST INDUSTRIAL FOOTER STRIP
            ===================================================================== */}
        <div className="w-full mt-20 sm:mt-28 pt-6 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-neutral-800 tracking-wide">
              24 PRODUCTION RUNTIMES &bull; 100% DETERMINISTIC
            </span>
          </div>

          <a
            href="https://github.com/SohamPBhagat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black font-semibold transition-colors"
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
