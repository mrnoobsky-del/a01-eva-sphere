# Changelog — A-01 v3.1.8 Spatial Clearance

**Date:** 22 November 2026  
**Baseline:** live website line v3.1.6 plus prepared mainline Agent Runtime v3.1.7.

## Changed
- Coordinated the pedestrian route envelope, automatic doors and existing stair portals.
- Removed the second set of interactive stair treads/frames that duplicated the main architectural stairs; retained approach markers only.
- Narrowed door frames/leaves to fit the inter-module opening and synchronized their open animation.
- Reconciled the sorting module, outboard freight lift and transfer bridge.
- Separated MEP and HVAC risers, penetrations and service zones.
- Moved thermal mains below the foundation and HVAC duct routes into the outer service annulus.
- Reconciled the atrium passenger tower, atrium ring gap, connecting bridge, pond/garden path/tree clearances and upper gallery supports.
- Added an analytic spatial-clash audit for selected envelope interfaces.

## Verification
Agent adapter and spatial audit tests pass; all four agent modules and the embedded ES module pass syntax checks; 321 HTML IDs are unique; ZIP integrity check passes.

## Limitations
This is not full triangle-mesh collision detection, BIM coordination, a calibrated metric model, a navmesh, or a physical safety review. Live browser/WebGL/GPU and hardware tests remain outstanding. No uCoz deployment is performed by this release.
