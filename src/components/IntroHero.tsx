'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroHeroProps {
  replayTrigger: number;
  onStateChange?: (isReady: boolean) => void;
}

export default function IntroHero({ replayTrigger, onStateChange }: IntroHeroProps) {
  // Stages:
  // 'opening' -> off-white background with "SO [H portal] AM" (Eye Video active in H)
  // 'strobe'  -> Glitch tensor lattice active in H
  // 'expand'  -> soham.png active in H, expanding outward to fullscreen, SO & AM slide out
  // 'ready'   -> Fullscreen hero active, refined quote letters pop up in randomized wave
  const [stage, setStage] = useState<'opening' | 'strobe' | 'expand' | 'ready'>('opening');
  const [activeMediaIdx, setActiveMediaIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Authoritative, refined 2-line statement of craft & standards
  const headlineLines = useMemo(
    () => [
      "WHERE MATHEMATICAL RIGOR",
      "MEETS FLAWLESS EXECUTION."
    ],
    []
  );

  // Generate deterministic randomized character shuffle order for the pop-up wave
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
  const onStateChangeRef = useRef(onStateChange);
  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  // Master deterministic intro timeline
  useEffect(() => {
    let isMounted = true;

    // 1. Initial State: Opening (Coded Eye Video playing in H)
    setStage('opening');
    setActiveMediaIdx(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (onStateChangeRef.current) onStateChangeRef.current(false);

    // 2. Strobe to Glitch Tensor Lattice at 450ms
    const t1 = setTimeout(() => {
      if (!isMounted) return;
      setStage('strobe');
      setActiveMediaIdx(1);
    }, 450);

    // 3. Strobe to Soham's photo at 750ms
    const t2 = setTimeout(() => {
      if (!isMounted) return;
      setActiveMediaIdx(2);
    }, 750);

    // 4. Expand H aperture to full screen at 1050ms
    const t3 = setTimeout(() => {
      if (!isMounted) return;
      setStage('expand');
    }, 1050);

    // 5. Complete intro and reveal headline wave at 1600ms
    const t4 = setTimeout(() => {
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
    };
  }, [replayTrigger]);

  return (
    <section id="hero" className="sticky top-0 w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#0A0D14] select-none z-0">
      
      {/* 🖼️ 1. FULL-SCREEN BACKGROUND HERO IMAGE (Natural Lighting Preserved) */}
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

      {/* 🎬 2. SYMMETRIC 'SO' [H PORTAL] 'AM' PRELOADER */}
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
            {/* 🌌 Atmospheric Halftone Dither Texture Layer */}
            <div
              className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${
                stage === 'expand' ? 'opacity-0' : 'opacity-15'
              }`}
              style={{
                backgroundImage: `url('/images/preloader-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'multiply',
                filter: 'invert(1)',
              }}
            />

            {/* 2-1-2 Symmetric Flex Container: SO + [H] + AM */}
            <div className="relative z-10 flex items-center justify-center font-sans font-black text-[clamp(52px,12vw,160px)] text-[#111111] leading-none tracking-[-0.04em] uppercase select-none">
              
              {/* Left Wordmark: 'SO' */}
              <motion.span
                animate={{
                  x: stage === 'expand' ? '-110vw' : 0,
                  opacity: stage === 'expand' ? 0 : 1,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.75 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="shrink-0 pr-2 sm:pr-4 will-change-transform"
              >
                SO
              </motion.span>

              {/* Center: The 'H' Cutout Portal */}
              <motion.div
                initial={false}
                animate={{
                  scale: stage === 'expand' ? 10 : 1,
                  opacity: stage === 'expand' ? 0 : 1,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.85 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative shrink-0 flex items-center justify-center will-change-transform"
              >
                {/* SVG Cutout Mask for Letter 'H' */}
                <svg
                  className="w-[0.92em] h-[1.12em] overflow-visible"
                  viewBox="0 0 100 115"
                >
                  <defs>
                    <clipPath id="h-portal-mask">
                      <text
                        x="50"
                        y="68"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="112"
                        fontWeight="900"
                        fontFamily="var(--font-sans), 'Figtree', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                        letterSpacing="-0.04em"
                      >
                        H
                      </text>
                    </clipPath>
                  </defs>

                  {/* Masked Active Media Content inside the letter H */}
                  <g clipPath="url(#h-portal-mask)">
                    <foreignObject x="0" y="0" width="100" height="115">
                      <div className="relative w-full h-full bg-[#111111] overflow-hidden">
                        
                        {/* Slot 1: Coded Eye Video */}
                        <div
                          className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${
                            activeMediaIdx === 0 ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <video
                            ref={videoRef}
                            src="/videos/coded-eye.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover scale-110"
                          />
                        </div>

                        {/* Slot 2: Glitch 3D Vector Tensor Lattice */}
                        <div
                          className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${
                            activeMediaIdx === 1 ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img
                            src="/images/glitch.jpg"
                            alt="Computation Lattice"
                            className="w-full h-full object-cover scale-105"
                          />
                        </div>

                        {/* Slot 3: Soham Portrait Photo */}
                        <div
                          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                            activeMediaIdx === 2 ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img
                            src="/images/soham.png"
                            alt="Soham Bhagat"
                            className="w-full h-full object-cover object-[center_18%]"
                          />
                        </div>

                      </div>
                    </foreignObject>
                  </g>
                </svg>
              </motion.div>

              {/* Right Wordmark: 'AM' */}
              <motion.span
                animate={{
                  x: stage === 'expand' ? '110vw' : 0,
                  opacity: stage === 'expand' ? 0 : 1,
                }}
                transition={{
                  duration: stage === 'expand' ? 0.75 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="shrink-0 pl-2 sm:pl-4 will-change-transform"
              >
                AM
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
                  className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-black cursor-pointer transition-colors"
                >
                  [ Skip Intro ]
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 3. MONUMENTAL HEADLINE: ELEGANT EDITORIAL PROPORTION */}
      <div
        className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-12 sm:pb-16 md:pb-20 px-4 pointer-events-none text-white"
        style={{ alignItems: 'center' }}
      >
        
        {/* The 2-Line High-Impact Statement */}
        <div
          className="w-full flex flex-col items-center select-none pointer-events-auto text-center"
          style={{ width: '100%', maxWidth: '1440px', marginInline: 'auto' }}
        >
          {/* 2-Line Kinetic Headline with Refined Editorial Weight */}
          <div className="w-full flex flex-col items-center space-y-1 sm:space-y-2">
            {preparedHeadline.map((lineWords, lineIdx) => (
              <div
                key={lineIdx}
                className="w-full flex flex-row flex-wrap justify-center items-center gap-x-[0.28em] sm:gap-x-[0.34em]"
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
                          className="inline-block font-sans font-extrabold uppercase text-[clamp(22px,3.4vw,48px)] leading-[1.06] tracking-[-0.025em] text-[#F6F5F2] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] will-change-transform"
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
        </div>

      </div>

    </section>
  );
}
