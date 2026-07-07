import React, { useRef, useEffect } from 'react';

interface GravityDotsProps {
  isDark: boolean;
  onScoreIncrement: () => void;
}

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  collected: boolean;
  respawnTimer: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
}

const COLORS = ['#818cf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];

const GravityDots: React.FC<GravityDotsProps> = ({ isDark, onScoreIncrement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use refs for mutable state so we don't trigger re-renders
  const dotsRef = useRef<Dot[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const textsRef = useRef<FloatingText[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const lastScrollY = useRef(window.scrollY);
  const scrollOffset = useRef(0);

  // Initialize dots
  const initDots = (width: number, height: number) => {
    const newDots: Dot[] = [];
    for (let i = 0; i < 12; i++) {
      newDots.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 3 + 3, // 3 to 6
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
        collected: false,
        respawnTimer: 0,
      });
    }
    dotsRef.current = newDots;
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      // Handle retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      if (dotsRef.current.length === 0) {
        initDots(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY.current;
      lastScrollY.current = currentScroll;
      
      // Premium jelly scroll: accumulate elastic offset instead of raw velocity
      scrollOffset.current += delta * 0.4;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Spring dampening for the jelly scroll effect
      scrollOffset.current *= 0.92;

      // 1. Draw Mouse Glow
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, 40
        );
        gradient.addColorStop(0, isDark ? 'rgba(129,140,248,0.15)' : 'rgba(99,102,241,0.1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and Draw Dots
      dotsRef.current.forEach(dot => {
        if (dot.collected) {
          // Handle respawn logic
          if (dot.opacity > 0) {
            dot.opacity = Math.max(0, dot.opacity - 0.1);
          } else {
            dot.respawnTimer--;
            if (dot.respawnTimer <= 0) {
              // Respawn
              dot.collected = false;
              dot.opacity = 0; // will fade in
              dot.x = Math.random() * (width - 40) + 20;
              dot.y = Math.random() * (height - 40) + 20;
              dot.vx = (Math.random() - 0.5) * 0.6;
              dot.vy = (Math.random() - 0.5) * 0.6;
            }
          }
        } else {
          // Fade in if just respawned
          if (dot.opacity < 1) dot.opacity = Math.min(1, dot.opacity + 0.05);

          // Physics update
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Wall bounce
          if (dot.x < dot.radius) {
            dot.x = dot.radius;
            dot.vx *= -1;
          } else if (dot.x > width - dot.radius) {
            dot.x = width - dot.radius;
            dot.vx *= -1;
          }
          
          if (dot.y < dot.radius) {
            dot.y = dot.radius;
            dot.vy *= -1;
          } else if (dot.y > height - dot.radius) {
            dot.y = height - dot.radius;
            dot.vy *= -1;
          }

          // Subtle drift
          if (Math.random() < 0.01) {
            dot.vx += (Math.random() - 0.5) * 0.1;
            dot.vy += (Math.random() - 0.5) * 0.1;
            // Cap baseline speed
            const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
            if (speed > 1) {
              dot.vx = (dot.vx / speed) * 1;
              dot.vy = (dot.vy / speed) * 1;
            }
          }

          // Check collision with mouse
          if (mouseRef.current.active) {
            // Adjust hit detection for the visual scroll offset
            const dy = mouseRef.current.y - (dot.y - scrollOffset.current);
            const dx = mouseRef.current.x - dot.x;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 25 + dot.radius) {
              // Collect!
              dot.collected = true;
              dot.respawnTimer = 180; // ~3 seconds
              onScoreIncrement();

              // Create sparkles
              for (let i = 0; i < 10; i++) {
                sparklesRef.current.push({
                  x: dot.x,
                  y: dot.y - scrollOffset.current,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  life: 1.0,
                  color: dot.color,
                });
              }
              
              // Create floating "+1" text
              textsRef.current.push({
                x: dot.x,
                y: dot.y - scrollOffset.current,
                text: '+1',
                life: 1.0,
                color: dot.color
              });
            }
          }
        }

        // Draw Dot
        if (dot.opacity > 0) {
          const visualY = dot.y - scrollOffset.current;
          // Apply motion stretch based on scroll offset
          const stretchY = dot.radius + Math.abs(scrollOffset.current) * 0.05;
          
          ctx.beginPath();
          ctx.ellipse(dot.x, visualY, dot.radius, stretchY, 0, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = dot.opacity;
          ctx.fill();
          
          // Glow
          ctx.beginPath();
          ctx.ellipse(dot.x, visualY, dot.radius * 2, stretchY * 2, 0, 0, Math.PI * 2);
          const dotGlow = ctx.createRadialGradient(dot.x, visualY, dot.radius, dot.x, visualY, dot.radius * 2);
          const hex = dot.color.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          dotGlow.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
          dotGlow.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = dotGlow;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 3. Update and Draw Sparkles
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const s = sparklesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.03;

        if (s.life <= 0) {
          sparklesRef.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.life;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }
      
      // 4. Update and Draw Floating Texts
      for (let i = textsRef.current.length - 1; i >= 0; i--) {
        const t = textsRef.current[i];
        t.y -= 1; // float up slowly
        t.life -= 0.02;

        if (t.life <= 0) {
          textsRef.current.splice(i, 1);
        } else {
          ctx.font = 'bold 14px "DM Sans", sans-serif';
          ctx.fillStyle = t.color;
          ctx.globalAlpha = t.life;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(t.text, t.x, t.y);
          ctx.globalAlpha = 1.0;
        }
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDark, onScoreIncrement]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }} 
      />
    </div>
  );
};

export default GravityDots;
