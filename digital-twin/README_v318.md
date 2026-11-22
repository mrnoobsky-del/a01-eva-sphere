# A-01 v3.1.8 — Main Website Line and Spatial Coordination

**Baseline:** published website build v3.1.6 (`3.1.6-gullwing-crown-vent-calcs`) plus the prepared Android-01 v3.1.7 integration.

## Changes
- Preserves the main Sphere geometry and current website visual language.
- Reconciles the waste-sorting service module with the outboard freight-lift landing and transfer bridge.
- Separates MEP and HVAC zones and adds dedicated slab/plinth penetrations.
- Moves thermal mains below the foundation and HVAC routes into the outer service annulus.
- Reconciles the passenger tower, atrium edge, connecting bridge and upper-gallery supports.
- Removes duplicate interactive stair geometry and retains the stairs already present in the main scene.
- Aligns the Android-01 corridor, door frames and approach markers to existing stair portals.
- Corrects the opening animation of the narrowed door leaves.

## Documentation
- [Spatial coordination and clash audit (RU)](../releases/mainline-v3.1.8/SPATIAL-COORDINATION-AND-CLASH-AUDIT_RU.md)
- [Release overview (RU)](../releases/mainline-v3.1.8/README_RU.md)
- [v3.1.7 integration report](../releases/mainline-v3.1.7/INTEGRATION-REPORT_RU.md)

## Verification
- Agent route/mission tests: PASS.
- Spatial clearance audit tests: PASS.
- Four agent modules and the embedded HTML ES module pass syntax checks.
- Static HTML ID audit: 321 unique IDs, no duplicates.
- ZIP integrity check: PASS.

**Limitations:** selected interface-envelope checks are not full triangle-mesh clash detection or BIM coordination. Coordinates remain illustrative and are not calibrated metres. Live browser/WebGL/GPU walkthrough and physical testing have not been completed. The uCoz website was not automatically updated.
