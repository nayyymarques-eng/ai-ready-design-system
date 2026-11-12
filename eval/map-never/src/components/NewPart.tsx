import type { ReactNode, ElementType } from 'react';

/**
 * The one way in for a part the system doesn't have (rule CMP-03).
 * job and why are required, so an unlabelled new part doesn't compile.
 * base names the component it refines, when it starts from one.
 * Its classes, here and inside it, start with x-.
 */
export type NewPartProps = {
  name: string;
  job: string;
  why: string;
  base?: string;
  className: `x-${string}`;
  as?: ElementType;
  role?: string;
  'aria-label'?: string;
  children?: ReactNode;
};

export function NewPart({ name, job, why, base, className, as: Tag = 'div', children, ...rest }: NewPartProps) {
  return <Tag className={className} data-new={name} data-job={job} data-why={why} data-base={base} {...rest}>{children}</Tag>;
}
