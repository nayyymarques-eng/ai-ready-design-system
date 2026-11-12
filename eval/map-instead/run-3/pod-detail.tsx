import { DetailPage, NavRail, Badge, Banner, Button, Card, Field, Grid, List, ListItem, NewPart, Section, Stack } from '../src';

export const title = 'Proof of delivery TLV-48213 · Tolvane';

export const css = `
.x-proof-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  background: var(--surface-sunken);
  border: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.x-proof-photo__step {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 14%;
  background: var(--line);
}
.x-proof-photo__door {
  position: absolute;
  left: 30%; width: 34%;
  top: 10%; bottom: 14%;
  background: var(--surface);
  border: var(--border);
  border-bottom: 0;
}
.x-proof-photo__number {
  position: absolute;
  left: 50%; top: 10%;
  transform: translateX(-50%);
  font: var(--type-body-strong);
  color: var(--ink);
}
.x-proof-photo__handle {
  position: absolute;
  right: 10%; top: 52%;
  width: 6%; height: 4%;
  background: var(--muted);
  border-radius: var(--radius-pill);
}
.x-proof-photo__parcel {
  position: absolute;
  left: 66%; width: 18%;
  bottom: 14%; height: 18%;
  background: var(--tint-warning);
  border: 1px solid var(--warning);
  border-radius: var(--radius);
}
.x-proof-photo__parcel::after {
  content: "";
  position: absolute;
  left: 0; right: 0; top: 45%;
  height: 10%;
  background: var(--warning);
}
.x-signature {
  aspect-ratio: 4 / 3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface);
  border: var(--border);
  border-radius: var(--radius);
  color: var(--ink);
}
.x-signature svg { width: 80%; height: auto; }
.x-signature__line { color: var(--muted); }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Today', href: '#' },
      { label: 'Deliveries', href: '#', count: 1284 },
      { label: 'Disputes', href: '#', count: 7, current: true },
      { label: 'Drivers', href: '#', count: 46 },
      { label: 'Routes', href: '#' },
    ]}
  />
);

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Proof of delivery TLV-48213"
      status={<Badge tone="warning">Disputed</Badge>}
      actions={
        <>
          <Button variant="secondary">Send back to driver</Button>
          <Button variant="primary">Accept proof</Button>
        </>
      }
      main={
        <>
          <Banner tone="warning">
            <p>
              Hannah Okafor says the parcel never arrived. She opened the dispute on 11 Nov at 09:12.
              The driver marked it delivered 180 m from the address, outside the 50 m limit.
            </p>
          </Banner>

          <Section title="Proof from the door" titleId="proof">
            <Grid>
              <Card>
                <Stack>
                  <NewPart
                    name="proof-photo"
                    job="Shows the photo the driver took at the door"
                    why="The system has no image or media component"
                    className="x-proof-photo"
                    role="img"
                    aria-label="Photo at the door: a parcel on the step beside a front door marked 14"
                  >
                    <span className="x-proof-photo__step" />
                    <span className="x-proof-photo__door">
                      <span className="x-proof-photo__number">14</span>
                      <span className="x-proof-photo__handle" />
                    </span>
                    <span className="x-proof-photo__parcel" />
                  </NewPart>
                  <List>
                    <ListItem label="Photo" value="Taken 10 Nov, 14:37" />
                    <ListItem label="Shows" value="Parcel on the step of no. 14" />
                  </List>
                </Stack>
              </Card>
              <Card>
                <Stack>
                  <NewPart
                    name="signature"
                    job="Shows the recipient's signature as collected in the driver app"
                    why="The system has no image or media component"
                    className="x-signature"
                    role="img"
                    aria-label="Recipient's signature, J. Okafor"
                  >
                    <svg viewBox="0 0 240 120" aria-hidden="true">
                      <path
                        d="M20 78 C 34 30, 52 30, 48 70 C 46 92, 30 96, 34 76 C 40 52, 70 48, 74 70 C 76 82, 84 82, 92 66 C 100 50, 108 56, 106 72 C 104 86, 118 84, 128 62 C 136 46, 142 60, 146 72 C 150 82, 160 78, 170 58 C 178 44, 186 62, 196 70 C 204 76, 214 70, 222 60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line className="x-signature__line" x1="16" y1="100" x2="224" y2="100" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </NewPart>
                  <List>
                    <ListItem label="Signed by" value="J. Okafor" />
                    <ListItem label="Signed" value="10 Nov, 14:37" />
                  </List>
                </Stack>
              </Card>
            </Grid>
          </Section>

          <Section title="Where the driver was" titleId="location">
            <Card>
              <List>
                <ListItem label="Distance from the address" value="180 m" />
                <ListItem label="Allowed distance" value="50 m" />
                <ListItem label="Check">
                  <Badge tone="critical">Outside limit</Badge>
                </ListItem>
                <ListItem label="GPS accuracy" value="± 12 m" />
                <ListItem label="Position when marked delivered" value="On Calder Road, near the junction with Ash Grove" />
              </List>
            </Card>
          </Section>

          <Section title="Message to the driver" titleId="message">
            <Card>
              <Stack>
                <Field
                  id="missing"
                  label="What is missing"
                  options={[
                    'Photo does not show the house number',
                    'Signature does not match the recipient',
                    'Marked delivered too far from the address',
                    'Something else',
                  ]}
                  defaultValue="Marked delivered too far from the address"
                />
                <Field
                  id="note"
                  label="Message"
                  defaultValue="You marked this 180 m from 14 Ash Grove. Tell us where you left the parcel and who signed for it."
                  hint="Marek Nowak gets this in the driver app when you choose Send back to driver."
                />
              </Stack>
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
                <ListItem label="Customer" value="Hannah Okafor" />
                <ListItem label="Address" value="14 Ash Grove, Leeds LS6 2HT" />
                <ListItem label="Driver" value="Marek Nowak" />
                <ListItem label="Route" value="LS-North 3" />
                <ListItem label="Vehicle" value="Van YK72 FTD" />
              </List>
            </Card>
          </Section>

          <Section title="Steps" titleId="steps">
            <Card>
              <List>
                <ListItem label="Picked up at Leeds depot" value="10 Nov, 07:52" />
                <ListItem label="Out for delivery" value="08:31" />
                <ListItem label="Arrived near the address" value="14:34" />
                <ListItem label="Photo taken" value="14:37" />
                <ListItem label="Signature collected" value="14:37" />
                <ListItem label="Marked delivered" value="14:38" />
                <ListItem label="Dispute opened" value="11 Nov, 09:12" />
              </List>
            </Card>
          </Section>
        </>
      }
    />
  );
}
