# Changelog — A-01 v3.1.0

## Integrated modular shell, waste logistics and B1 · 14 November 2026

### Based on
- The user-supplied integrated A-01 v2.0.27 HTML snapshot, retained as a separate source file.
- Existing A-01 parametric cassette layout conventions: 12 sectors × 2 columns × 6 courses.

### Added
- 144 individually addressable exterior cassette candidates with stable IDs: `A01-CAS-Pxx-Cxx-Bxx`.
- Per-cassette metadata: sector, column, course, azimuth and meridional bounds, surface area, meridional side length, upper/lower arc lengths, vertical projection and verification state.
- Cassette passport content in the contextual object panel.
- Hero counter for the 144 exterior cassette candidates.

### Preserved from the integrated source
- Five levels and existing 60 interior modules.
- Waste-sorting service modules on all five levels, closed vertical handling concept, waste-lift demonstration and exterior service dock.
- Underground B1 data-center concept and its equipment/cooling/service descriptions.
- Existing walk mode, Eva guide, service robot, digital sky, exterior architecture, search and workspace panels.
- Adaptive hardware-aware renderer, mobile frame cap, event-driven rendering, visibility handling and ResizeObserver.

### DeepSeek example review
- The supplied example was reviewed, not copied wholesale.
- Its placeholder floor, robot geometry and sample lift cabins were not imported.
- The uploaded v2.0.27 source already contains a more complete adaptive/event-driven render loop and scene-specific animations; that implementation was retained.

### Limitations
- 144 entries are geometry candidates, not an approved bill of materials or fabrication package.
- Model units are not calibrated to metres.
- Materials, thickness, mass, fasteners, support spacing, structural loads, fire/water performance and service life remain undefined.
- Crown closure and lower skirt require separate details.
- No browser/WebGL session, cross-device performance run, physical test or engineering approval is claimed.

### Follow-up validation fix
- Updated the infrastructure shortcut to select the first new cassette ID (`A01-CAS-P01-C01-B01`) after replacing the legacy 12-panel IDs with the 144-panel address scheme.
