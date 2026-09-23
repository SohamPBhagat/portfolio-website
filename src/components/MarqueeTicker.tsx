'use client';

import React from 'react';

interface TickerItem {
  name: string;
  desc: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { name: 'ForgeAPI', desc: 'The AI Gateway Built for Agents' },
  { name: 'MediKiosk', desc: 'Smart Healthcare Diagnosis Engine' },
  { name: 'Forge ADE', desc: 'Autonomous Agentic Development Environment' },
  { name: 'Verica OS', desc: 'Zero-Token SQLite Knowledge Graphs' },
  { name: 'Full-Stack AI', desc: 'Deterministic Agentic Architecture' },
  { name: 'SPPU Dept of Tech', desc: 'B.Sc. Data Science & ML' },
  { name: '2.5K+ Community', desc: 'Discord Builders & Researchers' },
  { name: 'ForgeCLI', desc: 'Parallel Sandboxed Git Worktrees' },
];

export default function MarqueeTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-[#F6F5F2] border-y border-black/15 py-4 sm:py-5 select-none group">
      {/* Subtle fade edges for smooth blending */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-r from-[#F6F5F2] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-l from-[#F6F5F2] to-transparent z-10" />

      {/* Infinite scrolling track (Right to Left) with pause on hover */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 sm:gap-10 px-5 sm:px-8 shrink-0"
          >
            <div className="flex items-center gap-3">
              {/* Highlighted Project Name - Large, crisp, and authoritative */}
              <span className="font-mono text-sm sm:text-base lg:text-[17px] font-bold uppercase tracking-[0.14em] text-[#111111] transition-colors">
                {item.name}
              </span>
              
              {/* Clean crimson divider */}
              <span className="text-[#FF3B1D] font-mono text-xs sm:text-sm font-bold opacity-80">
                /
              </span>
              
              {/* Project Description */}
              <span className="font-mono text-xs sm:text-sm lg:text-[14px] uppercase tracking-[0.10em] text-neutral-600 font-medium">
                {item.desc}
              </span>
            </div>

            {/* Signature NBNZIA geometric 4-point star divider */}
            <svg
              className="w-3.5 h-3.5 text-[#FF3B1D] shrink-0 opacity-90"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

