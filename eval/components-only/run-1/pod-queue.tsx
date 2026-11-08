import { AppShell, NavRail, PageHeader, ToggleGroup, Table, Tr, Td, Badge, Button, Avatar, Banner } from '../src';

export const title = 'Proof to review';

type Delivery = {
  parcel: string;
  route: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  day: string;
  time: string;
  disputed: boolean;
  photo: 'door' | 'porch' | 'locker' | null;
  signature: boolean;
  note: string;
};

const deliveries: Delivery[] = [
  { parcel: 'TV-48213-07', route: 'Route 14, Lisbon North', recipient: 'Inês Carvalho', address: 'Rua Morais Soares 112, 3.º Esq', driver: 'Rui Matos', initials: 'RM', day: 'Today', time: '09:42', disputed: true, photo: 'door', signature: true, note: 'Customer says it never arrived' },
  { parcel: 'TV-48197-02', route: 'Route 9, Almada', recipient: 'Pedro Antunes', address: 'Av. Dom Nuno Álvares Pereira 41', driver: 'Ana Ferreira', initials: 'AF', day: 'Today', time: '08:15', disputed: true, photo: null, signature: false, note: 'Customer says it never arrived' },
  { parcel: 'TV-48166-11', route: 'Route 14, Lisbon North', recipient: 'Marta Sousa', address: 'Rua Pascoal de Melo 7, R/C', driver: 'Rui Matos', initials: 'RM', day: 'Yesterday', time: '17:58', disputed: false, photo: 'porch', signature: false, note: 'Left with neighbour, no signature' },
  { parcel: 'TV-48140-04', route: 'Route 3, Oeiras', recipient: 'Lumen Studio Lda', address: 'Rua Calvet de Magalhães 245', driver: 'Tiago Lopes', initials: 'TL', day: 'Yesterday', time: '14:21', disputed: true, photo: 'locker', signature: true, note: 'Customer says the box was empty' },
  { parcel: 'TV-48121-09', route: 'Route 9, Almada', recipient: 'João Ribeiro', address: 'Rua Capitão Leitão 88, 2.º', driver: 'Ana Ferreira', initials: 'AF', day: 'Yesterday', time: '11:03', disputed: false, photo: null, signature: true, note: 'Camera failed, driver flagged it' },
  { parcel: 'TV-48097-01', route: 'Route 6, Amadora', recipient: 'Sofia Mendes', address: 'Av. Conde Castro Guimarães 19', driver: 'Bruno Pires', initials: 'BP', day: '5 Nov', time: '16:47', disputed: true, photo: 'door', signature: false, note: 'Customer says it never arrived' },
  { parcel: 'TV-48072-12', route: 'Route 3, Oeiras', recipient: 'Carlos Nunes', address: 'Rua Infanta D. Isabel 3', driver: 'Tiago Lopes', initials: 'TL', day: '5 Nov', time: '10:30', disputed: false, photo: 'porch', signature: false, note: 'Safe place, no signature taken' },
  { parcel: 'TV-48055-06', route: 'Route 6, Amadora', recipient: 'Beatriz Lima', address: 'Rua Elias Garcia 260, 5.º Dto', driver: 'Bruno Pires', initials: 'BP', day: '4 Nov', time: '19:12', disputed: false, photo: null, signature: false, note: 'No proof uploaded' },
  { parcel: 'TV-48031-03', route: 'Route 14, Lisbon North', recipient: 'Helena Costa', address: 'Rua Actor Taborda 15, 1.º', driver: 'Rui Matos', initials: 'RM', day: '4 Nov', time: '12:09', disputed: true, photo: 'locker', signature: true, note: 'Customer says it went to the wrong locker' },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

const photoLabel = { door: 'Parcel at a front door', porch: 'Parcel on a porch step', locker: 'Parcel in a parcel locker' } as const;

function Photo({ kind }: { kind: Delivery['photo'] }) {
  if (!kind) return <span className="pod-photo pod-photo--none" role="img" aria-label="No photo">No photo</span>;
  return (
    <span className="pod-photo" role="img" aria-label={photoLabel[kind]}>
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        {kind === 'door' && <>
          <rect x="12" y="4" width="24" height="40" className="pod-svg-line" />
          <circle cx="31" cy="25" r="1.5" className="pod-svg-ink" />
          <rect x="22" y="34" width="14" height="10" className="pod-svg-box" />
        </>}
        {kind === 'porch' && <>
          <rect x="0" y="36" width="48" height="12" className="pod-svg-line" />
          <rect x="8" y="26" width="18" height="10" className="pod-svg-box" />
          <rect x="28" y="30" width="10" height="6" className="pod-svg-box" />
        </>}
        {kind === 'locker' && <>
          <rect x="6" y="4" width="36" height="40" className="pod-svg-line" />
          <line x1="24" y1="4" x2="24" y2="44" className="pod-svg-stroke" />
          <line x1="6" y1="24" x2="42" y2="24" className="pod-svg-stroke" />
          <rect x="27" y="27" width="12" height="14" className="pod-svg-box" />
        </>}
      </svg>
    </span>
  );
}

function Missing({ d }: { d: Delivery }) {
  const items = [!d.photo && 'Photo', !d.signature && 'Signature'].filter(Boolean) as string[];
  if (!items.length) return <span className="pod-muted">Nothing missing</span>;
  return <span className="pod-badges">{items.map(i => <Badge key={i} tone="warning">{i}</Badge>)}</span>;
}

export default function PodQueue() {
  return (
    <AppShell nav={<NavRail brand="Tolvane" items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#', count: 18 },
      { label: 'Drivers', href: '#', count: 42 },
      { label: 'Parcels', href: '#' },
      { label: 'Proof to review', href: '#', count: counts.all, current: true },
      { label: 'Customers', href: '#' },
    ]} />}>
      <PageHeader
        title="Proof to review"
        status={<Badge tone="critical">{counts.disputed} disputed</Badge>}
        actions={<Button variant="secondary">Export list</Button>}
      />
      <p className="pod-intro">Deliveries a customer says never arrived, and deliveries marked delivered without a full proof. Newest first.</p>

      <Banner tone="warning"><p>2 disputes have waited 3 days or more. Customers are waiting for an answer on TV-48097-01 and TV-48031-03.</p></Banner>

      <div className="pod-filters">
        <ToggleGroup label="Show deliveries" items={[
          { label: 'All', count: counts.all, selected: true },
          { label: 'Disputed', count: counts.disputed },
          { label: 'Missing photo', count: counts.photo },
          { label: 'Missing signature', count: counts.signature },
        ]} />
      </div>

      <div className="pod-table">
        <Table caption={`${counts.all} deliveries to review`} columns={[
          { label: 'Parcel' }, { label: 'Recipient' }, { label: 'Driver' }, { label: 'Marked delivered' },
          { label: 'Photo' }, { label: 'Missing proof' }, { label: 'Action' },
        ]}>
          {deliveries.map(d => (
            <Tr key={d.parcel}>
              <Td>
                <span className="pod-strong">{d.parcel}</span>
                <span className="pod-sub">{d.route}</span>
                {d.disputed ? <span className="pod-flag"><Badge tone="critical">Disputed</Badge></span> : null}
              </Td>
              <Td><span className="pod-strong">{d.recipient}</span><span className="pod-sub">{d.address}</span></Td>
              <Td><span className="pod-person"><Avatar initials={d.initials} />{d.driver}</span></Td>
              <Td><span className="pod-strong">{d.day}, {d.time}</span><span className="pod-sub">{d.note}</span></Td>
              <Td><Photo kind={d.photo} /></Td>
              <Td><Missing d={d} /></Td>
              <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
            </Tr>
          ))}
        </Table>
      </div>

      <ul className="pod-cards" aria-label={`${counts.all} deliveries to review`}>
        {deliveries.map(d => (
          <li key={d.parcel} className="pod-card">
            <div className="pod-card__top">
              <Photo kind={d.photo} />
              <div className="pod-card__head">
                <span className="pod-strong">{d.parcel}</span>
                <span className="pod-sub">{d.recipient}, {d.address}</span>
                <span className="pod-badges">
                  {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
                  {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
                  {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
                </span>
              </div>
            </div>
            <p className="pod-sub">{d.note}</p>
            <div className="pod-card__foot">
              <span className="pod-person"><Avatar initials={d.initials} /><span><span className="pod-strong">{d.driver}</span><span className="pod-sub">Delivered {d.day.toLowerCase() === 'today' || d.day.toLowerCase() === 'yesterday' ? d.day.toLowerCase() : d.day}, {d.time}</span></span></span>
              <Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button>
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

export const css = `
.pod-intro { color: var(--muted); max-width: 640px; }
.pod-filters { display: flex; }
.pod-filters .toggle-group { flex-wrap: wrap; white-space: nowrap; }
.pod-table caption { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.pod-table td { vertical-align: top; }
.pod-table tr:last-child td { border-bottom: 0; }
.pod-strong { display: block; font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.pod-sub { display: block; font: var(--type-small); color: var(--muted); }
.pod-muted { font: var(--type-small); color: var(--muted); }
.pod-flag { display: block; margin-top: var(--s1); }
.pod-badges { display: flex; flex-wrap: wrap; gap: var(--s1); }
.pod-person { display: inline-flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.pod-photo { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; flex: none; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.pod-photo svg { width: 100%; height: 100%; }
.pod-photo--none { border-style: dashed; background: var(--surface); font: var(--type-small); color: var(--muted); text-align: center; line-height: 14px; padding: var(--s1); }
.pod-svg-line { fill: var(--surface); stroke: var(--line); stroke-width: 2; }
.pod-svg-stroke { stroke: var(--line); stroke-width: 2; }
.pod-svg-ink { fill: var(--muted); }
.pod-svg-box { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 1.5; }
.pod-cards { display: none; list-style: none; margin: 0; padding: 0; flex-direction: column; gap: var(--s3); }
.pod-card { background: var(--surface); border: var(--border); border-radius: var(--radius); padding: var(--s4); display: flex; flex-direction: column; gap: var(--s3); }
.pod-card__top { display: flex; gap: var(--s3); align-items: flex-start; }
.pod-card__head { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; }
.pod-card__foot { display: flex; align-items: center; justify-content: space-between; gap: var(--s3); }
@media (max-width: 960px) {
  .pod-table { display: none; }
  .pod-cards { display: flex; }
}
`;
