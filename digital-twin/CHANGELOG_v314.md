# A-01 v3.1.4 — changelog

## 15 November 2026 · integrated release candidate

### Preserved from v3.1.3
- Full five-level digital-twin scene, existing navigation, first-entry flow, Eva and service robot.
- Modular exterior shell and 144 serviceable interior LED cassettes.
- Waste logistics and underground B1 data-centre concept.
- Experimental whole-pod LED-portal movement study, explicitly kept as a conceptual animation.

### Added
- Optional local Living World v0.1.1: procedural fly companion Мушкинссс and Eva light-orb placeholder.
- Companion panel for selection, greeting, wing flap/light pulse, rest, return, ambient movement and pause.
- Public module API and explicit destroy lifecycle.

### Fixed
- Added the missing `baseY` state so the first companion animation update does not set an undefined vertical coordinate.
- Return now ends on arrival rather than after a fixed five-second timeout.
- Added an allowlist for supported companion actions.
- Added cleanup of the scene-ready event listener when the module is destroyed.
- No external AI provider, microphone, camera, voice or network integration was introduced.

### Static checks
- Three companion scripts and six executable classic inline scripts passed syntax parsing.
- All 243 embedded HTML IDs are unique.
- Companion JSON manifest parses successfully.
- Relative script paths, load order and the core scene-ready API were checked.

### Not verified
- Full browser/WebGL interaction and rendering on end-user devices.
- Full-duration observation of all service animations and the 11.6-second pod sequence.
- Physical Android/iOS testing, uCoz macro expansion and public-site deployment.
- Any real-world structural, mechanical, thermal, fire, evacuation or regulatory validation.
