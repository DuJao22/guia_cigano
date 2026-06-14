import React, { useEffect, useRef } from 'react';
import { TESTIMONIALS_DATA } from '../data';
import { Quote, MessageSquare, Star } from 'lucide-react';
import { gsap } from 'gsap';

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.testimonial-card');
    if (!cards || cards.length === 0) return;

    // Continuous floating animation matching User Specification exactly
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -18,
          duration: 3 + (i * 0.5), // stagger cycles so they don't look robotic
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.3,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="depoimentos"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden scroll-mt-10"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        
        {/* Header */}
        <div className="text-center mb-20 animate-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Relatos de Alinhamento
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
            Quem Já Teve Seus <br />
            <span className="text-[#FFD700] not-italic font-normal">Caminhos Desbloqueados</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans font-light">
            Centenas de pessoas já alcançaram leveza astral e restabeleceram o fluxo de abundância utilizando as fórmulas práticas prescritas neste guia.
          </p>
        </div>

        {/* Testimonials Grid mapping Floating cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card relative p-8 rounded-lg bg-[#1a1a1a]/80 border border-[#FFD700]/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              
              {/* Quote Graphic Icon Decals */}
              <div className="absolute top-6 right-6 text-[#FFD700]/10 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              {/* Top Row: Stars and Quote Text */}
              <div>
                {/* Visual Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, index) => (
                    <Star key={index} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>

                {/* Primary testimonial quote */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans italic font-light leading-relaxed mb-6">
                  {testimonial.text}
                </p>
              </div>

              {/* Bottom Row: User Avatar metadata */}
              <div className="border-t border-zinc-900 pt-6 flex items-center gap-3.5 mt-auto">
                
                {/* Graphic Avatar Sphere */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-yellow-600 flex items-center justify-center text-xs font-sans font-bold text-black tracking-wider shadow-inner">
                  {testimonial.avatarText}
                </div>

                <div>
                  <h4 className="text-sm font-sans font-bold text-zinc-200 tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#FFD700] tracking-wider uppercase">
                    {testimonial.role} • <span className="text-zinc-500">{testimonial.location}</span>
                  </p>
                </div>

              </div>

              {/* Mini date indicator absolute */}
              <div className="absolute bottom-6 right-8 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                {testimonial.date}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
