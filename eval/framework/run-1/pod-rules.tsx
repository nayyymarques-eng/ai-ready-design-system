import {
  FormPage, NavRail, Button, Banner, Section, Stack, Row, Card, Table, Tr, Td,
  Badge, Checkbox, Field, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.x-upload { display: flex; flex-wrap: wrap; gap: var(--s4); align-items: flex-start; }
.x-upload__preview { flex: 0 1 240px; min-width: 0; width: 100%; aspect-ratio: 4 / 3; position: relative; overflow: hidden;
  background: var(--surface-sunken); border: var(--border); border-radius: var(--radius); }
.x-upload__door { position: absolute; left: 14%; top: 10%; width: 40%; height: 90%; background: var(--surface); border: var(--border); }
.x-upload__number { position: absolute; left: 50%; top: 12%; transform: translateX(-50%); font: var(--type-small); color: var(--muted); }
.x-upload__parcel { position: absolute; left: 46%; bottom: 8%; width: 30%; height: 26%; background: var(--tint-warning); border: var(--border); border-radius: var(--radius); }
.x-upload__label { position: absolute; left: 20%; top: 25%; width: 60%; height: 30%; background: var(--surface); }
.x-upload__mat { position: absolute; left: 6%; right: 6%; bottom: 4%; height: 6%; background: var(--line); border-radius: var(--radius-pill); }
.x-upload__body { flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
.x-upload__drop { border: 1px dashed var(--line); border-radius: var(--radius); padding: var(--s4); font: var(--type-small); color: var(--muted); }
`;

const senders = [
  { name: 'Pellow & Strand Wines', photo: 'Yes', signature: 'Yes', id: 'Yes, Challenge 25', since: '2 Sep 2026', editing: true },
  { name: 'Quellby Pharmacy', photo: 'Yes', signature: 'Yes', id: 'No', since: '18 Aug 2026' },
  { name: 'Brackhollow Electronics', photo: 'Yes', signature: 'Over £250', id: 'No', since: '1 Oct 2026' },
  { name: 'Tansy & Holt Homeware', photo: 'Yes', signature: 'No', id: 'No', since: '12 Jul 2026' },
  { name: 'Vellacott Vape Supply', photo: 'Yes', signature: 'Yes', id: 'Yes, Challenge 25', since: '5 Oct 2026' },
  { name: 'Quillmere Books', photo: 'Yes', signature: 'No', id: 'No', since: '30 Jun 2026' },
];

export default function PodRules() {
  return (
    <FormPage
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Routes', href: '#' },
            { label: 'Drivers', href: '#', count: 38 },
            { label: 'Deliveries', href: '#' },
            { label: 'Disputes', href: '#', count: 7 },
            { label: 'Proof rules', href: '#', current: true },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
      title="Proof rules"
      actions={
        <>
          <Button variant="secondary">Discard changes</Button>
          <Button variant="primary">Save rules</Button>
        </>
      }
    >
      <Banner>
        <p>You are editing Pellow &amp; Strand Wines. Deliveries before the start date keep the current rules, so proof already collected is never judged against new ones.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table columns={[
          { label: 'Sender' },
          { label: 'Photo' },
          { label: 'Signature' },
          { label: 'ID check' },
          { label: 'Rules since' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.editing ? <Row>{s.name} <Badge tone="info">Editing</Badge></Row> : s.name}</Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td>{s.since}</Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Rules for Pellow & Strand Wines" titleId="rules">
        <Card>
          <Stack>
            <Checkbox label="Photo of the parcel at the delivery point" defaultChecked />
            <Checkbox label="Signature from the person who receives the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
            <Field
              id="id-policy"
              label="Check ID when the person looks under"
              options={['18 (check everyone)', '21', '25 (Challenge 25)']}
              defaultValue="25 (Challenge 25)"
              hint="Drivers record the ID type and year of birth, never the ID number."
            />
            <Field
              id="no-id"
              label="If the person has no valid ID"
              options={['Return the parcel to the depot', 'Try again on the next route', 'Hold at the nearest pickup point']}
              defaultValue="Return the parcel to the depot"
            />
            <Checkbox label="Allow safe-place delivery when nobody answers" />
          </Stack>
        </Card>
      </Section>

      <Section title="Start date" titleId="start">
        <Card>
          <Stack>
            <Field
              id="start-date"
              label="New rules start on"
              type="date"
              defaultValue="2026-11-16"
              hint="Applies to every delivery scheduled on or after this date. The earliest date you can pick is tomorrow."
            />
            <List>
              <ListItem label="Current rules" value="Since 2 Sep 2026" />
              <ListItem label="Deliveries already scheduled before 16 Nov" value="412" />
              <ListItem label="Drivers told about the change" value="On their next shift start" />
            </List>
          </Stack>
        </Card>
      </Section>

      <Section title="Example photo" titleId="example">
        <Card>
          <NewPart
            name="file-upload"
            className="x-upload"
            job="Upload one example image and show the one already uploaded"
            why="File upload is not built in this system (rules.md, section 13)"
          >
            <div className="x-upload__preview" role="img" aria-label="Example: a parcel on the doormat beside a front door, the house number and the parcel label both readable">
              <div className="x-upload__door"><span className="x-upload__number">14</span></div>
              <div className="x-upload__mat" />
              <div className="x-upload__parcel"><div className="x-upload__label" /></div>
            </div>
            <div className="x-upload__body">
              <span className="x-upload__name">harrow-finch-good-proof.jpg</span>
              <span className="x-upload__meta">1.8 MB · uploaded by Priya Shah on 2 Sep 2026</span>
              <span className="x-upload__meta">Drivers see this photo in the app before they take their own. A good photo shows the parcel, its label and the door number in one frame, in daylight or with the flash on.</span>
              <div className="x-upload__drop">Drop a JPG or PNG here, up to 5 MB, to replace the example.</div>
              <Row>
                <Button variant="secondary">Choose a new photo</Button>
                <Button variant="ghost">Remove</Button>
              </Row>
            </div>
          </NewPart>
        </Card>
      </Section>
    </FormPage>
  );
}
