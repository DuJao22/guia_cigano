import React, { useState, useEffect, useRef } from 'react';
import { CHAPTERS_DATA } from '../data';
import Book3D from './Book3D';
import { BookOpen, Map, Check, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatYouWillLearn() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger chapters entering from the right
    const ctx = gsap.context(() => {
      gsap.from('.chapter-node', {
        x: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });
      
      // Animate the main details panel
      gsap.from('.learning-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="aprendizado"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden scroll-mt-10"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="learning-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            O Mapa Secreto do Conhecimento
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
            O Que Você Vai Aprender <br />
            No <span className="text-[#FFD700] not-italic font-normal">Manual do Baralho Cigano</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans font-light">
            Cada capítulo foi estruturado com explicações diretas, métodos de tiragem e combinações práticas passo a passo para você fazer consultas precisas com total segurança.
          </p>
        </div>

        {/* Sacred Connection Callout Gesture Trigger */}
        <div className="mb-12 max-w-4xl mx-auto px-4">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/20 via-black/80 to-amber-950/10 border border-[#FFD700]/20 hover:border-[#FFD750]/40 transition-all duration-500 shadow-[0_4px_30px_rgba(255,215,0,0.03)] text-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/70 to-transparent" />
            <div className="absolute -right-16 -top-16 w-36 h-36 bg-[#FFD700]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            <span className="text-[10px] font-mono tracking-widest text-[#FFD700]/80 uppercase block mb-3">
              ✦ Portal da Transmutação ✦
            </span>
            <p className="font-serif italic text-lg sm:text-2xl text-zinc-100 tracking-wide leading-relaxed max-w-3xl mx-auto">
              "Aprenda a fazer o <span className="text-[#FFD700] not-italic font-semibold drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]">descarrego</span> através dos estudos do <span className="text-[#FFD700] not-italic font-semibold drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]">baralho cigano</span>."
            </p>
            <p className="text-xs text-zinc-450 mt-3 font-sans font-light">
              Use a sabedoria ancestral do oráculo para limpar influências negativas, proteger seus caminhos e equilibrar sua energia vital.
            </p>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive 3D Book */}
          <div
            ref={bookColumnRef}
            className="lg:col-span-5 flex flex-col items-center justify-center bg-[#1a1a1a]/80 border border-[#FFD700]/20 backdrop-blur-md rounded-lg p-6 sm:p-8 lg:sticky lg:top-24 shadow-2xl overflow-hidden group"
          >
            {/* Visual Header of Mock e-Book Container */}
            <div className="w-full text-center mb-4">
              <span className="text-[10px] font-display text-black font-bold tracking-widest uppercase bg-[#FFD700] px-4 py-1.5 rounded-full inline-block">
                Modelo 3D Interativo
              </span>
              <p className="text-xs text-zinc-500 mt-3 font-sans">
                Arraste o livro ou use o toque para rotacioná-lo em 3D
              </p>
            </div>

            {/* The 3D Book canvas */}
            <Book3D autoRotateSpeed={0.007} />

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#FFD700]/80">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
              <span>Giro Ativo • Manual Prático de Leitura</span>
            </div>
          </div>

          {/* Right Column: Chapters Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {CHAPTERS_DATA.map((chapter) => {
              const isOpen = activeChapter === chapter.id;
              
              return (
                <div
                  key={chapter.id}
                  className={`chapter-node group rounded-lg border transition-all duration-500 overflow-hidden cursor-pointer ${
                    isOpen 
                      ? 'bg-gradient-to-r from-[#1c1a15] to-[#121212] border-[#FFD700]/40 shadow-[0_10px_35px_rgba(255,215,0,0.04)]' 
                      : 'bg-[#121212]/90 border-zinc-900 hover:border-[#FFD700]/30 hover:bg-[#1c1a15]/40'
                  }`}
                  onClick={() => setActiveChapter(chapter.id)}
                >
                  
                  {/* Accordion Trigger Header */}
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      
                      {/* Chapter Indicator Ring */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-serif font-bold transition-all duration-300 ${
                        isOpen 
                          ? 'bg-[#FFD700] text-black scale-105 shadow-md font-semibold' 
                          : 'bg-[#121212] border border-[#FFD700]/20 text-[#FFD700]'
                      }`}>
                        {chapter.id}
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#FFD700]/70 tracking-widest uppercase block">
                          {chapter.subtitle}
                        </span>
                        <h3 className={`text-base sm:text-lg font-serif italic tracking-tight transition-colors duration-350 ${
                          isOpen ? 'text-[#FFD700]' : 'text-zinc-300 group-hover:text-zinc-100'
                        }`}>
                          {chapter.icon} {chapter.title}
                        </h3>
                      </div>

                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        {chapter.duration}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-[#FFD700] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Accordion Collapsible Panel */}
                  <div className={`transition-all duration-700 ease-in-out ${
                    isOpen ? 'max-h-[500px] border-t border-[#FFD700]/10' : 'max-h-0'
                  } overflow-hidden`}>
                    
                    <div className="p-6 bg-[#1a1a1a]/40">
                      
                      {/* Description */}
                      <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed mb-5">
                        {chapter.description}
                      </p>

                      {/* Topics Learned List */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-[#FFD700] uppercase tracking-widest mb-1">
                          Tópicos Fundamentais:
                        </h4>
                        
                        {chapter.topics.map((topic, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans font-light">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[8px] text-[#FFD700] shrink-0 font-bold">
                              ✓
                            </span>
                            <span className="leading-tight">{topic}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
