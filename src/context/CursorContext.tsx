import React, { createContext, useContext, useState, useEffect } from 'react';

interface CursorContextType {
  cursorText: string | null;
  cursorVariant: 'default' | 'view' | 'explore' | 'connect' | 'open' | 'drag';
  setCursor: (text: string | null, variant?: 'default' | 'view' | 'explore' | 'connect' | 'open' | 'drag') => void;
  mousePos: { x: number; y: number; normX: number; normY: number };
  isTouchDevice: boolean;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'view' | 'explore' | 'connect' | 'open' | 'drag'>('default');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100, normX: 0, normY: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: e.clientX, y: e.clientY, normX, normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setCursor = (
    text: string | null,
    variant: 'default' | 'view' | 'explore' | 'connect' | 'open' | 'drag' = 'default'
  ) => {
    setCursorText(text);
    setCursorVariant(variant);
  };

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorVariant,
        setCursor,
        mousePos,
        isTouchDevice,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
