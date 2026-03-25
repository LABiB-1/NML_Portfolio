import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-[70vh] flex flex-col justify-center items-center text-center gap-12 max-w-4xl mx-auto py-20 px-4 relative z-10">
      
      <div className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.15em] dark:text-white/45 text-[#666]">
        <span className="relative w-2 h-2 rounded-full bg-emerald-500">
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping"></span>
        </span>
        Available for projects
      </div>

      <a href="mailto:najibmahmudlabib.11@gmail.com" className="group block cursor-pointer outline-none">
        <div className="font-display font-light leading-[1.1] tracking-[-0.02em] text-[clamp(3.5rem,10vw,7rem)] dark:text-white/90 text-[#111] transition-all duration-500 group-hover:-translate-y-2 group-hover:dark:text-white group-hover:text-[#000]">
          Let's work
        </div>
        <div className="font-display font-light leading-[1.1] tracking-[-0.02em] text-[clamp(3.5rem,10vw,7rem)] dark:text-white/25 text-[#aaa] transition-all duration-500 dark:group-hover:text-white group-hover:text-[#111] group-hover:translate-x-4">
          together
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="w-16 h-16 rounded-full border dark:border-white/20 border-white/50 dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-500 dark:group-hover:bg-white group-hover:bg-[#111] group-hover:text-white dark:group-hover:text-black group-hover:scale-110">
            <ArrowDownRight size={24} className="transition-transform duration-500 group-hover:-rotate-90" />
          </div>
        </div>
      </a>

      <div>
        <p className="dark:text-white/60 text-[#555] text-[0.95rem] max-w-sm mx-auto leading-[1.7]">
          Have an idea in mind? I'd love to hear about it. Let's create something exceptional together.
        </p>
        <div className="text-[0.75rem] tracking-[0.15em] uppercase dark:text-white/35 text-[#888] mt-3">
          CONTRACT@NAJIBMAHMUDLABIB
        </div>
      </div>

    </section>
  );
};

export default Contact;
