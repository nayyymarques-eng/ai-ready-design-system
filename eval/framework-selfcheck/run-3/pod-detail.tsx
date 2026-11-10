import {
  DetailPage, NavRail, Badge, Banner, Button, Card, Section, Stack, Grid, Stat, List, ListItem, NewPart,
} from '../src';

export const title = 'Delivery TLV-48213 proof of delivery';

export const css = `
.x-photo { display: flex; flex-direction: column; gap: var(--s2); }
.x-photo__frame { display: block; width: 100%; height: auto; border-radius: var(--radius); background: var(--surface-sunken); }
.x-photo__wall { fill: var(--surface-sunken); }
.x-photo__ground { fill: var(--line); }
.x-photo__door { fill: var(--muted); }
.x-photo__panel { fill: none; stroke: var(--line); stroke-width: 3; }
.x-photo__handle { fill: var(--surface); }
.x-photo__plate { fill: var(--surface); stroke: var(--line); stroke-width: 2; }
.x-photo__number { fill: var(--ink); font: var(--type-heading); }
.x-photo__parcel { fill: var(--tint-warning); stroke: var(--warning); stroke-width: 2; }
.x-photo__tape { fill: none; stroke: var(--warning); stroke-width: 2; }
.x-photo__mat { fill: var(--text); }
.x-photo__caption { font: var(--type-small); color: var(--muted); margin: 0; }
.x-signature { display: flex; flex-direction: column; gap: var(--s2); }
.x-signature__pad { display: block; width: 100%; height: auto; border: var(--border); border-radius: var(--radius); background: var(--surface); }
.x-signature__stroke { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.x-signature__line { stroke: var(--line); stroke-width: 1; }
.x-signature__caption { font: var(--type-small); color: var(--muted); margin: 0; }
.x-note { font: var(--type-body); color: var(--text); margin: 0; }
.x-message { display: flex; flex-direction: column; gap: var(--s2); }
.x-message__label { font: var(--type-body-strong); color: var(--ink); }
.x-message__input { width: 100%; min-height: calc(var(--s8) * 3); padding: var(--s2) var(--s3); border: var(--border); border-radius: var(--radius); background: var(--surface); font: var(--type-body); color: var(--ink); resize: vertical; box-sizing: border-box; }
.x-message__hint { font: var(--type-small); color: var(--muted); margin: 0; }
`;

const nav = (
  <NavRail
    brand="Tolvane"
    items={[
      { label: 'Dispatch', href: '#' },
      { label: 'Deliveries', href: '#' },
      { label: 'Disputes', href: '#', count: 6, current: true },
      { label: 'Drivers', href: '#' },
      { label: 'Reports', href: '#' },
    ]}
  />
);

const message =
  'Hi Tomás, the customer at 27 Rua das Flores says this parcel never arrived. ' +
  'Your phone placed you 184 m from the address when you marked it delivered, and the house number is not readable in the photo. ' +
  'Please send a photo that shows the door number with the parcel, and tell us who signed for it.';

export default function PodDetail() {
  return (
    <DetailPage
      nav={nav}
      title="Delivery TLV-48213"
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
            <p>The customer reported the parcel as not received on 12 Nov at 09:14. Accept the proof to close the dispute, or send it back to the driver.</p>
          </Banner>

          <Section title="Photo at the door" titleId="photo">
            <Card>
              <NewPart
                name="pod-photo"
                className="x-photo"
                job="Show the photo the driver took at the door when handing over the parcel"
                why="The system has no image or media component"
              >
                <svg className="x-photo__frame" viewBox="0 0 640 400" role="img" aria-label="Photo taken by the driver: a brown parcel on a doormat in front of a grey front door; the house number plate is partly out of frame">
                  <rect className="x-photo__wall" x="0" y="0" width="640" height="330" />
                  <rect className="x-photo__ground" x="0" y="330" width="640" height="70" />
                  <rect className="x-photo__door" x="220" y="40" width="200" height="290" />
                  <rect className="x-photo__panel" x="245" y="70" width="150" height="100" />
                  <rect className="x-photo__panel" x="245" y="190" width="150" height="110" />
                  <circle className="x-photo__handle" cx="395" cy="200" r="7" />
                  <rect className="x-photo__plate" x="590" y="80" width="70" height="40" />
                  <text className="x-photo__number" x="600" y="107">2</text>
                  <rect className="x-photo__mat" x="200" y="335" width="240" height="30" />
                  <rect className="x-photo__parcel" x="270" y="262" width="110" height="80" />
                  <line className="x-photo__tape" x1="325" y1="262" x2="325" y2="342" />
                </svg>
                <p className="x-photo__caption">Taken 11 Nov at 14:32 on the driver app, Samsung Galaxy XCover 6. Location attached: 38.7139, -9.1394.</p>
              </NewPart>
            </Card>
          </Section>

          <Section title="Recipient signature" titleId="signature">
            <Card>
              <Stack>
                <NewPart
                  name="pod-signature"
                  className="x-signature"
                  job="Show the signature the recipient drew on the driver's phone"
                  why="The system has no image or signature component"
                >
                  <svg className="x-signature__pad" viewBox="0 0 640 180" role="img" aria-label="Handwritten signature reading M. Okafor">
                    <line className="x-signature__line" x1="40" y1="140" x2="600" y2="140" />
                    <path className="x-signature__stroke" d="M70 130 C80 60, 95 50, 100 120 C105 70, 120 55, 130 125 C138 90, 150 80, 160 118 M175 122 l4 -2 M210 100 C190 95, 185 130, 210 128 C235 126, 232 92, 210 100 M250 70 L245 130 M248 105 C265 90, 272 92, 262 108 L280 128 M300 112 C290 100, 310 92, 315 110 L318 126 C322 112, 330 104, 338 110 M352 60 C340 95, 345 128, 360 124 M338 98 L372 96 M392 108 C380 98, 380 128, 396 124 C410 120, 408 98, 392 108 M428 102 L426 130 M427 112 C434 100, 444 98, 452 104 C470 116, 520 120, 580 98" />
                  </svg>
                  <p className="x-signature__caption">Signed on the driver's phone on 11 Nov at 14:33.</p>
                </NewPart>
                <List>
                  <ListItem label="Signed by" value="M. Okafor" />
                  <ListItem label="Relationship" value="Neighbour at number 25" />
                </List>
              </Stack>
            </Card>
          </Section>

          <Section title="Distance from the address" titleId="distance">
            <Card>
              <Stack>
                <Grid>
                  <Stat label="Driver to address when marked delivered" value="184 m" />
                  <Stat label="Allowed distance" value="50 m" />
                  <Stat label="GPS accuracy" value="±12 m" />
                </Grid>
                <p className="x-note">
                  <Badge tone="critical">Outside allowed distance</Badge> The driver marked the parcel delivered 134 m past the limit, on Rua do Norte. Photo and signature were taken 2 minutes earlier, 31 m from the address.
                </p>
              </Stack>
            </Card>
          </Section>

          <Section title="Message to the driver" titleId="message">
            <Card>
              <NewPart
                name="message-field"
                base="field"
                className="x-message"
                job="Write what is missing from the proof before sending it back to the driver"
                why="Field has only an input or a select, and a textarea is not built yet"
              >
                <label className="x-message__label" htmlFor="message-input">What is missing</label>
                <textarea className="x-message__input" id="message-input" aria-describedby="message-hint" defaultValue={message} />
                <p className="x-message__hint" id="message-hint">Sent with Send back to driver, to Tomás Ribeiro in the driver app. The dispute stays open until he answers.</p>
              </NewPart>
            </Card>
          </Section>
        </>
      }
      aside={
        <>
          <Section title="Delivery" titleId="delivery">
            <List>
              <ListItem label="Customer" value="Inês Carvalho" />
              <ListItem label="Address" value="27 Rua das Flores, 1200-195 Lisboa" />
              <ListItem label="Parcel" value="1 box, 2.4 kg" />
              <ListItem label="Driver" value="Tomás Ribeiro" />
              <ListItem label="Route" value="LIS-07, stop 23 of 41" />
              <ListItem label="Dispute" value="DSP-1187" />
            </List>
          </Section>

          <Section title="Steps" titleId="steps">
            <List>
              <ListItem label="Picked up at Alverca depot" value="11 Nov, 07:52" />
              <ListItem label="Out for delivery" value="08:41" />
              <ListItem label="Arrived near address" value="14:29" />
              <ListItem label="Photo taken" value="14:32" />
              <ListItem label="Signature collected" value="14:33" />
              <ListItem label="Marked delivered" value="14:35" />
              <ListItem label="Dispute opened by customer" value="12 Nov, 09:14" />
            </List>
          </Section>
        </>
      }
    />
  );
}
