import React, { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * strength, y: y * strength });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  // Disable on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={buttonRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0
          ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
