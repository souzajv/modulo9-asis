import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Lock, ArrowRight, Database, ChevronRight, Terminal, Box } from 'lucide-react';

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

const SPRINTS: SprintData[] = [
  { id: '01', title: 'Sprint Review 01', subtitle: 'Architecture & Drivers', status: 'COMPLETED', date: 'FEB 12' },
  { id: '02', title: 'Sprint Review 02', subtitle: 'Functional Requirements', status: 'LOCKED', date: 'FEB 26' },
  { id: '03', title: 'Sprint Review 03', subtitle: 'Performance & Scale', status: 'LOCKED', date: 'MAR 12' },
  { id: '04', title: 'Sprint Review 04', subtitle: 'Security & Audit', status: 'LOCKED', date: 'MAR 26' },
  { id: '05', title: 'Sprint Review 05', subtitle: 'Final Release', status: 'LOCKED', date: 'APR 09' },
];

const SprintHub: React.FC<SprintHubProps> = ({ onSelectSprint }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible to start with via CSS, but hidden by GSAP immediately
      // Using fromTo prevents React Strict Mode double-invocation issues with .from()
      gsap.fromTo('.sprint-card', 
        { 
          y: 50, 
          autoAlpha: 0 
        },
        {
          y: 0,
          autoAlpha: 1, // Handles both opacity and visibility
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Animate header
      gsap.fromTo('.hub-header', 
        { y: -50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power4.out' }
      );
      
      // Animate sidebar
      gsap.fromTo('.sidebar-panel',
        { x: 50, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen flex flex-col items-center justify-center p-8 md:p-24 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 text-emerald-900/40 font-mono text-xs">
              SYSTEM_ID: INTELI_ASIS_V1<br/>
              ACCESS_LEVEL: VISITOR<br/>
              ENCRYPTION: ENABLED
          </div>
          <div className="absolute bottom-10 right-10 text-emerald-900/40 font-mono text-xs text-right">
              HUB_STATUS: ONLINE<br/>
              NODE_COUNT: 5<br/>
              LATENCY: 12ms
          </div>
          {/* Vertical Lines */}
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-800/30"></div>
          <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-800/30"></div>
      </div>

      {/* Header */}
      <div className="hub-header text-center mb-16 relative z-10 invisible">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono mb-4">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            ARCHIVE INDEX
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
            PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">NEXUS</span>
        </h1>
        <p className="text-slate-400 font-light max-w-xl mx-auto">
            Repositório central de entregas do módulo Quality as Code. Selecione um módulo de dados para iniciar a visualização.
        </p>
      </div>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl relative z-10">
         
         {/* Main List */}
         <div className="md:col-span-8 space-y-4">
             {SPRINTS.map((sprint) => (
                 <div 
                    key={sprint.id}
                    onClick={() => sprint.status === 'COMPLETED' && onSelectSprint(sprint.id)}
                    // Removed 'opacity-60' class to avoid conflict with GSAP opacity animation
                    className={`
                        sprint-card invisible group relative p-6 md:p-8 rounded-2xl border transition-all duration-300
                        ${sprint.status === 'COMPLETED' 
                            ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-400 hover:bg-slate-800/80 cursor-pointer shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)]' 
                            : 'bg-slate-950/40 border-slate-800 cursor-not-allowed'}
                    `}
                 >
                    {/* Hover Glow Effect for Active Card */}
                    {sprint.status === 'COMPLETED' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    )}

                    <div className={`flex items-center justify-between relative z-10 ${sprint.status !== 'COMPLETED' ? 'opacity-50 grayscale' : ''}`}>
                        <div className="flex items-center gap-6">
                            <div className={`
                                w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl font-mono
                                ${sprint.status === 'COMPLETED' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                    : 'bg-slate-900 text-slate-600 border border-slate-800'}
                            `}>
                                {sprint.id}
                            </div>
                            
                            <div>
                                <h3 className={`text-2xl font-bold ${sprint.status === 'COMPLETED' ? 'text-white' : 'text-slate-500'}`}>
                                    {sprint.title}
                                </h3>
                                <p className={`text-sm ${sprint.status === 'COMPLETED' ? 'text-emerald-400/80' : 'text-slate-600'} font-mono uppercase tracking-wider`}>
                                    {sprint.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="hidden md:block text-xs font-mono text-slate-500">{sprint.date}</span>
                            {sprint.status === 'COMPLETED' ? (
                                <div className="p-3 bg-emerald-500 rounded-full text-black transform group-hover:rotate-[-45deg] transition-transform duration-300">
                                    <ArrowRight size={20} />
                                </div>
                            ) : (
                                <div className="p-3 bg-slate-800 rounded-full text-slate-600">
                                    <Lock size={20} />
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
             ))}
         </div>

         {/* Sidebar Stats / Info */}
         <div className="hidden md:flex md:col-span-4 flex-col gap-4 sidebar-panel invisible">
             <div className="p-8 bg-slate-900/30 border border-slate-800 rounded-2xl h-full backdrop-blur-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
                 
                 <div className="mb-8">
                     <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Terminal size={16} /> System Logs
                     </h4>
                     <div className="font-mono text-xs text-emerald-900/80 space-y-2">
                         <p>> Initializing SprintHub v2.0...</p>
                         <p>> Loading assets... OK</p>
                         <p>> Fetching driver status... OK</p>
                         <p>> <span className="text-emerald-500">Access Granted to Sprint 01</span></p>
                     </div>
                 </div>

                 <div className="mt-auto">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Database size={16} /> Total Progress
                     </h4>
                     <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                         <div className="w-[20%] h-full bg-emerald-500"></div>
                     </div>
                     <div className="flex justify-between text-xs text-slate-500 font-mono">
                         <span>Sprint 1/5</span>
                         <span>20% Complete</span>
                     </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-slate-800/50">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Box size={16} /> Artefatos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">Docker</span>
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">Python</span>
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">Terraform</span>
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">React</span>
                    </div>
                 </div>
             </div>
         </div>

      </div>
    </div>
  );
};

export default SprintHub;