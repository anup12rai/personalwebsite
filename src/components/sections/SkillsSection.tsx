import { Panel, SectionHeader } from '@/components/primitives';
import { skillGroups } from '@/data/portfolio';

export function SkillsSection() {
  return (
    <div className="h-full flex flex-col gap-4">
      <SectionHeader index="03" title="Capabilities Matrix" subtitle="Skills · Tech Stack" accent="#22d3ee" />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 min-h-0">
        {skillGroups.map((group, gi) => (
          <Panel
            key={group.title}
            glow={gi % 2 === 0 ? 'cyan' : 'purple'}
            className="p-4 flex flex-col animate-fade-in-up"
            corner={false}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs font-bold tracking-[0.18em] text-themed uppercase">
                {group.title}
              </h3>
              <span className="font-mono text-[9px] text-faint">{group.skills.length} MODS</span>
            </div>

            <div className="space-y-3 flex-1">
              {group.skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center border"
                          style={{
                            color: skill.color,
                            borderColor: `${skill.color}44`,
                            background: `${skill.color}12`,
                            boxShadow: `0 0 12px ${skill.color}33`,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="font-ui text-sm text-themed tracking-wide">{skill.name}</span>
                      </div>
                      <span className="font-mono text-[11px] tabular-nums" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>

                    <div className="relative h-1.5 rounded-full bg-ink-800/80 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`,
                          boxShadow: `0 0 10px ${skill.color}aa`,
                          animationDelay: `${gi * 120 + i * 80}ms`,
                        }}
                      />
                      {/* shimmer */}
                      <div
                        className="absolute inset-y-0 w-1/3 opacity-40 animate-shimmer"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                          animationDelay: `${i * 300}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>

      {/* Marquee */}
      <Panel glow="blue" className="p-2 overflow-hidden" corner={false}>
        <div className="flex gap-8 animate-ticker whitespace-nowrap font-display text-sm font-bold tracking-[0.3em] text-faint">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-8">
              {['REACT', 'TYPESCRIPT', 'TAILWIND', 'NODE', 'GIT', 'PYTHON', 'JAVASCRIPT', 'CSS', 'HTML'].map(
                (t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                    {t}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
