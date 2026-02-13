import React from 'react';
import { 
  Binary, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  ShieldCheck, 
  Wifi, 
  Cloud, 
  Code2, 
  Terminal,
  FileJson,
  Fingerprint
} from 'lucide-react';

const FloatingParallax: React.FC = () => {
  // Elements positioned absolutely across the massive horizontal width
  // We distribute them along the 400-500vw width
  const items = [
    { Icon: Binary, left: '5%', top: '15%', size: 48, speed: 0.2, color: 'text-slate-800' },
    { Icon: Database, left: '12%', top: '75%', size: 96, speed: 0.5, color: 'text-emerald-900/20' },
    { Icon: Cloud, left: '25%', top: '10%', size: 64, speed: 0.3, color: 'text-slate-800' },
    { Icon: ShieldCheck, left: '35%', top: '60%', size: 120, speed: 0.6, color: 'text-slate-800/50' },
    { Icon: Server, left: '45%', top: '20%', size: 50, speed: 0.2, color: 'text-emerald-900/10' },
    { Icon: Wifi, left: '55%', top: '80%', size: 40, speed: 0.4, color: 'text-slate-700' },
    { Icon: Code2, left: '65%', top: '15%', size: 80, speed: 0.1, color: 'text-slate-800' },
    { Icon: Fingerprint, left: '72%', top: '50%', size: 150, speed: 0.7, color: 'text-emerald-900/10' },
    { Icon: Terminal, left: '85%', top: '70%', size: 60, speed: 0.3, color: 'text-slate-800' },
    { Icon: FileJson, left: '92%', top: '25%', size: 48, speed: 0.2, color: 'text-emerald-900/20' },
    { Icon: Globe, left: '98%', top: '80%', size: 100, speed: 0.5, color: 'text-slate-800' },
  ];

  return (
    <div className="absolute top-0 left-0 w-[500vw] h-full pointer-events-none overflow-hidden z-0">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.color} parallax-item`}
          style={{ 
            left: item.left, 
            top: item.top,
            width: item.size,
            height: item.size,
          }}
          data-speed={item.speed}
        >
          <item.Icon size={item.size} strokeWidth={1} />
        </div>
      ))}
      
      {/* Abstract Grid Lines moving differently */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-900/30 to-transparent parallax-line" data-speed="0.1" />
      <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent parallax-line" data-speed="0.05" />
      <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent parallax-line" data-speed="0.05" />
    </div>
  );
};

export default FloatingParallax;