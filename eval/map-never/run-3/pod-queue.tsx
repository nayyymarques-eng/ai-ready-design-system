import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, Row, NewPart } from '../src';

export const title = 'Proof to review';

type Delivery = {
  parcel: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
  reason: string;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', recipient: 'Hannah Okafor', address: '14 Linden Row, Leeds LS6', driver: 'Marek Nowak', initials: 'MN', delivered: 'Today, 09:42', disputed: true, photo: true, signature: false, reason: 'Says it never arrived' },
  { parcel: 'TLV-48197', recipient: 'Tom Ashworth', address: 'Flat 3, 88 Kirkstall Rd, Leeds LS4', driver: 'Priya Desai', initials: 'PD', delivered: 'Today, 08:15', disputed: true, photo: false, signature: false, reason: 'Says it never arrived' },
  { parcel: 'TLV-48160', recipient: 'Greenway Dental', address: '2 Park Square East, Leeds LS1', driver: 'Liam Carter', initials: 'LC', delivered: 'Yesterday, 17:58', disputed: false, photo: true, signature: false, reason: 'Left with reception' },
  { parcel: 'TLV-48152', recipient: 'Sofia Brennan', address: '41 Cardigan Lane, Leeds LS4', driver: 'Marek Nowak', initials: 'MN', delivered: 'Yesterday, 16:20', disputed: true, photo: true, signature: true, reason: 'Says it was left at the wrong door' },
  { parcel: 'TLV-48139', recipient: 'David Mensah', address: '9 Ash Grove, Headingley LS6', driver: 'Aisha Rahman', initials: 'AR', delivered: 'Yesterday, 14:03', disputed: false, photo: false, signature: true, reason: 'Photo did not upload' },
  { parcel: 'TLV-48121', recipient: 'Clare Whitfield', address: '27 Otley Old Rd, Leeds LS16', driver: 'Priya Desai', initials: 'PD', delivered: 'Yesterday, 11:37', disputed: true, photo: true, signature: false, reason: 'Says it never arrived' },
  { parcel: 'TLV-48098', recipient: 'Northside Books', address: '113 Call Lane, Leeds LS1', driver: 'Liam Carter', initials: 'LC', delivered: '9 Nov, 15:44', disputed: false, photo: false, signature: false, reason: 'Driver skipped both steps' },
  { parcel: 'TLV-48077', recipient: 'Rui Fernandes', address: '6 Moor Crescent, Leeds LS11', driver: 'Jonas Berg', initials: 'JB', delivered: '9 Nov, 12:09', disputed: false, photo: true, signature: false, reason: 'Safe place, no one home' },
  { parcel: 'TLV-48061', recipient: 'Emily Hart', address: '52 Victoria Rd, Leeds LS6', driver: 'Aisha Rahman', initials: 'AR', delivered: '9 Nov, 10:26', disputed: true, photo: false, signature: true, reason: 'Says the box was empty' },
  { parcel: 'TLV-48040', recipient: 'Kwame Asante', address: '18 Beeston Hill, Leeds LS11', driver: 'Jonas Berg', initials: 'JB', delivered: '8 Nov, 18:31', disputed: false, photo: false, signature: true, reason: 'Photo too dark to read' },
];

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;

function Missing({ d }: { d: Delivery }) {
  const missing: string[] = [];
  if (!d.photo) missing.push('Photo');
  if (!d.signature) missing.push('Signature');
  return (
    <Row>
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {missing.map(m => <Badge key={m} tone="warning">{`No ${m.toLowerCase()}`}</Badge>)}
      {missing.length === 0 ? <Badge>Proof complete</Badge> : null}
    </Row>
  );
}

function Thumb({ d }: { d: Delivery }) {
  return d.photo ? (
    <NewPart name="proof-thumb" className="x-thumb" job="A small preview of the delivery photo in a table row" why="The system has no image or thumbnail component" role="img" aria-label={`Delivery photo for ${d.parcel}`}>
      <span className="x-thumb__door" />
      <span className="x-thumb__parcel" />
    </NewPart>
  ) : (
    <NewPart name="proof-thumb" className="x-thumb x-thumb--empty" job="A small preview of the delivery photo in a table row" why="The system has no image or thumbnail component" role="img" aria-label={`No photo for ${d.parcel}`}>
      <span className="x-thumb__none">None</span>
    </NewPart>
  );
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#', count: 38 },
        { label: 'Drivers', href: '#', count: 52 },
        { label: 'Proof to review', href: '#', count: deliveries.length, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: count(d => d.disputed) },
        { label: 'Missing photo', count: count(d => !d.photo) },
        { label: 'Missing signature', count: count(d => !d.signature) },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Issue' },
        { label: 'Action' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><a className="x-parcel" href="#">{d.parcel}</a></Td>
            <Td>
              <span className="x-cell">
                <span className="x-primary">{d.recipient}</span>
                <span className="x-secondary">{d.address}</span>
              </span>
            </Td>
            <Td><span className="x-person"><Avatar initials={d.initials} /><span className="x-nowrap">{d.driver}</span></span></Td>
            <Td><span className="x-nowrap">{d.delivered}</span></Td>
            <Td><Thumb d={d} /></Td>
            <Td>
              <span className="x-cell">
                <Missing d={d} />
                <span className="x-secondary">{d.reason}</span>
              </span>
            </Td>
            <Td><Button variant="tertiary" aria-label={`Review ${d.parcel}`}>Review</Button></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}

export const css = `
.x-parcel { font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.x-cell { display: flex; flex-direction: column; gap: var(--s1); min-width: 140px; }
.x-primary { font: var(--type-body-strong); color: var(--ink); }
.x-secondary { font: var(--type-small); color: var(--muted); }
.x-nowrap { white-space: nowrap; }
.x-person { display: flex; align-items: center; gap: var(--s2); }

.x-thumb { position: relative; display: block; width: 56px; height: 42px; border-radius: var(--radius); background: var(--line); border: var(--border); overflow: hidden; }
.x-thumb__door { position: absolute; left: var(--s2); top: var(--s1); width: 18px; bottom: 0; background: var(--muted); border-radius: var(--radius) var(--radius) 0 0; }
.x-thumb__parcel { position: absolute; right: var(--s2); bottom: var(--s1); width: 20px; height: 14px; background: var(--warning); border-radius: var(--radius); }
.x-thumb--empty { background: var(--surface-sunken); display: flex; align-items: center; justify-content: center; }
.x-thumb__none { font: var(--type-small); color: var(--muted); }
`;
