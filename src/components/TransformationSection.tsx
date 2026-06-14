import React, { useEffect, useRef } from 'react';
import { BENEFITS_DATA } from '../data';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TransformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax layer references
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const mainLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background layer moves 20% of scroll (slow-moving background space)
      gsap.to(bgLayerRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Medium layer moves 50% of scroll (floating sacred gold rings)
      gsap.to(midLayerRef.current, {
        y: -250,
        rotate: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Main content enters beautifully with fade-in and slide-up staggered
      const elements = mainLayerRef.current?.querySelectorAll('.benefit-item');
      if (elements && elements.length > 0) {
        gsap.from(elements, {
          x: -60,
          opacity: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
          }
        });
      }

      // Main header entry
      gsap.from('.trans-heading', {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="transformacao"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden scroll-mt-10"
    >
      {/* 1. Deep Background Parallax Layer (20%) */}
      <div
        ref={bgLayerRef}
        className="absolute inset-x-0 top-0 h-[120%] -z-10 pointer-events-none"
      >
        {/* Soft glowing cosmic nebulas */}
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#4B0082] mix-blend-screen opacity-[0.14] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#1E3A8A] mix-blend-screen opacity-[0.14] blur-[100px]" />
        
        {/* Subtle geometric dot matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      {/* 2. Middle Parallax Layer (50% speed with rotation) */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center p-4"
      >
        {/* Giant gold wireframe rings */}
        <div className="w-[500px] h-[500px] rounded-full border border-[#FFD700]/10 flex items-center justify-center opacity-40">
          <div className="w-[380px] h-[380px] rounded-full border border-dashed border-[#FFD700]/15 flex items-center justify-center">
            <div className="w-[240px] h-[240px] rounded-full border border-[#4B0082]/20" />
          </div>
        </div>
      </div>

      {/* 3. Main Elements Parallax Layer (100% position layout) */}
      <div ref={mainLayerRef} className="max-w-6xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Visual Promise Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left trans-heading">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Transmutação Áurica
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 leading-[1.12]">
            Imagine Sentir Sua <br />
            <span className="text-[#FFD700] not-italic font-normal">
              Energia Renovada
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-light max-w-lg">
            Ao aplicar as técnicas corretas de descarrego, você limpa os resíduos espirituais de inveja e bloqueios, criando um escudo energético invisível ao seu redor.
          </p>

          <div className="mt-6 hidden lg:flex items-center gap-3 text-xs font-mono text-[#FFD700]/40 uppercase tracking-widest">
            <span>Frequência Harmonizada</span>
            <span>•</span>
            <span>Estabilidade Astral</span>
          </div>
        </div>

        {/* Right Side: Benefits / Transformations */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {BENEFITS_DATA.map((benefit, index) => (
            <div
              key={benefit.id}
              className="benefit-item group relative p-6 sm:p-8 rounded-lg bg-[#1a1a1a]/80 border border-[#FFD700]/20 hover:border-[#FFD700]/50 hover:shadow-[0_15px_45px_rgba(255,215,0,0.06)] transition-all duration-300 overflow-hidden"
            >
              {/* Backglow on hover */}
              <div className="absolute inset-0 bg-radial from-amber-500/0 via-transparent to-transparent group-hover:from-amber-500/3 transition-all duration-300 pointer-events-none" />

              <div className="flex items-center gap-3.5 mb-4">
                <span className="text-2xl select-none">{benefit.icon}</span>
                <h3 className="text-base sm:text-lg font-serif italic text-[#FFD700] tracking-tight">
                  {benefit.title}
                </h3>
              </div>

              <h4 className="text-xs sm:text-sm text-zinc-200 font-sans font-light italic mb-2">
                "{benefit.text}"
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-light">
                {benefit.description}
              </p>

              <div className="absolute top-4 right-4 text-[9px] font-mono text-[#FFD700]/20 uppercase tracking-widest">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
