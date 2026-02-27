import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import HeroSection from './HeroSection';
import StatusReport from './StatusReport';
import StatusReportSprint2 from './StatusReportSprint2';
import DriverCard from './DriverCard';
import NextSteps from './NextSteps';
import TeamSection from './TeamSection';
import GroupPhotoSection from './GroupPhotoSection';
import FloatingParallax from './FloatingParallax';
import { BUSINESS_DRIVERS, SPRINT_2_DRIVERS, NEXT_SPRINT_DELIVERABLES, SPRINT_3_DELIVERABLES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalContainerProps {
  onBack?: () => void;
  sprintId?: string;
}

const HorizontalContainer: React.FC<HorizontalContainerProps> = ({ onBack, sprintId = '01' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const drivers = sprintId === '01' ? BUSINESS_DRIVERS : SPRINT_2_DRIVERS;
  const nextStepsDeliverables = sprintId === '01' ? NEXT_SPRINT_DELIVERABLES : SPRINT_3_DELIVERABLES;

  useLayoutEffect(() => {
    // Force scroll to top before setting up triggers
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Filter out absolute positioned elements to get only the actual slides
      const slides = Array.from(track.children).filter(child => {
        const style = window.getComputedStyle(child as Element);
        return style.position !== 'absolute';
      });

      const totalSlides = slides.length;
      const windowWidth = window.innerWidth;
      const totalWidth = windowWidth * totalSlides;
      
      // Main Horizontal Scroll
      // We calculate exact movement: (totalSlides - 1) * windowWidth
      const maxTranslate = (totalSlides - 1) * windowWidth;

      gsap.to(track, {
        x: -maxTranslate,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5, // Reduced scrub for snappier feel
          snap: {
            snapTo: 1 / (totalSlides - 1), 
            duration: { min: 0.2, max: 0.5 },
            delay: 0.0, // Instant snap calculation start
            ease: "power2.out",
            inertia: false // Strict snapping
          },
          end: () => "+=" + totalWidth, // Scroll duration proportional to width
          invalidateOnRefresh: true // Handle resizes better
        }
      });

      // Parallax Effect for Background Elements
      const parallaxItems = track.querySelectorAll('.parallax-item, .parallax-line');
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-speed') || '0.1');
        
        gsap.to(item, {
          x: -maxTranslate * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: 0.5
          }
        });
      });

      // Animate the "Data Stream" line drawing
      const streamLine = document.querySelector('#data-stream-path');
      if (streamLine) {
        const length = (streamLine as SVGPathElement).getTotalLength();
        gsap.set(streamLine, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(streamLine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: 0.5
          }
        });
      }
    }, containerRef);

    return () => {
      // 1. Revert animations and pins inside this context
      ctx.revert();
      
      // 2. Kill all global ScrollTriggers to ensure no ghost triggers remain
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // 3. Clear any inline styles that ScrollTrigger might have left on the body/html
      // (Pinning sometimes adds padding/overflow/height to body)
      ScrollTrigger.clearMatchMedia();
      
      // 4. Force a refresh to recalculate layout without the pinned elements
      ScrollTrigger.refresh();
      
      // 5. Hard reset scroll
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden relative bg-transparent">
      
      {/* Back Button (Fixed UI Layer) */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors group"
          >
              <div className="p-2 border border-white/20 rounded-full group-hover:border-emerald-400 transition-colors">
                  <ArrowLeft size={16} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest hidden md:block">Voltar ao Hub</span>
          </button>
      </div>

      <div ref={trackRef} className="flex h-full w-fit relative">
        
        {/* BACKGROUND LAYER - Parallax Icons */}
        <FloatingParallax />

        {/* CONNECTIVE DATA STREAM LAYER */}
        <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 pointer-events-none z-0 opacity-40">
           <svg width="100%" height="100%" className="overflow-visible">
             <defs>
               <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                 <stop offset="20%" stopColor="#10b981" stopOpacity="0.5" />
                 <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                 <stop offset="80%" stopColor="#10b981" stopOpacity="0.5" />
                 <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="5" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>
             <path 
               id="data-stream-path"
               d="M0,100 Q400,50 800,100 T1600,100 T2400,100 T3200,100 T4000,100 T4800,100"
               fill="none" 
               stroke="url(#stream-gradient)" 
               strokeWidth="2"
               filter="url(#glow)"
             />
           </svg>
        </div>
        
        {/* CONTENT LAYER */}

        {/* 1. Hero */}
        <div className="w-[100vw] h-screen flex-shrink-0">
            <HeroSection />
        </div>

        {/* 2. Status Report (NEW) */}
        <div className="w-[100vw] h-screen flex-shrink-0">
            {sprintId === '01' ? <StatusReport /> : <StatusReportSprint2 />}
        </div>

        {/* 3. Business Drivers */}
        {drivers.map((driver) => (
          <div key={driver.id} className="w-[100vw] h-screen flex items-center justify-center flex-shrink-0 relative z-10 px-4">
             <DriverCard driver={driver} />
          </div>
        ))}

        {/* 4. Next Steps */}
        <div className="w-[100vw] h-screen flex-shrink-0">
            <NextSteps deliverables={nextStepsDeliverables} sprintId={sprintId} />
        </div>

        {/* 5. Team */}
        <div className="w-[100vw] h-screen flex-shrink-0">
            <TeamSection />
        </div>

        {/* 6. Group Photo (NEW) */}
        <div className="w-[100vw] h-screen flex-shrink-0">
            <GroupPhotoSection />
        </div>

      </div>
      
      {/* High-End Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 origin-left scale-x-0 shadow-[0_0_20px_rgba(16,185,129,0.8)]" id="progress-bar"></div>
      </div>
    </div>
  );
};

export default HorizontalContainer;