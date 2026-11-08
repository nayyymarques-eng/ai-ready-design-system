/** A person's initials. */
export type AvatarProps = { initials: string; label?: string };

export function Avatar({ initials, label }: AvatarProps) {
  return <span className="avatar" aria-label={label}>{initials}</span>;
}
