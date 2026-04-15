// ============================================================
// app/lib/ThemeContext.js
// Global theme context — provides light/dark toggle to all pages.
//
// How it works:
//   1. On first load, reads saved theme from localStorage
//   2. Falls back to system preference (prefers-color-scheme)
//   3. Applies data-theme="light"|"dark" to <html> element
//   4. Exposes { theme, toggleTheme } via React context
//
// Usage in any component:
//   import { useTheme } from '../lib/ThemeContext';
//   const { theme, toggleTheme } = useTheme();
// ============================================================

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // On first mount: read saved preference or detect system theme
  useEffect(() => {
    const saved = localStorage.getItem('neural-pdf-theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = systemDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('neural-pdf-theme', next);
  };

  // Prevent flash of wrong theme on first render
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}   