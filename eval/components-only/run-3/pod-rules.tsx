import {
  AppShell, NavRail, PageHeader, Section, Stack, Row, Card, Button, MenuButton,
  Field, Checkbox, Switch, ToggleGroup, Table, Tr, Td, Badge, Banner, List, ListItem,
} from '../src';

export const title = 'Proof rules — Tolvane';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 400px); gap: var(--s5); align-items: start; }
.pod-proofs { display: flex; flex-wrap: wrap; gap: var(--s1); }
.pod-sender { display: flex; flex-direction: column; }
.pod-sender__meta { font: var(--type-small); color: var(--muted); }
.pod-heading { font: var(--type-heading); color: var(--ink); }
.pod-note { font: var(--type-small); color: var(--muted); }
.pod-fieldset { border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--s3); }
.pod-fieldset legend { font: var(--type-body-strong); color: var(--ink); padding: 0; margin-bottom: var(--s2); }
.pod-indent { padding-left: var(--s5); display: flex; flex-direction: column; gap: var(--s3); }
.pod-upload { display: flex; flex-direction: column; gap: var(--s3); }
.pod-upload__label { font: var(--type-body-strong); color: var(--ink); }
.pod-upload__file { display: flex; gap: var(--s3); align-items: center; padding: var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); }
.pod-upload__thumb { flex: none; width: 72px; height: 54px; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); display: flex; align-items: center; justify-content: center; color: var(--muted); overflow: hidden; }
.pod-upload__info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.pod-upload__name { font: var(--type-body-strong); color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pod-upload__drop { display: flex; flex-direction: column; align-items: center; gap: var(--s2); text-align: center; padding: var(--s5) var(--s4); border: 1px dashed var(--line); border-radius: var(--radius); background: var(--surface-sunken); }
.pod-upload__drop input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.pod-actions { display: flex; justify-content: flex-end; gap: var(--s2); flex-wrap: wrap; border-top: var(--border); padding-top: var(--s4); }
@media (max-width: 1080px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 720px) {
  .pod-actions { justify-content: stretch; }
  .pod-actions .btn { flex: 1; justify-content: center; white-space: nowrap; }
  .pod-filter { max-width: 100%; overflow-x: auto; }
}
`;

type Proof = 'Photo' | 'Signature' | 'ID check';
type Sender = { name: string; type: string; parcels: string; proofs: Proof[]; status: 'active' | 'editing' | 'missing' };

const senders: Sender[] = [
  { name: 'Brightwell Pharmacy', type: 'Health', parcels: '1,240', proofs: ['Photo', 'Signature', 'ID check'], status: 'active' },
  { name: 'Seixo & Vine', type: 'Wine and spirits', parcels: '860', proofs: ['Photo', 'Signature', 'ID check'], status: 'editing' },
  { name: 'Norda Home', type: 'Furniture', parcels: '2,115', proofs: ['Photo', 'Signature'], status: 'active' },
  { name: 'Pixel Yard', type: 'Electronics', parcels: '3,480', proofs: ['Photo', 'Signature'], status: 'active' },
  { name: 'Fernleaf Books', type: 'Books', parcels: '4,902', proofs: ['Photo'], status: 'active' },
  { name: 'Ostra Outdoor', type: 'Sports', parcels: '1,775', proofs: ['Photo'], status: 'active' },
  { name: 'Calder Vape Co.', type: 'Age-restricted', parcels: '512', proofs: ['Photo', 'ID check'], status: 'missing' },
];

function ProofBadges({ proofs }: { proofs: Proof[] }) {
  return (
    <span className="pod-proofs">
      {proofs.map(p => <Badge key={p} tone={p === 'ID check' ? 'info' : undefined}>{p}</Badge>)}
    </span>
  );
}

function PhotoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M4 17l5-4.5 4 3 3-2.5 4 4" />
    </svg>
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
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Disputes', href: '#', count: 9 },
            { label: 'Drivers', href: '#', count: 46 },
            { label: 'Senders', href: '#', count: 38 },
            { label: 'Proof rules', href: '#', current: true },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof rules"
        status={<Badge tone="info">New</Badge>}
        actions={<Button variant="secondary">Export rules</Button>}
      />

      <Banner>
        <p>Drivers see the proof a sender requires when they scan the parcel. A rule change applies to parcels collected on or after its start date.</p>
      </Banner>

      <div className="pod-layout">
        <Section title="Senders" titleId="senders">
          <div className="pod-filter">
            <ToggleGroup
              label="Filter senders"
              items={[
                { label: 'All', count: 38, selected: true },
                { label: 'ID check', count: 6 },
                { label: 'Photo only', count: 19 },
              ]}
            />
          </div>
          <Table columns={[{ label: 'Sender' }, { label: 'Proof required' }, { label: 'Parcels, last 30 days', numeric: true }, { label: 'Status' }, { label: 'Actions' }]}>
            {senders.map(s => (
              <Tr key={s.name}>
                <Td>
                  <span className="pod-sender">
                    <strong>{s.name}</strong>
                    <span className="pod-sender__meta">{s.type}</span>
                  </span>
                </Td>
                <Td><ProofBadges proofs={s.proofs} /></Td>
                <Td numeric>{s.parcels}</Td>
                <Td>
                  {s.status === 'editing' ? <Badge tone="warning">Editing</Badge>
                    : s.status === 'missing' ? <Badge tone="critical">No example</Badge>
                    : <Badge tone="positive">Active</Badge>}
                </Td>
                <Td>
                  <MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to…' }]} />
                </Td>
              </Tr>
            ))}
          </Table>
          <p className="pod-note">Showing 7 of 38 senders. Senders without a rule use the default: photo only.</p>
        </Section>

        <Card>
          <Stack>
            <Row>
              <h2 className="pod-heading" id="edit-title">Harbour &amp; Vine</h2>
              <Badge tone="warning">Unsaved changes</Badge>
            </Row>
            <List>
              <ListItem label="Current rules" value="Photo, signature" />
              <ListItem label="Disputes, last 90 days" value="4" />
            </List>

            <form aria-labelledby="edit-title">
              <Stack>
                <fieldset className="pod-fieldset">
                  <legend>Proof drivers must collect</legend>
                  <Checkbox label="Photo of the parcel at the door" defaultChecked />
                  <Checkbox label="Signature of the person who receives it" defaultChecked />
                  <Checkbox label="ID check for age-restricted items" defaultChecked />
                  <div className="pod-indent">
                    <Field id="min-age" label="Minimum age" options={['18', '21', '25']} defaultValue="18" hint="The driver checks a photo ID and records the date of birth. No copy of the ID is kept." />
                    <Switch label="Return the parcel if no ID is shown" defaultChecked />
                  </div>
                </fieldset>

                <Field
                  id="start-date"
                  type="date"
                  label="New rules start on"
                  defaultValue="2026-12-01"
                  hint="Parcels collected before 1 December 2026 keep the current rules."
                />

                <div className="pod-upload">
                  <span className="pod-upload__label" id="example-label">Example proof photo</span>
                  <p className="pod-note">Drivers see this photo before they take their own. Show the parcel, the door number and the doorstep in one frame.</p>
                  <div className="pod-upload__file">
                    <span className="pod-upload__thumb"><PhotoIcon /></span>
                    <span className="pod-upload__info">
                      <span className="pod-upload__name">harbour-vine-doorstep.jpg</span>
                      <span className="pod-note">2.4 MB · uploaded by Ines Moreau, 3 Nov</span>
                    </span>
                    <MenuButton label="Example photo actions" items={[{ label: 'Replace' }, { label: 'Remove', danger: true }]} />
                  </div>
                  <label className="pod-upload__drop">
                    <input type="file" accept="image/jpeg,image/png" aria-labelledby="example-label" />
                    <PhotoIcon />
                    <span><strong>Choose a photo</strong> or drop it here</span>
                    <span className="pod-note">JPG or PNG, up to 10 MB. Landscape works best.</span>
                  </label>
                </div>

                <div className="pod-actions">
                  <Button variant="ghost">Discard changes</Button>
                  <Button variant="primary" type="submit">Save rules</Button>
                </div>
              </Stack>
            </form>
          </Stack>
        </Card>
      </div>
    </AppShell>
  );
}
