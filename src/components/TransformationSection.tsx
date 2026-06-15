import React from 'react';
import { BENEFITS_DATA } from '../data';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function TransformationSection() {
  return (
    <section
      id="transformacao"
      className="relative py-8 sm:py-12 px-4 flex items-center justify-center overflow-hidden scroll-mt-20 border-b border-zinc-900/40"
    >
      {/* 1. Deep Background Glow Layer */}
      <div className="absolute inset-x-0 top-0 h-full -z-10 pointer-events-none">
        {/* Soft glowing cosmic nebulas */}
        <div className="absolute top-[20%] left-[5%] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#4B0082]/10 mix-blend-screen blur-[100px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full bg-[#1E3A8A]/10 mix-blend-screen blur-[90px]" />
        
        {/* Subtle geometric dot matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      {/* 2. Middle Static Sacred Rings */}
      <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center p-4">
        {/* Giant gold wireframe rings */}
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-[#FFD700]/5 flex items-center justify-center opacity-30">
          <div className="w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#FFD700]/10 flex items-center justify-center">
            <div className="w-[140px] h-[140px] sm:w-[240px] sm:h-[240px] rounded-full border border-[#4B0082]/15" />
          </div>
        </div>
      </div>

      {/* 3. Main Elements (Simple & responsive) */}
      <div className="max-w-6xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Visual Promise Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Clareza Oracular
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 leading-[1.12]">
            Imagine Sentir Sua <br />
            <span className="text-[#FFD700] not-italic font-normal">
              Intuição Desperta
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-sans font-light max-w-lg">
            Ao dominar o método correto de leitura do Baralho Cigano, você destrava sua intuição e lê as cartas com total segurança e precisão, clareando suas dúvidas e guiando quem você ama.
          </p>

          <div className="mt-6 hidden lg:flex items-center gap-3 text-xs font-mono text-[#FFD700]/40 uppercase tracking-widest">
            <span>Oráculo Cigano</span>
            <span>•</span>
            <span>Orientação Prática</span>
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
