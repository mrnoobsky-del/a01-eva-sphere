# A-01 v3.7.2 — A01-SEC-01 Mobile / Device Control

## 1. Goal
Provide convenient phone-based control of approved, non-critical electronic loads without exposing life-safety systems or building OT networks to uncontrolled remote commands.

## 2. Scope in the digital twin
The new responsive panel demonstrates shared-area lighting, information displays, ordinary background audio, explicitly designated non-critical workshop outlet groups, and public user charging points. It includes a local demo session, per-group on/off controls, and a safe-off action limited to those listed groups. It does not pair a real phone, authenticate an actual user, persist a remote session, call a backend, operate a relay, or control physical equipment.

## 3. Proposed real architecture
Phone app / PWA → authenticated remote-access gateway → local site gateway / policy enforcement point → isolated building control network → approved controller / contactor → permitted non-critical load.

Required controls:
- per-user identity and least-privilege roles;
- passkeys or MFA, device binding and session revocation;
- VPN or Zero Trust access; no public controller ports;
- network segmentation for guest, resident, IoT and operational technology;
- signed, short-lived commands with anti-replay and rate limits;
- local interlocks and state validation before actuation;
- event logs with actor, device, timestamp, requested action and result;
- notifications for important changes;
- local manual operation if internet or cloud services fail;
- tested recovery and an independently available physical emergency disconnect.

## 4. Protected circuits
The ordinary remote app must not provide a general-purpose off switch for fire detection/alarm/evacuation notification, emergency lighting and exit signs, smoke extraction, stairwell pressurization and fire dampers, emergency communication and safety monitoring, critical life-support/medical/essential pumps, or controllers/power supplies whose loss disables another safety function. These systems need dedicated, code-compliant controls, independent power arrangements and a reviewed cause-and-effect matrix. A smartphone or AI assistant must never override their certified local safety logic.

## 5. Two different meanings of off
- **Convenience off:** a user-authorized command to a designated non-critical load.
- **Emergency isolation:** an on-site electrical isolation action, designed and labelled by a qualified electrical engineer. It must not be implemented as an internet-accessible master-off button.

A single “turn everything off” action is intentionally not provided. The demo's bulk-off affects only the explicitly listed non-critical groups.

## 6. Implementation required before real deployment
Define device inventory, circuit ratings and criticality; choose controller/protocol after security review; design roles, device binding, authorisation and key lifecycle; threat-model gateway and update process; verify contactor feedback rather than displaying assumed state as measured state; complete electrical, fire, accessibility, privacy and OT security reviews; and conduct power-loss, offline, replay, revoked-session and recovery tests.

## 7. Validation
Embedded scripts were statically parsed and HTML IDs/required controls were checked. Browser/device and hardware tests remain outstanding.
