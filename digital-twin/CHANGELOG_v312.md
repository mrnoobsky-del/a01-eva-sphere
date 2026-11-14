# Changelog — A-01 v3.1.2

## Intro sequencing and serviceable LED architecture · 14 November 2026

### Intro
- Removed the unconditional timer that switched the Sphere to interior mode behind the still-open personal-number card.
- The camera now transitions to the interior only after Enter, Skip or Escape initiates and completes the card close sequence.
- Added a close-state guard and respects reduced-motion settings.

### Interior LED sky
- Replaced the single spherical projection mesh and 12 large logical panels with 144 addressable curved LED cassette meshes (12 sectors × 2 columns × 6 bands).
- Preserved a continuous panoramic texture across the segmented surface.
- Added cassette metadata, selection and a front-service removal/return demonstration with captive guide rails and a retaining tray.
- Described the service concept as interior access that does not require opening the exterior weather skin.

### Exterior shell maintenance
- Added the concept of two captive guide rails and a retaining service cradle for a non-structural outer shell cassette.
- Shows the independent inner protective boundary behind the removed cassette.
- Documents a non-occupied service vestibule with two sequentially interlocked boundaries, state checks and manual recovery.
- Clarifies that the occupied room/pod remains stationary; whole-pod movement is outside this release.

### Preserved
- 144 addressable exterior shell cassette candidates and passports.
- Five-level waste sorting and handling concepts, lift and dock.
- Underground B1 data-centre concept.
- Existing walk mode, Eva, service robot, digital sky controls, exterior landscape and workspace UI.

### Verification
- All 7 executable inline JavaScript blocks passed node --check.
- JSON-LD parsed successfully.
- Static assertions passed for intro timing, LED grid, service cycle, protected shell boundary and version strings.
- Full live WebGL interaction and full-scale mechanism tests are not claimed.

### Limitations
- This is a digital concept and interaction prototype, not a built or construction-approved facility.
- Dimensions, weights, rails, actuators, seals, loads, thermal and fire/water performance, electrical isolation and regulatory compliance require independent engineering design and verification.
