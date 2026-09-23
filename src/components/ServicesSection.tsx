'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  number: string;
  title: string;
  tag: string;
  image: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'UI/UX & Product Design',
    tag: 'Design Systems · Luxury Editorial Layouts · Interactive Prototypes',
    image: '/images/forge-studio-canvas.png',
    href: 'https://github.com/SohamBhagat',
  },
  {
    number: '02',
    title: 'Webflow & Modern Web Dev',
    tag: 'Custom Responsive Builds · Clean Semantic Code · Next.js 15 & Webflow',
    image: '/images/forge-studio-grid.png',
    href: 'https://github.com/SohamBhagat',
  },
  {
    number: '03',
    title: 'Motion & Interaction Design',
    tag: 'Physics-Based Springs · 60fps Micro-Animations · Kinetic Visual Flow',
    image: '/images/forge-studio-canvas.png',
    href: 'https://github.com/SohamBhagat',
  },
  {
    number: '04',
    title: 'AI Systems & Custom Engineering',
    tag: 'Autonomous Multi-Agent Runtimes · Deterministic Tooling · Knowledge Graphs',
    image: '/images/forge-studio-grid.png',
    href: 'https://www.forgeapi.org/',
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Dedicated pinned scroll runway for Section 4
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothly sync scroll progress across the 4 disciplines during scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveIndex(0);
    } else if (latest < 0.50) {
      setActiveIndex(1);
    } else if (latest < 0.75) {
      setActiveIndex(2);
    } else {
      setActiveIndex(3);
    }
  });

  const activeService = SERVICES[activeIndex];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-20 bg-[#F6F5F2] text-[#111111] h-[220vh] border-t border-black/10 select-none"
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Sticky Fullscreen Viewport Stage: Centered horizontally and vertically */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-10 lg:px-14 xl:px-20 overflow-hidden bg-[#F6F5F2]">
        
        {/* ── PERFECTLY CENTERED CONTAINER: equal left/right margins, matches Section 5 ── */}
        <div className="w-full max-w-[1600px] mx-auto flex flex-col self-center">
          
          {/* =====================================================================
              TOP MASTHEAD — Edge-to-Edge Aligned Symmetrical Bar (Matches Section 5)
              ===================================================================== */}
          <div className="w-full relative flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.20em] text-neutral-500 pb-3.5 border-b border-black/10 mb-6 lg:mb-8">
            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>WHAT I LEARNED & WHAT I DO</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-[#FF3B1D] text-sm animate-pulse">
              <span>&#9829;</span>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-800 font-semibold tracking-[0.20em]">
              <span className="text-black/30 font-light">&#123;</span>
              <span>04 // DISCIPLINES & CRAFT</span>
              <span className="text-black/30 font-light">&#125;</span>
            </div>
          </div>

          {/* Section Intro Header */}
          <div className="mb-6 lg:mb-8 space-y-1.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#FF3B1D] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B1D] animate-ping" />
              <span>DISCIPLINES FOR PEOPLE, COMMUNITY & DIGITAL WORLD</span>
            </div>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#111111]">
              Designing & Engineering for the Digital World
            </h2>
          </div>

          {/* =====================================================================
              MAIN SPLIT WORKBENCH — 5-col list / 7-col media (matches Projects)
              ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: 4 Clean Disciplines (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
              {SERVICES.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.number}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full p-4 sm:p-5 rounded-2xl transition-all duration-300 relative group cursor-pointer border ${
                      isActive
                        ? 'bg-white border-black/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]'
                        : 'bg-transparent border-black/5 hover:border-black/15 hover:bg-white/40'
                    }`}
                  >
                    {/* Left Crimson Active Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="disciplineActiveBar"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#FF3B1D] rounded-r shadow-sm"
                      />
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1 pl-2 min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors shrink-0 ${
                              isActive ? 'text-[#FF3B1D]' : 'text-neutral-400 group-hover:text-neutral-600'
                            }`}
                          >
                            [ {item.number} ]
                          </span>
                          <h3
                            className={`font-sans text-base sm:text-lg lg:text-xl tracking-tight transition-colors ${
                              isActive
                                ? 'font-semibold text-[#111111]'
                                : 'font-normal text-neutral-600 group-hover:text-black'
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Clean Tag */}
                        <p className="font-mono text-[10px] sm:text-[11px] text-neutral-500 tracking-normal pl-8 sm:pl-9 leading-relaxed">
                          {item.tag}
                        </p>
                      </div>

                      <div
                        className={`shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 text-[#FF3B1D] translate-x-0'
                            : 'opacity-0 -translate-x-2 text-neutral-400 group-hover:opacity-40'
                        }`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Media Preview Stage (7 Cols — larger, matching Projects) */}
            <div className="lg:col-span-7">
              <div className="w-full aspect-[16/10] bg-[#0A0D15] rounded-2xl border border-black/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative">
                
                {/* macOS Header Bar */}
                <div className="h-10 bg-[#07090F] border-b border-white/10 px-4 flex items-center justify-between select-none shrink-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/20" />
                    <span className="ml-2 font-mono text-[10px] text-white/50 tracking-wider hidden sm:inline">
                      [{activeService.number}] {activeService.title}
                    </span>
                  </div>

                  <a
                    href={activeService.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:underline"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Preview</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>

                {/* Smooth Morphing Media Image Display */}
                <div className="relative flex-1 bg-[#05070C] overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`media-${activeService.number}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full will-change-transform"
                    >
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Technical Corner Brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/70 pointer-events-none z-20" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/70 pointer-events-none z-20" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/70 pointer-events-none z-20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/70 pointer-events-none z-20" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
