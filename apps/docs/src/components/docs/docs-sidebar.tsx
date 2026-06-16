'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

export type NavItem = { name: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };

export function DocsSidebar({
  groups,
  open,
  onClose,
}: {
  groups: NavGroup[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={'f-docs-sidebar' + (open ? ' open' : '')}>
      <button className="f-side-close" onClick={onClose} aria-label="Close menu" type="button">
        <X size={16} />
      </button>
      {groups.map(group => (
        <div className="f-side-group" key={group.title}>
          <div className="f-side-title">{group.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={'f-side-item' + (pathname === item.href ? ' on' : '')}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
