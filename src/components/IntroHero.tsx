'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroHeroProps {
  replayTrigger: number;
  onStateChange?: (isReady: boolean) => void;
}

export default function IntroHero({ replayTrigger, onStateChange }: IntroHeroProps) {
  // Stages:
  // 'opening' -> off-white background with "SO [gap opens] HAM"
  // 'strobe'  -> 3 images cycle inside the center box
  // 'expand'  -> soham.png smoothly expands to fill 100% of the screen, SO & HAM slide out
  // 'ready'   -> Fullscreen hero active, headline letters pop up with nbnzia randomized wave
  const [stage, setStage] = useState<'opening' | 'strobe' | 'expand' | 'ready'>('opening');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = [
    { src: '/images/intro-1.svg', alt: '01 / Forge Studio' },
    { src: '/images/intro-2.svg', alt: '02 / Vector Graph' },
    { src: '/images/soham.png', alt: '03 / Soham Bhagat' },
  ];

  // Concept 3: Clean, high-impact 2-line headline engineered for presence and clarity
  const headlineLines = useMemo(
    () => [
      "ENGINEERING THE NEXT ERA",
      "OF AUTONOMOUS AGENTS."
    ],
    []
  );

  const sublineText = "SYSTEM DESIGN · HIGH-THROUGHPUT RUNTIMES · ADAPTIVE WORKFLOWS";

  // Generate deterministic randomized character shuffle order for the pop-up wave (Zero SSR hydration mismatch)
  const charDelays = useMemo(() => {
    let totalChars = 0;
    headlineLines.forEach((line) => {
      totalChars += line.replace(/\s/g, '').length;
    });

    const indices = Array.from({ length: totalChars }, (_, i) => i);
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const delayMap: { [key: number]: number } = {};
    indices.forEach((shuffledIndex, rank) => {
      delayMap[shuffledIndex] = rank;
    });

    return delayMap;
  }, [headlineLines]);

  // Precompute character matrix with delays for pure, zero-allocation rendering
  const preparedHeadline = useMemo(() => {
    let charIdx = 0;
    return headlineLines.map((line) => {
      const words = line.split(' ');
      return words.map((word) => {
        const letters = word.split('').map((char) => {
          const currentRank = charDelays[charIdx] || 0;
          const delay = 0.12 + currentRank * 0.016;
          charIdx++;
          return { char, delay };
        });
        return { word, letters };
      });
    });
  }, [headlineLines, charDelays]);

  // Callback ref to avoid effect restarts on prop changes
  const onStateChangeRef = React.useRef(onStateChange);
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  // Master deterministic intro timeline
  useEffect(() => {
    let isMounted = true;

    // 1. Initial State: Opening
    setActiveImageIdx(0);
    if (onStateChangeRef.current) onStateChangeRef.current(false);

    // 2. Open aperture & show image 1 (strobe) at 200ms
    const t1 = setTimeout(() => {
      if (!isMounted) return;
      setStage('strobe');
      setActiveImageIdx(0);
    }, 200);

    // 3. Strobe to image 2 at 500ms
    const t2 = setTimeout(() => {
      if (!isMounted) return;
      setActiveImageIdx(1);
    }, 500);

    // 4. Strobe to Soham's photo at 800ms
    const t3 = setTimeout(() => {
      if (!isMounted) return;
      setActiveImageIdx(2);
    }, 800);

    // 5. Expand aperture to full screen at 1100ms
    const t4 = setTimeout(() => {
      if (!isMounted) return;
      setStage('expand');
    }, 1100);

    // 6. Complete intro and reveal headline wave at 1600ms
    const t5 = setTimeout(() => {
      if (!isMounted) return;
      setStage('ready');
      if (onStateChangeRef.current) onStateChangeRef.current(true);
    }, 1600);

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [replayTrigger]);

  return (
    <section id="hero" className="sticky top-0 w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#0A0D14] select-none z-0">
      
      {/* 🖼️ 1. FULL-SCREEN BACKGROUND HERO IMAGE (Framed with headroom, face completely in sky) */}
      <div
        className={`absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-700 ${
          stage === 'expand' || stage === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src="/images/soham.png"
          alt="Soham Bhagat"
          className="w-full h-full object-cover object-[center_16%] sm:object-[center_18%] brightness-100 contrast-105"
        />
      </div>

      {/* 🎬 2. NBNZIA PRELOADER: 'SO' [BOX] 'HAM' in ONE STRICT PHYSICAL ROW */}
      <AnimatePresence>
        {stage !== 'ready' && (
          <motion.div
            key="loader-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 ${
              stage === 'expand' ? 'bg-transparent pointer-events-none' : 'bg-[#EAE8E3]'
            }`}
          >
            {/* Single Flex Container: SO + Box + HAM */}
            <div className="flex items-center justify-center font-display font-extrabold text-[clamp(44px,10vw,140px)] text-[#111111] leading-none tracking-tight">
              
              {/* Left Wordmark: 'SO' */}
              <motion.span
                animate={{
                  x: stage === 'expand' ? '-110vw' : 0,
                  opacity: stage === 'expand' ? 0 : 1,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.8 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="shrink-0 pr-4 sm:pr-8 will-change-transform"
              >
                SO
              </motion.span>

              {/* Center Aperture Box - GPU Scale & Opacity */}
              <motion.div
                initial={false}
                animate={{
                  scale: stage === 'expand' ? 6 : 1,
                  opacity: stage === 'expand' ? 0 : 1,
                  width: stage === 'opening' ? 90 : 220,
                  height: stage === 'opening' ? 100 : 140,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.85 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative overflow-hidden bg-[#181818] shadow-2xl shrink-0 rounded will-change-transform"
              >
                {images.map((img, idx) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: idx === 0 ? 1 : 0 }}
                    animate={{
                      opacity: activeImageIdx === idx ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full h-full ${
                        idx === 2 ? 'object-cover object-[center_16%] sm:object-[center_18%]' : 'object-cover'
                      }`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Right Wordmark: 'HAM' */}
              <motion.span
                animate={{
                  x: stage === 'expand' ? '110vw' : 0,
                  opacity: stage === 'expand' ? 0 : 1,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.8 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="shrink-0 pl-4 sm:pl-8 will-change-transform"
              >
                HAM
              </motion.span>

            </div>

            {/* Skip Option */}
            {stage !== 'expand' && (
              <div className="absolute bottom-6 flex justify-center">
                <button
                  onClick={() => {
                    setStage('ready');
                    if (onStateChange) onStateChange(true);
                  }}
                  className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-black cursor-pointer"
                >
                  [ Skip Intro ]
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 3. NBNZIA HEADLINE: DYNAMIC DIFFERENCE BLEND (WHITE OVER HOODIE, DEEP NAVY OVER SKY) */}
      <div
        className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 px-4 pointer-events-none mix-blend-difference text-white"
        style={{ alignItems: 'center' }}
      >
        
        {/* The 2-Line High-Impact Statement + Subline Tag */}
        <div
          className="w-full flex flex-col items-center select-none pointer-events-auto text-center"
          style={{ width: '100%', maxWidth: '1440px', marginInline: 'auto' }}
        >
          {/* 2-Line Kinetic Headline */}
          <div className="w-full flex flex-col items-center space-y-1 sm:space-y-2">
            {preparedHeadline.map((lineWords, lineIdx) => (
              <div
                key={lineIdx}
                className="w-full flex flex-row flex-wrap justify-center items-center gap-x-[0.34em] sm:gap-x-[0.38em]"
              >
                {lineWords.map((w, wordIdx) => (
                  <span
                    key={wordIdx}
                    className="inline-flex items-center"
                  >
                    {w.letters.map((l, charIdx) => (
                      <span
                        key={charIdx}
                        className="inline-block overflow-hidden align-top"
                      >
                        <motion.span
                          initial={{ y: '115%', opacity: 0 }}
                          animate={{
                            y: stage === 'ready' ? '0%' : '115%',
                            opacity: stage === 'ready' ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.55,
                            delay: stage === 'ready' ? l.delay : 0,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="inline-block font-sans font-extrabold uppercase text-[clamp(26px,4.5vw,68px)] leading-[0.98] tracking-[-0.03em] text-white will-change-transform"
                        >
                          {l.char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Tracked Capabilities Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: stage === 'ready' ? 0.8 : 0,
              y: stage === 'ready' ? 0 : 12,
            }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.26em] text-white/90 uppercase text-center max-w-2xl px-4"
          >
            {sublineText}
          </motion.p>
        </div>

        {/* Minimal Scroll Cue at Bottom */}
        <div
          className={`pt-5 sm:pt-7 flex justify-center transition-opacity duration-700 pointer-events-auto ${
            stage === 'ready' ? 'opacity-90' : 'opacity-0'
          }`}
        >
          <a
            href="#about"
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
          >
            <span>Scroll to explore</span>
            <span className="animate-bounce">&darr;</span>
          </a>
        </div>

      </div>

    </section>
  );
}
