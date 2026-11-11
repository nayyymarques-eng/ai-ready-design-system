import {
  FormPage, NavRail, Section, Stack, Row, Card, Table, Tr, Td, Badge, Button,
  Checkbox, Field, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules';

export const css = `
.x-upload { display: grid; grid-template-columns: 176px minmax(0, 1fr); gap: var(--s4); align-items: start; }
.x-upload__photo { aspect-ratio: 4 / 3; background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); position: relative; overflow: hidden; }
.x-upload__door { position: absolute; left: 18%; top: 12%; width: 38%; bottom: 0; border: var(--border); border-bottom: 0; background: var(--surface); }
.x-upload__number { position: absolute; left: 62%; top: 16%; font: var(--type-small); color: var(--muted); }
.x-upload__parcel { position: absolute; right: 14%; bottom: 8%; width: 30%; height: 26%; background: var(--line); border-radius: var(--radius); }
.x-upload__label { position: absolute; right: 19%; bottom: 15%; width: 14%; height: 9%; background: var(--surface); }
.x-upload__details { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
.x-upload__actions { padding-top: var(--s2); }
@media (max-width: 720px) { .x-upload { grid-template-columns: minmax(0, 1fr); } .x-upload__photo { max-width: 240px; } }
`;

const senders = [
  { name: 'Corvo Wine Club', photo: 'Required', signature: 'Required', id: 'No', since: '3 Mar 2026', editing: true },
  { name: 'Lumen Pharmacy', photo: 'Required', signature: 'Required', id: 'No', since: '12 Jan 2026' },
  { name: 'Vapehaus', photo: 'Required', signature: 'Required', id: '18+', since: '20 Aug 2026' },
  { name: 'Halden Electronics', photo: 'Required', signature: 'Over €250', id: 'No', since: '5 May 2026' },
  { name: 'Pellow & Daughters', photo: 'Required', signature: 'Required', id: 'No', since: '18 Feb 2026' },
  { name: 'Northfold Outdoor', photo: 'Required', signature: 'No', id: 'No', since: '9 Sep 2026' },
  { name: 'Brightleaf Books', photo: 'Required', signature: 'No', id: 'No', since: '9 Sep 2026' },
  { name: 'Marrow Kitchen', photo: 'Required', signature: 'No', id: 'No', since: '27 Oct 2026' },
];

export default function PodRules() {
  return (
    <FormPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Deliveries', href: '#' },
        { label: 'Drivers', href: '#', count: 38 },
        { label: 'Disputes', href: '#', count: 7 },
        { label: 'Proof rules', href: '#', current: true },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Proof rules"
      actions={<>
        <Button variant="secondary">Discard changes</Button>
        <Button variant="primary">Save rules</Button>
      </>}
    >
      <Section title="Senders" titleId="senders">
        <Table columns={[
          { label: 'Sender' }, { label: 'Photo' }, { label: 'Signature' }, { label: 'ID check' },
          { label: 'Rules since' }, { label: 'Edit' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td>{s.since}</Td>
              <Td>{s.editing
                ? <Badge tone="info">Editing</Badge>
                : <Button variant="tertiary" aria-label={`Edit rules for ${s.name}`}>Edit</Button>}</Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Rules for Corvo Wine Club" titleId="rules">
        <Card>
          <p>Drivers must collect every proof ticked here before they can mark a Corvo Wine Club parcel as delivered.</p>
          <Stack>
            <Checkbox label="Photo of the parcel at the delivery address" defaultChecked />
            <Checkbox label="Recipient's signature on the driver's phone" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
          </Stack>
          <Field id="min-age" label="Minimum age" options={['18', '21', '25']} defaultValue="18"
            hint="Applies to wine, spirits and gift sets with alcohol. Drivers check a photo ID and enter its last four digits." />
          <Field id="no-id" label="If the recipient can't show ID" options={['Return the parcel to the depot', 'Try again the next working day']}
            defaultValue="Return the parcel to the depot" hint="Drivers never leave age-restricted items with a neighbour or in a safe place." />
        </Card>
      </Section>

      <Section title="Start date" titleId="start">
        <Card>
          <Field id="start-date" label="New rules start on" type="date" defaultValue="2026-12-01"
            hint="Parcels loaded on or after this date use the new rules. Until then, drivers collect a photo and a signature, with no ID check." />
        </Card>
      </Section>

      <Section title="Example photo" titleId="example">
        <Card>
          <p>Drivers see this photo in the app before their first Corvo Wine Club stop of the day.</p>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example proof photo and show the uploaded file"
            why="File upload is not built yet (rules.md, section 13)"
          >
            <NewPart
              name="photo-preview"
              className="x-upload__photo"
              job="Show a preview of the uploaded example photo"
              why="The system has no image component, and the screen may not load image files"
              role="img"
              aria-label="Example photo: a parcel on a doorstep, label facing the camera, door number 14 in frame"
            >
              <span className="x-upload__door" />
              <span className="x-upload__number">14</span>
              <span className="x-upload__parcel" />
              <span className="x-upload__label" />
            </NewPart>
            <div className="x-upload__details">
              <span className="x-upload__name">corvo-good-proof-photo.jpg</span>
              <span className="x-upload__meta">2.4 MB, 1600 × 1200</span>
              <span className="x-upload__meta">Uploaded 10 Nov 2026 by Inês Valente</span>
              <span className="x-upload__meta">JPG or PNG, up to 10 MB</span>
              <div className="x-upload__actions">
                <Row>
                  <Button variant="secondary">Replace photo</Button>
                  <Button variant="tertiary">Remove</Button>
                </Row>
              </div>
            </div>
          </NewPart>
          <List>
            <ListItem label="The label" value="Readable, facing the camera" />
            <ListItem label="The place" value="Door number or a landmark in frame" />
            <ListItem label="People" value="No faces in the photo" />
          </List>
        </Card>
      </Section>
    </FormPage>
  );
}
