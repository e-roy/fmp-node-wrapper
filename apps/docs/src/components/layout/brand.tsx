import React from 'react';

// Small shared brand primitives ported from the redesign prototypes.

export function LogoMark() {
  return <span className="f-mark">F</span>;
}

export function Chip({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: 'acc' | 'vio';
}) {
  return <span className={`f-chip${variant ? ` ${variant}` : ''}`}>{children}</span>;
}

export function GlyphChip({ children }: { children: React.ReactNode }) {
  return <span className="f-glyph">{children}</span>;
}

export function Tick({ violet = false }: { violet?: boolean }) {
  return (
    <span className="tick" style={violet ? { color: 'var(--vio)' } : undefined}>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 7l3 3 5-7"></path>
      </svg>
    </span>
  );
}
