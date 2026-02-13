import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { Users } from 'lucide-react';

const TeamSection: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-12 flex-shrink-0 bg-transparent relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 max-w-6xl w-full">
        <div className="flex items-center gap-3 mb-12 justify-center">
            <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                <Users size={32} />
            </div>
            <h2 className="text-4xl font-bold text-white uppercase">Squad de Desenvolvimento</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
                <div key={index} className="flex flex-col items-center p-6 bg-slate-900/40 border border-slate-800/50 rounded-xl backdrop-blur-md hover:bg-slate-800/60 transition-colors group">
                    <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-emerald-500/30 mb-4 overflow-hidden flex items-center justify-center relative group-hover:border-emerald-500/80 transition-colors">
                        {/* Placeholder Avatar using Initials */}
                        <span className="text-xl font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
                            {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <h3 className="font-bold text-slate-200 text-center">{member.name}</h3>
                    <p className="text-xs text-emerald-500 font-mono mt-1">{member.role}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;