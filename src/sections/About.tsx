import React from 'react';
import { UserCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="w-full max-w-4xl mx-auto py-20 px-4 pt-24 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] dark:text-white/45 text-[#555] mb-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center border border-[#4c7894]/20 bg-[#4c7894]/10 text-[#4c7894]">
            <UserCheck size={16} />
          </div>
          About
        </div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight dark:text-white text-[#111]">
          A bit about <span className="grad-text grad-me">me</span>
        </h2>
        <p className="dark:text-white/45 text-[#555] text-base mt-2 max-w-xl mx-auto">
          Get to know who I am and what drives me.
        </p>
      </div>
      
      <div className="text-center leading-[1.9] max-w-3xl mx-auto space-y-4">
        <p className="text-[1.05rem] dark:text-white/90 text-[#111] font-medium">Hey there, I’m Labib — a Computer Science student.</p>
        <p className="dark:text-white/80 text-[#333]">
          I’m exploring the world of AI and computer science, building a strong foundation while continuously improving my skills and mindset. I believe in learning something new every day and turning that knowledge into meaningful outcomes.
        </p>
        <p className="dark:text-white/80 text-[#333]">
          Right now, I’m focused on growing — both technically and personally — with an interest in technologies. I enjoy understanding how technology can solve real problems and create simple, human-centered digital experiences.
        </p>
        <p className="dark:text-white/80 text-[#333]">
          More than anything, I’m driven by the idea of building a productive life — one that gives me freedom over time, money, and location.
        </p>
        <p className="dark:text-white/80 text-[#333]">
          I’m still at the beginning of my journey, but I’m committed to learning, improving, and becoming better every single day.
        </p>
        <p className="dark:text-white/80 text-[#333]">
          Want to connect or share ideas? Feel free to reach out.
        </p>
      </div>
    </section>
  );
};

export default About;
