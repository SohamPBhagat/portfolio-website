'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledVisible, setIsScrolledVisible] = useState(true);

  // Direction-aware scroll detection throttled with requestAnimationFrame
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 8;
    const topZone = 50;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const delta = y - lastY;

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
    { num: '01', name: 'About', href: '#about' },
    { num: '02', name: 'Disciplines', href: '#services' },
    { num: '03', name: 'Works', href: '#projects' },
    { num: '04', name: 'Skills', href: '#skills' },
    { num: '05', name: 'Contact', href: '#contact' },
  ];

  const shouldShow = isScrolledVisible && isVisibleInHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } pt-4 sm:pt-6 pb-2 px-4 sm:px-8 lg:px-12 pointer-events-none flex justify-center`}
    >
      {/* Precision Obsidian Architectural Island / Capsule */}
      <div className="w-full max-w-[1360px] bg-[#0A0D14] border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between relative pointer-events-auto">
        
        {/* Left: Architectural Wordmark */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-black text-sm sm:text-base tracking-[0.24em] uppercase text-white hover:text-[#FF3B1D] transition-colors select-none leading-none py-1"
          >
            SOHAM
          </a>
        </div>

        {/* Center: Numbered Minimalist Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 py-1 text-neutral-400 hover:text-white transition-colors group select-none"
            >
              <span className="font-mono text-[9px] text-neutral-500 group-hover:text-[#FF3B1D] transition-colors">
                {link.num}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] font-medium">
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Right: High-Contrast Kinetic CTA Button */}
        <div className="flex items-center shrink-0">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center rounded-full h-8 sm:h-9 px-4 sm:px-5 bg-[#FF3B1D] hover:bg-[#E02E12] text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer select-none"
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
