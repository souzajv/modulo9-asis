import React from 'react';
import { NEXT_SPRINT_DELIVERABLES } from '../constants';
import { FileCode2, ShieldAlert, GitPullRequest } from 'lucide-react';

interface NextStepsProps {
  deliverables?: { title: string; desc: string }[];
  sprintId?: string;
}

const NextSteps: React.FC<NextStepsProps> = ({ deliverables = NEXT_SPRINT_DELIVERABLES, sprintId = '01' }) => {
  const nextSprintNum = sprintId === '01' ? '02' : '03';
  
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 flex-shrink-0 border-r border-slate-800/50 bg-slate-950/20">
       <div className="max-w-6xl mx-auto w-full">
         <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Próximos Passos <span className="text-slate-600">|</span> Sprint {nextSprintNum}
            </h2>
            <p className="text-xl text-slate-400 font-light max-w-2xl">
              Entrega focada em: <strong className="text-emerald-400">{sprintId === '01' ? 'Requisitos Funcionais e Não Funcionais como Código' : 'Integração e Observabilidade'}</strong>.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliverables.map((item, index) => (
              <div key={index} className="group p-8 bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 rounded-none transition-all duration-300 hover:-translate-y-2">
                 <div className="w-12 h-12 bg-slate-950 rounded-none flex items-center justify-center mb-6 text-emerald-500 border border-slate-800 group-hover:text-emerald-400 group-hover:border-emerald-500/30">
                    {index === 0 && <GitPullRequest />}
                    {index === 1 && <ShieldAlert />}
                    {index === 2 && <FileCode2 />}
                 </div>
                 <h3 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h3>
                 <p className="text-slate-400 leading-relaxed text-sm">
                   {item.desc}
                 </p>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
};

export default NextSteps;