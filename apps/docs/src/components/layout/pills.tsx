'use client';

import React, { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function InstallPill({
  command,
  style,
}: {
  command: string;
  style?: React.CSSProperties;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="f-install" style={style}>
      <span className="ps1">$</span>
      <span className="cmd">{command}</span>
      <button className="f-copy" onClick={copy} aria-label="Copy install command" type="button">
        {copied ? (
          <span className="f-ok">
            <Check size={14} />
          </span>
        ) : (
          <Copy size={13} />
        )}
      </button>
    </div>
  );
}
