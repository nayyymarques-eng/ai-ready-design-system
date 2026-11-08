import {
  AppShell, NavRail, PageHeader, Section, Row, Card, Button, Badge, Banner,
  List, ListItem, Stat, Avatar, Field, Table, Tr, Td,
} from '../src';

export const title = 'Proof of delivery TLV-48213 · Tolvane';

export const css = `
.pod-layout { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: var(--s5); align-items: start; }
.pod-col { display: flex; flex-direction: column; gap: var(--s5); min-width: 0; }
.pod-meta { color: var(--muted); font: var(--type-body); }
.pod-photo { position: relative; aspect-ratio: 4 / 3; border-radius: var(--radius); overflow: hidden; background: var(--surface-sunken); border: var(--border); }
.pod-photo svg { display: block; width: 100%; height: 100%; }
.pod-photo__stamp { position: absolute; left: var(--s3); bottom: var(--s3); background: var(--surface); color: var(--ink); font: var(--type-small); padding: var(--s1) var(--s2); border-radius: var(--radius); box-shadow: var(--raise-1); font-variant-numeric: tabular-nums; }
.pod-caption { font: var(--type-small); color: var(--muted); }
.pod-signature { border: var(--border); border-radius: var(--radius); background: var(--surface); padding: var(--s4); }
.pod-signature svg { display: block; width: 100%; height: 120px; }
.pod-signature__line { border-top: var(--border); padding-top: var(--s2); display: flex; justify-content: space-between; gap: var(--s3); flex-wrap: wrap; font: var(--type-small); color: var(--muted); }
.pod-distance { display: flex; flex-direction: column; gap: var(--s3); }
.pod-scale { position: relative; height: 8px; border-radius: var(--radius-pill); background: var(--surface-sunken); }
.pod-scale__limit { position: absolute; top: -4px; bottom: -4px; width: 2px; background: var(--muted); }
.pod-scale__mark { position: absolute; top: -4px; width: 16px; height: 16px; margin-left: -8px; border-radius: var(--radius-pill); background: var(--positive); border: 2px solid var(--surface); }
.pod-scale__labels { display: flex; justify-content: space-between; font: var(--type-small); color: var(--muted); font-variant-numeric: tabular-nums; }
.pod-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.pod-step { display: grid; grid-template-columns: 16px minmax(0, 1fr) auto; column-gap: var(--s3); position: relative; padding-bottom: var(--s4); }
.pod-step:last-child { padding-bottom: 0; }
.pod-step::before { content: ""; position: absolute; left: 7px; top: 16px; bottom: 0; width: 2px; background: var(--line); }
.pod-step:last-child::before { display: none; }
.pod-step__dot { width: 16px; height: 16px; border-radius: var(--radius-pill); background: var(--surface); border: 2px solid var(--accent); margin-top: 3px; position: relative; }
.pod-step--final .pod-step__dot { background: var(--accent); }
.pod-step__name { font: var(--type-body-strong); color: var(--ink); }
.pod-step__note { font: var(--type-small); color: var(--muted); }
.pod-step__time { font: var(--type-body); color: var(--ink); font-variant-numeric: tabular-nums; text-align: right; }
.pod-textarea-wrap { display: flex; flex-direction: column; gap: var(--s1); }
.pod-textarea-wrap label { font: var(--type-body-strong); color: var(--ink); }
.pod-textarea { min-height: 112px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); width: 100%; resize: vertical; }
.pod-hint { font: var(--type-small); color: var(--muted); }
.pod-actions { display: flex; gap: var(--s2); flex-wrap: wrap; justify-content: flex-end; }
@media (max-width: 960px) {
  .pod-layout { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 720px) {
  .pod-actions { justify-content: stretch; }
  .pod-actions .btn { flex: 1; justify-content: center; }
}
`;

const steps = [
  { name: 'Picked up', note: 'Lisbon hub, bay 4 · scanned by Rui Costa', time: '07:42' },
  { name: 'Out for delivery', note: 'Van 31-QK-88, route L-12, stop 9 of 26', time: '08:15' },
  { name: 'Arrived at address', note: 'GPS within 25 m of Rua das Flores 112', time: '11:06' },
  { name: 'Photo taken', note: 'Front door, parcel on mat', time: '11:08' },
  { name: 'Signature collected', note: 'Signed by "M. Ferreira"', time: '11:09' },
  { name: 'Marked delivered', note: '18 m from the address', time: '11:09', final: true },
];

function DoorPhoto() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Photo from the driver: a parcel on the doormat in front of a green door numbered 112">
      <rect width="400" height="300" fill="#d9d3c7" />
      <rect x="0" y="230" width="400" height="70" fill="#b7ad9c" />
      <rect x="130" y="30" width="140" height="205" fill="#2f5d4a" />
      <rect x="140" y="40" width="120" height="85" fill="#36695a" />
      <rect x="140" y="135" width="120" height="90" fill="#36695a" />
      <circle cx="250" cy="140" r="5" fill="#c9a94b" />
      <rect x="176" y="12" width="48" height="14" rx="2" fill="#f4f1ea" />
      <text x="200" y="23" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#333">112</text>
      <rect x="120" y="234" width="160" height="22" rx="3" fill="#7a5a3a" />
      <rect x="168" y="196" width="70" height="46" fill="#c4975e" />
      <rect x="168" y="196" width="70" height="10" fill="#b0844e" />
      <rect x="198" y="196" width="10" height="46" fill="#e7d3a8" />
      <rect x="176" y="218" width="24" height="14" fill="#ffffff" />
    </svg>
  );
}

function Signature() {
  return (
    <svg viewBox="0 0 400 120" role="img" aria-label="Recipient signature, handwritten, reads M. Ferreira">
      <path
        d="M30 88 C 40 40, 52 30, 58 70 C 62 95, 70 40, 82 38 C 92 36, 88 90, 98 86 C 104 84, 106 78, 110 82
           M130 60 C 150 58, 150 58, 160 60 M140 40 C 136 70, 134 92, 140 96
           C 150 100, 158 70, 168 72 C 178 74, 170 92, 182 90 C 194 88, 196 66, 206 70
           C 214 74, 206 94, 218 90 C 230 86, 232 62, 244 66 C 256 70, 246 92, 258 92
           C 272 92, 276 58, 290 62 C 300 66, 292 90, 304 90 C 318 90, 330 70, 360 74"
        fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

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
            { label: 'Drivers', href: '#', count: 42 },
            { label: 'Routes', href: '#' },
            { label: 'Settings', href: '#' },
          ]}
        />
      }
    >
      <PageHeader
        title="Delivery TLV-48213"
        status={<Badge tone="warning">Disputed</Badge>}
        actions={
          <>
            <Button variant="secondary" aria-haspopup="dialog">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
          </>
        }
      />
      <p className="pod-meta">Parcel 1 of 1 · Rua das Flores 112, 1200-195 Lisboa · Delivered Thu 5 Nov 2026 at 11:09</p>

      <Banner tone="warning">
        <p><strong>The customer says the parcel never arrived.</strong> Marta Ferreira opened a dispute on 6 Nov at 09:31: "Nothing at my door when I got home at 18:00." Review the proof and decide by Mon 9 Nov.</p>
      </Banner>

      <div className="pod-layout">
        <div className="pod-col">
          <Section title="Photo at the door" titleId="photo">
            <Card>
              <div className="pod-photo">
                <DoorPhoto />
                <span className="pod-photo__stamp">Thu 5 Nov · 11:08 · 38.7139, −9.1462</span>
              </div>
              <p className="pod-caption">Taken by the driver in the Tolvane app. Parcel on the mat in front of door 112, label facing up.</p>
            </Card>
          </Section>

          <Section title="Recipient's signature" titleId="signature">
            <Card>
              <div className="pod-signature">
                <Signature />
                <div className="pod-signature__line">
                  <span>Printed name: M. Ferreira</span>
                  <span>Signed 11:09 on the driver's phone</span>
                </div>
              </div>
              <List>
                <ListItem label="Signed as" value="Recipient" />
                <ListItem label="Name on the order" value="Marta Ferreira" />
              </List>
            </Card>
          </Section>
        </div>

        <div className="pod-col">
          <Section title="Driver" titleId="driver">
            <Card>
              <Row>
                <Avatar initials="JS" label="João Santos" />
                <span className="pod-step__name">João Santos</span>
                <Badge>Route L-12</Badge>
              </Row>
              <List>
                <ListItem label="Deliveries this month" value="412" />
                <ListItem label="Proofs sent back before" value="2" />
              </List>
            </Card>
          </Section>

          <Section title="Distance from the address" titleId="distance">
            <Card>
              <Row>
                <Stat label="When marked delivered" value="18 m" />
                <Badge tone="positive">Within the 50 m limit</Badge>
              </Row>
              <div className="pod-distance" aria-hidden="true">
                <div className="pod-scale">
                  <span className="pod-scale__limit" style={{ left: '50%' }} />
                  <span className="pod-scale__mark" style={{ left: '18%' }} />
                </div>
                <div className="pod-scale__labels"><span>0 m</span><span>50 m limit</span><span>100 m</span></div>
              </div>
              <p className="pod-caption">GPS accuracy ±6 m. Phone location at 11:09, compared with the geocoded address.</p>
            </Card>
          </Section>

          <Section title="Steps" titleId="steps">
            <Card>
              <ol className="pod-steps">
                {steps.map(s => (
                  <li key={s.name} className={s.final ? 'pod-step pod-step--final' : 'pod-step'}>
                    <span className="pod-step__dot" aria-hidden="true" />
                    <div>
                      <div className="pod-step__name">{s.name}</div>
                      <div className="pod-step__note">{s.note}</div>
                    </div>
                    <span className="pod-step__time">{s.time}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </Section>
        </div>
      </div>

      <Section title="Decision" titleId="decision">
        <Card>
          <p>Accept the proof to close the dispute and tell the customer. Or send it back: João gets your message in the app and can add a photo or a note.</p>
          <Field
            id="missing"
            label="What is missing"
            options={['Choose a reason', 'Photo does not show the house number', 'Photo is blurred or dark', 'Signature does not match the recipient', 'Too far from the address', 'Other']}
            defaultValue="Photo does not show the house number"
          />
          <div className="pod-textarea-wrap">
            <label htmlFor="message">Message to the driver</label>
            <textarea
              id="message"
              className="pod-textarea"
              aria-describedby="message-hint"
              defaultValue="Hi João, the customer says the parcel wasn't there. Can you send a wider photo that shows the house number and the parcel together? If a neighbour took it in, add their name and door number."
            />
            <p className="pod-hint" id="message-hint">João sees this in the app with the delivery. Be specific about what to add.</p>
          </div>
          <div className="pod-actions">
            <Button variant="secondary">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
          </div>
        </Card>
      </Section>

      <Section title="Earlier proofs at this address" titleId="history">
        <Table columns={[{ label: 'Delivery' }, { label: 'Date' }, { label: 'Result' }, { label: 'Distance', numeric: true }]}>
          <Tr><Td>TLV-47702</Td><Td>22 Oct 2026</Td><Td><Badge tone="positive">Accepted</Badge></Td><Td numeric>12 m</Td></Tr>
          <Tr><Td>TLV-46118</Td><Td>3 Oct 2026</Td><Td><Badge tone="positive">Accepted</Badge></Td><Td numeric>21 m</Td></Tr>
        </Table>
      </Section>
    </AppShell>
  );
}
