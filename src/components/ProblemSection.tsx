import React from 'react';
import { PROBLEMS_DATA } from '../data';
import { ShieldX } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section
      id="problemas"
      className="relative py-8 sm:py-12 px-4 flex flex-col justify-center scroll-mt-20 border-b border-zinc-900/40"
    >
      <div className="max-w-6xl mx-auto z-10 w-full">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4">
            <ShieldX className="w-3.5 h-3.5" />
            Desafios de Aprendizado
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
            Você Sofre Com Algum <br className="sm:hidden" /> Desses <span className="text-[#FFD700] not-italic font-normal">Bloqueios?</span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans font-light">
            Aprender Baralho Cigano não precisa ser uma decoreba confusa ou exaustiva. Veja se você se sabota com alguma das seguintes dificuldades cotidianas.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 drop-shadow-xl">
          {PROBLEMS_DATA.map((problem) => (
            <div
              key={problem.id}
              className="problem-card group relative p-8 rounded-lg bg-[#1a1a1a]/80 border border-[#FFD700]/20 hover:border-[#FFD700]/60 transition-all duration-500 hover:shadow-[0_10px_35px_rgba(255,215,0,0.06)] overflow-hidden"
            >
              {/* Card ambient backing */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[#FFD700]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-radial from-amber-500/0 via-transparent to-transparent group-hover:from-amber-500/2.5 transition-all duration-500" />
              
              {/* Diagnostic Icon */}
              <div className="text-4xl mb-6 select-none group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-serif italic font-normal text-zinc-200 tracking-tight group-hover:text-[#FFD700] transition-colors duration-300 mb-3">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400/80 leading-relaxed font-sans font-light">
                {problem.description}
              </p>

              {/* Core element index decorator */}
              <div className="absolute bottom-4 right-4 text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] opacity-45 group-hover:opacity-100 transition-opacity">
                Dificuldade
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-sans text-[#FFD700]/70 tracking-wider">
            ⚠️ Se você se identificou com 1 ou mais desses bloqueios, você precisa de um <b className="text-[#FFD700]">método de leitura prático</b>.
          </p>
        </div>

      </div>
    </section>
  );
}
