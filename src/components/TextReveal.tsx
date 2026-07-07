import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  splitBy?: 'word' | 'line';
  gradients?: Record<string, string>;
  interactive?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  staggerDelay = 0.03,
  once = false,
  splitBy = 'word',
  gradients,
  interactive = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });

  const items = splitBy === 'word' ? children.split(' ') : children.split('\n');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: 'blur(10px)',
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // premium custom cubic-bezier
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Component className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0.3em' : '0' }}>
        {items.map((item, i) => {
          let extraClass = '';
          if (gradients && gradients[item]) {
            extraClass = ` ${gradients[item]}`;
          }
          return (
            <motion.span
              key={i}
              variants={itemVariants}
              className={`inline-block${extraClass} ${interactive ? 'cursor-default transition-colors duration-200 hover:text-indigo-400 hover:drop-shadow-[0_10px_20px_rgba(99,102,241,0.4)]' : ''}`}
              whileHover={interactive ? { 
                scale: 1.15, 
                y: -5,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              } : undefined}
            >
              {item}
            </motion.span>
          );
        })}
      </Component>
    </motion.div>
  );
};

export default TextReveal;
