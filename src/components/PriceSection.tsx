import React from 'react';
import Book3D from './Book3D';
import { Calendar, ShieldCheck, HeartHandshake, Sparkles, CreditCard } from 'lucide-react';

interface PriceSectionProps {
  onCheckout: () => void;
}

export default function PriceSection({ onCheckout }: PriceSectionProps) {
  return (
    <section
      id="oferta"
      className="relative py-8 sm:py-12 px-4 flex items-center justify-center overflow-hidden scroll-mt-20 border-b border-zinc-900/40"
    >
      {/* Golden Portal visual frame */}
      <div className="absolute inset-x-0 top-0 h-[100%] -z-10 pointer-events-none flex items-center justify-center">
        {/* Massive circular gold halo representation */}
        <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full border border-amber-500/10 bg-radial from-amber-500/2 via-transparent to-transparent blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Acesso Imediato ao Conhecimento
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
            Sua Oportunidade De <br />
            <span className="text-[#FFD700] not-italic font-normal">Dominar as Cartas</span>
          </h2>
        </div>

        {/* Golden Interactive Price Card */}
        <div
          className="relative rounded-lg bg-[#1a1a1a]/80 border border-[#FFD700]/20 p-8 sm:p-12 shadow-[0_30px_70px_rgba(255,215,0,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden"
        >
          {/* Subtle gold lines corners decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#FFD700]/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#FFD700]/30 rounded-bl-lg pointer-events-none" />

          {/* Left Column: Rotating 3D Grimoire Book */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Book3D className="h-[280px] sm:h-[350px]" autoRotateSpeed={0.015} />
            <span className="text-[10px] font-mono text-zinc-500 text-center tracking-wider block uppercase mt-4">
              * Acompanha materiais adicionais
            </span>
          </div>

          {/* Right Column: Dynamic price offerings */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Offer labels */}
            <div className="mb-4">
              <span className="text-[10px] font-display text-[#FFD700] font-bold tracking-[0.3em] uppercase bg-[#FFD700]/10 border border-[#FFD700]/25 px-4 py-1.5 rounded-full inline-block">
                PROMOÇÃO DE LANÇAMENTO
              </span>
            </div>

            {/* Price values */}
            <div className="space-y-1 mb-6">
              <span className="text-sm font-sans text-zinc-500 line-through">
                Preço normal: R$ 229,00
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-serif italic text-zinc-400">
                  Por apenas:
                </span>
                <span className="text-4xl sm:text-6xl font-serif font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-yellow-400 to-[#FFD700] tracking-tight">
                  R$ 29,90
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                * Sem mensalidades, taxa única. Acesso vitalício para ler no celular, tablet ou computador.
              </p>
            </div>

            {/* List of included elements */}
            <div className="space-y-2.5 mb-8 border-t border-b border-zinc-900 py-6">
              {[
                'Manual Completo do Baralho Cigano (PDF Digital)',
                'Guia de Métodos Clássicos de Tiragem',
                'Bônus 1: Caderno de Combinações Rápidas (A-Z)',
                'Bônus 2: Áudio Binaural de Sintonia e Intuição 528Hz',
                'Bônus 3: Apostila de Tiragens Especiais de Amor'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-350 font-sans font-light">
                  <span className="w-4 h-4 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[8px] text-[#FFD700] shrink-0 font-bold">
                    ✓
                  </span>
                  <span className="font-light">{item}</span>
                </div>
              ))}
            </div>

            {/* Pulsing button anchor checkout */}
            <a
              href="https://pay.kiwify.com.br/JGTvMqc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group relative w-full py-4 sm:py-5 font-sans font-bold text-xs sm:text-sm tracking-[0.25em] rounded-full bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.65)] hover:bg-[#ffe033] transition-all duration-300 overflow-hidden block cursor-pointer uppercase transform hover:scale-[1.03]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              ✨ QUERO MEU ACESSO
            </a>

            {/* Trust Signals */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center border-t border-zinc-900/40 pt-4">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-[#FFD700] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-sans text-zinc-500 leading-tight uppercase font-medium">
                  Compra Segura
                </span>
              </div>
              <div className="flex flex-col items-center">
                <HeartHandshake className="w-5 h-5 text-[#FFD700] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-sans text-zinc-500 leading-tight uppercase font-medium">
                  7 Dias de Garantia
                </span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-5 h-5 text-[#FFD700] mb-1" />
                <span className="text-[9px] sm:text-[10px] font-sans text-zinc-500 leading-tight uppercase font-medium">
                  Acesso Imediato
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
