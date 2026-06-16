'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR-safe "mounted" flag is the documented next-themes pattern for reading
    // `resolvedTheme` without hydration mismatch. Intentional setState-in-effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      className="f-theme"
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      title="Toggle theme"
    >
      {/* default to sun (dark theme is the default) until mounted to avoid flash */}
      {mounted && !isDark ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
