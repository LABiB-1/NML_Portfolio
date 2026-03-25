import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Dock from './components/Dock';
import Footer from './components/Footer';

import Hero from './sections/Hero';

const About = React.lazy(() => import('./sections/About'));
const Projects = React.lazy(() => import('./sections/Projects'));
const Blog = React.lazy(() => import('./sections/Blog'));
const Experience = React.lazy(() => import('./sections/Experience'));
const Contact = React.lazy(() => import('./sections/Contact'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-[#000000] text-[#111] dark:text-[rgba(255,255,255,0.9)] overflow-hidden selection:bg-portfolio-pink/30 selection:text-white transition-colors duration-500">
        {/* Background Interactive Canvas */}
        <ParticleBackground />

        {/* Hero Gradients (Top & Bottom overrides) */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 dark:from-black/70 from-white/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t dark:from-black dark:via-black/60 from-white via-white/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] dark:block hidden"></div>
        </div>

        <Header />
        
        <main className="relative z-10 flex flex-col items-center">
          <Hero />
          <React.Suspense fallback={<div className="h-40 w-full flex items-center justify-center opacity-0"></div>}>
            <About />
            <Projects />
            <Blog />
            <Experience />
            <Contact />
          </React.Suspense>
        </main>

        <Footer />
        <Dock />
      </div>
    </ThemeProvider>
  );
};

export default App;
