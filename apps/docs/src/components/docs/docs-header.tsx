'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, Github } from 'lucide-react';
import { LogoMark } from '@/components/layout/brand';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const GITHUB_URL = 'https://github.com/e-roy/fmp-node-wrapper';

export function DocsHeader({
  section,
  onMenu,
}: {
  section: 'api' | 'tools';
  onMenu: () => void;
}) {
  const seg = (
    label: string,
    href: string,
    key: 'api' | 'tools',
    accentVar: string,
    dimVar: string,
  ) => (
    <Link
      href={href}
      style={{
        fontSize: 13.5,
        padding: '5px 12px',
        borderRadius: 7,
        fontWeight: 550,
        background: section === key ? dimVar : 'transparent',
        color: section === key ? accentVar : 'var(--t3)',
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav className="f-nav f-docs-nav" style={{ height: 56, gap: 18 }}>
      <button className="f-menu-btn" onClick={onMenu} aria-label="Open menu" type="button">
        <Menu size={18} />
      </button>
      <Link className="f-logo" href="/">
        <LogoMark />
        <span className="f-logo-text">FMP Node Wrapper</span>
      </Link>
      <span className="f-nav-sep f-hide-sm" />
      <div style={{ display: 'flex', gap: 4 }}>
        {seg('API', '/docs/api', 'api', 'var(--acc)', 'var(--acc-dim)')}
        {seg('AI Tools', '/docs/tools', 'tools', 'var(--vio)', 'var(--vio-dim)')}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="f-search f-hide-md">
          <Search size={13} />
          <span>Search docs…</span>
          <span className="f-kbd">⌘K</span>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--t2)', display: 'flex' }}
          aria-label="GitHub"
        >
          <Github size={15} />
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
