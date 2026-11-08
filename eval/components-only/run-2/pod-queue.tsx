import { AppShell, NavRail, PageHeader, Badge, Button, ToggleGroup, Table, Tr, Td, Banner, Avatar, Section } from '../src';

export const title = 'Proof to review — Tolvane';

type Delivery = {
  parcel: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  deliveredDay: string;
  disputed: boolean;
  disputeNote?: string;
  missingPhoto: boolean;
  missingSignature: boolean;
  scene: 'door' | 'porch' | 'locker' | 'desk';
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213-07', recipient: 'Marta Kowalczyk', address: '14 Albion Rd, Leeds LS6', driver: 'Daniel Okafor', initials: 'DO', delivered: '09:42', deliveredDay: 'Today', disputed: true, disputeNote: 'Says it never arrived', missingPhoto: false, missingSignature: true, scene: 'door' },
  { parcel: 'TLV-48197-02', recipient: 'Hollins & Reed Ltd', address: 'Unit 3, Kirkstall Trade Park', driver: 'Priya Natarajan', initials: 'PN', delivered: '08:15', deliveredDay: 'Today', disputed: false, missingPhoto: true, missingSignature: false, scene: 'desk' },
  { parcel: 'TLV-48160-11', recipient: 'James Whitfield', address: '2 Cardigan Lane, Leeds LS4', driver: 'Daniel Okafor', initials: 'DO', delivered: '17:58', deliveredDay: 'Yesterday', disputed: true, disputeNote: 'Says it never arrived', missingPhoto: false, missingSignature: false, scene: 'porch' },
  { parcel: 'TLV-48144-05', recipient: 'Aisha Rahman', address: 'Flat 9, 40 Hyde Park Rd', driver: 'Tomasz Nowak', initials: 'TN', delivered: '16:21', deliveredDay: 'Yesterday', disputed: true, disputeNote: 'Left with wrong neighbour', missingPhoto: true, missingSignature: true, scene: 'door' },
  { parcel: 'TLV-48139-01', recipient: 'Greenway Pharmacy', address: '118 Otley Rd, Leeds LS16', driver: 'Priya Natarajan', initials: 'PN', delivered: '14:07', deliveredDay: 'Yesterday', disputed: false, missingPhoto: false, missingSignature: true, scene: 'desk' },
  { parcel: 'TLV-48102-09', recipient: 'Oliver Brennan', address: '7 Ash Grove, Leeds LS6', driver: 'Sam Achterberg', initials: 'SA', delivered: '11:33', deliveredDay: 'Mon 2 Nov', disputed: true, disputeNote: 'Says it never arrived', missingPhoto: false, missingSignature: false, scene: 'locker' },
  { parcel: 'TLV-48095-03', recipient: 'Lucía Fernández', address: '31 Brudenell Mount, LS6', driver: 'Tomasz Nowak', initials: 'TN', delivered: '10:02', deliveredDay: 'Mon 2 Nov', disputed: false, missingPhoto: true, missingSignature: false, scene: 'porch' },
  { parcel: 'TLV-48071-04', recipient: 'Northgate Dental', address: '5 Headingley Lane, LS6', driver: 'Sam Achterberg', initials: 'SA', delivered: '15:49', deliveredDay: 'Sat 31 Oct', disputed: true, disputeNote: 'Parcel damaged, no photo', missingPhoto: true, missingSignature: false, scene: 'desk' },
  { parcel: 'TLV-48066-12', recipient: 'Ben Ashworth', address: '22 Royal Park Ave, LS6', driver: 'Daniel Okafor', initials: 'DO', delivered: '13:26', deliveredDay: 'Sat 31 Oct', disputed: false, missingPhoto: false, missingSignature: true, scene: 'door' },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => d.missingPhoto).length,
  signature: deliveries.filter(d => d.missingSignature).length,
};

/** A small drawn stand-in for the driver's proof photo. No image files: the scene is drawn with tokens. */
function ProofPhoto({ d }: { d: Delivery }) {
  if (d.missingPhoto) {
    return <span className="pod-photo pod-photo--missing" role="img" aria-label="No photo taken">No photo</span>;
  }
  return (
    <span className="pod-photo" role="img" aria-label={`Proof photo: parcel at ${d.scene === 'locker' ? 'a parcel locker' : d.scene === 'desk' ? 'a reception desk' : `the ${d.scene}`}`}>
      <svg viewBox="0 0 64 48" aria-hidden="true" focusable="false">
        {d.scene === 'door' && <>
          <rect x="22" y="4" width="22" height="40" rx="1" className="pod-photo__frame" />
          <circle cx="40" cy="25" r="1.4" className="pod-photo__detail" />
          <rect x="8" y="34" width="12" height="10" rx="1" className="pod-photo__box" />
        </>}
        {d.scene === 'porch' && <>
          <rect x="4" y="38" width="56" height="6" className="pod-photo__frame" />
          <rect x="12" y="6" width="4" height="32" className="pod-photo__frame" />
          <rect x="48" y="6" width="4" height="32" className="pod-photo__frame" />
          <rect x="26" y="26" width="14" height="12" rx="1" className="pod-photo__box" />
        </>}
        {d.scene === 'locker' && <>
          <rect x="10" y="4" width="44" height="40" rx="1" className="pod-photo__frame" />
          <line x1="32" y1="4" x2="32" y2="44" className="pod-photo__line" />
          <line x1="10" y1="18" x2="54" y2="18" className="pod-photo__line" />
          <line x1="10" y1="31" x2="54" y2="31" className="pod-photo__line" />
          <rect x="35" y="21" width="16" height="8" rx="1" className="pod-photo__box" />
        </>}
        {d.scene === 'desk' && <>
          <rect x="4" y="28" width="56" height="16" className="pod-photo__frame" />
          <rect x="22" y="14" width="18" height="14" rx="1" className="pod-photo__box" />
        </>}
      </svg>
    </span>
  );
}

function Missing({ d }: { d: Delivery }) {
  if (!d.missingPhoto && !d.missingSignature) return <span className="pod-muted">Nothing missing</span>;
  return (
    <span className="pod-badges">
      {d.missingPhoto ? <Badge tone="warning">Photo</Badge> : null}
      {d.missingSignature ? <Badge tone="warning">Signature</Badge> : null}
    </span>
  );
}

function Reason({ d }: { d: Delivery }) {
  return d.disputed
    ? <span className="pod-cell"><Badge tone="critical">Disputed</Badge><span className="pod-muted">{d.disputeNote}</span></span>
    : <Badge>Incomplete proof</Badge>;
}

export const css = `
.pod-intro { color: var(--muted); max-width: 60ch; }
.pod-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--s3); }
.pod-toolbar .toggle-group { flex-wrap: wrap; }
.pod-cell { display: flex; flex-direction: column; gap: var(--s1); align-items: flex-start; }
.pod-strong { font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.pod-muted { font: var(--type-small); color: var(--muted); }
.pod-person { display: flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.pod-badges { display: inline-flex; flex-wrap: wrap; gap: var(--s1); }
.pod-photo { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 48px; flex: none; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.pod-photo svg { width: 100%; height: 100%; display: block; }
.pod-photo__frame { fill: var(--line); }
.pod-photo__line { stroke: var(--surface-sunken); stroke-width: 1.5; }
.pod-photo__detail { fill: var(--muted); }
.pod-photo__box { fill: var(--muted); }
.pod-photo--missing { border-style: dashed; font: var(--type-small); color: var(--muted); background: var(--surface); }
.pod-cards { display: none; list-style: none; margin: 0; padding: 0; flex-direction: column; gap: var(--s3); }
.pod-card { background: var(--surface); border: var(--border); border-radius: var(--radius); padding: var(--s4); display: flex; flex-direction: column; gap: var(--s3); }
.pod-card__top { display: flex; gap: var(--s3); align-items: flex-start; }
.pod-card__head { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; flex: 1; align-items: flex-start; }
.pod-table .badge, .pod-nowrap { white-space: nowrap; }
.nav-rail__item { white-space: nowrap; }
.pod-card__facts { display: grid; grid-template-columns: auto 1fr; gap: var(--s1) var(--s3); margin: 0; }
.pod-card__facts dt { font: var(--type-small); color: var(--muted); }
.pod-card__facts dd { margin: 0; color: var(--ink); }
.pod-card .btn { justify-content: center; }
@media (max-width: 720px) {
  .pod-table { display: none; }
  .pod-cards { display: flex; }
}
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#' },
      { label: 'Drivers', href: '#', count: 38 },
      { label: 'Proof to review', href: '#', count: counts.all, current: true },
      { label: 'Customers', href: '#' },
      { label: 'Settings', href: '#' },
    ]}
  />
);

export default function PodQueue() {
  return (
    <AppShell nav={nav}>
      <PageHeader
        title="Proof to review"
        status={<Badge tone="critical">{`${counts.disputed} disputed`}</Badge>}
        actions={<Button variant="secondary">Export list</Button>}
      />
      <p className="pod-intro">
        Deliveries a customer says never arrived, or where the driver did not collect a photo or a signature. Open one to check the proof and decide.
      </p>

      <Banner tone="warning">
        <p>2 disputes are older than 3 days. Customers are waiting for an answer on TLV-48102-09 and TLV-48071-04.</p>
      </Banner>

      <Section title="Deliveries" titleId="deliveries">
        <div className="pod-toolbar">
          <ToggleGroup
            label="Show"
            items={[
              { label: 'All', count: counts.all, selected: true },
              { label: 'Disputed', count: counts.disputed },
              { label: 'Missing photo', count: counts.photo },
              { label: 'Missing signature', count: counts.signature },
            ]}
          />
          <span className="pod-muted">Newest first</span>
        </div>

        <div className="pod-table">
          <Table
            columns={[
              { label: 'Parcel and reason' },
              { label: 'Recipient' },
              { label: 'Driver' },
              { label: 'Marked delivered' },
              { label: 'Photo' },
              { label: 'Missing' },
              { label: 'Review' },
            ]}
          >
            {deliveries.map(d => (
              <Tr key={d.parcel}>
                <Td><span className="pod-cell"><span className="pod-strong">{d.parcel}</span><Reason d={d} /></span></Td>
                <Td>
                  <span className="pod-cell">
                    <span className="pod-strong">{d.recipient}</span>
                    <span className="pod-muted">{d.address}</span>
                  </span>
                </Td>
                <Td><span className="pod-person"><Avatar initials={d.initials} />{d.driver}</span></Td>
                <Td>
                  <span className="pod-cell">
                    <span className="pod-nowrap">{d.deliveredDay}</span>
                    <span className="pod-muted">{d.delivered}</span>
                  </span>
                </Td>
                <Td><ProofPhoto d={d} /></Td>
                <Td><Missing d={d} /></Td>
                <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
              </Tr>
            ))}
          </Table>
        </div>

        <ul className="pod-cards" aria-label="Deliveries">
          {deliveries.map(d => (
            <li key={d.parcel} className="pod-card">
              <div className="pod-card__top">
                <ProofPhoto d={d} />
                <div className="pod-card__head">
                  <span className="pod-strong">{d.parcel}</span>
                  <Reason d={d} />
                </div>
              </div>
              <dl className="pod-card__facts">
                <dt>Recipient</dt><dd>{d.recipient}</dd>
                <dt>Driver</dt><dd>{d.driver}</dd>
                <dt>Delivered</dt><dd>{d.deliveredDay}, {d.delivered}</dd>
                <dt>Missing</dt><dd><Missing d={d} /></dd>
              </dl>
              <Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button>
            </li>
          ))}
        </ul>
      </Section>
    </AppShell>
  );
}
