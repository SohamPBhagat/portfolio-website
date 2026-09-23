'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  // Stages: 0 = 'opening-gap', 1 = 'cycling-images', 2 = 'expanding-reveal', 3 = 'finished'
  const [stage, setStage] = useState<'opening' | 'cycling' | 'expanding' | 'done'>('opening');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    { src: '/images/intro-1.svg', label: '01 / FORGE STUDIO IDE' },
    { src: '/images/intro-2.svg', label: '02 / VECTOR KNOWLEDGE GRAPH' },
    { src: '/images/soham.png', label: '03 / SOHAM BHAGAT' },
  ];

  useEffect(() => {
    // Phase 1: Open the gap between "SO" and "HAM"
    const openTimer = setTimeout(() => {
      setStage('cycling');
    }, 700);

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (stage === 'cycling') {
      // Phase 2: Rapid film-strip strobe through the 3 images (450ms each)
      const interval = setInterval(() => {
        setActiveImageIndex((prev) => {
          if (prev >= images.length - 1) {
            clearInterval(interval);
            // After reaching Soham's photo, pause for a moment then expand
            setTimeout(() => {
              setStage('expanding');
            }, 650);
            return prev;
          }
          return prev + 1;
        });
      }, 450);

      return () => clearInterval(interval);
    }
  }, [stage, images.length]);

  useEffect(() => {
    if (stage === 'expanding') {
      // Phase 3: Aperture expands, preloader completes and reveals the live hero
      const doneTimer = setTimeout(() => {
        setStage('done');
        onComplete();
      }, 1400);

      return () => clearTimeout(doneTimer);
    }
  }, [stage, onComplete]);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#090A0F] text-[#F8FAFC] overflow-hidden select-none"
      >
        {/* Ambient Subtle Shimmer Behind Wordmark */}
        <div className="absolute w-[600px] h-[300px] bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none"></div>

        {/* The Grand Split Wordmark Container */}
        <div className="relative flex items-center justify-center font-editorial font-bold tracking-tighter leading-none text-[clamp(64px,14vw,200px)]">
          
          {/* Left Wing: "SO" */}
          <motion.div
            initial={{ x: 0, opacity: 0, y: 30 }}
            animate={{
              x: stage === 'expanding' ? '-120%' : stage === 'opening' ? '-0.02em' : '-0.06em',
              opacity: stage === 'expanding' ? 0 : 1,
              y: 0,
            }}
            transition={{
              duration: stage === 'expanding' ? 0.9 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center text-white"
          >
            <span>S</span>
            <span>O</span>
          </motion.div>

          {/* Center Aperture: Image Cutout Box (0px -> 16:9 Aperture -> Fullscreen) */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width:
                stage === 'opening'
                  ? 'clamp(60px, 12vw, 160px)'
                  : stage === 'cycling'
                  ? 'clamp(140px, 22vw, 320px)'
                  : '100vw',
              height:
                stage === 'expanding'
                  ? '100vh'
                  : 'clamp(90px, 14vw, 210px)',
              borderRadius: stage === 'expanding' ? 0 : 16,
              opacity: 1,
            }}
            transition={{
              duration: stage === 'expanding' ? 1.2 : 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mx-2 sm:mx-4 overflow-hidden bg-[#121622] border border-white/15 shadow-2xl flex items-center justify-center shrink-0"
          >
            {/* Rapid Layered Images */}
            {images.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: activeImageIndex === idx ? 1 : 0,
                  scale: activeImageIndex === idx ? (stage === 'expanding' ? 1 : 1.02) : 1.08,
                }}
                transition={{
                  duration: 0.35,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#090A0F]"
              >
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.label}
                  className={`w-full h-full ${
                    idx === 2 ? 'object-cover object-top' : 'object-cover'
                  }`}
                />

                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                {/* Frame Metadata Tag (Monospace in corner) */}
                {stage !== 'expanding' && (
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-amber-300 font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    <span>{img.label}</span>
                    <span className="text-emerald-400">● LOADED</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Wing: "HAM" */}
          <motion.div
            initial={{ x: 0, opacity: 0, y: 30 }}
            animate={{
              x: stage === 'expanding' ? '120%' : stage === 'opening' ? '0.02em' : '0.06em',
              opacity: stage === 'expanding' ? 0 : 1,
              y: 0,
            }}
            transition={{
              duration: stage === 'expanding' ? 0.9 : 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center text-white"
          >
            <span>H</span>
            <span>A</span>
            <span>M</span>
          </motion.div>

        </div>

        {/* Bottom Status / Skip Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: stage === 'expanding' ? 0 : 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-8 flex flex-col items-center gap-1 text-center"
        >
          <div className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            SOHAM BHAGAT &bull; B.SC. DATA SCIENCE @ SPPU
          </div>
          <button
            onClick={() => {
              setStage('done');
              onComplete();
            }}
            className="text-[10px] font-mono text-amber-400/70 hover:text-amber-300 hover:underline transition-colors mt-1 cursor-pointer"
          >
            [ Click to Skip Intro ]
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
