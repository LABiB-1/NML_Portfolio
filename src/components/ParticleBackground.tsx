import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let animFrame: number;
    const particles: any[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, color: 'rgba(76,120,148,0.18)', vx: 0.0002, vy: 0.0001 },
      { x: 0.7, y: 0.3, r: 0.3, color: 'rgba(90,146,44,0.12)', vx: -0.0001, vy: 0.00015 },
      { x: 0.5, y: 0.6, r: 0.4, color: 'rgba(221,123,187,0.1)', vx: 0.00015, vy: -0.0002 },
    ];

    // Optimize counts for performance. 40 is perfectly visually dense for this effect.
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        vy: -(Math.random() * 0.3 + 0.05),
        vx: (Math.random() - 0.5) * 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const drawBackground = () => {
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0.1 || b.x > 0.9) b.vx *= -1;
        if (b.y < 0.1 || b.y > 0.9) b.vy *= -1;
        const grd = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r * Math.max(W, H));
        grd.addColorStop(0, b.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });
    };

    // Read document theme outside loop and throttle to avoid DOM hits 60 times a sec
    let isDarkCache = document.documentElement.classList.contains('dark');
    setInterval(() => {
      isDarkCache = document.documentElement.classList.contains('dark');
    }, 1000);

    const drawParticles = () => {
      particles.forEach(p => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) {
          p.y = H + 5;
          p.x = Math.random() * W;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.fillStyle = isDarkCache
          ? `rgba(255,255,255,${alpha})`
          : `rgba(0,0,0,${alpha * 0.3})`;
        ctx.fill();
      });
    };

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      // Pause drawing if user scrolled completely past the Hero section to save GPU/Battery
      if (window.scrollY > window.innerHeight * 1.2) return;
      drawBackground();
      drawParticles();
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
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;
