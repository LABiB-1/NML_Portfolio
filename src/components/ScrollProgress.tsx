import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? currentScroll / totalScroll : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    scaleX.set(scrollProgress);
  }, [scrollProgress, scaleX]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[3px]">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #4c7894, #5a922c, #d79f1e, #dd7bbb)',
        }}
      />
      <motion.div
        className="h-[6px] origin-left -mt-[3px]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, rgba(76,120,148,0.4), rgba(90,146,44,0.4), rgba(215,159,30,0.4), rgba(221,123,187,0.4))',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
