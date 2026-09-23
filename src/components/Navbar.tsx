'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledVisible, setIsScrolledVisible] = useState(true);

  // Direction-aware scroll throttled via requestAnimationFrame
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
      } pt-6 sm:pt-7 pb-4 px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none flex justify-center`}
    >
      <div className="w-full max-w-[1600px] flex items-center justify-between relative pointer-events-auto">
        
        {/* Left: Professional Architectural Brand Name */}
        <div className="flex items-center">
          <a
            href="#hero"
            className="font-display font-extrabold text-base sm:text-lg tracking-[0.20em] uppercase text-[#111111] hover:text-[#FF3B1D] transition-colors select-none leading-none flex items-center py-1"
          >
            SOHAM
          </a>
        </div>

        {/* Center: Mathematically Centered Nav Links (Pinned to absolute center of viewport) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2 text-xs sm:text-[13px] font-mono uppercase tracking-[0.14em] text-[#111111]/70 font-semibold pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 hover:text-[#111111] transition-colors group flex items-center"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF3B1D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Kinetic Sliding "Collaborate" Button */}
        <div className="flex items-center">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center rounded-full h-10 sm:h-11 w-[155px] sm:w-[170px] overflow-hidden cursor-pointer bg-[#0A0D14] hover:bg-black text-[#F4E3B2] border border-black/15 shadow-md select-none transition-colors duration-500"
          >
            {/* The Text Label */}
            <span className="w-full text-center block whitespace-nowrap text-xs sm:text-[12px] font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pr-7 pl-3 group-hover:pl-7 group-hover:pr-3">
              Collaborate
            </span>

            {/* The Sliding Circle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 right-1.5 w-7 h-7 sm:w-8 sm:h-8 bg-white/15 text-[#F4E3B2] group-hover:bg-[#F4E3B2] group-hover:text-[#0A0D14] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:right-[calc(100%-34px)] sm:group-hover:right-[calc(100%-38px)] group-hover:rotate-45 shadow-sm pointer-events-none">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500" />
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}
