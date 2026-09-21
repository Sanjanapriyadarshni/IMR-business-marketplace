import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState('DISCOVER');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Section stage tracking
      if (progress < 18) {
        setActiveStage('01 // DISCOVER');
      } else if (progress < 42) {
        setActiveStage('02 // EXPLORE');
      } else if (progress < 65) {
        setActiveStage('03 // CONNECT');
      } else if (progress < 85) {
        setActiveStage('04 // CREATE');
      } else {
        setActiveStage('05 // MARKETPLACE');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Hairline Progress Bar */}
      <div className="h-[2px] w-full bg-[#D8D2C7]/30">
        <div
          className="h-full bg-gradient-to-r from-[#171717] via-[#FF5A36] to-[#171717] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating editorial coordinate marker on top right */}
      <div className="hidden lg:flex items-center gap-2 absolute top-3 right-6 text-[10px] font-mono tracking-widest text-[#6B6B63] select-none bg-[#FFFDF8]/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D8D2C7]/60 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36] animate-pulse" />
        <span>{activeStage}</span>
        <span className="opacity-40">|</span>
        <span>{Math.round(scrollProgress)}%</span>
      </div>
    </div>
  );
};
