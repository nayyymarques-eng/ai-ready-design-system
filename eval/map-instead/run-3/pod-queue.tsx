import type React from 'react';
import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

export const css = `
.x-proof-thumb {
  width: 56px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--surface-sunken);
  border: var(--border);
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  overflow: hidden;
}
.x-nowrap { white-space: nowrap; display: inline-flex; align-items: center; gap: var(--s2); }
.x-proof-thumb svg { width: 100%; height: 100%; display: block; }
.x-proof-thumb--none {
  border-style: dashed;
  font: var(--type-small);
}
`;

type Delivery = {
  parcel: string;
  recipient: string;
  town: string;
  driver: string;
  initials: string;
  delivered: string;
  disputed: boolean;
  photo: boolean;
  signature: boolean;
  /** Which schematic scene the proof photo shows. */
  scene?: 'door' | 'porch' | 'locker';
};

const deliveries: Delivery[] = [
  { parcel: 'TV-48213-K', recipient: 'Helen Okafor', town: 'Leeds LS6', driver: 'Ana Moreira', initials: 'AM', delivered: 'Today, 09:42', disputed: true, photo: true, signature: true, scene: 'door' },
  { parcel: 'TV-48197-B', recipient: 'Marcus Lindqvist', town: 'Leeds LS2', driver: 'Tom Hale', initials: 'TH', delivered: 'Today, 08:15', disputed: true, photo: false, signature: true },
  { parcel: 'TV-48166-R', recipient: 'Priya Nair', town: 'Bradford BD9', driver: 'Ana Moreira', initials: 'AM', delivered: 'Yesterday, 17:58', disputed: false, photo: true, signature: false, scene: 'porch' },
  { parcel: 'TV-48140-D', recipient: 'Owen Patel', town: 'Harrogate HG1', driver: 'Jakub Nowak', initials: 'JN', delivered: 'Yesterday, 16:21', disputed: false, photo: false, signature: true },
  { parcel: 'TV-48122-F', recipient: 'Sofia Romano', town: 'Leeds LS8', driver: 'Kemi Adeyemi', initials: 'KA', delivered: 'Yesterday, 14:07', disputed: true, photo: true, signature: false, scene: 'locker' },
  { parcel: 'TV-48109-A', recipient: 'Daniel Byrne', town: 'Wakefield WF1', driver: 'Tom Hale', initials: 'TH', delivered: 'Yesterday, 11:33', disputed: false, photo: true, signature: false, scene: 'door' },
  { parcel: 'TV-48088-M', recipient: 'Grace Mensah', town: 'Leeds LS11', driver: 'Jakub Nowak', initials: 'JN', delivered: '9 Nov, 18:40', disputed: true, photo: true, signature: true, scene: 'porch' },
  { parcel: 'TV-48061-S', recipient: 'Ravi Sharma', town: 'York YO10', driver: 'Kemi Adeyemi', initials: 'KA', delivered: '9 Nov, 15:12', disputed: false, photo: false, signature: false },
  { parcel: 'TV-48047-P', recipient: 'Ellie Chambers', town: 'Bradford BD3', driver: 'Ana Moreira', initials: 'AM', delivered: '9 Nov, 10:26', disputed: false, photo: true, signature: false, scene: 'locker' },
  { parcel: 'TV-48012-T', recipient: 'Liam Doherty', town: 'Leeds LS17', driver: 'Tom Hale', initials: 'TH', delivered: '8 Nov, 13:54', disputed: true, photo: false, signature: true },
];

const counts = {
  all: deliveries.length,
  disputed: deliveries.filter(d => d.disputed).length,
  photo: deliveries.filter(d => !d.photo).length,
  signature: deliveries.filter(d => !d.signature).length,
};

/** A small schematic of the proof photo, drawn in the current text colour (no image files). */
function Scene({ scene }: { scene: NonNullable<Delivery['scene']> }) {
  if (scene === 'door') {
    return (
      <svg viewBox="0 0 56 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="18" y="4" width="20" height="34" />
        <circle cx="34" cy="22" r="1" fill="currentColor" />
        <rect x="22" y="28" width="12" height="9" fill="currentColor" fillOpacity="0.25" />
        <line x1="22" y1="32" x2="34" y2="32" />
      </svg>
    );
  }
  if (scene === 'porch') {
    return (
      <svg viewBox="0 0 56 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="2" y1="34" x2="54" y2="34" />
        <line x1="6" y1="38" x2="50" y2="38" />
        <rect x="8" y="6" width="14" height="28" />
        <rect x="30" y="22" width="16" height="12" fill="currentColor" fillOpacity="0.25" />
        <line x1="38" y1="22" x2="38" y2="34" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 56 40" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="4" width="40" height="34" />
      <line x1="28" y1="4" x2="28" y2="38" />
      <line x1="8" y1="21" x2="48" y2="21" />
      <rect x="12" y="25" width="12" height="9" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

function ProofThumb({ d }: { d: Delivery }) {
  if (!d.photo || !d.scene) {
    return (
      <NewPart name="proof-thumb" className="x-proof-thumb x-proof-thumb--none" as="span"
        job="A small preview of the delivery photo in a table row"
        why="The system has no image or thumbnail component, and image upload is not built"
        role="img" aria-label="No photo">
        None
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className="x-proof-thumb" as="span" role="img"
      job="A small preview of the delivery photo in a table row"
      why="The system has no image or thumbnail component, and image upload is not built"
      aria-label={`Proof photo for ${d.parcel}`}>
      <Scene scene={d.scene} />
    </NewPart>
  );
}

/** Keeps a short value on one line, so a narrow screen scrolls the table instead of breaking the value. */
function OneLine({ children }: { children: React.ReactNode }) {
  return (
    <NewPart name="one-line" className="x-nowrap" as="span" base="table"
      job="Keep a short table value, such as a parcel number, a driver with their avatar, a date or a set of badges, on one line"
      why="The table lets cells wrap, which breaks parcel numbers and badges across lines on a phone">
      {children}
    </NewPart>
  );
}

function Reasons({ d }: { d: Delivery }) {
  return (
    <>
      {d.disputed ? <Badge tone="critical">Disputed</Badge> : null}
      {!d.photo ? <Badge tone="warning">No photo</Badge> : null}
      {!d.signature ? <Badge tone="warning">No signature</Badge> : null}
    </>
  );
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#', count: 38 },
        { label: 'Proof to review', href: '#', count: counts.all, current: true },
        { label: 'Customers', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof to review"
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: counts.all, selected: true },
        { label: 'Disputed', count: counts.disputed },
        { label: 'Missing photo', count: counts.photo },
        { label: 'Missing signature', count: counts.signature },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Needs review because' },
        { label: 'Review' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><OneLine><a href="#">{d.parcel}</a></OneLine></Td>
            <Td><OneLine>{d.recipient}</OneLine><br /><OneLine>{d.town}</OneLine></Td>
            <Td><OneLine><Avatar initials={d.initials} /><span>{d.driver}</span></OneLine></Td>
            <Td><OneLine>{d.delivered}</OneLine></Td>
            <Td><ProofThumb d={d} /></Td>
            <Td><OneLine><Reasons d={d} /></OneLine></Td>
            <Td><a href="#" aria-label={`Review ${d.parcel}`}>Review</a></Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
