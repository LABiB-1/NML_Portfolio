import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track mouse position smoothly
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
    };
    
    // Initialize target to center of screen
    mouse.current.targetX = window.innerWidth / 2;
    mouse.current.targetY = window.innerHeight / 2;
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let animFrame: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Read document theme outside loop and throttle to avoid DOM hits 60 times a sec
    let isDarkCache = document.documentElement.classList.contains('dark');
    setInterval(() => {
      isDarkCache = document.documentElement.classList.contains('dark');
    }, 1000);

    let time = 0;

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      
      // Pause drawing if user scrolled completely past the Hero section to save GPU/Battery
      if (window.scrollY > window.innerHeight * 1.2) return;

      time += 0.01;

      // Smooth mouse follow
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      ctx.clearRect(0, 0, W, H);
      
      const cx = mouse.current.x;
      const cy = mouse.current.y;
      
      // Dynamic radius based on screen size, with subtle pulsing
      const baseRadius = Math.max(W, H) * 0.35;
      const pulse = Math.sin(time) * 50;
      const radius = baseRadius + pulse;

      // Create a soft, glowing radial gradient blob
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      
      if (isDarkCache) {
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)'); // Indigo
        gradient.addColorStop(0.4, 'rgba(147, 51, 234, 0.05)'); // Purple
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.12)'); // Indigo lighter
        gradient.addColorStop(0.4, 'rgba(236, 72, 153, 0.04)'); // Pink lighter
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
    />
  );
};

export default ParticleBackground;
