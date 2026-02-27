import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      // Direct update for the dot (instant)
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      
      // Smooth update for the follower ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    // Add listeners for hoverable elements
    const hoverElements = document.querySelectorAll('button, a, .cursor-pointer, .sprint-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', onHoverStart);
      el.addEventListener('mouseleave', onHoverEnd);
    });

    // Observer to attach listeners to dynamic elements (like cards rendered later)
    const observer = new MutationObserver((mutations) => {
      const newHoverElements = document.querySelectorAll('button, a, .cursor-pointer, .sprint-card');
      newHoverElements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
        el.addEventListener('mouseenter', onHoverStart);
        el.addEventListener('mouseleave', onHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart);
        el.removeEventListener('mouseleave', onHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Central Dot - Precision */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-2 h-2 bg-emerald-400 rounded-none rotate-45" />
      </div>
      
      {/* Follower Ring - Interaction */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className={`
          border border-emerald-500/50 rounded-none transition-all duration-300 ease-out rotate-45
          ${isHovering ? 'w-12 h-12 bg-emerald-500/10 border-emerald-400' : 'w-6 h-6'}
        `} />
      </div>
    </>
  );
};

export default CustomCursor;