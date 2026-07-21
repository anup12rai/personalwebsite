import { type ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'blue' | 'none';
  corner?: boolean;
}

const glowMap = {
  cyan: 'hover:glow-cyan',
  purple: 'hover:glow-purple',
  blue: 'hover:glow-blue',
  none: '',
};

export function Panel({ children, className = '', glow = 'cyan', corner = true }: PanelProps) {
  return (
    <div
      className={`group relative rounded-2xl glass shadow-glow transition-all duration-500 ${glowMap[glow]} ${className}`}
    >
      {corner && <Corners />}
      {children}
    </div>
  );
}

export function Corners({ color = '#22d3ee' }: { color?: string }) {
  const base = 'absolute w-3 h-3 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100';
  const style = { color };
  return (
    <>
      <span className={`${base} top-1.5 left-1.5 border-t border-l`} style={style} />
      <span className={`${base} top-1.5 right-1.5 border-t border-r`} style={style} />
      <span className={`${base} bottom-1.5 left-1.5 border-b border-l`} style={style} />
      <span className={`${base} bottom-1.5 right-1.5 border-b border-r`} style={style} />
    </>
  );
}

export function SectionHeader({
  index,
  title,
  subtitle,
  accent = '#22d3ee',
}: {
  index: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 animate-fade-in-down" style={{ animationDelay: '40ms' }}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-dim uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: accent }} />
          <span style={{ color: accent }}>{index}</span>
          <span className="text-faint">/</span>
          <span className="truncate">{subtitle}</span>
        </div>
        <h2 className="font-display text-2xl md:text-[28px] font-bold tracking-[0.12em] text-themed mt-1 truncate">
          {title}
        </h2>
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-faint tracking-widest">
        <span className="w-10 h-px" style={{ background: `${accent}55` }} />
        STATUS: LIVE
      </div>
    </div>
  );
}

export function HudTag({ children, accent = '#22d3ee' }: { children: ReactNode; accent?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border"
      style={{ color: accent, borderColor: `${accent}44`, background: `${accent}10` }}
    >
      {children}
    </span>
  );
}

export function NeonButton({
  children,
  onClick,
  accent = '#22d3ee',
  type = 'button',
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  accent?: string;
  type?: 'button' | 'submit';
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl px-5 py-2.5 font-ui font-semibold tracking-wider uppercase text-sm transition-all duration-300 border ${className}`}
      style={{ color: accent, borderColor: `${accent}55`, background: `${accent}12` }}
    >
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${accent}22, transparent 70%)` }}
      />
      <span className="relative flex items-center gap-2 justify-center">{children}</span>
    </button>
  );
}
