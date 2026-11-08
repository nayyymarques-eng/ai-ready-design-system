/*
 * TPL-02: no template fits this screen on its own.
 * Closest: the list page (a table of senders and the proof each one requires).
 * It doesn't fit because the same screen also edits one sender's rules, saved together,
 * which is the form page's job; the list page holds only one table or empty state.
 * Built from the app shell, the page header and the layout components (section, grid, stack).
 */
import {
  AppShell, NavRail, PageHeader, Banner, Section, Grid, Row,
  ToggleGroup, Table, Tr, Td, Badge, MenuButton, Card, Field, Checkbox, Button, List, ListItem, NewPart,
} from '../src';

export const title = 'Proof rules';

export const css = `
.x-upload { display: flex; flex-direction: column; gap: var(--s3); }
.x-upload__preview { display: flex; align-items: flex-end; justify-content: center; min-height: 160px; padding: var(--s4); border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); }
.x-upload__parcel { width: 96px; height: 64px; border: var(--border); border-radius: var(--radius); background: var(--tint-warning); }
.x-upload__door { width: 64px; height: 128px; margin-left: var(--s4); border: var(--border); border-radius: var(--radius); background: var(--surface); }
.x-upload__meta { font: var(--type-small); color: var(--muted); }
`;

type Need = 'Required' | 'Not required' | 'Age-restricted items';
type Sender = {
  name: string;
  items: string;
  photo: Need;
  signature: Need;
  idCheck: Need;
  since: string;
  perWeek: number;
  status?: { tone: 'warning' | 'info'; label: string };
};

const senders: Sender[] = [
  { name: 'Wrenholt Pharmacy', items: 'Prescriptions, health products', photo: 'Required', signature: 'Required', idCheck: 'Age-restricted items', since: '2 Sep 2026', perWeek: 1840, status: { tone: 'info', label: 'Editing' } },
  { name: 'Velloway Wines', items: 'Wine, spirits', photo: 'Required', signature: 'Required', idCheck: 'Required', since: '14 Jul 2026', perWeek: 960 },
  { name: 'Dremwick Electronics', items: 'Phones, laptops, accessories', photo: 'Required', signature: 'Required', idCheck: 'Not required', since: '1 Oct 2026', perWeek: 2310 },
  { name: 'Quorrin Books', items: 'Books, stationery', photo: 'Required', signature: 'Not required', idCheck: 'Not required', since: '3 Mar 2026', perWeek: 3125 },
  { name: 'Yarrowby Vape Co.', items: 'E-cigarettes, refills', photo: 'Required', signature: 'Required', idCheck: 'Required', since: '20 Nov 2026', perWeek: 410, status: { tone: 'warning', label: 'Scheduled' } },
  { name: 'Morvane Home', items: 'Furniture, kitchenware', photo: 'Required', signature: 'Required', idCheck: 'Not required', since: '18 Aug 2026', perWeek: 690 },
  { name: 'Moss & Wickett', items: 'Toys, baby products', photo: 'Not required', signature: 'Not required', idCheck: 'Not required', since: '5 Jan 2026', perWeek: 1270, status: { tone: 'warning', label: 'No proof' } },
];

const count = (f: (s: Sender) => boolean) => senders.filter(f).length;

export default function PodRules() {
  return (
    <AppShell nav={<NavRail brand="Tolvane" items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#' },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Proof to review', href: '#', count: 9 },
      { label: 'Proof rules', href: '#', current: true },
      { label: 'Customers', href: '#' },
      { label: 'Settings', href: '#' },
    ]} />}>
      <PageHeader
        title="Proof rules"
        actions={<><Button variant="secondary">Add sender</Button><Button variant="primary">Save Wrenholt Pharmacy rules</Button></>}
      />

      <Banner tone="warning">
        <p>Moss &amp; Wickett has no proof rules. Drivers can mark its parcels delivered without a photo or signature, so disputes can't be checked.</p>
      </Banner>

      <Section title="Senders" titleId="senders">
        <ToggleGroup label="Filter senders" items={[
          { label: 'All', count: senders.length, selected: true },
          { label: 'ID check', count: count(s => s.idCheck !== 'Not required') },
          { label: 'Signature', count: count(s => s.signature === 'Required') },
          { label: 'Scheduled', count: count(s => s.status?.label === 'Scheduled') },
        ]} />
        <Table columns={[
          { label: 'Sender' },
          { label: 'Photo' },
          { label: 'Signature' },
          { label: 'ID check' },
          { label: 'Rules from' },
          { label: 'Parcels a week', numeric: true },
          { label: 'Actions' },
        ]}>
          {senders.map(s => (
            <Tr key={s.name}>
              <Td>
                <Row><strong>{s.name}</strong>{s.status ? <Badge tone={s.status.tone}>{s.status.label}</Badge> : null}</Row>
                {s.items}
              </Td>
              <Td>{s.photo}</Td>
              <Td>{s.signature}</Td>
              <Td>{s.idCheck}</Td>
              <Td>{s.since}</Td>
              <Td numeric>{s.perWeek.toLocaleString('en-GB')}</Td>
              <Td><MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'See rule history' }, { label: 'Copy rules to another sender' }]} /></Td>
            </Tr>
          ))}
        </Table>
      </Section>

      <Grid>
        <Section title="Proof for Wrenholt Pharmacy" titleId="proof">
          <Card>
            <Checkbox label="Photo of the parcel at the drop-off point" defaultChecked />
            <Checkbox label="Signature from the recipient" defaultChecked />
            <Checkbox label="ID check for age-restricted items" defaultChecked />
            <Checkbox label="Allow a safe place when nobody answers" />
            <Field id="min-photos" label="Photos per delivery" options={['1 photo', '2 photos', '3 photos']} defaultValue="2 photos" hint="One of the parcel, one of the door or house number" />
            <Field id="min-age" label="Minimum age for restricted items" options={['16', '18', '21']} defaultValue="18" hint="Drivers check a photo ID and enter the birth year" />
            <Field id="who-signs" label="Who can sign" options={['Recipient only', 'Recipient or neighbour', 'Anyone at the address']} defaultValue="Recipient only" />
          </Card>
        </Section>

        <Section title="When the new rules start" titleId="start">
          <Card>
            <Field id="start-date" label="Start date" type="date" defaultValue="2026-11-16" hint="Applies to parcels collected from this date. Parcels already on a route keep the old rules." />
            <List>
              <ListItem label="Rules now" value="Since 2 Sep 2026" />
              <ListItem label="Parcels on routes" value="312" />
              <ListItem label="Drivers told" value="When you save" />
            </List>
          </Card>
        </Section>

        <Section title="Example proof photo" titleId="example">
          <Card>
            <NewPart
              name="file-upload"
              className="x-upload"
              job="Upload one example photo and show the one that is there now"
              why="File upload is not built (rules.md, Not built)"
            >
              <NewPart
                name="photo-preview"
                className="x-upload__preview"
                role="img"
                aria-label="Example photo: a parcel on the doorstep, beside the front door, house number in view"
                job="Show the current example photo without loading an image file"
                why="No image component, and the screen can't load image files"
              >
                <span className="x-upload__parcel" />
                <span className="x-upload__door" />
              </NewPart>
              <p className="x-upload__meta">doorstep-good-example.jpg, 1.2 MB, added 2 Sep 2026</p>
              <p>Drivers see this photo in the app before they take their own. Show the whole parcel, the door and the house number, in daylight or with the flash on.</p>
              <Row>
                <Button variant="secondary">Upload a new photo</Button>
                <Button variant="ghost">Remove</Button>
              </Row>
            </NewPart>
          </Card>
        </Section>
      </Grid>
    </AppShell>
  );
}
