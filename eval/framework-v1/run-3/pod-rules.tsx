import {
  AppShell, NavRail, PageHeader, Banner, Section, Stack, Row, Grid, Card,
  Table, Tr, Td, Badge, Button, MenuButton, Field, Checkbox, NewPart,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.x-proof-set { border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--s2); min-width: 0; }
.x-proof-set__legend { font: var(--type-body-strong); color: var(--ink); padding: 0; margin-bottom: var(--s2); }
.x-proof-set__hint { font: var(--type-small); color: var(--muted); }

.x-upload { display: flex; flex-direction: column; gap: var(--s1); }
.x-upload__label { font: var(--type-body-strong); color: var(--ink); }
.x-upload__body { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s4); padding: var(--s3); border: var(--border); border-radius: var(--radius); }
.x-upload__preview { width: 160px; height: 120px; flex: none; border-radius: var(--radius); background: var(--surface-sunken); overflow: hidden; }
.x-upload__preview svg { display: block; width: 100%; height: 100%; }
.x-upload__wall { fill: var(--surface-sunken); }
.x-upload__door { fill: var(--line); }
.x-upload__number { fill: var(--muted); font: var(--type-small); }
.x-upload__mat { fill: var(--muted); opacity: .35; }
.x-upload__parcel { fill: var(--surface); stroke: var(--muted); stroke-width: 1.5; }
.x-upload__tape { fill: var(--line); }
.x-upload__details { flex: 1; min-width: 180px; display: flex; flex-direction: column; gap: var(--s2); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
.x-upload__hint { font: var(--type-small); color: var(--muted); }
`;

const senders = [
  { name: 'Halden Wine Co.', parcels: 1240, photo: true, signature: true, id: true, since: '3 Mar 2026', status: <Badge tone="warning">Change scheduled</Badge> },
  { name: 'Northgate Pharmacy', parcels: 860, photo: true, signature: true, id: false, since: '12 Jan 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Brightloom Home', parcels: 2315, photo: true, signature: false, id: false, since: '28 Jul 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Okafor Electronics', parcels: 1078, photo: true, signature: true, id: false, since: '9 Sep 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Pellbray Vape Supply', parcels: 412, photo: true, signature: true, id: true, since: '17 Feb 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Little Fern Books', parcels: 594, photo: false, signature: false, id: false, since: 'Not set', status: <Badge>No rules</Badge> },
];

const yes = (v: boolean) => (v ? 'Required' : 'No');

function ExamplePhoto() {
  return (
    <NewPart
      name="file-upload"
      className="x-upload"
      job="Show the uploaded example proof photo and let the user replace or remove it"
      why="File upload is listed under Not built in rules.md; no contract covers a file and its preview"
    >
      <span className="x-upload__label" id="example-photo-label">Example photo</span>
      <div className="x-upload__body" role="group" aria-labelledby="example-photo-label">
        <div className="x-upload__preview">
          <svg viewBox="0 0 160 120" role="img" aria-label="Preview: a parcel on a doormat in front of door number 14, door and parcel both in frame">
            <rect className="x-upload__wall" x="0" y="0" width="160" height="120" />
            <rect className="x-upload__door" x="52" y="8" width="56" height="88" rx="2" />
            <text className="x-upload__number" x="80" y="30" textAnchor="middle">14</text>
            <rect className="x-upload__mat" x="36" y="96" width="88" height="16" rx="2" />
            <rect className="x-upload__parcel" x="60" y="76" width="40" height="28" rx="2" />
            <rect className="x-upload__tape" x="77" y="76" width="6" height="28" />
          </svg>
        </div>
        <div className="x-upload__details">
          <span className="x-upload__name">halden-good-proof-doorstep.jpg</span>
          <span className="x-upload__meta">1.8 MB · uploaded by Priya Shah on 6 Nov 2026</span>
          <Row>
            <Button variant="secondary">Replace photo</Button>
            <Button variant="ghost">Remove</Button>
          </Row>
        </div>
      </div>
      <p className="x-upload__hint">JPG or PNG, up to 5 MB. Drivers see this photo in the app before they take a proof photo for this sender: parcel, label and door number in one frame.</p>
    </NewPart>
  );
}

export default function PodRules() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Deliveries', href: '#', count: 3482 },
            { label: 'Disputes', href: '#', count: 7 },
            { label: 'Proof rules', href: '#', current: true },
            { label: 'Drivers', href: '#', count: 64 },
            { label: 'Senders', href: '#', count: 6 },
          ]}
        />
      }
    >
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender</Button>} />

      <Banner>
        <p>New rules apply to deliveries dispatched on or after their start date. Parcels already on a van keep the rules they left the depot with.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table
          columns={[
            { label: 'Sender' },
            { label: 'Parcels last 30 days', numeric: true },
            { label: 'Photo' },
            { label: 'Signature' },
            { label: 'ID check' },
            { label: 'Rules since' },
            { label: 'Status' },
            { label: 'Actions' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td numeric>{s.parcels.toLocaleString('en-GB')}</Td>
              <Td>{yes(s.photo)}</Td>
              <Td>{yes(s.signature)}</Td>
              <Td>{yes(s.id)}</Td>
              <Td>{s.since}</Td>
              <Td>{s.status}</Td>
              <Td>
                <MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to another sender' }]} />
              </Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Edit rules for Halden Wine Co." titleId="edit-rules">
        <Card>
          <Stack>
            <NewPart
              name="checkbox-group"
              as="fieldset"
              className="x-proof-set"
              job="Group the proof checkboxes under one legend"
              why="Checkbox has no group or legend; a form with several related checkboxes needs one label for the set"
            >
              <legend className="x-proof-set__legend">Proof the driver must collect</legend>
              <Checkbox label="Photo of the parcel at the delivery point" defaultChecked />
              <Checkbox label="Signature from the recipient" defaultChecked />
              <Checkbox label="ID check for age-restricted items (wine, spirits)" defaultChecked />
              <p className="x-proof-set__hint">With an ID check, the driver scans a photo ID and records the date of birth. No ID, no handover: the parcel goes back to the depot.</p>
            </NewPart>

            <Grid>
              <Field id="min-age" label="Minimum age for ID check" options={['18', '21', '25']} defaultValue="18" />
              <Field id="not-home" label="If the recipient is not home" options={['Return to depot', 'Try a neighbour, with signature', 'Leave in safe place, with photo']} defaultValue="Return to depot" hint="Leave in safe place is not allowed with an ID check" />
              <Field id="start-date" label="New rules start on" type="date" defaultValue="2026-11-16" hint="Current rules stay in place until then" />
            </Grid>

            <ExamplePhoto />

            <Row>
              <Button variant="primary">Save rules</Button>
              <Button variant="secondary">Cancel</Button>
            </Row>
          </Stack>
        </Card>
      </Section>
    </AppShell>
  );
}
