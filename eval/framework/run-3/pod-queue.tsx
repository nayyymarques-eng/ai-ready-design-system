import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Button, Row, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

export const css = `
.x-pod-thumb {
  position: relative;
  display: block;
  width: var(--s7);
  height: var(--s6);
  border-radius: var(--radius);
  border: var(--border);
  background: var(--surface-sunken);
  overflow: hidden;
}
.x-pod-thumb__parcel {
  position: absolute;
  left: var(--s3);
  bottom: var(--s1);
  width: var(--s5);
  height: var(--s4);
  border-radius: var(--radius);
  background: var(--line);
  border: var(--border);
}
.x-pod-thumb__tape {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: var(--s1);
  transform: translateX(-50%);
  background: var(--muted);
  opacity: .4;
}
.x-pod-thumb--none {
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--type-small);
  color: var(--muted);
}
.x-pod-cell {
  display: flex;
  flex-direction: column;
}
.x-pod-cell__sub {
  font: var(--type-small);
  color: var(--muted);
  white-space: nowrap;
}
.x-pod-cell__main {
  white-space: nowrap;
}
`;

type Missing = 'photo' | 'signature' | 'both' | null;

type Delivery = {
  parcel: string;
  service: string;
  recipient: string;
  town: string;
  driver: string;
  route: string;
  delivered: string;
  deliveredDay: string;
  disputed: boolean;
  missing: Missing;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213907', service: 'Next day', recipient: 'Harriet Okafor', town: 'Leeds', driver: 'Marek Nowak', route: 'Route LS-04', delivered: '09:42', deliveredDay: 'Today', disputed: true, missing: null },
  { parcel: 'TLV-48213655', service: 'Standard', recipient: 'Callum Reid', town: 'Leeds', driver: 'Priya Shah', route: 'Route LS-11', delivered: '08:17', deliveredDay: 'Today', disputed: true, missing: 'signature' },
  { parcel: 'TLV-48210482', service: 'Next day', recipient: 'Sofia Brennan', town: 'Bradford', driver: 'Daniel Ferreira', route: 'Route BD-02', delivered: '17:56', deliveredDay: 'Yesterday', disputed: false, missing: 'photo' },
  { parcel: 'TLV-48209931', service: 'Standard', recipient: 'Ahmed Rahman', town: 'Wakefield', driver: 'Marek Nowak', route: 'Route LS-04', delivered: '16:03', deliveredDay: 'Yesterday', disputed: false, missing: 'signature' },
  { parcel: 'TLV-48209204', service: 'Two-hour slot', recipient: 'Lucy Whitfield', town: 'Harrogate', driver: 'Grace Adeyemi', route: 'Route HG-07', delivered: '14:30', deliveredDay: 'Yesterday', disputed: true, missing: 'photo' },
  { parcel: 'TLV-48207718', service: 'Standard', recipient: 'Tomasz Lewandowski', town: 'Leeds', driver: 'Priya Shah', route: 'Route LS-11', delivered: '11:12', deliveredDay: '6 Nov', disputed: false, missing: 'both' },
  { parcel: 'TLV-48206540', service: 'Next day', recipient: 'Eleanor Hughes', town: 'York', driver: 'Daniel Ferreira', route: 'Route BD-02', delivered: '10:05', deliveredDay: '6 Nov', disputed: true, missing: null },
  { parcel: 'TLV-48205177', service: 'Standard', recipient: 'Jordan Mensah', town: 'Huddersfield', driver: 'Grace Adeyemi', route: 'Route HG-07', delivered: '15:48', deliveredDay: '5 Nov', disputed: false, missing: 'photo' },
];

const hasPhoto = (d: Delivery) => d.missing !== 'photo' && d.missing !== 'both';

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !hasPhoto(d)).length,
  signature: deliveries.filter(d => d.missing === 'signature' || d.missing === 'both').length,
};

function Thumb({ d }: { d: Delivery }) {
  if (!hasPhoto(d)) {
    return (
      <NewPart
        name="proof-thumbnail"
        job="A small preview of the driver's proof photo in a table row"
        why="No contract shows an image or photo preview; avatar is for people only"
        className="x-pod-thumb x-pod-thumb--none"
        as="span"
        role="img"
        aria-label={`No photo for ${d.parcel}`}
      >
        None
      </NewPart>
    );
  }
  return (
    <NewPart
      name="proof-thumbnail"
      job="A small preview of the driver's proof photo in a table row"
      why="No contract shows an image or photo preview; avatar is for people only"
      className="x-pod-thumb"
      as="span"
      role="img"
      aria-label={`Proof photo for ${d.parcel}: parcel at the door`}
    >
      <span className="x-pod-thumb__parcel" />
      <span className="x-pod-thumb__tape" />
    </NewPart>
  );
}

function TwoLine({ main, sub }: { main: string; sub: string }) {
  return (
    <NewPart
      name="two-line-cell"
      job="A table cell with a main value and a quieter second line"
      why="The table contract has no secondary text in a cell"
      className="x-pod-cell"
      as="span"
    >
      <span className="x-pod-cell__main">{main}</span>
      <span className="x-pod-cell__sub">{sub}</span>
    </NewPart>
  );
}

function MissingProof({ missing }: { missing: Missing }) {
  if (missing === 'both') return <Row><Badge tone="warning">Photo</Badge><Badge tone="warning">Signature</Badge></Row>;
  if (missing === 'photo') return <Badge tone="warning">Photo</Badge>;
  if (missing === 'signature') return <Badge tone="warning">Signature</Badge>;
  return <Badge>None</Badge>;
}

export default function PodQueue() {
  return (
    <ListPage
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#' },
            { label: 'Drivers', href: '#' },
            { label: 'Proof to review', href: '#', count: counts.all, current: true },
            { label: 'Customers', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
      title="Proof to review"
      actions={<Button variant="secondary">Export list</Button>}
      filters={
        <ToggleGroup
          label="Filter deliveries"
          items={[
            { label: 'All', count: counts.all, selected: true },
            { label: 'Disputed', count: counts.disputed },
            { label: 'Missing photo', count: counts.photo },
            { label: 'Missing signature', count: counts.signature },
          ]}
        />
      }
    >
      <Table
        columns={[
          { label: 'Parcel' },
          { label: 'Recipient' },
          { label: 'Driver' },
          { label: 'Marked delivered' },
          { label: 'Photo' },
          { label: 'Missing proof' },
          { label: 'Customer' },
          { label: 'Review' },
        ]}
      >
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td>
              <TwoLine main={d.parcel} sub={d.service} />
            </Td>
            <Td>
              <TwoLine main={d.recipient} sub={d.town} />
            </Td>
            <Td>
              <TwoLine main={d.driver} sub={d.route} />
            </Td>
            <Td>
              <TwoLine main={d.delivered} sub={d.deliveredDay} />
            </Td>
            <Td><Thumb d={d} /></Td>
            <Td><MissingProof missing={d.missing} /></Td>
            <Td>{d.disputed ? <Badge tone="critical">Disputed</Badge> : <Badge>No claim</Badge>}</Td>
            <Td><Button variant="secondary" aria-label={`Review delivery ${d.parcel}`}>Review</Button></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
