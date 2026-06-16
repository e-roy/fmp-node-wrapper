'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type TocItem = { id: string; text: string; sub: boolean };

// Scroll-spy "On this page" TOC. Reads the rendered heading set from the DOM on
// mount (after MDX renders) so it works for every docs page without build-time
// extraction. Requires rehype-slug to have added ids to h2/h3.
export function DocsToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const main = document.querySelector('.f-docs-main');
    if (!main) return;

    const headings = Array.from(
      main.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'),
    );
    const next: TocItem[] = headings.map(h => ({
      id: h.id,
      text: h.textContent || '',
      sub: h.tagName.toLowerCase() === 'h3',
    }));
    // Deriving TOC state from the rendered DOM on mount/route-change is the whole
    // purpose of this effect; the setState-in-effect calls are intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(next);
    setActive(next[0]?.id || '');

    if (!headings.length) return;

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach(h => obs.observe(h));
    return () => obs.disconnect();
  }, [pathname]);

  if (!items.length) return <aside className="f-docs-toc" aria-hidden />;

  return (
    <aside className="f-docs-toc">
      <div className="f-toc-title">On this page</div>
      <nav className="f-toc">
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={(item.sub ? 'sub' : '') + (item.id === active ? ' on' : '')}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
