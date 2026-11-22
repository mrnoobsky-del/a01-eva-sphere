# A-01 v3.1.7 — changelog

- Based on the live website line A-01 v3.1.6 (`3.1.6-gullwing-crown-vent-calcs`).
- Preserves the mainline Sphere geometry, floor layout, galleries, atrium, dispatch room and climate/energy panels.
- Integrates Android-01 into the existing `EVA_SPHERE` scene via a dedicated scene adapter.
- Adds a 17-bone procedural rig, local head-mounted eye camera, five-level provisional destination map and bounded route animation.
- Adds mission proposal, explicit operator approval, sequential execution, arrival verification, cancellation and Stop.
- Eye-camera capture is local-only; no Sensory Bridge, MCP, HTTP movement endpoint or external vision provider is connected to the main page.
- Adds automated checks for route graph, cross-level travel, arrival verification, pose/look bounds, Stop and no movement before approval.

## Known limitations
- Route graph is illustrative: 24 gallery waypoints per level and three conceptual inter-floor connectors. No navmesh, collision or accessibility analysis.
- Scene units are not calibrated metres. No physical movement or hardware connection.
- No external AI planner, camera, actuator, building control, BMS, HVAC, door, lift or fire system is connected.
- Browser approval is a workflow gate, not a hardened security boundary or certified physical emergency stop.
- Browser/WebGL/GPU acceptance remains pending.
