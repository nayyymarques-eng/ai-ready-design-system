/*
 * TPL-02: no template fits this screen, so it is built from the app shell, the page header and sections.
 * Closest: the form page (one sender's rules are edited and saved together from the header).
 * It does not fit because the screen also lists every sender in a table, and the form page holds
 * only form sections, each in one card, while a table never goes inside a card.
 * The list page came second: it holds the table, but not the form for one sender.
 */
import {
  AppShell, NavRail, PageHeader, Section, Stack, Row, Card, Table, Tr, Td,
  Badge, Banner, Button, Field, Checkbox, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules';

export const css = `
.x-upload { display: flex; flex-wrap: wrap; gap: var(--s5); align-items: flex-start; }
.x-upload__preview {
  position: relative; flex: 0 0 auto; width: 240px; max-width: 100%; aspect-ratio: 4 / 3;
  background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); overflow: hidden;
}
.x-upload__door {
  position: absolute; left: 18%; top: 10%; width: 38%; height: 90%;
  border: var(--border); border-bottom: 0; background: var(--surface);
}
.x-upload__number {
  position: absolute; left: 22%; top: 18%; font: var(--type-small); color: var(--text);
}
.x-upload__parcel {
  position: absolute; left: 50%; bottom: 8%; width: 30%; height: 26%;
  background: var(--tint-warning); border: var(--border); border-radius: var(--radius);
}
.x-upload__ground { position: absolute; left: 0; right: 0; bottom: 0; height: 8%; background: var(--line); }
.x-upload__details { flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
`;

type Sender = {
  name: string;
  parcels: string;
  photo: boolean;
  signature: boolean;
  idCheck: string | null;
  from: string;
  status: { label: string; tone?: 'positive' | 'warning' | 'info' };
};

const senders: Sender[] = [
  { name: 'Brightwell Pharmacy', parcels: '1,240', photo: true, signature: true, idCheck: null, from: '3 Nov 2026', status: { label: 'Active', tone: 'positive' } },
  { name: 'Hollis & Reed Wines', parcels: '386', photo: true, signature: true, idCheck: null, from: '3 Nov 2026', status: { label: 'Unsaved', tone: 'warning' } },
  { name: 'Cartwheel Books', parcels: '2,015', photo: true, signature: false, idCheck: null, from: '3 Nov 2026', status: { label: 'Active', tone: 'positive' } },
  { name: 'Northgate Electronics', parcels: '918', photo: true, signature: true, idCheck: null, from: '10 Nov 2026', status: { label: 'Active', tone: 'positive' } },
  { name: 'Fernleaf Grocers', parcels: '3,470', photo: true, signature: false, idCheck: null, from: '17 Nov 2026', status: { label: 'Scheduled', tone: 'info' } },
  { name: 'Mill Lane Vapour', parcels: '154', photo: true, signature: true, idCheck: '18+', from: '3 Nov 2026', status: { label: 'Active', tone: 'positive' } },
  { name: 'Larkmoor Outdoor', parcels: '627', photo: true, signature: false, idCheck: null, from: '24 Nov 2026', status: { label: 'Scheduled', tone: 'info' } },
  { name: 'Pip & Tuck Kids', parcels: '1,082', photo: false, signature: false, idCheck: null, from: 'No rules yet', status: { label: 'Not set' } },
];

const yesNo = (v: boolean) => (v ? 'Required' : 'No');

export default function PodRules() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#', count: 42 },
            { label: 'Drivers', href: '#', count: 118 },
            { label: 'Disputes', href: '#', count: 7 },
            { label: 'Proof rules', href: '#', current: true },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof rules"
        actions={<><Button variant="secondary">Discard changes</Button><Button variant="primary">Save rules</Button></>}
      />

      <Banner>
        <p>New rules apply to deliveries scheduled on or after their start date. Drivers see them in the app the evening before.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table
          columns={[
            { label: 'Sender' },
            { label: 'Parcels a week', numeric: true },
            { label: 'Photo' },
            { label: 'Signature' },
            { label: 'ID check' },
            { label: 'Rules from' },
            { label: 'Status' },
            { label: 'Action' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td numeric>{s.parcels}</Td>
              <Td>{yesNo(s.photo)}</Td>
              <Td>{yesNo(s.signature)}</Td>
              <Td>{s.idCheck ?? 'No'}</Td>
              <Td>{s.from}</Td>
              <Td><Badge tone={s.status.tone}>{s.status.label}</Badge></Td>
              <Td><Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Proof for Hollis & Reed Wines" titleId="proof">
        <Card>
          <Stack>
            <Checkbox label="Photo of the parcel at the handover point" defaultChecked />
            <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted items (wine, spirits)" defaultChecked />
          </Stack>
          <Field
            id="min-age"
            label="Minimum age for the ID check"
            options={['18', '21', '25']}
            defaultValue="18"
            hint="Drivers check a passport, driving licence or PASS card. If the person is under age or has no ID, the parcel goes back to the depot."
          />
          <Field
            id="who-signs"
            label="Who can sign"
            options={['The named customer only', 'Anyone over 18 at the address']}
            defaultValue="The named customer only"
          />
        </Card>
      </Section>

      <Section title="When the new rules start" titleId="start">
        <Card>
          <Field
            id="start-date"
            label="Start date"
            type="date"
            defaultValue="2026-12-01"
            hint="Until 1 Dec 2026, drivers ask for a photo and a signature, with no ID check. 64 deliveries for this sender are already scheduled on or after the start date."
          />
        </Card>
      </Section>

      <Section title="Example proof photo" titleId="example">
        <Card>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example photo and show it, with its name, size and actions to replace or remove it"
            why="The system has no file upload (rules, not built)"
          >
            <div className="x-upload__preview" role="img" aria-label="Example photo: a parcel on the doorstep beside the front door, with the house number in frame">
              <div className="x-upload__door" />
              <span className="x-upload__number">14</span>
              <div className="x-upload__ground" />
              <div className="x-upload__parcel" />
            </div>
            <div className="x-upload__details">
              <span className="x-upload__name">hollis-reed-doorstep-example.jpg</span>
              <span className="x-upload__meta">JPG, 1.8 MB, uploaded 9 Nov 2026 by Marta Silva</span>
              <List>
                <ListItem label="The parcel and the door number in one frame" />
                <ListItem label="Taken from standing height, in daylight or with the flash on" />
                <ListItem label="No faces, no car plates, nothing inside the house" />
              </List>
              <Row>
                <Button variant="secondary">Replace photo</Button>
                <Button variant="tertiary">Remove photo</Button>
              </Row>
            </div>
          </NewPart>
        </Card>
      </Section>
    </AppShell>
  );
}
