'use client';

import React, { useState } from 'react';
import { DocsHeader } from '@/components/docs/docs-header';
import { DocsSidebar, type NavGroup } from '@/components/docs/docs-sidebar';
import { DocsToc } from '@/components/docs/docs-toc';

export function DocsLayout({
  section,
  accent,
  groups,
  children,
}: {
  section: 'api' | 'tools';
  accent: 'emerald' | 'violet';
  groups: NavGroup[];
  children: React.ReactNode;
}) {
  const [menu, setMenu] = useState(false);
  const close = () => setMenu(false);

  return (
    <div
      className="flex flex-col min-h-screen"
      data-accent={accent === 'violet' ? 'violet' : undefined}
    >
      <DocsHeader section={section} onMenu={() => setMenu(true)} />
      <div className="f-docs-row">
        <div className={'f-docs-overlay' + (menu ? ' show' : '')} onClick={close} />
        <DocsSidebar groups={groups} open={menu} onClose={close} />
        <main className="f-prose f-docs-main">{children}</main>
        <DocsToc />
      </div>
    </div>
  );
}
