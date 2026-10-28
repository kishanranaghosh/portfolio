import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContributionGraph from './components/ContributionGraph';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Toaster } from './components/ui/toaster';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <div className="w-full overflow-x-hidden bg-background relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ContributionGraph />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
