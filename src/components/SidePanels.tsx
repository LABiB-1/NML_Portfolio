import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import GravityDots from './GravityDots';

/**
 * SidePanels — renders interactive left & right side panels
 * that fill the empty margins on wide desktop screens (≥1280px).
 * 
 * Both sides feature the Gravity Dots Collectible Game to maintain
 * a cohesive, unified webpage look.
 * 
 * Hidden on smaller viewports where margins don't exist.
 */
const SidePanels: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const check = () => setIsWideScreen(window.innerWidth >= 1280);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isWideScreen) return null;

  return (
    <>
      {/* ── Unified Score Badge ── */}
      <motion.div 
        key={score}
        initial={{ scale: 1.3, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`fixed bottom-8 right-8 z-[250] px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md shadow-lg transition-colors duration-300 select-none pointer-events-none flex items-center gap-2 ${
          isDark 
            ? 'bg-white/10 text-white/90 border border-white/20' 
            : 'bg-black/5 text-black/80 border border-black/10'
        }`}
      >
        <span className="text-indigo-500 text-lg leading-none">✦</span> {score}
      </motion.div>

      {/* ── Left Panel: Gravity Dots ── */}
      <div
        className="fixed top-0 left-0 z-20 pointer-events-auto"
        style={{
          width: 'calc((100vw - 920px) / 2)',
          height: '100vh',
          maxWidth: '280px',
          minWidth: '140px',
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <GravityDots isDark={isDark} onScoreIncrement={() => setScore(s => s + 1)} />
        </div>
      </div>

      {/* ── Right Panel: Gravity Dots ── */}
      <div
        className="fixed top-0 right-0 z-20 pointer-events-auto"
        style={{
          width: 'calc((100vw - 920px) / 2)',
          height: '100vh',
          maxWidth: '280px',
          minWidth: '140px',
        }}
      >
        <div className="w-full h-full relative overflow-hidden">
          <GravityDots isDark={isDark} onScoreIncrement={() => setScore(s => s + 1)} />
        </div>
      </div>
    </>
  );
};

export default SidePanels;
