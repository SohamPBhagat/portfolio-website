'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, KaggleIcon } from '@/components/SocialIcons';
import {
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

export default function HeroSection() {
  const { personal } = portfolioData;

  // Rotating action words
  const words = ['builds', 'architects', 'orchestrates', 'experiments with'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  // Skeuomorphic Audio Voice Note State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = 24; // 24 seconds greeting demo
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 0.2;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Hi there, I'm Soham Bhagat. 2nd-year Data Science student at SPPU building multi-agent systems and developer tools like Forge Studio. Welcome to my portfolio."
      );
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      };
      window.speechSynthesis.speak(utterance);
    } else if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(pct);
    setCurrentTime((pct / 100) * duration);
  };

  // Helper to split text into physics-hover letters
  const renderPhysicsText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="h-letter select-none"
        style={{
          transitionDelay: `${(index % 5) * 15}ms`
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="hero" className="relative min-h-[96vh] pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden flex flex-col justify-between">
      
      {/* Ambient Celestial Glow */}
      <div className="absolute top-12 right-6 sm:right-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-amber-300/15 via-emerald-400/10 to-indigo-600/5 blur-3xl pointer-events-none -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-1.5 border border-emerald-500/30 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-300 font-mono tracking-wide">
              {personal.status}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 liquid-glass px-3 py-1.5 rounded-full border border-white/5">
            <MapPin className="h-3 w-3 text-emerald-400" />
            <span>{personal.location}</span>
          </div>
        </div>

        {/* 🌟 Centerpiece Split Wordmark with Your Portrait (nbnzia.com signature!) */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center font-editorial font-bold tracking-tighter leading-none text-[clamp(44px,9.5vw,132px)] text-white select-none">
            
            {/* "SO" */}
            <span className="hover:text-amber-300 transition-colors">SO</span>

            {/* Inset Portrait Frame with Myself.png */}
            <div className="relative mx-3 sm:mx-6 w-[clamp(75px,14vw,200px)] h-[clamp(50px,9.5vw,130px)] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#121622] group shrink-0 cursor-pointer hover:scale-105 hover:border-amber-400/60 transition-all duration-300">
              <img
                src={personal.photoUrl}
                alt="Soham Bhagat Portrait"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-1.5 left-2 text-[8px] font-mono text-amber-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10 hidden sm:block">
                Soham Bhagat
              </div>
            </div>

            {/* "HAM" */}
            <span className="hover:text-amber-300 transition-colors">HAM</span>

            <span className="ml-3 sm:ml-6 font-serif italic font-normal text-amber-400 text-[clamp(32px,7vw,96px)]">
              BHAGAT
            </span>
          </div>

          {/* Sub-Headline with Per-Letter Physics & Rotating Word Reel */}
          <div className="text-xl sm:text-3xl lg:text-4xl font-light text-slate-200 font-editorial leading-snug max-w-4xl pt-2">
            <span>{renderPhysicsText("Multidisciplinary Data Scientist who ")}</span>
            <span className="inline-block relative overflow-hidden h-[1.2em] align-middle text-[#F4D24A] font-serif italic font-normal min-w-[140px]">
              <span
                key={wordIndex}
                className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-500 font-serif italic"
              >
                {words[wordIndex]}
              </span>
            </span>
            <span className="block sm:inline">{renderPhysicsText(" Autonomous Multi-Agent Architectures.")}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl pt-1">
            {personal.bio.lead}
          </p>
        </div>

        {/* 💽 Skeuomorphic Audio Voice Note / Vinyl Player Widget (zainabkabira.com style) */}
        <div className="max-w-lg">
          <div className="skeuo-chassis">
            
            {/* Spinning Anisotropic Vinyl Record */}
            <div className={`vinyl-disk ${isPlaying ? 'vinyl-spinning' : ''}`}>
              <div className="vinyl-grooves"></div>
              {/* Vinyl Center Cap */}
              <div className="absolute inset-[32%] rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-black/60 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
              </div>
            </div>

            {/* Middle Scrubber Track & Title */}
            <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-800 font-medium">
                <span className="truncate">Soham_Intro_VoiceMemo.mp3</span>
                <span className="text-[10px] text-slate-600 font-mono">
                  {isPlaying ? <span className="text-emerald-700 animate-pulse">● LIVE SPEECH</span> : 'VOICE INTRO'}
                </span>
              </div>

              {/* Interactive Scrub Bar */}
              <div
                onClick={handleSliderClick}
                className="relative w-full h-3.5 bg-[#686360] rounded-full overflow-hidden cursor-pointer shadow-inner"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#F4D24A] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-md border border-slate-300 -ml-1.5"
                  style={{ left: `${progress}%` }}
                ></div>
              </div>

              {/* Timestamp Counters */}
              <div className="flex justify-between text-[10px] font-mono text-slate-700 font-semibold">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause Tactile Button */}
            <button
              onClick={togglePlay}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all"
              aria-label={isPlaying ? "Pause voice greeting" : "Play voice greeting"}
            >
              {isPlaying ? <Pause className="h-4 w-4 text-[#F4D24A]" /> : <Play className="h-4 w-4 text-white ml-0.5" />}
            </button>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#systems"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#F4D24A] hover:bg-[#ffe066] text-slate-950 font-semibold px-7 py-3.5 text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5"
          >
            <span>Explore Shipped Systems</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#playground"
            className="inline-flex items-center gap-2.5 rounded-full liquid-glass-strong hover:border-amber-400/40 text-slate-200 px-6 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 border border-white/10"
          >
            <Sparkles className="h-4 w-4 text-[#F4D24A]" />
            <span>Interactive AI Studio</span>
          </a>
        </div>

        {/* Footer Badges & Social Links */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-slate-400 text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-500">Connect:</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F4D24A] transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="text-xs">GitHub</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F4D24A] transition-colors"
            >
              <LinkedinIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a
              href={personal.kaggle}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F4D24A] transition-colors"
            >
              <KaggleIcon className="h-4 w-4 text-amber-400" />
              <span className="text-xs">Kaggle</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Forge Studio IDE
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
              Verica Agentic OS
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <Terminal className="h-3.5 w-3.5 text-amber-400" />
              SPPU B.Sc. Data Science
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
