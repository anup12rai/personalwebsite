import { useEffect, useRef, useState } from 'react';

export function useTypewriter(words: string[], typeMs = 85, pauseMs = 1600) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const current = words[wordIdx % words.length] ?? '';
    let delay = deleting ? typeMs / 2 : typeMs;

    if (!deleting && text === current) {
      delay = pauseMs;
      timer.current = window.setTimeout(() => setDeleting(true), delay);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIdx((i) => i + 1);
    } else {
      timer.current = window.setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }, delay);
    }

    return () => window.clearTimeout(timer.current);
  }, [text, deleting, wordIdx, words, typeMs, pauseMs]);

  return text;
}
