import { useEffect, useState } from 'react';
import type { SectionId } from '@/data/portfolio';
import { HomeSection } from '@/components/sections/HomeSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

interface Props {
  section: SectionId;
  onTransitionComplete: () => void;
}

const components: Record<SectionId, () => JSX.Element> = {
  home: HomeSection,
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

export function SectionRouter({ section, onTransitionComplete }: Props) {
  const [displayed, setDisplayed] = useState(section);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    if (section === displayed) return;
    setPhase('out');
    const t = window.setTimeout(() => {
      setDisplayed(section);
      setPhase('in');
      onTransitionComplete();
    }, 220);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  const Current = components[displayed];

  return (
    <div
      className="h-full w-full"
      style={{
        opacity: phase === 'out' ? 0 : 1,
        transform: phase === 'out' ? 'translateY(14px) scale(0.985)' : 'translateY(0) scale(1)',
        transition: 'opacity 220ms ease, transform 220ms ease',
      }}
    >
      <Current />
    </div>
  );
}
