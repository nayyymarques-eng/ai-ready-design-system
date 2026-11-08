import {
  AppShell, NavRail, PageHeader, Badge, Button, Banner, Card, Section, Stack, Row, Grid,
  List, ListItem, Stat, Table, Tr, Td, Field, Checkbox, Avatar, MenuButton,
} from '../src';

export const title = 'Proof of delivery, TLV-48213';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--s5); align-items: start; }
.pod-figure { margin: 0; display: flex; flex-direction: column; gap: var(--s2); }
.pod-figure figcaption { font: var(--type-small); color: var(--muted); }
.pod-photo { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface-sunken); }
.pod-photo .wall { fill: var(--surface-sunken); }
.pod-photo .door { fill: var(--line); }
.pod-photo .frame { fill: none; stroke: var(--muted); stroke-width: 3; }
.pod-photo .step { fill: var(--line); stroke: var(--muted); stroke-width: 2; }
.pod-photo .box { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.pod-photo .tape { fill: none; stroke: var(--warning); stroke-width: 2; }
.pod-photo .label { fill: var(--surface); stroke: var(--muted); stroke-width: 1.5; }
.pod-photo .num { fill: var(--ink); font: var(--type-body-strong); }
.pod-photo .stamp { fill: var(--ink); opacity: .72; }
.pod-photo .stamp-text { fill: var(--on-accent); font: var(--type-small); }
.pod-signature { display: block; width: 100%; height: auto; aspect-ratio: 3 / 1; background: var(--surface); border: var(--border); border-radius: var(--radius); }
.pod-signature .ink { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.pod-signature .baseline { stroke: var(--line); stroke-width: 1; stroke-dasharray: 4 4; }
.pod-card-title { font: var(--type-heading); color: var(--ink); }
.pod-note { font: var(--type-small); color: var(--muted); }
.pod-step { display: flex; flex-direction: column; }
.pod-step small { font: var(--type-small); color: var(--muted); }
.pod-textarea { width: 100%; min-height: 96px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; }
.pod-label { font: var(--type-body-strong); color: var(--ink); }
.pod-driver { display: flex; align-items: center; gap: var(--s3); }
.pod-driver strong { color: var(--ink); font: var(--type-body-strong); display: block; }
.pod-driver span { font: var(--type-small); color: var(--muted); }
@media (max-width: 960px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Routes', href: '#', count: 38 },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Proof of delivery', href: '#', count: 7, current: true },
      { label: 'Customers', href: '#' },
      { label: 'Settings', href: '#' },
    ]}
  />
);

const steps = [
  { step: 'Picked up', where: 'Lisbon North depot, bay 4', time: '08:12' },
  { step: 'Out for delivery', where: 'Route LX-17, stop 14 of 31', time: '09:05' },
  { step: 'Arrived near address', where: 'Rua Fernão Lopes 23', time: '11:41' },
  { step: 'Photo taken', where: 'Front door, 1 photo', time: '11:43' },
  { step: 'Signature collected', where: 'Signed as "M. Duarte"', time: '11:44' },
  { step: 'Marked delivered', where: '140 m from the address', time: '11:46' },
];

export default function PodDetail() {
  return (
    <AppShell nav={nav}>
      <PageHeader
        title="Delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
        actions={
          <>
            <Button variant="secondary">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
            <MenuButton label="More actions" items={[{ label: 'Open route LX-17' }, { label: 'Contact customer' }, { label: 'Download proof (PDF)' }]} />
          </>
        }
      />

      <Banner tone="warning">
        <p>
          The customer, Marta Duarte, says the parcel never arrived. Disputed on 6 Nov at 18:20.
          The driver marked it delivered 140 m from the address, more than the 50 m limit. Check the photo and signature before you decide.
        </p>
      </Banner>

      <div className="pod-layout">
        <Stack>
          <Card>
            <h2 className="pod-card-title" id="photo-title">Photo at the door</h2>
            <figure className="pod-figure" aria-labelledby="photo-title">
              <svg className="pod-photo" viewBox="0 0 400 300" role="img" aria-label="A parcel on the doorstep of a front door, house number 23 beside the door">
                <rect className="wall" x="0" y="0" width="400" height="300" />
                <rect className="door" x="140" y="30" width="120" height="210" rx="2" />
                <rect className="frame" x="140" y="30" width="120" height="210" rx="2" />
                <rect className="frame" x="158" y="52" width="84" height="70" />
                <rect className="frame" x="158" y="138" width="84" height="84" />
                <circle className="frame" cx="246" cy="140" r="4" />
                <rect className="label" x="286" y="80" width="40" height="28" rx="3" />
                <text className="num" x="306" y="99" textAnchor="middle">23</text>
                <rect className="step" x="110" y="240" width="180" height="22" />
                <rect className="box" x="168" y="198" width="70" height="44" rx="2" />
                <line className="tape" x1="203" y1="198" x2="203" y2="242" />
                <rect className="label" x="176" y="206" width="20" height="14" />
                <rect className="stamp" x="8" y="268" width="222" height="24" rx="3" />
                <text className="stamp-text" x="16" y="285">6 Nov 2026, 11:43 · 38.7369, -9.1427</text>
              </svg>
              <figcaption>Taken by the driver at 11:43. The door number, 23, is visible. The parcel label is not readable.</figcaption>
            </figure>
          </Card>

          <Card>
            <h2 className="pod-card-title" id="signature-title">Recipient's signature</h2>
            <figure className="pod-figure" aria-labelledby="signature-title">
              <svg className="pod-signature" viewBox="0 0 360 120" role="img" aria-label="Handwritten signature, an M followed by a looping surname">
                <line className="baseline" x1="20" y1="92" x2="340" y2="92" />
                <path className="ink" d="M40 88 L52 40 L66 78 L80 38 L92 86 M104 70 C110 58 122 58 124 70 C126 84 112 88 108 78 C104 66 132 50 146 62 C156 70 148 90 140 86 C134 82 150 60 170 64 C186 68 176 88 190 82 C204 76 206 58 218 60 C232 62 222 86 238 82 C254 78 262 52 280 58 C296 64 288 86 304 80 L322 70" />
              </svg>
              <figcaption>Signed on the driver's phone at 11:44. Printed name: M. Duarte.</figcaption>
            </figure>
          </Card>
        </Stack>

        <Stack>
          <Card>
            <h2 className="pod-card-title">Driver's distance from the address</h2>
            <Grid>
              <Stat label="When marked delivered" value="140 m" />
              <Stat label="Allowed" value="50 m" />
            </Grid>
            <Row>
              <Badge tone="critical">Outside the limit</Badge>
              <span className="pod-note">GPS accuracy ±12 m at 11:46</span>
            </Row>
          </Card>

          <Card>
            <h2 className="pod-card-title">Delivery</h2>
            <div className="pod-driver">
              <Avatar initials="RS" label="Rui Silva" />
              <div><strong>Rui Silva</strong><span>Driver, van 22-TL-08</span></div>
            </div>
            <List>
              <ListItem label="Customer" value="Marta Duarte" />
              <ListItem label="Address" value="Rua Fernão Lopes 23, 1000-132 Lisboa" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Order" value="SHP-90517" />
              <ListItem label="Delivery date" value="6 Nov 2026" />
            </List>
          </Card>
        </Stack>
      </div>

      <Section title="Steps, pickup to delivered" titleId="steps-title">
        <Table columns={[{ label: 'Step' }, { label: 'Time', numeric: true }]}>
          {steps.map(s => (
            <Tr key={s.step}>
              <Td><span className="pod-step"><span>{s.step}</span><small>{s.where}</small></span></Td>
              <Td numeric>{s.time}</Td>
            </Tr>
          ))}
        </Table>
        <p className="pod-note">All times are in Lisbon time, 6 Nov 2026. 4 minutes between arriving near the address and marking it delivered.</p>
      </Section>

      <Section title="Send back to the driver" titleId="send-back-title">
        <Card>
          <p>Rui gets your message in the driver app and is asked to add what is missing. The dispute stays open until you accept the proof.</p>
          <Stack>
            <span className="pod-label">What is missing</span>
            <Checkbox label="A photo where the parcel label can be read" defaultChecked />
            <Checkbox label="A photo that shows the parcel at the door" />
            <Checkbox label="A note on why it was marked delivered 140 m away" defaultChecked />
            <Checkbox label="A clearer signature or the recipient's full name" />
          </Stack>
          <Stack>
            <label className="pod-label" htmlFor="message">Message to Rui</label>
            <textarea
              className="pod-textarea"
              id="message"
              name="message"
              defaultValue="Hi Rui, the customer says this parcel never arrived. The label in your photo can't be read, and you marked it delivered 140 m from the address. Please send a photo where the label is readable and tell us where you left the parcel."
            />
          </Stack>
          <Field id="reply-by" label="Reply by" type="date" defaultValue="2026-11-09" hint="The customer was told to expect an answer within 2 working days." />
          <Row>
            <Button variant="primary">Send back to Rui</Button>
            <Button variant="ghost">Cancel</Button>
          </Row>
        </Card>
      </Section>
    </AppShell>
  );
}
