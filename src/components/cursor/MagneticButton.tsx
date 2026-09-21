import React, { useRef, useState } from 'react';
import { useCursor } from '../../context/CursorContext';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  cursorLabel?: string;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.28,
  cursorLabel = 'OPEN',
  className = '',
  onClick,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { setCursor, isTouchDevice } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && cursorLabel) {
      setCursor(cursorLabel, 'open');
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    if (!isTouchDevice) {
      setCursor(null);
    }
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.08s ease-out',
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
