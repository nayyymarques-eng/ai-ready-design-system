import type { ReactNode } from 'react';

/** The screen's title and its main actions. */
export function PageHeader({ title, status, actions }: { title: string; status?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="page-header">
      {status ? <div className="row"><h1 className="page-header__title">{title}</h1>{status}</div> : <h1 className="page-header__title">{title}</h1>}
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  );
}
