import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, NewPart } from '../src';

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
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', recipient: 'Hannah Okafor', address: '14 Belmont Road, Leeds', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today, 10:42', disputed: true, photo: true, signature: false },
  { parcel: 'TLV-48197', recipient: 'Marcus Lindqvist', address: '3 Quarry Lane, Bradford', driver: 'Tom Hale', initials: 'TH', delivered: 'Today, 09:15', disputed: true, photo: false, signature: false },
  { parcel: 'TLV-48176', recipient: 'Priya Natarajan', address: 'Flat 6, 21 Albion Street, Leeds', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today, 08:58', disputed: false, photo: false, signature: true },
  { parcel: 'TLV-48140', recipient: 'Daniel Achebe', address: '88 Kirkstall Road, Leeds', driver: 'Kofi Mensah', initials: 'KM', delivered: 'Yesterday, 17:31', disputed: true, photo: true, signature: true },
  { parcel: 'TLV-48122', recipient: 'Sofia Brennan', address: '5 Mill Court, Wakefield', driver: 'Lena Fischer', initials: 'LF', delivered: 'Yesterday, 16:04', disputed: false, photo: true, signature: false },
  { parcel: 'TLV-48109', recipient: 'Yusuf Demir', address: '41 Station Road, Huddersfield', driver: 'Tom Hale', initials: 'TH', delivered: 'Yesterday, 14:47', disputed: false, photo: false, signature: true },
  { parcel: 'TLV-48088', recipient: 'Grace Whitfield', address: '9 Orchard Close, Harrogate', driver: 'Kofi Mensah', initials: 'KM', delivered: 'Yesterday, 11:20', disputed: true, photo: true, signature: false },
  { parcel: 'TLV-48061', recipient: 'Oliver Grant', address: 'Unit 2, Canal Wharf, Leeds', driver: 'Lena Fischer', initials: 'LF', delivered: 'Mon 9 Nov, 15:12', disputed: false, photo: false, signature: false },
  { parcel: 'TLV-48037', recipient: 'Amira Haddad', address: '27 Park View, York', driver: 'Ana Moreira', initials: 'AM', delivered: 'Mon 9 Nov, 12:39', disputed: true, photo: false, signature: true },
  { parcel: 'TLV-48012', recipient: 'Callum Reid', address: '60 High Street, Otley', driver: 'Tom Hale', initials: 'TH', delivered: 'Mon 9 Nov, 10:05', disputed: false, photo: true, signature: false },
];

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;

function ProofPhoto({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="proof-thumb" className="x-thumb x-thumb--none" base="avatar"
        job="A small preview of the delivery photo in a row, or its absence"
        why="No contract shows an image thumbnail; avatar shows initials only"
        role="img" aria-label={`No photo for ${d.parcel}`}>
        <span className="x-thumb__none" aria-hidden="true">None</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className="x-thumb" base="avatar"
      job="A small preview of the delivery photo in a row, or its absence"
      why="No contract shows an image thumbnail; avatar shows initials only"
      role="img" aria-label={`Photo of parcel ${d.parcel} at the door`}>
      <span className="x-thumb__door" aria-hidden="true" />
      <span className="x-thumb__parcel" aria-hidden="true" />
    </NewPart>
  );
}

function Missing({ d }: { d: Delivery }) {
  if (!d.photo && !d.signature) return <Badge tone="critical">Photo and signature</Badge>;
  if (!d.photo) return <Badge tone="warning">Photo</Badge>;
  if (!d.signature) return <Badge tone="warning">Signature</Badge>;
  return <Badge>None</Badge>;
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#', count: 24 },
        { label: 'Proof to review', href: '#', count: deliveries.length, current: true },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: count(d => d.disputed) },
        { label: 'Missing photo', count: count(d => !d.photo) },
        { label: 'Missing signature', count: count(d => !d.signature) },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' }, { label: 'Recipient' }, { label: 'Driver' }, { label: 'Marked delivered' },
        { label: 'Photo' }, { label: 'Missing proof' }, { label: 'Dispute' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><span className="x-nowrap"><Button variant="tertiary" aria-label={`Review delivery ${d.parcel}`}>{d.parcel}</Button></span></Td>
            <Td><span className="x-nowrap">{d.recipient}</span><br /><span className="x-sub">{d.address}</span></Td>
            <Td><span className="x-person"><Avatar initials={d.initials} />{d.driver}</span></Td>
            <Td><span className="x-nowrap">{d.delivered}</span></Td>
            <Td><ProofPhoto d={d} /></Td>
            <Td><span className="x-nowrap"><Missing d={d} /></span></Td>
            <Td><span className="x-nowrap">{d.disputed ? <Badge tone="critical">Not received</Badge> : <span className="x-sub">No dispute</span>}</span></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}

export const css = `
.x-nowrap { white-space: nowrap; }
.x-sub { font: var(--type-small); color: var(--muted); }
.x-person { display: inline-flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.x-thumb {
  position: relative; display: block; width: 48px; height: 36px; overflow: hidden;
  border-radius: var(--radius); border: var(--border); background: var(--surface-sunken);
}
.x-thumb__door {
  position: absolute; top: var(--s1); right: var(--s2); width: 16px; bottom: 0;
  background: var(--line); border-radius: var(--radius) var(--radius) 0 0;
}
.x-thumb__parcel {
  position: absolute; left: var(--s2); bottom: var(--s1); width: 16px; height: 12px;
  background: var(--muted); border-radius: var(--radius);
}
.x-thumb--none { display: flex; align-items: center; justify-content: center; border-style: dashed; background: var(--surface); }
.x-thumb__none { font: var(--type-small); color: var(--muted); }
`;
