import React, { useEffect, useRef, useState } from 'react';

const FloatingGeometry: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      setMouseOffset({ x, y });
    };
    
    const handleScroll = () => {
      if (isVisible) setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative preserve-3d"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px) rotateY(${scrollY * 0.15}deg) rotateX(${scrollY * 0.1}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="preserve-3d" style={{ animation: 'spin3d 40s linear infinite' }}>
          
          {/* Core Sphere - Soft Glow (No lines) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-indigo-500/20 backdrop-blur-3xl shadow-[0_0_60px_rgba(99,102,241,0.3)] animate-[glow-pulse_5s_ease-in-out_infinite]" />

          {/* Floating Blobs / Spheres */}
          {[
            { size: 64, rx: 45, ry: 45, tx: 220, duration: '15s', bg: 'bg-blue-500/30 dark:bg-blue-600/30', shadow: 'rgba(96,165,250,0.5)', blur: 'backdrop-blur-xl' },
            { size: 96, rx: -30, ry: 70, tx: 260, duration: '20s', bg: 'bg-pink-500/30 dark:bg-pink-600/30', shadow: 'rgba(244,114,182,0.5)', blur: 'backdrop-blur-2xl' },
            { size: 48, rx: 80, ry: -20, tx: 300, duration: '25s', bg: 'bg-purple-500/30 dark:bg-purple-600/30', shadow: 'rgba(192,132,252,0.5)', blur: 'backdrop-blur-lg' },
            { size: 120, rx: -60, ry: -40, tx: 340, duration: '30s', bg: 'bg-indigo-500/20 dark:bg-indigo-600/20', shadow: 'rgba(99,102,241,0.4)', blur: 'backdrop-blur-3xl' },
          ].map((blob, i) => (
            <div
              key={`blob-${i}`}
              className="absolute top-1/2 left-1/2 preserve-3d"
              style={{ animation: `spin3d ${blob.duration} linear infinite` }}
            >
              <div
                className={`rounded-full ${blob.bg} ${blob.blur}`}
                style={{
                  width: blob.size,
                  height: blob.size,
                  transform: `rotateX(${blob.rx}deg) rotateY(${blob.ry}deg) translateX(${blob.tx}px)`,
                  boxShadow: `0 0 30px ${blob.shadow}`,
                  filter: 'blur(2px)' // Soften edges slightly for organic feel
                }}
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default FloatingGeometry;
