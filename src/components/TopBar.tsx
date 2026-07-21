import { Sun, Moon, Power, Activity } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useClock, formatTime, formatDate } from '@/hooks/useClock';

interface TopBarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function TopBar({ theme, onToggleTheme }: TopBarProps) {
  const now = useClock();

  return (
    <header className="relative z-20 flex items-center gap-3 px-4 md:px-6 h-16 glass-strong border-b border-themed">
      {/* Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/40 animate-pulse-glow" />
          <img
            src={profile.avatar}
            alt={profile.name}
            className="relative w-10 h-10 rounded-full object-cover border border-cyan-400/50 bg-ink-900/80"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ink-900" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-sm md:text-base font-bold tracking-[0.18em] text-themed truncate">
              {profile.name}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="font-mono text-[9px] tracking-wider text-emerald-300">{profile.status}</span>
            </span>
          </div>
          <p className="font-ui text-[11px] md:text-xs text-dim tracking-wide truncate">{profile.role}</p>
        </div>
      </div>

      <div className="flex-1" />

      {/* Clock + date */}
      <div className="hidden md:flex flex-col items-end mr-2">
        <span className="font-mono text-sm text-cyan-300 tracking-wider text-glow-cyan tabular-nums">
          {formatTime(now)}
        </span>
        <span className="font-mono text-[9px] text-faint tracking-widest">{formatDate(now)}</span>
      </div>

      <div className="hidden md:block w-px h-8 bg-themed opacity-30" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <IconButton onClick={onToggleTheme} label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </IconButton>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg glass border-themed">
          <Activity className="w-3.5 h-3.5 text-cyan-300" />
          <span className="font-mono text-[9px] tracking-widest text-dim">UPTIME 99.98%</span>
        </div>
        <IconButton label="Power" danger>
          <Power className="w-4 h-4" />
        </IconButton>
      </div>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  label,
  pulse,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
  pulse?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center glass border-themed transition-all duration-300 hover:scale-105 ${
        danger ? 'text-rose-300 hover:text-rose-200' : 'text-dim hover:text-cyan-200'
      } ${pulse ? 'animate-pulse-glow' : ''}`}
    >
      {children}
    </button>
  );
}
