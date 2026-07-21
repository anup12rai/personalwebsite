import { Briefcase, GraduationCap, Quote, Fingerprint } from 'lucide-react';
import { Panel, SectionHeader } from '@/components/primitives';
import { profile, timeline } from '@/data/portfolio';

export function AboutSection() {
  return (
    <div className="h-full flex flex-col gap-4">
      <SectionHeader index="02" title="About the Operator" subtitle="Profile · Timeline" accent="#a855f7" />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4 min-h-0">
        {/* Bio card */}
        <Panel glow="purple" className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/15 border border-purple-400/40">
              <Fingerprint className="w-6 h-6 text-purple-300" />
              <span className="absolute inset-0 rounded-xl animate-pulse-glow blur-sm bg-purple-400/20" />
            </div>
            <div>
              <div className="font-display text-sm font-bold tracking-widest text-themed">DOSSIER</div>
              <div className="font-mono text-[10px] text-faint tracking-wider">ID · AV-0x4F2A</div>
            </div>
          </div>

          <p className="font-ui text-sm text-dim leading-relaxed">{profile.bio}</p>

          <div className="mt-4 rounded-xl p-3 bg-ink-900/40 border border-themed">
            <Quote className="w-4 h-4 text-purple-300 mb-1.5" />
            <p className="font-ui text-[13px] italic text-themed leading-relaxed">
              "I don't just train models — I give machines the courtesy of attention."
            </p>
          </div>

          <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
            {[
              ['Base', profile.location],
              ['Focus', 'Robotics · AI'],
              ['Status', 'Available'],
              ['Languages', 'EN · JP · DE'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg p-2 bg-ink-900/30 border border-themed">
                <div className="font-mono text-[9px] text-faint tracking-widest uppercase">{k}</div>
                <div className="font-ui text-xs text-themed truncate">{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Timeline */}
        <Panel glow="cyan" className="p-5 overflow-hidden flex flex-col">
          <div className="font-mono text-[10px] tracking-widest text-faint mb-3">EXPERIENCE · EDUCATION</div>
          <div className="relative flex-1 overflow-y-auto pr-2">
            {/* spine */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-purple-400/40 to-transparent" />

            <ol className="space-y-3">
              {timeline.map((t, i) => {
                const isWork = t.type === 'work';
                const Icon = isWork ? Briefcase : GraduationCap;
                const accent = isWork ? '#22d3ee' : '#a855f7';
                return (
                  <li
                    key={i}
                    className="relative pl-10 animate-fade-in-up"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <span
                      className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: accent, background: 'rgb(10 14 26)', boxShadow: `0 0 10px ${accent}88` }}
                    >
                      <Icon className="w-2 h-2" style={{ color: accent }} />
                    </span>
                    <div className="rounded-xl p-3 bg-ink-900/40 border border-themed hover:border-themed transition-colors group">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-ui text-sm font-semibold text-themed truncate">{t.title}</h3>
                        <span
                          className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
                          style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}33` }}
                        >
                          {t.period}
                        </span>
                      </div>
                      <div className="font-ui text-xs text-cyan-300/80 mt-0.5">{t.org}</div>
                      <p className="font-ui text-[12px] text-dim leading-relaxed mt-1.5">{t.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Panel>
      </div>
    </div>
  );
}
