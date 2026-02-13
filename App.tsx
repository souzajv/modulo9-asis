import React from 'react';
import HorizontalContainer from './components/HorizontalContainer';
import FaultyTerminal from './components/FaultyTerminal';
import GeminiAssistant from './components/GeminiAssistant';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30">
      <div className="fixed inset-0 z-0">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={0.3}
          noiseAmp={0.5}
          chromaticAberration={0.2}
          dither={0.2}
          curvature={0.1}
          tint="#059669" // Emerald 600
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>

      <div className="relative z-10 hidden md:block">
        <HorizontalContainer />
      </div>
      
      {/* Mobile Warning - Since Horizontal Scroll is UX-heavy on mobile, we show a simplified view or warning, 
          but for this MVP we render the content vertically for mobile or just let the container handle it (though horizontal is tricky on mobile)
          Tailwind 'md:block' hides the complex scroll on mobile. Below is simple mobile fallback.
      */}
      <div className="relative z-10 md:hidden w-full h-screen flex items-center justify-center p-8 text-center bg-slate-950/80 backdrop-blur">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Experiência Otimizada para Desktop</h1>
          <p className="text-slate-400">Por favor, acesse em uma tela maior para visualizar a apresentação interativa da Sprint Review.</p>
        </div>
      </div>

      <div className="relative z-50">
        <GeminiAssistant />
      </div>
    </div>
  );
}

export default App;