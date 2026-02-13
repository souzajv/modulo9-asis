import React from 'react';
import { BusinessDriver } from '../types';
import DriverCard from './DriverCard';

interface Props {
  drivers: BusinessDriver[];
}

const UnderConstructionGrid: React.FC<Props> = ({ drivers }) => {
  return (
    <div className="w-[100vw] h-screen flex flex-col justify-center px-12 flex-shrink-0 border-r border-slate-800/50">
       <div className="max-w-6xl mx-auto w-full">
         <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-200 mb-2">Roadmap Futuro</h2>
            <p className="text-slate-500">Direcionadores mapeados para as próximas sprints do módulo.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drivers.map(driver => (
              <div key={driver.id} className="transform scale-90 origin-top-left hover:scale-95 transition-transform duration-300">
                <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <h1 className="text-6xl font-black text-white">{driver.id}</h1>
                   </div>
                   <h3 className="text-xl font-bold text-slate-300 mb-2">{driver.title}</h3>
                   <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">{driver.shortDescription}</p>
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-yellow-600/50 rounded-full" />
                   </div>
                   <p className="text-xs text-yellow-600 mt-2 font-mono">Em Planejamento</p>
                </div>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
};

export default UnderConstructionGrid;
