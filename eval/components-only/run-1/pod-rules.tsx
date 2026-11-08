import {
  AppShell, NavRail, PageHeader, Section, Stack, Row, Card, Button, MenuButton, Field,
  Checkbox, ToggleGroup, Table, Tr, Td, Badge, Banner, List, ListItem, Numeral,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 360px); gap: var(--s5); align-items: start; }
.pod-toolbar { display: flex; justify-content: space-between; align-items: center; gap: var(--s3); flex-wrap: wrap; }
.pod-sender { display: flex; flex-direction: column; }
.pod-sender__meta { font: var(--type-small); color: var(--muted); }
.pod-none { color: var(--muted); white-space: nowrap; }
.pod-layout .table .badge, .pod-nowrap { white-space: nowrap; }
.pod-layout .table th, .pod-layout .table td { padding-left: var(--s3); padding-right: var(--s3); }
.pod-fieldset { border: 0; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--s3); }
.pod-legend { font: var(--type-body-strong); color: var(--ink); padding: 0; margin-bottom: var(--s1); }
.pod-option { display: flex; flex-direction: column; gap: 2px; }
.pod-option__hint { font: var(--type-small); color: var(--muted); padding-left: var(--s5); }
.pod-note { font: var(--type-small); color: var(--muted); }
.pod-divider { border: 0; border-top: var(--border); margin: 0; width: 100%; }
.pod-upload { display: flex; gap: var(--s4); align-items: flex-start; padding: var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); }
.pod-upload__info { display: flex; flex-direction: column; align-items: flex-start; gap: var(--s2); min-width: 0; }
.pod-upload__name { font: var(--type-body-strong); color: var(--ink); overflow-wrap: anywhere; }
.pod-drop { display: flex; flex-direction: column; align-items: center; gap: var(--s1); text-align: center; padding: var(--s4); border: 1px dashed var(--line); border-radius: var(--radius); color: var(--muted); font: var(--type-small); }
.pod-drop strong { font: var(--type-body-strong); color: var(--ink); }
.pod-photo { position: relative; flex: none; width: 112px; height: 140px; border-radius: var(--radius); overflow: hidden; background: var(--line); }
.pod-photo__door { position: absolute; left: 18px; right: 18px; top: 10px; bottom: 30px; background: var(--muted); border-radius: 2px 2px 0 0; }
.pod-photo__handle { position: absolute; right: 26px; top: 66px; width: 6px; height: 6px; border-radius: var(--radius-pill); background: var(--surface-sunken); }
.pod-photo__number { position: absolute; left: 0; right: 0; top: 20px; text-align: center; font: var(--type-small); color: var(--surface); }
.pod-photo__step { position: absolute; left: 0; right: 0; bottom: 0; height: 30px; background: var(--text); }
.pod-photo__box { position: absolute; left: 34px; bottom: 22px; width: 44px; height: 34px; background: var(--warning); border-radius: 2px; }
.pod-photo__tape { position: absolute; left: 50%; top: 0; bottom: 0; width: 8px; margin-left: -4px; background: var(--tint-warning); }
.pod-photo__label { position: absolute; left: 6px; top: 8px; width: 14px; height: 10px; background: var(--surface); }
.pod-actions { display: flex; justify-content: flex-end; gap: var(--s2); flex-wrap: wrap; }
@media (max-width: 1080px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 420px) {
  .pod-upload { flex-direction: column; }
  .pod-actions .btn { flex: 1; justify-content: center; }
}
`;

type Proof = 'Required' | 'Optional' | 'Off';
type Sender = {
  name: string; meta: string; photo: Proof; signature: Proof; id: string; since: string;
  status?: { tone: 'info' | 'warning'; text: string };
};

const senders: Sender[] = [
  { name: 'Northgate Pharmacy', meta: '1,240 parcels a month', photo: 'Required', signature: 'Required', id: '16+, medicines', since: '1 Sep 2026', status: { tone: 'info', text: 'Editing' } },
  { name: 'Calder Wine Co.', meta: '860 parcels a month', photo: 'Required', signature: 'Required', id: '18+, all', since: '14 Jul 2026' },
  { name: 'Brightwell Electronics', meta: '3,410 parcels a month', photo: 'Required', signature: 'Required', id: 'Off', since: '2 Jun 2026' },
  { name: 'Hollin & Reed Books', meta: '2,180 parcels a month', photo: 'Required', signature: 'Optional', id: 'Off', since: '2 Jun 2026' },
  { name: 'Ardent Vape Supply', meta: '410 parcels a month', photo: 'Required', signature: 'Required', id: '18+, all', since: '1 Dec 2026', status: { tone: 'warning', text: 'Starts 1 Dec' } },
  { name: 'Moss Lane Grocers', meta: '5,920 parcels a month', photo: 'Required', signature: 'Off', id: '18+, alcohol', since: '20 Aug 2026' },
  { name: 'Pellow Home & Garden', meta: '1,030 parcels a month', photo: 'Optional', signature: 'Off', id: 'Off', since: '2 Jun 2026' },
];

function ProofCell({ value }: { value: Proof | string }) {
  if (value === 'Off') return <span className="pod-none">No</span>;
  if (value === 'Required') return <Badge tone="positive">Required</Badge>;
  if (value === 'Optional') return <Badge>Optional</Badge>;
  return <Badge tone="warning">{value}</Badge>;
}

function ExamplePhoto() {
  return (
    <div className="pod-photo" role="img" aria-label="Example photo: a taped parcel on the doorstep in front of door number 14, label facing the camera">
      <div className="pod-photo__door"><span className="pod-photo__number">14</span></div>
      <div className="pod-photo__handle" />
      <div className="pod-photo__step" />
      <div className="pod-photo__box"><div className="pod-photo__tape" /><div className="pod-photo__label" /></div>
    </div>
  );
}

export default function PodRules() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 1842 },
            { label: 'Drivers', href: '#', count: 64 },
            { label: 'Routes', href: '#' },
            { label: 'Disputes', href: '#', count: 9 },
            { label: 'Proof rules', href: '#', current: true },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof rules"
        status={<Badge tone="info">New</Badge>}
        actions={<><Button variant="secondary">Download rules (CSV)</Button><Button variant="primary">Add sender</Button></>}
      />

      <p>What drivers must collect when they hand over a parcel, set per sender. The operations team reviews this proof when a customer disputes a delivery.</p>

      <div className="pod-layout">
        <Section title="Senders" titleId="senders">
          <div className="pod-toolbar">
            <ToggleGroup
              label="Filter senders"
              items={[
                { label: 'All', count: 7, selected: true },
                { label: 'ID check', count: 4 },
                { label: 'Changes scheduled', count: 1 },
              ]}
            />
            <span className="pod-note">Default for new senders: photo required</span>
          </div>
          <Table columns={[
            { label: 'Sender' }, { label: 'Photo' }, { label: 'Signature' }, { label: 'ID check' }, { label: 'Since' }, { label: 'Actions' },
          ]}>
            {senders.map(s => (
              <Tr key={s.name}>
                <Td>
                  <div className="pod-sender">
                    <Row><strong>{s.name}</strong>{s.status ? <Badge tone={s.status.tone}>{s.status.text}</Badge> : null}</Row>
                    <span className="pod-sender__meta">{s.meta}</span>
                  </div>
                </Td>
                <Td><ProofCell value={s.photo} /></Td>
                <Td><ProofCell value={s.signature} /></Td>
                <Td><ProofCell value={s.id} /></Td>
                <Td><span className="pod-nowrap">{s.since}</span></Td>
                <Td><MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to…' }]} /></Td>
              </Tr>
            ))}
          </Table>
          <p className="pod-note">ID check applies to age-restricted items only. Drivers scan a photo ID and confirm the date of birth; Tolvane stores the check result, not the ID.</p>
        </Section>

        <Card>
          <Section title="Edit rules: Northgate Pharmacy" titleId="edit">
            <Row><Badge tone="info">Editing</Badge><span className="pod-note">Current rules since 1 Sep 2026 · 3 open disputes</span></Row>

            <fieldset className="pod-fieldset">
              <legend className="pod-legend">Proof drivers must collect</legend>
              <div className="pod-option">
                <Checkbox label="Photo of the parcel at the drop-off point" defaultChecked />
                <span className="pod-option__hint">Driver cannot finish the stop without it.</span>
              </div>
              <div className="pod-option">
                <Checkbox label="Signature from the recipient" defaultChecked />
                <span className="pod-option__hint">If nobody is home, the parcel goes back to the depot.</span>
              </div>
              <div className="pod-option">
                <Checkbox label="ID check for age-restricted items" defaultChecked />
                <span className="pod-option__hint">Only on parcels the sender marks as age-restricted.</span>
              </div>
            </fieldset>

            <Field id="min-age" label="Minimum age" options={['16', '18', '21', '25']} defaultValue="18" hint="Changing from 16. Applies to medicines marked age-restricted." />
            <Field id="safe-place" label="Leave in a safe place" options={['Never', 'With a neighbour only', 'Neighbour or safe place']} defaultValue="Never" />

            <hr className="pod-divider" />

            <Field id="start" label="New rules start on" type="date" defaultValue="2026-12-01" hint="Deliveries before 1 Dec 2026 keep the current rules. Drivers see the change in the app the evening before." />

            <hr className="pod-divider" />

            <Stack>
              <div>
                <h3 className="pod-legend">Example proof photo</h3>
                <p className="pod-note">Drivers see this photo in the app before they take their own.</p>
              </div>
              <div className="pod-upload">
                <ExamplePhoto />
                <div className="pod-upload__info">
                  <span className="pod-upload__name">northgate-doorstep-example.jpg</span>
                  <span className="pod-note"><Numeral>1.8</Numeral> MB · uploaded by Ines Duarte, 6 Nov 2026</span>
                  <Badge tone="positive">Ready</Badge>
                  <Row><Button variant="secondary">Replace</Button><Button variant="ghost">Remove</Button></Row>
                </div>
              </div>
              <div className="pod-drop">
                <strong>Drop a new photo here or choose a file</strong>
                <span>JPG or PNG, up to 10 MB, portrait</span>
              </div>
              <List>
                <ListItem label="Parcel label visible" value="Yes" />
                <ListItem label="House number or door in frame" value="Yes" />
                <ListItem label="No people or faces" value="Yes" />
              </List>
            </Stack>

            <Banner><p>The new rules apply to 1,240 parcels a month. 38 parcels already on routes for 1 Dec will ask drivers for an ID check.</p></Banner>

            <div className="pod-actions">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Schedule rules</Button>
            </div>
          </Section>
        </Card>
      </div>
    </AppShell>
  );
}
