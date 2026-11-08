// A return a driver brought back to the depot: built from the system, with two new parts labelled for triage.
import { AppShell, NavRail, PageHeader, Section, Card, Stack, List, ListItem, Badge, Button, NewPart } from '../src';

export const title = 'Return TL-48377';
export const css = `.x-signature { height: 96px; border: var(--border); border-radius: var(--radius); display: flex; align-items: end; padding: var(--s3); font: var(--type-small); color: var(--muted); }
.x-photo-strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s2); }
.x-photo-strip span { aspect-ratio: 4 / 3; border-radius: var(--radius); background: var(--surface-sunken); display: flex; align-items: end; padding: var(--s2); font: var(--type-small); color: var(--muted); }`;

export default function ReturnDetail() {
  return (
    <AppShell nav={<NavRail brand="Tolvane" items={[{ label: 'Proof to review', href: '#', count: 12 }, { label: 'Returns', href: '#', count: 3, current: true }, { label: 'Drivers', href: '#' }]} />}>
      <PageHeader title="Return TL-48377" status={<Badge tone="warning">Damaged</Badge>} actions={<><Button variant="secondary">Contact sender</Button><Button variant="primary">Approve return</Button></>} />
      <Section title="What came back" titleId="back">
        <Card>
          <Stack>
            <List>
              <ListItem label="Sender" value="Pellbray Wine Club" />
              <ListItem label="Brought back by" value="Rui Seixo, 17:05, 6 Nov" />
              <ListItem label="Reason" value="Box crushed on one side" />
            </List>
            <NewPart name="photo-strip" job="Shows the photos the driver took of the parcel" why="No component shows a row of photos" className="x-photo-strip"><span>Front</span><span>Side</span><span>Label</span></NewPart>
          </Stack>
        </Card>
      </Section>
      <Section title="Depot receipt" titleId="receipt">
        <Card>
          <NewPart name="signature" job="Shows the signature of the person who received the return at the depot" why="No component shows a drawn signature" className="x-signature">Signed by Ana Vidal, depot</NewPart>
        </Card>
      </Section>
    </AppShell>
  );
}
