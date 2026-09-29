'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    ['rgba(17, 17, 17, 0.18)', 'rgba(255, 59, 29, 1)', 'rgba(17, 17, 17, 1)']
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

  // Master scroll timeline for Section 2
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const buttonOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0.35, 1]);
  const buttonY = useTransform(scrollYProgress, [0.72, 0.88], [10, 0]);

  const paragraph1 =
    "I engineer autonomous developer tools and multi-agent platforms that turn complex, stochastic AI workflows into deterministic production software.";

  const paragraph2 =
    "Moving beyond toy notebooks, I focus on local-first runtimes, persistent memory graphs, and parallel execution sandboxes built for speed and reliability.";

  return (
    <div ref={containerRef} id="about" className="relative z-10 w-full bg-[#F6F5F2] h-[320vh]">
      
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-4 overflow-hidden select-none bg-[#F6F5F2]">
        
        {/* =====================================================================
            MAIN DESKTOP STAGE (Pure Editorial Dossier: Balanced Left Dossier, Text & Actions Right)
            ===================================================================== */}
        <div className="w-full max-w-7xl xl:max-w-[1360px] mx-auto px-8 sm:px-12 lg:px-16 hidden lg:flex flex-1 items-center justify-center my-auto">
          
          <div className="w-full flex items-center justify-between gap-16 xl:gap-24">
            
            {/* -----------------------------------------------------------------
                LEFT COLUMN: Structured Editorial Metadata (Clean, Non-repetitive)
                ----------------------------------------------------------------- */}
            <div className="w-[280px] lg:w-[320px] shrink-0 flex flex-col justify-between space-y-7">
              <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.20em] text-neutral-400">
                <div className="text-neutral-500 font-semibold tracking-[0.22em]">
                  02 // BACKGROUND
                </div>
                <div>PUNE, MAHARASHTRA, IN</div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                <div className="font-semibold text-neutral-700 tracking-[0.20em]">
                  EDUCATION
                </div>
                <div className="text-neutral-600">B.Sc. Data Science</div>
                <div className="text-neutral-400 text-[10px]">SPPU · Dept. of Technology</div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                <div className="font-semibold text-neutral-700 tracking-[0.18em]">
                  CORE DOMAINS
                </div>
                <div className="text-neutral-600">Autonomous Agent Architectures</div>
                <div className="text-neutral-400 text-[10px]">Deterministic Systems &amp; Runtimes</div>
              </div>
            </div>

            {/* -----------------------------------------------------------------
                RIGHT COLUMN: Editorial Typography + Single Kinetic Pill CTA
                ----------------------------------------------------------------- */}
            <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
              <div className="space-y-6">
                {/* Paragraph 1: Laser wave word reveal (0.08 -> 0.46) */}
                <ScrollPopUpParagraph
                  text={paragraph1}
                  progress={scrollYProgress}
                  startRange={0.08}
                  endRange={0.46}
                  className="font-sans font-medium text-2xl lg:text-[30px] xl:text-[33px] leading-[1.3] tracking-[-0.03em] text-[#111111]"
                />

                {/* Paragraph 2: Follow-up reveal (0.50 -> 0.86) */}
                <ScrollPopUpParagraph
                  text={paragraph2}
                  progress={scrollYProgress}
                  startRange={0.50}
                  endRange={0.86}
                  className="font-sans font-normal text-lg lg:text-[20px] xl:text-[22px] leading-[1.38] tracking-[-0.02em] text-[#111111]"
                />

                {/* Single Commanding Kinetic Pill CTA */}
                <motion.div
                  style={{ opacity: buttonOpacity, y: buttonY }}
                  className="pt-8 sm:pt-10 flex items-center select-none"
                >
                  
                  {/* Explore Works Button -> Smoothly scrolls to dedicated Section 3 (#process) */}
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative inline-flex items-center rounded-full h-12 w-[210px] overflow-hidden cursor-pointer bg-[#0A0D14] hover:bg-black text-[#F4E3B2] border border-black/15 shadow-md transition-colors duration-300"
                  >
                    <span className="w-full text-center block whitespace-nowrap text-xs font-semibold tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] pr-8 pl-4 group-hover:pl-8 group-hover:pr-4">
                      Explore Works
                    </span>
                    <div className="absolute top-1/2 -translate-y-1/2 right-1.5 w-9 h-9 bg-white/15 text-[#F4E3B2] group-hover:bg-[#F4E3B2] group-hover:text-[#0A0D14] rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[calc(100%-42px)] group-hover:rotate-45 shadow-sm pointer-events-none">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </button>

                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================================
            MOBILE / TABLET FALLBACK LAYOUT (< lg screens)
            ===================================================================== */}
        <div className="lg:hidden w-full px-6 py-8 flex flex-col gap-8 flex-1 justify-center">
          <div className="space-y-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            <div className="font-semibold text-neutral-700">02 // BACKGROUND · PUNE, IN</div>
            <div>B.Sc. Data Science · SPPU Dept. of Technology</div>
          </div>
          
          <div className="space-y-4">
            <ScrollPopUpParagraph
              text={paragraph1}
              progress={scrollYProgress}
              startRange={0.08}
              endRange={0.46}
              className="font-sans font-medium text-xl leading-snug text-[#111111]"
            />
            <ScrollPopUpParagraph
              text={paragraph2}
              progress={scrollYProgress}
              startRange={0.50}
              endRange={0.86}
              className="font-sans text-base leading-relaxed text-[#111111]"
            />
          </div>

          <motion.div
            style={{ opacity: buttonOpacity, y: buttonY }}
            className="pt-2"
          >
            <button
              type="button"
              onClick={() => {
                document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-full h-11 px-7 bg-[#0A0D14] text-[#F4E3B2] text-xs font-semibold uppercase tracking-wider"
            >
              Explore Works ↗
            </button>
          </motion.div>
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
