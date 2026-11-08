import {
  AppShell, NavRail, PageHeader, Section, Stack, Row, Grid,
  Card, Button, Badge, Banner, List, ListItem, Table, Tr, Td,
  Stat, Checkbox, Avatar,
} from '../src';

export const title = 'Proof of delivery TLV-48213 · Tolvane';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: var(--s5); align-items: start; }
.pod-figure { margin: 0; display: flex; flex-direction: column; gap: var(--s2); }
.pod-figure svg { display: block; width: 100%; height: auto; border-radius: var(--radius); border: var(--border); background: var(--surface-sunken); }
.pod-figure figcaption { font: var(--type-small); color: var(--muted); }
.pod-meta { font: var(--type-small); color: var(--muted); }
.pod-message { display: flex; flex-direction: column; gap: var(--s1); }
.pod-message label { font: var(--type-body-strong); color: var(--ink); }
.pod-message textarea { min-height: 112px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; width: 100%; }
.pod-message p { font: var(--type-small); color: var(--muted); }
.pod-distance { display: flex; flex-direction: column; gap: var(--s3); }
.pod-layout .table .badge { white-space: nowrap; }
.pod-layout .table td:nth-child(2) { white-space: nowrap; font-variant-numeric: tabular-nums; }
.pod-message textarea { min-height: 136px; }
@media (max-width: 960px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
`;

function DoorPhoto() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Photo taken at the door: a brown parcel on the doormat in front of a green front door, house number 27">
      <rect x="0" y="0" width="400" height="300" fill="#d9d3c7" />
      <rect x="0" y="230" width="400" height="70" fill="#a39b8d" />
      <rect x="120" y="30" width="160" height="210" fill="#3f6b55" />
      <rect x="132" y="44" width="136" height="80" fill="#4d7d65" />
      <rect x="132" y="134" width="136" height="94" fill="#4d7d65" />
      <circle cx="258" cy="140" r="5" fill="#c9a447" />
      <rect x="290" y="70" width="28" height="20" rx="2" fill="#f2efe8" />
      <text x="304" y="85" fontSize="14" textAnchor="middle" fill="#333" fontFamily="sans-serif">27</text>
      <rect x="140" y="236" width="120" height="22" rx="3" fill="#6e5b45" />
      <rect x="168" y="196" width="72" height="48" fill="#b98d5b" />
      <rect x="168" y="196" width="72" height="10" fill="#a87d4d" />
      <rect x="200" y="196" width="8" height="48" fill="#d8c9a3" />
      <rect x="176" y="214" width="22" height="14" fill="#f2efe8" />
      <text x="10" y="290" fontSize="11" fill="#f2efe8" fontFamily="sans-serif">14 Oct 2026 · 14:52 · 51.4532, -2.5871</text>
    </svg>
  );
}

function Signature() {
  return (
    <svg viewBox="0 0 400 150" role="img" aria-label="Recipient signature, signed on the driver's phone as M. Okafor">
      <rect x="0" y="0" width="400" height="150" fill="#ffffff" />
      <line x1="30" y1="118" x2="370" y2="118" stroke="#cfc9bd" strokeWidth="1" />
      <path d="M50 100 C 60 40, 80 40, 82 96 C 86 60, 104 50, 110 98 C 116 70, 126 64, 132 92 C 140 110, 156 70, 168 84 C 178 96, 186 60, 200 76 C 214 92, 222 80, 236 70 C 250 60, 262 96, 280 88 C 296 80, 310 70, 340 74"
        fill="none" stroke="#1d2a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 56 L 250 50" fill="none" stroke="#1d2a4a" strokeWidth="2" strokeLinecap="round" />
      <text x="30" y="138" fontSize="11" fill="#6b6b6b" fontFamily="sans-serif">Signed 14:53 on driver's device</text>
    </svg>
  );
}

const steps: { step: string; time: string; where: string; by: string; tone?: 'positive' | 'warning' }[] = [
  { step: 'Picked up', time: '14 Oct, 07:42', where: 'Avonmouth depot, bay 6', by: 'Daniel Price' },
  { step: 'Loaded on van', time: '14 Oct, 08:05', where: 'Van BX24 KTF, route B-17', by: 'Daniel Price' },
  { step: 'Out for delivery', time: '14 Oct, 08:31', where: 'Left depot, stop 23 of 41', by: 'System' },
  { step: 'Arrived near address', time: '14 Oct, 14:49', where: 'Cotham Brow, 180 m from address', by: 'GPS' },
  { step: 'Photo taken', time: '14 Oct, 14:52', where: '27 Hampton Park, Bristol BS6 6LG', by: 'Daniel Price' },
  { step: 'Signature collected', time: '14 Oct, 14:53', where: 'Signed as "M. Okafor"', by: 'Recipient' },
  { step: 'Marked delivered', time: '14 Oct, 14:54', where: '42 m from address', by: 'Daniel Price', tone: 'positive' },
  { step: 'Customer dispute opened', time: '15 Oct, 09:12', where: 'Says the parcel never arrived', by: 'Mara Okafor', tone: 'warning' },
];

export default function PodDetail() {
  return (
    <AppShell
      nav={
        <NavRail
          brand="Tolvane"
          items={[
            { label: 'Today', href: '#' },
            { label: 'Deliveries', href: '#', count: 1284 },
            { label: 'Proof of delivery', href: '#', count: 7, current: true },
            { label: 'Drivers', href: '#', count: 38 },
            { label: 'Routes', href: '#' },
            { label: 'Customers', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
        actions={
          <>
            <Button variant="secondary">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
          </>
        }
      />

      <Banner tone="warning">
        <p>
          Mara Okafor opened a dispute on 15 Oct at 09:12: "I was home all afternoon and nothing came.
          I didn't sign anything." Review the proof below and accept it, or send it back to the driver.
        </p>
      </Banner>

      <div className="pod-layout">
        <Stack>
          <Section title="Proof from the driver" titleId="proof">
            <Grid>
              <Card>
                <figure className="pod-figure">
                  <DoorPhoto />
                  <figcaption>Photo at the door · 14 Oct, 14:52 · taken in the app, not uploaded</figcaption>
                </figure>
              </Card>
              <Card>
                <figure className="pod-figure">
                  <Signature />
                  <figcaption>Recipient signature · printed name "M. Okafor" · 14 Oct, 14:53</figcaption>
                </figure>
              </Card>
            </Grid>
          </Section>

          <Section title="Location when marked delivered" titleId="location">
            <Card>
              <div className="pod-distance">
                <Row>
                  <Stat label="Distance from the address" value="42 m" />
                  <Badge tone="positive">Within the 75 m limit</Badge>
                </Row>
                <p>
                  The driver's phone reported 51.4532, -2.5871 when the delivery was marked done, 42 metres
                  from 27 Hampton Park. GPS accuracy was ±12 m.
                </p>
              </div>
            </Card>
          </Section>

          <Section title="Delivery steps" titleId="steps">
            <Table columns={[{ label: 'Step' }, { label: 'Time' }, { label: 'Where or what' }, { label: 'By' }]}>
              {steps.map(s => (
                <Tr key={s.step}>
                  <Td>{s.tone ? <Badge tone={s.tone}>{s.step}</Badge> : s.step}</Td>
                  <Td>{s.time}</Td>
                  <Td>{s.where}</Td>
                  <Td>{s.by}</Td>
                </Tr>
              ))}
            </Table>
          </Section>
        </Stack>

        <Stack>
          <Section title="Delivery" titleId="delivery">
            <List>
              <ListItem label="Recipient" value="Mara Okafor" />
              <ListItem label="Address" value="27 Hampton Park, BS6 6LG" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Sender" value="Kettle & Grain Ltd" />
              <ListItem label="Order" value="KG-90317" />
              <ListItem label="Safe place" value="None given" />
            </List>
          </Section>

          <Section title="Driver" titleId="driver">
            <Card>
              <Row>
                <Avatar initials="DP" />
                <strong>Daniel Price</strong>
              </Row>
              <p className="pod-meta">Route B-17 · 41 stops on 14 Oct · 1 earlier dispute in 6 months</p>
            </Card>
          </Section>

          <Section title="Send back to the driver" titleId="send-back">
            <Card>
              <p>Say what is missing. Daniel gets the message in the driver app and the dispute stays open.</p>
              <Stack>
                <Checkbox label="Photo doesn't show the parcel handed over" />
                <Checkbox label="Printed name doesn't match the recipient" />
                <Checkbox label="Location too far from the address" />
              </Stack>
              <div className="pod-message">
                <label htmlFor="send-back-message">Message to the driver</label>
                <textarea
                  id="send-back-message"
                  aria-describedby="send-back-hint"
                  defaultValue="The customer says nobody signed. Who was M. Okafor, and where did you hand the parcel over? Please add a note, and a photo of the doorway if you're back on Hampton Park."
                />
                <p id="send-back-hint">Required. The driver sees this word for word.</p>
              </div>
              <Row>
                <Button variant="secondary">Send back to driver</Button>
              </Row>
            </Card>
          </Section>
        </Stack>
      </div>
    </AppShell>
  );
}
