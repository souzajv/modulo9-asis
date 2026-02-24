import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronRight, Terminal, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();
      
      tl.fromTo(badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(titleRef.current, 
        { y: 50, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo('.hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-12 md:px-32 relative z-10 overflow-hidden">
      {/* Abstract Background Grid specific to Hero */}
      <div className="absolute inset-0 z-0 opacity-20 perspective-grid">
         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="z-10 max-w-5xl">
        <div ref={badgeRef} className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-900/50 rounded-none text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider">LIVE SPRINT REVIEW</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-none text-indigo-400">
            <Users size={14} />
            <span className="text-xs font-mono font-bold tracking-wider">GRUPO 02</span>
          </div>
        </div>

        <h1 ref={titleRef} className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
          <span className="block text-white">QUALITY</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">AS CODE</span>
        </h1>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start hero-text">
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-transparent mt-6 md:block hidden" />
          
          <div>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light mb-8 leading-relaxed">
              Transformando requisitos de negócio da <strong className="text-white">ASIS TaxTech</strong> em ativos de software testáveis e auditáveis.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex -space-x-4">
                 <div className="w-12 h-12 rounded-none bg-slate-800 border-4 border-[#020617] flex items-center justify-center text-xs font-bold text-white z-10">INT</div>
                 <div className="w-12 h-12 rounded-none bg-emerald-900 border-4 border-[#020617] flex items-center justify-center text-xs font-bold text-emerald-100 z-0">ASIS</div>
              </div>
              <div className="h-8 w-[1px] bg-slate-800"></div>
              <div className="flex gap-2 text-sm font-mono text-slate-500">
                <div className="flex items-center gap-2"><Terminal size={14}/> v1.0.0</div>
                <div className="flex items-center gap-2"><ChevronRight size={14}/> ES09</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-text absolute bottom-12 right-12 flex items-center gap-3 text-emerald-400 group cursor-pointer">
        <span className="font-mono text-sm tracking-widest uppercase group-hover:mr-2 transition-all">Iniciar Jornada</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default HeroSection;