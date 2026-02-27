import React from 'react';

interface EvidenceSlideProps {
    src: string;
    label: string;
}

const EvidenceSlide: React.FC<EvidenceSlideProps> = ({ src, label }) => {
    return (
        <div className="w-[100vw] h-screen flex-shrink-0 flex flex-col items-center justify-center px-12 bg-transparent relative z-10">
            <div className="relative max-w-7xl w-full h-[82vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-slate-950 opacity-90" />
                <div className="absolute -inset-2 bg-emerald-500/10 blur-3xl" />

                <div className="relative w-full h-full border border-emerald-500/40 bg-slate-950/70 shadow-[0_30px_120px_rgba(16,185,129,0.25)] overflow-hidden">
                    <div className="absolute inset-6 border border-emerald-500/25 pointer-events-none" />

                    <img
                        src={src}
                        alt={label}
                        className="w-full h-full object-contain p-6"
                    />

                    <div className="absolute top-6 left-6 px-3 py-1 bg-slate-900/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] uppercase tracking-[0.3em]">
                        {label}
                    </div>

                    <div className="absolute bottom-6 right-6 flex items-center gap-3 text-[11px] text-slate-300 font-mono">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Volumetria & Disponibilidade</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvidenceSlide;
