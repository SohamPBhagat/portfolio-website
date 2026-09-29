'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledVisible, setIsScrolledVisible] = useState(true);
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);

  // Direction-aware scroll detection throttled with requestAnimationFrame
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 8;
    const topZone = 40;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const delta = y - lastY;

          setIsScrolledPastTop(y > topZone);

          if (Math.abs(delta) >= threshold) {
            lastY = y;
            const nextVisible = y <= topZone || delta < 0;
            setIsScrolledVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Disciplines', href: '#services' },
    { name: 'Works', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const shouldShow = isScrolledVisible && isVisibleInHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } pt-4 sm:pt-6 pb-2 px-6 sm:px-10 lg:px-14 xl:px-18 pointer-events-none flex justify-center`}
    >
      {/* Precision Awwwards-Style Architectural Header */}
      <div
        className={`w-full max-w-[1520px] flex items-center justify-between transition-all duration-500 pointer-events-auto ${
          isScrolledPastTop
            ? 'bg-[#0A0D14]/90 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-full px-6 py-3 text-white'
            : 'bg-transparent text-white px-2 py-1'
        }`}
      >
        
        {/* Left: Brand Identity + Micro Status Pill */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-black text-sm sm:text-base tracking-[0.22em] uppercase text-white hover:text-[#FF3B1D] transition-colors select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            SOHAM
          </a>

          {/* Faint Live Status (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-[0.20em] uppercase text-neutral-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] border-l border-white/20 pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Center: Clean Monospaced Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-xs font-mono uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF3B1D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Kinetic Pill CTA Button */}
        <div className="flex items-center">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center rounded-full h-8 sm:h-9 px-4 sm:px-5 bg-[#FF3B1D] hover:bg-[#E02E12] text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(255,59,29,0.3)] cursor-pointer select-none"
          >
            <span className="flex items-center gap-1.5">
              <span>Collaborate</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
