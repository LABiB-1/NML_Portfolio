import React, { useState, useRef } from 'react';
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import triscendImg from '../assets/TRISCEND.jpeg';
import bpoSummitImg from '../assets/BPO-Summit-2025-logo.png';
import ieeecsImg from '../assets/ieeecs.jpg';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    date: 'Jun 2026 – Present',
    title: 'Student Mentor',
    company: 'Department of CSE, Green University of Bangladesh',
    icon: <GraduationCap size={20} />,
    borderColor: '#4ade80',
    bg: 'transparent',
    color: '#4ade80',
    highlights: [
      'Provide academic guidance and support for fresher students.',
      'Assist with university orientation and adapting to campus life.',
      'Promote a collaborative learning environment and student engagement.'
    ]
  },
  {
    date: 'May 2026 – Present',
    title: 'Treasurer',
    company: 'IEEE Computer Society GUB Student Branch Chapter',
    img: ieeecsImg,
    borderColor: '#818cf8',
    bg: 'white',
    color: '#333',
    highlights: [
      'Manage financial operations, budgeting, and expense tracking.',
      'Coordinate with the executive committee for event planning.',
      'Oversee fund allocation to ensure transparent financial management.'
    ]
  },
  {
    date: 'Jun 2025 – May 2026',
    title: 'Volunteer',
    company: 'IEEE Computer Society GUB Student Branch Chapter',
    img: ieeecsImg,
    borderColor: '#818cf8',
    bg: 'white',
    color: '#333',
    highlights: [
      'Contributed through video shooting, editing, and photography.',
      'Assisted in publicity campaigns and online promotion.',
      'Supported event operations and increased overall event visibility.'
    ]
  },
  {
    date: 'Dec 2025',
    title: 'Campus Ambassador',
    company: 'TRISCEND 2025',
    img: triscendImg,
    borderColor: '#f472b6',
    bg: 'white',
    color: '#333',
    highlights: [
      'Represented IEEE Computer Society GUB Student Branch Chapter in collaboration with CUET WIE.',
      'Promoted innovation, creativity, and STEM leadership.'
    ]
  },
  {
    date: 'Jun 2025',
    title: 'Campus Ambassador',
    company: 'BPO Summit 2025',
    img: bpoSummitImg,
    borderColor: '#fbbf24',
    bg: 'white',
    color: '#333',
    highlights: [
      'Promoted the summit on campus and online.',
      'Organized awareness campaigns to increase student participation.'
    ]
  },
];

const ExperienceCard = ({ exp, isExpanded, onMouseEnter, onMouseLeave }: { exp: any, isExpanded: boolean, onMouseEnter: () => void, onMouseLeave: () => void }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -20, filter: 'blur(10px)' },
        visible: { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      className="w-full relative z-10"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <TiltCard tiltAmount={1} className={`group flex flex-col gap-2 dark:bg-white/[0.03] bg-[rgb(255,246,244)] border dark:border-white/10 border-black/10 rounded-[1.5rem] px-5 py-4 backdrop-blur-xl transition-all duration-300 ease-out cursor-pointer hover:bg-white/10 dark:hover:bg-white/[0.06] hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_4px_20px_rgba(99,102,241,0.1)] overflow-hidden relative`}>
        {/* Subtle liquid glow on hover inside the card */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1)_0%,transparent_50%)]" />

        <div className="flex items-center gap-4 relative z-10">
          <div 
            className="w-12 h-12 rounded-[1rem] border-[2px] overflow-hidden flex items-center justify-center shrink-0 font-display font-extrabold text-[0.7rem] shadow-[0_2px_10px_rgba(99,102,241,0.1)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_4px_15px_rgba(99,102,241,0.2)] group-hover:rotate-3"
            style={{ borderColor: exp.borderColor, backgroundColor: exp.img ? 'white' : exp.bg, color: exp.color }}
          >
            {exp.img ? (
              <img src={exp.img} alt={exp.title} className="w-full h-full object-contain p-1 bg-white" />
            ) : (
              exp.icon
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-[0.65rem] uppercase tracking-wide dark:text-white/40 text-[#888] mb-0.5">{exp.date}</div>
            <div className="font-display font-bold text-base dark:text-white text-[#111]">{exp.title}</div>
            <div className="text-[0.8rem] dark:text-white/50 text-[#555] truncate">{exp.company}</div>
          </div>
          
          <div className="shrink-0 text-indigo-500/40 group-hover:text-indigo-500/80 transition-colors duration-300">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden relative z-10"
            >
              <div className="pl-[64px] pr-4 pb-1 pt-1">
                <ul className="flex flex-col gap-1.5 list-disc ml-3 marker:text-indigo-500/50">
                  {exp.highlights.map((point: string, i: number) => {
                    const keywords = ['academic guidance', 'fresher students', 'financial operations', 'budgeting', 'video shooting', 'photography', 'publicity campaigns', 'STEM leadership', 'awareness campaigns'];
                    let highlightedText = point;
                    keywords.forEach(kw => {
                      if (highlightedText.toLowerCase().includes(kw.toLowerCase())) {
                         const regex = new RegExp(`(${kw})`, 'gi');
                         highlightedText = highlightedText.replace(regex, '<strong class="font-semibold text-indigo-500/80 dark:text-indigo-400/80">$1</strong>');
                      }
                    });

                    return (
                      <li 
                        key={i} 
                        className="dark:text-white/60 text-black/60 text-[0.8rem] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightedText }}
                      />
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltCard>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setExpandedIndex(idx);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setExpandedIndex(null);
  };

  return (
    <section id="experience" className="w-full max-w-3xl mx-auto py-20 px-4 pt-24 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] dark:text-white/45 text-[#555] mb-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center border border-[#5a922c]/20 bg-[#5a922c]/10 text-[#5a922c]">
            <Briefcase size={16} />
          </div>
          Experience
        </div>
        <TextReveal as="h2" gradients={{ journey: 'grad-text grad-green' }} className="justify-center font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight dark:text-white text-[#111]">
          My professional journey
        </TextReveal>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="flex flex-col gap-3 relative"
      >
        <div className="absolute left-[30px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-indigo-500/30 to-transparent hidden md:block overflow-hidden rounded-full">
          <motion.div 
            className="w-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        {experiences.map((exp, idx) => (
          <ExperienceCard 
            key={idx} 
            exp={exp} 
            isExpanded={expandedIndex === idx} 
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
