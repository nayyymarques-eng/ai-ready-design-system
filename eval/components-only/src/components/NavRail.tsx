/** The product name and the places in the product. */
export type NavItem = { label: string; href: string; count?: number; current?: boolean };

export function NavRail({ brand, items }: { brand: string; items: NavItem[] }) {
  return (
    <nav className="nav-rail" aria-label="Main">
      <span className="nav-rail__brand">{brand}</span>
      {items.map(i => (
        <a key={i.label} className={i.current ? 'nav-rail__item is-current' : 'nav-rail__item'} href={i.href} aria-current={i.current ? 'page' : undefined}>
          {i.label}{i.count !== undefined ? <> <span className="numeral">{i.count}</span></> : null}
        </a>
      ))}
    </nav>
  );
}
