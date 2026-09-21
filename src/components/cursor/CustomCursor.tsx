import React, { useEffect, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant, mousePos, isTouchDevice } = useCursor();
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isTouchDevice) return;

    // Smooth lerp loop for the trailing ring
    const render = () => {
      ringPos.current.x += (mousePos.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [mousePos, isTouchDevice]);

  if (isTouchDevice) return null;

  const isExpanded = !!cursorText;

  return (
    <div className="custom-cursor-element pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central Sharp Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#171717] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isExpanded ? 0 : 1,
        }}
      />

      {/* Trailing Outer Ring / Expanded Label Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isExpanded
            ? 'w-18 h-18 bg-[#171717] text-[#FFFDF8] shadow-2xl border border-[#FF5A36]/60 scale-100'
            : 'w-8 h-8 rounded-full border border-[#171717]/40 bg-transparent'
        }`}
      >
        {isExpanded && (
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-center px-1 animate-in fade-in zoom-in-75">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
