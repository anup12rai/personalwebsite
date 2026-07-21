import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const QUICK = [
  'What tech stack do you use?',
  'Show me your best project',
  'Are you available for work?',
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('tech') || q.includes('stack')) {
    return 'Primary stack: Python, PyTorch, ROS2, CUDA, TypeScript, and C++ for edge inference. I also run MLOps on Kubernetes + Ray.';
  }
  if (q.includes('project') || q.includes('best')) {
    return 'NEXUS Perception Core is my flagship — a 120Hz multimodal SLAM pipeline running on bipedal service robots. Check the Projects panel.';
  }
  if (q.includes('work') || q.includes('available') || q.includes('hire')) {
    return "I'm open to selective robotics & AI roles. Drop a message via the Contact panel and I'll respond within 24h.";
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Hey there. I am J.A.R.V.I.S, Aria Voss command interface. How can I assist you?';
  }
  return 'Query logged. Aria will respond via the Contact panel. Meanwhile, explore the Home, About, Skills, and Projects panels.';
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([
    {
      from: 'bot',
      text: 'J.A.R.V.I.S online. Ask me about Aria, projects, or availability.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((m) => [...m, { from: 'user', text: trimmed }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: reply(trimmed) }]);
    }, 900);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open assistant"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-90 group-hover:opacity-100" />
        <span className="absolute inset-0 rounded-full bg-cyan-400/60 blur-md animate-pulse-glow" />
        <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-ring" />
        <span className="relative text-ink-950">
          {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-5 z-40 w-[330px] max-w-[92vw] h-[420px] max-h-[70vh] rounded-2xl glass-strong border border-themed shadow-glow-purple flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 border-b border-themed bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <span className="relative w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-glow" />
          </span>
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="font-display text-xs font-bold tracking-[0.2em] text-themed">J.A.R.V.I.S</span>
          <span className="font-mono text-[9px] text-emerald-300 ml-auto">ACTIVE</span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div
                className={`max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed font-ui ${
                  m.from === 'user'
                    ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/20 border border-cyan-400/30 text-cyan-50 rounded-br-sm'
                    : 'glass border-themed text-themed rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start animate-fade-in">
              <div className="glass border-themed px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse-glow"
                    style={{ animationDelay: `${d * 180}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick replies */}
        {msgs.length <= 1 && (
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="px-2.5 py-1 rounded-full text-[10px] font-ui tracking-wide glass border-themed text-dim hover:text-cyan-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 px-3 py-2.5 border-t border-themed"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent text-sm font-ui text-themed placeholder:text-faint outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/25 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
