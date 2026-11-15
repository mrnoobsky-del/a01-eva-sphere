# A-01 Living World v0.1.1 — release notes

**Release type:** Integrated companion-module correction  
**Integrated target:** A-01 v3.1.4

## Included
- Procedural fly companion Мушкинссс.
- Light-orb placeholder for Eva.
- Local ambient movement and controls for selection, greeting, flap/pulse, rest, return and pause.
- Shared Three.js scene integration through the existing window.EVA_SPHERE API and eva-a01:scene-ready event.

## Fixes
- Added explicit baseY to companion state.
- Return now completes on arrival at the spawn position instead of a fixed timeout.
- Added allowlist for supported actions.
- Added scene-ready listener cleanup on destroy.
- Preserved the original camera, renderer, player controls, Eva, service robot, shell and LED system.

## Privacy and limitations
No external AI provider, network requests, microphone/camera access, speech recognition, voice synthesis or persistent memory. Only the ambient-movement setting is stored locally. No collisions, room pathfinding or cross-level travel.

## Verification
The three scripts pass static syntax checks. Browser/WebGL, physical mobile, uCoz and public deployment testing remain pending.
