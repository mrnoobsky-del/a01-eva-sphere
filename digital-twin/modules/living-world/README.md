# A-01 Living World v0.1.1

Optional local companion layer integrated into the A-01 v3.1.4 release candidate.

## Companions
- **Мушкинссс** — procedural fly companion with wings, eyes and ambient movement.
- **Eva** — light-orb placeholder, not the final human avatar or the project's conversational assistant.

## Integration
The module adds two independent groups to the existing Three.js scene after `window.EVA_SPHERE` and `eva-a01:scene-ready` become available. It does not replace player controls, camera, renderer, original Eva, service robot or the main scene.

Load `companion-motion.js`, `companion-ai.js`, then `companions.js`. The integrated v3.1.4 HTML already includes these script tags. Public API: `window.A01_LIVING_WORLD` with `list`, `select`, `action`, `setAmbient`, `pause` and `destroy`.

## Controls
Selection, greet, flap/light pulse, rest, return, ambient movement and pause.

## Privacy and limits
No external AI provider, network calls, microphone, camera, speech recognition, voice synthesis or persistent conversation memory. Only the ambient-movement toggle is stored locally. Movement is limited to a 2.65 model-unit circle in L01. No collision system, room pathfinding or cross-level travel is implemented.

## v0.1.1 corrections
Explicit companion base height, return-on-arrival, supported-action allowlist and cleanup of the scene-ready listener on destroy.

## Verification status
Static JavaScript syntax checks passed. Full browser/WebGL, real mobile devices, uCoz and public-site deployment checks remain pending.
