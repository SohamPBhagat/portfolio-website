'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import IntroHero from '@/components/IntroHero';
import { portfolioData } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import AboutSection from '@/components/AboutSection';
import VideoShowcaseSection from '@/components/VideoShowcaseSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';

export default function Home() {
  const [replayCount] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);

  // Force scroll to top on page refresh/restart so user always starts at Hero photo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const { personal } = portfolioData;

  return (
    <main className="relative min-h-screen bg-[#F6F5F2] text-[#111111]">
      
      {/* Pinned Direction-Aware Navbar (Syncs with Hero Reveal) */}
      <Navbar isVisibleInHero={isHeroReady} />

      {/* 🎬 Section 1: Centerpiece nbnzia-Style Hero */}
      <IntroHero replayTrigger={replayCount} onStateChange={setIsHeroReady} />

      {/* 📄 Section 2: Editorial Dossier with Scroll Laser-Wave Word Reveal */}
      <AboutSection />

      {/* 💻 Section 3: Dedicated Video Showcase & Interactive Workbench */}
      <VideoShowcaseSection />

      {/* 🛠️ Section 4: { WHAT I LEARNED & WHAT I DO } Interactive Disciplines Drawer */}
      <ServicesSection />

      {/* 📦 Section 5: { SELECTED WORKS & SYSTEMS } Deep-Dive Case Studies */}
      <ProjectsSection />

      {/* 🧠 Section 6: { SKILLS & CREDENTIALS } Technical Matrix & Unique Edge */}
      <SkillsSection />

      {/* 📬 Minimalist Editorial Footer */}
      <footer id="contact" className="relative z-20 py-20 border-t border-white/10 bg-[#040507] text-white flex justify-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-sm font-bold font-sans tracking-[0.2em] uppercase text-white">
              SOHAM
            </div>
            <p className="text-xs text-neutral-400 font-mono">
              B.Sc. Data Science @ SPPU Department of Technology &bull; Pune, India
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#FF3B1D] hover:underline font-semibold"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white font-semibold"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
