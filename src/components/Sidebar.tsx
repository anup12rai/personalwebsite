import { Home, User, Cpu, FolderGit2, Mail, type LucideIcon } from 'lucide-react';
import type { SectionId } from '@/data/portfolio';

interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

const items: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface SidebarProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="relative z-20 flex flex-col items-center gap-1 w-[68px] md:w-[84px] py-4 glass-strong border-r border-themed">
      {/* Logo mark */}
      <div className="relative mb-3 group">
        <div className="absolute inset-0 rounded-xl animate-pulse-glow blur-md bg-cyan-400/40" />
        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg text-cyan-300 border border-cyan-400/50 bg-ink-900/70 text-glow-cyan">
          A
        </div>
      </div>

      <div className="w-8 h-px neon-divider mb-2" />

      <nav className="flex flex-col gap-1.5 flex-1">
        {items.map((item, i) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="group relative flex flex-col items-center justify-center gap-0.5 w-12 h-12 rounded-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 60 + 120}ms` }}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <>
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full bg-cyan-400 glow-cyan" />
                  <span className="absolute inset-0 rounded-xl border border-cyan-400/40 bg-cyan-400/10 glow-soft" />
                </>
              )}
              <Icon
                className={`relative w-5 h-5 transition-all duration-300 ${
                  isActive ? 'text-cyan-300 scale-110' : 'text-slate-400 group-hover:text-cyan-200 group-hover:scale-110'
                }`}
                style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.8))' } : undefined}
              />
              <span
                className={`relative font-ui text-[8px] tracking-widest uppercase transition-colors ${
                  isActive ? 'text-cyan-300' : 'text-slate-500 group-hover:text-cyan-200'
                }`}
              >
                {item.label}
              </span>

              {/* tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 rounded-md glass-strong text-[11px] font-ui tracking-wide text-themed whitespace-nowrap opacity-0 -translate-x-1 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-30 border-themed">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="w-8 h-px neon-divider mt-2 mb-2" />

      {/* System mini-indicator */}
      <div className="flex flex-col items-center gap-1">
        <div className="relative w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ring" />
        </div>
        <span className="font-mono text-[7px] tracking-widest text-emerald-300/80">ONLINE</span>
      </div>
    </aside>
  );
}
