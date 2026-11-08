import type { ReactNode } from 'react';

/** The frame of every screen: the nav rail and the page. */
export function AppShell({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  return <div className="app">{nav}<main className="page">{children}</main></div>;
}
