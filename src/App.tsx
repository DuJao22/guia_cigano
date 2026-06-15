import React, { useState, useEffect, useRef } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import TransformationSection from './components/TransformationSection';
import WhatYouWillLearn from './components/WhatYouWillLearn';
import BonusSection from './components/BonusSection';
import TestimonialsSection from './components/TestimonialsSection';
import PriceSection from './components/PriceSection';
import CTASection from './components/CTASection';
import { Compass } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Monitor screen scrolls to identify active section based on proximity to center of viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'problemas', 'transformacao', 'aprendizado', 'bonus', 'depoimentos', 'oferta', 'cta'];
      const viewportHeight = window.innerHeight;
      let closestSection = 'hero';
      let minDistance = Infinity;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance from the center of viewport to the center of the section element
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = id;
          }
        }
      });

      // Bails out if no section changes (React hook standard optimization)
      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick jump utility scroll
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative text-white font-sans selection:bg-purple-950/60 selection:text-amber-200">
      
      {/* Immersive interactive Background Space canvas */}
      <ThreeCanvas activeSection={activeSection} />

      {/* Floating Header Navbar */}
      <header className="fixed top-0 inset-x-0 h-20 z-40 bg-black/40 border-b border-[#FFD700]/15 backdrop-blur-md flex items-center justify-between px-4 sm:px-10 transition-all duration-300">
        
        {/* Guard Shield Brand Logo */}
        <div
          onClick={() => scrollToAnchor('hero')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-full border border-[#FFD700]/40 bg-[#121212] flex items-center justify-center text-sm shadow-[0_0_12px_rgba(255,215,0,0.2)] group-hover:scale-105 transition-transform">
            🔮
          </div>
          <span className="hidden min-[380px]:inline font-serif tracking-[0.25em] font-normal text-xs text-zinc-100 group-hover:text-[#FFD700] transition-colors uppercase">
            BARALHO CIGANO
          </span>
        </div>

        {/* Quick anchoring links desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
          <button
            onClick={() => scrollToAnchor('problemas')}
            className={`hover:text-[#FFD700] cursor-pointer transition-colors pb-1 ${activeSection === 'problemas' ? 'text-[#FFD700] border-b border-[#FFD700]/60' : ''}`}
          >
            Desafios
          </button>
          <button
            onClick={() => scrollToAnchor('transformacao')}
            className={`hover:text-[#FFD700] cursor-pointer transition-colors pb-1 ${activeSection === 'transformacao' ? 'text-[#FFD700] border-b border-[#FFD700]/60' : ''}`}
          >
            Benefícios
          </button>
          <button
            onClick={() => scrollToAnchor('aprendizado')}
            className={`hover:text-[#FFD700] cursor-pointer transition-colors pb-1 ${activeSection === 'aprendizado' ? 'text-[#FFD700] border-b border-[#FFD700]/60' : ''}`}
          >
            Conteúdo
          </button>
          <button
            onClick={() => scrollToAnchor('bonus')}
            className={`hover:text-[#FFD700] cursor-pointer transition-colors pb-1 ${activeSection === 'bonus' ? 'text-[#FFD700] border-b border-[#FFD700]/60' : ''}`}
          >
            Bônus
          </button>
          <button
            onClick={() => scrollToAnchor('depoimentos')}
            className={`hover:text-[#FFD700] cursor-pointer transition-colors pb-1 ${activeSection === 'depoimentos' ? 'text-[#FFD700] border-b border-[#FFD700]/60' : ''}`}
          >
            Relatos
          </button>
        </nav>

        {/* Action Button & Direct Checkout block */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          
          {/* Direct purchase checkout redirect */}
          <button
            onClick={() => window.open('https://pay.kiwify.com.br/DtdmabV', '_blank')}
            className="px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full font-sans text-[9px] min-[360px]:text-[10px] font-bold tracking-[0.1em] sm:tracking-[0.2em] bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)] hover:shadow-[0_0_25px_rgba(255,215,0,0.45)] cursor-pointer transition-all hover:scale-[1.03] uppercase"
          >
            ADQUIRIR GUIA AGORA
          </button>

        </div>

      </header>

      {/* Main Orchestrated View Body Containers */}
      <main className="relative z-10">
        
        {/* 1. Hero Page */}
        <HeroSection onCTA={() => scrollToAnchor('problemas')} />

        {/* 2. Diagnostic Block */}
        <ProblemSection />

        {/* 3. Aura Transformations benefit items */}
        <TransformationSection />

        {/* 4. Book and chapters checklist */}
        <WhatYouWillLearn />

        {/* 5. Gold chests and hover-spark effects */}
        <BonusSection />

        {/* 6. Continuous float feedback card layout */}
        <TestimonialsSection />

        {/* 7. Detailed offering price card with Book3D layout */}
        <PriceSection onCheckout={() => window.open('https://pay.kiwify.com.br/DtdmabV', '_blank')} />

        {/* 8. Finale call of transformation and protection */}
        <CTASection />

      </main>

    </div>
  );
}
