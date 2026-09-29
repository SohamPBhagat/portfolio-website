'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isVisibleInHero?: boolean;
}

export default function Navbar({ isVisibleInHero = true }: NavbarProps) {
  const [isScrolledPastTop, setIsScrolledPastTop] = useState(false);

  // Track scroll position to fade out center tabs while keeping SOHAM pinned
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
      } pt-6 sm:pt-7 pb-4 px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none flex justify-center`}
    >
      {/* 🌌 Silky Top Contrast Scrim (Active only in Hero, Fades cleanly on light sections) */}
      <div
        className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/65 via-black/25 to-transparent pointer-events-none -z-10 transition-opacity duration-500 ${
          isScrolledPastTop ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Full-Width Header Stage */}
      <div className="w-full max-w-[1520px] flex items-center justify-between relative bg-transparent pointer-events-auto">
        
        {/* Left: Prominent SOHAM Wordmark with Terminal Accent Dot */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-sans font-black text-xl sm:text-2xl tracking-[0.24em] uppercase hover:text-[#FF3B1D] transition-all duration-300 select-none leading-none py-1 ${
              isScrolledPastTop
                ? 'text-[#111111] drop-shadow-none'
                : 'text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]'
            }`}
          >
            <span>SOHAM</span>
            <span className="text-[#FF3B1D]">.</span>
          </a>
        </div>

        {/* Center: Bolder, Larger & Mathematically Centered Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-8 sm:gap-10 lg:gap-12 absolute left-1/2 -translate-x-1/2 transition-all duration-400 pointer-events-auto ${
            isScrolledPastTop
              ? 'opacity-0 -translate-y-3 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 text-sm sm:text-[15px] font-mono font-bold uppercase tracking-[0.22em] text-white hover:text-[#FF3B1D] transition-colors group select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] flex items-center"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF3B1D] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Empty spacer div for perfect mathematical 3-column balance */}
        <div className="w-[120px] hidden md:block shrink-0 pointer-events-none" />

      </div>
    </header>
  );
}
