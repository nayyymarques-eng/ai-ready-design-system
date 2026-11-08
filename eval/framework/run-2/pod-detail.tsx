import {
  DetailPage, NavRail, Badge, Banner, Button, Card, Section, Grid, Stack, Row,
  List, ListItem, Stat, Field, Checkbox, Avatar, NewPart,
} from '../src';

export const title = 'Proof of delivery TLV-48213';

export const css = `
.x-photo { margin: 0; display: flex; flex-direction: column; gap: var(--s2); }
.x-photo__frame { position: relative; aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface-sunken); border: var(--border); overflow: hidden; }
.x-photo__door { position: absolute; left: 30%; right: 30%; top: 12%; bottom: 0; background: var(--line); border-radius: var(--radius) var(--radius) 0 0; }
.x-photo__knob { position: absolute; right: 12%; top: 52%; width: var(--s3); height: var(--s3); border-radius: var(--radius-pill); background: var(--muted); }
.x-photo__parcel { position: absolute; left: 40%; width: 24%; bottom: 0; height: 22%; background: var(--surface); border: var(--border); border-radius: var(--radius); }
.x-photo__label { position: absolute; left: 35%; right: 35%; top: 30%; height: 18%; background: var(--line); border-radius: var(--radius); }
.x-photo__stamp { position: absolute; left: var(--s3); top: var(--s3); padding: var(--s1) var(--s2); border-radius: var(--radius); background: var(--surface); font: var(--type-small); color: var(--text); }
.x-photo__caption, .x-signature__caption { font: var(--type-small); color: var(--muted); }
.x-signature { margin: 0; display: flex; flex-direction: column; gap: var(--s2); }
.x-signature__pad { aspect-ratio: 3 / 1; border-radius: var(--radius); border: var(--border); background: var(--surface); color: var(--ink); display: flex; align-items: center; justify-content: center; padding: var(--s3); }
.x-signature__pad svg { width: 100%; height: 100%; }
.x-message { display: flex; flex-direction: column; gap: var(--s2); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { min-height: calc(var(--control-height) * 3); padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); font: var(--type-body); color: var(--text); background: var(--surface); resize: vertical; width: 100%; }
.x-message__hint { font: var(--type-small); color: var(--muted); }
`;

const steps: [string, string][] = [
  ['Picked up at Leeds depot', '07:12'],
  ['Loaded on van LV-07', '07:40'],
  ['Out for delivery', '08:05'],
  ['Arrived near address', '14:29'],
  ['Photo taken', '14:31'],
  ['Signature collected', '14:32'],
  ['Marked delivered', '14:33'],
];

export default function PodDetail() {
  return (
    <DetailPage
      nav={<NavRail brand="Tolvane" items={[
        { label: 'Today', href: '#' },
        { label: 'Deliveries', href: '#' },
        { label: 'Proof of delivery', href: '#', count: 7, current: true },
        { label: 'Drivers', href: '#' },
        { label: 'Routes', href: '#' },
        { label: 'Settings', href: '#' },
      ]} />}
      title="Delivery TLV-48213"
      status={<Badge tone="warning">Disputed</Badge>}
      actions={<>
        <Button variant="secondary">Send back to driver</Button>
        <Button variant="primary">Accept proof</Button>
      </>}
      main={<>
        <Banner tone="warning"><p>The customer says the parcel never arrived. Dispute opened 6 Nov at 09:15. Reply due by 10 Nov.</p></Banner>

        <Grid>
          <Section title="Photo at the door" titleId="photo">
            <Card>
              <NewPart name="pod-photo" className="x-photo" as="figure"
                job="Show the photo the driver took at the door"
                why="The system has no image or media component">
                <div className="x-photo__frame" role="img" aria-label="Parcel on the doorstep of a green front door, house number 14 visible">
                  <div className="x-photo__door"><div className="x-photo__label" /><div className="x-photo__knob" /></div>
                  <div className="x-photo__parcel" />
                  <span className="x-photo__stamp">6 Nov 2026, 14:31</span>
                </div>
                <figcaption className="x-photo__caption">Parcel left on the doorstep. House number 14 visible on the door.</figcaption>
              </NewPart>
            </Card>
          </Section>

          <Section title="Signature" titleId="signature">
            <Card>
              <NewPart name="pod-signature" className="x-signature" as="figure"
                job="Show the recipient's signature as captured on the driver's phone"
                why="The system has no image or media component">
                <div className="x-signature__pad" role="img" aria-label="Handwritten signature, J. Okafor">
                  <svg viewBox="0 0 300 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 70 C 30 20, 50 20, 45 60 S 60 90, 75 50 C 85 25, 95 70, 105 55 C 115 40, 120 65, 135 50 C 150 35, 155 75, 170 52 C 182 35, 190 70, 205 48 C 220 30, 230 65, 250 45 L 280 40" />
                    <path d="M60 80 L 240 76" />
                  </svg>
                </div>
                <figcaption className="x-signature__caption">Signed by J. Okafor at 14:32</figcaption>
              </NewPart>
            </Card>
          </Section>
        </Grid>

        <Section title="Where it was marked delivered" titleId="location">
          <Card>
            <Grid>
              <Stat label="Distance from address" value="38 m" />
              <Stat label="GPS accuracy" value="±12 m" />
            </Grid>
            <List>
              <ListItem label="Delivery address" value="14 Larch Grove, Leeds LS6 2QT" />
              <ListItem label="Driver's position" value="53.8191, -1.5762" />
              <ListItem label="Allowed distance" value="Up to 100 m" />
            </List>
          </Card>
        </Section>

        <Section title="Send back to driver" titleId="send-back">
          <Card>
            <Stack>
              <Row>
                <Checkbox label="Photo does not show the house number clearly" />
                <Checkbox label="Signature missing or unreadable" />
                <Checkbox label="Recipient name missing" defaultChecked />
                <Checkbox label="Too far from the address" />
              </Row>
              <NewPart name="message-field" className="x-message" base="field"
                job="A message of a few sentences to the driver"
                why="Textarea is listed as not built in rules.md">
                <label className="x-message__label" htmlFor="message">Message to the driver</label>
                <textarea className="x-message__input" id="message" aria-describedby="message-hint"
                  defaultValue="Please add the recipient's full name. The customer disputes the delivery and the signature alone is not enough." />
                <p className="x-message__hint" id="message-hint">Sent to Tom Hargreaves when you choose Send back to driver.</p>
              </NewPart>
            </Stack>
          </Card>
        </Section>
      </>}
      aside={<>
        <Section title="Delivery" titleId="facts">
          <Card>
            <List>
              <ListItem label="Order" value="TLV-48213" />
              <ListItem label="Customer" value="Amara Okafor" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Delivered" value="6 Nov, 14:33" />
              <ListItem label="Route" value="Leeds North 3" />
            </List>
          </Card>
        </Section>

        <Section title="Driver" titleId="driver">
          <Card>
            <Row><Avatar initials="TH" label="Tom Hargreaves" /><span>Tom Hargreaves</span></Row>
            <List>
              <ListItem label="Van" value="LV-07" />
              <ListItem label="Stops today" value="41" />
            </List>
          </Card>
        </Section>

        <Section title="Steps" titleId="steps">
          <Card>
            <List>
              {steps.map(([step, time]) => <ListItem key={step} label={step} value={time} />)}
            </List>
          </Card>
        </Section>
      </>}
    />
  );
}
