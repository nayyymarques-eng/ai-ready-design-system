import type { ReactNode } from 'react';

/** Asks for a confirmation or a short answer before an action. */
export type DialogProps = { id: string; title: string; open?: boolean; children?: ReactNode; actions: ReactNode };

export function Dialog({ id, title, open = false, children, actions }: DialogProps) {
  return (
    <div className="dialog-backdrop" hidden={!open}>
      <div className="dialog" role="dialog" aria-labelledby={`${id}-title`} id={id}>
        <h2 className="dialog__title" id={`${id}-title`}>{title}</h2>
        {children}
        <div className="dialog__actions">{actions}</div>
      </div>
    </div>
  );
}
