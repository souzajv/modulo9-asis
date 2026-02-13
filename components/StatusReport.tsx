import React from 'react';
import { Target, Bug, CheckCircle2, AlertCircle, GitMerge, FileCheck } from 'lucide-react';

const StatusReport: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 flex-shrink-0 bg-transparent relative z-10">
       <div className="max-w-6xl mx-auto w-full">
         
         <div className="mb-12 border-l-4 border-emerald-500 pl-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Status Report <span className="text-emerald-500">|</span> Sprint 01
            </h2>
            <p className="text-xl text-slate-400 font-light">
              Fundação arquitetural e validação de conceitos críticos.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Sprint Goal & Progress */}
            <div className="md:col-span-2 p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/30 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-1">Objetivo da Sprint</h3>
                        <p className="text-2xl font-bold text-white">Definição dos Direcionadores & POCs</p>
                    </div>
                    <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
                        <Target size={32} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Progresso Ponderado</span>
                        <span className="text-emerald-400 font-bold">70%</span>
                    </div>
                    {/* Progress Bar: 70% width */}
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[70%] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative">
                             <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                        Cálculo: 50% (Definição dos 5 DNs) + 20% (Implementação DN1 + Validação DN4).
                    </p>
                </div>
            </div>

            {/* Card 2: Quality Gate (Realista para Sprint 1) */}
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col justify-between">
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
                            <span className="text-xs text-emerald-400 font-mono">ATIVO</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full">
                            <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                        </div>
                    </div>
                    
                    {/* Métrica 2: Análise Estática */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-slate-400 flex items-center gap-2">
                                <FileCheck size={12} /> Linting & Types
                            </span>
                            <span className="text-xs text-cyan-400 font-mono">RÍGIDO</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full">
                            <div className="w-full h-full bg-cyan-500 rounded-full"></div>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 mt-2 italic">
                        *Cobertura de testes unitários em fase de expansão.
                    </p>
                </div>
            </div>

            {/* Card 3: Delivered Drivers */}
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Direcionadores</h3>
                </div>
                <div className="text-center py-4">
                    <span className="text-5xl font-black text-white">2<span className="text-slate-600 text-3xl">/5</span></span>
                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Implementados / POC</p>
                </div>
                <div className="flex gap-2 justify-center mt-4">
                    {/* DN1: Implementado */}
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded font-mono border border-emerald-500/30" title="Implementado">
                        DN1
                    </span>
                    {/* DN4: POC Realizada (Conforme logs do Locust) */}
                    <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] rounded font-mono border border-cyan-500/20" title="POC Validada">
                        DN4
                    </span>
                </div>
            </div>

            {/* Card 4: Risks/Attention */}
            <div className="md:col-span-2 p-8 bg-slate-900/40 border border-slate-800 rounded-3xl flex items-center gap-6">
                 <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 border border-yellow-500/20 flex-shrink-0">
                     <AlertCircle size={32} />
                 </div>
                 <div>
                     <h3 className="text-lg font-bold text-white mb-1">Ponto de Atenção: DN2 (Não Repúdio)</h3>
                     <p className="text-slate-400 text-sm">
                         A integração da assinatura digital com o sistema legado (Mock) é complexa. A POC de criptografia assimétrica está priorizada para o início da Sprint 02.
                     </p>
                 </div>
            </div>

         </div>
       </div>
    </div>
  );
};

export default StatusReport;