import React, { useState, useEffect, useRef } from 'react';
import { BONUS_DATA } from '../data';
import { Gift, Zap } from 'lucide-react';

// Local lightweight particle explosion canvas component
interface ParticleBurstProps {
  isTriggered: boolean;
}

function LocalParticleBurst({ isTriggered }: ParticleBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set size
    canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = canvas.parentElement?.clientHeight || 300;

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      gravity: number;
      spin: number;
      rotation: number;
    }

    let sparks: Spark[] = [];

    const colors = ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706'];

    const createExplosion = () => {
      sparks = [];
      const count = 50;
      const startX = canvas.width / 2;
      const startY = canvas.height * 0.45; // slightly above center (where the gift/badge sits)

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2.5;
        
        sparks.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (Math.random() * 2), // slightly upwards bias
          radius: Math.random() * 3.5 + 1.2,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          gravity: 0.08,
          spin: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let active = false;

      sparks.forEach((spark) => {
        if (spark.alpha <= 0.01) return;
        active = true;

        // Physics
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += spark.gravity; // fall
        spark.alpha -= 0.024; // fade
        spark.rotation += spark.spin;

        // Draw star or circle
        ctx.save();
        ctx.translate(spark.x, spark.y);
        ctx.rotate(spark.rotation);
        ctx.globalAlpha = spark.alpha;
        ctx.fillStyle = spark.color;
        
        // draw glowing star shape
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(0, -spark.radius);
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, -spark.radius * 0.4);
          ctx.rotate(Math.PI / 5);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      if (active) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (isTriggered) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      createExplosion();
      animate();
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isTriggered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-25"
    />
  );
}

export default function BonusSection() {
  // Track hover triggering states for particle engines
  const [hoveredBonusId, setHoveredBonusId] = useState<string | null>(null);
  const [explosionTicks, setExplosionTicks] = useState<{ [id: string]: boolean }>({});

  const handleMouseEnter = (id: string) => {
    setHoveredBonusId(id);
    // Pulse true briefly to force re-render/trigger the explosion
    setExplosionTicks(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredBonusId(null);
    setExplosionTicks(prev => ({
      ...prev,
      [id]: false
    }));
  };

  return (
    <section
      id="bonus"
      className="relative py-8 sm:py-12 px-4 flex items-center justify-center overflow-hidden scroll-mt-20 border-b border-zinc-900/40"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/30 text-[11px] font-display tracking-[0.4em] text-[#FFD700] uppercase mb-4 animate-pulse">
            <Gift className="w-3.5 h-3.5" />
            Ofertas Celestiais de Graça
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extralight italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
            Bônus Exclusivos Gratuitos <br />
            Disponíveis <span className="text-[#FFD700] not-italic font-normal">Apenas Hoje</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto font-sans font-light">
            Para acelerar e selar sua restauração de caminhos, preparei 3 ferramentas de bônus altamente poderosas para complementar seu despertar espiritual.
          </p>
        </div>

        {/* Bonus Chest Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BONUS_DATA.map((bonus) => {
            const isHovered = hoveredBonusId === bonus.id;
            const hasExploded = explosionTicks[bonus.id] || false;

            return (
              <div
                key={bonus.id}
                onMouseEnter={() => handleMouseEnter(bonus.id)}
                onMouseLeave={() => handleMouseLeave(bonus.id)}
                onTouchStart={() => handleMouseEnter(bonus.id)}
                className="bonus-chest-card group relative rounded-lg bg-[#1a1a1a]/80 border border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,215,0,0.06)] p-8 overflow-hidden cursor-pointer"
              >
                
                {/* Embedded Canvas Sparkle Explosion */}
                <LocalParticleBurst isTriggered={hasExploded} />

                {/* Chest Glowing back-aura */}
                <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-amber-500/5 to-transparent blur-xl group-hover:from-amber-400/12 transition-all duration-500" />
                
                {/* Badge text */}
                <div className="mb-6 flex justify-between items-start">
                  <span className="px-3.5 py-1 text-[9px] font-mono tracking-[0.2em] font-bold uppercase rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/25">
                    {bonus.badge}
                  </span>
                  
                  {/* Values strikeout */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 line-through block">
                      De {bonus.originalPrice}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
                      GRÁTIS
                    </span>
                  </div>
                </div>

                {/* Massive chest-inspired icon panel */}
                <div className="mb-6 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-all duration-500 relative ${
                    isHovered 
                      ? 'bg-[#FFD700] scale-110 rotate-3 text-black shadow-[0_0_25px_rgba(255,215,0,0.4)] font-semibold' 
                      : 'bg-zinc-950 border border-[#FFD700]/20 text-[#FFD700]'
                  }`}>
                    {bonus.icon}
                    
                    {/* Ring border orbiting around open badge */}
                    <div className={`absolute inset-0 border border-dashed border-[#FFD700]/30 rounded-full animate-spin-slow ${
                      isHovered ? 'scale-125 opacity-70' : 'scale-100 opacity-20'
                    }`} />
                  </div>
                </div>

                {/* Heading details */}
                <h3 className="text-lg font-serif italic text-zinc-250 tracking-tight text-center group-hover:text-[#FFD700] transition-colors mb-3 font-normal">
                  {bonus.title}
                </h3>

                <p className="text-center text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-light mb-6">
                  {bonus.description}
                </p>

                {/* Sub-bullet features */}
                <div className="space-y-2.5 border-t border-zinc-900 pt-5">
                  {bonus.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans font-light">
                      <Zap className="w-3.5 h-3.5 text-[#FFD700] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom descriptor */}
                <div className="mt-6 text-center select-none text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFD700]/30 group-hover:text-[#FFD700]/80 transition-all duration-350">
                  {isHovered ? '⚡ Baú Consagrado Aberto!' : '🎁 Passe o mouse para abrir'}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
