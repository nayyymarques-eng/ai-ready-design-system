import {
  AppShell, NavRail, PageHeader, Banner, Section, Stack, Row, Card, Table, Tr, Td,
  Badge, MenuButton, ToggleGroup, Checkbox, Field, Button, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.x-fieldset { border: 0; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--s2); min-width: 0; }
.x-fieldset__legend { font: var(--type-body-strong); color: var(--ink); padding: 0; margin-bottom: var(--s2); }
.x-upload { display: flex; flex-direction: column; gap: var(--s2); }
.x-upload__label { font: var(--type-body-strong); color: var(--ink); }
.x-upload__zone { display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--s3); padding: var(--s5) var(--s4); border: 1px dashed var(--line); border-radius: var(--radius); background: var(--surface-sunken); }
.x-upload__hint { font: var(--type-small); color: var(--muted); }
.x-upload__input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
`;

type Sender = { name: string; photo: boolean; signature: boolean; id: boolean; since: string; status?: { tone: 'warning' | 'info'; text: string } };

const senders: Sender[] = [
  { name: 'Brennick Wines', photo: true, signature: true, id: true, since: '3 Mar 2026' },
  { name: 'Northgate Outdoor', photo: true, signature: false, id: false, since: '12 Jan 2026', status: { tone: 'info', text: 'Change on 1 Dec' } },
  { name: 'Halden Pharmacy', photo: true, signature: true, id: false, since: '28 Aug 2026' },
  { name: 'Brannock Vape Supplies', photo: true, signature: false, id: false, since: '9 Feb 2026', status: { tone: 'warning', text: 'Needs ID check' } },
  { name: 'Corvel Electronics', photo: true, signature: true, id: false, since: '17 May 2026' },
  { name: 'Lumo Home', photo: true, signature: false, id: false, since: '4 Apr 2026' },
  { name: 'Pell & Rowe Books', photo: true, signature: false, id: false, since: '4 Apr 2026' },
];

const req = (on: boolean) => (on ? 'Required' : 'Not required');

export default function PodRules() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#', count: 38 },
            { label: 'Drivers', href: '#', count: 24 },
            { label: 'Disputes', href: '#', count: 6 },
            { label: 'Proof rules', href: '#', current: true },
          ]}
        />
      }
    >
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender</Button>} />

      <Banner tone="warning">
        <p>Brannock Vape Supplies sends age-restricted items but has no ID check. Drivers can hand over vapes without checking age until its rules change.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup
          label="Filter senders"
          items={[
            { label: 'All', count: 7, selected: true },
            { label: 'ID check', count: 1 },
            { label: 'Changes scheduled', count: 1 },
          ]}
        />
        <Table
          columns={[
            { label: 'Sender' },
            { label: 'Photo' },
            { label: 'Signature' },
            { label: 'ID check (18+)' },
            { label: 'Rules since' },
            { label: 'Status' },
            { label: 'Actions' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{req(s.photo)}</Td>
              <Td>{req(s.signature)}</Td>
              <Td>{req(s.id)}</Td>
              <Td>{s.since}</Td>
              <Td>{s.status ? <Badge tone={s.status.tone}>{s.status.text}</Badge> : <Badge>Active</Badge>}</Td>
              <Td>
                <MenuButton
                  label={`Actions for ${s.name}`}
                  items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to another sender' }]}
                />
              </Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Edit rules for Northgate Outdoor" titleId="edit">
        <Card>
          <Stack>
            <NewPart
              name="fieldset"
              as="fieldset"
              className="x-fieldset"
              job="Groups the proof checkboxes under one legend"
              why="No contract groups several checkboxes with a shared label"
            >
              <legend className="x-fieldset__legend">Proof drivers must collect</legend>
              <Checkbox label="Photo of the parcel at the handover point" defaultChecked />
              <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
              <Checkbox label="ID check for age-restricted items (knives, tools with blades)" defaultChecked />
            </NewPart>

            <Field
              id="min-age"
              label="Minimum age for the ID check"
              options={['18', '21']}
              defaultValue="18"
              hint="Drivers scan a passport, driving licence or national ID card and do not hand over the parcel if the person is younger."
            />

            <Field
              id="start-date"
              label="New rules start on"
              type="date"
              defaultValue="2026-12-01"
              hint="Deliveries from this date use the new rules. Until then, drivers keep the current rules: photo only."
            />

            <NewPart
              name="file-upload"
              className="x-upload"
              job="Upload the example photo drivers see before they take a proof photo"
              why="File upload is not built (rules section 13)"
            >
              <label className="x-upload__label" htmlFor="example-photo">Example proof photo</label>
              <div className="x-upload__zone">
                <p>Drag a photo here, or choose one from your computer</p>
                <Button variant="secondary">Choose photo</Button>
                <p className="x-upload__hint">JPG or PNG, up to 10 MB. Show the parcel, the door number and the doorstep in one frame.</p>
              </div>
              <input className="x-upload__input" id="example-photo" type="file" accept="image/jpeg,image/png" />
              <List>
                <ListItem label="northgate-doorstep-example.jpg, 2.4 MB">
                  <Button variant="ghost">Remove</Button>
                </ListItem>
              </List>
            </NewPart>

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
