import { AppShell, NavRail, PageHeader, Banner, Section, Stack, Row, Table, Tr, Td, Badge, Card, Checkbox, Field, Button, MenuButton, List, ListItem, NewPart } from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.x-upload { display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__body { display: flex; flex-wrap: wrap; gap: var(--s4); align-items: flex-start; }
.x-upload__preview { width: 200px; max-width: 100%; aspect-ratio: 4 / 3; border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); display: flex; align-items: flex-end; justify-content: center; padding: var(--s3); position: relative; overflow: hidden; }
.x-upload__door { position: absolute; top: var(--s3); bottom: var(--s6); left: var(--s6); width: 64px; border: var(--border); border-radius: var(--radius) var(--radius) 0 0; background: var(--surface); }
.x-upload__number { position: absolute; top: var(--s4); right: var(--s5); font: var(--type-body-strong); color: var(--ink); }
.x-upload__parcel { position: relative; width: 56px; height: 40px; border-radius: var(--radius); background: var(--line); border: var(--border); }
.x-upload__meta { display: flex; flex-direction: column; gap: var(--s2); flex: 1; min-width: 200px; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); word-break: break-all; }
.x-upload__note { font: var(--type-small); color: var(--muted); }
.x-upload__drop { border: 1px dashed var(--line); border-radius: var(--radius); padding: var(--s4); text-align: center; font: var(--type-small); color: var(--muted); }
`;

const senders = [
  { name: 'Belvira Pharmacy', photo: 'Required', signature: 'Required', id: 'Required, 18+', since: '3 Mar 2026', status: <Badge tone="info">Change on 1 Dec</Badge> },
  { name: 'Harbour Wine Co.', photo: 'Required', signature: 'Required', id: 'Required, 18+', since: '12 Jan 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Nordbyte Electronics', photo: 'Required', signature: 'Required', id: 'Not required', since: '28 Aug 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Pebble & Pine Home', photo: 'Required', signature: 'Not required', id: 'Not required', since: '5 Feb 2026', status: <Badge tone="positive">Active</Badge> },
  { name: 'Volta Vape Supplies', photo: 'Required', signature: 'Required', id: 'Required, 18+', since: 'No rules yet', status: <Badge tone="warning">Draft</Badge> },
  { name: 'Fernhill Books', photo: 'Not required', signature: 'Not required', id: 'Not required', since: '19 Oct 2025', status: <Badge>Default rules</Badge> },
];

export default function PodRules() {
  return (
    <AppShell nav={<NavRail brand="Tolvane" items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#', count: 1284 },
      { label: 'Disputes', href: '#', count: 7 },
      { label: 'Proof rules', href: '#', current: true },
      { label: 'Drivers', href: '#', count: 42 },
      { label: 'Senders', href: '#', count: 18 },
      { label: 'Settings', href: '#' },
    ]} />}>
      <PageHeader title="Proof rules" actions={<Button variant="secondary">Add sender rules</Button>} />

      <Banner><p>Drivers see a sender's rules in the app before each handover. A change applies to deliveries from its start date; earlier deliveries keep the rules they were made under.</p></Banner>

      <Section title="Rules per sender" titleId="senders">
        <Table columns={[{ label: 'Sender' }, { label: 'Photo' }, { label: 'Signature' }, { label: 'ID check' }, { label: 'Rules since' }, { label: 'Status' }, { label: 'Actions' }]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td><strong>{s.name}</strong></Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td>{s.since}</Td>
              <Td>{s.status}</Td>
              <Td><MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'See rule history' }, { label: 'Reset to default rules', danger: true }]} /></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Edit rules for Belvira Pharmacy" titleId="edit">
        <Card>
          <Stack>
            <h3>Proof required at handover</h3>
            <Checkbox label="Photo of the parcel at the delivery point" defaultChecked />
            <Checkbox label="Signature from the recipient" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
            <Checkbox label="Hand to the named recipient only, never a neighbour" defaultChecked />
            <Field id="min-age" label="Minimum age for the ID check" options={['18', '21']} defaultValue="18" hint="Applies to parcels the sender marks as age-restricted, such as pain relief over 32 tablets." />
            <Field id="id-types" label="ID drivers may accept" options={['Passport or photo driving licence', 'Any government photo ID', 'Passport only']} defaultValue="Passport or photo driving licence" />
          </Stack>
          <Stack>
            <h3>When the new rules start</h3>
            <Field id="start-date" label="Start date" type="date" defaultValue="2026-12-01" hint="Deliveries on or after Tuesday 1 December 2026 use these rules. Today's rules stay until then." />
          </Stack>
          <Stack>
            <h3>Example proof photo</h3>
            <NewPart name="photo-upload" className="x-upload" job="Upload one example photo that drivers see as a good proof photo" why="File upload is listed as not built in rules.md">
              <div className="x-upload__body">
                <div className="x-upload__preview" role="img" aria-label="Example photo: a parcel on the doorstep, with the door and house number in frame">
                  <span className="x-upload__door" />
                  <span className="x-upload__number">14</span>
                  <span className="x-upload__parcel" />
                </div>
                <div className="x-upload__meta">
                  <span className="x-upload__name">greenleaf-good-proof.jpg</span>
                  <span className="x-upload__note">JPG, 1.4 MB, uploaded by Inês Carvalho on 6 Nov 2026</span>
                  <Row>
                    <Button variant="secondary">Replace photo</Button>
                    <Button variant="ghost">Remove</Button>
                  </Row>
                </div>
              </div>
              <p className="x-upload__drop">Drop a JPG or PNG here, up to 5 MB. Show the parcel, the door and the house number in one frame.</p>
            </NewPart>
          </Stack>
          <List>
            <ListItem label="Current rules" value="Photo, signature, ID check 18+" />
            <ListItem label="Changes on 1 Dec" value="Named recipient only, new example photo" />
          </List>
          <Row>
            <Button variant="primary">Save rules</Button>
            <Button variant="secondary">Cancel</Button>
          </Row>
        </Card>
      </Section>
    </AppShell>
  );
}
