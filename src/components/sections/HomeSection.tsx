import { Sparkles, ArrowRight, MapPin, Cpu } from 'lucide-react';
import { Panel, NeonButton, HudTag } from '@/components/primitives';
import { profile, stats } from '@/data/portfolio';
import { useTypewriter } from '@/hooks/useTypewriter';

export function HomeSection() {
  const typed = useTypewriter(profile.roles, 75, 1800);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
      {/* Hero */}
      <Panel glow="cyan" className="relative p-6 flex flex-col justify-center overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 w-60 h-60 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative" style={{ animation: 'fadeInUp .6s ease forwards' }}>
          <HudTag>
            <Sparkles className="w-3 h-3" /> {profile.location}
          </HudTag>

          <p className="mt-4 font-mono text-xs tracking-[0.3em] text-cyan-300/80 uppercase animate-fade-in">
            Initializing operator profile
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight text-themed leading-[1.05]">
            {profile.name.split(' ')[0]}{' '}
            <span className="text-gradient">{profile.name.split(' ')[1]}</span>
          </h2>

          <div className="mt-3 h-7 flex items-center">
            <span className="font-ui text-lg md:text-xl font-medium text-dim tracking-wide">
              <span className="text-cyan-300">&gt;_</span>{' '}
              <span className="caret text-themed">{typed}</span>
            </span>
          </div>

          <p className="mt-4 max-w-xl font-ui text-sm md:text-[15px] text-dim leading-relaxed">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <NeonButton>
              Launch Profile <ArrowRight className="w-4 h-4" />
            </NeonButton>
            <NeonButton accent="#a855f7">Download Dossier</NeonButton>
          </div>
        </div>

        {/* corner data ticks */}
        <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-widest text-faint flex items-center gap-2">
          <Cpu className="w-3 h-3" /> CORE · 0x4F2A
        </div>
      </Panel>

      {/* Right column: stats + radar */}
      <div className="grid grid-rows-[auto_1fr] gap-4 min-h-0">
        <Panel glow="blue" className="p-4">
          <div className="font-mono text-[10px] tracking-widest text-faint mb-3">OPERATOR METRICS</div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="relative rounded-xl p-3 bg-ink-900/40 border border-themed overflow-hidden animate-scale-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                <div className="font-display text-2xl font-bold text-cyan-300 text-glow-cyan tabular-nums">
                  {s.value}
                  <span className="text-cyan-400/70 text-base">{s.suffix}</span>
                </div>
                <div className="font-ui text-[10px] tracking-wider text-dim uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel glow="purple" className="relative p-4 flex items-center justify-center overflow-hidden min-h-0">
          <RadarHud />
        </Panel>
      </div>
    </div>
  );
}

function RadarHud() {
  return (
    <div className="relative w-full max-w-[220px] aspect-square">
      <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
      <div className="absolute inset-[12%] rounded-full border border-cyan-400/15" />
      <div className="absolute inset-[28%] rounded-full border border-cyan-400/10" />
      <div className="absolute inset-[44%] rounded-full border border-cyan-400/10" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-400/15" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-400/15" />

      {/* sweep */}
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(34,211,238,0.35) 350deg, rgba(34,211,238,0.6) 360deg)',
          maskImage: 'radial-gradient(circle, black 60%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 60%)',
        }}
      />

      {/* blips */}
      {[
        { x: 62, y: 30, c: '#22d3ee', d: 0 },
        { x: 32, y: 58, c: '#a855f7', d: 0.8 },
        { x: 70, y: 68, c: '#3b82f6', d: 1.4 },
      ].map((b, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-pulse-glow"
          style={{ left: `${b.x}%`, top: `${b.y}%`, background: b.c, animationDelay: `${b.d}s`, boxShadow: `0 0 10px ${b.c}` }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin className="w-6 h-6 text-cyan-300 text-glow-cyan animate-float" />
      </div>

      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-faint">
        GEO-SCAN · ACTIVE
      </div>
    </div>
  );
}
