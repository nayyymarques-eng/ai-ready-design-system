import { ListPage, NavRail, ToggleGroup, Table, Tr, Td, Badge, Avatar, Row, NewPart } from '../src';

export const title = 'Proof to review — Tolvane';

export const css = `
.x-proof-thumb { display: inline-flex; width: 48px; height: 36px; border-radius: var(--radius); border: var(--border); background: var(--surface-sunken); color: var(--muted); overflow: hidden; flex: none; }
.x-proof-thumb svg { width: 100%; height: 100%; display: block; }
.x-proof-none { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 36px; border-radius: var(--radius); border: 1px dashed var(--muted); color: var(--muted); font: var(--type-small); flex: none; }
`;

type Scene = 'door' | 'locker' | 'desk' | 'gate';
type Missing = 'photo' | 'signature' | 'both' | null;

type Delivery = {
  parcel: string;
  recipient: string;
  driver: string;
  initials: string;
  delivered: string;
  scene: Scene;
  missing: Missing;
  disputed: boolean;
};

const deliveries: Delivery[] = [
  { parcel: 'TLV-482190', recipient: 'Marta Lopes', driver: 'Rui Fonseca', initials: 'RF', delivered: 'Today, 09:42', scene: 'door', missing: 'signature', disputed: true },
  { parcel: 'TLV-482177', recipient: 'Daniel Okafor', driver: 'Inês Carvalho', initials: 'IC', delivered: 'Today, 08:15', scene: 'door', missing: 'photo', disputed: false },
  { parcel: 'TLV-481902', recipient: 'Sofia Brandt', driver: 'Rui Fonseca', initials: 'RF', delivered: 'Yesterday, 18:27', scene: 'gate', missing: null, disputed: true },
  { parcel: 'TLV-481866', recipient: 'Harbour Dental Clinic', driver: 'Tomás Leite', initials: 'TL', delivered: 'Yesterday, 16:03', scene: 'desk', missing: 'signature', disputed: false },
  { parcel: 'TLV-481840', recipient: 'Priya Raman', driver: 'Carla Mendes', initials: 'CM', delivered: 'Yesterday, 14:51', scene: 'door', missing: 'both', disputed: true },
  { parcel: 'TLV-481712', recipient: 'João Pereira', driver: 'Inês Carvalho', initials: 'IC', delivered: 'Yesterday, 11:30', scene: 'locker', missing: 'signature', disputed: false },
  { parcel: 'TLV-481655', recipient: 'Lena Fischer', driver: 'André Sousa', initials: 'AS', delivered: '9 Nov, 19:12', scene: 'door', missing: 'photo', disputed: false },
  { parcel: 'TLV-481533', recipient: 'Nordline Print Studio', driver: 'Tomás Leite', initials: 'TL', delivered: '9 Nov, 15:40', scene: 'desk', missing: null, disputed: true },
  { parcel: 'TLV-481498', recipient: 'Miguel Antunes', driver: 'Carla Mendes', initials: 'CM', delivered: '9 Nov, 10:08', scene: 'gate', missing: 'signature', disputed: false },
  { parcel: 'TLV-481207', recipient: 'Chloé Martin', driver: 'André Sousa', initials: 'AS', delivered: '8 Nov, 17:55', scene: 'door', missing: 'photo', disputed: true },
  { parcel: 'TLV-481164', recipient: 'Beatriz Rocha', driver: 'Rui Fonseca', initials: 'RF', delivered: '8 Nov, 13:22', scene: 'locker', missing: 'both', disputed: false },
  { parcel: 'TLV-480931', recipient: 'Kofi Mensah', driver: 'Inês Carvalho', initials: 'IC', delivered: '7 Nov, 16:47', scene: 'door', missing: 'signature', disputed: false },
];

const disputedCount = deliveries.filter(d => d.disputed).length;
const missingPhotoCount = deliveries.filter(d => d.missing === 'photo' || d.missing === 'both').length;
const missingSignatureCount = deliveries.filter(d => d.missing === 'signature' || d.missing === 'both').length;

const sceneLabel: Record<Scene, string> = {
  door: 'Photo: parcel left at a front door',
  locker: 'Photo: parcel in a parcel locker',
  desk: 'Photo: parcel on a reception desk',
  gate: 'Photo: parcel inside a garden gate',
};

/** A schematic drawing standing in for the driver's photo; the screen uses no image files. */
function SceneDrawing({ scene }: { scene: Scene }) {
  if (scene === 'locker') {
    return (
      <svg viewBox="0 0 48 36" aria-hidden="true">
        <rect x="8" y="4" width="32" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="4" x2="24" y2="32" stroke="currentColor" strokeWidth="1" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1" />
        <rect x="27" y="22" width="9" height="7" fill="currentColor" />
      </svg>
    );
  }
  if (scene === 'desk') {
    return (
      <svg viewBox="0 0 48 36" aria-hidden="true">
        <rect x="4" y="20" width="40" height="4" fill="currentColor" />
        <line x1="8" y1="24" x2="8" y2="34" stroke="currentColor" strokeWidth="1.5" />
        <line x1="40" y1="24" x2="40" y2="34" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="10" width="13" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24.5" y1="10" x2="24.5" y2="20" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (scene === 'gate') {
    return (
      <svg viewBox="0 0 48 36" aria-hidden="true">
        {[6, 12, 18, 24, 30, 36, 42].map(x => <line key={x} x1={x} y1="8" x2={x} y2="34" stroke="currentColor" strokeWidth="1" />)}
        <line x1="2" y1="14" x2="46" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="24" width="14" height="10" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true">
      <rect x="14" y="2" width="20" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30" cy="19" r="1.2" fill="currentColor" />
      <rect x="4" y="34" width="40" height="2" fill="currentColor" />
      <rect x="17" y="25" width="12" height="9" fill="currentColor" />
    </svg>
  );
}

function ProofPhoto({ d }: { d: Delivery }) {
  if (d.missing === 'photo' || d.missing === 'both') {
    return (
      <NewPart name="proof-thumb-empty" className="x-proof-none" as="span" role="img" aria-label="No photo taken"
        job="Shows that a delivery has no proof photo, in the photo column" why="No contract shows a missing image; an empty state is for a whole list"
        base="proof-thumb">
        –
      </NewPart>
    );
  }
  return (
    <NewPart name="proof-thumb" className="x-proof-thumb" as="span" role="img" aria-label={sceneLabel[d.scene]}
      job="A small preview of the photo a driver took at handover" why="The system has no image or thumbnail component">
      <SceneDrawing scene={d.scene} />
    </NewPart>
  );
}

function MissingProof({ missing }: { missing: Missing }) {
  if (missing === 'both') return <Badge tone="warning">Photo and signature</Badge>;
  if (missing === 'photo') return <Badge tone="warning">Photo</Badge>;
  if (missing === 'signature') return <Badge tone="warning">Signature</Badge>;
  return <Badge tone="positive">None</Badge>;
}

export default function PodQueue() {
  return (
    <ListPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Dispatch', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Drivers', href: '#' },
        { label: 'Deliveries', href: '#' },
        { label: 'Proof to review', href: '#', count: deliveries.length, current: true },
        { label: 'Customers', href: '#' },
      ]} />}
      title="Proof to review"
      filters={<ToggleGroup label="Filter deliveries" items={[
        { label: 'All', count: deliveries.length, selected: true },
        { label: 'Disputed', count: disputedCount },
        { label: 'Missing photo', count: missingPhotoCount },
        { label: 'Missing signature', count: missingSignatureCount },
      ]} />}
    >
      <Table columns={[
        { label: 'Parcel' },
        { label: 'Recipient' },
        { label: 'Driver' },
        { label: 'Marked delivered' },
        { label: 'Photo' },
        { label: 'Missing proof' },
        { label: 'Reason' },
      ]}>
        {deliveries.map(d => (
          <Tr key={d.parcel}>
            <Td><a href="#">{d.parcel}</a></Td>
            <Td>{d.recipient}</Td>
            <Td><Row><Avatar initials={d.initials} /><span>{d.driver}</span></Row></Td>
            <Td>{d.delivered}</Td>
            <Td><ProofPhoto d={d} /></Td>
            <Td><MissingProof missing={d.missing} /></Td>
            <Td>{d.disputed ? <Badge tone="critical">Disputed</Badge> : <Badge>Incomplete proof</Badge>}</Td>
          </Tr>
        ))}
      </Table>
    </ListPage>
  );
}
