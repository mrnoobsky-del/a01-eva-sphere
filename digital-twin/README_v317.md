# A-01 v3.1.7 — Main Website Line and Android-01 Agent Runtime

**Baseline:** the live A-01 v3.1.6 website line at https://evasphere.usite.pro/ (`3.1.6-gullwing-crown-vent-calcs`). This v3.1.7 build extends the main Sphere scene; it is not a replacement with the separate experimental X world.

## Changes
- Preserves the v3.1.6 main dome scene, five levels, pods, galleries, atrium, dispatch room, energy and climate panels.
- Adds Android-01 to the main navigation.
- Reuses `window.EVA_SPHERE`, the existing Three.js scene, `CONFIG.levelY`, and scene `items`. No second independent scene is created.
- Adds a procedural 17-bone Android-01 rig and a head-bone-mounted eye camera.
- Adds a five-level route map. Existing scene objects become named destinations; illustrative gallery waypoints and inter-level connectors provide a provisional graph.
- Adds mission proposal, explicit operator approval, sequential execution and arrival verification. Stop remains available.
- Eye-camera capture is local and is not automatically sent over the network.

## Boundaries
The route graph has 24 illustrative gallery waypoints per level and three conceptual inter-level links. It is not a navigation mesh and does not prove lift availability, collision-free paths, accessibility, evacuation compliance or physical walkability. Coordinates are illustrative Three.js units, not metres. No navmesh, collision solver or crowd simulation is included.

No external planner/model is connected; the UI uses a built-in inspection mission. The X Sensory Bridge/MCP/HTTP path is not connected to the main page. No external frame transfer takes place.

Browser approval is a workflow gate, not a hardened security boundary against deliberate local JavaScript modification, and not a certified physical emergency stop. Arbitrary JavaScript, actuators, doors, lifts, BMS, HVAC, power and fire systems are not controlled.

## Validation
Module and embedded ES-module syntax checks pass. `node tests/mainline-agent-adapter-check.mjs` passes the five-level map, scene destinations, multi-level route, arrival verification, bounded pose/look, Stop and no-motion-before-approval checks. Live browser/WebGL/GPU and physical device acceptance have not been performed.

**Status: Prototype / locally checked.** The HTML is a prepared build, not an automatic uCoz deployment. Back up the live page before manual replacement and validate desktop and mobile browsers. The full HTML and modules are supplied separately as a ZIP; this PR publishes documentation, not the 1.6 MB HTML as a GitHub Release Asset.
