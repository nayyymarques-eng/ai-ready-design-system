import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, Row, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

export const css = `
.x-pod-thumb {
  width: var(--s7);
  height: var(--s7);
  border-radius: var(--radius);
  background: var(--surface-sunken);
  border: var(--border);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: var(--s2);
  overflow: hidden;
}
.x-pod-thumb__parcel {
  width: var(--s5);
  height: var(--s4);
  border-radius: var(--radius);
  background: var(--line);
  border: 1px solid var(--muted);
}
.x-pod-nophoto {
  width: var(--s7);
  height: var(--s7);
  border-radius: var(--radius);
  border: 1px dashed var(--muted);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--type-small);
  color: var(--muted);
  text-align: center;
}
`;

type Delivery = {
  parcel: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  date: string;
  time: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TV-48213907', recipient: 'Helen Okafor', address: '14 Marlow Road, Leeds', driver: 'Ana Moreira', initials: 'AM', date: 'Today', time: '09:42', disputed: true, photo: true, signature: false },
  { parcel: 'TV-48213552', recipient: 'Daniel Price', address: '3B Kingsway Court, Leeds', driver: 'Tomasz Nowak', initials: 'TN', date: 'Today', time: '08:15', disputed: true, photo: false, signature: true },
  { parcel: 'TV-48209871', recipient: 'Priya Raman', address: '72 Otley Lane, Bradford', driver: 'Ana Moreira', initials: 'AM', date: 'Yesterday', time: '17:58', disputed: false, photo: false, signature: true },
  { parcel: 'TV-48209414', recipient: 'Sam Whitfield', address: '9 Canal Wharf, Leeds', driver: 'Kwame Asante', initials: 'KA', date: 'Yesterday', time: '15:20', disputed: true, photo: true, signature: true },
  { parcel: 'TV-48208730', recipient: 'Lucia Ferreira', address: '41 Harrow Street, Wakefield', driver: 'Ruth Bell', initials: 'RB', date: 'Yesterday', time: '11:06', disputed: false, photo: true, signature: false },
  { parcel: 'TV-48205166', recipient: 'Marcus Hale', address: '200 Albion Street, Leeds', driver: 'Tomasz Nowak', initials: 'TN', date: '9 Nov', time: '16:47', disputed: false, photo: false, signature: false },
  { parcel: 'TV-48204029', recipient: 'Grace Lindqvist', address: '5 Rosemount Avenue, Harrogate', driver: 'Kwame Asante', initials: 'KA', date: '9 Nov', time: '10:31', disputed: true, photo: true, signature: false },
  { parcel: 'TV-48201788', recipient: 'Owen Gallagher', address: '18 Mill Lane, Bradford', driver: 'Ruth Bell', initials: 'RB', date: '8 Nov', time: '14:12', disputed: false, photo: true, signature: false },
];

const count = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

function Thumb({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="proof-thumb" className="x-pod-nophoto" role="img" aria-label={`No photo for ${d.parcel}`}
        job="Shows that a delivery has no proof photo, in the photo column" why="No contract shows an image or its absence">
        None
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className="x-pod-thumb" role="img" aria-label={`Proof photo for ${d.parcel}: parcel at the door`}
      job="A small preview of the driver's proof photo in a table row" why="The system has no image or thumbnail component">
      <span className="x-pod-thumb__parcel" />
    </NewPart>
  );
}

function Issues({ d }: { d: Delivery }) {
  return (
    <Row>
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
      {d.photo && d.signature ? <Badge>Proof complete</Badge> : null}
    </Row>
  );
}

export default function PodQueue() {
  return (
    <ListPage
      nav={
        <NavRail brand="Tolvane" items={[
          { label: 'Today', href: '#' },
          { label: 'Routes', href: '#' },
          { label: 'Drivers', href: '#' },
          { label: 'Proof to review', href: '#', count: count.all, current: true },
          { label: 'Customers', href: '#' },
        ]} />
      }
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={
        <ToggleGroup label="Filter deliveries" items={[
          { label: 'All', count: count.all, selected: true },
          { label: 'Disputed', count: count.disputed },
          { label: 'Missing photo', count: count.photo },
          { label: 'Missing signature', count: count.signature },
        ]} />
      }
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Needs review' },
        { label: 'Open' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><strong>{d.parcel.replace('-', '\u2011')}</strong></Td>
            <Td>
              <div>{d.recipient}</div>
              <div>{d.address}</div>
            </Td>
            <Td><Row><Avatar initials={d.initials} /><span>{d.driver}</span></Row></Td>
            <Td>
              <div>{d.date}</div>
              <div>{d.time}</div>
            </Td>
            <Td><Thumb d={d} /></Td>
            <Td><Issues d={d} /></Td>
            <Td><Button variant="tertiary" aria-label={`Review delivery ${d.parcel}`}>Review</Button></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
