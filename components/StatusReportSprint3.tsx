import React, { useEffect, useState } from 'react';
import {
    Target,
    Bug,
    CheckCircle2,
    AlertCircle,
    GitMerge,
    FileCheck,
    Link2,
    Activity,
    Cpu,
    Shield,
    Layers,
    Radar,
} from 'lucide-react';
import { SPRINT_3_METRICS } from '../constants';

const StatusReportSprint3: React.FC = () => {
    const [activeCell, setActiveCell] = useState(0);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveCell((prev) => (prev + 1) % 16);
        }, 350);

        return () => window.clearInterval(intervalId);
    }, []);

    const iconCells = [
        <Cpu size={14} />, <Shield size={14} />, <Activity size={14} />, <Layers size={14} />,
        <Radar size={14} />, <Cpu size={14} />, <Shield size={14} />, <Activity size={14} />,
        <Layers size={14} />, <Radar size={14} />, <Cpu size={14} />, <Shield size={14} />,
        <Activity size={14} />, <Layers size={14} />, <Radar size={14} />, <Cpu size={14} />,
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center px-12 flex-shrink-0 bg-transparent relative z-10 pt-10">
            <style>{`
                @keyframes status-progress-loop {
                    0% { width: 0%; opacity: 0.6; }
                    20% { width: 22%; opacity: 1; }
                    100% { width: 100%; opacity: 0; }
                }
            `}</style>

            <div className="max-w-6xl mx-auto w-full">
                <div className="mb-12 border-l-4 border-emerald-500 pl-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Status Report <span className="text-emerald-500">|</span> Sprint 03
                    </h2>
                    <p className="text-xl text-slate-400 font-light">
                        Integrações versionadas, handoff CI -&gt; CD e orquestração de releases como ativo de software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/30 rounded-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        {/* Radar overlay seletivo para representar orquestração viva */}
                        <div className="absolute -right-16 -top-20 w-[260px] h-[260px] pointer-events-none opacity-45">
                            <div className="absolute inset-0 rounded-full border border-emerald-400/20" />
                            <div className="absolute inset-[32px] rounded-full border border-emerald-300/15" />
                            <div className="absolute inset-[64px] rounded-full border border-emerald-200/10" />
                            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg_255deg,rgba(16,185,129,0.28)_360deg)] animate-[spin_5s_linear_infinite]" />
                            <div className="absolute top-6 left-8 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                <span className="text-[9px] text-emerald-300/90 font-mono tracking-widest uppercase">Live Mesh</span>
                            </div>
                        </div>

                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-1">Objetivo da Sprint</h3>
                                <p className="text-2xl font-bold text-white">{SPRINT_3_METRICS.goal}</p>
                            </div>
                            <div className="bg-emerald-500/20 p-3 rounded-none text-emerald-400">
                                <Target size={32} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-300">Progresso Atual</span>
                                <span className="text-emerald-400 font-bold">{SPRINT_3_METRICS.progress}%</span>
                            </div>
                            <div className="w-full h-3 bg-slate-800 rounded-none overflow-hidden">
                                <div className="w-[90%] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative">
                                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 font-mono">
                                5 integrações mapeadas; 4 fluxos operacionais validados em código e 1 integração em blueprint arquitetural.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-6">
                            <Bug className="text-cyan-400" />
                            <h3 className="text-lg font-bold text-white">Quality Gate</h3>
                            <div className="ml-auto flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Live</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs text-slate-400 flex items-center gap-2">
                                        <GitMerge size={12} /> Pipeline CI/CD
                                    </span>
                                    <span className="text-xs text-emerald-400 font-mono">{SPRINT_3_METRICS.qualityGate.ci}</span>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                                        style={{ animation: 'status-progress-loop 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs text-slate-400 flex items-center gap-2">
                                        <FileCheck size={12} /> Contratos
                                    </span>
                                    <span className="text-xs text-cyan-400 font-mono">{SPRINT_3_METRICS.qualityGate.contracts}</span>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                                        style={{ animation: 'status-progress-loop 3s ease-in-out infinite', animationDelay: '0.35s' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs text-slate-400 flex items-center gap-2">
                                        <Link2 size={12} /> Handoff
                                    </span>
                                    <span className="text-xs text-indigo-400 font-mono">{SPRINT_3_METRICS.qualityGate.handoff}</span>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                                        style={{ animation: 'status-progress-loop 3.6s linear infinite', animationDelay: '0.7s' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-none relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-[180px] h-[180px] opacity-30 pointer-events-none">
                            <div className="grid grid-cols-4 grid-rows-4 w-full h-full divide-x divide-y divide-white/10 border border-white/10">
                                {iconCells.map((icon, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-center transition-all duration-500 ${activeCell === index
                                            ? 'bg-emerald-400/20 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.6)]'
                                            : 'bg-transparent text-slate-500/60'
                                            }`}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="text-indigo-400" />
                            <h3 className="text-lg font-bold text-white">Integrações</h3>
                        </div>
                        <div className="text-center py-4">
                            <span className="text-5xl font-black text-white">
                                {SPRINT_3_METRICS.driversDelivered}
                                <span className="text-slate-600 text-3xl">/{SPRINT_3_METRICS.totalDrivers}</span>
                            </span>
                            <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Validadas no fluxo</p>
                        </div>
                        <div className="flex gap-2 justify-center mt-4 flex-wrap">
                            {['INT-01', 'INT-02', 'INT-03', 'INT-04', 'INT-05'].map((it) => (
                                <span
                                    key={it}
                                    className={`px-2 py-1 text-[10px] rounded-none font-mono border ${it === 'INT-05'
                                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                        }`}
                                >
                                    {it}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 p-8 bg-slate-900/40 border border-slate-800 rounded-none flex items-center gap-6">
                        <div className="p-4 bg-yellow-500/10 rounded-none text-yellow-500 border border-yellow-500/20 flex-shrink-0">
                            <AlertCircle size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Ponto de Atenção: Observabilidade Externa</h3>
                            <p className="text-slate-400 text-sm">
                                Integração de monitoramento externo e autoscaling produtivo está classificada como Em Construção / Blueprint
                                Arquitetural. A ponte desta review direciona para os artefatos já implementados e deixa explícito o plano de
                                hardening para a Sprint 4.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusReportSprint3;
