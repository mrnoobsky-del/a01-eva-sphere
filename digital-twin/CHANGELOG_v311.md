# Changelog — A-01 v3.1.1

## Interaction and presentation refinement · 14 November 2026

### Based on
- The integrated A-01 v3.1.0 build, preserved as a separate release file.

### Changed
- Replaced the low-contrast blue emissive hover treatment with an opaque ochre material (#D39A45) for hovered and selected scene objects.
- Added a material cache and restoration path so source materials and textures return when highlighting ends.
- Updated the first welcome sequence to show the exterior view before transitioning smoothly back to the interior scene.
- Added the interior return to the early skip/enter path and respected reduced-motion preferences.

### Flight HUD
- Reworked the flight controls as a compact overlay rather than a large persistent control panel.
- Grouped atmosphere, field-of-view and digital-sky controls in the additional settings panel.
- Kept touch joystick and altitude controls near the edges on mobile layouts to reduce obstruction of the scene.

### Preserved
- 144 addressable exterior cassette candidates and their geometry passports.
- Five-level waste sorting and handling concepts, lift and dock demonstration.
- Underground B1 data-centre concept.
- Existing walk mode, Eva, service robot, digital sky, exterior landscape, search and workspace UI.

### Verification
- All executable inline JavaScript blocks passed node --check.
- JSON-LD parsed successfully.
- Static checks confirmed expected highlight restoration, intro transition and HUD settings placement.
- Full live WebGL/visual testing and physical mobile-device testing are not claimed.

### Limitations
- This is a digital prototype, not a constructed or construction-approved facility.
- Cassette geometry remains in uncalibrated model units; materials, thickness, mass, fasteners, loads and code compliance are unresolved.
