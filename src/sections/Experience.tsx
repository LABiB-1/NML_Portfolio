import React from 'react';
import { Briefcase } from 'lucide-react';
import triscendImg from '../assets/TRISCEND.jpeg';
import bpoSummitImg from '../assets/BPO-Summit-2025-logo.png';
import ieeecsImg from '../assets/ieeecs.jpg';

const experiences = [
  {
    date: 'June 2025 – April 2026',
    title: 'Volunteer',
    company: 'IEEE Computer Society Student Branch Chapter GUB',
    img: ieeecsImg,
    borderColor: '#818cf8',
    bg: 'white',
    color: '#333'
  },
  {
    date: 'December 2025 – January 2026',
    title: 'Campus Ambassador',
    company: 'IEEE CUET WIE Affinity Group Student Branch',
    img: triscendImg,
    borderColor: '#818cf8',
    bg: 'white',
    color: '#333'
  },
  {
    date: 'June 2025 – June 2025',
    title: 'Campus Ambassador',
    company: 'BPO Summit 2025 • On-site',
    img: bpoSummitImg,
    borderColor: '#818cf8',
    bg: 'white',
    color: '#333'
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="w-full max-w-4xl mx-auto py-20 px-4 pt-24 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] dark:text-white/45 text-[#555] mb-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center border border-[#5a922c]/20 bg-[#5a922c]/10 text-[#5a922c]">
            <Briefcase size={16} />
          </div>
          Experience
        </div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight dark:text-white text-[#111]">
          My professional <span className="grad-text grad-green">journey</span>
        </h2>
        <p className="dark:text-white/45 text-[#555] text-base mt-2 max-w-2xl mx-auto">
          A timeline of my career, from where I started to where I am today.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, idx) => {
          const hoverColors = ['hover:bg-[rgb(239,156,117)]', 'hover:bg-[rgb(247,214,123)]', 'hover:bg-[rgb(123,203,237)]', 'hover:bg-[rgb(197,178,246)]'];
          const hoverColorLight = hoverColors[idx % hoverColors.length];
          return (
          <div 
            key={idx} 
            className={`group flex items-center gap-6 dark:bg-white/[0.04] bg-[rgb(255,246,244)] border dark:border-white/8 border-black/10 rounded-xl px-6 py-5 backdrop-blur-md transition-all duration-300 dark:hover:bg-white/[0.07] ${hoverColorLight} dark:hover:border-[#818cf8]/50 hover:border-[#818cf8]/50 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] hover:scale-[1.02] cursor-pointer`}
          >
            <div 
              className="w-14 h-14 rounded-full border-[4px] overflow-hidden flex items-center justify-center shrink-0 font-display font-extrabold text-[0.8rem] shadow-[0_4px_20px_rgba(99,102,241,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
              style={{ borderColor: exp.borderColor, backgroundColor: (exp as any).img ? 'transparent' : exp.bg, color: exp.color }}
            >
              {(exp as any).img ? (
                <img src={(exp as any).img} alt={exp.title} className="w-full h-full object-contain p-1 bg-white" />
              ) : (
                (exp as any).icon
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-[0.75rem] dark:text-white/40 text-[#888] mb-1">{exp.date}</div>
              <div className="font-display font-bold text-base dark:text-white text-[#111]">{exp.title}</div>
              <div className="text-[0.875rem] dark:text-white/45 text-[#555]">{exp.company}</div>
            </div>
            
            <span className="text-[0.7rem] dark:text-white/30 text-[#aaa] shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden md:block">
              Click to expand
            </span>
          </div>
        );})}
      </div>
    </section>
  );
};

export default Experience;
