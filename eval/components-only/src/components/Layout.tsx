import type { ReactNode } from 'react';

/** Sections, stacks, rows and grids: how components sit together. */
export function Section({ title, titleId, children }: { title?: string; titleId?: string; children: ReactNode }) {
  return (
    <section className="section" aria-labelledby={title ? titleId : undefined}>
      {title ? <h2 className="section__title" id={titleId}>{title}</h2> : null}
      {children}
    </section>
  );
}
export function Stack({ children }: { children: ReactNode }) { return <div className="stack">{children}</div>; }
export function Row({ children }: { children: ReactNode }) { return <div className="row">{children}</div>; }
export function Grid({ children }: { children: ReactNode }) { return <div className="grid">{children}</div>; }
