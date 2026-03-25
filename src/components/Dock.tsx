import React, { useEffect, useState } from 'react';
import { Home, User, FolderGit2, BookOpen, Briefcase, Mail } from 'lucide-react';

export const Dock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: <Home size={18} /> },
    { id: 'about', icon: <User size={18} /> },
    { id: 'projects', icon: <FolderGit2 size={18} /> },
    { id: 'blog', icon: <BookOpen size={18} /> },
    { id: 'experience', icon: <Briefcase size={18} /> },
    { id: 'contact', icon: <Mail size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = item.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl dark:border-white/10 border-white/40 border rounded-2xl px-2.5 py-2.5 flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-[95vw] overflow-x-auto mx-auto md:px-3 md:py-2.5">
      <a href="#home" title="Najib Mahmud Labib" className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all dark:bg-white/5 bg-white/40 backdrop-blur-md dark:border-white/10 border-white/50 border hover:shadow-lg dark:hover:border-white/20 hover:border-white/60 text-decoration-none hover:scale-105 shrink-0">
        <img src="/nmlLogo.jpeg" alt="Home Logo" className="w-6 h-6 md:w-7 md:h-7 rounded object-cover shadow-sm" />
      </a>
      
      <span className="w-px h-8 dark:bg-white/10 bg-black/10 mx-1 shrink-0"></span>

      {navItems.map((item) => (
        <a 
          key={item.id} 
          href={`#${item.id}`} 
          className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            activeSection === item.id 
              ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 backdrop-blur-md shadow-lg shadow-indigo-500/10' 
              : 'dark:bg-white/5 bg-white/40 backdrop-blur-md dark:border-white/10 border-white/50 border dark:text-white/50 text-[#555] dark:hover:text-white/90 hover:text-[#000] dark:hover:bg-white/10 hover:bg-white/60 hover:shadow-lg dark:hover:border-white/20 hover:border-white/60'
          }`}
          title={item.id.charAt(0).toUpperCase() + item.id.slice(1)}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
};

export default Dock;
