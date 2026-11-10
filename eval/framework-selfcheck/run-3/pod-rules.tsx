import {
  FormPage, NavRail, Button, Banner, Section, Card, Stack, Row, Table, Tr, Td, Badge,
  Checkbox, Field, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.x-upload { display: flex; flex-direction: column; gap: var(--s4); }
.x-upload__file { display: flex; gap: var(--s4); align-items: flex-start; flex-wrap: wrap; }
.x-upload__preview { position: relative; width: 160px; height: 120px; flex: none; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.x-upload__door { position: absolute; left: 50%; bottom: 0; width: 64px; height: 100px; transform: translateX(-50%); background: var(--line); border-radius: var(--radius) var(--radius) 0 0; }
.x-upload__number { position: absolute; left: 50%; top: var(--s3); transform: translateX(-50%); font: var(--type-small); color: var(--ink); }
.x-upload__parcel { position: absolute; left: var(--s4); bottom: var(--s2); width: 44px; height: 36px; background: var(--muted); border-radius: var(--radius); }
.x-upload__label { position: absolute; left: var(--s4); bottom: var(--s5); width: 20px; height: 12px; margin-left: var(--s3); background: var(--surface); border-radius: var(--radius); }
.x-upload__meta { display: flex; flex-direction: column; gap: var(--s1); min-width: 0; flex: 1 1 200px; }
.x-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.x-upload__note { font: var(--type-small); color: var(--muted); }
.x-upload__drop { border: 1px dashed var(--muted); border-radius: var(--radius); padding: var(--s4); display: flex; flex-direction: column; gap: var(--s1); align-items: flex-start; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#', count: 38 },
      { label: 'Drivers', href: '#', count: 64 },
      { label: 'Deliveries', href: '#' },
      { label: 'Disputes', href: '#', count: 7 },
      { label: 'Proof rules', href: '#', current: true },
      { label: 'Settings', href: '#' },
    ]}
  />
);

const senders = [
  { name: 'Harbour Cellars', photo: 'Yes', signature: 'No', id: 'No', parcels: 412, status: <Badge tone="info">Editing</Badge> },
  { name: 'Kestrel Pharmacy', photo: 'Yes', signature: 'Yes', id: 'Yes', parcels: 1286, status: <Badge tone="positive">Active</Badge> },
  { name: 'Northloop Electronics', photo: 'Yes', signature: 'Yes', id: 'No', parcels: 2140, status: <Badge tone="positive">Active</Badge> },
  { name: 'Brightwell Books', photo: 'Yes', signature: 'No', id: 'No', parcels: 3075, status: <Badge tone="positive">Active</Badge> },
  { name: 'Mossgrove Garden Supply', photo: 'Yes', signature: 'No', id: 'No', parcels: 584, status: <Badge tone="warning">Change on 1 Dec</Badge> },
  { name: 'Ferro & Finch Tools', photo: 'Yes', signature: 'Yes', id: 'Yes', parcels: 367, status: <Badge tone="positive">Active</Badge> },
  { name: 'Lumen Home', photo: 'No', signature: 'No', id: 'No', parcels: 958, status: <Badge>No rules</Badge> },
];

export default function PodRules() {
  return (
    <FormPage
      nav={nav}
      title="Proof rules"
      actions={<><Button variant="secondary">Discard changes</Button><Button variant="primary">Save rules</Button></>}
    >
      <Banner>
        <p>Rules apply to deliveries on routes planned from their start date. Parcels already on a route keep the rules they left the depot with.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <Table
          columns={[
            { label: 'Sender' },
            { label: 'Photo' },
            { label: 'Signature' },
            { label: 'ID check' },
            { label: 'Parcels a week', numeric: true },
            { label: 'Status' },
          ]}
        >
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>{s.name}</Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.id}</Td>
              <Td numeric>{s.parcels.toLocaleString('en-GB')}</Td>
              <Td>{s.status}</Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Section title="Proof for Harbour Cellars" titleId="proof">
        <Card>
          <p>Harbour Cellars sells wine and spirits. Today drivers take a photo only. 3 of the 9 disputes from this sender in October had no signature to check against.</p>
          <Stack>
            <Checkbox label="Photo of the parcel at the drop-off point" defaultChecked />
            <Checkbox label="Signature from the person who takes the parcel" defaultChecked />
            <Checkbox label="ID check for age-restricted items (alcohol)" defaultChecked />
          </Stack>
          <Field id="min-age" label="Minimum age for the ID check" options={['18', '21', '25']} defaultValue="18" />
          <Field
            id="id-fail"
            label="If the ID check fails"
            options={['Return the parcel to the depot', 'Try again on the next delivery day', 'Call the sender before leaving']}
            defaultValue="Return the parcel to the depot"
          />
          <Checkbox label="Allow a safe place when nobody answers (photo only, items without an ID check)" />
        </Card>
      </Section>

      <Section title="Start date" titleId="start">
        <Card>
          <Field
            id="starts"
            label="New rules start on"
            type="date"
            defaultValue="2026-11-24"
            hint="Routes planned for Monday 24 November and later use the new rules. Drivers see them in the app the evening before."
          />
          <List>
            <ListItem label="Current rules" value="Since 3 March 2026" />
            <ListItem label="Routes affected in the first week" value="22" />
          </List>
        </Card>
      </Section>

      <Section title="Example photo for drivers" titleId="example">
        <Card>
          <p>Drivers see this photo in the app before their first Harbour Cellars stop, as an example of a good proof photo.</p>
          <NewPart
            name="file-upload"
            job="Upload one example photo and show the file that is attached"
            why="The system has no file upload yet (rules.md, Not built)"
            className="x-upload"
          >
            <div className="x-upload__file">
              <div className="x-upload__preview" role="img" aria-label="Example: a parcel on the doorstep beside a front door, house number in view">
                <div className="x-upload__door"><span className="x-upload__number">14</span></div>
                <div className="x-upload__parcel" />
                <div className="x-upload__label" />
              </div>
              <div className="x-upload__meta">
                <span className="x-upload__name">harbour-cellars-doorstep.jpg</span>
                <span className="x-upload__note">2.4 MB, uploaded by Priya Nair on 6 November</span>
                <Row>
                  <Button variant="secondary">Replace photo</Button>
                  <Button variant="tertiary">Remove</Button>
                </Row>
              </div>
            </div>
            <div className="x-upload__drop">
              <span className="x-upload__name">Drop a new photo here, or choose a file</span>
              <span className="x-upload__note">JPG or PNG, up to 10 MB, taken in landscape</span>
            </div>
          </NewPart>
          <List>
            <ListItem label="The whole parcel and its label" value="In view" />
            <ListItem label="The door or house number" value="In view" />
            <ListItem label="Faces and the inside of the home" value="Out of view" />
          </List>
        </Card>
      </Section>
    </FormPage>
  );
}
