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
      } pt-5 sm:pt-6 pb-2 px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none flex justify-center`}
    >
      {/* 100% Transparent Full-Width Architectural Header */}
      <div className="w-full max-w-[1520px] flex items-center justify-between relative bg-transparent pointer-events-auto">
        
        {/* Left: Luxury Editorial Serif Brandmark (Pinned on scroll) */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif font-normal italic text-xl sm:text-2xl tracking-[0.06em] text-white hover:text-[#FF3B1D] transition-colors select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] leading-none py-1"
          >
            Soham
          </a>
        </div>

        {/* Right / Center: Monospaced Navigation Links (Smoothly fades out on scroll down) */}
        <nav
          className={`flex items-center gap-6 sm:gap-8 lg:gap-10 ml-auto transition-all duration-400 pointer-events-auto ${
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

      </div>
    </header>
  );
}
