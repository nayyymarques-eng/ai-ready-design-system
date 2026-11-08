import type { ChangeEventHandler } from 'react';

/** Turns a setting on or off at once. */
export type SwitchProps = { label: string; defaultChecked?: boolean; checked?: boolean; name?: string; onChange?: ChangeEventHandler<HTMLInputElement> };

export function Switch({ label, ...input }: SwitchProps) {
  return <label className="switch"><input type="checkbox" role="switch" {...input} /> {label}</label>;
}
