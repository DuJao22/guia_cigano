import React, { useEffect, useRef } from 'react';
import { Sparkles, Compass, ShieldAlert } from 'lucide-react';
import { gsap } from 'gsap';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger slide up transition on entrance
    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative min-h-[80vh] py-24 px-4 flex items-center justify-center text-center overflow-hidden"
    >
      {/* Dynamic closing portal representation background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Soft centered purple/blue backglows matching spec */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4B0082] rounded-full mix-blend-screen opacity-[0.14] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-[#1E3A8A] rounded-full mix-blend-screen opacity-[0.12] blur-[100px]" />
      </div>

      <div ref={elementRef} className="max-w-3xl mx-auto z-10">
        
        {/* Spiritual Compass Icon Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase">
          <Compass className="w-4 h-4 text-[#FFD700] animate-spin-slow" />
          O Destino Está Em Suas Mãos
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 leading-[1.1]">
          Sua Transformação <br />
          <span className="text-[#FFD700] not-italic font-normal">Começa Agora.</span>
        </h2>

        {/* Description text block */}
        <p className="mt-6 text-sm sm:text-lg text-zinc-400 leading-relaxed font-sans font-light max-w-2xl mx-auto">
          Não espere a energia mudar sozinha. Aprenda técnicas práticas para fortalecer sua espiritualidade e cuidar da sua energia vital.
        </p>

        {/* The Action buttons with exact url */}
        <div className="mt-10 mb-8">
          <a
            href="https://pay.kiwify.com.br/JGTvMqc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3.5 px-10 py-5 font-sans font-bold text-xs sm:text-sm tracking-[0.25em] rounded-full bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.65)] hover:bg-[#ffe033] transition-all duration-300 overflow-hidden uppercase cursor-pointer transform hover:scale-[1.05]"
          >
            {/* Pulsing gleam sheen */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            🚀 ACESSAR AGORA
          </a>
        </div>

        {/* Concluding Brazilian spiritual invitation text */}
        <p className="text-xs sm:text-sm text-[#FFD700]/70 max-w-xl mx-auto font-sans leading-relaxed tracking-wider font-light uppercase">
          Transforme sua vibração hoje mesmo. Comece sua jornada rumo a um despertar profundo e equilibrado. Garanta sua vaga e eleve sua frequência agora.
        </p>

        {/* Security / Quality Decal */}
        <div className="mt-12 flex items-center justify-center gap-2.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest select-none">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FFD700]/40" />
          Acesso imediato enviado via e-mail pós aprovação de compra
        </div>

      </div>

      {/* Decorative footer footer copyright card */}
      <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none select-none text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
        © 2026 Guia de Descarrego Espiritual • Todos os Direitos Reservados.
      </div>
    </section>
  );
}
