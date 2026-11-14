# A-01 Digital Twin · v3.1.1

**Base:** the integrated A-01 v3.1.0 build. This release preserves the 144 addressable exterior cassette candidates, five-level waste service system, lift and dock demonstration, underground B1 data-centre concept, first-person walk mode, Eva, service robot, digital sky and existing workspace panels.

## Changes in v3.1.1

- **Opaque ochre object highlight.** Hovered or selected objects temporarily receive a solid ochre material (#D39A45). Their original materials and textures are restored when the highlight is removed.
- **Exterior-to-interior arrival sequence.** On the first welcome sequence, the scene begins in exterior mode and the camera smoothly transitions back inside. Skipping the intro also requests the interior mode. Reduced-motion preferences avoid the longer animation.
- **Compact flight HUD.** Persistent controls are reduced to a small toolbar. Atmosphere, field-of-view and digital-sky controls are grouped in the additional settings panel. On touch devices, the joystick and altitude controls remain near the scene edges to preserve the central view.

## Preserved systems

- 144 cassette candidates: 12 sectors × 2 columns × 6 meridional courses, geometry passports and service-cycle demonstration.
- Five-level waste-sorting service modules, vertical handling concept and exterior dock.
- Underground B1 data-centre concept.
- Existing navigation, Eva, service robot, search, digital sky, exterior landscape and adaptive renderer.

## Verification

- All executable inline JavaScript blocks were extracted and checked with node --check.
- JSON-LD parsed as valid JSON.
- Static checks confirmed the highlight/material restoration, intro/return flow, and compact HUD structure.
- Full visual WebGL validation and interactive testing in a real browser or on physical mobile devices have not been confirmed.

## Limitations

This remains a software prototype, not evidence that the physical Sphere exists or that its systems are built or validated. The cassette geometry uses uncalibrated model units and is not a fabrication or structural design. Materials, thickness, mass, fasteners, loads, fire/water performance and service life require separate professional design and verification.

## Files

- HTML: [eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html](eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html)
- Changelog: [CHANGELOG_v311.md](CHANGELOG_v311.md)
- Previous build: [A-01 v3.1.0](eva-sphere-a01-v310-modular-shell-waste-datacenter.html)
