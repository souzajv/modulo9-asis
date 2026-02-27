import React from 'react';
import { Target, Bug, CheckCircle2, AlertCircle, GitMerge, FileCheck, ShieldCheck } from 'lucide-react';
import { SPRINT_2_METRICS } from '../constants';

const StatusReportSprint2: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 flex-shrink-0 bg-transparent relative z-10">
       <div className="max-w-6xl mx-auto w-full">
         
         <div className="mb-12 border-l-4 border-emerald-500 pl-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Status Report <span className="text-emerald-500">|</span> Sprint 02
            </h2>
            <p className="text-xl text-slate-400 font-light">
              Implementação e validação automatizada de Requisitos Funcionais e Não Funcionais.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Sprint Goal & Progress */}
            <div className="md:col-span-2 p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/30 rounded-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-1">Objetivo da Sprint</h3>
                        <p className="text-2xl font-bold text-white">{SPRINT_2_METRICS.goal}</p>
                    </div>
                    <div className="bg-emerald-500/20 p-3 rounded-none text-emerald-400">
                        <Target size={32} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Progresso Final</span>
                        <span className="text-emerald-400 font-bold">{SPRINT_2_METRICS.progress}%</span>
                    </div>
                    {/* Progress Bar: 100% width */}
                    <div className="w-full h-3 bg-slate-800 rounded-none overflow-hidden">
                        <div className="w-full h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative">
                             <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                        Todos os artefatos de código (RF/RNF) entregues e validados.
                    </p>
                </div>
            </div>

            {/* Card 2: Quality Gate */}
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                    <Bug className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Quality Gate</h3>
                </div>
                
                <div className="space-y-6">
                    {/* Métrica 1: Infraestrutura de CI/CD */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-400 flex items-center gap-2">
                                <GitMerge size={12} /> Pipeline CI/CD
                            </span>
                            <span className="text-xs text-emerald-400 font-mono">{SPRINT_2_METRICS.qualityGate.ci}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-none">
                            <div className="w-full h-full bg-emerald-500 rounded-none"></div>
                        </div>
                    </div>
                    
                    {/* Métrica 2: Cobertura */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-400 flex items-center gap-2">
                                <ShieldCheck size={12} /> Test Coverage
                            </span>
                            <span className="text-xs text-cyan-400 font-mono">{SPRINT_2_METRICS.qualityGate.coverage}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-none">
                            <div className="w-[85%] h-full bg-cyan-500 rounded-none"></div>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 mt-2 italic">
                        *Testes unitários, de integração e carga automatizados.
                    </p>
                </div>
            </div>

            {/* Card 3: Delivered Drivers */}
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Direcionadores</h3>
                </div>
                <div className="text-center py-4">
                    <span className="text-5xl font-black text-white">{SPRINT_2_METRICS.driversDelivered}<span className="text-slate-600 text-3xl">/{SPRINT_2_METRICS.totalDrivers}</span></span>
                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Implementados</p>
                </div>
                <div className="flex gap-2 justify-center mt-4 flex-wrap">
                    {['DN1', 'DN2', 'DN3', 'DN4', 'DN5'].map(dn => (
                        <span key={dn} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-none font-mono border border-emerald-500/30">
                            {dn}
                        </span>
                    ))}
                </div>
            </div>

            {/* Card 4: Risks/Attention */}
            <div className="md:col-span-2 p-8 bg-slate-900/40 border border-slate-800 rounded-none flex items-center gap-6">
                 <div className="p-4 bg-blue-500/10 rounded-none text-blue-500 border border-blue-500/20 flex-shrink-0">
                     <AlertCircle size={32} />
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-1">Próximo Desafio: Integração Legada</h3>
                     <p className="text-slate-400 text-sm">
                         A Sprint 03 focará na integração profunda com os sistemas legados da ASIS e hardening de segurança (OAuth2/mTLS).
                     </p>
                 </div>
            </div>

         </div>
       </div>
    </div>
  );
};

export default StatusReportSprint2;
