import React from 'react';
import { LayoutTemplate, LineChart } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  colSpan: string;
  links: { url: string; icon: React.ReactNode }[];
  embed?: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 9,
    title: 'Video Editing',
    description: '',
    tags: ['CapCut'],
    color: '#dd7bbb',
    icon: <LineChart size={16} />,
    colSpan: 'md:col-span-4 col-span-12',
    links: [],
    embed: <div className="flex justify-center w-full overflow-hidden"><iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1566175077822027%2F&show_text=false&width=321&t=0" width="321" height="476" style={{border:"none", overflow:"hidden", maxWidth:"100%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy" title="Facebook Video"></iframe></div>,
  },
  {
    id: 8,
    title: 'Video Editing',
    description: '',
    tags: ['CapCut'],
    color: '#dd7bbb',
    icon: <LineChart size={16} />,
    colSpan: 'md:col-span-4 col-span-12',
    links: [],
    embed: <div className="flex justify-center w-full overflow-hidden"><iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1868904047313996%2F&show_text=false&width=267&t=0" width="267" height="476" style={{border:"none", overflow:"hidden", maxWidth:"100%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy" title="Facebook Video"></iframe></div>,
  },
  {
    id: 1,
    title: 'Video Editing',
    description: '',
    tags: ['CapCut'],
    color: '#dd7bbb',
    icon: <LineChart size={16} />,
    colSpan: 'md:col-span-4 col-span-12',
    links: [],
    embed: <div className="flex justify-center w-full overflow-hidden"><iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1465864714517421%2F&show_text=false&width=560&t=0" width="560" height="220" style={{border:"none", overflow:"hidden", maxWidth:"100%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy" title="Facebook Video"></iframe></div>,
  },
  {
    id: 10,
    title: 'Video Editing',
    description: '',
    tags: ['CapCut'],
    color: '#dd7bbb',
    icon: <LineChart size={16} />,
    colSpan: 'md:col-span-4 col-span-12',
    links: [],
    embed: <div className="flex justify-center w-full overflow-hidden"><iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fieeegubsb%2Fvideos%2F1822821351782803%2F&show_text=false&width=560&t=0" width="560" height="220" style={{border:"none", overflow:"hidden", maxWidth:"100%"}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy" title="Facebook Video"></iframe></div>,
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full max-w-4xl mx-auto py-20 px-4 pt-24 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] dark:text-white/45 text-[#555] mb-3">
          <div className="w-8 h-8 rounded-md flex items-center justify-center border border-[#d79f1e]/20 bg-[#d79f1e]/10 text-[#d79f1e]">
            <LayoutTemplate size={16} />
          </div>
          Projects
        </div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight dark:text-white text-[#111]">
          Things I've <span className="grad-text grad-gold">built</span>
        </h2>
        <p className="dark:text-white/45 text-[#555] text-base mt-2 max-w-2xl mx-auto">
          A selection of projects I've worked on, from open source tools to full-stack applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
        {projects.map((proj) => (
          <div 
            key={proj.id} 
            className="group w-fit max-w-full mx-auto rounded-3xl border dark:border-white/10 border-white/40 dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-white/60 dark:hover:border-white/20 flex flex-col relative overflow-hidden p-4 gap-4"
          >
            <div className="flex items-center justify-between gap-3 relative z-10 w-full pt-1 px-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-md dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10 border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: proj.color }}
                >
                  {proj.icon}
                </div>
                <div className="font-display font-bold text-[1.15rem] leading-none dark:text-white text-[#111] tracking-tight">
                  {proj.title}
                </div>
              </div>
              {proj.links.length > 0 && (
                <div className="flex gap-1">
                  {proj.links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-7 h-7 rounded-md flex items-center justify-center dark:text-white/40 text-[#666] dark:hover:text-white hover:text-black hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {proj.embed && (
              <div className="relative z-10 flex justify-center rounded-2xl overflow-hidden shadow-inner dark:bg-black/40 bg-white/40">
                {proj.embed}
              </div>
            )}
            
            {!proj.embed && (
              <div className="text-[0.85rem] dark:text-white/60 text-[#555] leading-relaxed flex-1 relative z-10 text-center px-2">
                {proj.description}
              </div>
            )}

            <div className="flex justify-start flex-wrap gap-1.5 relative z-10 shrink-0 mt-1 w-full px-1">
              {proj.tags.map(tag => (
                <span key={tag} className="text-[0.65rem] tracking-wide uppercase px-3 py-1 dark:bg-white/10 bg-white/50 dark:border-white/10 border-white/50 border rounded-full dark:text-white/70 text-[#333] font-semibold backdrop-blur-md shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
