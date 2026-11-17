# A-01 v3.6.0-rc1 — Layered Envelope, Primary Frame and Three-Language Workspace

**Status:** release candidate on release/a01-v360-architecture-i18n-rc1. Not merged into main; not deployed to the public uCoz workspace.

## What changed

- Added a conceptual primary frame: 24 vertical supports, five outer and five atrium ring girders, radial floor girders, 24 roof support posts, 24 roof ribs, a roof spring ring and a crown hub.
- Fixed the distributed speaker placement bug: speakers are children of their floor group, so their vertical coordinates are now local to that level rather than including the level elevation twice.
- Lowered the service robot and Eva guide marker to their floor-contact positions; adjusted the small garden trees to meet the module floor surfaces.
- Removed the transparent interior and exterior hemispheres from the presentation modes. The internal 144-panel digital sky remains separate from the opaque 144-cassette exterior weather skin.
- Added the φ proportion study to the circulation bands and slightly adjusted the atrium radius.
- Added a 598-record geometry-only component passport register.
- Added Russian, English and Simplified Chinese UI dictionaries with browser-language detection and a saved manual language selection.

## Four model layers

The model distinguishes primary structure (STR), inner environmental / life-safety boundary (ENV), replaceable exterior cassettes (CAS), and the interior digital-sky / experience layer (SKY). The interior LED surface is not the outdoor sky. The exterior weather cassettes are not transparent glazing.

The continuous inner air / water / vapour / thermal and fire boundary remains a separate engineering system and is not yet resolved as a construction assembly.

## Language behavior

- Automatic mode checks navigator.languages and supports Russian (ru), English (en) and Simplified Chinese (zh-CN).
- Manual choices are saved in localStorage on the device.
- The visible UI dictionary is local and does not send user text to an external translation service.
- Long-form embedded project-document content is not claimed to be fully machine-translated; use the language-specific README files linked below.

## Geometry and engineering data

The scene coordinate system is still uncalibrated model-units. The component passport register records geometric quantities and design-intent support references, while physical properties remain null / TBD: mass, material grade, sections, fasteners, wind and snow actions, stiffness, connection capacities and professional verification.

No number in the rendering is automatically a structural calculation. The conceptual frame makes the intended load paths visible; it does not establish capacity or code compliance.

## Golden-section study

The two model-space circulation bands are arranged as a dimensionless golden-section proportion:

- Inner band: 1.40768957 model-units.
- Outer band: 0.87 model-units.
- Ratio: 1.61803399… (φ).

This is an architectural proportion study, not an egress width or safety criterion. Read [A01-GOLDEN-SECTION-STUDY-v0.1](../architecture/A01-GOLDEN-SECTION-STUDY-v0.1.md).

## Files

- [Open the v3.6.0-rc1 HTML workspace](eva-sphere-a01-v360-reference-atrium.html)
- [Component geometry passports — 598 records](../geometry/a01-component-passports-v0.1.json)
- [Golden-section study](../architecture/A01-GOLDEN-SECTION-STUDY-v0.1.md)
- [A-01 Sphere Standard](../standards/A01-SPHERE-STANDARD-v0.1.md)

## Verification still required

Static HTML and JavaScript checks are necessary but do not replace live WebGL testing on desktop and mobile, visual comparison with the supplied atrium reference, BIM coordination, structural and environmental calculations, or competent engineering review.
