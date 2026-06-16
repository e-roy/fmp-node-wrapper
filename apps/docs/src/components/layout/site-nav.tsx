import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { LogoMark } from '@/components/layout/brand';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const GITHUB_URL = 'https://github.com/e-roy/fmp-node-wrapper';

export function SiteNav({ active }: { active?: 'api' | 'tools' }) {
  return (
    <nav className="f-nav">
      <Link className="f-logo" href="/">
        <LogoMark />
        <span className="f-logo-text">FMP Node Wrapper</span>
      </Link>
      <div className="f-navlinks">
        <Link href="/docs/api" className={active === 'api' ? 'active' : ''}>
          API Docs
        </Link>
        <Link href="/docs/tools" className={active === 'tools' ? 'active' : ''}>
          AI Tools
        </Link>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
        >
          <Github size={15} /> GitHub
        </a>
        <span className="f-nav-sep" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
