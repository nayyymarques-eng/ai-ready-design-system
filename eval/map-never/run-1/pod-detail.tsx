import {
  DetailPage, NavRail, Badge, Button, Banner, Section, Stack, Grid, Card, List, ListItem, Stat, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s3); }
.x-photo__frame { aspect-ratio: 4 / 3; width: 100%; border: var(--border); border-radius: var(--radius); background: var(--surface-sunken); color: var(--muted); overflow: hidden; }
.x-photo__frame svg, .x-signature__pad svg { display: block; width: 100%; height: 100%; }
.x-caption { margin: 0; font: var(--type-small); color: var(--muted); }
.x-signature { display: flex; flex-direction: column; gap: var(--s3); }
.x-signature__pad { aspect-ratio: 3 / 1; width: 100%; border: var(--border); border-radius: var(--radius); background: var(--surface); color: var(--ink); }
.x-message { display: flex; flex-direction: column; gap: var(--s2); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { width: 100%; min-height: 120px; padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; }
.x-message__hint { margin: 0; font: var(--type-small); color: var(--muted); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#', current: true },
      { label: 'Disputes', href: '#', count: 7 },
      { label: 'Drivers', href: '#', count: 24 },
      { label: 'Routes', href: '#' },
    ]}
  />
);

const steps: [string, string][] = [
  ['Picked up at Lisbon North depot', '07:58'],
  ['Loaded on van 14 (route L-07)', '08:12'],
  ['Out for delivery', '08:41'],
  ['Arrived at address', '14:29'],
  ['Photo taken', '14:32'],
  ['Signature collected', '14:33'],
  ['Marked delivered', '14:33'],
];

export default function PodDetail() {
  return (
    <DetailPage
        nav={nav}
        title="Proof of delivery TLV-48213"
        status={<Badge tone="warning">In review</Badge>}
        actions={
          <>
            <Button variant="secondary" aria-haspopup="dialog">Send back to driver</Button>
            <Button variant="primary">Accept proof</Button>
          </>
        }
        main={
          <>
            <Banner tone="warning">
              <p>Marta Lopes reported this parcel as not received on 10 Nov at 09:15. Review the proof before the dispute is answered.</p>
            </Banner>

            <Section title="Photo at the door" titleId="photo">
              <Card>
                <NewPart
                  name="pod-photo"
                  className="x-photo"
                  job="Show the photo the driver took at the door, with when and where it was taken"
                  why="The system has no image or media component"
                >
                  <NewPart
                    name="pod-photo-frame"
                    className="x-photo__frame"
                    job="Hold the delivery photo at a fixed 4:3 ratio"
                    why="No image component; this screen is static, so the photo is drawn"
                    role="img"
                    aria-label="Brown parcel on a doormat in front of a green apartment door marked 2E"
                  >
                    <svg viewBox="0 0 400 300" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
                      <rect x="120" y="30" width="160" height="250" />
                      <rect x="135" y="45" width="130" height="235" />
                      <circle cx="250" cy="170" r="6" />
                      <rect x="185" y="70" width="30" height="20" />
                      <rect x="100" y="262" width="200" height="22" />
                      <path d="M160 262 L160 218 L240 218 L240 262" />
                      <path d="M160 218 L178 204 L258 204 L240 218" />
                      <path d="M240 262 L258 248 L258 204" />
                      <path d="M200 218 L218 204" />
                      <line x1="20" y1="284" x2="380" y2="284" />
                    </svg>
                  </NewPart>
                  <p className="x-caption">Taken 9 Nov 2026 at 14:32 by Rui Tavares. Parcel left on the doormat of flat 2E after the recipient's neighbour signed.</p>
                </NewPart>
              </Card>
            </Section>

            <Section title="Recipient's signature" titleId="signature">
              <Card>
                <Stack>
                  <NewPart
                    name="pod-signature"
                    className="x-signature"
                    job="Show the signature the recipient drew on the driver's phone"
                    why="The system has no image or signature component"
                  >
                    <NewPart
                      name="pod-signature-pad"
                      className="x-signature__pad"
                      job="Hold the signature drawing at a fixed 3:1 ratio"
                      why="No image component; this screen is static, so the signature is drawn"
                      role="img"
                      aria-label="Handwritten signature reading J. Ferreira"
                    >
                      <svg viewBox="0 0 360 120" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M48 40 C58 36 66 38 66 50 C66 70 58 86 44 88 C34 89 30 80 38 74" />
                        <circle cx="76" cy="84" r="1.5" />
                        <path d="M96 42 C110 38 128 38 136 40 M104 42 C104 58 100 74 98 88 M100 64 L124 62" />
                        <path d="M136 80 C142 70 152 68 154 74 C156 82 144 86 140 82 C146 90 158 88 166 78 C170 72 172 68 176 70 C178 74 174 84 176 88 C180 80 186 70 192 70 C200 70 196 84 204 84 C212 84 214 70 222 72 C228 74 226 86 232 86 C240 86 244 74 250 72 C254 80 252 86 258 86 C266 86 272 74 280 76 C286 78 282 88 292 86 C300 84 308 76 312 72" />
                        <path d="M40 104 C120 100 220 100 320 98" strokeWidth="1.5" />
                      </svg>
                    </NewPart>
                    <p className="x-caption">Signed on the driver's phone at 14:33.</p>
                  </NewPart>
                  <List>
                    <ListItem label="Signed by" value="J. Ferreira" />
                    <ListItem label="Relationship to customer" value="Neighbour, flat 2D" />
                    <ListItem label="Customer on the order" value="Marta Lopes" />
                  </List>
                </Stack>
              </Card>
            </Section>

            <Section title="Location when marked delivered" titleId="location">
              <Card>
                <Stack>
                  <Grid>
                    <Stat label="Distance from the address" value="38 m" />
                    <Stat label="GPS accuracy" value="± 12 m" />
                  </Grid>
                  <List>
                    <ListItem label="Allowed distance" value="Up to 100 m" />
                    <ListItem label="Result">
                      <Badge tone="positive">Within range</Badge>
                    </ListItem>
                    <ListItem label="Driver's position" value="38.7369, -9.1427" />
                  </List>
                </Stack>
              </Card>
            </Section>

            <Section title="Message to the driver" titleId="message">
              <Card>
                <NewPart
                  name="message-field"
                  base="field"
                  className="x-message"
                  job="A message of several lines telling the driver what is missing from the proof"
                  why="The system has no textarea (rules, section 13), and Field only has input and select"
                >
                  <label className="x-message__label" htmlFor="send-back-message">What is missing</label>
                  <textarea
                    className="x-message__input"
                    id="send-back-message"
                    aria-describedby="send-back-hint"
                    defaultValue="The photo shows the parcel at the door of 2E, but the customer says she never received it. Please add a photo of the parcel handed to the neighbour in 2D, and their full name."
                  />
                  <p className="x-message__hint" id="send-back-hint">Sent to Rui Tavares with Send back to driver. He can add proof in the driver app until 12 Nov, 18:00.</p>
                </NewPart>
              </Card>
            </Section>
          </>
        }
        aside={
          <>
            <Section title="Delivery" titleId="delivery">
              <Card>
                <List>
                  <ListItem label="Parcel" value="TLV-48213" />
                  <ListItem label="Customer" value="Marta Lopes" />
                  <ListItem label="Address" value="Rua Morais Soares 112, 2E, 1900-345 Lisbon" />
                  <ListItem label="Driver" value="Rui Tavares" />
                  <ListItem label="Route" value="L-07, stop 23 of 31" />
                  <ListItem label="Dispute opened" value="10 Nov, 09:15" />
                </List>
              </Card>
            </Section>

            <Section title="Steps on 9 Nov" titleId="steps">
              <Card>
                <List>
                  {steps.map(([step, time]) => (
                    <ListItem key={step} label={step} value={time} />
                  ))}
                </List>
              </Card>
            </Section>
          </>
        }
      />
  );
}
