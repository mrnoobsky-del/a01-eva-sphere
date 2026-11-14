# A-01 Living World v0.1 — release notes

**Date:** 2026-11-14  
**Release type:** Experimental companion-module preview  
**Branch:** feature/living-world-v0.1  
**Integration status:** Standalone module and preview page created; not yet merged into the main digital-twin HTML.

## Included
- Modular procedural fly companion for Мушкинссс.
- Procedural light-orb placeholder for Eva.
- Local ambient movement confined to the central atrium test radius.
- Small companion panel with selection, greeting, flap/pulse, rest, return, ambient toggle and pause.
- Shared Three.js scene/render API integration through window.EVA_SPHERE.
- Standalone preview page and Russian integration guide.
- No additional npm package or remote service.

## Preserved by design
- Main camera and player controls are not modified.
- The existing renderer and scene are reused.
- Service robot, original Eva scene objects, LED cassette system, shell/dolek systems and intro sequence are not changed.
- The module can be removed via window.A01_LIVING_WORLD.destroy().

## Known limitations
- No collision detection or validated pathfinding.
- Companion coordinates use the current model-space values for L01 and must be confirmed in the live v3.x page.
- Eva is represented by a light-orb placeholder, not a final human avatar.
- No external AI, voice, microphone, speech recognition or persistent conversation memory.
- Full browser/WebGL and mobile integration checks are still required before merging into a public build.
