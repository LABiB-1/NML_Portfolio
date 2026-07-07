import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnable?: boolean;
  scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltAmount = 10,
  glareEnable = true,
  scale = 1.02,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -tiltAmount;
      const rotateY = ((x - centerX) / centerX) * tiltAmount;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glareEnable) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: 1,
        });
      }
    },
    [tiltAmount, glareEnable, scale]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform('');
    setGlareStyle({ opacity: 0 });
  }, []);

  // Disable on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  if (isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering ? transform : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovering
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {glareEnable && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-50"
          style={{
            ...glareStyle,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
