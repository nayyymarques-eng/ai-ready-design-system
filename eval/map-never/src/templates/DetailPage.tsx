import type { ReactNode } from 'react';
import { AppShell } from '../components/AppShell';
import { PageHeader } from '../components/PageHeader';

/** A screen about one item: its content in the main column, its facts and history in the side column. Contract: contracts/detail-page.md */
export type DetailPageProps = {
  nav: ReactNode;
  title: string;
  status?: ReactNode;
  actions?: ReactNode;
  /** Sections with cards, tables or lists: what the item is. */
  main: ReactNode;
  /** Sections with lists: facts about the item, who is involved, and its history. */
  aside?: ReactNode;
};

export function DetailPage({ nav, title, status, actions, main, aside }: DetailPageProps) {
  return (
    <AppShell nav={nav}>
      <div className="template" data-template="detail-page">
        <PageHeader title={title} status={status} actions={actions} />
        <div className="template__columns">
          <div className="template__main">{main}</div>
          {aside ? <div className="template__aside">{aside}</div> : null}
        </div>
      </div>
    </AppShell>
  );
}
