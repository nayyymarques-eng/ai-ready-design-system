import type { ReactNode } from 'react';

/** What a place shows before it has content, and the action that fills it. */
export type EmptyStateProps = { title: string; children?: ReactNode; action?: ReactNode };

export function EmptyState({ title, children, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      {children}
      {action}
    </div>
  );
}
