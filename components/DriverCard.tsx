import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BusinessDriver, DriverStatus } from '../types';
import { getIcon } from '../constants';
import { CheckCircle2, Loader2, Code2, Activity, Terminal, BarChart3, FileJson, X, FlaskConical } from 'lucide-react';

interface Props {
  driver: BusinessDriver;
}

const DriverCard: React.FC<Props> = ({ driver }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showEvidence, setShowEvidence] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const isImplemented = driver.status === DriverStatus.IMPLEMENTED;
  const mainColor = isImplemented ? 'emerald' : 'cyan';
  const textColor = isImplemented ? 'text-emerald-400' : 'text-cyan-400';
  const glowColor = isImplemented ? 'shadow-emerald-500/20' : 'shadow-cyan-500/20';

  useEffect(() => {
    // 3D Tilt Effect
    const card = cardRef.current;
    if (!card) return;

    // If evidence is open, remove tilt to allow interaction
    if (showEvidence) {
      gsap.to(card, { rotationX: 0, rotationY: 0, ease: "power2.out", duration: 0.5 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -2; // Reduced rotation for wider card
      const rotateY = ((x - centerX) / centerX) * 2;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: "power1.out",
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        ease: "power1.out",
        duration: 0.5
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showEvidence]);

  const renderEvidenceContent = (evidence: any) => {
    if (evidence.type === 'code') {
      return (
        <pre className="font-mono text-xs text-slate-300 bg-slate-950/50 p-4 rounded-lg overflow-x-auto border border-slate-800 h-full">
          <code>{evidence.content}</code>
        </pre>
      );
    }
    if (evidence.type === 'log') {
      return (
        <div className="font-mono text-xs text-green-400 bg-black p-4 rounded-lg h-full border border-slate-800 overflow-y-auto">
          {evidence.content?.split('\n').map((line: string, i: number) => (
            <div key={i} className="mb-1">
              <span className="text-slate-600 mr-2">$</span>
              {line.includes('CRITICAL') ? <span className="text-red-500 font-bold">{line}</span> : 
               line.includes('WARN') ? <span className="text-yellow-500">{line}</span> : 
               line}
            </div>
          ))}
        </div>
      );
    }
    if (evidence.type === 'json') {
      return (
        <div className="font-mono text-xs bg-slate-900 p-4 rounded-lg h-full overflow-y-auto border border-slate-800">
          <pre className={evidence.data._response?.status >= 400 ? 'text-red-300' : 'text-emerald-300'}>
            {JSON.stringify(evidence.data, null, 2)}
          </pre>
        </div>
      );
    }
    if (evidence.type === 'graph') {
        const { labels, datasets } = evidence.data;
        return (
            <div className="w-full h-full bg-slate-900/50 rounded-lg p-4 border border-slate-800 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Performance vs Carga</h4>
                    <div className="flex gap-4">
                        {datasets.map((d: any, i: number) => (
                            <div key={i} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                <span className="text-[10px] text-slate-400">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 relative border-l border-b border-slate-700">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                         {[0, 25, 50, 75, 100].map(y => (
                             <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="2" />
                         ))}

                         {datasets.map((d: any, i: number) => {
                             const max = d.name.includes('Latency') ? 8000 : d.name.includes('RPS') ? 5 : 20;
                             const points = d.values.map((v: number, idx: number) => {
                                 const x = (idx / (d.values.length - 1)) * 100;
                                 const y = 100 - (v / max) * 100;
                                 return `${x},${y}`;
                             }).join(' ');

                             return (
                                 <polyline 
                                    key={i} 
                                    points={points} 
                                    fill="none" 
                                    stroke={d.color} 
                                    strokeWidth="2" 
                                    vectorEffect="non-scaling-stroke"
                                 />
                             );
                         })}
                    </svg>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                    {labels.map((l: string, i: number) => <span key={i}>{l}</span>)}
                </div>
            </div>
        );
    }
    return null;
  };

  return (
    <div 
      ref={cardRef}
      className={`
        relative w-[90vw] lg:w-[1100px]
        ${showEvidence ? 'h-[80vh]' : 'h-auto min-h-[600px]'}
        bg-slate-900/80 backdrop-blur-xl border border-white/5
        rounded-[2rem] p-8 md:p-12 flex flex-col justify-center
        shadow-2xl ${glowColor}
        group transition-all duration-500
        overflow-hidden
      `}
    >
      {/* Animated Gradient Background */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${mainColor}-500 to-transparent opacity-50`} />
      
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* Main Content */}
      <div className={`transition-all duration-500 h-full ${showEvidence ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-start">
             
             {/* LEFT COLUMN: Header & Context */}
             <div className="lg:col-span-5 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className={`
                      p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                      ${textColor} shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]
                    `}>
                      {getIcon(driver.icon, "w-10 h-10")}
                    </div>
                    
                    <div className={`
                      px-4 py-2 rounded-full text-xs font-bold tracking-widest border flex items-center gap-2
                      ${isImplemented 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}
                    `}>
                      {isImplemented ? <CheckCircle2 size={14} /> : <Loader2 size={14} className="animate-spin" />}
                      {isImplemented ? 'VALIDADO' : 'EM EXECUÇÃO'}
                    </div>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
                    {driver.id}
                  </h2>
                  <h3 className="text-2xl text-slate-400 font-light mb-6">
                    {driver.title}
                  </h3>
                  
                  <p className="text-lg text-slate-300 leading-relaxed font-light mb-8">
                    {driver.shortDescription}
                  </p>
                </div>

                <div className="hidden lg:block">
                   <div className="flex items-center gap-2 mb-3">
                     <Code2 size={16} className={textColor} />
                     <span className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase">Stack Técnica</span>
                   </div>
                   <div className={`
                     font-mono text-xs ${textColor} bg-black/40 p-4 rounded-xl border border-white/5
                     relative overflow-hidden
                   `}>
                     <div className={`absolute left-0 top-0 w-1 h-full bg-${mainColor}-500`} />
                     <span className="relative z-10">{driver.technicalDetails}</span>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Test Scenario & Details */}
             <div className="lg:col-span-7 flex flex-col justify-center h-full space-y-8 bg-slate-950/30 p-8 rounded-3xl border border-white/5">
                
                {/* TEST CASE HIGHLIGHT */}
                <div className="relative group/test">
                   <div className={`absolute -left-1 top-0 h-full w-1 bg-${mainColor}-500 rounded-full`}></div>
                   <div className="pl-6">
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <FlaskConical size={16} className={`text-${mainColor}-400`} />
                        <span className="text-xs font-mono uppercase tracking-widest">Cenário de Teste / Aceite</span>
                      </div>
                      <p className="font-mono text-sm md:text-base text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                         <span className="text-slate-500 select-none mr-2">$</span>
                         {driver.testScenario}
                      </p>
                   </div>
                </div>

                {/* Bullet Points */}
                <div className="space-y-4">
                    {driver.fullDescription.map((desc, i) => (
                      <div key={i} className="flex items-start gap-4 text-slate-400 text-sm md:text-base group/item hover:text-slate-200 transition-colors">
                        <div className={`mt-2 min-w-[6px] h-[6px] rounded-full bg-${mainColor}-500/50 group-hover/item:bg-${mainColor}-400 transition-colors`} />
                        <p>{desc}</p>
                      </div>
                    ))}
                </div>

                {/* Mobile Tech Details (Hidden on Desktop) */}
                <div className="lg:hidden pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 size={14} className={textColor} />
                    <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase">Implementação</span>
                  </div>
                  <div className={`
                    font-mono text-[10px] ${textColor} bg-black/40 p-3 rounded-xl border border-white/5
                  `}>
                    {driver.technicalDetails}
                  </div>
                </div>

             </div>
          </div>
      </div>

      {/* EVIDENCE BUTTON */}
      {driver.evidence && !showEvidence && (
          <button 
            onClick={() => setShowEvidence(true)}
            className={`
                absolute bottom-8 right-8 z-30
                flex items-center gap-2 px-6 py-4
                bg-slate-800 hover:bg-slate-700 text-white 
                rounded-xl font-bold text-sm shadow-xl border border-white/10
                transition-all hover:scale-105 hover:shadow-${mainColor}-500/20
            `}
          >
            <Activity size={18} className="text-emerald-400" />
            Visualizar Evidência Técnica
          </button>
      )}

      {/* EVIDENCE OVERLAY */}
      <div className={`
        absolute inset-0 bg-slate-900/98 backdrop-blur-xl z-40 flex flex-col
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${showEvidence ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
      `}>
          {/* Evidence Header */}
          <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
             <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <h3 className="text-lg font-bold text-white mr-4 flex items-center gap-2">
                   <Activity size={20} className={`text-${mainColor}-400`} />
                   Evidências: {driver.id}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {driver.evidence?.map((item, index) => (
                      <button
                          key={index}
                          onClick={() => setActiveTab(index)}
                          className={`
                              flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all
                              ${activeTab === index 
                                  ? `bg-${mainColor}-500/20 text-${mainColor}-400 border border-${mainColor}-500/50` 
                                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800 border border-transparent'}
                          `}
                      >
                          {item.type === 'code' && <Code2 size={14} />}
                          {item.type === 'log' && <Terminal size={14} />}
                          {item.type === 'graph' && <BarChart3 size={14} />}
                          {item.type === 'json' && <FileJson size={14} />}
                          {item.title}
                      </button>
                  ))}
                </div>
             </div>
             <button 
                onClick={() => setShowEvidence(false)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
             >
                <X size={24} />
             </button>
          </div>

          {/* Evidence Content */}
          <div className="flex-1 p-6 md:p-8 overflow-hidden bg-black/20">
             {driver.evidence && renderEvidenceContent(driver.evidence[activeTab])}
          </div>
      </div>
    </div>
  );
};

export default DriverCard;