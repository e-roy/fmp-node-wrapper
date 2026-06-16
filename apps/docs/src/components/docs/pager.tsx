import React from 'react';
import Link from 'next/link';

type PageRef = { name: string; href: string };

export function Pager({ prev, next }: { prev?: PageRef; next?: PageRef }) {
  return (
    <div className="f-pager" style={{ marginTop: 18 }}>
      {prev ? (
        <Link className="f-page-link" href={prev.href}>
          <span className="dir">← Previous</span>
          <span className="name">{prev.name}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="f-page-link next" href={next.href}>
          <span className="dir">Next →</span>
          <span className="name">{next.name}</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
