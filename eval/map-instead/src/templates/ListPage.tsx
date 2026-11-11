import type { ReactNode } from 'react';
import { AppShell } from '../components/AppShell';
import { PageHeader } from '../components/PageHeader';

/** A screen that lists many items of one kind, to find one and open it. Contract: contracts/list-page.md */
export type ListPageProps = {
  nav: ReactNode;
  title: string;
  status?: ReactNode;
  actions?: ReactNode;
  /** One toggle group. On a phone it scrolls on its own, so the page never does. */
  filters?: ReactNode;
  /** The table, or the empty state when there is nothing to list. */
  children: ReactNode;
};

export function ListPage({ nav, title, status, actions, filters, children }: ListPageProps) {
  return (
    <AppShell nav={nav}>
      <div className="template" data-template="list-page">
        <PageHeader title={title} status={status} actions={actions} />
        {filters ? <div className="template__filters">{filters}</div> : null}
        {children}
      </div>
    </AppShell>
  );
}
