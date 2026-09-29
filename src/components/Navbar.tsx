'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledVisible, setIsScrolledVisible] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);

  // Direction-aware scroll detection throttled with requestAnimationFrame
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const threshold = 8;
    const topZone = 60;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const delta = y - lastY;

          // Track if user is past hero section to adapt navbar backdrop
          setIsPastHero(y > window.innerHeight * 0.75);

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shouldShow ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } pt-5 sm:pt-6 pb-4 px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none flex justify-center`}
    >
      {/* Precision Full-Width Navigation Stage */}
      <div
        className={`w-full max-w-[1500px] flex items-center justify-between relative pointer-events-auto transition-all duration-500 rounded-full px-5 sm:px-7 py-2.5 ${
          isPastHero
            ? 'bg-[#11141E]/80 backdrop-blur-xl border border-white/10 shadow-lg text-white'
            : 'bg-transparent text-white'
        }`}
      >
        
        {/* Left: Architectural Wordmark with Smooth Scroll-to-Top */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-black text-sm sm:text-base tracking-[0.22em] uppercase text-white hover:text-[#FF3B1D] transition-colors select-none leading-none py-1"
          >
            SOHAM
          </a>
        </div>

        {/* Center: Mathematically Centered Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-[0.18em] text-white/75 font-medium pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 hover:text-white transition-colors group flex items-center"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF3B1D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Kinetic Collaborate Pill Button */}
        <div className="flex items-center">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center rounded-full h-9 sm:h-10 w-[145px] sm:w-[160px] overflow-hidden cursor-pointer bg-white/10 hover:bg-white text-white hover:text-[#0A0D14] border border-white/20 backdrop-blur-md shadow-md select-none transition-all duration-400"
          >
            {/* The Text Label */}
            <span className="w-full text-center block whitespace-nowrap text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] pr-6 pl-2.5 group-hover:pl-6 group-hover:pr-2.5">
              Collaborate
            </span>

            {/* The Sliding Circle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 right-1 w-7 h-7 sm:w-8 sm:h-8 bg-white/20 text-white group-hover:bg-[#0A0D14] group-hover:text-white rounded-full flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[calc(100%-32px)] sm:group-hover:right-[calc(100%-36px)] group-hover:rotate-45 shadow-sm pointer-events-none">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-400" />
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}
