import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Beginner's Guide to Building a React Component Library",
    excerpt: "In today's rapidly evolving digital landscape, creating reusable components is crucial for web development projects.",
    tag: "React",
    time: "6 min read",
    icon: "⚛️",
    bg: "linear-gradient(135deg, #0f3460, #16213e)"
  },
  {
    id: 2,
    title: "The Paradox of Choice - Are you choosing the right roadmap?",
    tag: "Developer",
    time: "6 min read",
    icon: "🗺️",
    bg: "linear-gradient(135deg, #1a3a1a, #1e5f1e)"
  },
  {
    id: 3,
    title: "Don't Let Fonts Slow You Down",
    tag: "fonts",
    time: "5 min read",
    icon: "✍️",
    bg: "linear-gradient(135deg, #1a1a3e, #2d1b69)"
  }
];

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
  };

  return (
    <section id="blog" className="w-full max-w-4xl mx-auto py-20 px-4 pt-24 pb-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] dark:text-white/45 text-[#555] mb-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center border border-[#dd7bbb]/20 bg-[#dd7bbb]/10 text-[#dd7bbb]">
                <BookOpen size={16} />
              </div>
              Blog
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight dark:text-white text-[#111]">
              Thoughts, ideas &amp; <span className="grad-text grad-pink-gold">insights</span>
            </h2>
            <p className="dark:text-white/45 text-[#555] text-base mt-2">
              I write about web development, programming, and building a better, more productive life—sharing my journey, lessons, and growth along the way.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl border dark:border-white/10 border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] dark:text-white text-[#111] px-6 py-2.5 rounded-full font-display font-semibold text-[0.9rem] w-fit transition-transform hover:translate-x-1 cursor-default dark:hover:bg-white/10 hover:bg-white/50">
            View all posts
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="relative">
          <div className="relative h-[380px]">
            <AnimatePresence initial={false}>
              {blogPosts.map((post, index) => {
                // Calculate position relative to currentIndex
                const position = (index - currentIndex + blogPosts.length) % blogPosts.length;
                let zIndex = 3 - position;
                let yOffset = position === 0 ? 12 : position === 1 ? -16 : -44;
                let scale = position === 0 ? 1 : position === 1 ? 0.95 : 0.90;

                return (
                  <motion.div
                    key={post.id}
                    className="absolute bottom-0 left-1/2 w-[280px] sm:w-[300px] rounded-t-xl dark:bg-white/[0.03] bg-white/30 backdrop-blur-2xl dark:border-white/10 border-white/40 border shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-colors duration-300"
                    animate={{
                      y: yOffset,
                      x: "-50%",
                      scale: scale,
                      zIndex: zIndex,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div 
                      className="h-[140px] w-full flex items-center justify-center text-4xl"
                      style={{ background: post.bg }}
                    >
                      {post.icon}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[0.7rem] dark:text-white/50 text-[#555] mb-2">
                        <span className="w-1.5 h-1.5 rounded-full border dark:border-white/50 border-black/30"></span> {post.time} <span className="mx-1">•</span> <span className="dark:bg-white/10 bg-black/5 px-2 py-0.5 rounded-full dark:text-white/70 text-[#555]">{post.tag}</span>
                      </div>
                      <div className="flex flex-col gap-2 mt-1">
                        <div className="w-10/12 h-3.5 rounded-full dark:bg-white/20 bg-black/15 animate-pulse"></div>
                        <div className="flex flex-col gap-1.5 mt-1">
                          <div className="w-full h-2 rounded-full dark:bg-white/10 bg-black/10 animate-pulse delay-75"></div>
                          <div className="w-4/5 h-2 rounded-full dark:bg-white/10 bg-black/10 animate-pulse delay-100"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          <div className="absolute -bottom-2 left-0 right-0 p-4 flex justify-center z-50 pointer-events-none">
            <button 
              onClick={nextPost}
              className="pointer-events-auto flex items-center gap-1.5 dark:bg-white/[0.05] bg-white/50 backdrop-blur-md dark:border-white/10 border-white/40 border shadow-lg px-4 py-2 rounded-full text-[0.8rem] font-semibold dark:text-white text-[#111] dark:hover:bg-white/10 hover:bg-white/70 transition-colors"
            >
              Next Post
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Blog;
