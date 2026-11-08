import { AppShell, NavRail, PageHeader, Badge, Button, ToggleGroup, Table, Tr, Td, List, ListItem, Avatar, Stack } from '../src';

export const title = 'Proof to review — Tolvane';

type Delivery = {
  parcel: string;
  route: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  deliveredShort: string;
  photo: string | null;
  signature: boolean;
  disputed: boolean;
  note: string;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', route: 'Route 12, Leith', recipient: 'Morag Henderson', address: '14 Great Junction St, flat 3F2', driver: 'Callum Reid', initials: 'CR', delivered: 'Today, 09:42', deliveredShort: 'Today 09:42', photo: 'Parcel at a blue front door', signature: false, disputed: true, note: 'Customer says nothing arrived' },
  { parcel: 'TLV-48197', route: 'Route 4, Morningside', recipient: 'Priya Natarajan', address: '22 Comiston Rd', driver: 'Ewa Kowalska', initials: 'EK', delivered: 'Today, 08:15', deliveredShort: 'Today 08:15', photo: null, signature: true, disputed: true, note: 'Customer says nothing arrived' },
  { parcel: 'TLV-48166', route: 'Route 7, Gorgie', recipient: 'Daniel Okafor', address: '5 Wheatfield Pl', driver: 'Tom Baxter', initials: 'TB', delivered: 'Yesterday, 17:58', deliveredShort: 'Yest. 17:58', photo: null, signature: false, disputed: false, note: 'Left in safe place, no proof taken' },
  { parcel: 'TLV-48140', route: 'Route 12, Leith', recipient: 'Sinead Gallagher', address: '81 Easter Rd', driver: 'Callum Reid', initials: 'CR', delivered: 'Yesterday, 14:30', deliveredShort: 'Yest. 14:30', photo: 'Parcel in a building lobby', signature: true, disputed: true, note: 'Customer says it went to a neighbour' },
  { parcel: 'TLV-48122', route: 'Route 2, Stockbridge', recipient: 'Arjun Mehta', address: '3 Raeburn Pl', driver: 'Lucy Fraser', initials: 'LF', delivered: 'Yesterday, 11:06', deliveredShort: 'Yest. 11:06', photo: 'Parcel beside a green gate', signature: false, disputed: false, note: 'Signature skipped at the door' },
  { parcel: 'TLV-48098', route: 'Route 9, Portobello', recipient: 'Hannah Whitlock', address: '40 Bath St', driver: 'Ewa Kowalska', initials: 'EK', delivered: '6 Nov, 16:44', deliveredShort: '6 Nov 16:44', photo: null, signature: true, disputed: false, note: 'Photo failed to upload' },
  { parcel: 'TLV-48071', route: 'Route 4, Morningside', recipient: 'Grant MacLeod', address: '9 Canaan Ln', driver: 'Tom Baxter', initials: 'TB', delivered: '6 Nov, 10:20', deliveredShort: '6 Nov 10:20', photo: 'Parcel on a porch step', signature: true, disputed: true, note: 'Customer says the parcel was damaged and taken back' },
  { parcel: 'TLV-48035', route: 'Route 7, Gorgie', recipient: 'Fatima Zahra', address: '117 Dalry Rd', driver: 'Lucy Fraser', initials: 'LF', delivered: '5 Nov, 15:12', deliveredShort: '5 Nov 15:12', photo: 'Parcel behind a recycling bin', signature: false, disputed: true, note: 'Customer says nothing arrived' },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

function Thumb({ photo }: { photo: string | null }) {
  if (!photo) return <span className="pod-thumb pod-thumb--none" role="img" aria-label="No photo">None</span>;
  return <span className="pod-thumb" role="img" aria-label={`Proof photo: ${photo}`}><span className="pod-thumb__parcel" /></span>;
}

function Issues({ d }: { d: Delivery }) {
  return (
    <span className="pod-issues">
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
    </span>
  );
}

export default function PodQueue() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Proof to review', href: '#', count: counts.all, current: true },
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Routes', href: '#', count: 18 },
            { label: 'Customers', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof to review"
        status={<Badge tone="critical">{`${counts.disputed} disputed`}</Badge>}
        actions={<Button variant="secondary">Export list</Button>}
      />
      <p className="pod-intro">Deliveries a customer disputes, or where the driver's photo or signature is missing. Oldest disputes need an answer within 48 hours.</p>

      <Stack>
        <div className="pod-filters">
          <ToggleGroup
            label="Show"
            items={[
              { label: 'All', count: counts.all, selected: true },
              { label: 'Disputed', count: counts.disputed },
              { label: 'Missing photo', count: counts.photo },
              { label: 'Missing signature', count: counts.signature },
            ]}
          />
        </div>

        <div className="pod-desktop">
          <Table
            caption="8 deliveries to review, newest first"
            columns={[
              { label: 'Parcel' },
              { label: 'Recipient' },
              { label: 'Driver' },
              { label: 'Marked delivered' },
              { label: 'Photo' },
              { label: 'Needs review' },
              { label: 'Action' },
            ]}
          >
            {deliveries.map(d => (
              <Tr key={d.parcel}>
                <Td><span className="pod-strong">{d.parcel}</span><span className="pod-sub">{d.route}</span></Td>
                <Td><span className="pod-strong">{d.recipient}</span><span className="pod-sub">{d.address}</span></Td>
                <Td><span className="pod-driver"><Avatar initials={d.initials} />{d.driver}</span></Td>
                <Td><span className="pod-nowrap">{d.delivered}</span></Td>
                <Td><Thumb photo={d.photo} /></Td>
                <Td><Issues d={d} /><span className="pod-sub">{d.note}</span></Td>
                <Td><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
              </Tr>
            ))}
          </Table>
        </div>

        <div className="pod-mobile">
          <List>
            {deliveries.map(d => (
              <ListItem key={d.parcel}>
                <div className="pod-card">
                  <Thumb photo={d.photo} />
                  <div className="pod-card__body">
                    <span className="pod-card__top"><span className="pod-strong">{d.parcel}</span><span className="pod-sub">{d.deliveredShort}</span></span>
                    <span>{d.recipient}</span>
                    <span className="pod-sub">Driver: {d.driver}</span>
                    <Issues d={d} />
                    <span className="pod-sub">{d.note}</span>
                    <span><Button variant="secondary" aria-label={`Review ${d.parcel}`}>Review</Button></span>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      </Stack>
    </AppShell>
  );
}

export const css = `
.nav-rail__item { white-space: nowrap; }
.pod-intro { color: var(--muted); max-width: 640px; margin-top: calc(var(--s3) * -1); }
.pod-filters { max-width: 100%; overflow-x: auto; }
.pod-filters .toggle-group__item { white-space: nowrap; }
.pod-desktop caption { text-align: left; font: var(--type-small); color: var(--muted); padding: var(--s3) var(--s4) 0; }
.pod-desktop td { vertical-align: top; }
.pod-strong { display: block; font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.pod-sub { display: block; font: var(--type-small); color: var(--muted); margin-top: 2px; }
.pod-nowrap { white-space: nowrap; }
.pod-driver { display: inline-flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.pod-issues { display: flex; flex-wrap: wrap; gap: var(--s1); }
.pod-issues .badge { white-space: nowrap; }

.pod-thumb { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 42px; flex: none; border-radius: var(--radius); overflow: hidden; border: var(--border);
  background: linear-gradient(180deg, var(--tint-info) 0 55%, var(--line) 55% 100%); }
.pod-thumb__parcel { position: absolute; left: 50%; bottom: 6px; width: 22px; height: 16px; margin-left: -11px; border-radius: 2px; background: var(--tint-warning); border: 1px solid var(--warning); }
.pod-thumb__parcel::after { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 3px; margin-left: -1.5px; background: var(--warning); opacity: .5; }
.pod-thumb--none { background: var(--surface-sunken); border: 1px dashed var(--muted); font: var(--type-small); color: var(--muted); }

.pod-mobile { display: none; }
.pod-card { display: flex; gap: var(--s3); align-items: flex-start; width: 100%; }
.pod-card__body { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; flex: 1; }
.pod-card__top { display: flex; justify-content: space-between; align-items: baseline; gap: var(--s2); }
.pod-card__body .btn { margin-top: var(--s2); }

@media (max-width: 960px) {
  .pod-desktop { display: none; }
  .pod-mobile { display: block; }
}
`;
