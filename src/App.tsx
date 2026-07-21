import { useEffect, useMemo, useState } from 'react';
import type { SectionId } from '@/data/portfolio';
import { profile } from '@/data/portfolio';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Chatbot } from '@/components/Chatbot';
import { SectionRouter } from '@/components/SectionRouter';

export default function App() {
  const [section, setSection] = useState<SectionId>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light');
    else root.classList.remove('light');
  }, [theme]);

  useEffect(() => {
    const t = window.setTimeout(() => setBooted(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  const breadcrumb = useMemo(() => {
    const map: Record<SectionId, string> = {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    };
    return map[section];
  }, [section]);

  return (
    <div className="relative h-screen w-screen overflow-hidden aurora">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-[120px] animate-float"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Boot overlay */}
      <BootSequence show={!booted} />

      {/* App shell */}
      <div className="relative z-10 h-full w-full flex animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Sidebar active={section} onSelect={setSection} />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

          {/* Breadcrumb strip */}
          <div className="flex items-center gap-2 px-5 py-2 border-b border-themed bg-surface/30 font-mono text-[10px] tracking-widest text-faint">
            <span className="text-cyan-300">ROOT</span>
            <span>/</span>
            <span className="text-dim">OPERATOR</span>
            <span>/</span>
            <span className="text-themed">{breadcrumb}</span>
            <span className="flex-1" />
            <span className="hidden sm:inline">NODE · 0x4F2A</span>
            <span className="hidden md:inline text-cyan-300/70 animate-pulse-glow">●</span>
          </div>

          {/* Main panel */}
          <main className="flex-1 p-4 md:p-5 min-h-0 overflow-hidden">
            <SectionRouter section={section} onTransitionComplete={() => {}} />
          </main>

          {/* Footer status bar */}
          <footer className="flex items-center gap-4 px-5 h-7 border-t border-themed bg-surface/30 font-mono text-[9px] tracking-widest text-faint">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              SYSTEM ONLINE
            </span>
            <span className="hidden sm:inline">CPU 42%</span>
            <span className="hidden sm:inline">MEM 68%</span>
            <span className="flex-1" />
            <span className="hidden sm:inline">{profile.location}</span>
            <span className="text-cyan-300/80">{profile.name}</span>
          </footer>
        </div>
      </div>

      {/* Overlays */}
      <Chatbot />
    </div>
  );
}

function BootSequence({ show }: { show: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-ink-950 transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        <div className="relative mx-auto w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border-b-2 border-purple-400/70 animate-spin-rev" />
          <div className="absolute inset-0 flex items-center justify-center font-display font-black text-cyan-300 text-glow-cyan">
            A
          </div>
        </div>
        <div className="font-display text-sm font-bold tracking-[0.4em] text-cyan-300 text-glow-cyan">J.A.R.V.I.S</div>
        <div className="font-mono text-[10px] tracking-widest text-faint mt-1">INITIALIZING SYSTEMS…</div>
      </div>
    </div>
  );
}
