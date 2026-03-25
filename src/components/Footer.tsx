import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Twitter = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"/></svg>
);

const Linkedin = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
);

const Github = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
);

const Footer: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <footer className="pt-16 pb-28 px-6 dark:bg-transparent bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <nav 
          className="flex flex-wrap justify-center relative w-fit mx-auto mb-8 p-1.5 rounded-full"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {['Home', 'About', 'Projects', 'Blog', 'Experience', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onMouseEnter={() => setHoveredItem(item)}
              className="relative px-5 py-2 z-10 dark:text-white/70 text-[#444] font-bold dark:hover:text-white hover:text-[#000] text-[0.9rem] transition-colors"
            >
              {hoveredItem === item && (
                <motion.div
                  layoutId="footer-hover"
                  className="absolute inset-0 dark:bg-white/10 bg-white/50 rounded-full border border-white/40 dark:border-white/10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </a>
          ))}
        </nav>
        
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://x.com/NajibMahmud_" title="Najib Mahmud Labib" target="_blank" rel="noopener noreferrer" className="dark:text-white/70 text-[#444] dark:hover:text-white hover:text-[#000] transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            <Twitter size={24} className="fill-current" />
          </a>
          <a href="http://www.linkedin.com/in/najib-mahmud-labib/" title="Najib Mahmud Labib" target="_blank" rel="noopener noreferrer" className="dark:text-white/70 text-[#444] dark:hover:text-white hover:text-[#000] transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            <Linkedin size={24} className="fill-current" />
          </a>
          <a href="https://github.com/LABiB-1" title="Najib Mahmud Labib" target="_blank" rel="noopener noreferrer" className="dark:text-white/70 text-[#444] dark:hover:text-white hover:text-[#000] transition-all duration-300 hover:scale-110 dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">
            <Github size={24} className="fill-current" />
          </a>
        </div>
        
        <p className="text-[0.85rem] dark:text-white/90 text-[#444] font-bold tracking-wide">
          © {new Date().getFullYear()} Najib Mahmud Labib. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
