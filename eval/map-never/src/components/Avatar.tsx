/** A person's initials. Contract: contracts/avatar.md */
export type AvatarProps = { initials: string; label?: string };

export function Avatar({ initials, label }: AvatarProps) {
  return <span className="avatar" role={label ? 'img' : undefined} aria-label={label}>{initials}</span>;
}
