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
import { Volume2, VolumeX, Compass, ShieldCheck } from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Web Audio synth node references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Monitor screen scrolls to compute progress & intersection states
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate general scroll percent (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // 2. Identify active section based on proximity to center of viewport
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

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio Synthetic 528Hz Solfeggio sound healer generator
  const toggleHealerMusic = () => {
    if (!audioCtxRef.current) {
      // Create new audio context
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Gain node to govern volume smoothly
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        // Soft calming ambient volume
        masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Base 528Hz frequency tuning (Solfeggio frequency for transformation & repairs)
        const hz528 = 528;
        // Perfect root harmonics (C, G, E major triads)
        const freqs = [hz528, hz528 * 0.75, hz528 * 0.5, hz528 * 1.5];

        const oscillators = freqs.map((freq, index) => {
          const osc = ctx.createOscillator();
          // Mix sine and triangle waves for ultra-smooth cosmic drone tone
          osc.type = index % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          // Tiny local low-frequency-oscillator (LFO) for natural floating amplitude
          const localGain = ctx.createGain();
          localGain.gain.setValueAtTime(0.25 + (index * 0.05), ctx.currentTime);
          
          osc.connect(localGain);
          localGain.connect(masterGain);
          osc.start();
          return osc;
        });

        oscillatorsRef.current = oscillators;
        setAudioEnabled(true);
      } catch (err) {
        console.warn('Web Audio error: ', err);
      }
    } else {
      // Toggle existing stream
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current;
      if (ctx && gain) {
        if (audioEnabled) {
          // Fade sound offline
          gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.5);
          setTimeout(() => {
            if (ctx.state !== 'suspended') {
              ctx.suspend();
            }
            setAudioEnabled(false);
          }, 550);
        } else {
          // Resume fade online
          ctx.resume();
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8);
          setAudioEnabled(true);
        }
      }
    }
  };

  // Gracefully terminate audio synths on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop(); } catch (e) {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
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
      <ThreeCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

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

        {/* Action Button & Calm Frequency Volumn block */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          
          {/* Healing Solfeggio sound play-anchor */}
          <button
            onClick={toggleHealerMusic}
            title="Ativar Frequência de Cura Solfeggio 528Hz"
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
              audioEnabled 
                ? 'bg-[#FFD700]/10 border-[#FFD700]/40 text-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.15)] scale-105' 
                : 'bg-black/30 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-[0.15em] font-bold pr-0.5">Frequência Ativa</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-[0.15em] pr-0.5">Ativar Som</span>
              </>
            )}
          </button>

          {/* Quick jump to payments button */}
          <button
            onClick={() => scrollToAnchor('oferta')}
            className="px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full font-sans text-[9px] min-[360px]:text-[10px] font-bold tracking-[0.1em] sm:tracking-[0.2em] bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.25)] hover:shadow-[0_0_25px_rgba(255,215,0,0.45)] cursor-pointer transition-all hover:scale-[1.03] uppercase"
          >
            RESTAURAR ENERGIA
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
        <PriceSection onCheckout={() => window.open('https://pay.kiwify.com.br/JGTvMqc', '_blank')} />

        {/* 8. Finale call of transformation and protection */}
        <CTASection />

      </main>

    </div>
  );
}
