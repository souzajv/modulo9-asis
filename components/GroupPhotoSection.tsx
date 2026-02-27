import React from 'react';
import { Users } from 'lucide-react';

const GroupPhotoSection: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-12 flex-shrink-0 bg-transparent relative z-10">
      <div className="max-w-7xl w-full h-[85%] flex flex-col">

        <div className="flex-1 relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl group bg-slate-900/50">
          {/* Referencing the image from public folder */}
          <img
            src="/grupo.jpeg"
            alt="Grupo 2 - Inteli x ASIS"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />

          {/* Gradiente para garantir leitura do texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

          <div className="absolute bottom-10 left-10 max-w-2xl">
            <h3 className="text-4xl font-bold text-white mb-2">Grupo 02</h3>
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm uppercase tracking-widest">
              <Users size={16} />
              <span>Inteli • Engenharia de Software • Módulo 9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPhotoSection;