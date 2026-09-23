'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import MarqueeTicker from '@/components/MarqueeTicker';

// Single word that reveals smoothly as you scroll (Laser Wave Physics)
function PopUpWaveWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const waveMid = start + (end - start) * 0.45;

  const color = useTransform(
    progress,
    [start, waveMid, end],
    ['rgba(17, 17, 17, 0.20)', '#FF3B1D', '#111111']
  );

  return (
    <span
      style={{
        display: 'inline-block',
        marginRight: '0.26em',
        verticalAlign: 'top',
      }}
    >
      <motion.span
        style={{ color, display: 'inline-block' }}
        className="font-medium will-change-[color]"
      >
        {children}
      </motion.span>
    </span>
  );
}

// Progressive pop-up paragraph with memoized words (Zero per-render allocations)
function ScrollPopUpParagraph({
  text,
  progress,
  startRange,
  endRange,
  className,
}: {
  text: string;
  progress: MotionValue<number>;
  startRange: number;
  endRange: number;
  className?: string;
}) {
  const wordsData = React.useMemo(() => {
    const words = text.split(' ');
    const totalWords = words.length;
    const step = (endRange - startRange) / totalWords;
    const waveWidth = step * 3.2;

    return words.map((word, i) => {
      const start = startRange + i * step;
      const end = Math.min(start + waveWidth, 1);
      return {
        word,
        key: `${word}-${i}`,
        range: [Math.min(start, 0.98), Math.min(end, 1)] as [number, number],
      };
    });
  }, [text, startRange, endRange]);

  return (
    <p
      className={className}
      style={{
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        lineHeight: 1.28,
      }}
    >
      {wordsData.map((item) => (
        <PopUpWaveWord
          key={item.key}
          progress={progress}
          range={item.range}
        >
          {item.word}
        </PopUpWaveWord>
      ))}
    </p>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { personal } = portfolioData;

  // Master scroll timeline for Section 2
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const paragraph1 =
    "Data Science undergraduate at Savitribai Phule Pune University Department of Technology building multi-agent parallel IDEs, token-optimized SQLite memory graphs, and autonomous developer workflows.";

  const paragraph2 =
    "I don't just run notebooks. I build production-grade software systems that bridge statistical machine learning theory with deterministic terminal orchestration.";

  return (
    <div ref={containerRef} id="about" className="relative z-10 w-full bg-[#F6F5F2] h-[190vh]">
      
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-4 overflow-hidden select-none bg-[#F6F5F2]">
        
        {/* =====================================================================
            MAIN DESKTOP STAGE (Pure Editorial Dossier: Balanced Left Dossier, Text & Actions Right)
            ===================================================================== */}
        <div className="w-full max-w-7xl xl:max-w-[1360px] mx-auto px-8 sm:px-12 lg:px-16 hidden lg:flex flex-1 items-center justify-center my-auto">
          
          <div className="w-full flex items-center justify-between gap-16 xl:gap-24">
            
            {/* -----------------------------------------------------------------
                LEFT COLUMN: Structured Editorial Metadata
                ----------------------------------------------------------------- */}
            <div className="w-[280px] lg:w-[320px] shrink-0 flex flex-col justify-between space-y-6">
              <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.20em] text-neutral-400">
                <div className="text-neutral-500 font-semibold tracking-[0.22em]">
                  02 // ABOUT & BACKGROUND
                </div>
                <div>PUNE, MAHARASHTRA, IN</div>
              </div>

              <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                <div className="font-semibold text-neutral-700 tracking-[0.20em]">
                  B.SC. DATA SCIENCE @ SPPU
                </div>
                <div>DEPARTMENT OF TECHNOLOGY</div>
                <div className="text-neutral-500">SAVITRIBAI PHULE PUNE UNIV.</div>
              </div>

              <div className="space-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                <div>FOCUS: AGENTIC WORKBENCHES</div>
                <div>DETERMINISTIC SYSTEMS &amp; ML</div>
              </div>
            </div>

            {/* -----------------------------------------------------------------
                RIGHT COLUMN: Editorial Typography + Dual Kinetic Pill Buttons
                ----------------------------------------------------------------- */}
            <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
              <div className="space-y-6">
                {/* Paragraph 1: Laser wave word reveal (0.10 -> 0.45) */}
                <ScrollPopUpParagraph
                  text={paragraph1}
                  progress={scrollYProgress}
                  startRange={0.10}
                  endRange={0.45}
                  className="font-sans font-medium text-2xl lg:text-[30px] xl:text-[33px] leading-[1.3] tracking-[-0.03em] text-[#111111]"
                />

                {/* Paragraph 2: Follow-up reveal (0.40 -> 0.75) */}
                <ScrollPopUpParagraph
                  text={paragraph2}
                  progress={scrollYProgress}
                  startRange={0.40}
                  endRange={0.75}
                  className="font-sans font-normal text-lg lg:text-[20px] xl:text-[22px] leading-[1.38] tracking-[-0.02em] text-[#111111]"
                />

                {/* Dual Kinetic Pill Buttons situated directly beneath the copy */}
                <div className="pt-8 sm:pt-10 flex items-center gap-6 select-none">
                  
                  {/* See the work Button -> Smoothly scrolls to dedicated Section 3 (#process) */}
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center rounded-full h-11 w-[175px] sm:w-[190px] overflow-hidden cursor-pointer bg-[#0A0D14] hover:bg-black text-[#F4E3B2] border border-black/15 shadow-md transition-colors duration-300"
                  >
                    <span className="w-full text-center block whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pr-8 pl-3 group-hover:pl-8 group-hover:pr-3">
                      See the work
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 right-1.5 w-8 h-8 bg-white/15 text-[#F4E3B2] group-hover:bg-[#F4E3B2] group-hover:text-[#0A0D14] rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[calc(100%-38px)] group-hover:rotate-45 shadow-sm pointer-events-none">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Let's talk Button */}
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center rounded-full h-11 w-[170px] sm:w-[185px] overflow-hidden cursor-pointer bg-[#FF3B1D] hover:bg-[#E02E12] text-white border border-black/10 shadow-md transition-colors duration-300"
                  >
                    <span className="w-full text-center block whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pr-8 pl-3 group-hover:pl-8 group-hover:pr-3">
                      Let&apos;s talk
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 right-1.5 w-8 h-8 bg-white/20 text-white group-hover:bg-white group-hover:text-[#FF3B1D] rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[calc(100%-38px)] group-hover:rotate-45 shadow-sm pointer-events-none">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300" />
                    </div>
                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================================
            MOBILE / TABLET FALLBACK LAYOUT (< lg screens)
            ===================================================================== */}
        <div className="lg:hidden w-full px-6 py-8 flex flex-col gap-8 flex-1 justify-center">
          <div className="space-y-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            <div>B.SC. DATA SCIENCE @ SPPU</div>
            <div>DEPARTMENT OF TECHNOLOGY</div>
          </div>
          
          <div className="space-y-4">
            <p className="font-sans font-medium text-xl leading-snug text-[#111111]">
              {paragraph1}
            </p>
            <p className="font-sans text-base leading-relaxed text-[#111111]/80">
              {paragraph2}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-full h-10 px-6 bg-[#0A0D14] text-[#F4E3B2] text-xs font-semibold"
            >
              See the work
            </button>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full h-10 px-6 bg-[#FF3B1D] text-white text-xs font-semibold"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* =====================================================================
            MARQUEE TICKER (Positioned inside visible white space, above bottom bezel)
            ===================================================================== */}
        <div className="w-full relative shrink-0 z-20 pb-8 sm:pb-12 lg:pb-16 select-none">
          <MarqueeTicker />
        </div>

      </div>
    </div>
  );
}
