import {
  AppShell, NavRail, PageHeader, Section, Stack, Card, Button, MenuButton,
  Field, Checkbox, Switch, ToggleGroup, Table, Tr, Td, Badge, Banner, List, ListItem,
} from '../src';

export const title = 'Proof rules · Tolvane';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 360px); gap: var(--s5); align-items: start; }
.pod-sender { display: flex; flex-direction: column; }
.pod-sender__name { font: var(--type-body-strong); color: var(--ink); }
.pod-sender__meta { font: var(--type-small); color: var(--muted); }
.pod-row-selected { font: var(--type-body-strong); color: var(--ink); }
.pod-req { display: flex; gap: var(--s1); flex-wrap: wrap; }
.pod-req .badge, .pod-sender .badge { white-space: nowrap; }
.pod-nowrap { white-space: nowrap; }
.pod-sender .badge { align-self: flex-start; margin-top: var(--s1); }
.pod-count { font: var(--type-small); color: var(--muted); }
.pod-filter { max-width: 100%; overflow-x: auto; }
.pod-filter .toggle-group__item { white-space: nowrap; }
.pod-phone-list { display: none; }
.pod-phone-item { display: flex; flex-direction: column; gap: var(--s2); width: 100%; }
.pod-phone-item__top { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--s2); }
.pod-panel-head { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--s3); }
.pod-panel-head h2 { font: var(--type-heading); color: var(--ink); }
.pod-panel-head p { font: var(--type-small); color: var(--muted); }
.pod-group { display: flex; flex-direction: column; gap: var(--s3); border: 0; padding: 0; margin: 0; min-width: 0; }
.pod-group legend { font: var(--type-body-strong); color: var(--ink); padding: 0; margin-bottom: var(--s3); }
.pod-note { font: var(--type-small); color: var(--muted); margin-top: calc(var(--s2) * -1); padding-left: calc(var(--s4) + var(--s2)); }
.pod-divider { border: 0; border-top: var(--border); margin: 0; }
.pod-upload { display: flex; flex-direction: column; gap: var(--s3); }
.pod-upload__label { font: var(--type-body-strong); color: var(--ink); }
.pod-upload__hint { font: var(--type-small); color: var(--muted); }
.pod-photo { display: flex; gap: var(--s3); align-items: center; padding: var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); }
.pod-photo__thumb { width: 96px; height: 72px; flex: none; border-radius: var(--radius); background: var(--surface-sunken); overflow: hidden; }
.pod-photo__thumb svg { display: block; width: 100%; height: 100%; }
.pod-photo__info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.pod-photo__name { font: var(--type-body-strong); color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pod-photo__meta { font: var(--type-small); color: var(--muted); }
.pod-drop { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--s1); text-align: center; padding: var(--s4); border: 1px dashed var(--line); border-radius: var(--radius); background: var(--surface-sunken); color: var(--text); cursor: pointer; }
.pod-drop strong { font: var(--type-body-strong); color: var(--ink); }
.pod-drop span { font: var(--type-small); color: var(--muted); }
.pod-drop input { position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; }
.pod-drop:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
.pod-checklist { margin: 0; padding-left: var(--s5); font: var(--type-small); color: var(--text); display: flex; flex-direction: column; gap: var(--s1); }
.pod-actions { display: flex; justify-content: flex-end; gap: var(--s2); flex-wrap: wrap; }
@media (max-width: 1100px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 720px) {
  .pod-table { display: none; }
  .pod-phone-list { display: block; }
  .pod-photo__info { flex-basis: calc(100% - 96px - var(--s3)); }
  .pod-actions .btn { flex: 1; justify-content: center; }
  .pod-photo { flex-wrap: wrap; }
}
`;

type Sender = {
  name: string;
  meta: string;
  photo: boolean;
  signature: boolean;
  id: boolean;
  from: string;
  status?: { tone: 'warning' | 'info'; text: string };
  selected?: boolean;
};

const senders: Sender[] = [
  { name: 'Brennan & Vale Wines', meta: 'Alcohol, 18+ · 312 parcels a week', photo: true, signature: true, id: true, from: '2 Sep 2026', status: { tone: 'info', text: 'Editing' }, selected: true },
  { name: 'Hartwell Pharmacy', meta: 'Prescriptions · 540 a week', photo: true, signature: true, id: true, from: '14 Jul 2026' },
  { name: 'Northgate Electronics', meta: 'High value · 205 a week', photo: true, signature: true, id: false, from: '1 Oct 2026' },
  { name: 'Larkmoor Outdoor', meta: 'Bulky items · 168 a week', photo: true, signature: false, id: false, from: '19 Aug 2026', status: { tone: 'warning', text: '4 disputes in Oct' } },
  { name: 'Fernhill Books', meta: 'Letterbox parcels · 890 a week', photo: true, signature: false, id: false, from: '3 Mar 2026' },
  { name: 'Ostra Vape Supply', meta: 'Nicotine, 18+ · 96 a week', photo: true, signature: true, id: true, from: '20 Nov 2026', status: { tone: 'info', text: 'Starts 20 Nov' } },
  { name: 'Larkspur Florists', meta: 'Same day · 274 a week', photo: true, signature: false, id: false, from: '11 Jun 2026' },
];

function Req({ on, label }: { on: boolean; label: string }) {
  return on ? <Badge tone="positive">{label}</Badge> : <Badge>No {label.toLowerCase()}</Badge>;
}

function ExamplePhoto() {
  // A drawn stand-in for the uploaded example: a parcel on a doorstep, house number in frame.
  return (
    <svg viewBox="0 0 96 72" role="img" aria-label="Example photo: parcel on the doorstep with door and house number 14 in frame">
      <rect width="96" height="72" fill="var(--tint-warning)" />
      <rect x="0" y="54" width="96" height="18" fill="var(--line)" />
      <rect x="30" y="8" width="34" height="46" fill="var(--surface)" stroke="var(--muted)" />
      <circle cx="58" cy="32" r="1.6" fill="var(--muted)" />
      <rect x="68" y="12" width="12" height="9" rx="1" fill="var(--surface)" stroke="var(--muted)" />
      <text x="74" y="19" fontSize="6" textAnchor="middle" fill="var(--ink)" fontFamily="sans-serif">14</text>
      <rect x="36" y="42" width="20" height="16" fill="var(--warning)" opacity=".55" />
      <rect x="45" y="42" width="2" height="16" fill="var(--surface)" opacity=".8" />
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
            { label: 'Routes', href: '#', count: 38 },
            { label: 'Drivers', href: '#', count: 64 },
            { label: 'Disputes', href: '#', count: 11 },
            { label: 'Proof rules', href: '#', current: true },
            { label: 'Senders', href: '#', count: 142 },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Proof rules"
        actions={<>
          <Button variant="secondary">Export rules</Button>
          <Button variant="primary">Add sender rule</Button>
        </>}
      />

      <Banner>
        <p>Drivers see a sender's rules in the app when they scan the parcel. A change applies to deliveries from its start date; deliveries before that keep the old rules.</p>
      </Banner>

      <div className="pod-layout">
        <Section title="Senders" titleId="senders">
          <p className="pod-count">Showing 7 of 142 senders, most parcels first.</p>
          <div className="pod-filter">
            <ToggleGroup
              label="Filter senders"
              items={[
                { label: 'All', count: 142, selected: true },
                { label: 'ID check', count: 9 },
                { label: 'Signature', count: 37 },
                { label: 'Photo only', count: 96 },
              ]}
            />
          </div>
          <div className="pod-table">
          <Table
            columns={[
              { label: 'Sender' },
              { label: 'Proof required' },
              { label: 'Rules since' },
              { label: 'Actions' },
            ]}
          >
            {senders.map(s => (
              <Tr key={s.name}>
                <Td>
                  <div className="pod-sender">
                    <span className="pod-sender__name">{s.name}</span>
                    <span className="pod-sender__meta">{s.meta}</span>
                    {s.status ? <Badge tone={s.status.tone}>{s.status.text}</Badge> : null}
                  </div>
                </Td>
                <Td>
                  <div className="pod-req">
                    <Req on={s.photo} label="Photo" />
                    <Req on={s.signature} label="Signature" />
                    {s.id ? <Badge tone="info">ID check 18+</Badge> : null}
                  </div>
                </Td>
                <Td><span className={s.selected ? 'pod-row-selected pod-nowrap' : 'pod-nowrap'}>{s.from}</span></Td>
                <Td>
                  <MenuButton
                    label={`Actions for ${s.name}`}
                    items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to…' }]}
                  />
                </Td>
              </Tr>
            ))}
          </Table>
          </div>
          <div className="pod-phone-list">
            <List>
              {senders.map(s => (
                <ListItem key={s.name}>
                  <div className="pod-phone-item">
                    <div className="pod-phone-item__top">
                      <div className="pod-sender">
                        <span className="pod-sender__name">{s.name}</span>
                        <span className="pod-sender__meta">{s.meta} · rules since {s.from}</span>
                        {s.status ? <Badge tone={s.status.tone}>{s.status.text}</Badge> : null}
                      </div>
                      <MenuButton label={`Actions for ${s.name}`} items={[{ label: 'Edit rules' }, { label: 'View disputes' }, { label: 'Copy rules to…' }]} />
                    </div>
                    <div className="pod-req">
                      <Req on={s.photo} label="Photo" />
                      <Req on={s.signature} label="Signature" />
                      {s.id ? <Badge tone="info">ID check 18+</Badge> : null}
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Section>

        <Card>
          <form className="pod-upload" style={{ gap: 'var(--s5)' }} aria-labelledby="edit-title">
            <div className="pod-panel-head">
              <div>
                <h2 id="edit-title">Brennan &amp; Vale Wines</h2>
                <p>Alcohol, 18+ · current rules since 2 Sep 2026</p>
              </div>
              <Badge tone="info">Unsaved</Badge>
            </div>

            <fieldset className="pod-group">
              <legend>Proof drivers must collect</legend>
              <Checkbox label="Photo of the parcel at the handover" defaultChecked />
              <p className="pod-note">Required for every sender. Taken in the driver app, with time and location.</p>
              <Checkbox label="Recipient signature" defaultChecked />
              <Checkbox label="ID check: recipient is 18 or over" defaultChecked />
              <p className="pod-note">Driver checks a photo ID and records the type, not the number.</p>
              <Checkbox label="Recipient's printed name" defaultChecked />
            </fieldset>

            <fieldset className="pod-group">
              <legend>When no one is home</legend>
              <Switch label="Allow leaving in a safe place" />
              <p className="pod-note">Off: not allowed when an ID check is required. The parcel returns to the depot.</p>
              <Switch label="Allow handover to a neighbour" />
            </fieldset>

            <hr className="pod-divider" />

            <Field
              id="start-date"
              type="date"
              label="New rules start on"
              defaultValue="2026-11-16"
              hint="Monday 16 Nov 2026. Routes already planned for earlier days keep the current rules."
            />

            <Field
              id="reason"
              label="Reason for the change"
              defaultValue="No name in 2 October disputes"
              hint="Shown in the change history."
            />

            <hr className="pod-divider" />

            <div className="pod-upload">
              <div>
                <p className="pod-upload__label" id="example-label">Example proof photo</p>
                <p className="pod-upload__hint">Drivers see this before their first delivery for this sender.</p>
              </div>

              <div className="pod-photo">
                <div className="pod-photo__thumb"><ExamplePhoto /></div>
                <div className="pod-photo__info">
                  <span className="pod-photo__name">doorstep-14-mill-lane.jpg</span>
                  <span className="pod-photo__meta">1.4 MB · 3024 × 2268 · added today</span>
                </div>
                <Button variant="ghost">Remove</Button>
              </div>

              <label className="pod-drop">
                <input type="file" accept="image/jpeg,image/png,image/heic" aria-describedby="example-label drop-hint" />
                <strong>Replace photo</strong>
                <span id="drop-hint">Drag a photo here or choose a file. JPG, PNG or HEIC, up to 10 MB.</span>
              </label>

              <ul className="pod-checklist" aria-label="What a good proof photo shows">
                <li>The parcel and the door or house number in one frame</li>
                <li>Taken in daylight or with the flash, not blurred</li>
                <li>No faces and no other people's post</li>
              </ul>
            </div>

            <hr className="pod-divider" />

            <Stack>
              <p className="pod-upload__label">What changes on 16 Nov</p>
              <List>
                <ListItem label="Printed name" value="Now required" />
                <ListItem label="Example photo" value="New" />
                <ListItem label="Routes affected" value="About 310 a week" />
              </List>
            </Stack>

            <div className="pod-actions">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" type="submit">Save rules</Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
