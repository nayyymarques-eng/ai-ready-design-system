import type { ChangeEventHandler } from 'react';

/** One yes or no choice in a form. Contract: contracts/checkbox.md */
export type CheckboxProps = { label: string; defaultChecked?: boolean; checked?: boolean; name?: string; onChange?: ChangeEventHandler<HTMLInputElement> };

export function Checkbox({ label, ...input }: CheckboxProps) {
  return <label className="checkbox"><input type="checkbox" {...input} /> {label}</label>;
}
