import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  onCTA: () => void;
}

export default function HeroSection({ onCTA }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant entrance animation using GSAP
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate title letters or words
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, delay: 0.2 }
      );

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.8'
      );

      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(indicatorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      );

      // Loop floating movement on the indicator
      gsap.to(indicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto z-10">
        
        {/* Sacred Mystic Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-950/20 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          Desvende o Oráculo Cigano
        </div>

        {/* Display Heading paired with Artistic Flair Serif Spec */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl lg:text-[85px] font-extralight leading-[1.05] tracking-tighter italic font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-300 drop-shadow-lg"
        >
          Guia de Leitura do <br />
          <span className="text-[#FFD700] font-normal not-italic tracking-[0.05em] uppercase drop-shadow-[0_2px_15px_rgba(255,215,0,0.35)]">
            BARALHO CIGANO
          </span>
          <br />
          <span className="text-xl sm:text-2xl not-italic font-display uppercase tracking-[0.4em] text-[#FFD700]/60 block mt-3">
            Método Prático e Intuitivo
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans font-light"
        >
          Aprenda a interpretar as 36 cartas de forma prática, domine as combinações clássicas e realize consultas precisas sobre amor, trabalho e caminhos de vida.
        </p>

        {/* Pulsing Core Action Button */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <button
            ref={buttonRef}
            onClick={onCTA}
            className="group relative px-10 py-5 font-sans font-bold text-xs sm:text-sm tracking-[0.25em] rounded-full bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.65)] hover:bg-[#ffe033] transition-all duration-300 cursor-pointer transform hover:scale-[1.05] active:scale-95 flex items-center gap-3 overflow-hidden uppercase"
          >
            {/* Glossy overlay sheen */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            ✨ QUERO ACESSO IMEDIATO
          </button>
          
          <span className="text-[10px] font-mono text-[#FFD700]/50 uppercase tracking-[0.3em]">
            Acesso Digital Instantâneo • 100% Seguro
          </span>
        </div>
      </div>

      {/* Floating Chevron Indicator to scroll */}
      <div
        ref={indicatorRef}
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer z-10 text-indigo-300/40 hover:text-indigo-300/80 transition-colors"
        onClick={onCTA}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Rolar Para Descobrir</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
