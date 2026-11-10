import type { ReactNode, MouseEventHandler } from 'react';

/** Starts one action. The variant says how important the action is. Contract: contracts/button.md */
export type ButtonProps = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  children: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  'aria-haspopup'?: 'dialog' | 'menu';
  id?: string;
};

export function Button({ variant, children, type = 'button', ...rest }: ButtonProps) {
  return <button className={`btn btn--${variant}`} type={type} {...rest}>{children}</button>;
}
