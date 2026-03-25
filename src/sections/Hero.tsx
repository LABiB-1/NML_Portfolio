import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';
const resumePdf = 'https://drive.google.com/file/d/1THtKYxxMhz8wqMa2J8aGHhGjPrsHPJOl/view?usp=sharing';

const Twitter = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"/></svg>
);

const Linkedin = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"/></svg>
);

const Github = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
);

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center max-w-4xl w-full mx-auto pt-24 pb-8 px-4 relative z-10">
      <div className="blob"></div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="relative inline-block mb-6"
      >
        <div className="w-40 h-40 rounded-full border-[5px] border-white bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center font-display font-extrabold text-white text-5xl overflow-hidden shadow-2xl">
          <img src={profileImg} alt="Najib Mahmud Labib" className="w-full h-full object-cover" />
        </div>
        <span className="absolute bottom-1 right-1 text-4xl bg-white/10 rounded-full backdrop-blur-sm p-1">👋</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="inline-block dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 backdrop-blur-md px-5 py-2 rounded-full font-bold text-[0.85rem] dark:text-white/95 text-black mb-5 tracking-wide"
      >
        Designing a Life of Freedom, Focus, and Growth
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-display text-[clamp(1.15rem,2.8vw,1.7rem)] font-normal leading-[1.6] max-w-[820px] mb-10 px-4 dark:text-white text-black"
      >
        <strong>Hi, I’m Najib Mahmud Labib</strong>, a Computer Science student, <strong>AI enthusiast</strong>, and lifelong learner focused on building a productive life with <em className="italic dark:text-white/90 text-black/90">time, money, and location freedom.</em>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-20 mb-12"
      >
        <a href="#contact" className="text-decoration-none focus:outline-none outline-none">
          <button className="h-12 px-6 rounded-xl dark:bg-[#6366f1]/20 bg-[#6366f1]/10 backdrop-blur-xl border dark:border-[#6366f1]/30 border-[#6366f1]/20 text-[#6366f1] dark:text-[#818cf8] font-bold flex items-center gap-2 hover:bg-[#6366f1]/20 dark:hover:bg-[#6366f1]/30 transition-all shadow-[0_8px_30px_rgba(99,102,241,0.25)] dark:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:scale-[1.02]">
            Let's Talk
            <Calendar size={16} />
          </button>
        </a>
        <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-xl dark:bg-white/5 bg-white/30 backdrop-blur-xl border border-white/50 dark:border-white/10 dark:text-white text-black font-medium flex items-center gap-2 hover:bg-white/50 dark:hover:bg-white/10 hover:border-white/70 dark:hover:border-white/20 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02]">
          View Resume
          <FileText size={16} className="ml-0.5" />
        </a>
        <div className="flex gap-2 ml-1">
          <a href="http://www.linkedin.com/in/najib-mahmud-labib/" target="_blank" rel="noopener noreferrer" className="group relative w-11 h-11 rounded-[12px] dark:bg-white/5 bg-white/40 backdrop-blur-xl dark:border-white/10 border-white/50 border flex items-center justify-center dark:text-white/60 text-black transition-all hover:-translate-y-1 dark:hover:text-white/90 hover:text-[#000] dark:hover:bg-white/10 hover:bg-white/60 dark:hover:border-white/20 hover:border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <Linkedin size={18} />
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 dark:bg-white/10 bg-white/50 backdrop-blur-xl dark:border-white/20 border-white/60 border dark:text-white text-black font-sans font-semibold tracking-wide text-[0.7rem] px-3 py-1.5 rounded-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50">
              LinkedIn
            </span>
          </a>
          <a href="https://github.com/LABiB-1" target="_blank" rel="noopener noreferrer" className="group relative w-11 h-11 rounded-[12px] dark:bg-white/5 bg-white/40 backdrop-blur-xl dark:border-white/10 border-white/50 border flex items-center justify-center dark:text-white/60 text-black transition-all hover:-translate-y-1 dark:hover:text-white/90 hover:text-[#000] dark:hover:bg-white/10 hover:bg-white/60 dark:hover:border-white/20 hover:border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <Github size={18} />
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 dark:bg-white/10 bg-white/50 backdrop-blur-xl dark:border-white/20 border-white/60 border dark:text-white text-black font-sans font-semibold tracking-wide text-[0.7rem] px-3 py-1.5 rounded-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50">
              GitHub
            </span>
          </a>
          <a href="https://x.com/NajibMahmud_" target="_blank" rel="noopener noreferrer" className="group relative w-11 h-11 rounded-[12px] dark:bg-white/5 bg-white/40 backdrop-blur-xl dark:border-white/10 border-white/50 border flex items-center justify-center dark:text-white/60 text-black transition-all hover:-translate-y-1 dark:hover:text-white/90 hover:text-[#000] dark:hover:bg-white/10 hover:bg-white/60 dark:hover:border-white/20 hover:border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <Twitter size={18} />
            <span className="absolute -top-11 left-1/2 -translate-x-1/2 dark:bg-white/10 bg-white/50 backdrop-blur-xl dark:border-white/20 border-white/60 border dark:text-white text-black font-sans font-semibold tracking-wide text-[0.7rem] px-3 py-1.5 rounded-[8px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 whitespace-nowrap pointer-events-none shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50">
              Twitter
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
