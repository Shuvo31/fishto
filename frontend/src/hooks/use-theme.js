import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'fishto-theme';
const media = () => window.matchMedia('(prefers-color-scheme: dark)');

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
};

const apply = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', theme === 'dark' ? '#000000' : '#FFFFFF'));
};

// The initial class is set by an inline script in public/index.html to avoid a flash.
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const mq = media();
    const onSystemChange = (e) => {
      if (readStored()) return;
      const next = e.matches ? 'dark' : 'light';
      apply(next);
      setTheme(next);
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode); theme still applies for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
