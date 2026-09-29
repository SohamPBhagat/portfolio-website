'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);

  // Track scroll position to fade out center tabs & right CTA while keeping SOHAM pinned
  useEffect(() => {
    let ticking = false;
    const topZone = 50;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolledPastTop(y > topZone);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-500 ${
        isVisibleInHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } pt-5 sm:pt-6 pb-2 px-6 sm:px-10 lg:px-14 xl:px-18 pointer-events-none flex justify-center`}
    >
      {/* 100% Transparent Full-Width Architectural Grid Header */}
      <div className="w-full max-w-[1520px] flex items-center justify-between relative bg-transparent pointer-events-auto">
        
        {/* Left: SOHAM Brandmark (Always pinned and visible on scroll) */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans font-black text-base sm:text-lg tracking-[0.24em] uppercase text-white hover:text-[#FF3B1D] transition-colors select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-none py-1"
          >
            SOHAM
          </a>
        </div>

        {/* Center: Monospaced Navigation Links (Smoothly fades out on scroll down) */}
        <nav
          className={`hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2 transition-all duration-400 pointer-events-auto ${
            isScrolledPastTop
              ? 'opacity-0 -translate-y-3 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-xs font-mono uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors group select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF3B1D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Kinetic Collaborate Pill Button (Sliding badge from LEFT to RIGHT, fades out on scroll) */}
        <div
          className={`flex items-center transition-all duration-400 ${
            isScrolledPastTop
              ? 'opacity-0 translate-y-[-10px] pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center rounded-full h-10 sm:h-11 w-[155px] sm:w-[170px] overflow-hidden cursor-pointer bg-[#0A0D14] hover:bg-black text-[#F4E3B2] border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none transition-colors duration-500"
          >
            {/* The Sliding Circle Badge (Starts on LEFT, slides to RIGHT on hover) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-7 h-7 sm:w-8 sm:h-8 bg-white/15 text-[#F4E3B2] group-hover:bg-[#F4E3B2] group-hover:text-[#0A0D14] rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:left-[calc(100%-34px)] sm:group-hover:left-[calc(100%-38px)] group-hover:rotate-45 shadow-sm pointer-events-none">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500" />
            </div>

            {/* The Text Label (Padding shifts on hover as badge slides across) */}
            <span className="w-full text-center block whitespace-nowrap text-xs sm:text-[12px] font-semibold tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pl-7 pr-2.5 group-hover:pl-2.5 group-hover:pr-7">
              Collaborate
            </span>
          </a>
        </div>

      </div>
    </header>
  );
}
