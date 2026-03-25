import React, { useState, useEffect } from 'react';
import { ArrowUp, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const bstTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setTime(`${bstTime} BST`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center w-full pointer-events-none">
      <div 
        className={`flex justify-between items-center w-full px-4 md:px-8 py-5 md:py-7 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'max-w-full' : 'max-w-4xl mx-auto'
        }`}
      >
        <a href="#home" title="Najib Mahmud Labib" className="flex items-center gap-[14px] no-underline group hover:opacity-80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <img 
            src="/nmlLogo.jpeg" 
            alt="NML Logo" 
            className="h-[50px] md:h-[90px] w-auto object-cover rounded-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
          />
          <span className={`hidden sm:block font-display font-bold dark:text-white text-[#111] tracking-tight text-[1.15rem] overflow-hidden whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'max-w-0 opacity-0 -ml-[14px]' : 'max-w-[300px] opacity-100'}`}>
            Najib Mahmud Labib
          </span>
        </a>
        
        <div className="flex items-center gap-2">
          <div className="group flex items-center gap-2 md:gap-3 border dark:border-white/10 border-white/40 dark:bg-white/[0.03] bg-white/30 px-3 md:px-4 py-2.5 rounded-full text-[0.7rem] md:text-[0.85rem] dark:text-white/90 text-[#111] backdrop-blur-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] dark:hover:bg-white/[0.06] hover:bg-white/50 dark:hover:border-white/20 hover:border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <div className="relative flex items-center justify-center shrink-0 w-2 h-2 ml-1">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
              <span className="absolute inset-0 rounded-full bg-emerald-500"></span>
            </div>
            
            <div className="relative flex items-center gap-2 font-semibold tracking-wide">
              <div className="relative h-5 overflow-hidden pointer-events-none select-none">
                <div className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:-translate-y-5">
                  <span className="h-5 flex items-center dark:text-white/95 text-[#111] font-bold whitespace-nowrap">
                    <span className="md:hidden">Dhaka</span>
                    <span className="hidden md:inline">Dhaka, Bangladesh</span>
                  </span>
                  <span className="h-5 flex items-center dark:text-white/95 text-[#111] whitespace-nowrap">
                    {time}
                  </span>
                </div>
              </div>
              <ArrowUp size={14} className="opacity-40 dark:text-white text-[#111] shrink-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-45 group-hover:rotate-0" />
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-[42px] h-[42px] rounded-full border dark:border-white/10 border-white/40 dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl dark:text-white/80 text-[#555] transition-all duration-300 dark:hover:bg-white/[0.06] hover:bg-white/50 dark:hover:border-white/20 hover:border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-110"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' 
              ? <Sun size={16} className="transition-transform duration-300" /> 
              : <Moon size={16} className="transition-transform duration-300" />
            }
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
