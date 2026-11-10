import type React from 'react';
import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Button, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

type Delivery = {
  parcel: string;
  recipient: string;
  address: string;
  driver: string;
  initials: string;
  delivered: string;
  disputed: boolean;
  photo: string | null; // what the photo shows, or null when missing
  signature: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-48213', recipient: 'Harriet Okafor', address: '14 Marlow Road, Leeds LS6 2QF', driver: 'Ana Moreira', initials: 'AM', delivered: 'Tue 10 Nov, 09:42', disputed: true, photo: 'Parcel on doorstep beside a blue door', signature: false },
  { parcel: 'TLV-48190', recipient: 'Daniel Price', address: 'Flat 3, 2 Canal Wharf, Leeds LS11 5PS', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Tue 10 Nov, 08:57', disputed: false, photo: null, signature: true },
  { parcel: 'TLV-48177', recipient: 'Priya Raman', address: '88 Kirkstall Lane, Leeds LS5 3BN', driver: 'Ana Moreira', initials: 'AM', delivered: 'Mon 9 Nov, 17:21', disputed: true, photo: null, signature: false },
  { parcel: 'TLV-48152', recipient: 'Gemma Lowe', address: '5 Elm Court, Otley LS21 1HX', driver: 'Kwame Asante', initials: 'KA', delivered: 'Mon 9 Nov, 15:06', disputed: false, photo: 'Parcel in porch, handed to neighbour', signature: false },
  { parcel: 'TLV-48139', recipient: 'Sam Whitaker', address: '21 Victoria Street, Horsforth LS18 4PU', driver: 'Lucy Brennan', initials: 'LB', delivered: 'Mon 9 Nov, 13:48', disputed: true, photo: 'Parcel at reception desk', signature: true },
  { parcel: 'TLV-48121', recipient: 'Oliver Grant', address: '9 Station Parade, Headingley LS6 3HN', driver: 'Tomasz Nowak', initials: 'TN', delivered: 'Mon 9 Nov, 11:30', disputed: false, photo: null, signature: true },
  { parcel: 'TLV-48098', recipient: 'Aisha Rahman', address: '47 Burley Road, Leeds LS4 2JW', driver: 'Kwame Asante', initials: 'KA', delivered: 'Sun 8 Nov, 16:12', disputed: true, photo: 'Parcel behind side gate', signature: false },
  { parcel: 'TLV-48064', recipient: 'Ben Hollis', address: '3 Mill Close, Guiseley LS20 9DD', driver: 'Lucy Brennan', initials: 'LB', delivered: 'Sun 8 Nov, 10:05', disputed: false, photo: 'Parcel in safe place, garage', signature: false },
  { parcel: 'TLV-48031', recipient: 'Chloe Adeyemi', address: '112 Roundhay Road, Leeds LS8 5AB', driver: 'Ana Moreira', initials: 'AM', delivered: 'Sat 7 Nov, 14:39', disputed: true, photo: 'Parcel on doorstep, no house number visible', signature: true },
];

const count = (f: (d: Delivery) => boolean) => deliveries.filter(f).length;

function Photo({ d }: { d: Delivery }) {
  if (!d.photo) {
    return (
      <NewPart name="pod-thumb" className="x-thumb x-thumb--none" job="A small preview of the delivery photo, or a placeholder when it is missing" why="The system has no image or thumbnail component" role="img" aria-label="No photo taken">
        <span className="x-thumb__none">No photo</span>
      </NewPart>
    );
  }
  return (
    <NewPart name="pod-thumb" className="x-thumb" job="A small preview of the delivery photo, or a placeholder when it is missing" why="The system has no image or thumbnail component" role="img" aria-label={`Photo: ${d.photo}`}>
      <span className="x-thumb__ground" />
      <span className="x-thumb__parcel"><span className="x-thumb__tape" /></span>
    </NewPart>
  );
}

function Cell({ wrap, children }: { wrap?: boolean; children: React.ReactNode }) {
  return (
    <NewPart name="cell-inline" className={wrap ? "x-cell x-cell--wrap" : "x-cell"} job="Keeps a short table value on one line, with its avatar or badges beside it" why="The table has no cell layout that keeps an ID, date or avatar and name together">
      {children}
    </NewPart>
  );
}

function Missing({ d }: { d: Delivery }) {
  if (!d.photo && !d.signature) return <Cell wrap><Badge tone="warning">No photo</Badge><Badge tone="warning">No signature</Badge></Cell>;
  if (!d.photo) return <Badge tone="warning">No photo</Badge>;
  if (!d.signature) return <Badge tone="warning">No signature</Badge>;
  return <Badge>Complete</Badge>;
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#', count: 38 },
        { label: 'Proof', href: '#', count: deliveries.length, current: true },
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
        { label: 'Parcel' }, { label: 'Recipient' }, { label: 'Driver' }, { label: 'Marked delivered' },
        { label: 'Photo' }, { label: 'Missing proof' }, { label: 'Status' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><Cell><a href={`#/proof/${d.parcel}`} aria-label={`Review proof for ${d.parcel}`}>{d.parcel}</a></Cell></Td>
            <Td>
              <NewPart name="cell-two-line" className="x-two-line" job="A name with a quieter second line under it, in a table cell" why="The table has no secondary-text style for a cell">
                <span className="x-two-line__main">{d.recipient}</span>
                <span className="x-two-line__sub">{d.address}</span>
              </NewPart>
            </Td>
            <Td><Cell><Avatar initials={d.initials} /><span>{d.driver}</span></Cell></Td>
            <Td><Cell>{d.delivered}</Cell></Td>
            <Td><Photo d={d} /></Td>
            <Td><Missing d={d} /></Td>
            <Td>{d.disputed ? <Badge tone="critical">Disputed</Badge> : <Badge tone="info">Incomplete</Badge>}</Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}

export const css = `
.x-thumb { position: relative; display: block; width: 48px; height: 36px; border-radius: var(--radius); background: var(--tint-info); border: var(--border); overflow: hidden; }
.x-thumb__ground { position: absolute; left: 0; right: 0; bottom: 0; height: var(--s3); background: var(--line); }
.x-thumb__parcel { position: absolute; left: var(--s4); bottom: var(--s2); width: var(--s4); height: var(--s3); background: var(--tint-warning); border: 1px solid var(--warning); }
.x-thumb__tape { position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: var(--warning); }
.x-thumb--none { background: var(--surface-sunken); border-style: dashed; border-color: var(--muted); display: flex; align-items: center; justify-content: center; }
.x-thumb__none { font: var(--type-small); color: var(--muted); text-align: center; }
.x-cell { display: flex; align-items: center; gap: var(--s2); white-space: nowrap; }
.x-cell--wrap { flex-wrap: wrap; }
.x-cell a { color: var(--ink); font: var(--type-body-strong); text-decoration: underline; text-underline-offset: 3px; }
.x-two-line { display: flex; flex-direction: column; }
.x-two-line__main { font: var(--type-body-strong); color: var(--ink); white-space: nowrap; }
.x-two-line__sub { font: var(--type-small); color: var(--muted); min-width: 160px; }
`;
