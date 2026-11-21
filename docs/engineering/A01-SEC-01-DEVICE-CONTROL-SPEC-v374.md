# A-01 — A01-SEC-01: Secure Device Control Engineering Specification
**v3.7.4 documentation package · EN · 21 November 2026**

> **Status:** engineering requirements and architecture concept. This is not an electrical design, procurement specification, automation design, or authorization to connect equipment. Real circuits, protective devices, wiring, contactors, controllers and installation must be specified by qualified professionals.

## 1. Purpose and boundaries

Provide a consistent interface through which residents and staff can view and control only explicitly approved electronic devices in the Sphere. A phone must not become a direct remote control for the building's engineering network.

Command path:

**Phone / PWA → authenticated access gateway → local policy enforcement point → zone controller → switching device → independent state feedback.**

Eva may explain status, help locate an asset and prepare a request. It cannot exceed the user's privileges, bypass interlocks, or independently decide to disable protective systems.

Initial candidate scope is limited to designated non-critical groups: ordinary public-area lighting, information displays, background audio, specifically approved workshop outlet groups, and user charging points. These are design categories, not claims that physical equipment exists.

## 2. Device classes and permitted control

| Class | Examples | Remote control | Conditions |
|---|---|---|---|
| U1 — personal | lighting in a private zone, personal interface settings | Yes, within the user's zone | Zone ownership, local manual override |
| U2 — shared non-critical | decorative lighting, displays, background audio | Yes, by role | Schedules, limits, confirmation for group actions |
| U3 — operational | service outlets, non-critical process pumps/fans | Restricted | Trained staff only; work permit/service mode; local area check |
| U4 — critical engineering | essential pumps, technical ventilation, server cooling | No ordinary app control | Separate automation; status may be exposed through an approved read-only interface |
| U5 — life-safety / fire | fire alarm, emergency lighting, evacuation notification, smoke control, pressurization, fire dampers, emergency communications | No | Independent systems and project-defined controls |

The project engineer and responsible operator must classify each actual load. Convenience must never be used to downgrade a device's criticality.

## 3. Roles and permissions

- **Guest:** public information only; no engineering commands.
- **Resident:** devices in the resident's own zone and approved user functions.
- **Operator:** limited shared devices within assigned shift/zone; all commands logged.
- **Engineer:** diagnostics and service actions; hazardous actions require local authorization and physical confirmation.
- **Security administrator:** identities, roles, keys, policies and session revocation; no authority to bypass hardware protections.
- **Service identity:** separate machine identity with a limited lifetime and explicit asset scope; no shared passwords or permanent tokens.

Application administration must not provide a software route to disable independent fire automation or remove hardware interlocks.

## 4. Command lifecycle

1. User selects an asset and action.
2. App shows its human-readable name, location, criticality and expected effect.
3. Gateway validates identity, role, device binding, session lifetime and permission for that exact command.
4. Local policy point checks device state, interlocks, schedule, maintenance mode and conflicting commands.
5. U3 requires on-site staff confirmation; app commands for U4/U5 are rejected.
6. Controller issues the command only after all checks pass.
7. Independent feedback confirms the physical state.
8. UI distinguishes: request accepted, command sent, executing, sensor/contact confirmed, failed, or state unknown.
9. Event log records actor, asset, timestamp, result and feedback source.

A successfully transmitted command is not proof of physical switching. Missing or contradictory feedback must produce **state unknown**, never a fabricated success state.

## 5. Safe response matrix

| Event | App behaviour | Local-system behaviour |
|---|---|---|
| Internet/cloud loss | Show offline; remote commands unavailable | Local automatic functions continue as designed |
| Controller communication loss | Do not mark command complete | Avoid endless retries; enter the asset-specific safe state |
| Sensor/feedback disagreement | Show conflict and alert | Block hazardous action and notify operator |
| Session expired/revoked | Reject new commands | Existing command completes only under local logic and safety rules |
| Replayed/delayed packet | Reject stale request | Validate unique ID, expiry and anti-replay data |
| Emergency stop | Display status; cannot clear interlock | Stop and recovery follow local procedure |
| Maintenance | Reject ordinary commands | Local isolation, prevention of unexpected restart and staff confirmation |
| Fire signal | Information only through approved channel | Independent fire system executes its approved cause-and-effect logic |

A safe state is not universally “off”: switching off a pump, cooling unit, ventilation system or protective function can itself be hazardous. Define it per asset through risk analysis.

## 6. Physical architecture and interfaces

Proposed logical components:
- mobile client/PWA with protected session storage;
- remote-access gateway with no direct inbound internet access to controllers;
- local policy enforcement point;
- segmented OT network and separate guest, resident, IoT and operations zones;
- controllers selected against actual requirements and supported protocols;
- switching devices selected by the electrical design;
- independent feedback, such as auxiliary contact, position/current sensor or another suitable method;
- local control panel and documented manual recovery procedure;
- tamper-resistant event log with time synchronization.

Do not select protocols, controller models or contactors until the load register, current calculations, environmental assessment and cyber-risk review are complete.

## 7. Security and privacy requirements

- MFA or passkeys for privileged roles; device binding and revocation.
- Least privilege, individual identities, short-lived tokens.
- Signed commands, unique nonce/ID, expiry window, anti-replay and rate limiting.
- Encrypted channels and protected key lifecycle.
- Network segmentation; controllers are never directly exposed to the public internet.
- Signed updates, version inventory and rollback plan.
- Access/action logging without unnecessary personal data.
- Explicit consent and visible indication for microphone/camera features; no covert monitoring.
- Defined retention, deletion and access rules for telemetry.
- Eva must not infer intent and issue a device command; explicit user request and authorization are required.

## 8. Phone UI requirements

Required UI states:
- Available / Not permitted for this role;
- Online / Offline;
- Request sent / Awaiting confirmation / Confirmed / Failed / Unknown;
- Locked by local automation;
- On-site specialist required;
- Maintenance — control unavailable.

Hazardous and group actions require clear confirmation listing affected assets. Do not provide a single “Turn everything off” button. Show criticality, location and reason for rejection. Support keyboard and screen-reader access.

## 9. Minimum asset data model

Each controllable asset must have:
- immutable unique ID;
- name, type, zone and operations owner;
- U1–U5 criticality class and rationale;
- permitted commands and roles;
- mode: normal / maintenance / locked / fault;
- actual-state feedback source and last-confirmed timestamp;
- allowed time windows and constraints;
- safe state and manual recovery procedure;
- links to supply circuit, controller and protective systems;
- configuration-change and version history.

## 10. Implementation gates and acceptance criteria

**S0 — inventory:** loads, purpose, zone, current/power, criticality, supply and owner.

**S1 — risk analysis:** OT/IT threats, consequences of erroneous commands, power/network loss, automation/manual-control conflicts.

**S2 — no-load bench:** test roles, signed commands, replay protection, session revocation, logging and feedback using emulators.

**S3 — one U2 group mock-up:** test on a low-voltage/isolated bench; any real electrical load requires a separate approved design.

**S4 — pilot:** only after electrical design, protective-device diagrams, local controls, risk review and operating procedures are approved.

**S5 — expansion:** each new group repeats classification and testing; approval of one load does not transfer to another.

Acceptance: prohibited commands are rejected; permissions can be revoked; replayed/expired commands are blocked; state is not shown as confirmed without feedback; cloud loss does not break local protection; manual control/recovery is tested; logs reconstruct the event sequence.

## 11. Open decisions

Physical controllers, protocols, voltages, ratings, protective devices, network topology, IAM provider, data retention policy and exact devices remain unselected. A visual prototype is not a sufficient basis for procurement. Site data, load register, calculations, applicable codes, electrical/OT/cybersecurity specialists and tests are required.

## 12. Related documents

- `A01-SEC-01-mobile-device-control-v372.md` — initial mobile-control concept.
- `A01-INTEGRATION-MATRIX-v373.md` — overall engineering integration matrix.
- `STATUS-AND-EVIDENCE.md` — status and evidence rules.

**Final status:** expanded requirements specification; physical device control is not implemented or verified.