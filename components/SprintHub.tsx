import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Lock, ArrowRight, GitBranch, ExternalLink, Code2, Hexagon, Cpu, FolderOpen, LayoutDashboard, ChevronRight, CornerUpLeft } from 'lucide-react';

interface SprintHubProps {
  onSelectSprint: (id: string) => void;
}

interface SprintData {
  id: string;
  title: string;
  subtitle: string;
  status: 'COMPLETED' | 'LOCKED' | 'IN_PROGRESS';
  date: string;
}

type HubView = 'MENU' | 'SPRINTS';

const SPRINTS: SprintData[] = [
  { id: '01', title: 'Sprint Review 01', subtitle: 'Architecture & Drivers', status: 'COMPLETED', date: 'FEB 12' },
  { id: '02', title: 'Sprint Review 02', subtitle: 'Functional Requirements', status: 'LOCKED', date: 'FEB 26' },
  { id: '03', title: 'Sprint Review 03', subtitle: 'Performance & Scale', status: 'LOCKED', date: 'MAR 12' },
  { id: '04', title: 'Sprint Review 04', subtitle: 'Security & Audit', status: 'LOCKED', date: 'MAR 26' },
  { id: '05', title: 'Sprint Review 05', subtitle: 'Final Release', status: 'LOCKED', date: 'APR 09' },
];

const SprintHub: React.FC<SprintHubProps> = ({ onSelectSprint }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<HubView>('MENU');

  // Initial Animation (Header)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.set('.hub-header', { autoAlpha: 1 });
      tl.fromTo('.group-label', { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
      tl.fromTo('.pre-title', { autoAlpha: 0, scaleX: 0.8 }, { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: 'expo.out' }, "-=0.4");
      tl.fromTo('.title-main', { scale: 0.9, autoAlpha: 0, letterSpacing: '0.5em' }, { scale: 1, autoAlpha: 1, letterSpacing: '-0.05em', duration: 1.2, ease: 'power4.out', stagger: 0.1 }, "-=0.6");
      tl.fromTo('.title-outline', { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 0.3, scale: 1, duration: 1.2, ease: 'power4.out' }, "<");
      tl.fromTo('.title-deco', { width: 0, autoAlpha: 0 }, { width: '100%', autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // View Transition Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide everything first to ensure clean state
      gsap.set('.menu-card', { autoAlpha: 0, y: 20 });
      gsap.set('.sprint-card', { autoAlpha: 0, y: 20 });
      gsap.set('.nav-back', { autoAlpha: 0, x: -10 });

      if (view === 'MENU') {
        gsap.to('.menu-card', {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.1
        });
      } else {
        gsap.to('.nav-back', { autoAlpha: 1, x: 0, duration: 0.4, delay: 0.1 });
        gsap.to('.sprint-card', {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [view]);

  return (
    <div ref={containerRef} className="w-full h-screen relative bg-transparent">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-emerald-900/40 font-mono text-xs z-0">
              SYSTEM_ID: INTELI_ASIS_V1<br/>
              DIR: {view === 'MENU' ? '/ROOT' : '/ROOT/PRESENTATIONS'}<br/>
              ENCRYPTION: ENABLED
          </div>
          <div className="absolute bottom-10 right-10 text-emerald-900/40 font-mono text-xs text-right z-0">
              HUB_STATUS: ONLINE<br/>
              NODE_COUNT: 6<br/>
              LATENCY: 12ms
          </div>
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-800/30"></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-800/30"></div>
      </div>

      {/* Scrollable Container */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          <div className="min-h-full flex flex-col items-center justify-center p-8 md:p-16 pb-32">
            
            {/* Header (Constant) */}
            <div className="hub-header w-full max-w-6xl mb-16 relative z-10 invisible">
                {/* Branding Bar */}
                <div className="group-label flex justify-between items-end border-b border-emerald-500/30 pb-4 mb-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-emerald-500 font-mono tracking-[0.2em] mb-1">INSTITUTO DE TECNOLOGIA E LIDERANÇA</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-sm"></span>
                            <span className="text-white font-bold tracking-widest text-sm">INTELI</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <span className="text-[10px] text-slate-500 font-mono tracking-[0.2em] block">SOFTWARE ENGINEERING</span>
                            <span className="text-[10px] text-emerald-500 font-mono tracking-[0.2em] block">MÓDULO 09 • QUALITY AS CODE</span>
                        </div>
                        <div className="h-8 w-[1px] bg-emerald-500/30 mx-2"></div>
                        <div className="relative group cursor-default">
                             <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                             <div className="relative border border-emerald-500/50 bg-slate-900/80 px-4 py-2 rounded-lg flex items-center gap-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                <Hexagon size={20} className="text-emerald-400 fill-emerald-500/10" strokeWidth={1.5} />
                                <div>
                                    <span className="block text-[10px] text-slate-400 font-mono leading-none mb-1">SQUAD</span>
                                    <span className="block text-lg font-display font-bold text-white leading-none tracking-widest">G02</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="relative text-center py-4">
                    <div className="pre-title inline-block bg-slate-950 px-4 relative z-10 mb-2">
                        <span className="text-emerald-500 font-mono text-xs tracking-[0.5em] uppercase">[ ASIS TAX TECH PARNERSHIP ]</span>
                    </div>
                    <div className="relative">
                        <h1 className="title-main text-6xl md:text-8xl font-display font-black text-white tracking-tighter relative z-10 mix-blend-overlay select-none">
                            PROJECT NEXUS
                        </h1>
                        <h1 className="title-outline absolute top-0 left-0 w-full text-center text-6xl md:text-8xl font-display font-black z-0 pointer-events-none">
                            <span className="text-stroke text-stroke-emerald blur-sm">PROJECT NEXUS</span>
                        </h1>
                    </div>
                    <div className="title-deco flex justify-between items-center mt-6 px-4 md:px-20 text-xs font-mono text-slate-500 overflow-hidden whitespace-nowrap">
                         <span className="flex items-center gap-2"><Cpu size={12}/> CORE_VERSION: 1.0.4</span>
                         <span className="w-full mx-4 h-[1px] bg-gradient-to-r from-transparent via-emerald-900 to-transparent"></span>
                         <span>STATUS: <span className="text-emerald-400">OPERATIONAL</span></span>
                    </div>
                </div>
            </div>

            {/* Navigation / Content Area */}
            <div className="w-full max-w-6xl relative z-10 min-h-[400px]">
                
                {/* VIEW: MAIN MENU */}
                {view === 'MENU' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* 1. Presentations Folder */}
                     <div 
                        onClick={() => setView('SPRINTS')}
                        className="menu-card group cursor-pointer relative p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-emerald-950/20 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2"
                     >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CornerUpLeft className="text-emerald-500 rotate-180" size={20} />
                        </div>
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 border border-slate-700 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all">
                            <FolderOpen size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Apresentações</h3>
                        <p className="text-sm text-slate-400 font-mono mb-4">/DIR/SPRINT_REVIEWS</p>
                        <div className="w-full h-[1px] bg-slate-800 mb-4 group-hover:bg-emerald-500/30"></div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                             <span>5 ARQUIVOS</span>
                             <span className="group-hover:text-emerald-400 transition-colors">ACESSAR</span>
                        </div>
                     </div>

                     {/* 2. Dashboard (Mocked) */}
                     <div className="menu-card group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/20 opacity-75 cursor-not-allowed">
                        <div className="absolute top-4 right-4 px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-500">EM BREVE</div>
                        <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 text-slate-600 border border-slate-700">
                            <LayoutDashboard size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-500 mb-2">Dashboard</h3>
                        <p className="text-sm text-slate-600 font-mono mb-4">/SYS/MONITORING</p>
                        <div className="w-full h-[1px] bg-slate-800 mb-4"></div>
                        <div className="flex justify-between items-center text-xs text-slate-600">
                             <span>METRICS & LOGS</span>
                             <span>LOCKED</span>
                        </div>
                     </div>

                     {/* 3. Repository */}
                     <a 
                        href="https://git.inteli.edu.br/graduacao/2026-1a/t13/g02"
                        target="_blank" 
                        rel="noreferrer"
                        className="menu-card group cursor-pointer relative p-8 rounded-3xl border border-slate-800 bg-slate-900/40 hover:bg-indigo-950/20 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2"
                     >
                         <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="text-indigo-500" size={20} />
                        </div>
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 border border-slate-700 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all">
                            <GitBranch size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">Repositório Git</h3>
                        <p className="text-sm text-slate-400 font-mono mb-4">/EXT/GITLAB_SOURCE</p>
                        <div className="w-full h-[1px] bg-slate-800 mb-4 group-hover:bg-indigo-500/30"></div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                             <span>BRANCH: MAIN</span>
                             <span className="group-hover:text-indigo-400 transition-colors">ABRIR</span>
                        </div>
                     </a>
                  </div>
                )}

                {/* VIEW: SPRINTS LIST */}
                {view === 'SPRINTS' && (
                   <div className="relative">
                      {/* Back Navigation */}
                      <button 
                         onClick={() => setView('MENU')}
                         className="nav-back flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-6 transition-colors group"
                      >
                         <CornerUpLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                         <span className="font-mono text-xs font-bold tracking-widest">ROOT /</span>
                         <span className="font-mono text-xs font-bold tracking-widest text-emerald-500">PRESENTATIONS</span>
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SPRINTS.map((sprint) => (
                            <div 
                                key={sprint.id}
                                onClick={() => sprint.status === 'COMPLETED' && onSelectSprint(sprint.id)}
                                className={`
                                    sprint-card group relative p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between
                                    ${sprint.status === 'COMPLETED' 
                                        ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-400 hover:bg-slate-800/80 cursor-pointer shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)]' 
                                        : 'bg-slate-950/40 border-slate-800 cursor-not-allowed'}
                                `}
                            >
                                {/* Hover Glow Effect for Active Card */}
                                {sprint.status === 'COMPLETED' && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                )}

                                <div className={`flex items-start justify-between relative z-10 ${sprint.status !== 'COMPLETED' ? 'opacity-50 grayscale' : ''} mb-6`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`
                                            w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl font-mono flex-shrink-0
                                            ${sprint.status === 'COMPLETED' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                                : 'bg-slate-900 text-slate-600 border border-slate-800'}
                                        `}>
                                            {sprint.id}
                                        </div>
                                        
                                        <div>
                                            <h3 className={`text-xl font-bold ${sprint.status === 'COMPLETED' ? 'text-white' : 'text-slate-500'}`}>
                                                {sprint.title}
                                            </h3>
                                            <p className={`text-xs ${sprint.status === 'COMPLETED' ? 'text-emerald-400/80' : 'text-slate-600'} font-mono uppercase tracking-wider mt-1`}>
                                                {sprint.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {sprint.status === 'COMPLETED' ? (
                                        <div className="p-2 bg-emerald-500 rounded-full text-black transform group-hover:rotate-[-45deg] transition-transform duration-300">
                                            <ArrowRight size={18} />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-slate-800 rounded-full text-slate-600">
                                            <Lock size={18} />
                                        </div>
                                    )}
                                </div>

                                <div className={`relative z-10 pt-4 border-t ${sprint.status === 'COMPLETED' ? 'border-emerald-500/20' : 'border-slate-800'} flex justify-between items-center`}>
                                   <div className="flex gap-2">
                                     <div className={`h-1.5 w-1.5 rounded-full ${sprint.status === 'COMPLETED' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></div>
                                     <span className="text-xs font-mono text-slate-500">{sprint.status === 'COMPLETED' ? 'AVAILABLE' : 'ENCRYPTED'}</span>
                                   </div>
                                   <span className="text-xs font-mono text-slate-500">{sprint.date}</span>
                                </div>
                            </div>
                        ))}
                      </div>
                   </div>
                )}

            </div>
          </div>
      </div>
    </div>
  );
};

export default SprintHub;