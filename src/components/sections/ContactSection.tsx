import { useState } from 'react';
import { Send, CheckCircle2, Radio } from 'lucide-react';
import { Panel, SectionHeader, NeonButton } from '@/components/primitives';
import { socials } from '@/data/portfolio';

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 2600);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <SectionHeader index="05" title="Open a Channel" subtitle="Contact · Connect" accent="#d946ef" />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-4 min-h-0">
        {/* Form */}
        <Panel glow="purple" className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-fuchsia-300 animate-pulse-glow" />
              <span className="font-mono text-[10px] tracking-widest text-faint">SECURE TRANSMISSION</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-300">ENCRYPTED · E2E</span>
          </div>

          {sent ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 animate-scale-in">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl animate-pulse-glow" />
                <CheckCircle2 className="relative w-16 h-16 text-emerald-400" />
              </div>
              <div className="font-display text-lg font-bold tracking-widest text-emerald-300 text-glow-cyan">
                TRANSMISSION RECEIVED
              </div>
              <p className="font-ui text-sm text-dim">Aria will respond within 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
              <Field label="Operator Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your callsign…"
                  className="w-full bg-transparent text-sm font-ui text-themed placeholder:text-faint outline-none"
                />
              </Field>
              <Field label="Frequency (Email)">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@domain.io"
                  className="w-full bg-transparent text-sm font-ui text-themed placeholder:text-faint outline-none"
                />
              </Field>
              <Field label="Message Payload">
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Compose your transmission…"
                  rows={3}
                  className="w-full bg-transparent text-sm font-ui text-themed placeholder:text-faint outline-none resize-none"
                />
              </Field>

              <div className="mt-auto pt-1">
                <NeonButton type="submit" accent="#d946ef" className="w-full">
                  Send Transmission <Send className="w-4 h-4" />
                </NeonButton>
              </div>
            </form>
          )}
        </Panel>

        {/* Socials + coords */}
        <div className="grid grid-rows-[1fr_auto] gap-4 min-h-0">
          <Panel glow="cyan" className="p-5 flex flex-col">
            <div className="font-mono text-[10px] tracking-widest text-faint mb-3">DIRECT CHANNELS</div>
            <div className="grid grid-cols-2 gap-2.5 flex-1">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative rounded-xl p-3 bg-ink-900/40 border border-themed overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(80% 100% at 50% 0%, ${s.color}22, transparent 70%)` }}
                    />
                    <Icon
                      className="w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-125"
                      style={{ color: s.color, filter: `drop-shadow(0 0 8px ${s.color}66)` }}
                    />
                    <div className="relative font-ui text-xs font-semibold text-themed tracking-wide">{s.label}</div>
                    <div className="relative font-mono text-[10px] text-faint truncate">{s.handle}</div>
                  </a>
                );
              })}
            </div>
          </Panel>

          <Panel glow="blue" className="p-3 flex items-center gap-3" corner={false}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-glow shrink-0" />
            <div className="min-w-0">
              <div className="font-ui text-xs text-themed font-semibold tracking-wide">Currently available for work</div>
              <div className="font-mono text-[10px] text-faint tracking-wider">Response · &lt; 24h</div>
            </div>
            <span className="ml-auto font-mono text-[9px] text-faint tracking-widest">LAT 35.6°N</span>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-widest text-faint uppercase mb-1.5">{label}</span>
      <div className="rounded-xl px-3 py-2.5 bg-ink-900/40 border border-themed focus-within:border-cyan-400/50 focus-within:glow-soft transition-all duration-300">
        {children}
      </div>
    </label>
  );
}
