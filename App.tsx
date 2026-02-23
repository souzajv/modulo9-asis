import React, { useState, useLayoutEffect } from 'react';
import HorizontalContainer from './components/HorizontalContainer';
import FaultyTerminal from './components/FaultyTerminal';
import GeminiAssistant from './components/GeminiAssistant';
import SprintHub from './components/SprintHub';
import CustomCursor from './components/CustomCursor';

type ViewState = 'HUB' | 'SPRINT_1';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HUB');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Manage Body Scroll & Scroll Position using useLayoutEffect
  // useLayoutEffect runs synchronously after DOM mutations but before paint
  // This prevents the "white screen" or layout breaking when switching from a tall scrollable view to a fixed view
  useLayoutEffect(() => {
    // 1. Immediately reset scroll to top to prevent rendering the new view at an invalid scroll position
    window.scrollTo(0, 0);

    // 2. Apply overflow settings
    if (currentView === 'HUB') {
      // Lock scroll on Hub
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed'; // Hard lock to prevent momentum scrolling issues
      document.body.style.width = '100%';
    } else {
      // Unlock vertical scroll for Sprint Presentation (needed for ScrollTrigger)
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    }

    // Cleanup style on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflowX = 'hidden';
    };
  }, [currentView]);

  const handleEnterSprint = (sprintId: string) => {
    if (sprintId === '01') {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentView('SPRINT_1');
        setIsTransitioning(false);
      }, 800); // Delay for exit animation
    }
  };

  const handleBackToHub = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('HUB');
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 overflow-x-hidden">
      <CustomCursor />
      
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.15} // Slowed down from 0.5 to 0.15
          pause={false}
          scanlineIntensity={1.0} // Increased for visibility
          glitchAmount={isTransitioning ? 3.0 : 1.0} 
          flickerAmount={0.3}
          noiseAmp={0.5}
          chromaticAberration={isTransitioning ? 5.0 : 0.2}
          dither={0.2}
          curvature={0.1}
          tint="#10b981" // Brighter Emerald 500
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.8} // Increased brightness
        />
      </div>

      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black pointer-events-none transition-opacity duration-700 flex items-center justify-center
        ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="font-mono text-emerald-500 animate-pulse text-xl">
            SYSTEM_HANDSHAKE::ESTABLISHING_CONNECTION...
        </div>
      </div>

      <div className="relative z-10">
        {currentView === 'HUB' && (
          <SprintHub onSelectSprint={handleEnterSprint} />
        )}

        {currentView === 'SPRINT_1' && (
          <HorizontalContainer onBack={handleBackToHub} />
        )}
      </div>
      
      {/* Mobile Warning - Visible only on Mobile */}
      <div className="relative z-10 md:hidden w-full h-screen flex items-center justify-center p-8 text-center bg-slate-950/80 backdrop-blur hidden">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Experiência Otimizada para Desktop</h1>
          <p className="text-slate-400">Por favor, acesse em uma tela maior para visualizar a apresentação interativa.</p>
        </div>
      </div>

      <div className="relative z-50">
        <GeminiAssistant />
      </div>
    </div>
  );
}

export default App;