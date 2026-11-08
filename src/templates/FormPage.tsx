import type { ReactNode } from 'react';
import { AppShell } from '../components/AppShell';
import { PageHeader } from '../components/PageHeader';

/** A screen where people change settings: form sections, each in a card, saved from the header. Contract: contracts/form-page.md */
export type FormPageProps = {
  nav: ReactNode;
  title: string;
  /** Save, and at most one more action. */
  actions?: ReactNode;
  /** Sections, each with one card of fields, switches or checkboxes. A danger zone goes last. */
  children: ReactNode;
};

export function FormPage({ nav, title, actions, children }: FormPageProps) {
  return (
    <AppShell nav={nav}>
      <div className="template template--form" data-template="form-page">
        <PageHeader title={title} actions={actions} />
        {children}
      </div>
    </AppShell>
  );
}
