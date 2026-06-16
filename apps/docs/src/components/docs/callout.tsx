import React from 'react';

export function Callout({
  kind = 'info',
  children,
}: {
  kind?: 'info' | 'warn';
  children: React.ReactNode;
}) {
  return (
    <div className={`f-callout ${kind}`}>
      <span className="ico">{kind === 'warn' ? '!' : 'i'}</span>
      <span>{children}</span>
    </div>
  );
}
