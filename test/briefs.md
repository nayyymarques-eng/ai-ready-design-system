# Briefs: nine screens of a delivery operations product

## Six screens the system covers

1. **drivers**: Drivers list. Filter by All / On duty / Invited / Inactive. Each row: avatar, name, vehicle, depot, licence class, status, and actions (edit, send reminder, deactivate). An "Invite driver" action. Show how many drivers are in each filter.
2. **invoice**: One carrier invoice: header with the amount and status (awaiting approval), the line items, the carrier's details, a history of what happened to it, and Approve / Reject. Reject asks for a reason in a confirmation.
3. **settings**: Company settings: a form for company name, legal entity, country, currency and the daily dispatch cut-off time; a group of notification switches; a danger zone to delete the workspace with a confirmation.
4. **dashboard**: Overview for an operations manager: deliveries this month, drivers on duty, exceptions waiting, a trend of deliveries over six months, a list of delivery exceptions waiting for a decision (reschedule or return to sender), and a notice that today's dispatch cut-off is in two hours.
5. **onboarding**: A new workspace with no drivers yet: a checklist of setup steps (3 of 5 done), with progress, and the place where the drivers list will be.
6. **dispatch-run**: Review today's dispatch run before sending it: run date and depot, a table of 8 routes (driver, stops, distance, estimated time, status), totals, a time to schedule the dispatch, and Send dispatch with a confirmation.

Product name: Tolvane. Invent realistic content. Each screen is one standalone HTML file.

## A new feature: proof of delivery

Tolvane adds proof of delivery: when drivers hand over a parcel, they take a photo and collect a signature, and the operations team reviews the proof when a customer disputes a delivery. Three screens.

1. **pod-queue**: Proof to review. Deliveries where the customer says the parcel never arrived, or the proof is incomplete. Each row: parcel, recipient, driver, when it was marked delivered, a small photo of the proof, and which proof is missing. Filter by All / Disputed / Missing photo / Missing signature, with a count on each. Open a delivery to review it.
2. **pod-detail**: One delivery's proof: the photo taken at the door, the recipient's signature, how far the driver was from the address when they marked it delivered, and the delivery's steps from pickup to delivered, with times. Accept the proof, or send it back to the driver with a message saying what is missing.
3. **pod-rules**: Proof rules per sender: a list of senders and the proof each one requires (photo, signature, ID check for age-restricted items). Edit one sender's rules, choose the date the new rules start, and upload an example photo that shows drivers what a good proof photo looks like.

Product name: Tolvane. Invent realistic content. Each screen is one standalone HTML file.
